import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** stone aqueduct */
export default defineModel({
  type: 'aqueduct',
  label: 'Acueducto de piedra',
  params: { length: 100 },
  build(p) {
    const k = new ModelKit();
    const L = p.length,
      H = 6.5,
      span = 4.5;
    const n = Math.floor(L / span);
    for (let i = 0; i <= n; i++) k.box('limestone', 1.3, H - 1.2, 1.6, -L / 2 + i * span, -0.5, 0);
    for (let i = 0; i < n; i++) {
      const arch = new THREE.TorusGeometry((span - 1.3) / 2, 0.35, 4, 10, Math.PI);
      k.add('limestone', arch, -L / 2 + (i + 0.5) * span, H - 2.1, 0, 0, true);
    }
    k.box('limestone', L + 1.3, 1.1, 1.8, 0, H - 1.7, 0);
    k.box('darkStone', L + 1.3, 0.25, 1.9, 0, H - 0.6, 0);
    return { object: k.build() };
  },
});
