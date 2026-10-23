// Exports the static 3D world of each park as one binary glTF for the native
// mobile app (Filament / gltfio): starts the Vite dev server, opens
// export.html in headless Google Chrome (WebGL through SwiftShader), waits for
// the page to POST the file (pipeline/vite-export.js) and prints a summary.
//
// Usage: node pipeline/export-glb.js [park] [--trees=instanced|merged|both] [--mobile [--no-instances] [--no-meshopt] [--no-context] | --models-only] [--android[=<assets/parks dir>]]
//   park       xc, xh… (all parks by default)
//   --trees    instanced (default): park.glb with EXT_mesh_gpu_instancing
//              merged: park-merged.glb, trees baked as plain geometry
//              both: the two files
//   --mobile   park-models.glb only, what the Android app loads: terrain,
//              water and models, stone paving draped over the terrain; no
//              routes (the app draws them) nor shadow layer (baked); trees and
//              buses as one proto:<type> node each + instances.bin (copies);
//              the moving parts as anim:* nodes + animated.json (src/export/animated.js)
//   --no-instances  with --mobile: trees and buses baked into the GLB as before
//              (merged geometry, no instances.bin), e.g. to compare
//   --no-meshopt  with --mobile: skip the geometry compression the dev server
//              applies to park-models.glb by default (pipeline/lib/meshopt.js:
//              reorder + KHR_mesh_quantization + EXT_meshopt_compression on
//              everything except the proto:* and anim:* nodes, which stay plain float32)
//   --no-context  with --mobile: skip the context bundle. By default, a park with
//              neighbors (shared/neighbors.js: xc, xp, xs and the region xcr)
//              also gets context.glb + context-instances.bin + context.json
//              (src/export/context.js: neighbor ground, water and trees in its
//              frame, for the app) and context-preview.png. --no-instances
//              skips it too (its trees use the park's proto:* nodes)
//   --models-only  park-models-only.glb: no terrain, water or routes, with
//              flat paving + contact shadows, for a viewer showing its own map
//   --android  also copies dist-mobile/<park>/ (GLB files + park.json, night and context files) into the
//              Android app's assets (default ANDROID_ASSETS below); with --mobile it also writes
//              manifest.json there (pipeline/lib/models-manifest.js, tag "bundled")
//   CHROME=<path> overrides the browser executable.
//
// Output: dist-mobile/<park>/park.glb, park.json, *-preview.png (+ instances.bin, lamps.bin, nightlight.png,
// night.json, animated.json with --mobile, park.json with `entrance`; + context.glb, context-instances.bin, context-lamps.bin,
// context.json, context-preview.png for parks with neighbors)
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createServer } from 'vite';
import { PARKS, SELECTABLE_PARKS } from '#parks/index.js';
import { findNeighbors } from '#shared/neighbors.js';
import { MOBILE_DIR, exportEvents } from './vite-export.js';
import { expandPrototypes, parseGlb, summarizeGlb } from './lib/glb.js';
import { decodeInstances } from '#shared/formats/instances.js';
import { decodeLamps } from '#shared/formats/lamps.js';
import { parkEntrance } from './stages/park-data.js';
import { buildManifest } from './lib/models-manifest.js';

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ANDROID_ASSETS = path.join(os.homedir(), 'AndroidStudioProjects/Parquex/app/src/main/assets/parks');
const TIMEOUT_MS = 5 * 60_000;
const MAX_MB = 25;
/** Extensions a stock Filament gltfio build may not handle (UV transforms are baked instead). */
const AVOID = /^(KHR_texture_transform|KHR_materials_(?!unlit|emissive_strength)|EXT_texture_webp)/;

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
const flagValue = (name, fallback) => flag(name)?.split('=')[1] ?? (flag(name) ? fallback : undefined);
const parks = args.filter((a) => !a.startsWith('--'));
// regions (src/parks/xcr) are web-only scenery, never exported
const keys = parks.length ? parks : SELECTABLE_PARKS;
for (const k of keys) if (!SELECTABLE_PARKS.includes(k)) throw new Error(`Unknown park "${k}" (known: ${SELECTABLE_PARKS.join(', ')})`);
const treeModes = { instanced: ['instanced'], merged: ['merged'], both: ['instanced', 'merged'] }[
  flagValue('trees', 'instanced') ?? 'instanced'
];
if (!treeModes) throw new Error('--trees must be instanced, merged or both');
const modelsOnly = Boolean(flag('models-only'));
const mobile = Boolean(flag('mobile'));
const noInstances = Boolean(flag('no-instances'));
const meshopt = mobile && !flag('no-meshopt') ? '&meshopt' : '';
/** Night mode files (src/export/night.js) and moving parts (src/export/animated.js) written next to park-models.glb. */
const MOBILE_FILES = ['lamps.bin', 'nightlight.png', 'night.json', 'animated.json'];
/** Written to dist-mobile/ but not copied to the Android assets. */
const ANDROID_SKIP = new Set(['nightlight.png']);
/** [file, query, extra files written by the page] of each GLB to export per park */
const variants = mobile
  ? [
      noInstances
        ? ['park-models.glb', `trees=merged&mobile&instances=0${meshopt}`, MOBILE_FILES]
        : ['park-models.glb', `trees=merged&mobile${meshopt}`, ['instances.bin', ...MOBILE_FILES]],
    ]
  : modelsOnly
    ? [['park-models-only.glb', 'trees=merged&models']]
    : treeModes.map((t) => [t === 'instanced' ? 'park.glb' : `park-${t}.glb`, `trees=${t}`]);
const android = flagValue('android', ANDROID_ASSETS);
/** Files of the context bundle (src/export/context.js), next to park-models.glb. */
const CONTEXT_FILES = ['context.glb', 'context-instances.bin', 'context-lamps.bin', 'context.json'];
const context = mobile && !noInstances && !flag('no-context');
const PUBLIC_PARKS = path.resolve(import.meta.dirname, '..', 'public', 'parks');
/** park.json (+ key) of every park and region, for the neighbor search */
const parkJsons = context
  ? await Promise.all(
      Object.keys(PARKS).map(async (key) => ({ ...JSON.parse(await fs.readFile(path.join(PUBLIC_PARKS, key, 'park.json'), 'utf8')), key })),
    )
  : [];
const hasNeighbors = (key) =>
  findNeighbors(
    parkJsons.find((p) => p.key === key),
    parkJsons.filter((p) => p.key !== key),
  ).length > 0;

const server = await createServer({ server: { port: 5199, strictPort: false, host: '127.0.0.1' }, logLevel: 'warn' });
await server.listen();
const base = server.resolvedUrls.local[0];
const profile = await fs.mkdtemp(path.join(os.tmpdir(), 'xh-export-chrome-'));
/** GLB size before the dev server compressed it, by `<park>/<file>` */
const rawSizes = new Map();
exportEvents.on('saved', (e) => rawSizes.set(`${e.park}/${e.file}`, e.rawBytes));
let failed = false;
try {
  for (const key of keys) {
    for (const [file, query] of variants) {
      console.log(`\n▶ ${key} (${file})`);
      const started = Date.now();
      const summary = await runPage(`${base}export.html?park=${key}&${query}&save&preview`, key);
      // a baked GLB must not travel with the copies of a previous export
      if (mobile && noInstances) await fs.rm(path.join(MOBILE_DIR, key, 'instances.bin'), { force: true });
      const bytes = await fs.readFile(path.join(MOBILE_DIR, key, file));
      const instances = summary.info.instances ? await fs.readFile(path.join(MOBILE_DIR, key, 'instances.bin')) : null;
      report(key, file, bytes, summary, Date.now() - started, instances, rawSizes.get(`${key}/${file}`));
      if (mobile) await reportNight(key);
      if (mobile) await reportAnimated(key, bytes);
    }
    let withContext = false;
    if (context) {
      if (hasNeighbors(key)) {
        console.log(`\n▶ ${key} (context bundle)`);
        const started = Date.now();
        const summary = await runPage(`${base}export.html?park=${key}&context${meshopt}&save&preview`, key);
        await reportContext(key, summary, Date.now() - started, rawSizes.get(`${key}/context.glb`));
        withContext = true;
      } else {
        // no neighbors (any more): no stale bundle next to the park
        for (const name of CONTEXT_FILES) await fs.rm(path.join(MOBILE_DIR, key, name), { force: true });
        console.log(`  ${key}: no neighbors, no context bundle`);
      }
    }
    // after every save (the dev server copies public/parks/<key>/park.json each time)
    if (mobile) await writeMobileParkJson(key);
    if (android) {
      const dest = path.join(android, key);
      await fs.mkdir(dest, { recursive: true });
      const names = ['park.json', ...variants.flatMap(([file, , extra = []]) => [file, ...extra]), ...(withContext ? CONTEXT_FILES : [])];
      // nightlight.png is a debug copy: the app reads the light map from the GLB (nightlight-* textures)
      const copied = names.filter((name) => !ANDROID_SKIP.has(name));
      for (const name of copied) await fs.copyFile(path.join(MOBILE_DIR, key, name), path.join(dest, name));
      for (const name of ANDROID_SKIP) await fs.rm(path.join(dest, name), { force: true });
      if (mobile && noInstances) await fs.rm(path.join(dest, 'instances.bin'), { force: true });
      if (context && !withContext) for (const name of CONTEXT_FILES) await fs.rm(path.join(dest, name), { force: true });
      console.log(`  copied ${copied.join(', ')} → ${dest}`);
    }
  }
  // the app's own copy: manifest of what it carries (tag "bundled"), to compare with published releases
  if (android && mobile) {
    const manifest = await buildManifest(android, SELECTABLE_PARKS, { tag: 'bundled' });
    await fs.writeFile(path.join(android, 'manifest.json'), JSON.stringify(manifest, null, 1));
    console.log(`\n  manifest.json → ${android} (${Object.keys(manifest.parks).join(', ')})`);
  }
} catch (err) {
  failed = true;
  console.error(`\n✗ ${err.message}`);
} finally {
  await server.close();
  await fs.rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
process.exit(failed ? 1 : 0);

/**
 * dist-mobile/<key>/park.json: public/parks/<key>/park.json plus `entrance`
 * (the start of simulated walks, as the web picks it: pipeline/stages/park-data.js
 * → parkEntrance), when it does not have it yet. Nothing else changes.
 */
async function writeMobileParkJson(key) {
  const file = path.join(MOBILE_DIR, key, 'park.json');
  const park = JSON.parse(await fs.readFile(path.join(PUBLIC_PARKS, key, 'park.json'), 'utf8'));
  if (!park.entrance) park.entrance = parkEntrance(park, PARKS[key].sources?.entrance);
  await fs.writeFile(file, JSON.stringify(park));
  console.log(`  park.json: entrance ${JSON.stringify(park.entrance)}`);
}

/** lamps.bin, nightlight.png and night.json of a park: counts, sizes, materials with a night strength. */
async function reportNight(key) {
  const dir = path.join(MOBILE_DIR, key);
  const kb = async (name) => `${((await fs.stat(path.join(dir, name))).size / 1024).toFixed(1)} KB`;
  const lamps = decodeLamps(await fs.readFile(path.join(dir, 'lamps.bin')));
  const night = JSON.parse(await fs.readFile(path.join(dir, 'night.json'), 'utf8'));
  console.log(
    `  night: lamps.bin ${await kb('lamps.bin')} (${lamps.length} lamps, ${night.lamps.piers} on piers), ` +
      `nightlight.png ${await kb('nightlight.png')}, night.json ${await kb('night.json')}`,
  );
  console.log(`  night strengths: ${night.materials.list.map((m) => `${m.name} ${m.day}→${m.night}`).join(', ')}`);
}

/** animated.json against the anim:* nodes of park-models.glb: pieces, drivers, vertices the app moves per frame. */
async function reportAnimated(key, bytes) {
  const json = JSON.parse(await fs.readFile(path.join(MOBILE_DIR, key, 'animated.json'), 'utf8'));
  const nodes = new Map(summarizeGlb(parseGlb(bytes)).animated.map((n) => [`anim:${n.name}`, n]));
  if (!json.pieces.length && !nodes.size) return console.log('  animated: none');
  const used = new Set();
  let vertices = 0;
  for (const piece of json.pieces) {
    const parts = piece.parts.map((name) => {
      used.add(name);
      const node = nodes.get(name);
      if (!node) console.warn(`  ⚠ ${piece.id}: no ${name} node`);
      else if (node.issues.length) console.warn(`  ⚠ ${name}: ${node.issues.join(', ')}`);
      return node;
    });
    const copies = piece.params.flies?.length ?? piece.params.birds?.length ?? 1;
    const v = parts.reduce((n, p) => n + (p?.vertices ?? 0), 0) * copies;
    vertices += v;
    console.log(
      `  animated ${piece.id} (${piece.driver}): ${parts.length} part(s) × ${copies}, ${v} vertices, ${parts.reduce((n, p) => n + (p?.primitives ?? 0), 0)} primitive(s)`,
    );
  }
  for (const name of nodes.keys()) if (!used.has(name)) console.warn(`  ⚠ ${name} not used by animated.json`);
  console.log(`  animated: ${json.pieces.length} pieces, ${vertices} vertices moved per frame`);
}

/** Opens the export page in headless Chrome and resolves with the page's summary once it is done. */
function runPage(url, park) {
  return new Promise((resolve, reject) => {
    const chrome = spawn(
      CHROME,
      [
        '--headless=new',
        '--use-angle=swiftshader',
        '--enable-unsafe-swiftshader',
        '--ignore-gpu-blocklist',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-extensions',
        `--user-data-dir=${profile}`,
        '--window-size=1600,1100',
        url,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'] },
    );
    let stderr = '';
    chrome.stderr.on('data', (d) => (stderr = (stderr + d).slice(-4000)));
    const finish = (fn, value) => {
      clearTimeout(timer);
      exportEvents.off('done', onDone);
      exportEvents.off('error', onError);
      chrome.off('exit', onExit);
      if (chrome.exitCode == null) {
        chrome.once('exit', () => fn(value)); // its profile folder can be removed afterwards
        chrome.kill();
      } else fn(value);
    };
    const onDone = (e) => e.park === park && finish(resolve, e.summary);
    const onError = (e) => e.park === park && finish(reject, new Error(`export page failed:\n${e.message}`));
    const onExit = (code) => finish(reject, new Error(`Chrome exited (${code}) before the export finished\n${stderr}`));
    const timer = setTimeout(() => finish(reject, new Error(`timed out after ${TIMEOUT_MS / 1000} s\n${stderr}`)), TIMEOUT_MS);
    exportEvents.on('done', onDone);
    exportEvents.on('error', onError);
    chrome.on('exit', onExit);
    chrome.on('error', (err) => finish(reject, new Error(`cannot start Chrome (${CHROME}): ${err.message}; set CHROME=<path>`)));
  });
}

function report(key, file, bytes, page, ms, instances, rawBytes = bytes.length) {
  const glb = parseGlb(bytes);
  const s = summarizeGlb(glb);
  const mb = bytes.length / 1048576;
  const decoded = s.textures.reduce((a, t) => a + t.decodedBytes, 0) / 1048576;
  const compressed =
    rawBytes !== bytes.length
      ? ` (${(rawBytes / 1048576).toFixed(2)} MB before compression, −${(100 * (1 - bytes.length / rawBytes)).toFixed(0)}%)`
      : '';
  console.log(`  ${path.join('dist-mobile', key, file)}: ${mb.toFixed(2)} MB${compressed} in ${(ms / 1000).toFixed(1)} s`);
  console.log(
    `  draw calls ${s.drawCalls}, meshes ${s.meshes}, materials ${s.materials}, triangles ${Math.round(s.triangles).toLocaleString('en')}`,
  );
  console.log(`  trees ${page.info.trees} ${JSON.stringify(page.info.treesByType)}`);
  for (const n of s.instancedNodes) console.log(`  instanced ${n.name}: ${n.instances} × ${n.trianglesEach} triangles`);
  if (instances) reportInstances(glb, s, instances);
  else if (s.prototypes.length) console.warn(`  ⚠ ${s.prototypes.length} proto:* nodes but no instances.bin`);
  console.log(`  textures ${s.textures.length} (${decoded.toFixed(1)} MB decoded RGBA):`);
  for (const t of s.textures)
    console.log(`    ${t.name || '(unnamed)'} ${t.mimeType} ${t.width}×${t.height} ${(t.bytes / 1024).toFixed(0)} KB`);
  console.log(`  extensionsUsed: ${s.extensionsUsed.join(', ') || '(none)'}`);
  console.log(`  extensionsRequired: ${s.extensionsRequired.join(', ') || '(none)'}`);
  const meshoptViews = (glb.json.bufferViews ?? []).map((v) => [v.byteLength, v.extensions?.EXT_meshopt_compression?.byteLength]);
  const packed = meshoptViews.filter(([, c]) => c != null);
  if (packed.length) {
    const sum = (i) => packed.reduce((t, v) => t + v[i], 0) / 1048576;
    console.log(`  meshopt: ${packed.length} buffer views, geometry ${sum(0).toFixed(2)} MB → ${sum(1).toFixed(2)} MB`);
  }
  const avoid = s.extensionsUsed.filter((e) => AVOID.test(e));
  if (avoid.length) console.warn(`  ⚠ extensions Filament may not handle: ${avoid.join(', ')}`);
  const tiny = s.textures.filter((t) => t.width <= 1 || t.height <= 1);
  if (tiny.length) console.warn(`  ⚠ 1×1 textures (image released before export?): ${tiny.map((t) => t.name).join(', ')}`);
  if (mb > MAX_MB) console.warn(`  ⚠ larger than ${MAX_MB} MB`);
  if (page.info.skipped.length) console.warn(`  ⚠ skipped meshes: ${page.info.skipped.join(', ')}`);
  for (const w of page.info.instanceWarnings ?? []) console.warn(`  ⚠ instances: ${w}`);
}

/**
 * Context bundle summary: sizes, draw calls, triangles, texture, the trees the
 * app draws with the focused park's prototypes, per neighbor.
 */
async function reportContext(key, page, ms, rawBytes) {
  const dir = path.join(MOBILE_DIR, key);
  const bytes = await fs.readFile(path.join(dir, 'context.glb'));
  const instances = await fs.readFile(path.join(dir, 'context-instances.bin'));
  const glb = parseGlb(bytes);
  const s = summarizeGlb(glb);
  const mb = (n) => `${(n / 1048576).toFixed(2)} MB`;
  const before = rawBytes && rawBytes !== bytes.length ? ` (${mb(rawBytes)} before compression)` : '';
  console.log(`  ${path.join('dist-mobile', key, 'context.glb')}: ${mb(bytes.length)}${before} in ${(ms / 1000).toFixed(1)} s`);
  console.log(`  draw calls ${s.drawCalls}, meshes ${s.meshes}, triangles ${Math.round(s.triangles).toLocaleString('en')}`);
  for (const t of s.textures)
    console.log(`    ${t.name || '(unnamed)'} ${t.mimeType} ${t.width}×${t.height} ${(t.bytes / 1024).toFixed(0)} KB`);
  console.log(`  extensionsRequired: ${s.extensionsRequired.join(', ') || '(none)'}`);
  if (s.prototypes.length) console.warn(`  ⚠ context.glb has ${s.prototypes.length} proto:* nodes (it should use the park's)`);
  const types = decodeInstances(instances);
  const protos = summarizeGlb(parseGlb(await fs.readFile(path.join(dir, 'park-models.glb')))).prototypes.map((p) => p.name);
  const total = types.reduce((a, t) => a + t.records.length, 0);
  console.log(
    `  context-instances.bin ${(instances.length / 1024).toFixed(1)} KB, ${total} trees: ${types.map((t) => `${t.name} ${t.records.length}`).join(', ')}`,
  );
  for (const t of types) if (!protos.includes(t.name)) console.warn(`  ⚠ ${t.name}: no proto:${t.name} in park-models.glb`);
  for (const n of page.info.neighbors)
    console.log(
      `    ${n.key}${n.region ? ' (region)' : ''}: ground ${n.ground?.triangles ?? 0} triangles, water ${n.water?.triangles ?? 0}, ` +
        `trees ${n.trees.count} (stride ${n.trees.stride}, medium ×${n.trees.quality.medium}, low ×${n.trees.quality.low})`,
    );
}

/** instances.bin size, copies per type and what the app rebuilds from the prototypes. */
function reportInstances(glb, s, instances) {
  const types = decodeInstances(instances);
  const expanded = expandPrototypes(glb, types);
  const total = Object.values(expanded).reduce((a, e) => a + e.triangles, 0);
  console.log(
    `  instances.bin ${(instances.length / 1024).toFixed(1)} KB, ${types.length} types (app draws +${Math.round(total).toLocaleString('en')} triangles):`,
  );
  for (const p of s.prototypes) {
    const e = expanded[p.name];
    const box = e ? ` box [${e.min.map((v) => v.toFixed(0))}]..[${e.max.map((v) => v.toFixed(0))}]` : '';
    console.log(`    proto:${p.name}: ${p.primitives} primitive(s), ${p.triangles} triangles × ${e?.copies ?? 0} copies${box}`);
    if (p.issues.length) console.warn(`    ⚠ proto:${p.name}: ${p.issues.join(', ')}`);
  }
  for (const t of types)
    if (!s.prototypes.some((p) => p.name === t.name)) console.warn(`  ⚠ instances.bin type ${t.name} without proto node`);
}
