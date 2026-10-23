import * as THREE from 'three';
import { extrudeProfile } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Shade-net greenhouse (Museo Viviente de Orquídeas y Bromelias): `bays`
 * gabled roofs side by side along the length (z), or one barrel vault with
 * `vault: true`, over low walls; dark net as on satellite imagery, with the
 * red ridges of the official map.
 */
export default defineModel({
  type: 'greenhouse',
  label: 'Invernadero de malla sombra',
  params: { length: 20, width: 10, bays: 1, vault: false, height: 3 },
  footprint: (p) => ({ rect: [p.width, p.length] }),
  // no trees inside: a band along the length
  clearPaths: (p) => {
    const s = Math.sin(p.rotation ?? 0) * (p.length / 2),
      c = Math.cos(p.rotation ?? 0) * (p.length / 2);
    return [
      {
        pts: [
          [p.x - s, p.z - c],
          [p.x + s, p.z + c],
        ],
        width: p.width + 2,
      },
    ];
  },
  build(p) {
    const k = new ModelKit();
    const { length: L, width: W, height: H } = p;
    k.box('white', W, 1.4, L, 0, -0.6, 0);
    k.box('shadeNet', W - 0.1, H, L - 0.1, 0, 0.8, 0);
    const y = H + 0.8;
    if (p.vault) {
      const r = W / 2;
      const g = new THREE.CylinderGeometry(r, r, L, 16, 1, true, Math.PI / 2, Math.PI);
      g.rotateX(Math.PI / 2);
      k.add('shadeNet', g, 0, y, 0);
      for (let z = -L / 2 + 1; z <= L / 2 - 1; z += 3) {
        const rib = new THREE.TorusGeometry(r + 0.03, 0.06, 4, 16, Math.PI);
        k.add('iron', rib, 0, y, z, 0, false);
      }
    } else {
      const bw = W / p.bays,
        rise = bw * 0.38;
      for (let b = 0; b < p.bays; b++) {
        const x = -W / 2 + bw * (b + 0.5);
        const roof = extrudeProfile(
          [
            [-bw / 2, 0],
            [bw / 2, 0],
            [0, rise],
          ],
          L,
        );
        k.add('shadeNet', roof, x, y, 0, Math.PI / 2);
        k.box('red', 0.25, 0.2, L, x, y + rise - 0.08, 0);
      }
    }
    return { object: k.build() };
  },
});
