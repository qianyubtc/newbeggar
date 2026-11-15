import {test} from 'node:test';
import assert from 'node:assert/strict';
import {shopLot,nearbyLots,indexShops} from './shops.js';
import {isWalkable} from './navigation.js';
import {canInteract} from './social.js';

test('empty shops exclude public landmarks, gardens and occupied addresses',()=>{
  assert.equal(shopLot(-4,0),false);
  assert.equal(shopLot(-4,-3),false);
  assert.equal(shopLot(0,0),false);
  assert.equal(shopLot(.5,0),false);
  const sites=[{id:1,x:-16,z:-9},{id:2,x:-8,z:-9}],lots=nearbyLots(sites,{x:-48,z:7});
  assert.equal(lots.length,8);
  const occupied=indexShops(sites);
  for(const lot of lots){assert.ok(shopLot(lot.col,lot.row));assert.equal(occupied.has(`${lot.col},${lot.row}`),false);assert.equal(isWalkable(lot.x,lot.z+6,{streamed:true},new Map()),true);}
});
test('collision follows actual chosen shops, including a non-solid default cell',()=>{
  const map=new Map([[99,{id:99,x:-16,z:-9}]]);map.cells=indexShops([...map.values()]);
  assert.equal(isWalkable(-16,-9,{streamed:true},map),false);
  assert.equal(isWalkable(-16,-3,{streamed:true},map),true);
});
test('interaction is limited to nearby players on the same level',()=>{
  const a={id:'a',x:-48,z:7,action:'idle'},b={id:'b',x:-46,z:7,action:'idle'};
  assert.equal(canInteract(a,b),true);
  assert.equal(canInteract(a,a),false);
  assert.equal(canInteract(a,{...b,x:-30}),false);
  assert.equal(canInteract(a,{...b,action:'caught'}),false);
  assert.equal(canInteract({id:'a',x:-48,z:-45},{id:'b',x:-43,z:-45}),false);
});
