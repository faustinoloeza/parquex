import * as THREE from 'three';
import { WATER_SDF } from '#shared/formats/water.js';
import { FADE } from '#shared/design-area.js';
import { INLAND_DEEP_AT, INLAND_TINT_RAMP } from '#shared/water-tint.js';
import { WATER_DAY } from '../layers/water.js';

/** Cells per side of the water grid over the park extent (≈ 4.4 m for Xcaret). */
const GRID = 320;

// Same palette as the animated water by day (layers/water.js → WATER_DAY).
const SEA_SHALLOW = new THREE.Color(WATER_DAY.shallow);
const SEA_DEEP = new THREE.Color(WATER_DAY.deep);
const LAGOON = new THREE.Color(WATER_DAY.lagoon);
const POOL = new THREE.Color(WATER_DAY.pool);
const RIVER = new THREE.Color(WATER_DAY.river);
const SKY = new THREE.Color(WATER_DAY.sky);

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Static stand-in for the animated water shader: a flat grid at y = 0 over the
 * cells of water.png that hold water, with the shader's color at rest per
 * vertex (sea shallow → deep with the distance to the shore, pool, lagoon,
 * river, or the park's own inland color, park.waterTint; a bit of sky
 * reflection) and its alpha (lighter at the shore, fading
 * out at the edge of the designed area). No waves, glints or foam.
 * @param {{ park: object, waterTexture: THREE.Texture, designArea: object }} options
 * @returns {THREE.Mesh | null}
 */
export function exportWater({ park, waterTexture, designArea, premultiply = false }) {
  const { cx, cz, size } = park.extent;
  const x0 = cx - size / 2,
    z0 = cz - size / 2,
    cell = size / GRID;
  const N = GRID + 1;
  const sample = waterSampler(park, waterTexture);

  // per grid vertex: shore distance, tint, fade
  const sd = new Float32Array(N * N),
    tint = new Float32Array(N * N),
    fade = new Float32Array(N * N);
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const x = x0 + i * cell,
        z = z0 + j * cell;
      const [d, t] = sample(x, z);
      sd[j * N + i] = d;
      tint[j * N + i] = t;
      fade[j * N + i] = designArea.signedDistance(x, z) < FADE.outer ? designArea.fade(x, z) : 1;
    }
  }

  const remap = new Int32Array(N * N).fill(-1);
  const index = [];
  let count = 0;
  const vertex = (k) => (remap[k] < 0 ? (remap[k] = count++) : remap[k]);
  const wet = (k) => sd[k] > -cell * 0.5 && fade[k] < 0.99;
  for (let j = 0; j < GRID; j++) {
    for (let i = 0; i < GRID; i++) {
      const a = j * N + i,
        b = a + 1,
        c = a + N,
        d = c + 1;
      if (!(wet(a) || wet(b) || wet(c) || wet(d))) continue;
      const va = vertex(a),
        vb = vertex(b),
        vc = vertex(c),
        vd = vertex(d);
      index.push(va, vc, vb, vb, vc, vd); // counter-clockwise seen from above
    }
  }
  if (!count) return null;

  const position = new Float32Array(count * 3),
    normal = new Float32Array(count * 3),
    color = new Float32Array(count * 4);
  const col = new THREE.Color();
  const shade = waterShade(park);
  for (let k = 0; k < N * N; k++) {
    const v = remap[k];
    if (v < 0) continue;
    const i = k % N,
      j = Math.floor(k / N);
    position.set([x0 + i * cell, 0, z0 + j * cell], v * 3);
    normal.set([0, 1, 0], v * 3);
    const { inland, opacity } = shade(sd[k], tint[k], col);
    const mask = smoothstep(-cell * 0.5, cell * 0.5, sd[k]) * (1 - fade[k]);
    const alpha = mask * (opacity + (0.96 - opacity) * inland);
    // premultiply: Filament's FADE blending (gltfio BLEND) un-premultiplies
    // the base color, so per-vertex alpha must already be applied to RGB
    const k2 = premultiply ? alpha : 1;
    color.set([col.r * k2, col.g * k2, col.b * k2, alpha], v * 4);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(color, 4));
  geometry.setIndex(index);
  const material = new THREE.MeshStandardMaterial({
    name: 'water',
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    roughness: 0.35,
    metalness: 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'water';
  return mesh;
}

/**
 * [signed distance to the shore (m), tint] at local (x, z) of a park, bilinear
 * from its water.png (shared/formats/water.js).
 * @param {{ extent: { cx: number, cz: number, size: number } }} park
 * @param {THREE.Texture} waterTexture
 * @returns {(x: number, z: number) => [number, number]}
 */
export function waterSampler(park, waterTexture) {
  const pixels = readPixels(waterTexture.image);
  const { cx, cz, size } = park.extent;
  const x0 = cx - size / 2,
    z0 = cz - size / 2;
  return (x, z) => {
    const { width: w, height: h, data } = pixels;
    const u = ((x - x0) / size) * w - 0.5,
      v = ((z - z0) / size) * h - 0.5;
    const i = Math.max(0, Math.min(w - 2, Math.floor(u))),
      j = Math.max(0, Math.min(h - 2, Math.floor(v)));
    const fu = Math.min(1, Math.max(0, u - i)),
      fv = Math.min(1, Math.max(0, v - j));
    const at = (c, di, dj) => data[((j + dj) * w + i + di) * 4 + c] / 255;
    const bil = (c) =>
      at(c, 0, 0) * (1 - fu) * (1 - fv) + at(c, 1, 0) * fu * (1 - fv) + at(c, 0, 1) * (1 - fu) * fv + at(c, 1, 1) * fu * fv;
    return [WATER_SDF.min + (WATER_SDF.max - WATER_SDF.min) * bil(0), bil(1)];
  };
}

/**
 * The water shader's color at rest (sea shallow → deep with the distance to
 * the shore, pool, lagoon, river, or the park's own inland color,
 * park.waterTint; a bit of sky reflection), written into `col` (linear), with
 * its base opacity and how much of it is inland water. The alpha of a vertex
 * is then mask · (opacity + (0.96 − opacity) · inland).
 * @param {{ waterTint?: { shallow: string, deep: string } }} park
 * @returns {(sd: number, t: number, col: THREE.Color) => { inland: number, opacity: number }}
 */
export function waterShade(park) {
  // park.waterTint: inland water in the park's own color (as layers/water.js)
  const inlandShallow = park.waterTint && new THREE.Color(park.waterTint.shallow),
    inlandDeep = park.waterTint && new THREE.Color(park.waterTint.deep),
    inlandCol = new THREE.Color();
  return (sd, t, col) => {
    const depth = Math.min(1, Math.max(0, sd / 40));
    col.copy(SEA_SHALLOW).lerp(SEA_DEEP, smoothstep(0.02, 0.85, depth)); // sea
    if (t < 0.25) col.lerp(POOL, t / 0.25);
    else if (t < 0.45) col.copy(POOL).lerp(LAGOON, (t - 0.25) / 0.2);
    else col.copy(LAGOON).lerp(RIVER, (t - 0.45) / 0.55);
    const inland = park.waterTint ? smoothstep(INLAND_TINT_RAMP[0], INLAND_TINT_RAMP[1], t) : 0;
    if (inland > 0) col.lerp(inlandCol.copy(inlandShallow).lerp(inlandDeep, smoothstep(0, INLAND_DEEP_AT, depth)), inland);
    col.lerp(SKY, 0.08); // average fresnel sky reflection seen from above
    return { inland, opacity: 0.62 + 0.34 * smoothstep(0, 0.35, depth + t) };
  };
}

/** RGBA bytes of a decoded image (ImageBitmap or canvas), no color conversion. */
function readPixels(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const g = canvas.getContext('2d', { willReadFrequently: true });
  g.drawImage(image, 0, 0);
  return g.getImageData(0, 0, image.width, image.height);
}
