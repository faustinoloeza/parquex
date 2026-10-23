import * as THREE from 'three';
import { GeometryBatch } from '../graphics/batch.js';
import { extrudePolygon, m4 } from '../graphics/geometry.js';
import { materials } from '../graphics/materials.js';
import { releaseStatic } from '../graphics/memory.js';

/**
 * Piers from OpenStreetMap (park.json → piers): closed outlines become
 * platforms, open ways become decks on posts.
 * @returns {import('./index.js').Layer}
 */
export function createPiersLayer({ park, heightAt }) {
  const batch = new GeometryBatch();
  for (const p of park.piers) {
    if (p.closed && p.pts.length > 3) {
      batch.add('concrete', extrudePolygon(p.pts.slice(0, -1), 0.4), m4(0, 0.7, 0));
      continue;
    }
    for (let i = 1; i < p.pts.length; i++) {
      const [x0, z0] = p.pts[i - 1],
        [x1, z1] = p.pts[i];
      const len = Math.hypot(x1 - x0, z1 - z0);
      const deck = new THREE.BoxGeometry(len + 0.4, 0.35, 1.8);
      const y = Math.max(0.9, Math.max(heightAt(x0, z0), heightAt(x1, z1)) + 0.1);
      batch.add('concrete', deck, m4((x0 + x1) / 2, y, (z0 + z1) / 2, -Math.atan2(z1 - z0, x1 - x0)));
      const n = Math.max(1, Math.floor(len / 4));
      for (let k = 0; k <= n; k++) {
        const post = new THREE.CylinderGeometry(0.15, 0.15, 3, 5);
        batch.add('wood', post, m4(x0 + ((x1 - x0) * k) / n, y - 1.5, z0 + ((z1 - z0) * k) / n));
      }
    }
  }
  const object = releaseStatic(batch.build(materials()));
  object.name = 'piers';
  return { name: 'piers', object };
}
