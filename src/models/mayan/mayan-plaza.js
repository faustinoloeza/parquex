import * as THREE from 'three';
import { extrudeProfile, extrudeWithHoles, trianglesGeometry } from '../../graphics/geometry.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const sq = (s) => [
  [-s / 2, -s / 2],
  [s / 2, -s / 2],
  [s / 2, s / 2],
  [-s / 2, s / 2],
];

/** Sides of a square frustum (half sizes a at y0 → b at y1), flat-shaded, facing out. */
function squareFrustum(a, b, y0, y1) {
  const tris = [];
  const rot = ([x, y, z], k) => {
    for (let i = 0; i < k; i++) [x, z] = [z, -x];
    return [x, y, z];
  };
  for (let k = 0; k < 4; k++) {
    const bl = rot([-a, y0, a], k),
      br = rot([a, y0, a], k),
      tr = rot([b, y1, b], k),
      tl = rot([-b, y1, b], k);
    tris.push([...bl, ...br, ...tr], [...bl, ...tr, ...tl]);
  }
  return trianglesGeometry(tris);
}

/**
 * Plaza principal: the arrival building of Xcaret, a square hall with a garden
 * courtyard built inside a stepped, grass-terraced pyramid. Its flat roof is
 * the top platform, reached by a grand stairway on the south face and a
 * narrower one on the north (official illustration + satellite imagery); the
 * pyramid faces are rubble-stone retaining walls (talud) with planted terraces.
 */
export default defineModel({
  type: 'mayanPlaza',
  label: 'Plaza principal (pirámide escalonada con patio)',
  params: {
    size: 58, // roof platform (the hall), m
    base: 76, // pyramid base, m
    tiers: 4,
    courtyard: 25.5,
    height: 7.5,
    stairs: [{ side: 's', width: 12 }],
    portals: [], // ground-level entrances: { side: 'e' | 'w', at } (at: offset along the side)
  },
  footprint: (p) => ({ rect: [p.base + 2, p.base + 2] }),
  // the corners of the square base reach beyond the circular `clear`
  clearPaths: (p) => {
    const h = p.base / 2 + 1;
    const at = (dx, dz) => [p.x + dx, p.z + dz];
    return [
      { pts: [at(-h, -h), at(h, h)], width: 12 },
      { pts: [at(h, -h), at(-h, h)], width: 12 },
    ];
  },
  build(p) {
    const k = new ModelKit();
    const S = p.size,
      B = p.base ?? S + 18,
      Co = p.courtyard ?? 25.5,
      top = p.height ?? 7.5,
      tiers = p.tiers ?? 4;
    const stairs = p.stairs ?? [{ side: 's', width: 12 }];

    // ---- stepped pyramid: rubble talud + planted terrace per tier, up to 1 m
    // below the roof (the hall's wall shows above the last terrace)
    const tierTop = top - 1;
    const th = tierTop / tiers;
    const step = (B - S) / 2 / tiers; // horizontal inset per tier
    const batter = Math.min(0.7, step * 0.3);
    for (let i = 0; i < tiers; i++) {
      const a = B / 2 - i * step,
        y0 = i * th - (i === 0 ? 0.4 : 0);
      k.add('limestone', squareFrustum(a, a - batter, y0, (i + 1) * th));
      // cornice where the wall meets the terrace
      k.add('darkStone', squareFrustum(a - batter + 0.12, a - batter + 0.12, (i + 1) * th - 0.22, (i + 1) * th));
      // terrace lawn: a ring around the hall (the courtyard stays open)
      k.add('lawn', extrudeWithHoles(sq(2 * (a - batter)), [sq(S - 0.2)], 0.08), 0, (i + 1) * th - 0.06, 0);
    }
    // shrubs along the terraces, avoiding the stairways
    const stairHalf = (side) => (stairs.find((st) => st.side === side)?.width ?? 0) / 2 + 2.5;
    const shrubs = [];
    for (let i = 0; i < tiers; i++) {
      const r = B / 2 - i * step - batter - step / 2 + batter / 2;
      const n = Math.round((2 * r) / 7);
      for (let j = 0; j <= n; j++) {
        const t = -r + (j * 2 * r) / n;
        for (const [x, z, side] of [
          [t, r, 's'],
          [t, -r, 'n'],
          [r, t, 'e'],
          [-r, t, 'w'],
        ]) {
          const along = side === 's' || side === 'n' ? x : z;
          if (Math.abs(along) < stairHalf(side) || (i + j) % 2) continue;
          const s = 0.9 + (((i * 7 + j * 13) % 5) / 5) * 0.6;
          const c = new THREE.IcosahedronGeometry(s, 0);
          c.scale(1, 0.7, 1);
          c.computeVertexNormals();
          c.translate(x, (i + 1) * th + s * 0.45, z);
          shrubs.push(c);
        }
      }
    }
    for (const c of shrubs) k.add('leaves', c, 0, 0, 0, 0, false);

    // ---- the hall: body with the courtyard, frieze, roof terrace and parapet
    k.add('limestone', extrudeWithHoles(sq(S), [sq(Co)], top + 0.5), 0, -0.5, 0);
    k.add('darkStone', extrudeWithHoles(sq(S + 0.3), [sq(S - 1)], 0.4), 0, top - 0.55, 0);
    k.add('darkStone', extrudeWithHoles(sq(Co + 1), [sq(Co - 0.3)], 0.5), 0, top * 0.62, 0);
    k.add('terrace', extrudeWithHoles(sq(S - 0.9), [sq(Co + 0.9)], 0.12), 0, top, 0);
    const gapAt = (side) => stairs.find((st) => st.side === side)?.width;
    const parapet = (len, off, axis, gap, h = 0.9, t = 0.45) => {
      const segs = gap
        ? [
            [-len / 2, -gap / 2],
            [gap / 2, len / 2],
          ]
        : [[-len / 2, len / 2]];
      for (const [a, b] of segs) {
        const l = b - a,
          c = (a + b) / 2;
        if (axis === 'x') k.box('limestone', l, h, t, c, top, off);
        else k.box('limestone', t, h, l, off, top, c);
      }
    };
    const e = S / 2 - 0.22;
    parapet(S, -e, 'x', gapAt('n'));
    parapet(S, e, 'x', gapAt('s'));
    parapet(S, -e, 'z');
    parapet(S, e, 'z');
    // stone wall with an iron railing all around the courtyard (no way down)
    const ci = Co / 2 + 0.22;
    const L = Co + 0.9;
    for (const [axis, off] of [
      ['x', -ci],
      ['x', ci],
      ['z', -ci],
      ['z', ci],
    ]) {
      parapet(L, off, axis, 0, 1.1, 0.55);
      const nPosts = Math.round(L / 1.6);
      for (let i = 0; i <= nPosts; i++) {
        const t = -L / 2 + (i / nPosts) * L;
        const [x, z] = axis === 'x' ? [t, off] : [off, t];
        k.box('iron', 0.09, 1.1, 0.09, x, top + 1.1, z);
      }
      for (const yy of [top + 1.55, top + 2.14]) {
        if (axis === 'x') k.box('iron', L, 0.07, 0.07, 0, yy, off);
        else k.box('iron', 0.07, 0.07, L, off, yy, 0);
      }
    }
    // skylights over the hall: a ring of blocks through the middle of the roof
    const band = (S + Co) / 4;
    const seen = new Set();
    for (let i = 0; i < 4; i++) {
      const t = -band + (i * 2 * band) / 3;
      for (const [x, z] of [
        [t, -band],
        [t, band],
        [-band, t],
        [band, t],
      ]) {
        const key = `${x.toFixed(1)}:${z.toFixed(1)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        k.box('limestone', 2.4, 0.8, 2.4, x, top, z);
        k.box('darkStone', 1.5, 0.15, 1.5, x, top + 0.8, z);
      }
    }

    // ---- stairways from the roof down the pyramid face to the ground, framed
    // by sloped side walls (alfardas)
    const stairway = (side, width) => {
      const dir = side === 'n' ? -1 : 1;
      const z0 = S / 2 - 0.2,
        run = (B - S) / 2 + 2.5,
        n = Math.max(6, Math.round(top / 0.32));
      const d = run / n;
      for (let i = 0; i < n; i++) {
        const h = top - (i * top) / n;
        k.box('limestone', width, h + 0.4, d + 0.02, 0, -0.4, dir * (z0 + (i + 0.5) * d));
      }
      for (const sx of [-1, 1]) {
        const zA = dir * z0,
          zB = dir * (z0 + run);
        const prof = [
          [zA, -0.4],
          [zB, -0.4],
          [zB, 0.6],
          [zA, top + 0.8],
        ];
        k.add('darkStone', extrudeProfile(prof, 0.9), sx * (width / 2 + 0.45), 0, 0, 0, true);
      }
    };
    for (const st of stairs) stairway(st.side, st.width);

    // ---- ground-level entrances into the hall (portal blocks on the talud)
    for (const { side, at = 0 } of p.portals ?? []) {
      const dir = side === 'w' ? -1 : 1;
      const x = dir * (B / 2 - 1.2);
      k.box('limestone', 3.4, 3.6, 9, x, -0.3, at);
      k.box('darkStone', 3.6, 0.35, 9.4, x, 3.3, at);
      k.box('dark', 0.1, 2.6, 5.4, x + dir * 1.71, 0, at);
    }

    // ---- courtyard garden seen from the roof: trees, hedges, a stone planter
    k.box('lawn', Co + 0.2, 0.3, Co + 0.2, 0, -0.25, 0);
    k.cyl('limestone', 2.4, 2.6, 0.6, 0, -0.2, 0, 20);
    k.cyl('lawn', 2.1, 2.1, 0.1, 0, 0.4, 0, 20);
    const crowns = [
      [-8.5, -8.5, 3.3],
      [8.5, -8.5, 3.1],
      [-8.5, 8.5, 3.2],
      [8.5, 8.5, 3.4],
      [0, -9.5, 2.4],
      [-9.5, 0, 2.4],
      [9.5, 0, 2.4],
      [0, 9.5, 2.4],
      [0, 0, 1.7],
    ];
    for (const [x, z, r] of crowns) {
      const h = r > 3 ? 4.6 : r > 2 ? 3.2 : 1.6;
      k.cyl('wood', 0.22, 0.32, h, x, 0, z, 6);
      const c = new THREE.IcosahedronGeometry(r, 1);
      c.scale(1, 0.85, 1);
      c.computeVertexNormals();
      c.translate(x, h + r * 0.55, z);
      k.add('leaves', c, 0, 0, 0, 0, false);
    }
    for (const sgn of [-1, 1]) {
      k.box('leaves', Co - 4, 0.9, 1, 0, -0.1, sgn * (Co / 2 - 0.9));
      k.box('leaves', 1, 0.9, Co - 4, sgn * (Co / 2 - 0.9), -0.1, 0);
    }

    return { object: k.build() };
  },
});
