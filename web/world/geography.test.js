import {test} from 'node:test';
import assert from 'node:assert/strict';
import {groundHeight,landmarkWalkable,DESTINATIONS,inPlaza} from './geography.js';
import {isWalkable,findPath} from './navigation.js';
test('all plaza spawn slots are open and the coin fountain blocks walking',()=>{
 const walk=(x,z)=>isWalkable(x,z,{streamed:true},new Map());
 for(let slot=0;slot<64;slot++){const x=-48+((slot+3)%8-3)*2,z=7+Math.floor(slot/8);assert.ok(inPlaza(x,z)&&walk(x,z));}
 assert.equal(walk(-48,0),false);assert.equal(walk(-48,3.5),true);
 const path=findPath(DESTINATIONS.plaza,DESTINATIONS.bridge,walk);assert.ok(path?.length>1);
});
test('the elevated bridge has continuous ramps and side rails',()=>{
 assert.equal(groundHeight(-48,-25),0);assert.equal(groundHeight(-48,-30),2);assert.equal(groundHeight(-48,-50),4);assert.equal(groundHeight(-48,-70),2);assert.equal(groundHeight(-48,-75),0);
 assert.equal(landmarkWalkable(-52.4,-50),false);assert.equal(landmarkWalkable(-48,-50),true);
 for(const p of Object.values(DESTINATIONS))assert.equal(isWalkable(p.x,p.z,{streamed:true},new Map()),true);
});
