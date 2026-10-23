import * as THREE from 'three';
import { releaseAfterUpload } from '../../graphics/memory.js';
import { materials } from '../../graphics/materials.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Plaza del Vitral */
export default defineModel({
  type: 'vitral',
  label: 'Plaza del Vitral',
  params: {},
  footprint: () => ({ rect: [16, 12] }),
  build(p) {
    const k = new ModelKit();
    k.box('limestone', 22, 1, 18, 0, -0.6, 0);
    k.box('white', 14, 6, 10, 0, 0, -2);
    k.box('pool', 12, 0.2, 5, 0, 0.3, 6);
    const group = new THREE.Group();
    group.add(k.build());
    // stained glass lantern
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const cols = ['#e63946', '#f4a261', '#2a9d8f', '#457b9d', '#e9c46a', '#8338ec'];
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++) {
        g.fillStyle = cols[(x * 3 + y * 5) % cols.length];
        g.fillRect(x * 16, y * 16, 15, 15);
      }
    const tex = releaseAfterUpload(new THREE.CanvasTexture(c));
    tex.colorSpace = THREE.SRGBColorSpace;
    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(2.6, 3.2, 3.5, 8),
      new THREE.MeshStandardMaterial({ map: tex, emissive: 0x332211, roughness: 0.3 }),
    );
    lantern.position.set(0, 7.8, -2);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(3, 1.6, 8), materials().white);
    cap.position.set(0, 10.3, -2);
    group.add(lantern, cap);
    return { object: group };
  },
});
