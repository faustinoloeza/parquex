import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Temazcal: low stone dome (official map) with a small doorway towards +z */
export default defineModel({
  type: 'temazcal',
  label: 'Temazcal',
  params: { radius: 4 },
  footprint: (p) => ({ circle: p.radius + 0.6 }),
  build(p) {
    const k = new ModelKit();
    const R = p.radius;
    k.cyl('darkStone', R + 0.5, R + 0.7, 0.9, 0, -0.6, 0, 20);
    const dome = new THREE.SphereGeometry(R, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    dome.scale(1, 0.72, 1);
    k.add('rockwall', dome, 0, 0.3, 0);
    // low doorway with a short tunnel
    k.box('rockwall', 1.8, 1.4, 1.6, 0, -0.2, R - 0.2);
    k.box('dark', 0.9, 1, 0.1, 0, 0, R + 0.62);
    return { object: k.build() };
  },
});
