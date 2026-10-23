import * as THREE from 'three';
import { ellipse, extrudeWithHoles } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Foro abierto: round tiered forum under a white tensile roof */
export default defineModel({
  type: 'forum',
  label: 'Foro abierto',
  params: { radius: 17 },
  footprint: (p) => ({ circle: p.radius + 1.5 }),
  build(p) {
    const k = new ModelKit();
    const R = p.radius;
    k.add('limestone', extrudeWithHoles(ellipse(R + 1.5, R + 1.5, 36), [ellipse(R - 1.2, R - 1.2, 36)], 1.2), 0, -0.5, 0);
    for (let i = 0; i < 4; i++)
      k.add(
        'stone',
        extrudeWithHoles(ellipse(R - 2 - i * 2.2, R - 2 - i * 2.2, 36), [ellipse(R - 4.2 - i * 2.2, R - 4.2 - i * 2.2, 36)], 2.6 - i * 0.6),
        0,
        -0.4,
        0,
      );
    k.cyl('limestone', R - 11, R - 11, 0.6, 0, -0.2, 0, 32);
    const n = 18;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      k.box('limestone', 1.4, 7, 1.4, Math.cos(a) * R, 0.5, Math.sin(a) * R, -a);
    }
    k.add('limestone', extrudeWithHoles(ellipse(R + 0.9, R + 0.9, 36), [ellipse(R - 0.9, R - 0.9, 36)], 1.2), 0, 7.4, 0);
    // white tensile roof over the whole forum (satellite imagery), festooned
    // between the columns: the rim dips halfway between two of them
    const shell = new THREE.SphereGeometry(R + 1.5, 72, 10, 0, Math.PI * 2, 0, Math.PI / 2);
    shell.scale(1, 0.32, 1);
    const pos = shell.getAttribute('position');
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        z = pos.getZ(i);
      const t = Math.hypot(x, z) / (R + 1.5);
      pos.setY(i, pos.getY(i) - t ** 3 * 1.4 * (0.5 - 0.5 * Math.cos(n * Math.atan2(z, x))));
    }
    shell.computeVertexNormals();
    k.add('white', shell, 0, 7.6, 0);
    return { object: k.build() };
  },
});
