import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPath, isWalkable } from './navigation.js';

const bounds = { minX: -24, maxX: 80, minZ: -18, maxZ: 40 };
const sites = new Map(Array.from({ length: 24 }, (_, n) => [n + 1, { x: (n % 12 - 2) * 8, z: Math.floor(n / 12) * 16 - 9 }]));
const walkable = (x, z) => isWalkable(x, z, bounds, sites);

test('the old spawn was trapped; the street spawn supports click navigation', () => {
  assert.equal(walkable(1.5, 4), false);
  const path = findPath({ x: 0, z: -1.8 }, { x: 8, z: 1 }, walkable);
  assert.deepEqual(path, [{ x: 8, z: 1 }]);
});

test('routes around houses and reaches a click whose rounded grid cell is blocked', () => {
  const from = { x: -8, z: -5.2 }, to = { x: -8, z: -12.9 };
  assert.equal(walkable(to.x, to.z), true);
  assert.equal(walkable(-8, -12.5), false);
  const path = findPath(from, to, walkable);
  assert.ok(path?.length > 1);
  let previous = from;
  for (const p of path) {
    const steps = Math.ceil(Math.hypot(p.x - previous.x, p.z - previous.z) / .1);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      assert.ok(walkable(previous.x + (p.x - previous.x) * t, previous.z + (p.z - previous.z) * t));
    }
    previous = p;
  }
  assert.deepEqual(path.at(-1), to);
});

test('rejects buildings and destinations outside the walkable world', () => {
  assert.equal(findPath({ x: 0, z: 0 }, { x: 0, z: 7 }, walkable), null);
  assert.equal(findPath({ x: 0, z: 0 }, { x: 90, z: 0 }, walkable), null);
});
