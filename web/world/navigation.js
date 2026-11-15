import { WORLD_LIMIT, cellAt, siteAtCell, terrainSolid } from './terrain.js';
import { landmarkWalkable } from './geography.js';
// Geometry matches worldHub.walkable. Keep navigation independent of rendering.
export function isWalkable(x, z, bounds, sites) {
  if (bounds.streamed) {
    if (!Number.isFinite(x) || !Number.isFinite(z) || Math.abs(x) > WORLD_LIMIT || Math.abs(z) > WORLD_LIMIT) return false;
    const landmark=landmarkWalkable(x,z);if(landmark!==null)return landmark;
    const cell = cellAt(x, z), solid = siteAtCell(cell.col, cell.row, sites) || terrainSolid(cell.col, cell.row);
    return !(solid && Math.abs(x - cell.x) < 3.35 && z > cell.z - 3.85 && z < cell.z + 1.85);
  }
  if (x < bounds.minX + 1 || x > bounds.maxX - 1 || z < bounds.minZ + 1 || z > bounds.maxZ - 1) return false;
  const col = Math.round(x / 8 + 2), row = Math.round((z + 10) / 16);
  const site = col >= 0 && col < 12 && row >= 0 ? sites.get(row * 12 + col + 1) : null;
  return !(site && Math.abs(x - site.x) < 3.35 && z > site.z - 3.85 && z < site.z + 1.85);
}

function clearLine(from, to, walkable) {
  const steps = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.z - from.z) / .16));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    if (!walkable(from.x + (to.x - from.x) * t, from.z + (to.z - from.z) * t)) return false;
  }
  return true;
}

export function findPath(from, to, walkable) {
  if (!walkable(from.x, from.z) || !walkable(to.x, to.z)) return null;
  if (Math.hypot(to.x - from.x, to.z - from.z) > 45) return null;
  if (clearLine(from, to, walkable)) return [to];
  const step = .5, key = p => `${p.x},${p.z}`;
  // Rounding a walkable click can put its grid point inside a wall. Choose a
  // reachable neighbour instead of searching forever for a blocked destination.
  function anchor(point) {
    const options = [];
    for (let x = -1; x <= 1; x++) for (let z = -1; z <= 1; z++) {
      const p = { x: Math.round(point.x / step) + x, z: Math.round(point.z / step) + z };
      const world = { x: p.x * step, z: p.z * step };
      if (clearLine(point, world, walkable)) options.push({ ...p, distance: Math.hypot(world.x - point.x, world.z - point.z) });
    }
    return options.sort((a, b) => a.distance - b.distance)[0];
  }
  const start = anchor(from), goal = anchor(to);
  if (!start || !goal) return null;
  const open = [{ ...start, g: 0, h: 0, parent: null }], costs = new Map([[key(start), 0]]), closed = new Set();
  let end;
  for (let count = 0; open.length && count < 12000; count++) {
    open.sort((a, b) => a.g + a.h - b.g - b.h);
    const p = open.shift(), id = key(p);
    if (closed.has(id)) continue;
    closed.add(id);
    if (p.x === goal.x && p.z === goal.z) { end = p; break; }
    for (const [dx, dz] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
      const next = { x: p.x + dx, z: p.z + dz }, id = key(next), g = p.g + Math.hypot(dx, dz);
      if (closed.has(id) || (costs.has(id) && costs.get(id) <= g)) continue;
      if (Math.hypot(next.x - start.x, next.z - start.z) > 96) continue;
      if (!clearLine({ x: p.x * step, z: p.z * step }, { x: next.x * step, z: next.z * step }, walkable)) continue;
      costs.set(id, g);
      open.push({ ...next, g, h: Math.hypot(goal.x - next.x, goal.z - next.z), parent: p });
    }
  }
  if (!end) return null;
  const path = [to];
  while (end) { path.unshift({ x: end.x * step, z: end.z * step }); end = end.parent; }
  const smooth = [];
  let previous = from, index = 0;
  while (index < path.length) {
    let farthest = index;
    while (farthest + 1 < path.length && clearLine(previous, path[farthest + 1], walkable)) farthest++;
    smooth.push(path[farthest]); previous = path[farthest]; index = farthest + 1;
  }
  return smooth;
}
