import * as THREE from 'three';
import { batchStatic,disposeOwned } from './batching.js';

// The original site's palette and the eight skins from tools/sprite.py.
export const colors = { ink: '#1e1e2e', paper: '#f4eedd', panel: '#fffbf0', gold: '#ffcc00', blue: '#3d8bfd', red: '#ff4b4b' };
const skins = [
  ['#a86f3d','#3b2a1e','#f7c9a3'], ['#5b6b8a','#1e1e2e','#f2d0b0'],
  ['#4b7a52','#c0392b','#f7c9a3'], ['#7a5c8a','#e6b800','#e8b98a'],
  ['#8a5a3a','#6b4a2a','#8d5a3b'], ['#3f4a5a','#dfe3e8','#f2d0b0'],
  ['#2b2b3a','#2f7d6b','#f7c9a3'], ['#c96b4a','#a8577d','#f7c9a3'],
];
const unit = new THREE.BoxGeometry(1, 1, 1), edges = new THREE.EdgesGeometry(unit);
const outline = new THREE.LineBasicMaterial({ color: colors.ink, transparent: true, opacity: .8 });
const materials = new Map();
export function material(color) {
  if (!materials.has(color)) materials.set(color, new THREE.MeshToonMaterial({ color }));
  return materials.get(color);
}
export function box(parent, w, h, d, x, y, z, color, border = false) {
  const mesh = new THREE.Mesh(unit, material(color));
  mesh.scale.set(w, h, d); mesh.position.set(x, y, z);
  parent.add(mesh);
  if (border) mesh.add(new THREE.LineSegments(edges, outline));
  return mesh;
}
const shadowGeo = new THREE.CircleGeometry(.65, 16);
const shadowMat = new THREE.MeshBasicMaterial({ color: colors.ink, transparent: true, opacity: .16, depthWrite: false });
export const circleGeo = new THREE.RingGeometry(.72, .8, 4);
export const onlineMat = new THREE.MeshBasicMaterial({ color: colors.blue, side: THREE.DoubleSide });
export const selfMat = new THREE.MeshBasicMaterial({ color: colors.gold, side: THREE.DoubleSide });
const bowlGeo = new THREE.CylinderGeometry(.43, .25, .25, 8);
const rimGeo = new THREE.TorusGeometry(.4, .045, 4, 8);
const coinGeo = new THREE.CylinderGeometry(.12, .12, .045, 8);

function createPerson(skin = 0) {
  const index = Math.abs(skin) % 8, [robe, hair, skinColor] = skins[index];
  const group = new THREE.Group(), upper = new THREE.Group(); group.add(upper);
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = .025; group.add(shadow);
  // Big head, patched robe, white eyes, a tear and the original white coin bowl.
  box(upper, .76, .83, .46, 0, 1.07, 0, colors.ink);
  box(upper, .67, .76, .48, 0, 1.08, .01, robe);
  box(upper, .22, .23, .02, -.2, 1.12, .26, index === 4 ? '#556677' : '#f2c14e');
  box(upper, .015, .26, .03, -.22, 1.12, .28, colors.ink);
  box(upper, .25, .015, .03, -.2, 1.12, .28, colors.ink);
  box(upper, .06, .64, .025, .13, 1.09, .26, colors.ink);
  box(upper, .9, .87, .7, 0, 1.91, 0, colors.ink);
  box(upper, .8, .72, .72, 0, 1.88, .015, skinColor);
  box(upper, .94, .26, .74, 0, 2.25, -.015, hair);
  box(upper, .15, .44, .74, -.38, 2.05, -.015, hair);
  box(upper, .16, .13, .7, -.24, 2.41, -.015, hair);
  box(upper, .15, .1, .7, .19, 2.4, -.015, hair);
  for (const x of [-.21, .2]) {
    box(upper, .14, .2, .04, x, 1.97, .4, colors.ink);
    box(upper, .055, .06, .045, x + .025, 2.02, .425, '#ffffff');
  }
  box(upper, .09, .14, .04, -.22, 1.77, .4, '#6fb7ff');
  box(upper, .18, .065, .04, 0, 1.69, .4, '#c0392b');
  if (index === 1 || index === 6) box(upper, .98, .12, .77, 0, 2.28, 0, index === 1 ? '#c0392b' : '#e6b800');
  if (index === 2 || index === 5) {
    const beard = index === 5 ? '#dfe3e8' : '#8a6a4a';
    box(upper, .5, .16, .05, 0, 1.65, .42, beard);
    box(upper, .24, .13, .05, 0, 1.54, .42, beard);
  }
  const legs = [], arms = [];
  for (const side of [-1, 1]) {
    const leg = new THREE.Group(); leg.position.set(side * .23, .72, 0);
    box(leg, .29, .5, .31, 0, -.22, 0, '#556677');
    box(leg, .32, .15, .44, 0, -.52, .06, colors.ink);
    box(leg, .23, .11, .2, 0, -.49, .22, skinColor); group.add(leg); legs.push(leg);
    const arm = new THREE.Group(); arm.position.set(side * .47, 1.43, 0);
    box(arm, .24, .49, .28, 0, -.22, 0, colors.ink);
    box(arm, .22, .42, .3, 0, -.2, .015, robe);
    box(arm, .23, .17, .25, 0, -.5, .08, skinColor); upper.add(arm); arms.push(arm);
  }
  const bowl = new THREE.Mesh(bowlGeo, material('#ece7d8'));
  bowl.position.set(0, .92, .66); upper.add(bowl);
  const rim = new THREE.Mesh(rimGeo, material(colors.ink));
  rim.rotation.x = Math.PI / 2; rim.position.set(0, 1.05, .66); upper.add(rim);
  for (const x of [-.15, .11]) {
    const coin = new THREE.Mesh(coinGeo, material(colors.gold)); coin.position.set(x, 1.05, .67); upper.add(coin);
  }
  batchStatic(upper);for(const joint of [...legs,...arms])batchStatic(joint);
  group.userData = { upper, legs, arms, bowl }; return group;
}

// Eight immutable geometry prototypes are shared by every online/stall actor.
// Clone only transforms so streaming never recompiles identical voxel bodies.
const personTemplates=new Map();
export function makePerson(skin=0){
  const index=Math.abs(skin)%8;
  let template=personTemplates.get(index);
  if(!template){
    template=createPerson(index);
    const {upper,legs,arms,bowl}=template.userData;
    upper.name='person-upper';bowl.name='person-bowl';
    legs.forEach((joint,i)=>joint.name='person-leg-'+i);arms.forEach((joint,i)=>joint.name='person-arm-'+i);
    template.traverse(mesh=>{if(mesh.userData.ownedGeometry)delete mesh.userData.ownedGeometry});
    template.userData={};personTemplates.set(index,template);
  }
  const model=template.clone(true);
  model.userData={upper:model.getObjectByName('person-upper'),legs:[0,1].map(i=>model.getObjectByName('person-leg-'+i)),arms:[0,1].map(i=>model.getObjectByName('person-arm-'+i)),bowl:model.getObjectByName('person-bowl')};
  return model;
}

export function animatePerson(group, action, time, phase = 0) {
  const { upper, legs, arms } = group.userData;
  const walk = action === 'walk', beg = action === 'beg', wave = action === 'wave',clink=action==='clink';
  upper.rotation.z=action==='caught'?-1.15:0;
  const tick = Math.floor(time * 9) / 9, stride = Math.sin(tick * 10 + phase);
  upper.position.y = beg ? -.36 : clink?Math.abs(Math.sin(time*7))*.14:walk ? Math.abs(stride) * .045 : 0;
  legs[0].rotation.x = beg ? -1.4 : walk ? stride * .52 : 0;
  legs[1].rotation.x = beg ? -1.4 : walk ? -stride * .52 : 0;
  arms[0].rotation.x = clink?-.9+Math.sin(time*7)*.2:beg ? -.5 : walk ? -stride * .35 : -.15;
  arms[1].rotation.x = clink?-.9+Math.sin(time*7)*.2:beg ? -.5 : walk ? stride * .35 : -.15;
  arms[1].rotation.z = wave ? -2.45 + Math.sin(tick * 11) * .3 : 0;
}

function boardMaterial(title, sub = '', theme = 'ink') {
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 192;
  const ctx = canvas.getContext('2d'), dark = theme === 'ink';
  ctx.fillStyle = colors.ink; ctx.fillRect(0, 0, 512, 192);
  ctx.fillStyle = dark ? colors.ink : theme === 'gold' ? colors.gold : '#d4ae7a'; ctx.fillRect(5, 5, 502, 182);
  ctx.strokeStyle = dark ? colors.gold : colors.ink; ctx.lineWidth = 4; ctx.strokeRect(13, 13, 486, 166);
  ctx.fillStyle = dark ? colors.gold : colors.ink;
  for (const x of [22, 474]) for (const y of [22, 154]) ctx.fillRect(x, y, 12, 12);
  ctx.textAlign = 'center'; ctx.font = '40px Pixel, sans-serif';
  let text = Array.from(title).slice(0, 12).join('');
  while (ctx.measureText(text).width > 435 && text.length > 1) text = text.slice(0, -1);
  ctx.fillText(text, 256, 94); ctx.font = '20px Pixel, monospace'; ctx.fillText(sub, 256, 145);
  const map = new THREE.CanvasTexture(canvas); map.colorSpace = THREE.SRGBColorSpace;
  map.magFilter = THREE.NearestFilter; map.minFilter = THREE.LinearFilter;
  return new THREE.MeshBasicMaterial({ map });
}

export function plaque(parent, title, sub, w, h, x, y, z, theme = 'ink') {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), boardMaterial(title, sub, theme));
  mesh.position.set(x, y, z); parent.add(mesh); return mesh;
}

export function createStreetArt(scene, labels, pickables) {
  function makeStall(site) {
    const group = new THREE.Group(); group.position.set(site.x, 0, site.z);
    const variant = site.id % 4, height = [3.6, 4.1, 3.85, 4.4][variant];
    const accent = ['#b75b43', '#e0a800', '#637d9c', '#876a91'][variant];
    const wall = ['#efe1c4', '#fffbf0', '#e4d6bd', '#f4eedd'][variant];
    box(group, 6.1, .28, 5, 0, .16, -1, '#b9ad97', true);
    box(group, 5.9, height, 4.8, 0, height / 2, -1, wall, true);
    box(group, 6.35, .2, 5.3, 0, height + .02, -1, colors.ink);
    box(group, 6.15, .28, 5.1, 0, height + .25, -1, accent, true);
    // Roof ridges, brick repairs, window crossbars and a small chimney.
    for (let i = 0; i < 6; i++) box(group, .055, .04, 4.9, -2.5 + i, height + .41, -1, colors.ink);
    if (variant % 2 === 0) { box(group, .65, .72, .7, 1.7, height + .7, -2, '#9b6f53', true); box(group, .8, .14, .82, 1.7, height + 1.1, -2, colors.ink); }
    for (let i = 0; i < 5; i++) box(group, .4, .17, .035, -2.6 + (i % 3) * .45, .45 + Math.floor(i / 3) * .22, 1.42, '#c3a58c');
    box(group, 1.1, 2.2, .1, 1.55, 1.18, 1.43, colors.ink);
    box(group, .86, 1.95, .11, 1.55, 1.15, 1.5, '#805c43');
    box(group, .08, 1.9, .12, 1.55, 1.15, 1.57, '#aa8660');
    box(group, .09, .09, .12, 1.81, 1.22, 1.62, colors.gold);
    box(group, 1.3, 1.25, .1, -1.45, 1.75, 1.44, colors.ink);
    box(group, 1.12, 1.07, .11, -1.45, 1.75, 1.5, '#efbd61');
    box(group, .07, 1.08, .12, -1.45, 1.75, 1.57, colors.ink);
    box(group, 1.13, .07, .12, -1.45, 1.75, 1.57, colors.ink);
    box(group, 1.5, .13, .4, -1.45, 1.08, 1.58, '#6d5749', true);
    const board = plaque(group, site.name, `${site.slug ? '@' + site.slug : '总舵'} · ${site.coins} 钢镚`, 4.6, 1.35, 0, height - .6, 1.48, site.slug ? 'ink' : 'gold');
    // Bold yellow canvas makes the street belong to the same INSERT COIN world.
    for (let i = 0; i < 8; i++) {
      box(group, .72, .16, 1.6, -2.55 + i * .73, 2.58, 2.05, i % 2 ? '#fffbf0' : colors.gold);
      box(group, .72, .3, .08, -2.55 + i * .73, 2.42, 2.83, i % 2 ? '#fffbf0' : colors.gold);
    }
    box(group, 6, .065, .07, 0, 2.26, 2.88, colors.ink);
    for (const x of [-2.7, 2.7]) box(group, .1, 2.6, .1, x, 1.3, 2.8, colors.ink);
    group.userData.structure = [...group.children];
    group.userData.houseBounds = new THREE.Box3(new THREE.Vector3(site.x - 3.2, 0, site.z - 3.7), new THREE.Vector3(site.x + 3.2, height + 1.2, site.z + 2.9));
    // The little street corner is deliberately handmade rather than a row of identical houses.
    box(group, 2.25, .035, 1.45, -.25, .08, 3.5, '#d4ae7a', true);
    const owner = makePerson(site.skin); owner.position.set(-.6, .09, 3.4); group.add(owner);
    animatePerson(owner, 'beg', 0, site.id);
    const cardboard = plaque(group, variant % 2 ? '行行好，赏口饭吃' : '今日目标：一碗热饭', '谢谢各位大哥大姐', 1.7, .8, 1.25, .55, 3.95, 'paper'); cardboard.rotation.y = -.18;
    box(group, 1, .7, .8, -2.1, .35, 2.2, '#aa7951', true);
    box(group, 1.04, .08, .85, -2.1, .75, 2.2, '#d2a275');
    box(group, .07, .72, .83, -2.2, .4, 2.2, '#72513e');
    if (variant === 0) {
      plaque(group, '欠费停机', '明天再努力', .75, .65, 2.3, 1.8, 1.52, 'paper');
    } else if (variant === 1) {
      box(group, .6, .55, .6, -2.15, 1.07, 2.2, '#b75b43', true);
      box(group, .12, .75, .1, -2.15, 1.7, 2.2, '#4b7a52'); box(group, .6, .16, .4, -2.15, 1.8, 2.2, '#3ec46d');
    } else if (variant === 2) {
      plaque(group, '招财', '一币一功德', .65, 1.2, -2.5, 1.5, 1.51, 'gold');
    } else {
      box(group, .8, .55, .55, -2.1, 1.07, 2.2, '#556677', true);
      box(group, .55, .32, .03, -2.1, 1.08, 2.5, colors.ink); box(group, .08, .08, .04, -1.85, 1.08, 2.53, colors.gold);
    }
    const hit = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.7, 1.4), new THREE.MeshBasicMaterial({ visible: false }));
    hit.position.set(0, 1.25, 3.4); hit.userData.siteId = site.id; group.add(hit); pickables.push(hit);
    const label = document.createElement('button'); label.type = 'button'; label.className = 'stall-label'; label.textContent = site.name;
    label.setAttribute('aria-label', '查看' + site.name + '的摊位'); labels.append(label);
    batchStatic(group);group.userData.structure=group.children.filter(mesh=>mesh.isMesh&&mesh!==hit);
    scene.add(group); return { group, owner, label, hit, board };
  }

  function disposeStall(stall) {
    scene.remove(stall.group); stall.label.remove();
    const index = pickables.indexOf(stall.hit); if (index >= 0) pickables.splice(index, 1);
    disposeOwned(stall.group);
    stall.hit.geometry.dispose(); stall.hit.material.dispose();
  }

  function buildEnvironment(bounds) {
    // HQ arch, notice board and pedestrian crossing give the street a focal point.
    for (let x = -19; x <= -13; x += 1) box(scene, .55, .025, 4.7, x, .04, 0, '#fffbf0');
    const arch = new THREE.Group(); arch.position.set(-20, 0, -4.4);
    box(arch, .2, 5, .2, -3.2, 2.5, 0, colors.ink); box(arch, .2, 5, .2, 3.2, 2.5, 0, colors.ink);
    plaque(arch, '赛博要饭 · 丐帮总舵', 'INSERT COIN · GOOD LUCK', 6.5, 1.9, 0, 4.5, .1, 'gold'); scene.add(arch);
    const notice = new THREE.Group(); notice.position.set(-21, 0, 4.5);
    box(notice, 3.4, 2.4, .23, 0, 2.1, 0, '#8c6443', true);
    plaque(notice, '江湖告示', '钢镚虽小 · 功德无量', 3.1, 1.9, 0, 2.1, .14, 'paper');
    for (const x of [-1.2, 1.2]) box(notice, .14, 2.1, .14, x, 1, 0, colors.ink); scene.add(notice);
    const goal = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.RingGeometry(.4, .51, 4), selfMat); ring.rotation.x = -Math.PI / 2; goal.add(ring);
    box(goal, 1.2, .02, .06, 0, .01, 0, colors.gold); box(goal, .06, .02, 1.2, 0, .01, 0, colors.gold);
    goal.position.y = .18; goal.visible = false; scene.add(goal);
    return { goal };
  }
  return { makeStall, disposeStall, buildEnvironment };
}

export function lamp(scene, x, z) {
  const group = new THREE.Group(); group.position.set(x, 0, z);
  box(group, .43, .17, .43, 0, .14, 0, colors.ink);
  box(group, .12, 3.6, .12, 0, 1.9, 0, colors.ink);
  box(group, .9, .12, .13, .35, 3.7, 0, colors.ink);
  box(group, .62, .12, .62, .7, 3.6, 0, colors.ink);
  box(group, .45, .55, .42, .7, 3.29, 0, '#ffcc00', true);
  box(group, .62, .12, .62, .7, 2.97, 0, colors.ink);
  batchStatic(group);scene.add(group);
}
export function tree(scene, x, z, seed) {
  const group = new THREE.Group(); group.position.set(x, 0, z);
  box(group, 1.9, .25, 1.9, 0, .14, 0, '#aa7951', true);
  box(group, .28, 2.5, .28, 0, 1.3, 0, '#705140');
  for (let i = 0; i < 3; i++) box(group, 2.2 - i * .4, 1.2, 2 - i * .35, (i % 2) * .2, 2.2 + i * .6, 0, ['#4b7a52','#6a944e','#9baa5b'][(seed + i) % 3], i === 0);
  batchStatic(group);scene.add(group);
}
