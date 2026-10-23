import * as THREE from 'three';
import { hipRoof, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Slide tower (Tobogán, Xenses): open steel-and-concrete tower with landings
 * every 3 m and a hip roof, and one tube slide winding down towards +z into a
 * splash pool `length` meters in front of the tower.
 */
export default defineModel({
  type: 'slideTower',
  label: 'Torre con tobogán',
  params: { height: 18, size: 7, length: 36, color: 0x1982c4 },
  footprint: (p) => ({ rect: [p.size + 4, p.length + 10] }),
  clearPaths: (p) => {
    const c = Math.cos(p.rotation ?? 0),
      s = Math.sin(p.rotation ?? 0);
    const at = (dz) => [p.x + s * dz, p.z + c * dz];
    return [{ pts: [at(-p.size / 2), at(p.length + 6)], width: 12 }];
  },
  build(p) {
    const k = new ModelKit();
    const { height: H, size: S, length: L } = p;
    // posts and landings
    for (const [x, z] of [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ])
      k.box('white', 0.5, H, 0.5, (x * S) / 2, 0, (z * S) / 2);
    for (let y = 3; y < H; y += 3) {
      k.box('concrete', S + 0.4, 0.3, S + 0.4, 0, y, 0);
      k.box('white', S + 0.4, 1, 0.08, 0, y + 0.3, -S / 2 - 0.1);
    }
    k.box('concrete', S + 0.4, 0.3, S + 0.4, 0, H, 0);
    k.addTransformed('slate', hipRoof(S, S, 2.4, 0.6), new THREE.Matrix4().makeTranslation(0, H + 3, 0));
    for (const x of [-1, 1]) for (const z of [-1, 1]) k.box('white', 0.25, 3, 0.25, (x * S) / 2, H, (z * S) / 2);
    // tube slide: one turn around the tower, then a straight run with a final bump
    const pts = [
      [0, H - 0.6, S / 2],
      [S * 1.3, H - 3, S * 0.6],
      [S * 1.4, H - 6, -S * 1.1],
      [-S * 1.3, H - 9, -S * 1.1],
      [-S * 1.3, H - 11.5, S * 0.9],
      [0, H - 13.5, S + 6],
      [0.5, 3, L * 0.6],
      [0, 1.5, L * 0.85],
      [0, 0.6, L],
    ];
    const curve = new THREE.CatmullRomCurve3(pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
    k.addTransformed('plastic', solidColor(new THREE.TubeGeometry(curve, 64, 0.6, 8, false), p.color), new THREE.Matrix4());
    // supports under the straight run
    for (let t = 0.6; t < 0.95; t += 0.12) {
      const q = curve.getPoint(t);
      k.box('white', 0.25, q.y, 0.25, q.x, 0, q.z);
    }
    // splash pool
    k.box('concrete', 6, 0.6, 11, 0, -0.3, L + 4.5);
    k.box('pool', 5, 0.35, 10, 0, -0.05, L + 4.5);
    return { object: k.build() };
  },
});
