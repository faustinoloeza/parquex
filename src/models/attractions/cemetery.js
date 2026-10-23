import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { minstd } from '#shared/random.js';
import { TREE } from '#shared/formats/vegetation.js';
import { m4, nonIndexed, solidColor, worldUV } from '../../graphics/geometry.js';
import { modelTreeGeometry } from '../parts/trees.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

// Painted tombs (mexican cemetery): bright pastel chapels, niches and graves.
const PAINT = ['#f29ac4', '#e85d9b', '#6fa8e8', '#3b7dd8', '#4fd1c5', '#2fb5a6', '#f6d55c', '#a77bdc', '#c9a2ef', '#f5f3ee', '#f08a7c'];
const TRIM = ['#ffffff', '#f5f3ee', '#f6d55c', '#3b7dd8'];

/** Copy with every vertex painted `hex` (non-indexed, ready to merge). */
const painted = (g, hex) => solidColor(nonIndexed(g), hex);

/** Small cross (two bars) standing on y = 0. */
function cross(h = 0.6, t = 0.08) {
  const v = new THREE.BoxGeometry(t, h, t).translate(0, h / 2, 0);
  const b = new THREE.BoxGeometry(h * 0.6, t, t).translate(0, h * 0.68, 0);
  return mergeGeometries([nonIndexed(v), nonIndexed(b)]);
}

/** Triangular prism (gable roof) of base w × depth d and height h, base at y = 0, ridge along z. */
function gable(w, h, d) {
  const r = w / Math.sqrt(3);
  const g = new THREE.CylinderGeometry(r, r, d, 3, 1);
  g.rotateX(-Math.PI / 2); // apex up, base at y = -r / 2
  g.scale(1, h / (1.5 * r), 1);
  g.translate(0, (h / (1.5 * r)) * (r / 2), 0);
  return g;
}

/**
 * One tomb in its local frame (front towards +z, base at y = 0) as a list of
 * [geometry, color] parts.
 */
function tomb(rnd) {
  const body = PAINT[Math.floor(rnd() * PAINT.length)];
  const trim = TRIM[Math.floor(rnd() * TRIM.length)];
  const parts = [];
  const kind = rnd();
  if (kind < 0.36) {
    // little chapel with a gabled roof and a cross on the front
    const w = 0.85,
      h = 0.9 + rnd() * 0.6,
      d = 1.0;
    parts.push([new THREE.BoxGeometry(w, h, d).translate(0, h / 2, 0), body]);
    parts.push([gable(w + 0.12, 0.45, d + 0.1).translate(0, h, 0), trim]);
    if (rnd() < 0.6) parts.push([cross(0.5).translate(0, h + 0.3, d / 2 - 0.05), trim]);
  } else if (kind < 0.58) {
    // domed chapel
    const w = 0.9,
      h = 0.8 + rnd() * 0.5;
    parts.push([new THREE.BoxGeometry(w, h, w).translate(0, h / 2, 0), body]);
    parts.push([new THREE.SphereGeometry(w * 0.48, 6, 3, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, h, 0), trim]);
    if (rnd() < 0.5) parts.push([cross(0.45).translate(0, h + w * 0.42, 0), trim]);
  } else if (kind < 0.8) {
    // grave: low painted slab with a headstone and a cross
    parts.push([new THREE.BoxGeometry(0.8, 0.35, 1.25).translate(0, 0.175, 0.1), body]);
    parts.push([new THREE.BoxGeometry(0.8, 0.85, 0.16).translate(0, 0.425, -0.5), trim]);
    parts.push([cross(0.55).translate(0, 0.85, -0.5), rnd() < 0.5 ? '#ffffff' : body]);
  } else {
    // niche tower with a pointed cap
    const h = 1.5 + rnd() * 0.7;
    parts.push([new THREE.BoxGeometry(0.7, h, 0.7).translate(0, h / 2, 0), body]);
    parts.push([new THREE.ConeGeometry(0.52, 0.55, 4, 1).rotateY(Math.PI / 4).translate(0, h + 0.27, 0), trim]);
    parts.push([new THREE.BoxGeometry(0.4, 0.5, 0.04).translate(0, h * 0.55, 0.36), '#2b3a55']); // niche opening
  }
  return parts;
}

// Ceiba (Ceiba pentandra), the sacred tree of the Maya: tall smooth pale grey
// trunk with buttress roots, a few branches near the top and a wide flat crown.
function ceibaGeometry(height, rnd) {
  const parts = [];
  const bark = '#d6d2c8';
  const roots = new THREE.CylinderGeometry(0.45, 1.25, 1.6, 6, 1, true).translate(0, 0.8, 0);
  parts.push(painted(roots, '#aaa497'));
  parts.push(painted(new THREE.CylinderGeometry(0.3, 0.45, height, 6, 1, true).translate(0, height / 2, 0), bark));
  const crownY = height + 1.2;
  const up = new THREE.Vector3(0, 1, 0);
  const spread = [];
  for (let b = 0; b < 4; b++) {
    const a = (b / 4) * Math.PI * 2 + rnd() * 0.8;
    const reach = 2.6 + rnd() * 1.4;
    const from = new THREE.Vector3(0, height * (0.82 + rnd() * 0.08), 0);
    const to = new THREE.Vector3(Math.cos(a) * reach, crownY - 0.4, Math.sin(a) * reach);
    const dir = to.clone().sub(from);
    const len = dir.length();
    const g = new THREE.CylinderGeometry(0.12, 0.22, len, 5, 1, true).translate(0, len / 2, 0);
    g.applyMatrix4(
      new THREE.Matrix4().compose(from, new THREE.Quaternion().setFromUnitVectors(up, dir.normalize()), new THREE.Vector3(1, 1, 1)),
    );
    parts.push(painted(g, bark));
    spread.push([Math.cos(a) * reach, Math.sin(a) * reach]);
  }
  // wide, flat crown: flattened blobs over the branch tips, shaded like a soft dome
  const blobs = [[0, 0, 3.1], ...spread.map(([x, z]) => [x * 1.15, z * 1.15, 2.0 + rnd() * 0.7])];
  const dark = new THREE.Color('#2f5e1f'),
    light = new THREE.Color('#9ccf5c');
  for (const [x, z, r] of blobs) {
    const g = nonIndexed(new THREE.IcosahedronGeometry(r, 1));
    g.scale(1, 0.38, 1);
    g.translate(x, crownY + rnd() * 0.6, z);
    const pos = g.getAttribute('position'),
      nrm = g.getAttribute('normal');
    const color = new Float32Array(pos.count * 3);
    const v = new THREE.Vector3(),
      c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      v.set(pos.getX(i), (pos.getY(i) - crownY) * 2.2, pos.getZ(i)).normalize();
      nrm.setXYZ(i, v.x, v.y, v.z);
      const t = THREE.MathUtils.clamp((pos.getY(i) - crownY + 1.6) / 3, 0, 1);
      c.copy(dark).lerp(light, t * t * 0.85 + 0.1);
      color.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(color, 3));
    parts.push(g);
  }
  return mergeGeometries(parts.map((g) => (g.deleteAttribute('uv'), g)));
}

/**
 * Cementerio Mexicano (Xcaret): a round hill of concentric terraces, each one
 * a rubble-stone wall with a whitewashed curb, a flagstone walkway and a row of
 * painted tombs. A spiral of white stairs climbs to the summit, where a group
 * of tall ceibas shades the big cross; palms and shrubs between the tombs.
 * Tombs, trees and stairs are vertex-painted (`vertex`), plus `limestone`,
 * `paving` and `white`: all shared materials, merged with the other models.
 */
export default defineModel({
  type: 'cemetery',
  label: 'Cementerio en colina',
  params: { radius: 18, levels: 7, top: 6.5 },
  footprint: (p) => ({ circle: p.radius + 0.5 }),
  build(p) {
    const k = new ModelKit();
    const rnd = minstd(7);
    const n = p.levels,
      step = 1.15;
    const radius = (l) => p.radius - (l * (p.radius - p.top)) / (n - 1); // wall of level l
    const topY = (l) => (l + 1) * step; // walkway height of level l (ground = 0)
    const stairAngle = (l) => Math.PI / 2 + l * 0.62; // spiral, starting at the south (+z) entrance
    const add = (g, hex, matrix) => k.addTransformed('vertex', painted(g, hex), matrix);
    const curbGap = 1.9;

    for (let l = 0; l < n; l++) {
      const r = radius(l),
        y = topY(l);
      const segs = Math.max(24, Math.round(r * 3));
      // rubble wall
      k.add('limestone', new THREE.CylinderGeometry(r, r + 0.15, y + 1, segs, 1, true).translate(0, (y + 1) / 2 - 1, 0));
      // flagstone walkway (ring up to the next wall, disc at the summit)
      const floor = l < n - 1 ? new THREE.RingGeometry(radius(l + 1) - 0.1, r, segs, 1) : new THREE.CircleGeometry(r, segs);
      k.add('paving', floor.rotateX(-Math.PI / 2).translate(0, y, 0));
      // whitewashed curb, open where the stairs arrive
      const gap = curbGap / r;
      const phi = Math.PI / 2 - stairAngle(l);
      const curb = new THREE.LatheGeometry(
        [
          new THREE.Vector2(r + 0.02, y - 0.02),
          new THREE.Vector2(r + 0.02, y + 0.32),
          new THREE.Vector2(r - 0.22, y + 0.32),
          new THREE.Vector2(r - 0.22, y),
        ],
        segs,
        phi + gap / 2,
        Math.PI * 2 - gap,
      );
      const flat = curb.toNonIndexed();
      flat.computeVertexNormals();
      k.add('white', flat);

      // white stairs climbing the wall of this level from the walkway below
      const a = stairAngle(l),
        rise = step / 4,
        tread = 0.34;
      for (let s = 0; s < 4; s++) {
        const h = (s + 1) * rise + 0.05;
        const rr = r + 4 * tread - (s + 0.5) * tread;
        const g = new THREE.BoxGeometry(1.5, h, tread).translate(0, h / 2, 0);
        add(g, s % 2 ? '#f7f4ec' : '#ece6d8', m4(Math.cos(a) * rr, topY(l - 1) - 0.05, Math.sin(a) * rr, Math.PI / 2 - a));
      }
    }

    // tombs, shrubs and palms along each terrace, against the inner wall
    const bush = modelTreeGeometry(TREE.BUSH);
    const palm = modelTreeGeometry(TREE.PALM);
    const plant = (geometry, s, x, y, z, ry) => k.addTransformed('vertex', geometry.clone(), m4(x, y, z, ry, s, s, s));
    let palms = 0;
    for (let l = 0; l < n - 1; l++) {
      const tr = radius(l + 1) + 0.62,
        y = topY(l);
      const count = Math.floor((Math.PI * 2 * tr) / 1.22);
      const stair = stairAngle(l + 1);
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + l * 0.37;
        let da = Math.abs(((a - stair + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        if (da * tr < 1.6) continue; // the next flight of stairs
        da = Math.abs(((a - stairAngle(l) + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
        const x = Math.cos(a) * tr,
          z = Math.sin(a) * tr;
        const roll = rnd();
        if (roll < 0.1) {
          plant(bush, 0.32 + rnd() * 0.15, x, y, z, rnd() * 6);
          continue;
        }
        if (roll < 0.125 && palms < 7 && da * tr > 3) {
          palms++;
          plant(palm, 0.55 + rnd() * 0.15, x, y, z, rnd() * 6);
          continue;
        }
        const T = m4(x, y - 0.02, z, Math.PI / 2 - a);
        for (const [g, hex] of tomb(rnd)) add(g, hex, T);
      }
    }

    // summit: the big cross on a white base among the ceibas
    const yTop = topY(n - 1);
    k.box('white', 1.6, 0.5, 1.6, 0, yTop, 0);
    k.box('white', 0.45, 5, 0.45, 0, yTop + 0.5, 0);
    k.box('white', 2.3, 0.45, 0.45, 0, yTop + 3.9, 0);
    const ceibaSpots = [
      [3.4, 0.5, yTop, 12.5],
      [3.6, 2.6, yTop, 14],
      [3.2, 4.5, yTop, 11.5],
      [radius(n - 2) - 0.4, 1.6, topY(n - 2), 13],
      [radius(n - 3) - 0.5, 5.6, topY(n - 3), 12],
    ];
    for (const [r, a, y, h] of ceibaSpots)
      k.addTransformed('vertex', ceibaGeometry(h, rnd), m4(Math.cos(a) * r, y, Math.sin(a) * r, rnd() * 6));
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 1.2,
        r = 2.2 + rnd() * 1.6;
      plant(bush, 0.4 + rnd() * 0.15, Math.cos(a) * r, yTop, Math.sin(a) * r, rnd() * 6);
    }

    // entrance at the foot of the stairs (activity 46): two scalloped arches
    // one behind the other, the front one on tapered pillars (visitors' photos)
    const a0 = stairAngle(0),
      rg = p.radius + 4.5;
    const at = (x, z, scale) => m4(Math.cos(a0) * rg, 0, Math.sin(a0) * rg, Math.PI / 2 - a0).multiply(m4(x, 0, z, 0, scale, scale, scale));
    scallopedGate(k, at(0, 0, 1), { cross: '#6f6a62' });
    scallopedGate(k, at(0, -2.6, 0.68), { cross: '#f7f4ec', pillarWidth: 1.1 });
    return { object: k.build() };
  },
});

/** Half of the scalloped (mixtilinear) arch, from the springing to the apex: intrados and extrados [x, y]. */
const ARCH_IN = [
  [2.2, 5.6],
  [2.25, 6.6],
  [1.9, 7.35],
  [1.5, 7.45],
  [1.4, 8.0],
  [0.9, 8.6],
  [0.4, 9.15],
  [0, 9.6],
];
const ARCH_OUT = [
  [3.3, 5.6],
  [3.25, 6.5],
  [3.1, 7.5],
  [2.6, 8.35],
  [2.2, 8.45],
  [2.0, 9.05],
  [1.3, 9.85],
  [0.6, 10.45],
  [0, 10.85],
];
const BRICK = '#9a4b37';

/**
 * Colonial gate of the cemetery in a frame `G` (front +z, base at y = 0):
 * tapered rubble pillars with brick cornices and stone finials, a scalloped
 * arch of pale flagstone edged with brick, small brick pinnacles at its steps
 * and a cross on a brick pedestal at the apex.
 */
function scallopedGate(k, G, { cross: crossColor, pillarWidth = 2.6 }) {
  const D = 1.0; // depth of the arch band
  const put = (material, g) => k.addTransformed(material, material === 'vertex' ? g : worldUV(g, 0.25), G.clone());
  const paint = (g, hex) => put('vertex', solidColor(nonIndexed(g), hex));
  const mirror = (half) => [
    ...half.map(([x, y]) => [-x, y]),
    ...half
      .slice(0, -1)
      .reverse()
      .map(([x, y]) => [x, y]),
  ];
  const band = (outer, inner, depth) => {
    const pts = [...mirror(outer), ...mirror(inner).reverse()];
    const shape = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
    return new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }).translate(0, 0, -depth / 2);
  };
  // pillars: tapered rubble, brick cornice, stone finial on the outer corner
  for (const s of [-1, 1]) {
    const x = s * (2.2 + pillarWidth / 2);
    const pillar = new THREE.CylinderGeometry(pillarWidth * 0.62, pillarWidth * 0.72, 5.1, 4, 1).rotateY(Math.PI / 4).scale(1, 1, 0.75);
    put('limestone', pillar.translate(x, 2.55, 0));
    paint(new THREE.BoxGeometry(pillarWidth + 0.4, 0.9, 1.6).translate(x, 5.55, 0), BRICK);
    paint(new THREE.BoxGeometry(pillarWidth + 0.6, 0.15, 1.75).translate(x, 5.05, 0), '#7f3c2c');
    paint(new THREE.SphereGeometry(0.42, 8, 6).scale(1, 1.4, 1).translate(x + s * (pillarWidth / 2 - 0.1), 6.6, 0), '#8e8a82');
    paint(new THREE.BoxGeometry(0.5, 0.5, 0.5).translate(x + s * (pillarWidth / 2 - 0.1), 6.2, 0), '#ece6d8');
  }
  // the arch: pale band, brick edging along its top, pinnacles at the steps
  put('limestone', band(ARCH_OUT, ARCH_IN, D));
  const edge = ARCH_OUT.map(([x, y], i) => {
    const [nx, ny] =
      i === ARCH_OUT.length - 1
        ? [0, 1]
        : [x - ARCH_IN[Math.min(i, ARCH_IN.length - 1)][0], y - ARCH_IN[Math.min(i, ARCH_IN.length - 1)][1]];
    const l = Math.hypot(nx, ny) || 1;
    return [x + (nx / l) * 0.22, y + (ny / l) * 0.22];
  });
  paint(band(edge, ARCH_OUT, D + 0.12), BRICK);
  for (const [x, y] of [ARCH_OUT[4], [-ARCH_OUT[4][0], ARCH_OUT[4][1]]])
    paint(new THREE.BoxGeometry(0.55, 0.6, 0.7).translate(x, y + 0.2, 0), BRICK);
  paint(new THREE.BoxGeometry(0.8, 0.55, 0.8).translate(0, ARCH_OUT.at(-1)[1] + 0.2, 0), BRICK);
  paint(cross(1.6, 0.26).translate(0, ARCH_OUT.at(-1)[1] + 0.45, 0), crossColor);
}
