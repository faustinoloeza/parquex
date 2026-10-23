import * as THREE from 'three';
import { annularSector, extrudeWithHoles, frustum } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Round thatched kiosk (sunscreen stand of the entrance plaza, Street View):
 * a ring-shaped counter clad in rubble stone with two gaps, wooden posts and a
 * conical palm-thatch roof ending in a cylindrical thatch crown.
 */
export default defineModel({
  type: 'palapaKiosk',
  label: 'Kiosco redondo de palma',
  params: { radius: 2.8 },
  footprint: (p) => ({ circle: p.radius + 0.3 }),
  build(p) {
    const k = new ModelKit();
    const R = p.radius;
    // stone counter: a ring with an entrance at the back and a gap at the front
    for (const [s0, s1] of [
      [0.35, Math.PI - 0.25],
      [Math.PI + 0.25, 2 * Math.PI - 0.35],
    ]) {
      k.add('limestone', extrudeWithHoles(annularSector(R - 0.45, R, s0, s1, 16), [], 1.5), 0, -0.4, 0);
      k.add('wood', extrudeWithHoles(annularSector(R - 0.6, R + 0.1, s0, s1, 16), [], 0.08), 0, 1.1, 0);
    }
    // posts carrying the roof
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
      k.cyl('wood', 0.09, 0.11, 2.4, Math.cos(a) * (R - 0.25), 0, Math.sin(a) * (R - 0.25), 6);
    }
    k.cyl('wood', 0.14, 0.16, 3.8, 0, 0, 0, 8);
    // conical thatch with a darker eave line and the crown on top
    const eave = 2.25,
      crown = 0.55;
    k.add('thatch', frustum(R + 0.6, crown, 3.2, 24), 0, eave, 0);
    k.add('thatchDark', new THREE.TorusGeometry(R + 0.45, 0.12, 4, 24).rotateX(Math.PI / 2), 0, eave + 0.05, 0, 0, false);
    k.cyl('thatch', crown, crown * 0.95, 0.85, 0, eave + 3.1, 0, 16, true);
    k.cyl('thatchDark', crown * 0.9, crown * 0.9, 0.08, 0, eave + 3.85, 0, 16);
    return { object: k.build() };
  },
});
