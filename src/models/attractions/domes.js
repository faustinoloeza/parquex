import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** White building with blue domes */
export default defineModel({
  type: 'domes',
  label: 'Edificio blanco con cúpulas azules',
  params: {},
  footprint: () => ({ rect: [15, 10] }),
  build() {
    const k = new ModelKit();
    k.box('white', 14, 5, 9, 0, -0.5, 0);
    k.box('white', 15, 0.5, 10, 0, 4.5, 0);
    for (const x of [-3.4, 3.4]) {
      k.cyl('white', 2.7, 2.7, 0.8, x, 4.6, 0, 18); // drum
      k.add('glazedBlue', new THREE.SphereGeometry(2.6, 18, 9, 0, Math.PI * 2, 0, Math.PI / 2), x, 5.4, 0);
    }
    for (let i = -2; i <= 2; i++) k.box('window', 1.2, 2.4, 0.2, i * 2.6, 0, 4.6); // doors
    return { object: k.build() };
  },
});
