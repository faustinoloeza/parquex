import fs from 'node:fs/promises';
import path from 'node:path';
import { PARKS } from '#parks/index.js';
import { parkFrame } from '#shared/geo.js';
import { loadOsm } from './lib/osm.js';
import { resolveSite } from './site.js';

/** Raster resolution used for classification and all intermediate masks. */
export const GRID = 2048;

export const RAW_DIR = path.resolve('data/raw');
export const DEBUG_DIR = path.resolve('data/debug');

/** Is the park built from satellite imagery + OSM instead of an official illustration? */
export const isSatelliteMode = (park) => park.sources.mode === 'satellite';

/**
 * Georeference of a park (shared/geo.js parkFrame).
 * @param {string} key
 */
export async function loadParkFrame(key) {
  const park = PARKS[key];
  if (!park) throw new Error(`Unknown park "${key}" (known: ${Object.keys(PARKS).join(', ')})`);
  return { park, ...parkFrame(park) };
}

/**
 * Shared state of one build. Stages read what earlier stages produced and add
 * their own products to it (each stage documents what it reads and writes).
 * @param {string} key park key (xc, xh…)
 */
export async function createBuildContext(key) {
  const { park, center, projection, extent, bounds } = await loadParkFrame(key);
  const raw = (name) => path.join(RAW_DIR, name);

  // raster grid over the illustration square
  const N = GRID;
  const pxPerM = N / extent.size;
  const grid = {
    N,
    pxPerM,
    /** local meters → pixel (fractional) */
    toPx: (x, z) => [((x - extent.cx) / extent.size + 0.5) * N, ((z - extent.cz) / extent.size + 0.5) * N],
    /** pixel → local meters */
    toLocal: (u, v) => [extent.cx + (u / N - 0.5) * extent.size, extent.cz + (v / N - 0.5) * extent.size],
    /** pixel → array index (clamped) */
    idx: (u, v) => Math.min(N - 1, Math.max(0, v | 0)) * N + Math.min(N - 1, Math.max(0, u | 0)),
  };

  const outDir = path.resolve('public/parks', key);
  await fs.mkdir(outDir, { recursive: true });

  return {
    key,
    park,
    /** built from satellite imagery + OSM (no official illustration) */
    satellite: isSatelliteMode(park),
    center,
    projection,
    extent,
    bounds,
    grid,
    site: resolveSite(park),
    osm: await loadOsm(raw(`osm-${key}.json`), projection),
    paths: {
      illustration: raw(`${key}-illustration.png`),
      satellite: raw(`${key}-satellite.jpg`),
    },
    /** writes a file into public/parks/<key>/ (creating folders) */
    async write(name, data) {
      const file = path.join(outDir, name);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, data);
    },
    /** removes a generated file or folder of public/parks/<key>/ */
    remove: (name) => fs.rm(path.join(outDir, name), { recursive: true, force: true }),
    log: (...args) => console.log(`[${key}]`, ...args),
  };
}
