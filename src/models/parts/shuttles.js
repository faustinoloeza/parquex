import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { mulberry32 } from '#shared/random.js';
import { solidColor, nonIndexed } from '../../graphics/geometry.js';

// The park's own shuttles (Street View of the bus terminal by the entrance):
// Xplor safari vans (dark camouflage, thatched roof) and painted "chicken
// buses" in bright colors with a roof rack loaded with crates. One vertex-colored
// geometry each, long axis on +x with the front at +x, wheels on y = 0.

const DARK = '#1d2329',
  TIRE = '#15171a',
  RACK = '#2b2b2b';

function box(parts, hex, w, h, d, x, y, z) {
  parts.push(solidColor(nonIndexed(new THREE.BoxGeometry(w, h, d).translate(x, y + h / 2, z)), hex));
}

function wheel(parts, x, z, r = 0.45) {
  const g = new THREE.CylinderGeometry(r, r, 0.28, 10).rotateX(Math.PI / 2).translate(x, r, z);
  parts.push(solidColor(nonIndexed(g), TIRE));
}

/** Spare tire on the rear face (x = rear). */
function spare(parts, rear, y, r = 0.42) {
  const g = new THREE.CylinderGeometry(r, r, 0.22, 12).rotateZ(Math.PI / 2).translate(rear - 0.11, y, 0);
  parts.push(solidColor(nonIndexed(g), TIRE));
  const hub = new THREE.CylinderGeometry(r * 0.45, r * 0.45, 0.24, 10).rotateZ(Math.PI / 2).translate(rear - 0.12, y, 0);
  parts.push(solidColor(nonIndexed(hub), '#c9c3b5'));
}

/** Roof rack over [x0, x1] at height y with a load of crates. */
function rack(parts, x0, x1, y, W, crates, rnd) {
  for (const z of [-W / 2 + 0.1, W / 2 - 0.1]) box(parts, RACK, x1 - x0, 0.08, 0.08, (x0 + x1) / 2, y + 0.3, z);
  for (let x = x0; x <= x1 + 1e-6; x += (x1 - x0) / 3) box(parts, RACK, 0.08, 0.38, W - 0.1, x, y, 0);
  let x = x0 + 0.2;
  while (x < x1 - 0.5) {
    const w = 0.5 + rnd() * 0.6,
      h = 0.3 + rnd() * 0.35;
    box(parts, crates[Math.floor(rnd() * crates.length)], w, h, W - 0.5 - rnd() * 0.4, x + w / 2, y + 0.08, (rnd() - 0.5) * 0.2);
    x += w + 0.08;
  }
}

/**
 * Xplor safari van (Street View, 2012): dark body with pale camouflage
 * strokes, the orange XPLOR logo on the sides, big off-road wheels and a
 * spare on the back, and a thatched gable roof on posts over the cabin with
 * a row of lights at its front.
 */
export function safariVanGeometry(seed = 1) {
  const rnd = mulberry32(seed);
  const parts = [];
  const L = 7,
    W = 2.1,
    body = '#2c2a26';
  box(parts, body, L - 0.9, 1.95, W, -0.45, 0.45, 0); // cargo body
  box(parts, body, 0.9, 1.0, W - 0.1, L / 2 - 0.45, 0.45, 0); // hood
  box(parts, DARK, 0.6, 0.9, W - 0.2, L / 2 - 1.05, 1.45, 0); // windshield
  for (const s of [-1, 1]) {
    box(parts, DARK, L - 2.4, 0.7, 0.04, -0.6, 1.55, s * (W / 2 + 0.01)); // windows
    // camouflage: pale grass-like strokes rising from the sills
    for (let x = -L / 2 + 0.2; x < L / 2 - 1.2; x += 0.11) {
      const h = 0.4 + rnd() * 0.9;
      box(parts, rnd() < 0.75 ? '#e4e3d6' : '#9a9a88', 0.05, h, 0.03, x, 0.5, s * (W / 2 + 0.02));
    }
    box(parts, '#e8622a', 1.1, 0.42, 0.04, 0.6, 0.95, s * (W / 2 + 0.04)); // XPLOR logo
  }
  box(parts, '#f2a23a', 0.06, 0.25, 1.2, L / 2 + 0.01, 0.75, 0); // front plate and lights band
  box(parts, DARK, 0.2, 0.3, W, L / 2 - 0.05, 0.3, 0); // bumper
  for (const x of [-L / 2 + 1.2, L / 2 - 1.3]) for (const s of [-1, 1]) wheel(parts, x, s * (W / 2 - 0.15), 0.48);
  spare(parts, -L / 2 + 0.45, 1.25, 0.5);
  // thatched gable roof on four posts, a row of lights at its front
  const x0 = -L / 2 + 0.3,
    x1 = L / 2 - 1.3;
  for (const x of [x0 + 0.1, x1 - 0.1]) for (const s of [-1, 1]) box(parts, '#5a4632', 0.08, 0.35, 0.08, x, 2.4, s * (W / 2 - 0.1));
  const thatch = ['#7a5a38', '#8a6a44', '#6e5032'];
  for (const s of [-1, 1]) {
    const slope = new THREE.BoxGeometry(x1 - x0 + 0.5, 0.12, W / 2 + 0.35).rotateX(s * 0.42);
    parts.push(solidColor(nonIndexed(slope.translate((x0 + x1) / 2, 2.95, s * (W / 4 + 0.1))), thatch[(seed + (s > 0 ? 1 : 0)) % 3]));
  }
  for (let i = 0; i < 5; i++) {
    const g = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 8).rotateZ(Math.PI / 2).translate(x1 + 0.28, 2.85, -0.7 + i * 0.35);
    parts.push(solidColor(nonIndexed(g), '#efe9d6'));
  }
  return mergeGeometries(parts);
}

/**
 * Painted bus ("camión pintado"): flat-fronted bus in a bright body color,
 * patches of other colors along the sides, white roof, crates on a rack.
 */
export function paintedBusGeometry(body, accents, seed = 1) {
  const rnd = mulberry32(seed);
  const parts = [];
  const L = 10.5,
    W = 2.5;
  box(parts, body, L, 2.35, W, 0, 0.5, 0);
  box(parts, '#f4f1ea', L - 0.2, 0.25, W - 0.1, 0, 2.85, 0); // roof
  box(parts, DARK, 0.05, 1.0, W - 0.4, L / 2 + 0.01, 1.7, 0); // windshield
  box(parts, DARK, 0.05, 0.7, W - 0.6, -L / 2 - 0.01, 1.9, 0); // rear window
  for (const s of [-1, 1]) {
    box(parts, DARK, L - 1.8, 0.75, 0.04, -0.3, 1.85, s * (W / 2 + 0.01)); // windows
    // painted patches below the windows
    for (let x = -L / 2 + 0.6; x < L / 2 - 0.8;) {
      const w = 0.6 + rnd() * 1.1,
        h = 0.3 + rnd() * 0.7;
      box(parts, accents[Math.floor(rnd() * accents.length)], w, h, 0.03, x + w / 2, 0.65 + rnd() * (1.1 - h), s * (W / 2 + 0.02));
      x += w + 0.15 + rnd() * 0.4;
    }
  }
  box(parts, '#fff6c8', 0.06, 0.2, 0.4, L / 2 + 0.02, 0.85, W / 2 - 0.35); // headlights
  box(parts, '#fff6c8', 0.06, 0.2, 0.4, L / 2 + 0.02, 0.85, -W / 2 + 0.35);
  box(parts, DARK, 0.25, 0.3, W + 0.1, L / 2, 0.35, 0); // bumpers
  box(parts, DARK, 0.25, 0.3, W + 0.1, -L / 2, 0.35, 0);
  for (const x of [-L / 2 + 2, L / 2 - 2]) for (const s of [-1, 1]) wheel(parts, x, s * (W / 2 - 0.15), 0.5);
  spare(parts, -L / 2 - 0.12, 1.25, 0.45);
  rack(parts, -L / 2 + 0.4, L / 2 - 0.8, 3.1, W, [...accents, '#7a5434'], rnd);
  return mergeGeometries(parts);
}
