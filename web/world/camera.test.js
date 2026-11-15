import {test} from 'node:test';
import assert from 'node:assert/strict';
import {LookState} from './camera.js';
test('free look can look up, down, and rotate all the way around without changing walking speed',()=>{
 const look=new LookState();look.rotate(8,.8);assert.ok(look.pitch>0);
 assert.ok(Math.abs(Math.hypot(look.forward().x,look.forward().z)-1)<.00001);
 look.rotate(-16,-3);assert.equal(look.pitch,-1.12);
 look.rotate(0,6);assert.equal(look.pitch,.85);
 look.zoom(20);assert.equal(look.distance,2.3);look.reset();assert.equal(look.distance,5);
});
