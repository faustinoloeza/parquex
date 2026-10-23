import * as THREE from 'three';
import { FADE, makeDesignArea } from '#shared/design-area.js';
import { TREE_STRIDE, decodeVegetation } from '#shared/formats/vegetation.js';
import { encodeInstances } from '#shared/formats/instances.js';
import {
  BASEMAP_YIELD,
  MAP_SEA,
  REGION_SEA_EDGE,
  clipTransparent,
  contextGroundGrid,
  neighborLayers,
  neighborPlacement,
  pickNeighborTrees,
  regionWaterFactor,
  seaEdge,
} from '#shared/neighbor-context.js';
import { PARKS } from '../parks/index.js';
import { QUALITY_PRESETS } from '../app/quality.js';
import { loadNeighborAssets, loadParkJson } from '../app/assets.js';
import { heightSampler } from '../layers/terrain.js';
import { fillTrees } from '../layers/vegetation.js';
import { instanceRecords } from './instances.js';
import { TREE_TINT_SCALE, treeTypeName } from './vegetation.js';
import { waterSampler, waterShade } from './water.js';
import { exportLampRecords, loadLampInputs } from './night.js';
import { encodeLamps } from '#shared/formats/lamps.js';

// Context bundle of the mobile export: what the Android app draws around the
// focused park so that, like the web (layers/neighbors.js), Xcaret, Xplor,
// Xenses and the land around them (region xcr) always show together.
//
//   context.glb            per neighbor, in priority order: ctx-ground:<key>
//                          (+ ctx-water:<key>), focused frame, opacity baked
//   context-instances.bin  its trees (PQI1, shared/formats/instances.js), drawn
//                          with the prototypes of the focused park's park-models.glb
//   context-lamps.bin      the street lamps of the neighbor parks (not the region),
//                          PQL1 (shared/formats/lamps.js), focused frame, only
//                          where the neighbor's ground shows (opacity ≥ 0.5);
//                          the web draws no neighbor lamps: optional for the app
//   context.json           neighbors, offsets, outlines, record ranges, how the
//                          real map yields (see buildContext)

/** Size (m) of a context water cell: finer than the 12 m ground, the shore is per vertex. */
const WATER_CELL = 6;
const MAX_WATER_GRID = 600;
/** Alpha below this counts as 0 (half an 8-bit step). */
const MIN_ALPHA = 0.5 / 255;
const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Builds the context bundle of a focused park. Null when it has no neighbors.
 * @param {string} focusKey
 * @returns {Promise<{ scene: THREE.Scene, instances: Uint8Array, lamps: Uint8Array, json: object } | null>}
 */
export async function buildContext(focusKey) {
  const keys = Object.keys(PARKS);
  const parks = await Promise.all(keys.map((key) => loadParkJson(key).then((p) => ({ ...p, key }))));
  const focus = parks.find((p) => p.key === focusKey);
  if (!focus) throw new Error(`no park.json for "${focusKey}"`);
  const layers = neighborLayers(
    focus,
    parks.filter((p) => p.key !== focusKey),
  );
  if (!layers.length) return null;

  const scene = new THREE.Scene();
  const root = new THREE.Group();
  root.name = 'context';
  scene.add(root);
  /** @type {Map<string, import('#shared/formats/instances.js').InstanceRecord[]>} */
  const treeTypes = new Map();
  const neighbors = [];
  /** @type {import('#shared/formats/lamps.js').LampRecord[]} */
  const lamps = [];
  for (const [priority, n] of layers.entries()) {
    const assets = await loadNeighborAssets(n.key);
    const heightAt = heightSampler(n.park, assets.heightBuffer);
    const entry = { key: n.key, name: PARKS[n.key]?.name ?? n.key, ...neighborPlacement(n, priority), nodes: {} };
    const bounds = new THREE.Box3();

    const ground = contextGround(n, heightAt, assets.ground);
    if (ground) {
      root.add(ground.mesh);
      entry.nodes.ground = ground.mesh.name;
      entry.ground = ground.stats;
      bounds.expandByObject(ground.mesh);
    }
    const water = contextWater(n, assets.waterTexture);
    if (water) {
      root.add(water.mesh);
      entry.nodes.water = water.mesh.name;
      entry.water = water.stats;
      bounds.expandByObject(water.mesh);
    }
    if (!bounds.isEmpty())
      entry.bounds = { x0: round(bounds.min.x), x1: round(bounds.max.x), z0: round(bounds.min.z), z1: round(bounds.max.z) };
    entry.trees = contextTrees(n, decodeVegetation(assets.vegetationBuffer), treeTypes);
    if (!n.region) entry.lamps = await contextLamps(n, heightAt, lamps);
    neighbors.push(entry);
    assets.waterTexture.image?.close?.(); // read already; the ground image is encoded by the exporter
  }
  scene.updateMatrixWorld(true);

  // records of a type: one range per neighbor, in priority order (contextTrees)
  const types = [...treeTypes].map(([name, records]) => ({ name, records }));
  const json = {
    format: 'parquex-context',
    version: 1,
    focus: focusKey,
    frame: `local meters of ${focusKey}/park.json (x east, y up, z south, origin at its center): the frame of its park-models.glb and instances.bin`,
    files: { glb: 'context.glb', instances: 'context-instances.bin', lamps: 'context-lamps.bin' },
    fade: { inner: FADE.inner, outer: FADE.outer },
    neighbors,
    lamps: {
      count: lamps.length,
      note: 'context-lamps.bin (PQL1, focused frame): street lamps of the neighbor parks where their ground shows (ground opacity >= 0.5), range per neighbor in neighbors[i].lamps; the web does not draw them (optional: heads only, at night)',
    },
    basemapYield: BASEMAP_YIELD,
    drawOrder: [
      'OSM tiles + the focused park fade quad (as today)',
      'ctx-ground:<key> in REVERSE priority order (region first, then the parks from the last to neighbors[0]); depth test/write off',
      'focused park models and trees, ctx trees (context-instances.bin) with depth test',
      'water (focused park water and ctx-water:<key>), blended, depth write off',
    ],
    trees: {
      preset: QUALITY_PRESETS.high.neighbors,
      thinning:
        'records are the web "high" pick; for medium/low keep, inside each neighbor range of each type, record j (0-based) when floor((j + 1) * f) > floor(j * f), f = neighbors[i].trees.quality[preset] (f = 1/k keeps every k-th record)',
    },
  };
  return { scene, instances: encodeInstances(types), lamps: encodeLamps(lamps), json };
}

/**
 * The neighbor's street lamps as the web would place them if it were focused
 * (export/night.js), in the focused frame, where its ground shows (opacity ≥
 * 0.5), appended to `out`. Returns the context.json range { first, count }.
 */
async function contextLamps(n, heightAt, out) {
  const parkDef = PARKS[n.key];
  if (!parkDef) return { first: out.length, count: 0 };
  const { buildings, paving } = await loadLampInputs(n.key);
  const records = exportLampRecords({ park: n.park, parkDef, heightAt, buildings, paving, designArea: makeDesignArea(n.park.clear) });
  paving?.close?.();
  const first = out.length;
  for (const r of records) {
    if (n.opacity.ground(r.x, r.z) < 0.5) continue;
    const [x, z] = n.offset.toWorld(r.x, r.z);
    out.push({ ...r, x, z });
  }
  return { first, count: out.length - first };
}

const round = (v, digits = 1) => Math.round(v * 10 ** digits) / 10 ** digits;

/**
 * The neighbor's ground (contextGroundGrid: the web's ~12 m cells over its
 * heights, split in the fade bands; the level-0 ground tile) in the focused
 * frame with its opacity in COLOR_0 alpha (neighborLayers → opacity.ground),
 * lit, alpha-blended; the triangles that are transparent everywhere are
 * dropped.
 */
function contextGround(n, heightAt, map) {
  const grid = contextGroundGrid(n.park.extent, n.own, n.opacity.cull, n.opacity.ground);
  const count = grid.points.length / 2;
  const at = (v) => [grid.x0 + grid.points[v * 2] * grid.step, grid.z0 + grid.points[v * 2 + 1] * grid.step];
  const alpha = new Float32Array(count);
  for (let v = 0; v < count; v++) alpha[v] = n.opacity.ground(...at(v));
  const { index, vertices } = clipTransparent(grid.index, alpha, MIN_ALPHA);
  if (!index.length) return null;
  const position = new Float32Array(vertices.length * 3),
    normals = new Float32Array(vertices.length * 3),
    uvs = new Float32Array(vertices.length * 2),
    color = new Float32Array(vertices.length * 4);
  const d = grid.cell; // normals over one whole cell, like groundGrid
  vertices.forEach((v, k) => {
    const [x, z] = at(v);
    const [wx, wz] = n.offset.toWorld(x, z);
    position.set([wx, heightAt(x, z), wz], k * 3);
    const nx = (heightAt(x - d, z) - heightAt(x + d, z)) / (2 * d),
      nz = (heightAt(x, z - d) - heightAt(x, z + d)) / (2 * d);
    const l = Math.hypot(nx, 1, nz);
    normals.set([nx / l, 1 / l, nz / l], k * 3);
    uvs.set([grid.points[v * 2] / grid.lattice, grid.points[v * 2 + 1] / grid.lattice], k * 2); // v = 0 at the north edge, like the image rows
    color.set([alpha[v], alpha[v], alpha[v], alpha[v]], k * 4); // premultiplied (Filament FADE blending)
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute('color', new THREE.BufferAttribute(color, 4));
  geometry.setIndex(index);
  map.name = `ctx-ground:${n.key}`;
  map.userData.mimeType = 'image/jpeg';
  const material = new THREE.MeshStandardMaterial({
    name: `ctx-ground:${n.key}`,
    map,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    roughness: 1,
    metalness: 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `ctx-ground:${n.key}`;
  const opaque = alphaStats(color);
  return {
    mesh,
    stats: {
      vertices: vertices.length,
      triangles: index.length / 3,
      cell: round(grid.cell, 2),
      bandCell: round(grid.step, 2),
      texture: { width: map.image.width, height: map.image.height },
      ...opaque,
    },
  };
}

/** Share of vertices fully opaque / partly transparent. */
function alphaStats(color) {
  let opaque = 0;
  const count = color.length / 4;
  for (let v = 0; v < count; v++) if (color[v * 4 + 3] >= 1 - MIN_ALPHA) opaque++;
  return { opaqueVertices: opaque };
}

/**
 * Still water of the neighbor (the web's LITE water shader at rest, per
 * vertex, like export/water.js), in the focused frame, alpha-blended; alpha
 * times where it yields (neighborLayers → opacity.water). A region's open sea
 * turns into the real map's sea color and opacity towards its outline
 * (REGION_SEA_EDGE, layers/water.js SEA_EDGE).
 */
function contextWater(n, waterTexture) {
  const { park, own, region } = n;
  const { cx, cz, size } = park.extent;
  const G = Math.min(MAX_WATER_GRID, Math.ceil(size / WATER_CELL));
  const cell = size / G;
  const x0 = cx - size / 2,
    z0 = cz - size / 2;
  const N = G + 1;
  const sample = waterSampler(park, waterTexture);
  const sd = new Float32Array(N * N),
    tint = new Float32Array(N * N),
    factor = new Float32Array(N * N),
    edge = new Float32Array(N * N);
  for (let j = 0; j < N; j++) {
    for (let i = 0; i < N; i++) {
      const k = j * N + i,
        x = x0 + i * cell,
        z = z0 + j * cell;
      const [d, t] = sample(x, z);
      sd[k] = d;
      tint[k] = t;
      if (d < -cell) continue; // land: factor 0
      const yieldFactor = n.opacity.water(x, z);
      if (region) {
        edge[k] = seaEdge(own, x, z, t);
        factor[k] = regionWaterFactor(yieldFactor, own.fade(x, z), edge[k]);
      } else factor[k] = yieldFactor;
    }
  }
  const remap = new Int32Array(N * N).fill(-1);
  const index = [];
  let count = 0;
  const vertex = (k) => (remap[k] < 0 ? (remap[k] = count++) : remap[k]);
  const wet = (k) => sd[k] > -cell * 0.5 && factor[k] > MIN_ALPHA;
  for (let j = 0; j < G; j++) {
    for (let i = 0; i < G; i++) {
      // as groundGrid: nothing beyond the neighbor's outline (a region's sea edge is opaque up to there)
      if (own.signedDistance(x0 + (i + 0.5) * cell, z0 + (j + 0.5) * cell) > FADE.outer + cell * 1.5) continue;
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
  const col = new THREE.Color(),
    sea = new THREE.Color(MAP_SEA);
  const shade = waterShade(park);
  for (let k = 0; k < N * N; k++) {
    const v = remap[k];
    if (v < 0) continue;
    const [x, z] = n.offset.toWorld(x0 + (k % N) * cell, z0 + Math.floor(k / N) * cell);
    position.set([x, 0, z], v * 3);
    normal.set([0, 1, 0], v * 3);
    const { inland, opacity } = shade(sd[k], tint[k], col);
    const e = edge[k];
    if (e > 0) col.lerp(sea, e);
    const base = opacity + (0.96 - opacity) * inland;
    let alpha = smoothstep(-cell * 0.5, cell * 0.5, sd[k]) * factor[k] * (base + (1 - base) * e);
    // the web's opaque sea edge stops at its cells (exactly the map's sea color, unlit); here it fades out
    // over the last meters outside the outline, so a lit color that differs a bit leaves no stepped edge
    if (region) alpha *= 1 - smoothstep(0, FADE.outer + cell, own.signedDistance(x0 + (k % N) * cell, z0 + Math.floor(k / N) * cell));
    color.set([col.r * alpha, col.g * alpha, col.b * alpha, alpha], v * 4); // premultiplied (Filament FADE blending)
  }
  const clipped = clipTransparent(
    index,
    Array.from({ length: count }, (_, v) => color[v * 4 + 3]),
    MIN_ALPHA,
  );
  if (!clipped.index.length) return null;
  const pick = (array, size) => {
    const out = new Float32Array(clipped.vertices.length * size);
    clipped.vertices.forEach((v, k) => out.set(array.subarray(v * size, v * size + size), k * size));
    return out;
  };
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(pick(position, 3), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(pick(normal, 3), 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(pick(color, 4), 4));
  geometry.setIndex(clipped.index);
  const material = new THREE.MeshStandardMaterial({
    name: `ctx-water:${n.key}`,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    roughness: 0.35,
    metalness: 0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = `ctx-water:${n.key}`;
  return {
    mesh,
    stats: {
      vertices: clipped.vertices.length,
      triangles: clipped.index.length / 3,
      cell: round(cell, 2),
      waterTint: park.waterTint ?? null,
      seaEdge: region ? { color: MAP_SEA, band: REGION_SEA_EDGE } : null,
    },
  };
}

/**
 * The neighbor's trees for the web's "high" preset (pickNeighborTrees), as
 * instances.bin records in the focused frame appended to `types` (by
 * prototype name: tree-broad, tree-palm…). Returns the context.json entry:
 * stride, counts, the record range of each type and the fraction the medium
 * and low presets keep.
 */
function contextTrees(n, data, types) {
  const pick = (preset) => pickNeighborTrees(data, preset, n.region, n.offset, n.yieldTo);
  const high = pick(QUALITY_PRESETS.high.neighbors);
  const byType = new Map();
  for (const i of high.indices) {
    const type = data[i * TREE_STRIDE + 5];
    if (!byType.has(type)) byType.set(type, []);
    byType.get(type).push(i);
  }
  const entry = {
    stride: round(high.stride, 3),
    count: high.indices.length,
    ...(n.region ? { eligible: high.eligible, cap: high.cap } : {}),
    types: {},
    quality: { high: 1 },
  };
  for (const name of ['medium', 'low']) {
    const k = pick(QUALITY_PRESETS[name].neighbors).indices.length;
    entry.quality[name] = high.indices.length ? round(k / high.indices.length, 3) : 0;
  }
  const geometry = new THREE.BufferGeometry();
  for (const [type, indices] of [...byType].sort((a, b) => a[0] - b[0])) {
    const mesh = new THREE.InstancedMesh(geometry, undefined, indices.length);
    fillTrees(mesh, data, indices);
    const { records } = instanceRecords(mesh, { tintScale: TREE_TINT_SCALE });
    mesh.dispose();
    for (const r of records) [r.x, r.z] = n.offset.toWorld(r.x, r.z);
    const name = treeTypeName(type);
    if (!types.has(name)) types.set(name, []);
    const list = types.get(name);
    entry.types[name] = { first: list.length, count: records.length };
    list.push(...records);
  }
  geometry.dispose();
  return entry;
}
