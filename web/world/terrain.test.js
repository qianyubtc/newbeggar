import { test } from 'node:test';
import assert from 'node:assert/strict';
import { terrainSeed, chunkKeys, cellAt, terrainSolid } from './terrain.js';
import { isWalkable } from './navigation.js';
test('procedural streets agree across negative coordinates and old map boundaries',()=>{
 assert.equal(terrainSeed(-1,-1),63386);assert.equal(terrainSeed(1000,-1000),33623);
 const map=new Map(),bounds={streamed:true};
 for(const [x,z] of [[-200,0],[5000,0],[-12,-5000],[100000,16000]])assert.equal(isWalkable(x,z,bounds,map),true);
 for(const [x,z] of [[-148,-125],[96,23],[-800,159]]){const c=cellAt(x,z);assert.equal(isWalkable(c.x,c.z,bounds,map),!terrainSolid(c.col,c.row));}
});
test('streaming always keeps nine surrounding chunks, even after a long walk',()=>{
 const keys=chunkKeys(0,0);assert.equal(keys.length,9);
 const far=chunkKeys(50000,-50000);assert.equal(new Set(far.map(k=>k.key)).size,9);
 assert.ok(!far.some(k=>keys.some(old=>old.key===k.key)));
 for(const point of [[24,40],[-24,-8],[-24.01,-8.01]])assert.equal(chunkKeys(...point).length,9);
});
