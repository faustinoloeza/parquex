import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Hacienda chimney: tapered shaft the dusty maroon of the hacienda's facades
 * with a white collar and rim at the top (Street View 2014).
 */
export default defineModel({
  type: 'chimney',
  label: 'Chimenea de hacienda',
  params: { height: 26 },
  footprint: () => ({ circle: 2.5 }),
  build(p) {
    const H = p.height;
    const g = new THREE.CylinderGeometry(0.85, 1.35, H, 12, 12);
    g.translate(0, H / 2, 0);
    const pos = g.getAttribute('position');
    const colors = new Float32Array(pos.count * 3);
    const maroon = new THREE.Color('#a9505a'),
      white = new THREE.Color('#f4efe4');
    for (let i = 0; i < pos.count; i++) {
      const band = pos.getY(i) > H - H / 12 - 0.01 ? white : maroon; // top twelfth: white collar
      colors.set([band.r, band.g, band.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const k = new ModelKit();
    k.box('limestone', 4, 3.5, 4, 0, -1, 0);
    k.add('vertex', g, 0, 2.4, 0, 0, true);
    k.cyl('white', 1.05, 0.92, 0.5, 0, H + 2.4, 0, 12); // flared rim
    k.cyl('dark', 0.8, 0.8, 0.52, 0, H + 2.4, 0, 12); // soot inside
    return { object: k.build() };
  },
});
