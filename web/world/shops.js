import { cellAt, terrainSolid } from './terrain.js';

export const lotKey=(col,row)=>`${col},${row}`;
export const lotPosition=(col,row)=>({x:col*8-16,z:row*16-9,col,row});
export function shopLot(col,row) {
  if(!Number.isInteger(col)||!Number.isInteger(row)||Math.abs(col)>10000||Math.abs(row)>10000||!terrainSolid(col,row))return false;
  const {x,z}=lotPosition(col,row);
  return ![[-70,-26,-18,20],[-82,-14,-84,-22],[-54,-42,-24,-18]].some(([l,r,t,b])=>x+3.4>=l&&x-3.4<=r&&z+4.2>=t&&z-3.9<=b);
}
export function indexShops(sites) {
  const cells=new Map();
  for(const site of sites){const cell=cellAt(site.x,site.z);cells.set(lotKey(cell.col,cell.row),site);}
  return cells;
}
export function nearbyLots(sites,origin,limit=8) {
  const occupied=indexShops(sites),cell=cellAt(origin.x,origin.z),lots=[];
  for(let dx=-10;dx<=10;dx++)for(let dz=-6;dz<=6;dz++){
    const col=cell.col+dx,row=cell.row+dz;
    if(shopLot(col,row)&&!occupied.has(lotKey(col,row)))lots.push(lotPosition(col,row));
  }
  return lots.sort((a,b)=>Math.hypot(a.x-origin.x,a.z-origin.z)-Math.hypot(b.x-origin.x,b.z-origin.z)||a.row-b.row||a.col-b.col).slice(0,limit);
}
export const lotAddress=lot=>`街区 ${lot.col} / ${lot.row} 号`;

export function setupShops({root,getSites,getSelf,ownSite,onStop,onNotice,onTour,onVisit,onRefresh,onClosePanels}) {
  const panel=document.getElementById('world-shops'),list=document.getElementById('shop-list'),confirm=document.getElementById('shop-claim');
  const own=document.getElementById('shop-own'),selection=document.getElementById('shop-selection');
  let selected=null,busy=false;
  function render(){
    const sites=getSites(),mine=sites.find(s=>s.id===ownSite),origin=getSelf()||{x:-16,z:0};
    own.textContent=mine?`${mine.claimed?'已入驻':'当前店铺'} · ${mine.name} · ${lotAddress(cellAt(mine.x,mine.z))}`:'登录站长账号，选一间属于自己的小店。';
    document.getElementById('shop-home').hidden=!mine;
    document.getElementById('shop-login').hidden=!!mine;
    document.getElementById('shop-register').hidden=!!ownSite;
    document.getElementById('shop-account-note').hidden=!ownSite||!!mine;
    const choices=nearbyLots(sites,origin);
    if(selected&&!choices.some(l=>l.col===selected.col&&l.row===selected.row))choices.unshift(selected);
    list.replaceChildren();
    for(const lot of choices){
      const button=document.createElement('button');button.type='button';button.className='shop-option';button.setAttribute('aria-pressed',String(selected?.col===lot.col&&selected?.row===lot.row));
      const title=document.createElement('strong'),sub=document.createElement('small');title.textContent=lotAddress(lot);sub.textContent='空铺待入驻 · '+Math.round(Math.hypot(lot.x-origin.x,lot.z-origin.z))+' 步';button.append(title,sub);
      button.addEventListener('click',()=>{selected=lot;render()});list.append(button);
    }
    const occupied=selected?indexShops(sites).get(lotKey(selected.col,selected.row)):null;
    selection.textContent=selected?occupied?`这里已是「${occupied.name}」的店铺`:`已选 ${lotAddress(selected)} · 招牌将显示你的昵称`:'选一间空铺，也可以直接点击街上的「待入驻」招牌。';
    confirm.hidden=!mine;confirm.disabled=busy||!selected||!!occupied;
    document.getElementById('shop-tour').disabled=!selected||busy;
    root.dataset.shopSelected=selected?lotKey(selected.col,selected.row):'';
  }
  function open(lot){onClosePanels();if(lot)selected=lot;panel.hidden=false;onStop();render();}
  document.getElementById('shops-toggle').addEventListener('click',()=>open());
  document.getElementById('shops-close').addEventListener('click',()=>panel.hidden=true);
  document.getElementById('shop-home').addEventListener('click',()=>{panel.hidden=true;onVisit(ownSite)});
  document.getElementById('shop-tour').addEventListener('click',()=>{if(selected){panel.hidden=true;onTour(selected)}});
  confirm.addEventListener('click',async()=>{
    if(!selected||busy)return;busy=true;render();
    try{
      const response=await fetch('/api/world/shop',{method:'POST',body:new URLSearchParams({col:selected.col,row:selected.row})});
      const result=await response.json();
      if(!response.ok||!result.ok){onNotice(result.msg||'暂时没能入驻');await onRefresh();return;}
      await onRefresh();panel.hidden=true;onNotice(result.msg);onVisit(ownSite);
    }catch{onNotice('网络开小差了，请刷新确认入驻状态');}finally{busy=false;render();}
  });
  return {open,refresh(){if(!panel.hidden)render()}};
}
