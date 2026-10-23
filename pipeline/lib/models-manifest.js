// Manifest of the exported mobile models (docs/app-movil-noche-navegacion.md →
// Actualización de modelos): which files each park has, their size and
// SHA-256, so the app can tell whether a published release differs from the
// models it carries and download only what changed.
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

/** Manifest layout version: the app ignores manifests with a format it does not know. */
export const MANIFEST_FORMAT = 1;

/** Files the app reads from a park folder (previews and debug images stay out). */
export const APP_FILES = [
  'park.json',
  'park-models.glb',
  'instances.bin',
  'lamps.bin',
  'night.json',
  'animated.json',
  'context.glb',
  'context-instances.bin',
  'context-lamps.bin',
  'context.json',
];

/** Release asset name of a park file (release assets are a flat list). */
export const assetName = (park, file) => `${park}.${file}`;

/**
 * Manifest of the park folders under `dir` (dir/<park>/<file>).
 * @param {string} dir      folder with one subfolder per park
 * @param {string[]} parks  park keys to include (missing folders are skipped)
 * @param {{ tag: string, published?: string }} release  release tag ('bundled' for the app's own copy)
 */
export async function buildManifest(dir, parks, { tag, published = new Date().toISOString() }) {
  const manifest = { format: MANIFEST_FORMAT, tag, published, parks: {} };
  for (const park of parks) {
    const files = {};
    for (const name of APP_FILES) {
      const data = await fs.readFile(path.join(dir, park, name)).catch(() => null);
      if (!data) continue;
      files[name] = {
        size: data.length,
        sha256: crypto.createHash('sha256').update(data).digest('hex'),
        asset: assetName(park, name),
      };
    }
    if (Object.keys(files).length) manifest.parks[park] = { files };
  }
  return manifest;
}
