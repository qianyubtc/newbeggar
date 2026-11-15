import * as THREE from 'three';
import { box, plaque, tree, lamp, material, colors } from './art.js';
import { roomPosition, RAID_ROOMS } from './geography.js';
import { batchStatic } from './batching.js';

export function createLandmarks(scene,pickables) {
  const surfaces=[];
  const plaza=new THREE.Group();plaza.position.set(-48,0,0);scene.add(plaza);
  box(plaza,44,.15,38,0,-.015,1,'#fffbf0');
  const tileGeo=new THREE.BoxGeometry(1.85,.025,1.85),tiles=new THREE.InstancedMesh(tileGeo,material('#e9e1ca'),22*19),matrix=new THREE.Matrix4();let count=0;
  for(let x=0;x<22;x++)for(let z=0;z<19;z++){matrix.makeTranslation(-21+x*2,.08,-17+z*2);tiles.setMatrixAt(count++,matrix);}
  plaza.add(tiles);
  for(const x of [-21.5,21.5])box(plaza,.18,.18,38,x,.1,1,colors.ink);
  for(const z of [-17.5,19.5])box(plaza,44,.18,.18,0,.1,z,colors.ink);
  // Public spawn plaza: a gold coin fountain and open gathering space.
  const rim=new THREE.Mesh(new THREE.CylinderGeometry(3.05,3.25,.35,12),material(colors.ink));rim.position.y=.2;plaza.add(rim);
  const pool=new THREE.Mesh(new THREE.CylinderGeometry(2.8,2.9,.3,12),material('#6fb7ff'));pool.position.y=.4;plaza.add(pool);
  box(plaza,1.2,1.2,1.2,0,1,0,'#d4ae7a',true);
  const coin=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,.2,8),material(colors.gold));coin.rotation.x=Math.PI/2;coin.position.y=2.5;plaza.add(coin);
  const jets=[];for(let i=0;i<8;i++){const a=i*Math.PI/4;const jet=box(plaza,.16,1.3,.16,Math.cos(a)*1.7,.9,Math.sin(a)*1.7,'#b3e2ff');jets.push(jet);}
  const respawn=new THREE.Mesh(new THREE.RingGeometry(2.2,2.35,8),new THREE.MeshBasicMaterial({color:colors.gold,side:THREE.DoubleSide}));respawn.rotation.x=-Math.PI/2;respawn.position.set(0,.12,8);plaza.add(respawn);
  for(const x of [-16,16])for(const z of [-10,13]){
    tree(plaza,x,z,x<0?1:2);bench(plaza,x+(x<0?3:-3),z+1);
  }
  for(const x of [-19,19])for(const z of [-14,16])lamp(plaza,x,z);
  plaque(plaza,'中央广场','相遇 · 摆碗 · 重新出发',8,2,-8,3.5,-11,'gold');
  gate(plaza,0,-17,'天桥夜巡','往北 · 警车巡街','bridge',0);
  gate(plaza,21,0,'要饭大街','往东 · 去街坊家串门','street',-Math.PI/2);
  const bridge=new THREE.Group();bridge.position.set(-48,0,-50);scene.add(bridge);
  box(bridge,68,.08,14,0,-.01,0,'#77747a');
  for(let x=-32;x<=32;x+=4)box(bridge,2,.025,.12,x,.06,0,colors.gold);
  // Elevated walkway, ramps and railings over the patrol road.
  surfaces.push(box(bridge,8,.3,30,0,3.85,0,'#d4cbb5',true));
  for(const z of [-12,12])for(const x of [-3,3])box(bridge,.6,4,.65,x,2,z,colors.ink);
  for(const x of [-3.9,3.9]){
    box(bridge,.12,.12,30,x,5.1,0,colors.ink);
    for(let z=-14;z<=14;z+=2)box(bridge,.09,1.2,.1,x,4.6,z,colors.ink);
  }
  for(const sign of [-1,1]){
    const ramp=box(bridge,8,.22,Math.hypot(10,4),0,2,sign*20,'#c2b8a3',true);ramp.rotation.x=sign*Math.atan(.4);surfaces.push(ramp);
    for(let i=0;i<10;i++){const height=4-i*.4,z=sign*(15+i);box(bridge,7.8,.045,.12,0,height,z,colors.gold);for(const x of [-3.9,3.9])box(bridge,.09,1.2,.1,x,height+.6,z,colors.ink);}
    for(const x of [-3.9,3.9]){const rail=box(bridge,.1,.1,Math.hypot(10,4),x,3,sign*20,colors.ink);rail.rotation.x=sign*Math.atan(.4);}
  }
  box(bridge,24,.25,6,-15,3.85,0,'#d4cbb5',true);
  for(const x of [-25,-17])box(bridge,.7,4,.7,x,2,0,colors.ink);
  plaque(bridge,'天桥夜巡','选个地方藏好 · 警车即将出动',7.2,1.7,0,5.8,14.9,'ink');
  gate(bridge,0,27,'中央广场','回到复活点','plaza',Math.PI);
  const rooms=[];
  for(let i=0;i<6;i++){
    const p=roomPosition(i),g=new THREE.Group();g.position.set(p.x,0,p.z);scene.add(g);
    box(g,6,.1,5,0,.03,0,i%2?'#b9b3a3':'#b2b9ae');
    const ring=new THREE.Mesh(new THREE.RingGeometry(2.2,2.38,12),new THREE.MeshBasicMaterial({color:'#6fb7ff',side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.12;g.add(ring);
    if(i===3){tree(g,-2,-1,0);bench(g,0,-1);} else {
      const walls=['#8b8c92','#b75b43','#7f8791','#4b7a52','#637d9c','#aa7951'];
      box(g,5.6,.5,.8,0,3.2,-2.5,walls[i],true);
      box(g,.7,3,.8,-2.45,1.5,-2.5,walls[i]);box(g,.7,3,.8,2.45,1.5,-2.5,walls[i]);
      box(g,4.2,2.6,.1,0,1.4,-2.8,'#263246');
      if(i===1){const roof=new THREE.Mesh(new THREE.ConeGeometry(4,1.2,4),material('#e0a800'));roof.rotation.y=Math.PI/4;roof.position.set(0,4,-2);g.add(roof);}
      if(i===4)for(let n=0;n<5;n++)box(g,3.8,.12,.4,0,.5-n*.08,-1.5+n*.25,'#6fb7ff');
      if(i===5)for(const x of [-2,2])box(g,.08,5,.08,x,2.8,-2.5,colors.ink);
    }
    plaque(g,RAID_ROOMS[i],`藏身点 0${i+1}`,4.4,1.25,0,3.7,1,'ink');
    const hit=new THREE.Mesh(new THREE.BoxGeometry(5.8,3.8,4.5),new THREE.MeshBasicMaterial({visible:false}));hit.position.y=1.9;hit.userData.raidRoom=i;g.add(hit);pickables.push(hit);
    const cone=new THREE.Mesh(new THREE.ConeGeometry(3.5,9,12),new THREE.MeshBasicMaterial({color:'#ffed99',transparent:true,opacity:.15,side:THREE.DoubleSide,depthWrite:false}));cone.position.y=4.5;cone.visible=false;g.add(cone);
    batchStatic(g,new Set([ring,cone]));rooms.push({group:g,ring,cone});
  }
  const car=new THREE.Group();scene.add(car);
  box(car,4.4,.65,2,0,.65,0,'#fffbf0',true);box(car,4.3,.2,2,0,1,0,'#3d8bfd');
  box(car,2.3,.85,1.8,-.4,1.4,0,'#3d8bfd',true);box(car,1.65,.5,1.83,-.3,1.5,0,'#263246');
  box(car,2.35,.1,1.85,-.4,1.87,0,'#fffbf0');
  for(const x of [-1.4,1.4])for(const z of [-1,1]){box(car,.8,.75,.25,x,.38,z,colors.ink);box(car,.35,.35,.27,x,.38,z,'#b9b3a3');}
  for(const z of [-.65,.65])box(car,.12,.2,.35,2.22,.8,z,'#ffcc00');
  const red=box(car,.55,.24,.55,-.6,2.05,-.35,'#ff4b4b'),blue=box(car,.55,.24,.55,-.6,2.05,.35,'#3d8bfd');
  red.material=new THREE.MeshBasicMaterial({color:'#ff4b4b'});blue.material=new THREE.MeshBasicMaterial({color:'#3d8bfd'});
  plaque(car,'巡逻','POLICE',1.6,.5,0,.8,1.02,'ink');
  batchStatic(car,new Set([red,blue]));batchStatic(plaza,new Set([coin,...jets]));batchStatic(bridge,new Set(surfaces));
  let event=null,eventAt=0;
  function gate(parent,x,z,title,sub,destination,rotation){
    const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=rotation;parent.add(g);
    for(const dx of [-4,4])box(g,.22,4.6,.22,dx,2.3,0,colors.ink);
    plaque(g,title,sub,8.5,1.8,0,4,.1,'gold');
    const hit=new THREE.Mesh(new THREE.BoxGeometry(8.5,1.8,.6),new THREE.MeshBasicMaterial({visible:false}));hit.position.y=4;hit.userData.travel=destination;g.add(hit);pickables.push(hit);
  }
  return {
    surfaces,
    playResult(round){event=round;eventAt=performance.now();},
    update(now,{selected=-1,confirmed=-1}={}){
      const t=now/1000;coin.rotation.z=t*.5;for(let i=0;i<jets.length;i++)jets[i].scale.y=.85+Math.sin(t*2+i)*.2;
      red.visible=Math.floor(now/180)%2===0;blue.visible=!red.visible;
      const age=(now-eventAt)/1000,active=event&&event.status==='settled'&&age<8;
      let spotlight=-1;
      if(active){
        spotlight=age<4?Math.floor(age*4)%6:event.killed;
        const target=roomPosition(event.killed),phase=Math.min(1,age/5);
        car.position.set(-86+(target.x+86)*phase,0,-50+(target.z+5+50)*phase);car.rotation.y=-Math.atan2(target.z+55,target.x+86);
      } else {car.position.set(-48+Math.sin(t*.12)*32,0,-50+Math.cos(t*.12)*3);car.rotation.y=-Math.atan2(-Math.sin(t*.12)*3,Math.cos(t*.12)*32);}
      for(let i=0;i<rooms.length;i++){rooms[i].cone.visible=i===spotlight;rooms[i].ring.material.color.set(active&&i===event.killed&&age>4?'#ff4b4b':i===confirmed?colors.gold:i===selected?'#ffb36f':'#6fb7ff');}
      return active?Math.floor(age):null;
    },
  };
}
function bench(parent,x,z){for(const dx of [-1.1,1.1])box(parent,.13,.6,.8,x+dx,.35,z,colors.ink);box(parent,3,.18,1,x,.7,z,'#aa7951');box(parent,3,.8,.12,x,1.15,z-.4,'#aa7951');}
