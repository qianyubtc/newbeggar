import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {batchStatic,disposeOwned} from './batching.js';
import {makePerson,animatePerson,box} from './art.js';

test('static batching preserves bounds, border transforms, animated meshes and picking surfaces',()=>{
 const group=new THREE.Group();for(let i=0;i<10;i++)box(group,1,2,3,i,1,i,'#123456',true);
 const animated=box(group,1,1,1,2,3,4,'#123456');animated.rotation.y=.4;
 const before=new THREE.Box3().setFromObject(group);
 batchStatic(group,new Set([animated]));
 const after=new THREE.Box3().setFromObject(group);
 assert.ok(before.min.distanceTo(after.min)<1e-6&&before.max.distanceTo(after.max)<1e-6);
 assert.equal(group.children.length,3);assert.equal(animated.parent,group);
 assert.equal(group.children.find(x=>x.isLineSegments).geometry.attributes.position.count,240);
 let disposed=0;group.traverse(x=>{if(x.userData.ownedGeometry)x.geometry.addEventListener('dispose',()=>disposed++)});
 disposeOwned(group);assert.equal(disposed,2);
});

test('batched people retain independently moving joints and shared palette resources',()=>{
 for(let skin=0;skin<8;skin++){
  const person=makePerson(skin);let count=0,sharedDisposed=0;
  person.traverse(x=>{if(x.isMesh){count++;x.material.addEventListener('dispose',()=>sharedDisposed++)}});
  assert.ok(count<29,`skin ${skin} draw count ${count}`);
  animatePerson(person,'walk',1,0);assert.notEqual(person.userData.legs[0].rotation.x,0);
  animatePerson(person,'wave',1,0);assert.notEqual(person.userData.arms[1].rotation.z,0);
  disposeOwned(person);assert.equal(sharedDisposed,0);
 }
});

test('same skin shares geometry while joints remain independent after another actor leaves',()=>{
 const a=makePerson(3),b=makePerson(3),geometries=model=>{const out=[];model.traverse(mesh=>{if(mesh.isMesh)out.push(mesh.geometry)});return out};
 assert.deepEqual(geometries(a),geometries(b));
 assert.notEqual(a.userData.upper,b.userData.upper);assert.notEqual(a.userData.legs[0],b.userData.legs[0]);
 animatePerson(a,'beg',1);assert.notEqual(a.userData.upper.position.y,b.userData.upper.position.y);
 let disposed=0;for(const geometry of geometries(b))geometry.addEventListener('dispose',()=>disposed++);
 disposeOwned(a);assert.equal(disposed,0);animatePerson(b,'walk',1);assert.notEqual(b.userData.legs[0].rotation.x,0);
});
