import * as THREE from 'three';
import { decodeHeights } from '#shared/formats/heightmap.js';
import { FADE } from '#shared/design-area.js';
import { GROUND_LEVELS, groundTileId, groundTilePath, groundTileRect } from '#shared/formats/ground-tiles.js';
import { TileCache } from '../graphics/tile-cache.js';
import { loadTexture } from '../graphics/texture-loader.js';
import { releaseGeometryAfterUpload } from '../graphics/memory.js';
import { nightUniform } from '../graphics/night.js';

/** Night: how much the lamps' light map lights the ground (× its albedo). */
export const LAMP_GAIN = 2.2;

/** Grid cells per chunk side (≈ 2.7 m cells for Xcaret, like the height grid). */
const CHUNK_SEGMENTS = 128;

/**
 * Ground of the designed area: the terrain heights (height.bin) as one mesh
 * per finest ground tile (shared/formats/ground-tiles.js), trimmed to the
 * designed area. Each chunk shows the coarsest ground tile that is sharp
 * enough for its distance to the camera: the overview tile is always loaded,
 * finer ones are streamed in and dropped again (bounded memory).
 *
 * @param {object} options
 * @param {object} options.park              park.json
 * @param {ArrayBuffer} options.heightBuffer height.bin
 * @param {THREE.Texture} options.overview   level-0 ground tile
 * @param {ReturnType<typeof import('#shared/design-area.js').makeDesignArea>} options.designArea
 * @param {string} options.baseUrl           /parks/<key>/
 * @param {boolean} [options.stream]         false: overview only (debug reference image)
 * @param {{ value: THREE.Texture }} [options.lightMap] night light of the street lamps over park.extent
 *        (layers/lamps.js): added to the ground, × its color, as the night falls
 * @param {ReturnType<typeof import('#shared/ground-holes.js').makeGroundHoles>} [options.holes] cut out of the
 *        ground (sunken moats of the landmarks)
 * @returns {import('./index.js').Layer & { heightAt: (x: number, z: number) => number }}
 */
export function createTerrainLayer({ park, heightBuffer, overview, designArea, baseUrl, stream = true, lightMap, holes }) {
  const { size } = park.extent;
  const heightAt = heightSampler(park, heightBuffer);

  const available = new Set(park.ground.tiles);
  const finest = GROUND_LEVELS - 1;
  const n = 2 ** finest;
  const tiles = new TileCache({
    load: (id, signal) => loadTexture(baseUrl + groundTilePath(id), { signal, anisotropy: 4 }),
    capacity: 8,
    concurrency: 2,
  });
  overview.anisotropy = 4;

  const half = size / 2;
  const uLightExtent = { value: new THREE.Vector3(park.extent.cx - half, park.extent.cz - half, size) };
  const object = new THREE.Group();
  object.name = 'terrain';
  const chunks = [];
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      if (!available.has(groundTileId(finest, i, j))) continue;
      const rect = groundTileRect(park.extent, finest, i, j);
      const geometry = chunkGeometry(rect, heightAt, designArea, CHUNK_SEGMENTS, holes);
      if (!geometry) continue;
      const material = new THREE.MeshLambertMaterial({ map: overview });
      const tileUV = { value: new THREE.Vector4() };
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uTileUV = tileUV;
        shader.vertexShader = shader.vertexShader
          .replace('#include <common>', '#include <common>\nuniform vec4 uTileUV;')
          .replace('#include <uv_vertex>', '#include <uv_vertex>\nvMapUv = vMapUv * uTileUV.zw + uTileUV.xy;');
        if (!lightMap) return;
        // night: the street lamps' pools of light and the glowing walkways
        Object.assign(shader.uniforms, { uNight: nightUniform, uLightMap: lightMap, uLightExtent });
        shader.vertexShader = shader.vertexShader
          .replace('#include <common>', '#include <common>\nuniform vec3 uLightExtent;\nvarying vec2 vNightUv;')
          .replace(
            '#include <project_vertex>',
            '#include <project_vertex>\nvNightUv = ((modelMatrix * vec4(transformed, 1.0)).xz - uLightExtent.xy) / uLightExtent.z;',
          );
        shader.fragmentShader = shader.fragmentShader
          .replace('#include <common>', '#include <common>\nuniform float uNight;\nuniform sampler2D uLightMap;\nvarying vec2 vNightUv;')
          .replace(
            '#include <emissivemap_fragment>',
            `#include <emissivemap_fragment>
            if (uNight > 0.001) totalEmissiveRadiance += diffuseColor.rgb * texture2D(uLightMap, vNightUv).rgb * (uNight * ${LAMP_GAIN.toFixed(2)});`,
          );
      };
      material.customProgramCacheKey = () => (lightMap ? 'terrain-chunk-night' : 'terrain-chunk');
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = `terrain:${i},${j}`;
      mesh.receiveShadow = true;
      mesh.renderOrder = -3; // before the real map, which is blended over it
      object.add(mesh);
      const box = geometry.boundingBox.clone();
      const chunk = { i, j, mesh, material, tileUV, box, level: -1 };
      setChunkLevel(chunk, 0, overview);
      chunks.push(chunk);
    }
  }

  function setChunkLevel(chunk, level, texture) {
    if (chunk.level === level && chunk.material.map === texture) return;
    const k = 2 ** (finest - level); // chunks per tile side at this level
    chunk.tileUV.value.set((chunk.i % k) / k, (chunk.j % k) / k, 1 / k, 1 / k);
    chunk.material.map = texture;
    chunk.level = level;
  }

  /** meters per texel of each level */
  const texelSizes = Array.from({ length: GROUND_LEVELS }, (_, l) => size / (2 ** l * park.ground.tileSize));
  let maxLevel = stream ? finest : 0;
  const closest = new THREE.Vector3();

  return {
    name: 'terrain',
    object,
    heightAt,
    setQuality(preset) {
      maxLevel = stream ? Math.min(finest, preset.groundLevel) : 0;
      tiles.capacity = preset.groundTiles;
    },
    update({ camera, frustum, fovPx }) {
      tiles.beginFrame();
      for (const chunk of chunks) {
        if (!frustum.intersectsBox(chunk.box)) {
          setChunkLevel(chunk, 0, overview); // off screen: let detail tiles go
          continue;
        }
        const dist = chunk.box.clampPoint(camera.position, closest).distanceTo(camera.position);
        const metersPerPixel = Math.max(dist, 1) / fovPx;
        // coarsest level whose texels are at most 1.5 screen pixels
        let want = 0;
        while (want < maxLevel && texelSizes[want] > metersPerPixel * 1.5) want++;
        let level = want,
          texture = null;
        for (; level > 0; level--) {
          const k = 2 ** (finest - level);
          const id = groundTileId(level, Math.floor(chunk.i / k), Math.floor(chunk.j / k));
          if (!available.has(id)) continue;
          texture = tiles.get(id);
          if (texture) break;
          tiles.request(id, level * 1e5 + dist);
        }
        setChunkLevel(chunk, level, texture ?? overview);
      }
      tiles.endFrame();
    },
    /** True while ground tiles are still downloading. */
    get loading() {
      return tiles.busy;
    },
    /** Frees the streamed detail tiles (the overview belongs to the caller). */
    dispose() {
      tiles.dispose();
    },
  };
}

/**
 * Terrain height (m) at local (x, z) from height.bin, bilinear, clamped to the grid.
 * @param {{ heightGrid: number, extent: { cx: number, cz: number, size: number } }} park park.json
 * @param {ArrayBuffer} heightBuffer
 * @returns {(x: number, z: number) => number}
 */
export function heightSampler(park, heightBuffer) {
  const G = park.heightGrid;
  const { cx, cz, size } = park.extent;
  const heights = decodeHeights(heightBuffer);
  return (x, z) => {
    const u = ((x - cx) / size + 0.5) * (G - 1);
    const v = ((z - cz) / size + 0.5) * (G - 1);
    const i0 = Math.max(0, Math.min(G - 2, Math.floor(u)));
    const j0 = Math.max(0, Math.min(G - 2, Math.floor(v)));
    const fu = Math.max(0, Math.min(1, u - i0)),
      fv = Math.max(0, Math.min(1, v - j0));
    const h = (i, j) => heights[(j0 + j) * G + i0 + i];
    return h(0, 0) * (1 - fu) * (1 - fv) + h(1, 0) * fu * (1 - fv) + h(0, 1) * (1 - fu) * fv + h(1, 1) * fu * fv;
  };
}

/**
 * Grid mesh of one chunk with analytic normals (seamless between chunks),
 * keeping only the cells that show part of the designed area. UVs span the
 * chunk (v = 0 at its north edge). Also used by the mobile export (src/export).
 * Cells inside a ground hole are left out; cells across its edge are split
 * into ever smaller squares down to CARVE_SIZE, which keep the plane of the
 * cell's own triangles (no cracks against their neighbors).
 * @param {number[]} rect [x0, z0, x1, z1] in local meters
 * @param {(x: number, z: number) => number} heightAt
 * @param {ReturnType<typeof import('#shared/design-area.js').makeDesignArea>} designArea
 * @param {number} [segments] grid cells per side
 * @param {ReturnType<typeof import('#shared/ground-holes.js').makeGroundHoles>} [holes]
 * @returns {THREE.BufferGeometry | null} null when the chunk shows nothing
 */
export function chunkGeometry([x0, z0, x1, z1], heightAt, designArea, segments = CHUNK_SEGMENTS, holes) {
  const S = segments;
  const cell = (x1 - x0) / S;
  const keepCell = (ci, cj) => designArea.signedDistance(x0 + (ci + 0.5) * cell, z0 + (cj + 0.5) * cell) < FADE.outer + cell * 1.5;
  const cutting = holes && !holes.empty;
  const remap = new Int32Array((S + 1) * (S + 1)).fill(-1);
  const index = [];
  const edgeCells = [];
  let count = 0;
  const vertex = (vi, vj) => {
    const k = vj * (S + 1) + vi;
    if (remap[k] < 0) remap[k] = count++;
    return remap[k];
  };
  for (let cj = 0; cj < S; cj++) {
    for (let ci = 0; ci < S; ci++) {
      if (!keepCell(ci, cj)) continue;
      if (cutting) {
        const where = holes.classify(x0 + ci * cell, z0 + cj * cell, x0 + (ci + 1) * cell, z0 + (cj + 1) * cell);
        if (where === 1) continue;
        if (where === 2) {
          edgeCells.push(ci, cj);
          continue;
        }
      }
      const a = vertex(ci, cj),
        b = vertex(ci + 1, cj),
        c = vertex(ci, cj + 1),
        d = vertex(ci + 1, cj + 1);
      index.push(a, c, b, b, c, d);
    }
  }
  // cells across a hole's edge: [x, z, y] of their pieces' vertices (4 per square)
  const carved = [];
  const depth = Math.max(0, Math.ceil(Math.log2(cell / CARVE_SIZE)));
  for (let n = 0; n < edgeCells.length; n += 2) {
    const ax = x0 + edgeCells[n] * cell,
      az = z0 + edgeCells[n + 1] * cell;
    const h00 = heightAt(ax, az),
      h10 = heightAt(ax + cell, az),
      h01 = heightAt(ax, az + cell),
      h11 = heightAt(ax + cell, az + cell);
    // on the cell's two triangles (diagonal (1, 0)–(0, 1), as drawn above)
    const plane = (u, v) => (u + v <= 1 ? h00 + (h10 - h00) * u + (h01 - h00) * v : h11 + (h01 - h11) * (1 - u) + (h10 - h11) * (1 - v));
    const square = (u, v, s, level) => {
      const sx = ax + u * cell,
        sz = az + v * cell,
        w = s * cell;
      const where = level ? holes.classify(sx, sz, sx + w, sz + w) : 2;
      if (where === 1) return;
      if (where === 2) {
        if (level < depth) {
          const h = s / 2;
          for (const [du, dv] of SPLIT) square(u + du * h, v + dv * h, h, level + 1);
          return;
        }
        if (holes.contains(sx + w / 2, sz + w / 2)) return;
      }
      const k = count + carved.length;
      for (const [du, dv] of SPLIT) carved.push([sx + du * w, sz + dv * w, plane(u + du * s, v + dv * s)]);
      index.push(k, k + 2, k + 1, k + 1, k + 2, k + 3);
    };
    square(0, 0, 1, 0);
  }
  const total = count + carved.length;
  if (!total) return null;
  const position = new Float32Array(total * 3),
    normal = new Float32Array(total * 3),
    uv = new Float32Array(total * 2);
  const e = cell;
  const setNormal = (x, z, k) => {
    const nx = (heightAt(x - e, z) - heightAt(x + e, z)) / (2 * e),
      nz = (heightAt(x, z - e) - heightAt(x, z + e)) / (2 * e);
    const l = Math.hypot(nx, 1, nz);
    normal.set([nx / l, 1 / l, nz / l], k * 3);
  };
  for (let vj = 0; vj <= S; vj++) {
    for (let vi = 0; vi <= S; vi++) {
      const k = remap[vj * (S + 1) + vi];
      if (k < 0) continue;
      const x = x0 + vi * cell,
        z = z0 + vj * cell;
      position.set([x, heightAt(x, z), z], k * 3);
      setNormal(x, z, k);
      uv.set([vi / S, vj / S], k * 2); // v = 0 at the north edge, like the image rows
    }
  }
  carved.forEach(([x, z, y], n) => {
    const k = count + n;
    position.set([x, y, z], k * 3);
    setNormal(x, z, k);
    uv.set([(x - x0) / (x1 - x0), (z - z0) / (z1 - z0)], k * 2);
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geometry.setIndex(total > 65535 ? index : new THREE.BufferAttribute(Uint16Array.from(index), 1));
  return releaseGeometryAfterUpload(geometry);
}

/** Smallest square (m) the ground is split into along a hole's edge (the models' wall tops cover the steps). */
const CARVE_SIZE = 0.35;

/** Corners of a square split in four, in the order the grid's quads use (a, b, c, d). */
const SPLIT = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
];
