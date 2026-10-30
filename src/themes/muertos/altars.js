import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { nonIndexed, solidColor } from '../../graphics/geometry.js';

// Día de Muertos altars (decorations.js), after the festival's own altars at
// Xcaret: each style is built in its local frame — front towards +z (the
// path), base at y = 0, about 5 m wide — and returns one merged geometry
// (vertex colors) plus where its candles and string lights are.

export const PINK = '#e4007c',
  MARIGOLD = '#ff8f00',
  PURPLE = '#7b2cbf',
  GREEN = '#00a651',
  TURQUOISE = '#00a8cc',
  YELLOW = '#ffc400';
/** Papel picado colors. */
export const PAPEL = [PINK, MARIGOLD, PURPLE, GREEN, TURQUOISE, YELLOW];
/** Glass candle jars. */
export const JARS = ['#ff4d6d', '#ff8fab', '#c77dff', '#ffb703', '#fb8500', '#4cc9f0', '#80ed99', '#fff1d0'];
/** Marigold blossoms. */
export const BLOSSOMS = ['#ff9800', '#ffa726', '#ff8f00', '#ffb300', '#f57c00', '#ffca28'];
/** Stripes of a sarape. */
const SARAPE = ['#d62828', '#f77f00', '#fcbf49', '#2a9d8f', '#264653', '#e63946', '#8338ec', '#06d6a0', '#ff006e', '#3a86ff'];
const BONE = '#f4f1ea',
  WOOD = '#6b4a2f',
  WHITE = '#f7f4ee',
  WAX = '#fff3d6',
  DARK = '#1d1424';

/** Copy painted `hex`, non-indexed and without UVs, ready to merge. */
export function part(g, hex) {
  const out = solidColor(nonIndexed(g), hex);
  out.deleteAttribute('uv');
  return out;
}
const box = (w, h, d, x, y, z, hex) => part(new THREE.BoxGeometry(w, h, d).translate(x, y, z), hex);
const ball = (r, x, y, z, hex) => part(new THREE.IcosahedronGeometry(r, 0).translate(x, y, z), hex);
/** Upright cylinder standing on y. */
const rod = (r, h, x, y, z, hex, sides = 6) => part(new THREE.CylinderGeometry(r, r, h, sides).translate(x, y + h / 2, z), hex);
/** Flat rectangle facing +z. */
const sheet = (w, h, x, y, z, hex) => part(new THREE.PlaneGeometry(w, h).translate(x, y, z), hex);
const pick = (rnd, list) => list[Math.floor(rnd() * list.length)];

/** A row of marigold blossoms from x0 to x1 at (y, z). */
function marigolds(out, rnd, x0, x1, y, z, r = 0.075, colors = BLOSSOMS) {
  const n = Math.max(1, Math.round((x1 - x0) / (r * 2.1)));
  for (let k = 0; k <= n; k++) out.parts.push(ball(r, x0 + ((x1 - x0) * k) / n, y, z, pick(rnd, colors)));
}

/**
 * A sugar skull standing at (x, y, z), `r` m in radius, facing +z: white head
 * and jaw, dark eye sockets and nose; `crown`: flowers of the festival colors
 * on top and a base (the giant ones).
 */
export function calaverita(x, y, z, r, crown = false) {
  const parts = [];
  const lift = crown ? r * 0.9 : 0;
  if (crown) parts.push(part(new THREE.CylinderGeometry(r * 0.8, r * 0.95, lift, 8).translate(x, y + lift / 2, z), '#4a3426'));
  const cy = y + lift + r;
  parts.push(part(new THREE.SphereGeometry(r, 10, 8).scale(1, 1.05, 0.95).translate(x, cy, z), '#fbf7ef'));
  parts.push(box(r * 1.1, r * 0.45, r * 0.8, x, cy - r * 0.85, z + r * 0.12, '#fbf7ef'));
  for (const s of [-1, 1])
    parts.push(part(new THREE.SphereGeometry(r * 0.27, 8, 6).translate(x + s * r * 0.36, cy + r * 0.05, z + r * 0.78), DARK));
  parts.push(part(new THREE.ConeGeometry(r * 0.12, r * 0.22, 3).rotateX(Math.PI).translate(x, cy - r * 0.3, z + r * 0.9), DARK));
  if (crown)
    for (let k = 0; k < 7; k++) {
      const a = Math.PI * (0.15 + (0.7 * k) / 6);
      parts.push(ball(r * 0.2, x + r * 0.85 * Math.cos(a), cy + r * 0.75 * Math.sin(a) + r * 0.15, z + r * 0.3, PAPEL[k % PAPEL.length]));
    }
  return parts;
}

/**
 * A standing skeleton `h` m tall at (x, z) facing +z, with a black sombrero, a
 * red pirate bandana or bare-headed (`hat`: 'sombrero' | 'bandana' | 'none').
 */
function skeleton(x, z, { h = 1.75, hat = 'sombrero' } = {}) {
  const s = h / 1.75;
  const g = [];
  g.push(part(new THREE.SphereGeometry(0.12, 8, 6).scale(1, 1.1, 1).translate(0, 1.6, 0), BONE));
  for (const e of [-1, 1]) g.push(part(new THREE.SphereGeometry(0.035, 6, 4).translate(e * 0.045, 1.62, 0.1), DARK));
  g.push(box(0.05, 0.55, 0.05, 0, 1.2, -0.02, BONE)); // spine
  for (let k = 0; k < 4; k++) g.push(box(0.3 - k * 0.03, 0.03, 0.16, 0, 1.38 - k * 0.09, 0.02, BONE)); // ribs
  g.push(box(0.26, 0.1, 0.12, 0, 0.92, 0, BONE)); // pelvis
  for (const e of [-1, 1]) {
    g.push(part(new THREE.CylinderGeometry(0.03, 0.025, 0.88, 5).translate(e * 0.08, 0.45, 0), BONE)); // legs
    g.push(part(new THREE.CylinderGeometry(0.025, 0.02, 0.62, 5).rotateZ(e * 0.18).translate(e * 0.22, 1.12, 0.02), BONE)); // arms
  }
  if (hat === 'sombrero') {
    g.push(part(new THREE.CylinderGeometry(0.34, 0.34, 0.03, 12).translate(0, 1.73, 0), '#1d1d1d'));
    g.push(part(new THREE.CylinderGeometry(0.08, 0.13, 0.2, 10).translate(0, 1.84, 0), '#1d1d1d'));
    g.push(part(new THREE.CylinderGeometry(0.14, 0.14, 0.035, 10).translate(0, 1.76, 0), '#d62828'));
  } else if (hat === 'bandana')
    g.push(part(new THREE.SphereGeometry(0.128, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2).translate(0, 1.64, 0), '#c1121f'));
  return g.map((p) => p.scale(s, s, s).translate(x, 0, z));
}

/** Corn or sugar cane stalks standing at (x, z). */
function stalks(out, rnd, x, z, { n = 3, h = 2.4, color = '#7cb342' } = {}) {
  for (let k = 0; k < n; k++) {
    const sx = x + (rnd() - 0.5) * 0.35,
      sz = z + (rnd() - 0.5) * 0.35,
      sh = h * (0.85 + rnd() * 0.3);
    out.parts.push(rod(0.03, sh, sx, 0, sz, color, 5));
    for (let l = 0; l < 3; l++)
      out.parts.push(
        part(
          new THREE.ConeGeometry(0.06, 0.7, 3)
            .rotateZ((l % 2 ? 1 : -1) * 0.9)
            .translate(sx + (l % 2 ? 0.25 : -0.25), sh * (0.45 + l * 0.17), sz),
          '#558b2f',
        ),
      );
  }
}

/** Petal carpet from z0 to z1 (x from -w/2 to w/2), with jar candles along both edges every `gap` m. */
function carpet(out, rnd, { w, z0, z1, gap = 0.45, jars = JARS, color = MARIGOLD }) {
  out.parts.push(box(w, 0.025, z1 - z0, 0, 0.013, (z0 + z1) / 2, color));
  for (let z = z0 + 0.2; z <= z1; z += gap) for (const s of [-1, 1]) out.candles.push([s * (w / 2 + 0.22), 0, z, pick(rnd, jars)]);
}

// ---------------------------------------------------------------- styles

/** Three tiers draped in festival colors, a marigold arch and a petal carpet with a cross (optionally a giant calavera). */
function tiers(rnd, { skull = false } = {}) {
  const out = { parts: [], candles: [], bulbs: [] };
  const cloth = [PURPLE, PINK, MARIGOLD];
  out.parts.push(box(4, 0.14, 2.6, 0, 0.07, 0, '#3b2a20'));
  // petal carpet in front, as far as the path, with a cross of petals near the altar
  out.parts.push(box(1.1, 0.03, 2, 0, 0.02, 2.3, MARIGOLD));
  out.parts.push(box(2, 0.035, 0.45, 0, 0.03, 1.85, '#ff6d00'));
  for (let k = 0; k < 4; k++) out.candles.push([-0.75, 0.03, 1.5 + k * 0.6, WAX], [0.75, 0.03, 1.5 + k * 0.6, WAX]);
  let y = 0.14;
  [
    [3.4, 2.1, 0.62],
    [2.6, 1.55, 0.58],
    [1.8, 1.0, 0.55],
  ].forEach(([w, d, h], t) => {
    const z0 = -0.5 + (2.1 - d) / 2; // tiers step back
    out.parts.push(box(w, h, d, 0, y + h / 2, z0, cloth[t]));
    // white table cloth on top and pennants hanging over the front
    out.parts.push(box(w + 0.04, 0.04, d + 0.04, 0, y + h, z0, '#f7f1e6'));
    const front = z0 + d / 2 + 0.03;
    const n = Math.round(w / 0.3);
    for (let k = 0; k < n; k++)
      out.parts.push(sheet(w / n - 0.04, 0.24, -w / 2 + (k + 0.5) * (w / n), y + h - 0.14, front, PAPEL[(k + t) % PAPEL.length]));
    marigolds(out, rnd, -w / 2 + 0.08, w / 2 - 0.08, y + h + 0.06, front - 0.05);
    const top = y + h + 0.04;
    for (let x = -w / 2 + 0.25; x <= w / 2 - 0.2; x += 0.38) out.candles.push([x, top, z0 + d / 2 - 0.18, WAX]);
    for (let k = 0; k < 3; k++) out.parts.push(...calaverita(-w / 3 + (k * w) / 3, top, z0 - d / 6, 0.11));
    y += h;
  });
  for (let k = 0; k <= 22; k++) {
    const a = (k / 22) * Math.PI;
    out.parts.push(ball(0.16, 1.9 * Math.cos(a), 0.14 + 3.2 * Math.sin(a), -0.75, pick(rnd, BLOSSOMS)));
  }
  if (skull) out.parts.push(...calaverita(2.9, 0.14, 0.6, 0.85, true));
  return out;
}

/**
 * A table on a backdrop of sarape stripes with fans, offerings, photos and a
 * skeleton in a sombrero; in front, a path of sarapes between lines of
 * marigold petals and white luminarias.
 */
function sarape(rnd) {
  const out = { parts: [], candles: [], bulbs: [] };
  // backdrop: wooden frame, ten striped panels, a purple banner and two fans
  out.parts.push(box(4.5, 0.09, 0.12, 0, 2.72, -1.1, WOOD));
  for (const s of [-1, 1]) out.parts.push(box(0.1, 2.8, 0.1, s * 2.25, 1.4, -1.1, WOOD));
  for (let i = 0; i < 10; i++)
    for (let b = 0; b < 4; b++)
      out.parts.push(box(0.4, 0.6, 0.04, -2.04 + i * 0.453, 0.36 + b * 0.62, -1.06, SARAPE[(i * 3 + b) % SARAPE.length]));
  out.parts.push(box(3.2, 0.42, 0.06, 0, 2.98, -1.02, '#4a1a6b'));
  for (const s of [-1, 1])
    for (let k = 0; k < 5; k++)
      out.parts.push(
        part(
          new THREE.CircleGeometry(0.45, 2, (k * Math.PI) / 5, Math.PI / 5).translate(s * 1.75, 2.1, -1.0),
          SARAPE[(k * 2 + (s > 0)) % SARAPE.length],
        ),
      );
  // table: white cloth, three sarape runners over the front
  out.parts.push(box(3.4, 0.82, 1.1, 0, 0.41, -0.25, WHITE));
  for (let r = 0; r < 3; r++)
    for (let b = 0; b < 5; b++)
      out.parts.push(box(0.42, 0.15, 0.02, -1.1 + r * 1.1, 0.72 - b * 0.15, 0.31, SARAPE[(r * 4 + b) % SARAPE.length]));
  // offerings: photos at the back, bread and fruit, calaveritas, flower vases, candles
  for (const x of [-0.9, 0, 0.9])
    out.parts.push(box(0.36, 0.46, 0.04, x, 1.07, -0.7, '#3a2a20'), box(0.28, 0.36, 0.02, x, 1.07, -0.67, '#c9b79c'));
  for (let k = 0; k < 9; k++)
    out.parts.push(ball(0.07, -1.4 + k * 0.35, 0.89, -0.15 + (k % 2) * 0.18, pick(rnd, ['#e0a050', '#f57c00', '#ffd54f', '#8d5524'])));
  for (const x of [-0.45, 0.45]) out.parts.push(...calaverita(x, 0.82, -0.35, 0.08));
  for (const x of [-1.45, 1.45]) {
    out.parts.push(rod(0.1, 0.25, x, 0.82, -0.5, '#b5651d'));
    for (let k = 0; k < 6; k++)
      out.parts.push(
        ball(
          0.07,
          x + (rnd() - 0.5) * 0.25,
          1.12 + rnd() * 0.12,
          -0.5 + (rnd() - 0.5) * 0.2,
          pick(rnd, [PINK, YELLOW, '#ffffff', '#e57373']),
        ),
      );
  }
  for (let x = -1.5; x <= 1.5; x += 0.5) out.candles.push([x, 0.82, 0.18, WAX]);
  out.parts.push(...skeleton(-2.05, -0.35));
  // path of sarapes, petal lines and white paper luminarias
  for (let k = 0; k < 8; k++) out.parts.push(box(0.9, 0.02, 0.4, 0, 0.012, 0.75 + k * 0.42, SARAPE[(k * 3) % SARAPE.length]));
  for (const s of [-1, 1]) {
    out.parts.push(box(0.24, 0.025, 3.6, s * 0.95, 0.013, 2.2, MARIGOLD));
    for (let z = 0.6; z <= 4; z += 0.48) {
      out.parts.push(box(0.12, 0.16, 0.12, s * 1.3, 0.08, z, '#fbfaf5'));
      out.candles.push([s * 1.3, 0.1, z, WAX]);
    }
  }
  for (let k = 0; k < 4; k++) out.parts.push(ball(0.11, 0, 0.08, 1.2 + k * 0.85, k % 2 ? YELLOW : '#f06292'));
  return out;
}

/**
 * White shelves edged with marigolds and magenta cockscomb, papel picado on
 * the back and colored jar candles, under a wooden pergola with big papel
 * picado flags and string lights; sugar cane at the sides and a petal carpet
 * lined with jars, with a cross of jars by the altar.
 */
function shelves(rnd) {
  const out = { parts: [], candles: [], bulbs: [] };
  // pergola
  for (const [x, z] of [
    [-2.3, -1.45],
    [2.3, -1.45],
    [-2.3, 1.25],
    [2.3, 1.25],
  ])
    out.parts.push(rod(0.06, 2.95, x, 0, z, WOOD, 5));
  for (const z of [-1.45, 1.25]) out.parts.push(box(4.75, 0.11, 0.11, 0, 2.95, z, WOOD));
  for (const x of [-2.3, 2.3]) out.parts.push(box(0.11, 0.11, 2.8, x, 2.95, -0.1, WOOD));
  [PINK, MARIGOLD, PURPLE, PINK].forEach((c, k) => out.parts.push(sheet(0.95, 0.8, -1.65 + k * 1.1, 2.45, 1.24, c)));
  for (let x = -2.2; x <= 2.21; x += 0.4) out.bulbs.push([x, 2.86, 1.3]);
  marigolds(out, rnd, -2.3, 2.3, 3.04, 1.25, 0.09);
  // shelves: back, sides, three planks with marigold and cockscomb edges, jars, fruit
  out.parts.push(box(3.0, 1.95, 0.08, 0, 0.98, -1.15, WHITE));
  for (const s of [-1, 1]) out.parts.push(box(0.07, 1.95, 0.55, s * 1.5, 0.98, -0.9, WHITE));
  [-1.05, -0.35, 0.35, 1.05].forEach((x, k) => out.parts.push(sheet(0.6, 0.42, x, 1.55, -1.1, PAPEL[(k * 2) % PAPEL.length])));
  [0.62, 1.27, 1.92].forEach((y, k) => {
    out.parts.push(box(3.0, 0.06, 0.55, 0, y, -0.9, WHITE));
    marigolds(out, rnd, -1.45, 1.45, y + 0.02, -0.6, 0.06);
    marigolds(out, rnd, -1.45, 1.45, y - 0.09, -0.61, 0.05, ['#c2185b', '#d81b60', '#ad1457']);
    if (k < 2)
      for (let x = -1.3; x <= 1.31; x += 0.32) {
        out.candles.push([x, y + 0.04, -0.82, pick(rnd, JARS)]);
        out.parts.push(ball(0.06, x + 0.16, y + 0.08, -1.0, pick(rnd, ['#f57c00', '#ffd54f', '#8bc34a'])));
      }
  });
  for (const x of [-1.1, 1.1]) {
    out.parts.push(rod(0.11, 0.22, x, 1.95, -0.95, '#c97b4a'));
    for (let k = 0; k < 5; k++) out.parts.push(ball(0.08, x + (rnd() - 0.5) * 0.22, 2.25 + rnd() * 0.1, -0.95, '#9c4dcc'));
  }
  for (const s of [-1, 1]) stalks(out, rnd, s * 1.95, -1.0, { n: 4, h: 2.6 });
  // marigold bed at the foot and the carpet
  marigolds(out, rnd, -1.5, 1.5, 0.15, -0.45, 0.13);
  carpet(out, rnd, { w: 1.2, z0: -0.2, z1: 3.6 });
  for (const [x, z] of [
    [0, 0.5],
    [0, 0.85],
    [0, 1.2],
    [-0.3, 0.75],
    [0.3, 0.75],
  ])
    out.candles.push([x, 0.03, z, pick(rnd, ['#6a1b9a', '#880e4f', '#ff6d00'])]);
  return out;
}

/**
 * A round tiered altar like a cake (purple and white, candles and marigolds
 * on every tier, a little chapel on top) under a dark canopy with a sagging
 * marigold garland and orange papel picado; a white cloth with a cross of
 * candles in front and pots of marigolds around.
 */
function cake(rnd) {
  const out = { parts: [], candles: [], bulbs: [] };
  for (const [x, z] of [
    [-2.4, -1.7],
    [2.4, -1.7],
    [-2.4, 1.7],
    [2.4, 1.7],
  ])
    out.parts.push(rod(0.06, 3.05, x, 0, z, '#2b2b2b', 5));
  out.parts.push(box(5.0, 0.06, 3.6, 0, 3.05, 0, '#1f2240'));
  for (let k = 0; k <= 24; k++) {
    const t = k / 24;
    out.parts.push(ball(0.11, -2.4 + 4.8 * t, 2.95 - 0.45 * 4 * t * (1 - t), 1.75, pick(rnd, BLOSSOMS)));
  }
  for (let k = 0; k < 7; k++) out.parts.push(sheet(0.5, 0.55, -1.8 + k * 0.6, 2.62, 1.68, k % 2 ? MARIGOLD : '#ff6d00'));
  let y = 0;
  const cz = -0.45;
  [
    [1.7, 0.45, '#e8e2f4'],
    [1.45, 0.5, '#6a4c9c'],
    [1.15, 0.45, '#efe9ff'],
    [0.85, 0.45, '#6a4c9c'],
    [0.55, 0.4, '#efe9ff'],
  ].forEach(([r, h, c], t) => {
    out.parts.push(part(new THREE.CylinderGeometry(r, r, h, 20).translate(0, y + h / 2, cz), c));
    y += h;
    if (t === 0) return;
    // candles and flowers round the front of each tier's top
    for (let a = -1.25; a <= 1.25; a += 0.42 / r) {
      out.candles.push([Math.sin(a) * (r - 0.12), y, cz + Math.cos(a) * (r - 0.12), WAX]);
      out.parts.push(
        ball(
          0.07,
          Math.sin(a + 0.2 / r) * (r - 0.08),
          y + 0.05,
          cz + Math.cos(a + 0.2 / r) * (r - 0.08),
          pick(rnd, [MARIGOLD, '#e53935', YELLOW]),
        ),
      );
    }
  });
  out.parts.push(box(0.3, 0.5, 0.3, 0, y + 0.25, cz, WHITE));
  out.parts.push(part(new THREE.ConeGeometry(0.26, 0.4, 4).rotateY(Math.PI / 4).translate(0, y + 0.7, cz), '#7b5bb8'));
  // white cloth with a cross of candles, pots of marigolds and baskets of fruit around
  out.parts.push(box(1.7, 0.02, 1.9, 0, 0.012, 1.95, WHITE));
  for (let k = 0; k < 6; k++) out.candles.push([0, 0.03, 1.2 + k * 0.28, WAX]);
  for (const x of [-0.56, -0.28, 0.28, 0.56]) out.candles.push([x, 0.03, 1.48, WAX]);
  for (let a = -2.3; a <= 2.3; a += 0.38) {
    const x = Math.sin(a) * 2.15,
      z = cz + Math.cos(a) * 2.15;
    if (a > -0.6 && a < 0.6) continue;
    if (Math.round(a / 0.38) % 3 === 0) {
      out.parts.push(rod(0.18, 0.18, x, 0, z, '#6a1b9a'));
      for (let k = 0; k < 3; k++) out.parts.push(ball(0.08, x + (k - 1) * 0.1, 0.24, z, pick(rnd, ['#f57c00', '#ffd54f', '#c62828'])));
    } else
      for (let k = 0; k < 3; k++)
        out.parts.push(ball(0.15, x + (rnd() - 0.5) * 0.25, 0.18 + rnd() * 0.12, z + (rnd() - 0.5) * 0.25, pick(rnd, BLOSSOMS)));
  }
  return out;
}

/**
 * A silver stepped pyramid with calaveras, a skeleton and white candles on
 * its steps and the colored X on its face; a pirate skeleton beside it, corn
 * stalks, pumpkins and a big flower medallion with marigolds in front.
 */
function pyramid(rnd) {
  const out = { parts: [], candles: [], bulbs: [] };
  let y = 0;
  const steps = 5;
  for (let k = 0; k < steps; k++) {
    const w = 3.0 - k * 0.48,
      d = 2.2 - k * 0.3,
      h = 0.42;
    const z = -0.7 - k * 0.12;
    out.parts.push(box(w, h, d, 0, y + h / 2, z, k % 2 ? '#9aa1aa' : '#b4bac2'));
    y += h;
    const front = z + d / 2 - 0.12;
    for (const x of [-w / 2 + 0.2, w / 2 - 0.2]) out.candles.push([x, y, front, WAX]);
    if (k < steps - 1) out.parts.push(...calaverita(k % 2 ? -w / 4 : w / 4, y, front - 0.15, 0.1));
    if (k === 2) out.parts.push(...skeleton(0, front - 0.2, { h: 0.6, hat: 'none' }));
  }
  // the colored X on the face of the steps
  const xc = { y: 0.95, z: 0.42 };
  [
    [Math.PI / 4, [PINK, GREEN]],
    [-Math.PI / 4, [YELLOW, TURQUOISE]],
  ].forEach(([a, [c0, c1]]) => {
    for (const [s, c] of [
      [-1, c0],
      [1, c1],
    ])
      out.parts.push(
        part(
          new THREE.BoxGeometry(0.85, 0.24, 0.07)
            .translate(s * 0.42, 0, 0)
            .rotateZ(a)
            .translate(0, xc.y, xc.z),
          c,
        ),
      );
  });
  out.parts.push(...skeleton(2.0, 0.2, { hat: 'bandana' }));
  for (const s of [-1, 1]) stalks(out, rnd, s * 2.0, -1.2, { n: 3, h: 2.2, color: '#c0b05a' });
  for (const [x, z, r] of [
    [-1.7, 1.3, 0.22],
    [-1.35, 1.7, 0.16],
    [-2.0, 1.75, 0.18],
  ])
    out.parts.push(part(new THREE.SphereGeometry(r, 10, 6).scale(1, 0.75, 1).translate(x, r * 0.7, z), '#ef6c00'));
  // flower medallion: dark green petals around a colored heart, marigolds on top
  const mz = 1.9;
  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * Math.PI * 2;
    out.parts.push(
      part(new THREE.ConeGeometry(0.22, 0.75, 4).rotateZ(-a).translate(Math.sin(a) * 0.55, 0.9 + Math.cos(a) * 0.55, mz), '#1b5e20'),
    );
  }
  out.parts.push(box(0.75, 0.62, 0.35, 0, 0.87, mz, '#26a69a'), box(0.55, 0.2, 0.37, 0, 0.87, mz, PINK));
  marigolds(out, rnd, -0.4, 0.4, 1.25, mz, 0.09);
  for (const [x, z] of [
    [-1.2, 0.9],
    [-0.9, 1.1],
    [1.1, 1.0],
    [0.8, 1.25],
    [-1.4, 0.4],
  ])
    out.candles.push([x, 0, z, WAX]);
  return out;
}

/** Altar styles by name. */
export const ALTAR_STYLES = { tiers, sarape, shelves, cake, pyramid };

/**
 * An altar of a style: merged geometry (vertex colors), candles [x, y, z,
 * color] and string lights [x, y, z], all in its local frame.
 * @param {keyof typeof ALTAR_STYLES} style
 * @param {() => number} rnd
 * @param {object} [options]  style options (tiers: { skull })
 * @returns {{ geometry: THREE.BufferGeometry, candles: Array<[number, number, number, string]>, bulbs: number[][] }}
 */
export function altarGeometry(style, rnd, options) {
  const { parts, candles, bulbs } = ALTAR_STYLES[style](rnd, options);
  return { geometry: mergeGeometries(parts), candles, bulbs };
}
