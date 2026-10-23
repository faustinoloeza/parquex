import * as THREE from 'three';
import { solidColor } from '../../graphics/geometry.js';
import { createFlagCloth, flagPiece } from '../parts/flag.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Dark green paint of the pole (vertex colored, no extra material). */
const POLE = 0x1f4632;

/**
 * Flagpole of the entrance plaza (Street View): a square rubble-stone
 * pedestal on the flagstone plaza and a dark green steel pole, thicker on its
 * lower part, flying a large Mexican flag.
 */
export default defineModel({
  type: 'flagpole',
  label: 'Asta bandera',
  params: { height: 18 },
  footprint: () => ({ circle: 1.2 }),
  build(p) {
    const H = p.height;
    const group = new THREE.Group();
    const k = new ModelKit();
    const base = 1.1; // pedestal height above the plaza
    k.box('limestone', 1.5, base + 0.5, 1.5, 0, -0.5, 0);
    k.box('stone', 1.6, 0.12, 1.6, 0, base, 0);
    // pole: wide lower section with a collar, then a slender mast and a ball
    const low = H * 0.36;
    const pole = (g, y) => k.add('vertex', solidColor(g.translate(0, y, 0), POLE), 0, base, 0, 0, false);
    pole(new THREE.CylinderGeometry(0.17, 0.2, low, 12).translate(0, low / 2, 0), 0);
    pole(new THREE.CylinderGeometry(0.15, 0.21, 0.5, 12), low);
    pole(new THREE.CylinderGeometry(0.08, 0.12, H - low, 10).translate(0, (H - low) / 2, 0), low);
    pole(new THREE.SphereGeometry(0.15, 10, 8), H);
    group.add(k.build());

    // halyard ropes
    const rope = new THREE.LineBasicMaterial({ color: 0xf2f2f2, transparent: true, opacity: 0.6 });
    for (const dz of [0.12, -0.12]) {
      group.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(0.1, base + H - 0.3, dz * 0.4),
            new THREE.Vector3(0.25, base + 1.4, dz),
          ]),
          rope,
        ),
      );
    }
    const cloth = createFlagCloth(H * 0.28);
    cloth.mesh.position.set(0.1, base + H - 0.25, 0);
    group.add(cloth.mesh);
    return { object: group, update: (t) => cloth.update(t), animation: [flagPiece(cloth)] };
  },
});
