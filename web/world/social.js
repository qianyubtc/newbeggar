import * as THREE from 'three';
import { material } from './art.js';
import { groundHeight } from './geography.js';

const PHRASES={stroll:'一起逛街吧！',luck:'祝你今天盆满钵满！',shop:'有空来我店里坐坐～'};
export const socialDistance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function canInteract(a,b){return !!a&&!!b&&a.id!==b.id&&a.action!=='caught'&&b.action!=='caught'&&socialDistance(a,b)<=6&&Math.abs(groundHeight(a.x,a.z)-groundHeight(b.x,b.z))<=1.5;}

export function setupSocial({root,scene,getSelf,getPeople,getSites,onSend,onStop,onNotice,onVisit,onRoute,onClosePanels}) {
  const panel=document.getElementById('world-social'),hud=document.getElementById('social-nearby'),list=document.getElementById('social-players'),feed=document.getElementById('social-feed');
  const sparkGeo=new THREE.BoxGeometry(.12,.12,.12),effects=[];
  let targetID=null,nearbyID=null,lastUpdate=0,cooldown=0,roster='';
  function target(){return getPeople().get(targetID)}
  function select(id){targetID=id;render();}
  function render(){
    const people=getPeople(),self=getSelf(),p=target(),others=[...people.values()].filter(p=>p!==self).sort((a,b)=>socialDistance(a.state,self?.state||{x:0,z:0})-socialDistance(b.state,self?.state||{x:0,z:0}));
    const key=others.map(p=>p.state.id+':'+p.state.name).join('|');
    if(key!==roster){roster=key;list.replaceChildren();for(const p of others.slice(0,12)){const b=document.createElement('button');b.type='button';b.textContent=p.state.name;b.dataset.player=p.state.id;b.addEventListener('click',()=>select(p.state.id));list.append(b);}}
    for(const b of list.children)b.setAttribute('aria-pressed',String(b.dataset.player===targetID));
    document.getElementById('social-name').textContent=p?.state.name||'街坊已离开';
    document.getElementById('social-distance').textContent=p&&self?canInteract(self.state,p.state)?'就在身边 · 选一种方式打个招呼':`相距 ${Math.round(socialDistance(self.state,p.state))} 步 · 走近后可互动`:'等下一位街坊来广场相见。';
    for(const button of panel.querySelectorAll('[data-social]'))button.disabled=!p||!self||!canInteract(self.state,p.state)||performance.now()<cooldown||(button.dataset.phrase==='shop'&&!Number(root.dataset.me));
    document.getElementById('social-approach').hidden=!p||!self||canInteract(self.state,p.state);
    const site=p&&getSites().find(s=>s.id===p.state.siteId);document.getElementById('social-shop').hidden=!site;
  }
  function open(id){onClosePanels();targetID=id||nearbyID;panel.hidden=false;onStop();roster='';render()}
  hud.addEventListener('click',()=>open(nearbyID));document.getElementById('social-close').addEventListener('click',()=>panel.hidden=true);
  for(const button of panel.querySelectorAll('[data-social]'))button.addEventListener('click',()=>{
    const p=target(),self=getSelf();if(!p||!self)return;
    onStop();onSend({type:'interact',target:p.state.id,kind:button.dataset.social,phrase:button.dataset.phrase||''});cooldown=performance.now()+2600;render();panel.hidden=true;
  });
  document.getElementById('social-shop').addEventListener('click',()=>{const p=target();if(p?.state.siteId){panel.hidden=true;onVisit(p.state.siteId)}});
  document.getElementById('social-approach').addEventListener('click',()=>{
    const p=target(),self=getSelf();if(!p||!self)return;panel.hidden=true;
    const angle=Math.atan2(self.target.z-p.target.z,self.target.x-p.target.x);onRoute(p.target.x+Math.cos(angle)*1.6,p.target.z+Math.sin(angle)*1.6);
  });
  return {
    open,
    openNearest(){if(nearbyID)open(nearbyID);else onNotice('附近还没有街坊，去广场转转吧')},
    receive(message){
      const people=getPeople(),from=people.get(message.from),to=people.get(message.to);if(!from||!to)return;
      const self=getSelf(),mine=self&&(message.from===self.state.id||message.to===self.state.id),now=performance.now();
      if(mine){onStop();cooldown=now+2500}
      const text=message.kind==='clink'?'叮！碰碗交个朋友 🥣':message.kind==='say'?PHRASES[message.phrase]:'嗨，街坊！很高兴遇见你 ✋';
      if(!text)return;
      from.socialText=text;from.socialUntil=now+4200;to.socialText=message.kind==='clink'?'一碗之交，好运加倍！':message.kind==='say'?'收到！江湖路上一起走～':'嗨！欢迎来这条街～';to.socialUntil=now+4200;
      if(mine||self&&socialDistance(from.state,self.state)<20){
        const row=document.createElement('div');row.textContent=from.state.name+' → '+to.state.name+' · '+text;feed.prepend(row);while(feed.children.length>3)feed.lastElementChild.remove();setTimeout(()=>row.remove(),6000);
        if(mine)onNotice(text);
      }
      if(message.kind==='clink'){
        const group=new THREE.Group();group.position.copy(from.model.position).lerp(to.model.position,.5);group.position.y+=1.5;
        for(let i=0;i<8;i++){const m=new THREE.Mesh(sparkGeo,material('#ffcc00'));m.rotation.z=i*Math.PI/4;group.add(m)}
        scene.add(group);effects.push({group,at:now});
      }
    },
    update(now){
      const self=getSelf(),people=getPeople();
      if(now-lastUpdate>200){lastUpdate=now;const nearest=self?[...people.values()].filter(p=>canInteract(self.state,p.state)).sort((a,b)=>socialDistance(a.state,self.state)-socialDistance(b.state,self.state))[0]:null;
        nearbyID=nearest?.state.id;hud.hidden=!nearest;hud.textContent=nearest?'✋ '+nearest.state.name+' · 互动 F':'';root.dataset.nearby=nearbyID||'';if(!panel.hidden)render();
      }
      for(const p of people.values())if(now<p.socialUntil&&p.state.action!=='caught'){p.bubble.hidden=false;p.bubble.textContent=p.socialText;}
      for(let n=effects.length-1;n>=0;n--){const e=effects[n],t=(now-e.at)/1600;
        if(t>1){e.group.removeFromParent();effects.splice(n,1);continue}
        e.group.children.forEach((m,i)=>{const a=i*Math.PI/4;m.position.set(Math.cos(a)*t*1.5,Math.sin(a)*t*1.5+Math.sin(t*Math.PI)*.5,0);m.scale.setScalar(1-t);m.rotation.y=t*8});e.group.lookAt(e.group.position.clone().add(new THREE.Vector3(0,0,1)));
      }
    },
  };
}
