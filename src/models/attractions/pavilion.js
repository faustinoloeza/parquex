import * as THREE from 'three';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Simple modern pavilion, `width` (x) × `depth` (z) × `height`, with one of four tops:
 *   flat     white box with a thin roof slab
 *   panels   flat roof covered by rows of tilted solar panels (big halls)
 *   dome     round drum with a dome of material `domeMaterial` (width = diameter)
 *   pergola  open shade: posts and a slatted wooden roof over picnic tables
 */
export default defineModel({
  type: 'pavilion',
  label: 'Pabellón (techo plano, paneles, domo o pérgola)',
  params: { width: 12, depth: 8, height: 4.5, roof: 'flat', wall: 'white', domeMaterial: 'court', tables: true },
  footprint: (p) => (p.roof === 'dome' ? { circle: p.width / 2 + 0.5 } : { rect: [p.width + 1, p.depth + 1] }),
  build(p) {
    const k = new ModelKit();
    const { width: W, depth: D, height: H } = p;
    if (p.roof === 'dome') {
      const r = W / 2;
      k.cyl(p.wall, r, r, H * 0.45, 0, -0.3, 0, 24);
      const dome = new THREE.SphereGeometry(r, 24, 8, 0, Math.PI * 2, 0, Math.PI / 2);
      dome.scale(1, (H * 0.6) / r, 1);
      k.add(p.domeMaterial, dome, 0, H * 0.45 - 0.3, 0);
      return { object: k.build() };
    }
    if (p.roof === 'pergola') {
      const nx = Math.max(2, Math.round(W / 4)),
        nz = Math.max(2, Math.round(D / 4));
      for (let i = 0; i <= nx; i++)
        for (let j = 0; j <= nz; j++) k.box('wood', 0.25, H, 0.25, -W / 2 + (W * i) / nx, 0, -D / 2 + (D * j) / nz);
      for (let j = 0; j <= nz; j++) k.box('wood', W + 0.6, 0.3, 0.3, 0, H, -D / 2 + (D * j) / nz);
      for (let x = -W / 2; x <= W / 2; x += 0.9) k.box('wood', 0.12, 0.12, D + 0.6, x, H + 0.3, 0);
      if (p.tables)
        for (let x = -W / 2 + 2; x < W / 2 - 1; x += 3)
          for (let z = -D / 2 + 2; z < D / 2 - 1; z += 3) k.box('weatheredWood', 1.8, 0.75, 0.9, x, 0, z);
      return { object: k.build() };
    }
    k.box(p.wall, W, H, D, 0, -0.3, 0);
    k.box('concrete', W + 0.6, 0.35, D + 0.6, 0, H - 0.3, 0);
    if (p.roof === 'panels') {
      // panel rows along x, tilted towards the sun (south, +z)
      const rows = Math.floor((D - 1) / 2.2);
      for (let i = 0; i < rows; i++) {
        const g = new THREE.BoxGeometry(W - 1.2, 0.08, 1.7);
        g.rotateX(0.22);
        k.add('slate', g, 0, H + 0.45, -D / 2 + 1.4 + i * 2.2, 0, false);
      }
    }
    return { object: k.build() };
  },
});
