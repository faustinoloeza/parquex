import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { PAVING_FILE, PAVING_SIZE } from '#shared/formats/paving.js';
import { materials } from '../graphics/materials.js';
import { exportMaterial } from './materials.js';

/** Height (m) of the flat paving layer: over a map drawn at y = 0, under the shadows (y = 0.02). */
export const PAVING_Y = 0.01;
/** Meters per repeat of the paving texture (same scale as the models' worldUV). */
const TEXTURE_METERS = 4;
/** Over the park terrain: meters above it, and the longest merged quad (so it follows the relief). */
const TERRAIN_LIFT = 0.05;
const TERRAIN_MAX_RUN = 2;
/** Coverage above which a sample counts as paved. */
const ISO = 0.5;

/**
 * Walkways and plazas of the park as one flat mesh ("paving") for a viewer
 * that draws the real map as ground (the mobile app): marching squares over
 * paving.png (pipeline, shared/formats/paving.js) with smooth edges, runs of
 * fully paved cells merged into single quads. One material — the library's
 * tiling flagstone texture with UVs in world meters — so one draw call.
 *
 * With `heightAt` the layer drapes over the park terrain (TERRAIN_LIFT above
 * it, quads at most TERRAIN_MAX_RUN cells long) instead of lying flat at PAVING_Y.
 *
 * @param {{ park: object, baseUrl: string, heightAt?: (x: number, z: number) => number }} options
 *        park.json, the park's data folder and, over the terrain, its height
 * @returns {Promise<THREE.Mesh | null>} null when the park has no paving.png
 */
export async function exportPaving({ park, baseUrl, heightAt }) {
  const res = await fetch(baseUrl + PAVING_FILE);
  if (!res.ok || !res.headers.get('content-type')?.startsWith('image/')) return null;
  const bitmap = await createImageBitmap(await res.blob());
  const S = PAVING_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(bitmap, 0, 0, S, S);
  bitmap.close();
  const rgba = ctx.getImageData(0, 0, S, S).data;
  const cover = new Float32Array(S * S);
  for (let i = 0; i < cover.length; i++) cover[i] = rgba[i * 4] / 255;
  const geometry = pavingGeometry(
    cover,
    S,
    park.extent,
    heightAt && { height: (x, z) => heightAt(x, z) + TERRAIN_LIFT, maxRun: TERRAIN_MAX_RUN },
  );
  if (!geometry) return null;
  const mesh = new THREE.Mesh(geometry, exportMaterial(materials().paving, { name: 'paving' }));
  mesh.name = 'paving';
  mesh.renderOrder = -2;
  return mesh;
}

/**
 * Triangles (normal up, y = PAVING_Y) of the area where `cover` ≥ ISO; cover
 * holds size² samples over `extent`, row 0 at the north edge.
 * @param {Float32Array} cover
 * @param {number} size
 * @param {{ cx: number, cz: number, size: number }} extent
 * @param {{ height: (x: number, z: number) => number, maxRun: number }} [relief]
 *        drape over a terrain instead of y = PAVING_Y, merging at most maxRun cells per quad
 * @returns {THREE.BufferGeometry | null}
 */
export function pavingGeometry(cover, size, extent, relief) {
  const maxRun = relief?.maxRun ?? Infinity;
  const cell = extent.size / size;
  const X = (u) => extent.cx - extent.size / 2 + (u + 0.5) * cell;
  const Z = (v) => extent.cz - extent.size / 2 + (v + 0.5) * cell;
  const pos = [];
  // polygon given clockwise seen from above (north-west, north-east, …) → fan
  // triangles wound counter-clockwise so they face up
  const fan = (pts) => {
    for (let i = 1; i < pts.length - 1; i++) pos.push(...pts[0], ...pts[i + 1], ...pts[i]);
  };
  const at = (u, v) => cover[v * size + u];
  for (let v = 0; v < size - 1; v++) {
    let run = -1; // first cell of the current run of fully paved cells
    for (let u = 0; u <= size - 1; u++) {
      const corners =
        u < size - 1
          ? [
              [u, v],
              [u + 1, v],
              [u + 1, v + 1],
              [u, v + 1],
            ]
          : null;
      const values = corners?.map(([a, b]) => at(a, b));
      const full = values?.every((c) => c >= ISO);
      if (full && run >= 0 && u - run >= maxRun) {
        fan([
          [X(run), PAVING_Y, Z(v)],
          [X(u), PAVING_Y, Z(v)],
          [X(u), PAVING_Y, Z(v + 1)],
          [X(run), PAVING_Y, Z(v + 1)],
        ]);
        run = u;
        continue;
      }
      if (full) {
        if (run < 0) run = u;
        continue;
      }
      if (run >= 0) {
        fan([
          [X(run), PAVING_Y, Z(v)],
          [X(u), PAVING_Y, Z(v)],
          [X(u), PAVING_Y, Z(v + 1)],
          [X(run), PAVING_Y, Z(v + 1)],
        ]);
        run = -1;
      }
      if (!values || values.every((c) => c < ISO)) continue;
      // clip the cell to the paved side (linear interpolation along the edges)
      const poly = [];
      for (let k = 0; k < 4; k++) {
        const [ua, va] = corners[k],
          [ub, vb] = corners[(k + 1) % 4];
        const a = values[k],
          b = values[(k + 1) % 4];
        if (a >= ISO) poly.push([X(ua), PAVING_Y, Z(va)]);
        if (a >= ISO !== b >= ISO) {
          const t = (ISO - a) / (b - a);
          poly.push([X(ua + (ub - ua) * t), PAVING_Y, Z(va + (vb - va) * t)]);
        }
      }
      if (poly.length >= 3) fan(poly);
    }
  }
  if (!pos.length) return null;
  const position = new Float32Array(pos);
  const n = position.length / 3;
  const normal = new Float32Array(n * 3);
  const uv = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) {
    if (relief) position[i * 3 + 1] = relief.height(position[i * 3], position[i * 3 + 2]);
    normal[i * 3 + 1] = 1;
    uv[i * 2] = position[i * 3] / TEXTURE_METERS;
    uv[i * 2 + 1] = position[i * 3 + 2] / TEXTURE_METERS;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return mergeVertices(geometry); // neighboring cells share their vertices
}
