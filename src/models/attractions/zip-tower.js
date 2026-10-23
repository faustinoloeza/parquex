import * as THREE from 'three';
import { frustum } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Zip-line tower (Xplor): a tapered rubble-stone shaft with a wooden launch
 * deck and a conical palapa roof on posts. `spiral: true` adds an outer
 * helical staircase (the tall spiral towers of the official map). `cables`
 * lists the towers this one sends riders to, in absolute park coordinates
 * `[x, z, h]` (h = height of the arrival platform above the ground there):
 * each becomes a pair of sagging steel cables from this deck.
 */
export default defineModel({
  type: 'zipTower',
  label: 'Torre de tirolesa',
  params: { height: 22, radius: 3, spiral: false, roof: true, cables: [] },
  footprint: (p) => ({ circle: p.radius + (p.spiral ? 2.4 : 2) }),
  build(p, ctx) {
    const k = new ModelKit();
    const { height: H, radius: R } = p;
    const deck = H - 4;
    k.cyl('rockwall', R * 0.85, R * 1.1, deck, 0, 0, 0, 14);
    // launch deck with a solid rail and the roof posts
    k.cyl('wood', R + 1.6, R + 1.6, 0.35, 0, deck, 0, 16);
    k.cyl('weatheredWood', R + 1.6, R + 1.6, 1.0, 0, deck + 0.35, 0, 16, true);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      k.cyl('wood', 0.14, 0.16, 3.6, Math.cos(a) * (R + 1.3), deck + 0.35, Math.sin(a) * (R + 1.3), 5);
    }
    if (p.roof) {
      k.add('thatch', frustum(R + 2.5, 0, 5, 14), 0, deck + 3.9, 0);
      k.add('thatchDark', new THREE.TorusGeometry(R + 2.35, 0.2, 4, 14).rotateX(Math.PI / 2), 0, deck + 3.95, 0, 0, false);
    }
    if (p.spiral) {
      // helical stair around the shaft: one turn every 7 m, posts on the outside
      const rs = R * 1.1 + 0.9;
      const steps = Math.floor(deck / 0.45);
      for (let i = 0; i < steps; i++) {
        const y = i * 0.45,
          a = (y / 7) * Math.PI * 2;
        k.box('wood', 1.6, 0.18, 0.75, Math.cos(a) * rs, y, Math.sin(a) * rs, -a);
        if (i % 4 === 0) k.cyl('iron', 0.06, 0.06, 1.1, Math.cos(a) * (rs + 0.75), y, Math.sin(a) * (rs + 0.75), 4);
      }
    }
    // zip cables (pairs) to the next towers of the circuit
    const h0 = ctx?.heightAt?.(p.x, p.z) ?? 0;
    const rot = p.rotation ?? 0,
      c = Math.cos(rot),
      s = Math.sin(rot);
    for (const [tx, tz, th = 8] of p.cables ?? []) {
      const dx = tx - p.x,
        dz = tz - p.z;
      // world offset → model frame (the layer applies rotation.y afterwards)
      const lx = c * dx - s * dz,
        lz = s * dx + c * dz;
      const len = Math.hypot(lx, lz);
      const y1 = (ctx?.heightAt?.(tx, tz) ?? h0) - h0 + th;
      const nx = -lz / len,
        nz = lx / len;
      for (const side of [-0.7, 0.7]) {
        const pts = [];
        for (let i = 0; i <= 10; i++) {
          const t = i / 10;
          const y = deck + 1.6 + (y1 - deck - 1.6) * t - len * 0.012 * 4 * t * (1 - t);
          pts.push(new THREE.Vector3(lx * t + nx * side, y, lz * t + nz * side));
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        k.add('dark', new THREE.TubeGeometry(curve, 12, 0.16, 4, false), 0, 0, 0, 0, false);
      }
    }
    return { object: k.build() };
  },
});
