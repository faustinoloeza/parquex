import * as THREE from 'three';
import { hipRoof, solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const WALLS = [0xf2c14e, 0xe76f51, 0x2a9d8f, 0xf4a3b4, 0x8ecae6, 0xffffff, 0xb5e48c, 0xc77dff];

/**
 * El Pueblo (Xenses): a row of colorful village houses leaning every which way
 * along one side of a street, the first one upside down (roof on the ground).
 * `line` is the street in absolute park coordinates; houses stand on its left
 * (side 1) or right (side -1), `offset` meters from the line.
 */
export default defineModel({
  type: 'crookedTown',
  label: 'Pueblo chueco (casas inclinadas)',
  params: { line: [], side: 1, offset: 6, spacing: 7, depth: 6, seed: 3 },
  clearPaths: (p) => [{ pts: p.line, width: (p.offset + p.depth) * 2 }],
  build(p) {
    const k = new ModelKit();
    let seed = p.seed;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
    let house = 0;
    for (let i = 1; i < p.line.length; i++) {
      const [ax, az] = p.line[i - 1],
        [bx, bz] = p.line[i];
      const len = Math.hypot(bx - ax, bz - az);
      const ux = (bx - ax) / len,
        uz = (bz - az) / len;
      // left normal (x east, z south): rotate the direction by +90° seen from above
      const nx = uz * p.side,
        nz = -ux * p.side;
      const n = Math.max(1, Math.floor(len / p.spacing));
      for (let j = 0; j < n; j++) {
        const t = (j + 0.5) / n;
        const w = p.spacing * 0.86;
        const d = p.depth * (0.8 + 0.2 * Math.abs(rnd()));
        const h = 4.5 + 2.5 * Math.abs(rnd());
        const cx = ax + (bx - ax) * t + nx * (p.offset + d / 2) - p.x;
        const cz = az + (bz - az) * t + nz * (p.offset + d / 2) - p.z;
        const yaw = -Math.atan2(uz, ux) + rnd() * 0.12;
        const upside = house === 0;
        const lean = new THREE.Euler(rnd() * 0.22, yaw, upside ? Math.PI : rnd() * 0.2, 'YXZ');
        const m = new THREE.Matrix4().compose(
          new THREE.Vector3(cx, upside ? h + 1.5 : 0, cz),
          new THREE.Quaternion().setFromEuler(lean),
          new THREE.Vector3(1, 1, 1),
        );
        const body = solidColor(new THREE.BoxGeometry(w, h, d).translate(0, h / 2 - 0.4, 0), WALLS[house % WALLS.length]);
        k.addTransformed('vertex', body, m);
        // door and two windows on the street side
        const front = new THREE.Matrix4().makeTranslation(0, 0, p.side * (d / 2 + 0.05));
        const door = solidColor(new THREE.BoxGeometry(1.2, 2.2, 0.12).translate(0, 0.7, 0), 0x3d2b1f);
        k.addTransformed('vertex', door, m.clone().multiply(front));
        for (const x of [-w / 3, w / 3]) {
          const win = solidColor(new THREE.BoxGeometry(1.1, 1.1, 0.12).translate(x, h - 2.2, 0), 0x2f4858);
          k.addTransformed('vertex', win, m.clone().multiply(front));
        }
        const roof = hipRoof(w, d, 2, 0.4);
        k.addTransformed('tile', roof, m.clone().multiply(new THREE.Matrix4().makeTranslation(0, h - 0.4, 0)));
        house++;
      }
    }
    return { object: k.build() };
  },
});
