import { test } from 'node:test';
import assert from 'node:assert/strict';
import { stickVector, bindJoystick } from './controls.js';

test('joystick has a dead zone, variable walking speed, and normalized diagonals', () => {
  assert.deepEqual(stickVector(2, -3), { x: 0, y: 0, px: 2, py: -3 });
  const gentle = stickVector(22, 0), diagonal = stickVector(100, -100);
  assert.ok(gentle.x > 0 && gentle.x < 1);
  assert.ok(Math.abs(Math.hypot(diagonal.x, diagonal.y) - 1) < .0001);
  assert.ok(Math.abs(Math.hypot(diagonal.px, diagonal.py) - 42) < .0001);
});

class Pad extends EventTarget {
  style = {}; clientWidth = 136; classList = { add() {}, remove() {} };
  setPointerCapture() {}
  getBoundingClientRect() { return { left: 0, top: 0, width: 136, height: 136 }; }
  pointer(name, id, x, y) { const event = new Event(name, { cancelable: true }); Object.assign(event, { pointerId: id, clientX: x, clientY: y, button: 0 }); this.dispatchEvent(event); }
}
for (const ending of ['pointerup', 'pointercancel', 'lostpointercapture']) test(`${ending} stops movement; a second finger does not steal the joystick`, () => {
  const base = new Pad(), knob = new Pad(); let stopped = 0;
  const joystick = bindJoystick(base, knob, () => {}, () => stopped++);
  base.pointer('pointerdown', 1, 110, 68); assert.equal(joystick.state.active, true); assert.ok(joystick.state.x > .9);
  base.pointer('pointerdown', 2, 10, 68); base.pointer('pointermove', 2, 5, 68); assert.ok(joystick.state.x > .9);
  base.pointer(ending, 1, 110, 68); assert.deepEqual(joystick.state, { active: false, x: 0, y: 0 }); assert.equal(stopped, 1);
});
