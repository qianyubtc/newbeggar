import { DESTINATIONS, inPlaza, inBridge } from './geography.js';
export function setupMinimap({root,getSelf,getPlayers,getForward,onTravel}) {
  const canvas=document.getElementById('world-map'),ctx=canvas.getContext('2d'),hits=[];let last=0;
  const panel=document.getElementById('world-minimap'),toggle=document.getElementById('map-toggle');
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));panel.classList.toggle('collapsed',open);});
  document.querySelectorAll('[data-travel]').forEach(button=>button.addEventListener('click',()=>onTravel(button.dataset.travel)));
  canvas.addEventListener('click',event=>{const rect=canvas.getBoundingClientRect(),x=(event.clientX-rect.left)*canvas.width/rect.width,y=(event.clientY-rect.top)*canvas.height/rect.height;const hit=hits.find(p=>Math.hypot(p.x-x,p.y-y)<19);if(hit)onTravel(hit.id);});
  return {update(now){
    if(now-last<150||panel.classList.contains('collapsed'))return;last=now;
    const self=getSelf();if(!self)return;
    const center=Math.hypot(self.x+48,self.z+20)>95?{x:self.x,z:self.z}:{x:-45,z:-24};
    const point=(x,z)=>({x:88+(x-center.x)*1.15,y:64+(z-center.z)*.88});
    ctx.fillStyle='#f4eedd';ctx.fillRect(0,0,176,128);ctx.strokeStyle='#ddd2b7';ctx.lineWidth=4;
    for(let z=-160;z<=160;z+=16){const p=point(center.x,z+Math.floor(center.z/16)*16);ctx.beginPath();ctx.moveTo(0,p.y);ctx.lineTo(176,p.y);ctx.stroke();}
    const plaza=point(-48,0),bridge=point(-48,-50);
    ctx.fillStyle='#ffe46b';ctx.fillRect(plaza.x-23,plaza.y-17,47,33);ctx.strokeStyle='#1e1e2e';ctx.lineWidth=1;ctx.strokeRect(plaza.x-23,plaza.y-17,47,33);
    ctx.fillStyle='#637d9c';ctx.fillRect(bridge.x-4,bridge.y-22,8,44);ctx.fillStyle='#8e5cff';ctx.fillRect(bridge.x-30,bridge.y-3,60,6);
    hits.length=0;ctx.font='10px Pixel,monospace';ctx.textAlign='center';ctx.textBaseline='middle';
    for(const [id,target] of Object.entries(DESTINATIONS)){
      const raw=point(target.x,id==='bridge'?-50:target.z),p={x:Math.max(18,Math.min(158,raw.x)),y:Math.max(12,Math.min(106,raw.y)),id};hits.push(p);
      ctx.fillStyle='#1e1e2e';ctx.fillRect(p.x-4,p.y-4,8,8);ctx.fillStyle='#fffbf0';ctx.fillRect(p.x-2,p.y-2,4,4);
      ctx.fillStyle='#1e1e2e';ctx.fillText(id==='plaza'?'广场':id==='bridge'?'天桥':'街区',p.x,p.y+12);
    }
    for(const player of getPlayers()){
      const p=point(player.x,player.z);if(p.x<2||p.x>174||p.y<2||p.y>126)continue;
      ctx.fillStyle='#3d8bfd';ctx.fillRect(p.x-2,p.y-2,4,4);
    }
    const p=point(self.x,self.z),f=getForward();ctx.save();ctx.translate(Math.max(4,Math.min(172,p.x)),Math.max(4,Math.min(124,p.y)));ctx.rotate(Math.atan2(f.z*.88,f.x*1.15)+Math.PI/2);
    ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(5,5);ctx.lineTo(0,2);ctx.lineTo(-5,5);ctx.closePath();ctx.fillStyle='#ff4b4b';ctx.fill();ctx.strokeStyle='#1e1e2e';ctx.stroke();ctx.restore();
    ctx.fillStyle='#1e1e2e';ctx.font='8px monospace';ctx.fillText('N ↑',159,10);
    root.dataset.mapZone=inPlaza(self.x,self.z)?'plaza':inBridge(self.x,self.z)?'bridge':'street';
  }};
}
