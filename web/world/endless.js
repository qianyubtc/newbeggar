import * as THREE from 'three';
import { box, plaque, tree, lamp, material, colors } from './art.js';
import { chunkKeys, cellAt, siteAtCell, terrainSeed, terrainSolid } from './terrain.js';
import { reserved, zoneName } from './geography.js';
import { shopLot,lotPosition } from './shops.js';
import { batchStatic,disposeOwned } from './batching.js';

function recycle(group) {
  group.removeFromParent();
  disposeOwned(group);
}

export function createEndlessStreet(scene, root,pickables) {
  const chunks = new Map(), scenery = new Map();
  const pavingGeo = new THREE.BoxGeometry(.9,.035,.85);
  const canvas=document.createElement('canvas');canvas.width=128;canvas.height=64;
  const sky=canvas.getContext('2d');
  for(const [color,y,h] of [['#a8cee7',0,15],['#c3dcea',15,10],['#e2e6de',25,7],['#f4eedd',32,32]]){sky.fillStyle=color;sky.fillRect(0,y,128,h);}
  sky.fillStyle='#fffbf0';for(const [x,y,w] of [[10,12,14],[59,18,19],[99,9,12]]){sky.fillRect(x,y,w,3);sky.fillRect(x+3,y-2,w-6,2);}
  const texture=new THREE.CanvasTexture(canvas);texture.mapping=THREE.EquirectangularReflectionMapping;texture.colorSpace=THREE.SRGBColorSpace;texture.magFilter=THREE.NearestFilter;scene.background=texture;

  function makeChunk(cx,cz) {
    const group=new THREE.Group();group.position.set(cx*48,0,cz*48);
    box(group,48,.1,48,0,-.13,16,'#e9e1ca');
    const paving=new THREE.InstancedMesh(pavingGeo,material('#e4d9bf'),3*48*2),matrix=new THREE.Matrix4();let count=0;
    for(let row=0;row<3;row++){
      const z=row*16;
      box(group,48,.04,6.1,0,0,z,'#d3c6ac');
      for(const edge of [-3.6,3.6]){
        box(group,48,.14,1.2,0,.045,z+edge,colors.paper);
        box(group,48,.07,.08,0,.07,z+edge+(edge>0?-.6:.6),'#8d8170');
        for(let i=0;i<48;i++){matrix.makeTranslation(-23.5+i,.135,z+edge);paving.setMatrixAt(count++,matrix);}
      }
      for(let x=-22;x<24;x+=4)box(group,1.7,.018,.08,x,.031,z,colors.gold);
      for(const x of [-20,4])lamp(group,x,z-3.3);
    }
    group.add(paving);batchStatic(group);scene.add(group);return group;
  }
  function makeScenery(col,row) {
    const seed=terrainSeed(col,row),x=col*8-16,z=row*16-9,group=new THREE.Group();group.position.set(x,0,z);
    if(terrainSolid(col,row)){
      const accent=['#b75b43','#e0a800','#637d9c','#876a91'][seed%4],height=3.1+(seed%4)*.35;
      box(group,5.9,height,4.8,0,height/2,-1,seed%2?'#efe1c4':'#fffbf0',true);
      box(group,6.3,.18,5.2,0,height+.12,-1,colors.ink);
      box(group,6.1,.22,5,0,height+.3,-1,accent,true);
      for(let i=0;i<5;i++)box(group,.05,.035,4.8,-2+i,height+.43,-1,colors.ink);
      box(group,1.1,2,.09,1.5,1.05,1.44,'#805c43',true);
      box(group,1.3,1.2,.1,-1.4,1.8,1.45,colors.ink);
      box(group,1.1,1,.1,-1.4,1.8,1.52,'#efbd61');
      box(group,.07,1,.05,-1.4,1.8,1.59,colors.ink);
      const names=['巷口茶铺','一碗热面','江湖杂货','街角书屋','老街客栈','好运小铺'],available=shopLot(col,row);
      plaque(group,available?'空铺待入驻':names[seed%names.length],available?'点招牌 · 挑个自己的位置':'老街风物',3.9,1.05,0,height-.55,1.48,available?'gold':seed%3?'ink':'gold');
      if(available){const hit=new THREE.Mesh(new THREE.BoxGeometry(5.9,4,5),new THREE.MeshBasicMaterial({visible:false}));hit.position.set(0,2,-.8);hit.userData.shopLot=lotPosition(col,row);group.add(hit);pickables.push(hit);group.userData.shopHit=hit;}
      for(let i=0;i<6;i++)box(group,.95,.15,1.15,-2.4+i*.96,2.45,2,i%2?colors.panel:accent);
      group.userData.houseBounds=new THREE.Box3(new THREE.Vector3(x-3.2,0,z-3.7),new THREE.Vector3(x+3.2,height+.5,z+2.8));
      group.userData.structure=[...group.children];
    } else {
      box(group,5.8,.045,4.5,0,.015,-.7,'#ded3b8');
      tree(group,-1.8,-1,seed%3);
      // A resting place between shops; scenery has no fake players or accounts.
      for(const side of [-1,1])box(group,.12,.55,.7,1.3+side*.7,.3,.5,colors.ink);
      box(group,2,.15,.85,1.3,.63,.5,'#aa7951');box(group,2,.65,.12,1.3,.95,.1,'#aa7951');
    }
    batchStatic(group);if(group.userData.houseBounds)group.userData.structure=group.children.filter(mesh=>mesh.isMesh&&mesh.material.visible!==false);
    scene.add(group);return group;
  }
  function update(anchor,touch,sites) {
    const needed=chunkKeys(anchor.x,anchor.z),wanted=new Set(needed.map(c=>c.key));
    for(const [key,group] of chunks)if(!wanted.has(key)){recycle(group);chunks.delete(key);}
    for(const chunk of needed)if(!chunks.has(chunk.key))chunks.set(chunk.key,makeChunk(chunk.x,chunk.z));
    const cell=cellAt(anchor.x,anchor.z),range=touch?37:43,decor=new Set();
    for(let dx=-6;dx<=6;dx++)for(let dz=-3;dz<=3;dz++){
      const col=cell.col+dx,row=cell.row+dz,x=col*8-16,z=row*16-9,key=`${col},${row}`;
      if(reserved(x,z)||siteAtCell(col,row,sites)||Math.hypot(x-anchor.x,z-anchor.z)>range)continue;
      decor.add(key);if(!scenery.has(key))scenery.set(key,makeScenery(col,row));
    }
    for(const [key,group] of scenery)if(!decor.has(key)){const hit=group.userData.shopHit;if(hit){const i=pickables.indexOf(hit);if(i>=0)pickables.splice(i,1);hit.geometry.dispose();hit.material.dispose();}recycle(group);scenery.delete(key);}
    root.dataset.renderedChunks=String(chunks.size);root.dataset.sceneryCount=String(scenery.size);
    const cx=Math.floor((anchor.x+24)/48),cz=Math.floor((anchor.z+8)/48);
    root.dataset.district=`${cx},${cz}`;document.getElementById('world-district').textContent=zoneName(anchor.x,anchor.z)||`江湖街区 ${cx} / ${cz}`;
  }
  return { update, get occluders(){return [...scenery.values()].filter(g=>g.userData.houseBounds).map(group=>group.userData.occluder||(group.userData.occluder={group}));} };
}
