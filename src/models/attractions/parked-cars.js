import * as THREE from 'three';
import { solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const COLORS = [0xf4f4f4, 0xd9d9d9, 0x9aa1a8, 0x2b2f36, 0xb3262e, 0x2c5aa0, 0xf4f4f4, 0x6d7278];

/**
 * Rows of parked cars (staff / visitor lots). Like the bus rows of
 * vehicles.js: `rows` in absolute park coordinates, each
 * { from: [x, z], to: [x, z], count, heading } with heading the car's long
 * axis in degrees (0 = east, 90 = south); colors cycle through a muted palette.
 * Every car is a body and a cabin in one vertex-colored mesh (24 triangles).
 */
export default defineModel({
  type: 'parkedCars',
  label: 'Autos estacionados',
  params: { rows: [] },
  clearPaths: (p) => p.rows.map((r) => ({ pts: [r.from, r.to], width: 5 })),
  build(p) {
    const k = new ModelKit();
    let n = 0;
    for (const row of p.rows) {
      for (let i = 0; i < row.count; i++) {
        const t = row.count === 1 ? 0 : i / (row.count - 1);
        const x = row.from[0] + (row.to[0] - row.from[0]) * t - p.x;
        const z = row.from[1] + (row.to[1] - row.from[1]) * t - p.z;
        const ry = (-row.heading * Math.PI) / 180;
        const c = COLORS[(n * 5 + 3) % COLORS.length];
        k.add('vertex', solidColor(new THREE.BoxGeometry(4.3, 0.85, 1.8).translate(0, 0.55, 0), c), x, 0, z, ry, false);
        k.add('vertex', solidColor(new THREE.BoxGeometry(2.2, 0.6, 1.6).translate(-0.2, 1.25, 0), 0x2a3440), x, 0, z, ry, false);
        n++;
      }
    }
    return { object: k.build() };
  },
});
