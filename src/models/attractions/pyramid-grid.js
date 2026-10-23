import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Open hall under a grid of pyramid roofs on wooden posts (El Troglodita,
 * Xplor's buffet): `nx` × `nz` cells of `cell` meters, posts `height` tall,
 * each cell capped by a four-sided thatch pyramid `peak` meters high.
 */
export default defineModel({
  type: 'pyramidGrid',
  label: 'Comedor con techos piramidales',
  params: { nx: 4, nz: 4, cell: 8.5, height: 4.2, peak: 5, tables: true },
  footprint: (p) => ({ rect: [p.nx * p.cell + 1, p.nz * p.cell + 1] }),
  build(p) {
    const k = new ModelKit();
    const { nx, nz, cell: C, height: H, peak } = p;
    const W = nx * C,
      D = nz * C;
    k.box('paving', W + 1, 0.3, D + 1, 0, -0.1, 0);
    for (let i = 0; i <= nx; i++) for (let j = 0; j <= nz; j++) k.cyl('wood', 0.2, 0.24, H, -W / 2 + i * C, 0.2, -D / 2 + j * C, 6);
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < nz; j++) {
        const x = -W / 2 + (i + 0.5) * C,
          z = -D / 2 + (j + 0.5) * C;
        const roof = new THREE.ConeGeometry((C / 2) * Math.SQRT2 + 0.3, peak, 4, 1, true).rotateY(Math.PI / 4);
        roof.translate(0, peak / 2, 0);
        k.add('thatch', roof, x, H + 0.2, z);
        if (p.tables) k.box('weatheredWood', 2.2, 0.75, 0.9, x, 0.2, z);
      }
    }
    // eaves beams along the grid lines
    for (let i = 0; i <= nx; i++) k.box('wood', 0.2, 0.25, D, -W / 2 + i * C, H, 0);
    for (let j = 0; j <= nz; j++) k.box('wood', W, 0.25, 0.2, 0, H, -D / 2 + j * C);
    return { object: k.build() };
  },
});
