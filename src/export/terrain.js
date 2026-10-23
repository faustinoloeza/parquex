import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { GROUND_LEVELS, groundTileId, groundTilePath, groundTileRect } from '#shared/formats/ground-tiles.js';
import { chunkGeometry } from '../layers/terrain.js';
import { loadTexture } from '../graphics/texture-loader.js';

/**
 * Ground tile level used by the export: level 1 = up to 2 × 2 tiles of
 * 1024² px, i.e. a 2048² texture over the whole extent (≈ 0.66 m per texel for
 * Xcaret). Decoded that is at most 4 × 4 MB = 16 MB RGBA8 (+⅓ with mipmaps),
 * the top of a comfortable budget on phones; level 2 (4096², up to 64 MB)
 * would not be. Tree and building shadows are already baked into the tiles.
 */
export const EXPORT_GROUND_LEVEL = 1;

/** Grid cells per finest chunk side; the app uses 128 (≈ 2.7 m), half is plenty for gentle relief. */
export const EXPORT_CHUNK_SEGMENTS = 64;

/**
 * Terrain of the designed area as one mesh per ground tile of
 * EXPORT_GROUND_LEVEL, each with a plain material whose map is that tile. The
 * app's per-chunk UV remap (onBeforeCompile) is baked into the geometry UVs.
 * Tiles are encoded as JPEG in the GLB (rows north → south, flipY false: glTF
 * also puts v = 0 at the top of the image, so UVs are written unchanged).
 * @param {{ park: object, heightAt: (x: number, z: number) => number, designArea: object, baseUrl: string,
 *   holes?: ReturnType<typeof import('#shared/ground-holes.js').makeGroundHoles> }} options  holes: cut out of the ground
 * @returns {Promise<THREE.Group>}
 */
export async function exportTerrain({ park, heightAt, designArea, baseUrl, holes }) {
  const available = new Set(park.ground.tiles);
  const finest = GROUND_LEVELS - 1;
  const level = EXPORT_GROUND_LEVEL;
  const k = 2 ** (finest - level); // finest chunks per export tile side
  const group = new THREE.Group();
  group.name = 'terrain';
  const n = 2 ** level;
  for (let tj = 0; tj < n; tj++) {
    for (let ti = 0; ti < n; ti++) {
      const id = groundTileId(level, ti, tj);
      if (!available.has(id)) continue;
      const parts = [];
      for (let j = tj * k; j < (tj + 1) * k; j++) {
        for (let i = ti * k; i < (ti + 1) * k; i++) {
          if (!available.has(groundTileId(finest, i, j))) continue;
          const g = chunkGeometry(groundTileRect(park.extent, finest, i, j), heightAt, designArea, EXPORT_CHUNK_SEGMENTS, holes);
          if (!g) continue;
          // chunk UV (0..1) → its place inside the export tile
          const uv = g.getAttribute('uv');
          for (let v = 0; v < uv.count; v++) uv.setXY(v, (uv.getX(v) + (i % k)) / k, (uv.getY(v) + (j % k)) / k);
          parts.push(g);
        }
      }
      if (!parts.length) continue;
      const map = await loadTexture(baseUrl + groundTilePath(id), { anisotropy: 4 });
      map.name = `ground-${id}`;
      map.userData.mimeType = 'image/jpeg';
      const material = new THREE.MeshStandardMaterial({ name: `ground-${id}`, map, roughness: 1, metalness: 0 });
      const mesh = new THREE.Mesh(mergeGeometries(parts, false), material);
      mesh.name = `terrain:${id}`;
      group.add(mesh);
    }
  }
  return group;
}
