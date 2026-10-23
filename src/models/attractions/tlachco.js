import * as THREE from 'three';
import { extrudePolygon, extrudeWithHoles, hipRoof, m4, polygonPyramid, regularPolygon } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Gran Tlachco */
export default defineModel({
  type: 'tlachco',
  label: 'Gran Tlachco',
  params: { radius: 44 },
  footprint: (p) => ({ circle: p.radius + 4 }),
  build(p) {
    const k = new ModelKit();
    const R = p.radius;
    const oct = (r) => regularPolygon(8, r, Math.PI / 8); // flat face towards the south (+z)
    k.add('limestone', extrudePolygon(oct(R + 5), 3.2), 0, -2, 0);
    k.add('wall', extrudePolygon(oct(R * 0.9), 15, { top: false }), 0, 1, 0);
    // colonnade around the drum
    const pts = oct(R * 0.985);
    for (let i = 0; i < 8; i++) {
      const a = pts[i],
        b = pts[(i + 1) % 8];
      for (let j = 0; j < 7; j++) {
        const t = (j + 0.5) / 7;
        k.cyl('white', 0.75, 0.85, 12, a[0] + (b[0] - a[0]) * t, 1.2, a[1] + (b[1] - a[1]) * t, 10);
      }
    }
    k.add('white', extrudePolygon(oct(R + 0.8), 2.4), 0, 13.2, 0);
    k.addTransformed('tile', polygonPyramid(oct(R + 4.5), 22, [0, 0], 4), m4(0, 15.4, 0));
    // lantern
    k.add('white', extrudePolygon(oct(3.2), 3.4), 0, 35, 0);
    k.addTransformed('tile', polygonPyramid(oct(4.2), 3.2, [0, 0], 2), m4(0, 38.3, 0));
    // south portico and fountains
    const fz = R * Math.cos(Math.PI / 8) + 3;
    k.box('limestone', 28, 15, 9, 0, 1, fz);
    // arcade of five arches with columns
    for (let i = -2; i <= 2; i++) {
      k.box('window', 3.4, 5.2, 0.4, i * 5.2, 1.6, fz + 4.4);
      const arch = new THREE.CylinderGeometry(1.7, 1.7, 0.4, 14, 1, false, 0, Math.PI);
      arch.rotateX(Math.PI / 2);
      arch.rotateZ(Math.PI / 2);
      k.add('window', arch, i * 5.2, 6.8, fz + 4.4, 0, false);
      k.cyl('white', 0.45, 0.5, 8, i * 5.2 + 2.6, 1.2, fz + 4.9, 10);
    }
    k.cyl('white', 0.45, 0.5, 8, -2 * 5.2 - 2.6, 1.2, fz + 4.9, 10);
    k.box('green', 28.6, 0.9, 9.6, 0, 11.6, fz);
    k.box('white', 28.6, 0.6, 9.8, 0, 9.4, fz);
    for (let st = 0; st < 5; st++) k.box('limestone', 22 - st, 0.3, 1, 0, 0.6 + st * 0.3 - 1.5, fz + 9.5 - st);
    k.addTransformed('tile', hipRoof(28, 9, 3.5, 0.8), m4(0, 16, fz));
    // green frieze under the roof like on the official map
    k.add('green', extrudeWithHoles(oct(R + 1.2), [oct(R + 0.2)], 0.8), 0, 14.6, 0);
    for (const sx of [-1, 1]) {
      k.cyl('limestone', 6.5, 6.8, 1.1, sx * 22, 0.4, fz + 14, 24);
      k.cyl('pool', 5.8, 5.8, 0.15, sx * 22, 1.45, fz + 14, 24);
    }
    return { object: k.build() };
  },
});
