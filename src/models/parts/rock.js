import * as THREE from 'three';

/** Low-poly boulder; `seed` varies the shape deterministically. */
export function rock(r, seed) {
  const g = new THREE.IcosahedronGeometry(r, 0);
  const pos = g.getAttribute('position');
  for (let i = 0; i < pos.count; i++) {
    const k = 0.75 + (((i * 7 + seed * 13) % 10) / 10) * 0.5;
    pos.setXYZ(i, pos.getX(i) * k, pos.getY(i) * k * 0.7, pos.getZ(i) * k);
  }
  g.computeVertexNormals();
  return g;
}
