import * as THREE from 'three';
import { makePerson,animatePerson } from './art.js';
import { RAID_ROOMS,roomPosition,inBridge } from './geography.js';
import { nightClock,nightPhase,nightSelection,nightCanJoin,nightResult } from './night-state.js';
import { disposeOwned } from './batching.js';

export function setupNight({scene,root,landmarks,getSelf,getPlayers,onStop,onNotice,onClosePanels,onTravel}) {
  const $=id=>document.getElementById(id),panel=$('world-night'),guide=$('world-night-guide'),hud=$('night-hud'),occupants=new Map();
  const text=(id,value)=>{if($(id).textContent!==value)$(id).textContent=value};
  const day=scene.background,nightCanvas=document.createElement('canvas');nightCanvas.width=64;nightCanvas.height=32;
  const nctx=nightCanvas.getContext('2d');nctx.fillStyle='#17243f';nctx.fillRect(0,0,64,32);nctx.fillStyle='#283b59';nctx.fillRect(0,18,64,14);nctx.fillStyle='#fffbf0';for(const [x,y] of [[4,5],[15,9],[29,4],[43,11],[55,6]])nctx.fillRect(x,y,1,1);nctx.fillRect(35,7,3,3);
  const night=new THREE.CanvasTexture(nightCanvas);night.mapping=THREE.EquirectangularReflectionMapping;night.colorSpace=THREE.SRGBColorSpace;night.magFilter=THREE.NearestFilter;
  const lights=scene.children.filter(item=>item.isLight),enabled=root.dataset.raid==='true';
  const amount=$('night-amount'),join=$('night-join'),leave=$('night-leave'),radios=$('night-rooms'),markers=[];
  let isNight=false,visible=false,data=null,offset=0,lastPoll=0,lastSync=0,inflight=null,syncError=false,submitting=false,selected=-1,lastResult=0;
  let cinematicUntil=0,cinematicRound=null,replaying=false,overview=false,guidePending=false,guideSeen=false,lastRender=0,pendingOutcome=null,outcomeUntil=0;
  try{guideSeen=localStorage.getItem('world-night-guide-v1')==='seen'}catch{}
  function rememberGuide(){guideSeen=true;guidePending=false;try{localStorage.setItem('world-night-guide-v1','seen')}catch{}}
  function select(room){selected=room;render()}
  for(let i=0;i<6;i++){
    const button=document.createElement('button');button.type='button';button.dataset.room=i;button.setAttribute('aria-pressed','false');
    const number=document.createElement('b'),name=document.createElement('strong'),detail=document.createElement('small');number.textContent=`0${i+1}`;name.textContent=RAID_ROOMS[i];button.append(number,name,detail);button.addEventListener('click',()=>select(i));radios.append(button);
    const marker=document.createElement('button');marker.type='button';marker.className='night-room-marker';marker.hidden=true;marker.dataset.room=i;
    const title=document.createElement('strong'),sub=document.createElement('small');title.textContent=`0${i+1} ${RAID_ROOMS[i]}`;marker.append(title,sub);marker.setAttribute('aria-label',`选择藏身点 ${i+1} ${RAID_ROOMS[i]}`);marker.addEventListener('click',()=>open(i));$('world-labels').append(marker);markers.push(marker);
  }
  function phase(){return nightPhase(data,Date.now()+offset,!syncError&&(!data||Date.now()-lastSync<6500))}
  function showGuide(){if(!enabled)return;onClosePanels();overview=false;guidePending=false;guide.hidden=false;onStop()}
  function open(room){
    if(!enabled){onNotice('夜训暂未开放');return}
    onClosePanels();overview=false;guidePending=false;
    if(Number.isInteger(room)&&room>=0&&room<6)selected=room;
    panel.hidden=false;onStop();render();poll(true);
  }
  function showOverview(){onClosePanels();guidePending=false;overview=true;onStop()}
  $('night-open').addEventListener('click',()=>open());
  for(const id of ['night-help','night-panel-help'])$(id).addEventListener('click',showGuide);
  for(const id of ['night-guide-close','night-guide-later'])$(id).addEventListener('click',()=>{rememberGuide();guide.hidden=true});
  $('night-guide-start').addEventListener('click',()=>{rememberGuide();open()});
  $('night-guide-tour').addEventListener('click',()=>{rememberGuide();showOverview()});
  $('night-tour').addEventListener('click',showOverview);$('night-overview-close').addEventListener('click',()=>overview=false);
  $('night-close').addEventListener('click',()=>panel.hidden=true);
  $('night-skip').addEventListener('click',()=>cinematicUntil=0);
  $('night-outcome-close').addEventListener('click',()=>{pendingOutcome=null;outcomeUntil=0;$('night-outcome').hidden=true});
  $('night-again').addEventListener('click',()=>{outcomeUntil=0;$('night-outcome').hidden=true;onTravel('bridge')});
  $('night-replay').addEventListener('click',()=>{if(data?.last){onClosePanels();overview=false;play(data.last,true)}else onNotice('还没有上一局结果')});
  amount.addEventListener('input',render);

  function play(round,replay=false){
    if(!enabled||!replay&&round.id<=lastResult)return;
    lastResult=Math.max(lastResult,round.id);replaying=replay;overview=false;cinematicRound=round;cinematicUntil=performance.now()+8500;
    landmarks.playResult(round);
    const result=nightResult(round,Number(root.dataset.me));
    if(!replay&&(visible||round.players.some(p=>p.id===Number(root.dataset.me))))pendingOutcome=result;
    if(visible){onClosePanels();onStop();guidePending=!guideSeen;onNotice(replay?'正在回放上一局，不会再次结算':'警车出动！先看巡查结果，再选下一局。')}
    render();
  }
  function populate(){
    if(!data)return;
    const online=new Set(getPlayers().map(p=>p.siteId).filter(Boolean)),wanted=new Set();
    const round=performance.now()<cinematicUntil&&cinematicRound?cinematicRound:data.round,counts=Array(6).fill(0);
    for(const player of round?.players||[]){
      const index=counts[player.room]++;if(online.has(player.id)||index>=5)continue;
      const id=String(player.id);wanted.add(id);let actor=occupants.get(id);
      if(!actor){actor={model:makePerson(player.skin),label:document.createElement('div')};actor.label.className='raid-occupant';actor.label.textContent='夜巡 · '+player.name;$('world-labels').append(actor.label);scene.add(actor.model);occupants.set(id,actor)}
      const p=roomPosition(player.room);actor.model.position.set(p.x+(index%3-1)*.9,0,p.z+Math.floor(index/3)*.9);actor.player=player;actor.round=round;
    }
    for(const [id,actor] of occupants)if(!wanted.has(id)){scene.remove(actor.model);disposeOwned(actor.model);actor.label.remove();occupants.delete(id)}
  }
  async function poll(force=false){
    if(!enabled||!force&&(!visible||document.hidden))return;
    if(inflight){if(force){await inflight;return poll(true)}return inflight}
    lastPoll=performance.now();
    inflight=(async()=>{
      const sent=Date.now();
      try{
        const response=await fetch('/raid/state',{cache:'no-store'});if(!response.ok)throw new Error('状态暂不可用');
        const next=await response.json(),previous=data;
        offset=next.now-(sent+Date.now())/2;lastSync=Date.now();syncError=false;
        selected=nightSelection(previous,next,selected);
        if(!previous||previous.round?.id!==next.round?.id)amount.value=String(next.me?.amt||1);
        data=next;
        if(next.last&&previous&&next.last.id!==previous.last?.id&&next.now-next.last.locks_at<10000)play(next.last);
        populate();render();
      }catch{syncError=true;render();if(force)onNotice('暂时没能同步夜训状态，联网后会自动重试')}
    })();
    try{return await inflight}finally{inflight=null}
  }
  function render(){
    const currentPhase=phase(),clock=nightClock(data?.round,Date.now()+offset),me=data?.me,joined=!!me?.amt,caught=root.dataset.selfAction==='caught',cinema=visible&&performance.now()<cinematicUntil;
    const status=!enabled?'disabled':cinema?'patrol':caught?'caught':currentPhase;
    root.dataset.nightStatus=status;root.dataset.nightSelected=String(selected);root.dataset.nightConfirmed=String(joined?me.room:-1);
    const phaseName={loading:'同步中',offline:'连接中断',choosing:'尚未参加',hidden:'已确认藏身',locked:'已锁门',patrol:replaying?'上局回放':'警车巡查',caught:'返回广场中',disabled:'暂未开放'}[status];
    text('night-round',data?.round?`天桥夜训 · 第 ${data.round.id} 局`:'天桥夜训 · 夜巡玩法');text('night-phase',phaseName);
    const waiting=['loading','offline','disabled'].includes(status),timerLabel=waiting?'等待同步':cinema?'下一局锁门':currentPhase==='locked'?'等待警车':'距锁门';
    text('night-timer-label',timerLabel);text('night-clock-label',timerLabel);text('night-hud-clock',waiting?'--:--':clock.text);text('night-clock',waiting?'--:--':clock.text);
    $('night-hud-clock').setAttribute('aria-label',`${timerLabel} ${waiting?'尚未同步':clock.text}`);
    text('night-panel-round',data?.round?`第 ${data.round.id} 局`:'读取中');$('night-progress-fill').style.width=`${clock.remaining*100}%`;
    hud.dataset.urgent=String(!waiting&&!cinema&&clock.seconds>0&&clock.seconds<=10);panel.dataset.urgent=hud.dataset.urgent;
    text('night-hud-mine',joined?`已藏：${RAID_ROOMS[me.room]}`:'尚未参加');
    const hint={loading:'正在读取本局时间，请稍等。',offline:'状态未同步，暂不能确认或撤出。',choosing:me?'1 选地点 → 2 确认藏好 → 3 等警车':'可先看地点；登录后用免费钢镚参加。',hidden:`已确认 ${me?.amt||0} 个钢镚 · 锁门前可调整`,locked:'地点已锁定，等警车巡查并结算。',patrol:replaying?'这是上局回放，不会再次使用钢镚。':'正在巡查，上方时间属于下一局。',caught:'被发现了，稍后回广场再出发。',disabled:'夜训暂未开放，可先逛逛天桥。'}[status];
    text('night-next',hint);text('night-open',joined?'查看 / 调整藏身点':'选择藏身点');$('night-open').disabled=!enabled||cinema||caught;$('night-help').disabled=!enabled;
    const canAct=!cinema&&!caught&&['choosing','hidden'].includes(currentPhase),changed=!joined||selected!==me.room||Number(amount.value)!==me.amt;
    join.hidden=!me;leave.hidden=!joined;$('night-login').hidden=!!me;amount.disabled=!me||!canAct||submitting;
    join.disabled=!canAct||!changed||!nightCanJoin({phase:currentPhase,selected,me,amount:Number(amount.value),max:Number(amount.max),submitting,caught});leave.disabled=!canAct||submitting;
    text('night-balance',me?`可用 ${me.coins} 个钢镚${joined?` · 本局已用 ${me.amt} 个`:''}`:'围观中 · 登录站长账号后可参加');
    text('night-current',joined?`✓ 已确认藏在「${RAID_ROOMS[me.room]}」 · ${me.amt} 个钢镚`:'尚未参加 · 选中地点后，还要点「确认藏好」');
    $('night-current').dataset.joined=String(joined);
    text('night-selection',selected<0?'先点一个编号地点。蓝圈是藏身点，金圈表示已确认。':joined&&selected===me.room?'金色标记是本局已确认的位置。走动不会更改它。':`预选「${RAID_ROOMS[selected]}」 · 尚未确认${joined?`，目前仍藏在「${RAID_ROOMS[me.room]}」`:''}`);
    text('night-join',submitting?'正在确认…':!canAct?'暂不能确认，等待下一步':selected<0?'先选择藏身点':!changed?'已藏好，等警车巡查':`${joined?'确认调整到':'确认藏在'}「${RAID_ROOMS[selected]}」 · ${amount.value} 钢镚`);
    text('night-submit-hint',!canAct?hint:join.disabled&&selected>=0&&changed&&me?'请输入范围内的整数钢镚，最多可用余额加本局已用数量。':'点击确认后才会使用钢镚；锁门前可撤出。人数只表示当前藏身人数，不代表安全。');
    $('night-step-choose').dataset.state=selected>=0?'done':'active';$('night-step-confirm').dataset.state=joined&&!changed?'done':selected>=0?'active':'pending';$('night-step-wait').dataset.state=joined&&!changed?'active':'pending';
    const counts=Array(6).fill(0);for(const p of data?.round?.players||[])counts[p.room]++;
    for(let room=0;room<6;room++){
      const button=radios.children[room],confirmed=joined&&me.room===room;
      button.setAttribute('aria-pressed',String(selected===room));button.dataset.confirmed=String(confirmed);
      const label=confirmed?'✓ 已藏身':selected===room?'预选 · 未确认':`当前 ${counts[room]} 人`;if(button.lastElementChild.textContent!==label)button.lastElementChild.textContent=label;
      markers[room].dataset.confirmed=String(confirmed);markers[room].dataset.selected=String(selected===room);
      const sub=confirmed?'✓ 本局已确认':selected===room?'预选 · 点此确认':`${counts[room]} 人 · 点此选择`;if(markers[room].lastElementChild.textContent!==sub)markers[room].lastElementChild.textContent=sub;
    }
    const result=nightResult(data?.last,Number(root.dataset.me));$('night-result').hidden=!result;
    if(result){text('night-result-title',result.title);text('night-result-text',result.text)}$('night-replay').disabled=!data?.last||cinema;
  }
  async function bet(withdraw=false){
    if(!data?.me||!data?.round||submitting)return;
    const value=withdraw?0:Number(amount.value);
    if(!['choosing','hidden'].includes(phase())||performance.now()<cinematicUntil||root.dataset.selfAction==='caught'){onNotice('当前不能调整，等状态同步或下一局开始');return}
    if(!withdraw&&!nightCanJoin({phase:phase(),selected,me:data.me,amount:value,max:Number(amount.max)})){onNotice('先选择藏身点，再填可用范围内的整数钢镚');return}
    submitting=true;render();
    try{
      const body=new URLSearchParams({room:String(withdraw?data.me.room:selected),amount:String(value),round:String(data.round.id)});
      const response=await fetch('/raid/bet',{method:'POST',body}),result=await response.json();
      if(!response.ok||!result.ok){onNotice(result.msg||'没能进场，请重试');await poll(true);return}
      panel.hidden=true;onStop();onNotice(withdraw?'已撤出本局，钢镚退回；还可重新选择':'✓ 已确认藏好！看倒计时等警车，锁门前可调整');await poll(true);
    }catch{onNotice('暂时没能确认，请联网后查看本局状态');syncError=true}finally{submitting=false;render()}
  }
  join.addEventListener('click',()=>bet(false));leave.addEventListener('click',()=>bet(true));
  return {
    open,
    exitOverview(){overview=false},
    roomState(){return {selected,confirmed:data?.me?.amt?data.me.room:-1}},
    receive(round){play(round);poll(true)},
    update(now,camera){
      const self=getSelf();if(!self){hud.hidden=true;for(const marker of markers)marker.hidden=true;return}
      const arrived=!visible&&inBridge(self.x,self.z);visible=inBridge(self.x,self.z);hud.hidden=!visible;
      if(arrived){guidePending=enabled&&!guideSeen;poll(true)}
      if(!visible){overview=false;guidePending=false;if(!panel.hidden)panel.hidden=true;if(!guide.hidden)guide.hidden=true}
      if(visible!==isNight){isNight=visible;scene.background=isNight?night:day;scene.fog.color.set(isNight?'#263246':'#f4eedd');for(const light of lights)light.intensity=light.isHemisphereLight?(isNight?.9:1.8):(isNight?.5:1.25)}
      if(enabled&&now-lastPoll>2000)poll();
      const cinema=visible&&now<cinematicUntil,tour=visible&&overview&&!cinema;
      root.classList.toggle('cinematic',cinema||tour);root.classList.toggle('night-overview',tour);root.classList.toggle('has-night-outcome',now<outcomeUntil);$('night-cinematic').hidden=!cinema;$('night-overview').hidden=!tour;
      root.dataset.raidPhase=cinema?'patrol':tour?'overview':'idle';
      const scale=tour?Math.max(1,1.1/camera.aspect):1,far=tour?150*scale:110;
      if(camera.far!==far){camera.far=far;camera.updateProjectionMatrix()}
      scene.fog.near=cinema||tour?50*scale:24;scene.fog.far=cinema||tour?125*scale:53;
      if(cinema||tour){camera.position.set(-48,tour?38*scale:22,tour?-50+50*scale:-10);camera.lookAt(-48,tour?0:1,-52);camera.updateMatrixWorld()}
      if(cinema){const age=8.5-(cinematicUntil-now)/1000;text('night-cinematic-text',`${replaying?'回放 · ':'警车出动 · '}${age<4?'巡查藏身点':cinematicRound?.status==='void'?'本局流局，钢镚退回':`查封「${RAID_ROOMS[cinematicRound?.killed]}」`}`)}
      if(pendingOutcome&&now>=cinematicUntil){text('night-outcome-title',pendingOutcome.title);text('night-outcome-text',pendingOutcome.text);outcomeUntil=now+15000;pendingOutcome=null}
      $('night-outcome').hidden=now>=outcomeUntil;
      if(guidePending&&!cinema&&!tour&&!root.classList.contains('panel-open')&&!$('world-orientation').open)showGuide();
      if(now-lastRender>180){render();lastRender=now;if(data)populate()}
      for(const actor of occupants.values()){
        const caught=now<cinematicUntil&&actor.round.killed===actor.player.room&&actor.round.status==='settled';animatePerson(actor.model,caught?'caught':'beg',now/1000,actor.player.id);
        const p=actor.model.position,v=new THREE.Vector3(p.x,2.8,p.z);v.project(camera);
        const show=visible&&(cinema||tour||Math.hypot(p.x-self.x,p.z-self.z)<25)&&v.z>-1&&v.z<1&&Math.abs(v.x)<1&&Math.abs(v.y)<1;actor.label.hidden=!show;
        if(show)actor.label.style.transform=`translate(${(v.x*.5+.5)*camera.userData.width}px,${(-v.y*.5+.5)*camera.userData.height}px) translate(-50%,-100%)`;
      }
      for(let i=0;i<6;i++){
        const p=roomPosition(i),v=new THREE.Vector3(p.x,4.4,p.z);v.project(camera);
        const show=visible&&!cinema&&!root.classList.contains('panel-open')&&v.z>-1&&v.z<1&&Math.abs(v.x)<.95&&Math.abs(v.y)<.92;
        markers[i].hidden=!show;if(show)markers[i].style.transform=`translate(${(v.x*.5+.5)*camera.userData.width}px,${(-v.y*.5+.5)*camera.userData.height}px) translate(-50%,-100%)`;
      }
    },
  };
}
