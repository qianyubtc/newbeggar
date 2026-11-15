import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Bake static siblings into one draw per material. Joints, instancing, signs
// and explicitly animated meshes retain their own transforms/materials.
export function batchStatic(parent,skip=new Set()) {
  const materials=new Map(),lines=new Map();
  for(const mesh of [...parent.children]){
    if(!mesh.isMesh||mesh.isInstancedMesh||skip.has(mesh)||Array.isArray(mesh.material)||mesh.material.map||mesh.material.visible===false)continue;
    mesh.updateMatrix();
    const list=materials.get(mesh.material)||[];list.push(mesh);materials.set(mesh.material,list);
    for(const line of [...mesh.children])if(line.isLineSegments){
      line.updateMatrix();const geometry=line.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(mesh.matrix,line.matrix));
      const list=lines.get(line.material)||[];list.push(geometry);lines.set(line.material,list);mesh.remove(line);
    }
  }
  for(const [material,meshes] of materials){
    if(meshes.length<2)continue;
    const parts=meshes.map(mesh=>mesh.geometry.clone().applyMatrix4(mesh.matrix)),geometry=mergeGeometries(parts,false);
    for(const part of parts)part.dispose();
    if(!geometry)continue;
    const merged=new THREE.Mesh(geometry,material);merged.userData.ownedGeometry=true;parent.add(merged);
    for(const mesh of meshes)parent.remove(mesh);
  }
  for(const [material,parts] of lines){
    const geometry=mergeGeometries(parts,false);for(const part of parts)part.dispose();
    if(geometry){const line=new THREE.LineSegments(geometry,material);line.userData.ownedGeometry=true;parent.add(line)}
  }
  return parent;
}

// Dispose only per-instance resources; primitives and palette materials are shared.
export function disposeOwned(root) {
  const geometries=new Set(),materials=new Set(),textures=new Set();
  root.traverse(mesh=>{
    if(mesh.userData.ownedGeometry)geometries.add(mesh.geometry);
    if(mesh.userData.fadeMat)materials.add(mesh.userData.fadeMat);
    const material=mesh.userData.originalMat||mesh.material;
    if(material?.map){textures.add(material.map);materials.add(material);geometries.add(mesh.geometry)}
    if(mesh.isInstancedMesh)mesh.dispose();
  });
  for(const geometry of geometries)geometry.dispose();for(const material of materials)material.dispose();for(const texture of textures)texture.dispose();
}
