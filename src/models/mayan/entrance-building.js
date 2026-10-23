import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Entrance building (Puuc style), as on satellite imagery: four stone wings
 * around a courtyard planted with trees (the trees are the park's own), flat
 * flagstone roofs, a Puuc frieze on the outer facades, a corbel-arch passage
 * through the south wing into the courtyard with a grid of small windows over
 * it (official map), and a porch at the south-west corner.
 * Shapes in local meters: `outer` and `court` as [x0, z0, x1, z1].
 */
export default defineModel({
  type: 'entranceBuilding',
  label: 'Edificio de acceso (estilo Puuc)',
  params: { outer: [-17, -15, 17, 15], court: [-10, -9, 4, 3], height: 6.5 },
  footprint: (p) => ({ rect: [p.outer[2] - p.outer[0], p.outer[3] - p.outer[1]] }),
  // trees off the wings, not off the courtyard
  clearPaths: (p) => {
    const [X0, Z0, X1, Z1] = p.outer,
      [x0, z0, x1, z1] = p.court;
    const at = (x, z) => [p.x + x, p.z + z];
    return [
      { pts: [at((X0 + x0) / 2, Z0), at((X0 + x0) / 2, Z1)], width: x0 - X0 + 1 },
      { pts: [at((x1 + X1) / 2, Z0), at((x1 + X1) / 2, Z1)], width: X1 - x1 + 1 },
      { pts: [at(X0, (Z0 + z0) / 2), at(X1, (Z0 + z0) / 2)], width: z0 - Z0 + 1 },
      { pts: [at(X0, (z1 + Z1) / 2), at(X1, (z1 + Z1) / 2)], width: Z1 - z1 + 1 },
    ];
  },
  build(p) {
    const k = new ModelKit();
    const [X0, Z0, X1, Z1] = p.outer,
      [x0, z0, x1, z1] = p.court;
    const H = p.height;
    /** A wing between x0..x1, z0..z1: rubble walls, cornice band and flagstone roof. */
    const wing = (a0, b0, a1, b1) => {
      const w = a1 - a0,
        d = b1 - b0,
        cx = (a0 + a1) / 2,
        cz = (b0 + b1) / 2;
      k.box('limestone', w, H + 0.6, d, cx, -0.6, cz);
      k.box('stone', w + 0.4, 0.35, d + 0.4, cx, H * 0.42, cz);
      k.box('paving', w + 0.6, 0.45, d + 0.6, cx, H - 0.1, cz);
    };
    wing(X0, Z0, x0, Z1); // west
    wing(x1, Z0, X1, Z1); // east
    wing(x0, Z0, x1, z0); // north
    wing(x0, z1, x1, Z1); // south

    // Puuc frieze on the outer facades: a band with small columns
    const frieze = (len, place) => {
      place(0, len, 0.2, 1.8, 'stone', 0);
      const n = Math.floor((len - 1) / 1.6);
      for (let i = 0; i < n; i++) place(-len / 2 + 0.8 + (i + 0.5) * ((len - 1.6) / n), 0.3, 0.45, 1.3, 'darkStone', 0.12);
    };
    const y = H - 2;
    frieze(X1 - X0, (o, w, t, h, m, out) => {
      k.box(m, w, h, t, (X0 + X1) / 2 + o, y, Z1 + 0.05 + out); // south
      k.box(m, w, h, t, (X0 + X1) / 2 + o, y, Z0 - 0.05 - out); // north
    });
    frieze(Z1 - Z0, (o, w, t, h, m, out) => {
      k.box(m, t, h, w, X1 + 0.05 + out, y, (Z0 + Z1) / 2 + o); // east
      k.box(m, t, h, w, X0 - 0.05 - out, y, (Z0 + Z1) / 2 + o); // west
    });

    // corbel-arch passage through the south wing, with the window grid above
    const px = (x0 + x1) / 2;
    k.box('dark', 3.2, 2.2, 0.2, px, -0.6, Z1 + 0.06);
    for (let i = 0; i < 3; i++) k.box('dark', 2.4 - i * 0.7, 0.35, 0.2, px, 1.6 + i * 0.35, Z1 + 0.06);
    for (let r = 0; r < 2; r++)
      for (let c = -1; c <= 1; c++) k.box('window', 0.6, 0.6, 0.2, px + c * 1.6, H * 0.42 + 0.45 + r * 0.7, Z1 + 0.06);
    k.box('dark', 3, 2.6, 0.2, px, -0.6, z1 - 0.06);
    // doorways on the outer facades
    for (const t of [0.25, 0.75]) {
      k.box('window', 0.2, 2.3, 1.6, X1 + 0.06, -0.3, Z0 + (Z1 - Z0) * t);
      k.box('window', 0.2, 2.3, 1.6, X0 - 0.06, -0.3, Z0 + (Z1 - Z0) * t);
    }
    // porch at the south-west corner (restrooms)
    k.box('limestone', 5, 3.4, 5, X0 + 2.5, -0.6, Z1 + 2.5);
    k.box('paving', 5.6, 0.35, 5.6, X0 + 2.5, 2.8, Z1 + 2.5);
    k.box('window', 1.4, 2.2, 0.2, X0 + 2.5, -0.3, Z1 + 5.05);
    return { object: k.build() };
  },
});
