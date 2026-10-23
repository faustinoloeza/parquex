import * as THREE from 'three';
import { extrudePolygon } from '../../graphics/geometry.js';
import { rock } from '../parts/rock.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Vertical slab whose front outline is `outline` ([x, y] in meters, y up),
 * `depth` thick along z and centered on z = 0 (extrudePolygon extrudes up y).
 */
function slab(outline, depth) {
  const g = extrudePolygon(
    outline.map(([x, y]) => [x, -y]),
    depth,
    { top: true, bottom: true },
  );
  g.rotateX(Math.PI / 2);
  g.translate(0, 0, -depth / 2);
  return g;
}

/**
 * Arco maya de acceso (Xcaret): a light ashlar gatehouse — a taller central
 * block pierced by a pointed corbel arch, two lower wings with square doors,
 * lattice panels and a zigzag frieze, crenellations along the top, stepped
 * slabs at the wing ends, a two-step plinth and the carved XCARET boulder in
 * front of the arch. Front (arch) faces +z. Modeled on street-level photos.
 */
export default defineModel({
  type: 'entranceArch',
  label: 'Arco maya de acceso',
  params: { wing: 5.6, depth: 4.6 },
  footprint: (p) => ({ rect: [p.wing * 2 + 5.6, p.depth + 3] }),
  build(p) {
    const k = new ModelKit();
    const C = 2.4, // half width of the central block
      W = p.wing,
      D = p.depth,
      HC = 6.6, // central block height
      HW = 4.8; // wing height
    const front = D / 2;

    // plinth and two steps along the whole front
    const span = 2 * (C + W) + 0.8;
    k.box('pierStone', span, 0.45, D + 1.2, 0, -0.3, 0);
    k.box('pierStone', span - 0.6, 0.3, 0.7, 0, -0.3, front + 0.95);
    k.box('pierStone', span - 1.2, 0.15, 0.6, 0, -0.3, front + 1.55);

    // central block with the pointed (corbel) arch cut through it
    const arch = [
      [-C, 0],
      [-1.25, 0],
      [-1.25, 3.0],
      [-0.18, 5.0],
      [0.18, 5.0],
      [1.25, 3.0],
      [1.25, 0],
      [C, 0],
      [C, HC],
      [-C, HC],
    ];
    k.add('pierStone', slab(arch, D + 0.4), 0, 0.15, 0);
    // jungle seen through the arch: a dark back panel set inside the passage
    k.box('dark', 2.4, 4.9, 0.1, 0, 0.15, -D / 2 + 0.25);
    k.box('stone', C * 2 + 0.3, 0.35, D + 0.7, 0, HC - 0.2, 0);
    // crenellations on the central block (front and back rows)
    for (let i = 0; i < 5; i++) {
      const x = -C + 0.45 + i * ((C * 2 - 0.9) / 4);
      for (const z of [front - 0.1, -front + 0.1]) k.box('pierStone', 0.55, 0.7, 0.5, x, HC + 0.15, z);
    }

    for (const s of [-1, 1]) {
      const cx = s * (C + W / 2);
      // wing body and cornices
      k.box('pierStone', W, HW, D, cx, 0.15, 0);
      k.box('stone', W + 0.2, 0.25, D + 0.3, cx, 2.95, 0);
      k.box('stone', W + 0.3, 0.3, D + 0.4, cx, HW + 0.1, 0);
      // square door
      k.box('dark', 1.35, 2.3, 0.08, cx + s * 0.6, 0.3, front + 0.02);
      // zigzag frieze: small blocks turned 45° in a band above the cornice
      for (let i = 0; i < 7; i++) {
        const x = cx - W / 2 + 0.45 + i * ((W - 0.9) / 6);
        const g = new THREE.BoxGeometry(0.42, 0.42, 0.12).rotateZ(Math.PI / 4);
        k.add('darkStone', g, x, 3.5, front + 0.05);
      }
      // lattice (celosía) panels
      for (const dx of [-W / 4, W / 4]) {
        k.box('darkStone', 1.2, 0.95, 0.08, cx + dx, 3.8, front + 0.03);
        for (let j = 0; j < 3; j++) k.box('pierStone', 1.2, 0.1, 0.1, cx + dx, 3.9 + j * 0.3, front + 0.06);
      }
      // crenellations on the wing
      for (let i = 0; i < 4; i++) {
        const x = cx - W / 2 + 0.6 + i * ((W - 1.2) / 3);
        k.box('pierStone', 0.5, 0.55, 0.45, x, HW + 0.4, front - 0.1);
      }
      // stepped slabs at the outer end of each wing
      for (let j = 0; j < 4; j++)
        k.box('pierStone', 0.9 - j * 0.15, 0.32, D + 0.2 - j * 0.3, s * (C + W - 0.45 + j * 0.07), HW + 0.4 + j * 0.34, 0);
    }

    // carved XCARET boulder in front of the arch (a low shrub behind it)
    const boulder = rock(1.2, 7);
    boulder.scale(1.1, 1.05, 0.6);
    k.add('sandstone', boulder, 0.2, 0.7, front + 2.4, 0, false);
    k.add('leaves', new THREE.IcosahedronGeometry(0.8, 0).scale(1.6, 0.6, 0.8), 0, 0.5, front + 1.4, 0, false);
    return { object: k.build() };
  },
});
