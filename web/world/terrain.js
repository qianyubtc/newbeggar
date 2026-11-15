// Shared deterministic street layout. Keep the integer seed and collision shape
// in sync with worldTerrainSeed / worldHub.walkable in world.go.
export const WORLD_LIMIT = 1_000_000;
const mod = (n, m) => ((n % m) + m) % m;
export const terrainSeed = (col, row) => (mod(col, 997) * 7381 + mod(row, 997) * 19391) % 65521;
export const terrainSolid = (col, row) => terrainSeed(col, row) % 5 !== 0;
export function siteAtCell(col, row, sites) {
  if(sites.cells)return sites.cells.get(`${col},${row}`);
  return col >= 0 && col < 12 && row >= 0 ? sites.get(row * 12 + col + 1) : undefined;
}
export function cellAt(x, z) {
  const col = Math.floor(x / 8 + 2.5), row = Math.floor((z + 10) / 16 + .5);
  return { col, row, x: col * 8 - 16, z: row * 16 - 9 };
}
export function chunkKeys(x, z) {
  const cx = Math.floor((x + 24) / 48), cz = Math.floor((z + 8) / 48), keys = [];
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) keys.push({ key: `${cx + dx},${cz + dz}`, x: cx + dx, z: cz + dz });
  return keys;
}
