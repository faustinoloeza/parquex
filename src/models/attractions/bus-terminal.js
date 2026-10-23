import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { TREE } from '#shared/formats/vegetation.js';
import { drapeQuad, hipRoof, m4 } from '../../graphics/geometry.js';
import { releaseAfterUpload } from '../../graphics/memory.js';
import { modelTreeGeometry } from '../parts/trees.js';
import { paintedBusGeometry, safariVanGeometry } from '../parts/shuttles.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

const VEHICLE_LENGTH = { van: 7, bus: 10.5 };

/** Round brown signs with white numbers 1…n, one cell per number. */
function numberAtlas(n) {
  const S = 128;
  const c = document.createElement('canvas');
  c.width = S * n;
  c.height = S;
  const g = c.getContext('2d');
  for (let i = 0; i < n; i++) {
    const cx = i * S + S / 2;
    g.fillStyle = '#6b3a1f';
    g.beginPath();
    g.arc(cx, S / 2, S / 2 - 2, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = '#f4efe6';
    g.lineWidth = 5;
    g.beginPath();
    g.arc(cx, S / 2, S / 2 - 12, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#f4efe6';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = '800 70px Montserrat, Arial, sans-serif';
    g.fillText(String(i + 1), cx, S / 2 + 4);
  }
  const tex = releaseAfterUpload(new THREE.CanvasTexture(c));
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Bus terminal of the park's own shuttles (Street View): a raised flagstone
 * sidewalk along the bays, a tall wooden post with a round numbered sign at
 * each bay, a thatched waiting shelter behind the sidewalk, and the shuttles
 * parked nose-in, plus the stone-paved walkway to the entrance plaza with
 * lamp posts on stone bases, stone litter bins and trees in round planters.
 * Shapes in absolute local meters (the landmark sits at x, z, no rotation):
 *   curb      [[x, z], [x, z]] front edge of the sidewalk, from bay 1 to the
 *             last bay; the sidewalk lies on its (-dz, dx) side
 *   vehicles  one per bay from bay 1: ['van'] or ['bus', bodyColor, [accents…]]
 *   shelter   { at: [x, z], length, width } aligned with the curb
 *   walk      [[x, z], …] walkway to the entrance (lamps, bins and planters)
 *   plaza     [[x, z] × 4] the lot in front of the bays (a quadrilateral),
 *             paved with grey concrete pavers that follow the terrain
 *   exit      { at: [x, z], facing: [x, z] } wooden «SALIDA / Exit» sign
 */
export default defineModel({
  type: 'busTerminal',
  label: 'Terminal de autobuses del parque',
  params: { curb: [], depth: 4.5, vehicles: [], shelter: null, walk: [], plaza: [], exit: null },
  clearPaths: (p) => {
    const [[ax, az], [bx, bz]] = p.curb;
    const len = Math.hypot(bx - ax, bz - az),
      dx = (bx - ax) / len,
      dz = (bz - az) / len;
    // a band over the vehicles and the sidewalk, centered between them
    const off = (p.depth - 11) / 2;
    return [
      {
        pts: [
          [ax - dz * off, az + dx * off],
          [bx - dz * off, bz + dx * off],
        ],
        width: p.depth + 13,
      },
      { pts: p.walk, width: 8 },
      // the paved lot: a band from the middle of one short side to the other
      ...(p.plaza.length === 4
        ? [
            {
              pts: [
                [(p.plaza[0][0] + p.plaza[3][0]) / 2, (p.plaza[0][1] + p.plaza[3][1]) / 2],
                [(p.plaza[1][0] + p.plaza[2][0]) / 2, (p.plaza[1][1] + p.plaza[2][1]) / 2],
              ],
              width: Math.hypot(p.plaza[3][0] - p.plaza[0][0], p.plaza[3][1] - p.plaza[0][1]) + 2,
            },
          ]
        : []),
      ...(p.shelter
        ? [
            {
              pts: [
                [p.shelter.at[0] - (dx * p.shelter.length) / 2, p.shelter.at[1] - (dz * p.shelter.length) / 2],
                [p.shelter.at[0] + (dx * p.shelter.length) / 2, p.shelter.at[1] + (dz * p.shelter.length) / 2],
              ],
              width: p.shelter.width + 3,
            },
          ]
        : []),
    ];
  },
  build(p, ctx) {
    const k = new ModelKit();
    const group = new THREE.Group();
    const L = ([x, z]) => [x - p.x, z - p.z];
    const base = ctx.heightAt(p.x, p.z);
    const hAt = (x, z) => ctx.heightAt(x + p.x, z + p.z) - base; // terrain, local

    // the lot: grey pavers draped over the terrain
    if (p.plaza.length === 4) k.add('pavers', drapeQuad(p.plaza.map(L), hAt), 0, 0, 0, 0, false);
    // «SALIDA / Exit» sign on two posts
    if (p.exit) {
      const [ex, ez] = L(p.exit.at);
      const [fx, fz] = L(p.exit.facing);
      const ry = Math.atan2(fx - ex, fz - ez);
      const ey = hAt(ex, ez);
      for (const s of [-0.45, 0.45])
        k.add('weatheredWood', new THREE.BoxGeometry(0.12, 2.3, 0.12).translate(s, 1.15, -0.06), ex, ey, ez, ry);
      k.add('weatheredWood', new THREE.BoxGeometry(1.25, 1.75, 0.08).translate(0, 1.55, 0), ex, ey, ez, ry);
      k.add('exitSign', new THREE.PlaneGeometry(1.15, 1.65).translate(0, 1.55, 0.045), ex, ey, ez, ry, false);
    }
    const [a, b] = p.curb.map(L);
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const d = [(b[0] - a[0]) / len, (b[1] - a[1]) / len],
      n = [-d[1], d[0]];
    const along = -Math.atan2(d[1], d[0]); // box x along the curb
    const at = (t, s) => [a[0] + d[0] * t + n[0] * s, a[1] + d[1] * t + n[1] * s];
    const boxAt = (m, w, h, dd, [x, z], y, ry = 0) => k.box(m, w, h, dd, x, y, z, ry);

    // raised sidewalk with a concrete curb
    boxAt('paving', len + 3, 0.35, p.depth, at(len / 2, p.depth / 2), -0.15, along);
    boxAt('concrete', len + 3, 0.4, 0.3, at(len / 2, 0.15), -0.15, along);

    // bays: numbered posts and the parked shuttles
    const bays = p.vehicles.length;
    const facing = Math.atan2(d[0], d[1]); // +z of a sign along the curb
    const signs = [];
    p.vehicles.forEach(([kind, body, accents], i) => {
      const t = ((i + 0.5) * len) / bays;
      const [px, pz] = at(t, 0.8);
      k.cyl('weatheredWood', 0.07, 0.09, 3.2, px, 0.2, pz, 8);
      const rim = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 20).rotateX(Math.PI / 2);
      k.add('weatheredWood', rim, px, 3.75, pz, facing, false);
      for (const side of [0, Math.PI]) {
        const disc = new THREE.CircleGeometry(0.36, 20);
        const uv = disc.getAttribute('uv');
        for (let j = 0; j < uv.count; j++) uv.setX(j, (i + uv.getX(j)) / bays);
        signs.push(disc.applyMatrix4(m4(px, 3.75, pz, facing + side).multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.035))));
      }
      const Lv = VEHICLE_LENGTH[kind];
      const geometry = kind === 'van' ? safariVanGeometry(i + 3) : paintedBusGeometry(body, accents, i + 7);
      const [vx, vz] = at(t, -(Lv / 2 + 0.7));
      k.add('vertex', geometry, vx, 0, vz, -Math.atan2(n[1], n[0]), false);
    });
    if (signs.length)
      group.add(new THREE.Mesh(mergeGeometries(signs), new THREE.MeshStandardMaterial({ map: numberAtlas(bays), roughness: 0.8 })));

    // thatched waiting shelter with benches
    if (p.shelter) {
      const [sx, sz] = L(p.shelter.at);
      const { length: sl, width: sw } = p.shelter;
      const local = (u, v) => [sx + d[0] * u + n[0] * v, sz + d[1] * u + n[1] * v];
      k.box('paving', sl + 1, 0.3, sw + 1, sx, -0.1, sz, along);
      for (const u of [-sl / 2 + 0.3, 0, sl / 2 - 0.3])
        for (const v of [-sw / 2 + 0.3, sw / 2 - 0.3]) {
          const [x, z] = local(u, v);
          k.cyl('wood', 0.13, 0.15, 2.6, x, 0.2, z, 8);
        }
      k.addTransformed('thatch', hipRoof(sl, sw, 2, 0.8), m4(sx, 2.8, sz, along));
      for (const v of [-sw / 4, sw / 4]) boxAt('wood', sl - 1.5, 0.45, 0.45, local(0, v), 0.2, along);
    }

    // walkway furniture: lamps on the lot side, bins and planters on the other
    const walk = p.walk.map(L);
    let next = 4,
      dist = 0,
      count = 0;
    for (let i = 1; i < walk.length; i++) {
      const [x0, z0] = walk[i - 1],
        [x1, z1] = walk[i];
      const sl = Math.hypot(x1 - x0, z1 - z0),
        wx = (x1 - x0) / sl,
        wz = (z1 - z0) / sl;
      while (next <= dist + sl) {
        const f = next - dist;
        const cx = x0 + wx * f,
          cz = z0 + wz * f;
        const [rx, rz] = [cx - wz * 2.6, cz + wx * 2.6], // right of the walking direction
          [lx, lz] = [cx + wz * 3.4, cz - wx * 3.4];
        k.box('limestone', 0.9, 0.9, 0.9, rx, -0.2, rz);
        k.cyl('iron', 0.07, 0.1, 3.4, rx, 0.7, rz, 8);
        k.cyl('lamp', 0.2, 0.14, 0.5, rx, 4.1, rz, 8);
        k.cyl('iron', 0.24, 0.24, 0.08, rx, 4.6, rz, 8);
        if (count % 2) {
          k.box('limestone', 1.2, 0.9, 0.55, lx, -0.1, lz, -Math.atan2(wz, wx));
          k.box('dark', 0.35, 0.2, 0.57, lx - wx * 0.25, 0.55, lz - wz * 0.25, -Math.atan2(wz, wx));
          k.box('dark', 0.35, 0.2, 0.57, lx + wx * 0.25, 0.55, lz + wz * 0.25, -Math.atan2(wz, wx));
        } else {
          k.cyl('stone', 1.1, 1.15, 0.25, lx, -0.1, lz, 16);
          k.addTransformed('vertex', modelTreeGeometry(TREE.BROAD_LIGHT), m4(lx, 0.1, lz, count, 0.55, 0.7, 0.55));
        }
        count++;
        next += 13;
      }
      dist += sl;
    }
    group.add(k.build({ exitSign: exitSignMaterial() }));
    return { object: group };
  },
});

let exitMaterial;

/** Brown board with «SALIDA / Exit ←» and «↑ TLACHCO / DELPHINUS» in pale letters (Street View, 2012). */
function exitSignMaterial() {
  if (exitMaterial) return exitMaterial;
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 384;
  const g = c.getContext('2d');
  g.fillStyle = '#5b3d26';
  g.fillRect(0, 0, 256, 384);
  g.strokeStyle = '#3c2716';
  g.lineWidth = 8;
  g.strokeRect(6, 6, 244, 372);
  g.fillStyle = '#efe6d2';
  g.textAlign = 'center';
  g.font = '800 54px Montserrat, Arial, sans-serif';
  g.fillText('SALIDA', 128, 78);
  g.font = '600 48px Montserrat, Arial, sans-serif';
  g.fillText('← Exit', 128, 150);
  g.fillRect(28, 186, 200, 4);
  g.font = '700 30px Montserrat, Arial, sans-serif';
  g.fillText('↑ TLACHCO', 128, 250);
  g.fillText('DELPHINUS', 128, 300);
  const tex = releaseAfterUpload(new THREE.CanvasTexture(c));
  tex.colorSpace = THREE.SRGBColorSpace;
  exitMaterial = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.85 });
  return exitMaterial;
}
