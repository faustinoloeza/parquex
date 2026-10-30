// Vite plugins that make the map start sooner:
//
//  - preloadParkData (dev and build): an inline script in index.html that starts
//    downloading the data of the park in the URL (park.json, heights, trees,
//    ground, water…) while the app's JavaScript is still loading. Same URLs and
//    request mode as src/app/assets.js, so the app takes these responses.
//  - gzipBinaryData (build): a gzip copy of every binary data file
//    (dist/parks/<key>/*.bin → *.bin.gz, about half the size). Static hosts
//    (Cloudflare, GitHub Pages) compress text on the fly — JS, CSS, JSON — but
//    not binary files; the app fetches the copies and unpacks them in the
//    browser (src/app/assets.js → fetchBinary). Also a lossless WebP copy of
//    each water map (water.png → water.webp, less than half the size, the same
//    values: it is data, shared/formats/water.js).
import fs from 'node:fs/promises';
import path from 'node:path';
import { gzipSync, constants } from 'node:zlib';
import { SELECTABLE_PARKS, DEFAULT_PARK } from '../src/parks/index.js';
import { groundTileId, groundTilePath } from '../shared/formats/ground-tiles.js';
import { PAVING_FILE } from '../shared/formats/paving.js';

/** Extension of the packed copies (src/app/assets.js asks for `<file>.gz`). */
export const GZIP_SUFFIX = '.gz';
/** Lossless WebP copy of water.png (src/app/assets.js → loadWater). */
export const WATER_WEBP = 'water.webp';

/**
 * The park's start-up files, as loadParkAssets() requests them.
 * @param {boolean} packed  binary files as their gzip copies (production)
 */
export function startupFiles(packed) {
  const bin = (name) => name + (packed ? GZIP_SUFFIX : '');
  return [
    'park.json',
    bin('height.bin'),
    bin('vegetation.bin'),
    groundTilePath(groundTileId(0, 0, 0)),
    packed ? WATER_WEBP : 'water.png',
    'buildings.json',
    PAVING_FILE,
  ];
}

export function preloadParkData() {
  let base = '/';
  let packed = false;
  return {
    name: 'preload-park-data',
    configResolved(config) {
      base = config.base;
      packed = config.command === 'build';
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (path.basename(ctx.filename) !== 'index.html') return html;
        // plain ES5: it runs before anything else, in any browser
        // binary files as their gzip copies only where the app can unpack them (DecompressionStream)
        const script = `(function () {
  var base = ${JSON.stringify(base)}, parks = ${JSON.stringify(SELECTABLE_PARKS)};
  var files = typeof DecompressionStream === 'undefined' ? ${JSON.stringify(startupFiles(false))} : ${JSON.stringify(startupFiles(packed))};
  var path = location.pathname.indexOf(base) === 0 ? location.pathname.slice(base.length) : location.pathname;
  var key = (path.split('/').filter(Boolean)[0] || '').toLowerCase();
  if (parks.indexOf(key) < 0) key = ${JSON.stringify(DEFAULT_PARK)};
  files.forEach(function (file) {
    var link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
    link.href = base + 'parks/' + key + '/' + file;
    document.head.appendChild(link);
  });
})();`;
        return { html, tags: [{ tag: 'script', children: script, injectTo: 'head-prepend' }] };
      },
    },
  };
}

export function gzipBinaryData() {
  let outDir = 'dist';
  return {
    name: 'gzip-binary-data',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const parks = path.join(outDir, 'parks');
      const files = (await fs.readdir(parks, { recursive: true })).filter((f) => f.endsWith('.bin'));
      let before = 0,
        after = 0;
      for (const file of files) {
        const data = await fs.readFile(path.join(parks, file));
        const packed = gzipSync(data, { level: constants.Z_BEST_COMPRESSION });
        await fs.writeFile(path.join(parks, file + GZIP_SUFFIX), packed);
        before += data.length;
        after += packed.length;
      }
      const kb = (n) => `${Math.round(n / 1024)} kB`;
      console.log(`gzip-binary-data: ${files.length} files, ${kb(before)} → ${kb(after)}`);

      // water maps as lossless WebP (exact: every value kept); without sharp the app keeps the PNGs
      const sharp = await import('sharp').then((m) => m.default).catch(() => null);
      if (!sharp) return console.warn('gzip-binary-data: sharp unavailable, water maps stay PNG');
      const waters = (await fs.readdir(parks, { recursive: true })).filter((f) => path.basename(f) === 'water.png');
      before = after = 0;
      for (const file of waters) {
        const png = path.join(parks, file);
        const webp = path.join(path.dirname(png), WATER_WEBP);
        await sharp(png).webp({ lossless: true, exact: true, effort: 6 }).toFile(webp);
        before += (await fs.stat(png)).size;
        after += (await fs.stat(webp)).size;
      }
      console.log(`gzip-binary-data: ${waters.length} water maps as WebP, ${kb(before)} → ${kb(after)}`);
    },
  };
}
