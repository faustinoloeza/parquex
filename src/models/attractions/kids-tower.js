import { hipRoof, m4 } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Torre de juegos infantil */
export default defineModel({
  type: 'kidsTower',
  label: 'Torre de juegos infantil',
  params: {},
  footprint: () => ({ rect: [10, 8] }),
  build(p) {
    const k = new ModelKit();
    k.box('wall', 9, 7, 7, 0, -0.5, 0);
    k.box('red', 6, 6, 5, 0, 6.5, 0);
    k.addTransformed('tile', hipRoof(7, 6, 3.4, 0.5), m4(0, 12.5, 0));
    // glass bridges towards the slide pools
    k.box('glass', 2.6, 2.4, 22, 0, 4, -15);
    k.box('glass', 2.6, 2.4, 18, 0, 4, 13);
    for (const z of [-24, -14, 10, 20]) k.box('yellow', 0.4, 4, 0.4, 0, -0.5, z);
    // colourful playground cubes
    const cols = ['red', 'yellow', 'teal', 'green'];
    for (let i = 0; i < 6; i++) k.box(cols[i % 4], 2.2, 1.6 + (i % 3), 2.2, 7 + (i % 2) * 3, -0.5, -6 + i * 2.6);
    return { object: k.build() };
  },
});
