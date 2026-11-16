import * as THREE from 'three';
import { createFollowCamera } from './camera.js';
import { createEndlessStreet } from './endless.js';
import './world.css';
import { createStreetArt, makePerson, animatePerson, material, circleGeo, onlineMat, selfMat, colors } from './art.js';
import { isWalkable, findPath } from './navigation.js';
import { setupWorldControls } from './controls.js';
import { setupMusic } from './audio.js';
import { createLandmarks } from './landmarks.js';
import { setupMinimap } from './minimap.js';
import { setupNight } from './night.js';
import { groundHeight } from './geography.js';
import { indexShops,setupShops } from './shops.js';
import { setupSocial } from './social.js';
import { disposeOwned } from './batching.js';

const $=id=>document.getElementById(id), root=$('world'), stage=$('world-stage');
const visitor=root.dataset.visitor, ownSite=Number(root.dataset.me);
const loading=$('world-loading'), labelLayer=$('world-labels');
let renderer,scene,camera,view,socket,myID=null,self=null,sites=[],bounds,siteMap=new Map();
let retry=0,reconnectTimer,leaving=false,selected=null,toastTimer,lastSent='',lastInput=0,siteRefresh;
const people=new Map(),stalls=new Map(),pickables=[],particles=[],keys=new Set(),coinUsed=new Set();
let coinExp=1,catalogTag=null,stageWidth=1,stageHeight=1;
let onlineSites=new Set();
const labelVector=new THREE.Vector3(),fadeTarget=new THREE.Vector3(),fadeDirection=new THREE.Vector3(),fadeHit=new THREE.Vector3(),fadeRay=new THREE.Ray();
let targetPath=[],pointerStart=null;
let sitesLoading=null;
let directoryTravelOnly=false;
const pointerIDs=new Set(),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
let art, goal, mobileUI, endless, landmarks, minimap, night,shops,social;
const makeStall=s=>{const stall=art.makeStall(s);stall.owner.visible=!onlineSites.has(s.id);stall.label.addEventListener('click',()=>{closePanels();selectSite(siteMap.get(s.id))});return stall;};
const disposeStall=s=>art.disposeStall(s);
function say(text){$('world-toast').textContent=text;$('world-toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('world-toast').hidden=true,3200);}
function connection(text,on=false){$('connection-text').textContent=text;$('connection-dot').classList.toggle('connected',on);}
function resetCamera(p){view.reset();view.update(0,p);}
function stopMovement(){keys.clear();targetPath=[];mobileUI?.resetJoystick();lastSent='';send({type:'move',dx:0,dz:0});}
function zoomBy(factor){view.zoom(factor);}
function resizeScene(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;stageWidth=w;stageHeight=h;renderer.setSize(w,h,false);camera.userData.width=w;camera.userData.height=h;camera.aspect=w/h;camera.updateProjectionMatrix();}
function closePanels(){for(const id of ['world-card','world-directory','world-night','world-night-guide','world-shops','world-social'])$(id).hidden=true;night?.exitOverview();$('directory-toggle').setAttribute('aria-expanded','false');}
function canTravel(){if(!self){say('正在连接街区，连接后即可传送');return false;}if(self.state.action==='caught'){say('正在被带回广场，稍后就能重新出发');return false;}return true;}
function travel(destination){if(!canTravel())return;stopMovement();view.reset();if(destination==='bridge')view.state.yaw=0;closePanels();send({type:'travel',destination});if(destination==='plaza')say('返回中央广场，大家都从这里出发');}
function visitShop(id){const s=siteMap.get(id);if(!s||!canTravel())return;stopMovement();closePanels();view.reset();view.state.yaw=0;goal.visible=false;send({type:'visit',siteId:id});say('来到「'+s.name+'」的店门口');}
function openDirectory(others=false){closePanels();directoryTravelOnly=others;$('world-directory').hidden=false;$('directory-toggle').setAttribute('aria-expanded','true');stopMovement();renderDirectory();$('world-search').focus();}
function refreshNearby(){
 if(!self)return;const origin=self.model.position;endless.update(origin,mobileUI?.touch,siteMap);const range=mobileUI?.touch?34:42,limit=mobileUI?.touch?24:28;const nearby=sites.map(s=>({s,d:(s.x-origin.x)**2+(s.z-origin.z)**2})).filter(x=>x.d<range**2).sort((a,b)=>a.d-b.d).slice(0,limit);const wanted=new Set(nearby.map(x=>x.s.id));
 for(const [id,stall] of stalls)if(!wanted.has(id)){disposeStall(stall);stalls.delete(id);}
 for(const {s} of nearby)if(!stalls.has(s.id))stalls.set(s.id,makeStall(s));
}
const walkable=(x,z)=>isWalkable(x,z,bounds,siteMap);
function routeTo(x,z){
 if(!self)return;
 if(!walkable(x,z)){say('这里是小摊，点街道或摊主旁边的空地');return;}
 if(Math.hypot(x-self.target.x,z-self.target.z)>45){say('走近一些，或用街坊名册直接串门');return;}
 const path=findPath({x:self.target.x,z:self.target.z},{x,z},walkable);
 if(!path){say('这条路走不过去，换个落脚点试试');return;}
 mobileUI?.resetJoystick();targetPath=path;goal.position.set(x,.18,z);goal.visible=true;keys.clear();setActionHighlight('walk');
 renderer.domElement.focus({preventScroll:true});
}
function addPlayer(p){const model=makePerson(p.skin);model.position.set(p.x,groundHeight(p.x,p.z),p.z);model.rotation.y=p.yaw;scene.add(model);const halo=new THREE.Mesh(circleGeo,p.id===myID?selfMat:onlineMat);halo.rotation.x=-Math.PI/2;halo.position.y=.025;model.add(halo);
 const label=document.createElement('div');label.className='player-label'+(p.id===myID?' self':'');const bubble=document.createElement('div');bubble.className='player-bubble';bubble.hidden=true;const name=document.createElement(p.id===myID?'div':'button');name.className='player-name';name.textContent=(p.id===myID?'你 · ':'● ')+p.name;if(p.id!==myID){name.type='button';name.setAttribute('aria-label','与'+p.name+'互动');name.addEventListener('click',()=>social.open(p.id))}label.append(bubble,name);labelLayer.append(label);
 let hit=null;if(p.id!==myID){hit=new THREE.Mesh(new THREE.BoxGeometry(1.2,2.6,1.2),new THREE.MeshBasicMaterial({visible:false}));hit.position.y=1.3;hit.userData.playerID=p.id;model.add(hit);pickables.push(hit);}
 const player={model,label,bubble,hit,state:p,target:new THREE.Vector3(p.x,groundHeight(p.x,p.z),p.z)};people.set(p.id,player);if(p.id===myID){self=player;resetCamera(p);refreshNearby();$('self-name').textContent=p.name;}return player;
}
function removePlayer(id){const p=people.get(id);if(!p)return;scene.remove(p.model);disposeOwned(p.model);p.label.remove();if(p.hit){const i=pickables.indexOf(p.hit);if(i>=0)pickables.splice(i,1);p.hit.geometry.dispose();p.hit.material.dispose();}people.delete(id);if(id===myID)self=null;}
function applyState(states){const live=new Set(states.map(p=>p.id));for(const id of people.keys())if(!live.has(id))removePlayer(id);
 for(const state of states){let p=people.get(state.id);if(!p)p=addPlayer(state);const jump=p.target.distanceTo(new THREE.Vector3(state.x,groundHeight(state.x,state.z),state.z))>10;if(state.id===myID&&(state.action==='caught'||p.state.action==='caught'))stopMovement();p.state=state;p.target.set(state.x,groundHeight(state.x,state.z),state.z);p.bubble.hidden=!['beg','wave','caught'].includes(state.action);p.bubble.textContent=state.action==='caught'?'被发现了！正在返回广场…':state.action==='beg'?'行行好，赏口饭吃～':'嗨，大哥大姐们！';
  if(jump&&p===self){p.model.position.copy(p.target);view.update(0,p.target);targetPath=[];refreshNearby();}
 }
 $('online-count').textContent=states.length;root.dataset.online=String(states.length);
 onlineSites=new Set(states.map(p=>p.siteId).filter(Boolean));for(const [id,stall] of stalls){stall.owner.visible=!onlineSites.has(id);stall.label.textContent=(onlineSites.has(id)?'● 在线 · ':'')+(siteMap.get(id)?.name||'');}
}
function send(data){if(socket?.readyState===WebSocket.OPEN)socket.send(JSON.stringify(data));}
function connect(){if(leaving)return;connection(retry?'正在重新连接':'正在接入街头');const url=new URL('/world/live',location.href);url.protocol=location.protocol==='https:'?'wss:':'ws:';socket=new WebSocket(url);const current=socket;
 socket.addEventListener('open',()=>{send({type:'join',visitor});retry=0;});
 socket.addEventListener('message',event=>{if(socket!==current)return;try{const message=JSON.parse(event.data);
  if(message.type==='welcome'){myID=message.id;connection('同街相见',true);lastSent='';const slug=new URLSearchParams(location.search).get('site');const destination=slug!==null?sites.find(s=>s.slug===slug):null;if(destination){view.reset();view.state.yaw=0;send({type:'visit',siteId:destination.id});}}
  if(message.type==='state')applyState(message.players);
  if(message.type==='coin')onCoin(message);
  if(message.type==='raid-result')night?.receive(message.round);
  if(message.type==='interaction')social?.receive(message);
  if(message.type==='notice')say(message.msg);
  if(message.type==='shops-changed')loadSites(true).catch(()=>say('店铺已更新，请刷新查看'));
 }catch(error){console.error('街区消息处理失败',error);}});
 socket.addEventListener('close',event=>{if(socket!==current)return;myID=null;for(const id of [...people.keys()])removePlayer(id);$('online-count').textContent='0';root.dataset.online='0';keys.clear();targetPath=[];connection('暂时断开');
  if(leaving)return;if(event.code===1008){say('连接已结束，请刷新页面重新进入');return;}if(event.code===1013)say('街区暂时满员，稍后自动重连');clearTimeout(reconnectTimer);reconnectTimer=setTimeout(connect,Math.min(15000,1000*2**Math.min(retry++,4))+Math.random()*400);
 });
}
let highlightedAction='';
function setActionHighlight(action){const value=action==='walk'?'idle':action;if(highlightedAction===value)return;highlightedAction=value;document.querySelectorAll('[data-action]').forEach(b=>b.classList.toggle('active',b.dataset.action===value));}
function action(value){if(!self){say('连接成功后就能和大家打招呼了');return;}stopMovement();send({type:'action',action:value});setActionHighlight(value);}
function movement(now){if(!self||self.state.action==='caught'||mobileUI?.blocked)return;let dx=0,dz=0;const keyboard=keys.size>0,stick=mobileUI?.stick;
 if(stick?.active){targetPath=[];const forward=view.forward();const right=new THREE.Vector3(-forward.z,0,forward.x);dx=right.x*stick.x-forward.x*stick.y;dz=right.z*stick.x-forward.z*stick.y;}
 else if(keyboard){targetPath=[];const forward=view.forward();const right=new THREE.Vector3(-forward.z,0,forward.x);if(keys.has('w')||keys.has('arrowup')){dx+=forward.x;dz+=forward.z;}if(keys.has('s')||keys.has('arrowdown')){dx-=forward.x;dz-=forward.z;}if(keys.has('d')||keys.has('arrowright')){dx+=right.x;dz+=right.z;}if(keys.has('a')||keys.has('arrowleft')){dx-=right.x;dz-=right.z;}}
 else if(targetPath.length){const p=targetPath[0],delta=new THREE.Vector2(p.x-self.target.x,p.z-self.target.z);if(delta.length()<.2){targetPath.shift();}else{delta.multiplyScalar(Math.min(1,delta.length()/.9)/delta.length());dx=delta.x;dz=delta.y;}}
 const length=Math.hypot(dx,dz);if(length>1){dx/=length;dz/=length;}dx=Math.round(dx*1000)/1000;dz=Math.round(dz*1000)/1000;
 const signature=dx+','+dz;if(signature!==lastSent||length>.01&&now-lastInput>200){send({type:'move',dx,dz});lastSent=signature;lastInput=now;}
}
function fadeForeground(){
 if(!self)return;const target=fadeTarget.copy(self.model.position);target.y+=1.2;const distance=camera.position.distanceTo(target),ray=fadeRay.set(camera.position,fadeDirection.subVectors(target,camera.position).normalize()),hit=fadeHit;
 for(const stall of [...stalls.values(),...endless.occluders]){const intersects=ray.intersectBox(stall.group.userData.houseBounds,hit);const faded=!!intersects&&camera.position.distanceTo(hit)<distance-.4;if(stall.faded===faded)continue;stall.faded=faded;
  for(const child of stall.group.children)if(child.isLineSegments)child.visible=!faded;
  for(const mesh of stall.group.userData.structure){if(!mesh.isMesh)continue;if(faded){if(!mesh.userData.fadeMat){mesh.userData.originalMat=mesh.material;const mat=mesh.material.clone();mat.transparent=true;mat.opacity=.13;mat.depthWrite=false;mesh.userData.fadeMat=mat;}mesh.material=mesh.userData.fadeMat;for(const child of mesh.children)if(child.isLineSegments)child.visible=false;}else if(mesh.userData.originalMat){mesh.material=mesh.userData.originalMat;for(const child of mesh.children)if(child.isLineSegments)child.visible=true;}}
 }
}
function projectLabel(element,position,height=2.7,maxDistance=40){const v=labelVector.set(position.x,position.y+height,position.z);const distance=camera.position.distanceTo(v);v.project(camera);const visible=v.z>=-1&&v.z<=1&&Math.abs(v.x)<1.12&&Math.abs(v.y)<1.12&&distance<maxDistance;element.style.display=visible?'':'none';if(visible)element.style.transform=`translate(${(v.x*.5+.5)*stageWidth}px,${(-v.y*.5+.5)*stageHeight}px) translate(-50%,-100%)`;}
function selectSite(s,visit=false){selected=s;$('world-card').hidden=false;$('card-name').textContent=s.name;$('card-handle').textContent=s.slug?'@'+s.slug:'丐帮总舵';$('card-slogan').textContent=s.slogan||'行行好，赏口饭吃。';$('card-total').textContent=s.total;$('card-currency').textContent=' '+s.currency;$('card-coins').textContent=s.coins;$('card-exp').textContent=s.exp;$('world-coin').disabled=coinUsed.has(s.id);$('world-coin').textContent=coinUsed.has(s.id)?'今天丢过钢镚了':'丢个钢镚 · 免费';$('world-donate').href='/'+s.slug+'#donate';$('world-donate').hidden=!s.ready;$('world-profile').href='/'+s.slug;const avatar=$('card-avatar');avatar.replaceChildren();if(s.avatar){const image=document.createElement('img');image.src=s.avatar;image.alt='';avatar.append(image);}else avatar.textContent='🥣';if(visit){stopMovement();goal.visible=false;send({type:'visit',siteId:s.id});$('world-directory').hidden=true;$('directory-toggle').setAttribute('aria-expanded','false');renderer.domElement.focus({preventScroll:true});}}
function renderDirectory(){const text=$('world-search').value.trim().toLowerCase(),list=$('world-site-list');list.replaceChildren();const results=sites.filter(s=>(!directoryTravelOnly||s.id!==ownSite)&&(s.name+' '+s.slug).toLowerCase().includes(text));$('site-count').textContent=results.length+' 位';for(const s of results.slice(0,100)){const button=document.createElement('button');button.className='directory-row';button.type='button';const avatar=document.createElement('span');avatar.className='list-avatar';avatar.textContent='🥣';if(s.avatar){const img=document.createElement('img');img.src=s.avatar;img.alt='';img.loading='lazy';avatar.replaceChildren(img);}const content=document.createElement('span'),name=document.createElement('strong'),sub=document.createElement('small');name.textContent=s.name;sub.textContent=(s.slug?'@'+s.slug:'总舵')+' · 点击传送到店门口';content.append(name,sub);button.append(avatar,content);button.addEventListener('click',()=>visitShop(s.id));list.append(button);}if(!results.length){const p=document.createElement('p');p.className='directory-empty';p.textContent='没有找到这位街坊';list.append(p);}}
async function loadSites(force=false){
 if(sitesLoading){if(force){await sitesLoading;return loadSites()}return sitesLoading;}
 sitesLoading=(async()=>{const response=await fetch('/api/world/sites',{cache:'no-cache'});if(!response.ok)throw new Error('站点资料暂时不可用');const tag=response.headers.get('ETag');if(tag&&tag===catalogTag)return;const data=await response.json();catalogTag=tag;const previous=siteMap;
 sites=data.sites;bounds=data.bounds;coinExp=data.coinExp;$('night-amount').max=String(data.raid.maxBet);siteMap=new Map(sites.map(s=>[s.id,s]));siteMap.cells=indexShops(sites);renderDirectory();
 if(selected){const updated=siteMap.get(selected.id);if(updated){selected=updated;if(!$('world-card').hidden)selectSite(updated)}else{$('world-card').hidden=true;selected=null;}}
 for(const [id,stall] of stalls){const s=siteMap.get(id),old=previous.get(id);if(!s||!old||s.x!==old.x||s.z!==old.z||s.name!==old.name||s.skin!==old.skin||s.coins!==old.coins){disposeStall(stall);stalls.delete(id);}}
 shops?.refresh();if(endless)refreshNearby();return data;})();
 try{return await sitesLoading}finally{sitesLoading=null}
}
function onCoin(message){const s=siteMap.get(message.siteId);if(!s)return;s.exp+=Math.max(0,message.coins-s.coins)*coinExp;s.coins=message.coins;if(selected?.id===s.id){$('card-coins').textContent=s.coins;$('card-exp').textContent=s.exp;}
 const target=new THREE.Vector3(s.x-.6,1,s.z+3.55);if(self&&self.model.position.distanceTo(target)<42){const start=self.model.position.clone().add(new THREE.Vector3(0,1.5,0));const mesh=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,.06,12),material('#e4bd55'));scene.add(mesh);particles.push({mesh,start,target,age:0});say('叮！有人给 '+s.name+' 丢了一个钢镚');}}
async function coin(){if(!selected)return;const s=selected,button=$('world-coin');button.disabled=true;const data=new FormData();data.set('site',s.slug);data.set('bv',visitor);try{const response=await fetch('/coin',{method:'POST',body:data});const result=await response.json();say(result.msg||'钢镚已投递');if(result.mine>=result.per_day||result.added)coinUsed.add(s.id);if(selected?.id===s.id){button.disabled=coinUsed.has(s.id);button.textContent=coinUsed.has(s.id)?'今天丢过钢镚了':'丢个钢镚 · 免费';}}catch(error){say('网络开小差了，请稍后再试');button.disabled=false;}}
function bindUI(){
 $('directory-toggle').addEventListener('click',()=>{if($('world-directory').hidden)openDirectory();else closePanels();});$('directory-close').addEventListener('click',()=>{$('world-directory').hidden=true;$('directory-toggle').setAttribute('aria-expanded','false');});$('world-search').addEventListener('input',renderDirectory);$('card-close').addEventListener('click',()=>$('world-card').hidden=true);$('world-coin').addEventListener('click',coin);$('card-visit').addEventListener('click',()=>{if(selected)visitShop(selected.id)});
 document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>action(button.dataset.action)));
 $('world-home').addEventListener('click',()=>{if(ownSite&&siteMap.has(ownSite))visitShop(ownSite);else shops.open();});$('world-plaza').addEventListener('click',()=>travel('plaza'));$('world-visit').addEventListener('click',()=>openDirectory(true));
 window.addEventListener('keydown',event=>{const k=event.key.toLowerCase();if(k==='escape'){closePanels();return;}if(mobileUI?.blocked||event.ctrlKey||event.metaKey||event.altKey||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if(['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(k)){event.preventDefault();keys.add(k);}if(!event.repeat&&k==='b')action('beg');if(!event.repeat&&k==='e')action('wave');if(!event.repeat&&k==='f')social.openNearest();});
 window.addEventListener('keyup',event=>keys.delete(event.key.toLowerCase()));window.addEventListener('blur',()=>{keys.clear();targetPath=[];send({type:'move',dx:0,dz:0});});document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();targetPath=[];send({type:'move',dx:0,dz:0});}});
 const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('aria-label','街区画面，点击地面移动，WASD 或方向键走动');
 document.querySelectorAll('[data-move]').forEach(button=>{
  const key=button.dataset.move;
  button.addEventListener('pointerdown',event=>{if(mobileUI?.blocked)return;event.preventDefault();button.setPointerCapture(event.pointerId);targetPath=[];keys.add(key);button.classList.add('pressed');canvas.focus({preventScroll:true});});
  const release=()=>{keys.delete(key);button.classList.remove('pressed');send({type:'move',dx:0,dz:0});};
  button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
 });
 canvas.addEventListener('pointerdown',event=>{if(mobileUI?.blocked)return;canvas.focus({preventScroll:true});pointerIDs.add(event.pointerId);pointerStart=pointerIDs.size===1?{id:event.pointerId,x:event.clientX,y:event.clientY}:null;});canvas.addEventListener('pointercancel',event=>{pointerIDs.delete(event.pointerId);pointerStart=null;});canvas.addEventListener('pointerup',event=>{pointerIDs.delete(event.pointerId);const start=pointerStart;pointerStart=null;if(!start||start.id!==event.pointerId||event.button!==0||Math.hypot(start.x-event.clientX,start.y-event.clientY)>6)return;
  if(mobileUI?.blocked)return;const rect=canvas.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);const picked=raycaster.intersectObjects(pickables,false)[0];if(picked){const data=picked.object.userData;if(data.playerID){social.open(data.playerID);return;}if(data.shopLot){shops.open(data.shopLot);return;}if(data.travel){travel(data.travel);return;}if(Number.isInteger(data.raidRoom)){closePanels();night.open(data.raidRoom);return;}const s=siteMap.get(data.siteId);if(s){closePanels();selectSite(s)}return;}const deck=raycaster.intersectObjects(landmarks.surfaces,false)[0];if(deck){routeTo(deck.point.x,deck.point.z);return;}const point=new THREE.Vector3();if(raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),point))routeTo(point.x,point.z);
 });
 window.addEventListener('pagehide',()=>{leaving=true;clearTimeout(reconnectTimer);socket?.close(1000);});window.addEventListener('pageshow',event=>{if(event.persisted){leaving=false;connect();}});
}
async function init(){
 if(['127.0.0.1','localhost'].includes(location.hostname)){document.querySelector('.version').textContent='3D / 本地预览';document.querySelector('#world-card .card-footnote').textContent='本地演示数据，不收取真实款项';}
 try{
  const touchDevice=root.dataset.mobile==='true'||matchMedia('(pointer: coarse)').matches||Math.min(innerWidth,innerHeight)<=600;
  renderer=new THREE.WebGLRenderer({antialias:!touchDevice,alpha:false,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio,touchDevice?1.25:1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NoToneMapping;$('world-canvas').append(renderer.domElement);
  setupMusic(root);
  scene=new THREE.Scene();scene.fog=new THREE.Fog(colors.paper,24,53);camera=new THREE.PerspectiveCamera(60,1,.1,110);
  scene.add(new THREE.HemisphereLight('#ffffff','#a69887',1.8));const sun=new THREE.DirectionalLight('#fff6e3',1.25);sun.position.set(-12,24,14);scene.add(sun);
  view=createFollowCamera(camera,renderer.domElement,root,()=>!!mobileUI?.blocked);
  await Promise.all([document.fonts.load('16px Pixel'),loadSites()]);art=createStreetArt(scene,labelLayer,pickables);({goal}=art.buildEnvironment());endless=createEndlessStreet(scene,root,pickables);landmarks=createLandmarks(scene,pickables);bindUI();
  shops=setupShops({root,getSites:()=>sites,getSelf:()=>self?.target,ownSite,onStop:stopMovement,onNotice:say,onTour:lot=>{if(!canTravel())return;stopMovement();view.reset();view.state.yaw=0;send({type:'tour',col:lot.col,row:lot.row})},onVisit:visitShop,onRefresh:()=>loadSites(true),onClosePanels:closePanels});
  social=setupSocial({root,scene,getSelf:()=>self,getPeople:()=>people,getSites:()=>sites,onSend:send,onStop:stopMovement,onNotice:say,onVisit:visitShop,onRoute:routeTo,onClosePanels:closePanels});
  mobileUI=setupWorldControls({root,stage,canvas:renderer.domElement,onStop:stopMovement,onNotice:say,onZoom:zoomBy});new ResizeObserver(resizeScene).observe(stage);resizeScene();const getPlayers=()=>[...people.values()].map(p=>p.state);minimap=setupMinimap({root,getSelf:()=>self?.target,getPlayers,getForward:()=>view.forward(),onTravel:travel});night=setupNight({scene,root,landmarks,getSelf:()=>self?.target,getPlayers,onStop:stopMovement,onNotice:say,onClosePanels:closePanels,onTravel:travel});
  loading.hidden=true;connect();siteRefresh=setInterval(()=>{if(!document.hidden)loadSites().catch(()=>{})},30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadSites().catch(()=>{})});
  let last=performance.now(),nearbyAt=0,inputAt=0,frameAt=0,labelsAt=0,metricsAt=last,frames=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setAnimationLoop(now=>{const interval=1000/(mobileUI?.touch?30:60);if(document.hidden||now-frameAt<interval)return;const dt=Math.min((now-last)/1000,.05);last=now;frameAt=now-(now-frameAt)%interval;
   if(now-inputAt>75){movement(now);inputAt=now;}if(now-nearbyAt>500){refreshNearby();nearbyAt=now;}
   for(const [id,p] of people){p.model.position.lerp(p.target,1-Math.exp(-dt*15));const yaw=p.state.yaw;let diff=(yaw-p.model.rotation.y+Math.PI*3)%(Math.PI*2)-Math.PI;p.model.rotation.y+=diff*(1-Math.exp(-dt*15));p.model.visible=p===self||!self||p.model.position.distanceToSquared(self.model.position)<3600;if(p.model.visible)animatePerson(p.model,p.state.action,reduced?0:now/1000,id.charCodeAt(0));}
   goal.visible=targetPath.length>0;root.dataset.pathLeft=String(targetPath.length);if(self){view.update(dt,self.model.position);root.dataset.selfX=self.model.position.x.toFixed(2);root.dataset.selfZ=self.model.position.z.toFixed(2);root.dataset.selfAction=self.state.action;setActionHighlight(self.state.action);}
   const labelsDue=now-labelsAt>1000/(mobileUI?.touch?20:30);if(labelsDue){labelsAt=now;for(const p of people.values())projectLabel(p.label,p.model.position,p.state.action==='beg'?2.9:3.3,48);}
   for(const [id,stall] of stalls){if(stall.owner.visible)animatePerson(stall.owner,'beg',reduced?0:now/1000,id);if(labelsDue)projectLabel(stall.label,{x:stall.group.position.x,y:0,z:stall.group.position.z+3},.25,29);}
   for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.age+=dt;const t=Math.min(1,p.age/.85);p.mesh.position.lerpVectors(p.start,p.target,t);p.mesh.position.y+=Math.sin(t*Math.PI)*2.6;p.mesh.rotation.z+=dt*8;if(t===1){scene.remove(p.mesh);p.mesh.geometry.dispose();particles.splice(i,1);}}
   minimap.update(now);night.update(now,camera);social.update(now);landmarks.update(now,night.roomState());fadeForeground();renderer.render(scene,camera);
   frames++;if(now-metricsAt>=1000){root.dataset.drawCalls=String(renderer.info.render.calls);root.dataset.geometries=String(renderer.info.memory.geometries);root.dataset.textures=String(renderer.info.memory.textures);root.dataset.fps=String(Math.round(frames*1000/(now-metricsAt)));frames=0;metricsAt=now;}
  });
 }catch(error){console.error(error);loading.hidden=false;loading.querySelector('h2').textContent='这次没能进入街头';loading.querySelector('p').textContent=renderer?'街区连接暂时不可用，请刷新重试。':'当前设备没有可用的 3D 图形能力，仍可使用原网页。';}
}
init();
