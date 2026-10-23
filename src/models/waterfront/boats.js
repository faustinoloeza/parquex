import * as THREE from 'three';
import { extrudePolygon } from '../../graphics/geometry.js';
import { std } from '../../graphics/materials.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** moored boats */
export default defineModel({
  type: 'boats',
  label: 'Lanchas amarradas',
  params: { boats: [] },
  build(p) {
    const group = new THREE.Group();
    const items = [];
    for (const [x, z, heading, len, color] of p.boats) {
      const k = new ModelKit();
      const W = len * 0.3;
      // hull: pointed bow towards +x
      const hull = [
        [-len / 2, -W / 2],
        [len * 0.28, -W / 2],
        [len / 2, 0],
        [len * 0.28, W / 2],
        [-len / 2, W / 2],
      ];
      k.add('hull', extrudePolygon(hull, 1.1), 0, -0.4, 0);
      k.add(
        'boatStripe',
        extrudePolygon(
          hull.map(([a, b]) => [a * 1.002, b * 1.01]),
          0.18,
        ),
        0,
        0.35,
        0,
      );
      k.box('white', len * 0.38, 1.2, W * 0.7, -len * 0.08, 0.7, 0);
      k.box('glass', len * 0.36, 0.45, W * 0.72, -len * 0.08, 1.25, 0);
      k.box('boatCanopy', len * 0.42, 0.12, W * 0.8, -len * 0.06, 1.95, 0);
      const b = k.build({ hull: std(color, { roughness: 0.35 }) });
      const holder = new THREE.Group();
      holder.add(b);
      holder.position.set(x - p.x, 0, z - p.z);
      holder.rotation.y = -THREE.MathUtils.degToRad(heading);
      group.add(holder);
      items.push(holder);
    }
    return {
      object: group,
      update(t) {
        items.forEach((h, i) => {
          h.position.y = Math.sin(t * 1.1 + i * 1.7) * 0.12;
          h.rotation.x = Math.sin(t * 0.9 + i) * 0.03;
          h.rotation.z = Math.sin(t * 0.7 + i * 2) * 0.02;
        });
      },
    };
  },
});
