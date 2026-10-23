import * as THREE from 'three';
import { person } from '../parts/creatures.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Voladores de Papantla */
export default defineModel({
  type: 'voladores',
  label: 'Voladores de Papantla',
  params: { height: 30 },
  build(p) {
    const H = p.height;
    const k = new ModelKit();
    k.cyl('limestone', 5, 5.4, 0.6, 0, -0.2, 0, 24);
    k.cyl('wood', 0.22, 0.38, H, 0, 0, 0, 8);
    k.box('wood', 1.8, 0.25, 1.8, 0, H - 1.2, 0);
    k.cyl('wood', 0.7, 0.7, 0.3, 0, H, 0, 10);
    const group = new THREE.Group();
    group.add(k.build());
    const caporal = person([0xc0362c, 0xf3c234]);
    caporal.position.y = H + 0.9;
    group.add(caporal);
    const flyers = [];
    // the four ropes as one line object (one draw call)
    const ROPE = 0x3b2a1a;
    const ropes = new THREE.LineSegments(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(8 * 3), 3)),
      new THREE.LineBasicMaterial({ color: ROPE }),
    );
    ropes.frustumCulled = false;
    group.add(ropes);
    const ropePoints = ropes.geometry.getAttribute('position');
    for (let i = 0; i < 4; i++) {
      const flyer = person([[0xc0362c, 0xffffff, 0x2a6fd6, 0x3d9b4a][i], 0xf3c234]);
      flyer.rotation.z = Math.PI; // head down
      group.add(flyer);
      flyers.push(flyer);
    }
    return {
      object: group,
      update(t) {
        const cycle = (t % 48) / 48; // 13 turns to reach the ground, then climb back
        const descend = cycle < 0.8 ? cycle / 0.8 : 1 - (cycle - 0.8) / 0.2;
        const len = 1 + descend * (H - 3.5);
        const r = 1.2 + descend * 7.5;
        flyers.forEach((flyer, i) => {
          const a = t * 0.9 + (i * Math.PI) / 2;
          const x = Math.cos(a) * r,
            y = H - 1 - len,
            z = Math.sin(a) * r;
          flyer.position.set(x, y, z);
          flyer.rotation.y = -a;
          ropePoints.setXYZ(i * 2, Math.cos(a) * 0.9, H - 1, Math.sin(a) * 0.9);
          ropePoints.setXYZ(i * 2 + 1, x, y + 0.6, z);
        });
        ropePoints.needsUpdate = true;
        caporal.rotation.y = t * 0.9;
      },
      // the app's driver "voladores" redoes update() and draws the ropes itself
      animation: [
        {
          name: 'dance',
          driver: 'voladores',
          params: { height: H, ropeColor: `#${new THREE.Color(ROPE).getHexString()}` },
          size: 1.5,
          parts: [caporal, ...flyers],
        },
      ],
    };
  },
});
