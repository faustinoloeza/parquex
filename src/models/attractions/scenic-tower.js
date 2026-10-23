import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { solidColor } from '../../graphics/geometry.js';
import { materials, std } from '../../graphics/materials.js';
import { canvasTexture } from '../../graphics/textures.js';
import { markShared } from '../../graphics/memory.js';
import { mulberry32 } from '#shared/random.js';
import { createFlagCloth, flagPiece } from '../parts/flag.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Cabin: sides, outer radius (m), and its colors (visitors' photo, 2026). */
const SIDES = 12,
  R = 6.6;
const BLUE = '#2f80d4',
  SHAFT = '#b1cfae';
/** The cabin hangs this far below the point update() moves (the app's towerCabin driver), so it rests on the ground. */
const CABIN_DROP = 4.4;
/** Base: the cabin's island, the ring of water around it and the outer curb (radii, m). */
const ISLAND = 7.2,
  POND = 10.2;

/** Head on top of the shaft: neck and cup heights (m), cup rims; striped mast above it. */
const NECK = 2.6,
  CUP = 4.2,
  CUP_BOTTOM = 2.4,
  CUP_TOP = 3.8,
  MAST = 26;

/**
 * Torre Escénica (visitors' photos, 2026): pale sage-green shaft whose top
 * stretch is painted white with dark-red lily petals; a twelve-sided cup at
 * the top, white with blue petal tips, red beacons on its rim; a tall mast
 * striped orange and white with an orange housing that flies the flag from
 * its side; and the twelve-sided blue panoramic cabin with a band of windows,
 * its underside painted navy with a big cream lily (red stripes and spots).
 * Base station colors unconfirmed.
 */
export default defineModel({
  type: 'scenicTower',
  label: 'Torre Escénica',
  params: { height: 80 },
  footprint: () => ({ circle: POND + 0.5 }),
  build(p) {
    const H = p.height;
    const k = new ModelKit();
    // base: the cabin rests on a round island inside a ring of water, reached
    // by a wooden footbridge from the path (south) through a boarding gate
    k.cyl('paving', ISLAND, ISLAND, 1.1, 0, -0.6, 0, 32);
    k.add('pool', new THREE.RingGeometry(ISLAND, POND, 40, 1).rotateX(-Math.PI / 2), 0, -0.05, 0, 0, false);
    k.cyl('stone', POND - 0.2, POND - 0.2, 0.8, 0, -0.9, 0, 40); // floor of the ring
    k.add('white', new THREE.CylinderGeometry(POND + 0.45, POND + 0.45, 0.45, 40, 1, true).translate(0, 0.12, 0), 0, 0, 0);
    k.add('white', new THREE.RingGeometry(POND, POND + 0.45, 40, 1).rotateX(-Math.PI / 2), 0, 0.345, 0, 0, false);
    k.add('white', new THREE.CylinderGeometry(ISLAND + 0.3, ISLAND + 0.3, 0.65, 40, 1, true).translate(0, 0.1, 0), 0, 0, 0);
    footbridge(k);
    // shaft: sage green, its top stretch painted with petals (textured, own mesh below)
    const painted = 14;
    k.add('plastic', solidColor(new THREE.CylinderGeometry(1.5, 1.8, H - painted, 16).translate(0, (H - painted) / 2, 0), SHAFT), 0, 0, 0);
    // beacons on the cup's rim, mast in orange and white bands, orange flag housing
    const top = H + NECK + CUP;
    k.cyl('white', CUP_TOP - 0.3, CUP_TOP, 0.25, 0, top, 0, SIDES);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.4;
      k.add(
        'plastic',
        solidColor(new THREE.SphereGeometry(0.22, 8, 6), '#e03a2c'),
        Math.cos(a) * (CUP_TOP - 0.6),
        top + 0.45,
        Math.sin(a) * (CUP_TOP - 0.6),
      );
    }
    const bands = 8,
      band = (MAST * 0.72) / bands;
    for (let i = 0; i < bands; i++) {
      const hex = i % 2 ? '#f4f1ea' : '#e2662c';
      k.add('plastic', solidColor(new THREE.CylinderGeometry(0.32, 0.36, band, 10).translate(0, band / 2, 0), hex), 0, top + i * band, 0);
    }
    const housing = top + MAST * 0.72;
    k.add(
      'plastic',
      solidColor(new THREE.CylinderGeometry(0.5, 0.5, MAST * 0.22, 10).translate(0, (MAST * 0.22) / 2, 0), '#c8662a'),
      0,
      housing,
      0,
    );
    k.cyl('steel', 0.04, 0.06, MAST * 0.12, 0, housing + MAST * 0.22, 0, 4);
    const group = new THREE.Group();
    group.add(k.build());

    // painted parts: upper shaft, neck and cup (one textured mesh)
    const head = mergeAll([
      petalBand(new THREE.CylinderGeometry(1.5, 1.5, painted, 16, 1, true).translate(0, H - painted / 2, 0), 8, 8),
      petalBand(new THREE.CylinderGeometry(1.7, 1.5, NECK, SIDES, 1, true).translate(0, H + NECK / 2, 0), SIDES),
      petalBand(new THREE.CylinderGeometry(CUP_TOP, CUP_BOTTOM, CUP, SIDES, 1, false).translate(0, H + NECK + CUP / 2, 0), SIDES),
    ]);
    const painting = new THREE.Mesh(head, petalMaterial());
    painting.castShadow = painting.receiveShadow = true;
    group.add(painting);

    // Mexican flag flying from the side of the housing
    const cloth = createFlagCloth(6.5);
    cloth.mesh.position.set(0.5, housing + MAST * 0.21, 0);
    group.add(cloth.mesh);

    // rotating panoramic cabin: painted underside, blue body, window band, blue roof
    const cabin = new THREE.Group();
    const shell = new THREE.Group();
    shell.position.y = -CABIN_DROP;
    cabin.add(shell);
    // (the mobile export merges the cabin's meshes: same attributes for all, non-indexed)
    const piece = (g, material, hex = '#ffffff') => new THREE.Mesh(solidColor(g.toNonIndexed(), hex), material);
    const under = piece(lilyCone(), lilyMaterial());
    const body = piece(new THREE.CylinderGeometry(R, R, 0.9, SIDES).translate(0, 1.45, 0), materials().plastic, BLUE);
    const ring = piece(new THREE.CylinderGeometry(R - 0.15, R - 0.15, 1.6, SIDES, 1, true).translate(0, 2.7, 0), materials().glass);
    const roof = piece(new THREE.CylinderGeometry(R - 0.6, R + 0.1, 0.5, SIDES).translate(0, 3.75, 0), materials().plastic, BLUE);
    // window frames at the corners and along the band
    const frames = [];
    for (let i = 0; i < SIDES; i++) {
      const a = (i / SIDES) * Math.PI * 2;
      frames.push(new THREE.BoxGeometry(0.22, 1.6, 0.22).translate(Math.cos(a) * (R - 0.1), 2.7, Math.sin(a) * (R - 0.1)));
    }
    frames.push(new THREE.CylinderGeometry(R, R, 0.12, SIDES, 1, true).translate(0, 2.9, 0));
    const frame = piece(mergeAll(frames), materials().plastic, '#f2f4f6');
    for (const m of [under, body, ring, roof, frame]) {
      m.castShadow = true;
      shell.add(m);
    }
    group.add(cabin);
    return {
      object: group,
      update(t) {
        const phase = 0.5 - 0.5 * Math.cos((t / 70) * Math.PI * 2);
        cabin.position.y = 5 + phase * (H - 18); // the shell hangs CABIN_DROP lower: on the island at rest
        cabin.rotation.y = t * 0.12;
        cloth.update(t);
      },
      animation: [{ name: 'cabin', driver: 'towerCabin', params: { height: H }, size: 13.2, parts: [cabin] }, flagPiece(cloth)],
    };
  },
});

/**
 * Wooden footbridge over the ring of water (south, +z) with rustic railings
 * of posts and crossed braces, and a boarding gate of posts and a beam
 * decorated with ship's wheels at the island end (visitor's photo).
 */
function footbridge(k) {
  const W = 2.4,
    z0 = ISLAND - 0.4,
    z1 = POND + 1.6,
    y = 0.45;
  k.box('weatheredWood', W, 0.18, z1 - z0, 0, y - 0.18, (z0 + z1) / 2);
  const n = 4;
  for (const s of [-1, 1]) {
    const x = s * (W / 2 - 0.08);
    for (let i = 0; i <= n; i++) k.cyl('weatheredWood', 0.07, 0.08, 1.1, x, y, z0 + ((z1 - z0) * i) / n, 6);
    k.rod('weatheredWood', [x, y + 1.05, z0], [x, y + 1.05, z1], 0.06, 6);
    for (let i = 0; i < n; i++) {
      const za = z0 + ((z1 - z0) * i) / n,
        zb = z0 + ((z1 - z0) * (i + 1)) / n;
      k.rod('weatheredWood', [x, y + 0.1, za], [x, y + 0.95, zb], 0.045, 5);
      k.rod('weatheredWood', [x, y + 0.95, za], [x, y + 0.1, zb], 0.045, 5);
    }
  }
  // boarding gate on the island
  for (const s of [-1, 1]) k.cyl('wood', 0.13, 0.13, 3.0, s * 1.3, y, z0 - 0.3, 8);
  k.box('wood', 3.2, 0.25, 0.25, 0, y + 2.75, z0 - 0.3);
  for (const s of [-1, 1]) {
    const wheel = new THREE.TorusGeometry(0.35, 0.05, 4, 12);
    k.add('wood', wheel, s * 0.8, y + 2.35, z0 - 0.15, 0, false);
  }
}

/** Underside of the cabin: a twelve-sided cone from the collar round the shaft to the rim, UVs seen from below. */
function lilyCone() {
  const g = new THREE.CylinderGeometry(R, 2.3, 1.0, SIDES, 2, true).translate(0, 0.5, 0);
  const pos = g.getAttribute('position'),
    uv = g.getAttribute('uv');
  for (let i = 0; i < pos.count; i++) uv.setXY(i, 0.5 + pos.getX(i) / (2 * R), 0.5 + pos.getZ(i) / (2 * R));
  return g;
}

let lily;

/** Navy underside with a cream lily: six big petals and six small ones, red midribs and spots. */
function lilyMaterial() {
  if (lily) return lily;
  const rnd = mulberry32(41);
  const map = canvasTexture(
    'towerLily',
    512,
    (g, s) => {
      const c = s / 2;
      g.fillStyle = '#15294b';
      g.fillRect(0, 0, s, s);
      const petal = (a, r0, r1, w) => {
        const p = (r, side) => [c + Math.cos(a + side) * r, c + Math.sin(a + side) * r];
        g.beginPath();
        g.moveTo(...p(r0, 0));
        g.quadraticCurveTo(...p((r0 + r1) * 0.55, w), ...p(r1, 0));
        g.quadraticCurveTo(...p((r0 + r1) * 0.55, -w), ...p(r0, 0));
        g.fillStyle = '#ece0c4';
        g.fill();
        g.lineWidth = 7;
        g.strokeStyle = '#0b0f1a';
        g.stroke();
        g.beginPath();
        g.moveTo(...p(r0, 0));
        g.lineTo(...p(r1 * 0.92, 0));
        g.lineWidth = 6;
        g.strokeStyle = '#a3303a';
        g.stroke();
        g.fillStyle = '#7d2833';
        for (let i = 0; i < 14; i++) {
          const [x, y] = p(r0 + (r1 - r0) * (0.15 + rnd() * 0.55), (rnd() - 0.5) * w * 0.9);
          g.beginPath();
          g.ellipse(x, y, 3 + rnd() * 3, 2 + rnd() * 2, rnd() * 3, 0, Math.PI * 2);
          g.fill();
        }
      };
      for (let i = 0; i < 6; i++) petal((i / 6) * Math.PI * 2 + Math.PI / 6, c * 0.36, c * 0.8, 0.33);
      for (let i = 0; i < 6; i++) petal((i / 6) * Math.PI * 2, c * 0.36, c * 0.98, 0.42);
    },
    false,
  );
  lily = markShared(std(0xffffff, { map, roughness: 0.6 }));
  return lily;
}

/** Cylinder side with the petal texture `around` times round it and `rows` times up its height. */
function petalBand(g, around, rows = 1) {
  const pos = g.getAttribute('position'),
    uv = g.getAttribute('uv');
  let y0 = Infinity,
    y1 = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    y0 = Math.min(y0, pos.getY(i));
    y1 = Math.max(y1, pos.getY(i));
  }
  for (let i = 0; i < pos.count; i++) {
    // flat caps (the cup's top and bottom) take a plain white spot of the texture
    const cap = Math.abs(g.getAttribute('normal').getY(i)) > 0.9;
    uv.setXY(i, cap ? 0.02 : uv.getX(i) * around, cap ? 0.02 : ((pos.getY(i) - y0) / (y1 - y0)) * rows);
  }
  return g.toNonIndexed();
}

let petals;

/** White with tall petals (one per repeat): dark blue tips at the top, dark-red midrib and spots. */
function petalMaterial() {
  if (petals) return petals;
  const rnd = mulberry32(43);
  const map = canvasTexture('towerPetals', 128, (g, s) => {
    g.fillStyle = '#f6f4ef';
    g.fillRect(0, 0, s, s);
    // canvas y runs down: v = 1 (top of the band) is row 0
    g.beginPath();
    g.moveTo(s * 0.5, s * 0.98);
    g.quadraticCurveTo(s * 0.05, s * 0.45, s * 0.5, s * 0.02);
    g.quadraticCurveTo(s * 0.95, s * 0.45, s * 0.5, s * 0.98);
    g.lineWidth = 4;
    g.strokeStyle = '#1c2f5a';
    g.stroke();
    g.fillStyle = '#4f86c8';
    g.beginPath();
    g.moveTo(s * 0.5, s * 0.02);
    g.quadraticCurveTo(s * 0.2, s * 0.22, s * 0.32, s * 0.3);
    g.lineTo(s * 0.68, s * 0.3);
    g.quadraticCurveTo(s * 0.8, s * 0.22, s * 0.5, s * 0.02);
    g.fill();
    g.strokeStyle = '#8f2a3a';
    g.lineWidth = 3;
    g.beginPath();
    g.moveTo(s * 0.5, s * 0.3);
    g.lineTo(s * 0.5, s * 0.9);
    g.stroke();
    g.fillStyle = '#8f2a3a';
    for (let i = 0; i < 10; i++) {
      g.beginPath();
      g.arc(s * (0.3 + rnd() * 0.4), s * (0.4 + rnd() * 0.45), 2 + rnd() * 2, 0, Math.PI * 2);
      g.fill();
    }
  });
  petals = markShared(std(0xffffff, { map, roughness: 0.6 }));
  return petals;
}

function mergeAll(geometries) {
  return mergeGeometries(geometries.map((g) => g.toNonIndexed()));
}
