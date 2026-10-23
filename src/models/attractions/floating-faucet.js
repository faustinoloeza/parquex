import * as THREE from 'three';
import { solidColor } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const BRASS = 0xc9a13b,
  RED = 0xc8202c,
  WATER = 0xf2fbff,
  FOAM = 0xffffff;

/**
 * Giant "floating" faucet of Xel-Há: a brass tap with a red cross handle
 * hanging in the air over the lagoon, held up (invisibly) by the column of
 * water falling from its spout, with a foam ring where it meets the water.
 * Origin at the water surface under the spout (place with `y` = 0); the tap
 * body points towards -x. Vertex-painted `plastic` plus the shared translucent
 * `glass` for the water.
 */
export default defineModel({
  type: 'floatingFaucet',
  label: 'Llave flotante',
  params: { height: 4.6 },
  footprint: () => ({ circle: 2 }),
  build(p) {
    const k = new ModelKit();
    const H = p.height;
    const add = (g, color, m) => k.addTransformed('plastic', solidColor(g, color), m ?? new THREE.Matrix4());
    const at = (x, y, z) => new THREE.Matrix4().makeTranslation(x, y, z);
    // water column: translucent light aqua (shared `glass`), flared at the
    // bottom, with a white core so it reads as falling water from afar
    const column = new THREE.CylinderGeometry(0.42, 0.75, H, 14, 2, true).translate(0, H / 2, 0);
    k.addTransformed('glass', column, new THREE.Matrix4());
    add(new THREE.CylinderGeometry(0.22, 0.3, H, 8, 1, true).translate(0, H / 2, 0), WATER);
    // splash: foam ring and a wide light disc on the water
    add(new THREE.TorusGeometry(1.1, 0.3, 6, 18).rotateX(Math.PI / 2), FOAM, at(0, 0.1, 0));
    add(new THREE.CylinderGeometry(1.9, 2.2, 0.1, 18), WATER, at(0, 0, 0));
    // brass tap ≈ 3.3 m long: spout bending down, body, inlet and flange
    add(new THREE.CylinderGeometry(0.48, 0.52, 0.8, 14), BRASS, at(0, H - 0.2, 0));
    add(new THREE.TorusGeometry(0.75, 0.42, 8, 12, Math.PI / 2), BRASS, at(-0.75, H + 0.6, 0));
    add(new THREE.CylinderGeometry(0.58, 0.58, 1.6, 14).rotateZ(Math.PI / 2), BRASS, at(-1.55, H + 1.35, 0));
    add(new THREE.CylinderGeometry(0.72, 0.72, 0.9, 16).rotateZ(Math.PI / 2), BRASS, at(-2.6, H + 1.35, 0));
    add(new THREE.CylinderGeometry(0.85, 0.85, 0.22, 16).rotateZ(Math.PI / 2), BRASS, at(-3.15, H + 1.35, 0));
    // red cross handle on its stem
    add(new THREE.CylinderGeometry(0.16, 0.2, 0.8, 8), BRASS, at(-1.7, H + 1.8, 0));
    add(new THREE.BoxGeometry(2, 0.3, 0.45), RED, at(-1.7, H + 2.6, 0));
    add(new THREE.BoxGeometry(0.45, 0.3, 2), RED, at(-1.7, H + 2.6, 0));
    add(new THREE.SphereGeometry(0.26, 8, 6), RED, at(-1.7, H + 2.8, 0));
    return { object: k.build() };
  },
});
