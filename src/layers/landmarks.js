import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { getModel } from '../models/index.js';
import { flapTime } from '../graphics/shaders/flap.js';
import { releaseStatic } from '../graphics/memory.js';

/**
 * Builds every landmark of the park with its model (src/models), places it on
 * the terrain and merges the static geometry of all landmarks per material, so
 * dozens of buildings cost a handful of draw calls. Animated parts (cabins,
 * flags, animals…) stay as separate objects updated every frame; the pieces
 * models describe for the mobile app are listed in `animations`
 * (src/export/animated.js).
 * @param {{ landmarks: import('../parks/define.js').Landmark[], park: object, heightAt: (x: number, z: number) => number }} options
 * @returns {import('./index.js').Layer & { animations: Array<{ id: string, object: THREE.Object3D, pieces: import('../models/define.js').AnimatedPiece[] }> }}
 */
export function createLandmarksLayer({ landmarks, park, heightAt }) {
  const object = new THREE.Group();
  object.name = 'landmarks';
  const animated = [];
  const animations = [];
  const merged = new Map(); // material → geometries in world space
  const ctx = { park, heightAt };

  for (const placement of landmarks) {
    const model = getModel(placement.type);
    if (!model) {
      console.warn(`Landmark "${placement.id}": unknown model type "${placement.type}"`);
      continue;
    }
    const instance = model.build({ ...model.params, ...placement }, ctx);
    const obj = instance.object;
    obj.name = `landmark:${placement.id}`;
    obj.position.set(placement.x, placement.y ?? heightAt(placement.x, placement.z), placement.z);
    if (placement.rotation) obj.rotation.y = -placement.rotation;
    obj.updateMatrixWorld(true);

    const statics = [];
    obj.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      o.receiveShadow = true;
      if (o.name.startsWith('batch:') && !o.material.transparent) statics.push(o);
    });
    for (const mesh of statics) {
      const g = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
      if (!merged.has(mesh.material)) merged.set(mesh.material, []);
      merged.get(mesh.material).push(g);
      mesh.removeFromParent();
      mesh.geometry.dispose();
    }
    object.add(obj);
    if (instance.update) animated.push(instance.update);
    if (instance.animation) animations.push({ id: placement.id, object: obj, pieces: instance.animation });
  }

  for (const [material, geos] of merged) {
    if (geos.some((g) => g.getAttribute('color'))) {
      for (const g of geos) {
        if (!g.getAttribute('color'))
          g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(g.getAttribute('position').count * 3).fill(1), 3));
      }
    }
    const mesh = new THREE.Mesh(mergeGeometries(geos, false), material);
    mesh.castShadow = mesh.receiveShadow = true;
    mesh.name = 'landmarks:merged';
    object.add(releaseStatic(mesh));
    for (const g of geos) g.dispose();
  }

  return {
    name: 'landmarks',
    object,
    occludesRoutes: true,
    animations,
    update({ t, dt }) {
      flapTime.value = t;
      for (const update of animated) update(t, dt);
    },
  };
}
