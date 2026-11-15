import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nightClock,nightPhase,nightSelection,nightCanJoin,nightResult} from './night-state.js';

const round={id:12,opens_at:1000,locks_at:61000,status:'open',players:[]};
test('night timer uses server time, reaches zero exactly, and never goes negative',()=>{
  assert.deepEqual(nightClock(round,31000),{seconds:30,text:'0:30',remaining:.5});
  assert.equal(nightClock(round,60001).text,'0:01');
  assert.equal(nightClock(round,61000).seconds,0);
  assert.equal(nightClock(round,99000).text,'0:00');
  assert.equal(nightPhase({round},61000,true),'locked');
  assert.equal(nightClock(null,0).text,'--:--');
});
test('confirmed hiding and a tentative selection are separate, and new rounds require a fresh choice',()=>{
  const old={round,me:{amt:3,room:2}};
  assert.equal(nightPhase(old,2000,true),'hidden');
  assert.equal(nightSelection(old,old,4),4);
  assert.equal(nightSelection(old,old,-1),2);
  assert.equal(nightSelection(old,{round:{...round,id:13},me:{amt:0,room:-1}},4),-1);
  assert.equal(nightSelection(null,old,-1),2);
  assert.equal(nightSelection(null,{round},5),5);
});
test('no implicit participation, no guest submission and no submission after lock or lost sync',()=>{
  const input={phase:'choosing',selected:1,me:{coins:5,amt:0},amount:1,max:50};
  assert.equal(nightCanJoin(input),true);
  for(const change of [{selected:-1},{me:null},{phase:'locked'},{phase:'offline'},{caught:true},{submitting:true},{amount:1.5},{amount:6},{amount:0}])assert.equal(nightCanJoin({...input,...change}),false);
  assert.equal(nightCanJoin({...input,phase:'hidden',me:{coins:0,amt:3},amount:3}),true);
  assert.equal(nightPhase({round},2000,false),'offline');
  assert.equal(nightPhase({round,me:{amt:0}},2000,true),'choosing');
});
test('results distinguish being caught, surviving with principal, watching, and a refunded void round',()=>{
  const result={id:11,status:'settled',killed:0,players:[{id:1,room:0,amt:3,payout:0},{id:2,room:1,amt:4,payout:6}]};
  assert.match(nightResult(result,1).text,/失去本局 3/);
  assert.match(nightResult(result,2).text,/返还 4.*获得 2/);
  assert.match(nightResult(result,99).text,/没有参加/);
  assert.match(nightResult({...result,status:'void'},1).text,/3 个钢镚已退回/);
  assert.equal(nightResult(null,1),null);
});
