import { groundTilePath, groundTileId } from '#shared/formats/ground-tiles.js';
import { loadTexture } from '../graphics/texture-loader.js';
import { PAVING_FILE } from '#shared/formats/paving.js';
import { BASE } from './routing.js';

async function fetchOK(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

/** Production builds carry gzip copies of the binary data (pipeline/vite-fast-load.js). */
const PACKED = import.meta.env?.PROD === true && typeof DecompressionStream !== 'undefined';

/**
 * A binary data file (height.bin, vegetation.bin) as an ArrayBuffer. In
 * production, its gzip copy (`<file>.gz`, about half the size: hosts do not
 * compress binary files on the fly), unpacked here; the plain file when the
 * copy is missing (the host answers with the page instead).
 * @param {string} url
 * @param {{ signal?: AbortSignal }} [options]
 */
async function fetchBinary(url, { signal } = {}) {
  if (PACKED) {
    const res = await fetch(`${url}.gz`, { signal });
    if (res.ok && !res.headers.get('content-type')?.includes('text/html')) {
      const bytes = new Uint8Array(await res.arrayBuffer());
      // still gzip (1f 8b): unpack; otherwise the host sent it with Content-Encoding and the browser already did
      if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return bytes.buffer;
      return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer();
    }
  }
  return (await fetchOK(url, { signal })).arrayBuffer();
}

/**
 * The water map of a park (shared/formats/water.js): in production its
 * lossless WebP copy (less than half the size), else — or when the copy is
 * missing — the PNG.
 */
function loadWater(baseUrl, options) {
  const png = () => loadTexture(`${baseUrl}water.png`, options);
  return PACKED ? loadTexture(`${baseUrl}water.webp`, options).catch(png) : png();
}

/**
 * Loads what the map needs to start for one park (public/parks/<key>/). Finer
 * ground tiles are streamed later by the terrain layer.
 * @param {string} key
 * @param {{ reference?: boolean, onProgress?: (fraction: number) => void,
 *   cached?: Awaited<ReturnType<typeof loadNeighborAssets>> & { park?: object } }} [options]
 *        reference: use the official illustration as ground texture (debug, needs data/raw);
 *        cached: the park's lightweight assets already loaded as a neighbor (reused, not fetched again)
 */
export async function loadParkAssets(key, { reference = false, onProgress = () => {}, cached = null } = {}) {
  const baseUrl = `${BASE}parks/${key}/`;
  const steps = 6;
  let done = 0;
  const tick = (value) => {
    done++;
    onProgress(done / steps);
    return value;
  };
  const groundUrl = reference ? `${BASE}data/raw/${key}-illustration.png` : baseUrl + groundTilePath(groundTileId(0, 0, 0));
  const reuse = (value, fetchIt) => (value ? Promise.resolve(value) : fetchIt()).then(tick);
  const [park, groundOverview, waterTexture, heightBuffer, vegetationBuffer, buildings, paving] = await Promise.all([
    reuse(cached?.park, () => fetchOK(`${baseUrl}park.json`).then((r) => r.json())),
    reuse(reference ? null : cached?.ground, () => loadTexture(groundUrl)),
    reuse(cached?.waterTexture, () => loadWater(baseUrl, { data: true })),
    reuse(cached?.heightBuffer, () => fetchBinary(`${baseUrl}height.bin`)),
    reuse(cached?.vegetationBuffer, () => fetchBinary(`${baseUrl}vegetation.bin`)),
    fetchOK(`${baseUrl}buildings.json`)
      .then((r) => r.json())
      .then(tick),
    // paving coverage: street lamps over plazas and glowing walkways at night (layers/lamps.js)
    fetchOK(baseUrl + PAVING_FILE)
      .then((r) => r.blob())
      .then((blob) => createImageBitmap(blob, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' }))
      .catch(() => null),
  ]);
  return { baseUrl, park, groundOverview, streamGround: !reference, waterTexture, heightBuffer, vegetationBuffer, buildings, paving };
}

/**
 * The part of a focused park's assets that its lightweight (neighbor) version
 * uses, to keep when the focus moves elsewhere (same shape as loadNeighborAssets).
 * Null with the debug reference ground (not the park's own texture).
 * @param {Awaited<ReturnType<typeof loadParkAssets>>} assets
 */
export function liteAssetsOf(assets) {
  if (!assets.streamGround) return null;
  const { groundOverview: ground, waterTexture, heightBuffer, vegetationBuffer } = assets;
  return { ground, waterTexture, heightBuffer, vegetationBuffer };
}

/** park.json of a park (neighbor search: center and designed area). */
export async function loadParkJson(key) {
  return (await fetchOK(`${BASE}parks/${key}/park.json`)).json();
}

/**
 * The lightweight version of a neighboring park (layers/neighbors.js): the
 * level-0 ground tile only (no streaming), heights, trees and water.
 * @param {string} key
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function loadNeighborAssets(key, { signal } = {}) {
  const baseUrl = `${BASE}parks/${key}/`;
  const buffer = (name) => fetchBinary(baseUrl + name, { signal });
  const results = await Promise.allSettled([
    loadTexture(baseUrl + groundTilePath(groundTileId(0, 0, 0)), { signal, anisotropy: 4 }),
    loadWater(baseUrl, { signal, data: true }),
    buffer('height.bin'),
    buffer('vegetation.bin'),
  ]);
  const failed = results.find((r) => r.status === 'rejected');
  if (failed) {
    // cancelled or failed: free the decoded images that did arrive
    for (const r of results) if (r.status === 'fulfilled' && r.value.isTexture) r.value.image?.close?.();
    throw failed.reason;
  }
  const [ground, waterTexture, heightBuffer, vegetationBuffer] = results.map((r) => r.value);
  return { ground, waterTexture, heightBuffer, vegetationBuffer };
}
