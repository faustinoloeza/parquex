// Mobile export page (export.html, dev server only): builds the static world
// of a park and writes it as one binary glTF for the native app.
//
//   /export.html?park=xc                 download park.glb from the browser
//   /export.html?park=xc&save            POST it to the dev server, which writes
//                                        dist-mobile/xc/park.glb (pipeline/vite-export.js)
//   &trees=merged                        trees as plain merged geometry (see export/vegetation.js)
//   &models                              models only + flat paving + contact shadows (park-models-only.glb)
//   &mobile                              what the Android app loads (park-models.glb, see park-scene.js),
//                                        trees and buses as prototypes + instances.bin (&instances=0: baked),
//                                        the night mode (export/night.js): lamps.bin, nightlight.png, night.json,
//                                        and the moving parts as anim:* prototypes + animated.json (export/animated.js)
//   &meshopt                             with &save: the dev server compresses the GLB (EXT_meshopt_compression +
//                                        KHR_mesh_quantization, proto:* nodes left plain; pipeline/lib/meshopt.js)
//   &preview                             load the GLB back and render it (saved as preview.png with &save; with
//                                        &meshopt the compressed file, read back from the dev server)
//   &context                             the context bundle instead (export/context.js): context.glb,
//                                        context-instances.bin, context-lamps.bin, context.json (neighbors around the park, for the
//                                        app); &preview draws it with the park-models.glb + instances.bin already
//                                        saved for the park (context-preview.png)
//
// pipeline/export-glb.js drives this page with headless Chrome.
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { PARKS } from '../parks/index.js';
import { loadParkAssets } from '../app/assets.js';
import { buildExportScene } from './park-scene.js';
import { renderContextPreview, renderPreview } from './preview.js';
import { buildContext } from './context.js';
import { nightJson } from './night.js';

const status = document.getElementById('status');
const log = (msg) => {
  status.textContent += msg + '\n';
  console.log(msg);
};

async function post(path, body, type) {
  const res = await fetch(path, { method: 'POST', body, headers: { 'Content-Type': type } });
  if (!res.ok) throw new Error(`${res.status} ${path}: ${await res.text()}`);
  return res.json().catch(() => ({}));
}

async function run() {
  const params = new URLSearchParams(location.search);
  const key = params.get('park') ?? 'xc';
  const trees = params.get('trees') ?? 'instanced';
  const save = params.has('save');
  const modelsOnly = params.has('models');
  const mobile = params.has('mobile');
  const useInstances = mobile && params.get('instances') !== '0';
  const file = params.get('file') ?? glbName(trees, { modelsOnly, mobile });
  const meshopt = save && params.has('meshopt');
  const parkDef = PARKS[key];
  if (!parkDef) throw new Error(`Unknown park "${key}"`);
  if (params.has('context')) return runContext(key, { save, meshopt, preview: params.has('preview') });

  log(`park ${key}: loading assets…`);
  const assets = await loadParkAssets(key);
  log('building scene…');
  const { scene, info, instances, night, animated } = await buildExportScene(parkDef, assets, {
    trees,
    modelsOnly,
    mobile,
    instances: useInstances,
  });
  log(`trees: ${info.trees} (${JSON.stringify(info.treesByType)}), mode ${info.treeMode}`);
  /** files written next to the GLB: night mode, moving parts */
  const extraFiles = night
    ? {
        'lamps.bin': [night.lampsBin, 'application/octet-stream'],
        'nightlight.png': [await new Promise((resolve) => night.light.toBlob(resolve, 'image/png')), 'image/png'],
        'night.json': [JSON.stringify(nightJson({ park: assets.park, key, night, scene }), null, 1), 'application/json'],
      }
    : {};
  if (animated) {
    extraFiles['animated.json'] = [JSON.stringify(animated, null, 1), 'application/json'];
    log(`animated: ${animated.pieces.length} pieces (${animated.pieces.map((p) => p.id).join(', ') || 'none'})`);
  }
  if (night) {
    info.night = { lamps: night.lamps.length, lampsBytes: night.lampsBin.byteLength };
    log(`night: ${night.lamps.length} lamps, lamps.bin ${(night.lampsBin.byteLength / 1024).toFixed(1)} KB`);
  }
  if (instances) log(`instances: ${JSON.stringify(info.instances)}, instances.bin ${(instances.byteLength / 1024).toFixed(1)} KB`);
  for (const w of info.instanceWarnings) log(`WARNING ${w}`);
  if (info.skipped.length) log(`skipped (custom shaders): ${info.skipped.join(', ')}`);

  log('exporting GLB…');
  let glb = await new GLTFExporter().parseAsync(scene, { binary: true, maxTextureSize: 4096 });
  log(`GLB: ${(glb.byteLength / 1048576).toFixed(2)} MB`);

  if (save) {
    const fileQuery = `?file=${encodeURIComponent(file)}`;
    const res = await post(`/__export/${key}${fileQuery}${meshopt ? '&meshopt' : ''}`, glb, 'model/gltf-binary');
    log(`saved ${res.path}${meshopt ? ` (meshopt: ${(res.bytes / 1048576).toFixed(2)} MB)` : ''}`);
    if (meshopt) glb = await (await fetch(`/__export/${key}${fileQuery}`)).arrayBuffer(); // preview what ships
    if (instances) log(`saved ${(await post(`/__export/${key}?file=instances.bin`, instances, 'application/octet-stream')).path}`);
    for (const [name, [body, type]] of Object.entries(extraFiles))
      log(`saved ${(await post(`/__export/${key}?file=${name}`, body, type)).path}`);
  } else {
    download(glb, file, 'model/gltf-binary');
    if (instances) download(instances, 'instances.bin', 'application/octet-stream');
    for (const [name, [body, type]] of Object.entries(extraFiles)) download(body, name, type);
  }

  if (params.has('preview')) {
    log('preview…');
    const png = await renderPreview(glb, assets.park, document.body, instances);
    if (save) await post(`/__export/${key}?file=${encodeURIComponent(file.replace(/\.glb$/, '-preview.png'))}`, png, 'image/png');
  }
  log('done');
  if (save) await post(`/__export/${key}/done`, JSON.stringify({ file, info }), 'application/json');
}

/** The context bundle of a park (export/context.js). */
async function runContext(key, { save, meshopt, preview }) {
  log(`park ${key}: context bundle…`);
  const built = await buildContext(key);
  const info = { neighbors: [] };
  if (built) {
    const { scene, instances, lamps, json } = built;
    for (const n of json.neighbors) {
      const trees = Object.entries(n.trees.types).map(([t, r]) => `${t} ${r.count}`);
      log(
        `${n.key}${n.region ? ' (region)' : ''}: ground ${n.ground?.triangles ?? 0} tris, water ${n.water?.triangles ?? 0} tris, ` +
          `trees ${n.trees.count} (stride ${n.trees.stride}: ${trees.join(', ')})`,
      );
      info.neighbors.push({
        key: n.key,
        region: n.region,
        ground: n.ground ?? null,
        water: n.water ?? null,
        trees: n.trees,
        lamps: n.lamps ?? null,
      });
    }
    log('exporting GLB…');
    let glb = await new GLTFExporter().parseAsync(scene, { binary: true, maxTextureSize: 1024 });
    log(`GLB: ${(glb.byteLength / 1048576).toFixed(2)} MB, context-instances.bin ${(instances.byteLength / 1024).toFixed(1)} KB`);
    log(`context-lamps.bin: ${json.lamps.count} lamps, ${(lamps.byteLength / 1024).toFixed(1)} KB`);
    info.lamps = json.lamps.count;
    const text = JSON.stringify(json, null, 1);
    if (save) {
      const res = await post(`/__export/${key}?file=context.glb${meshopt ? '&meshopt' : ''}`, glb, 'model/gltf-binary');
      log(`saved ${res.path}${meshopt ? ` (meshopt: ${(res.bytes / 1048576).toFixed(2)} MB)` : ''}`);
      if (meshopt) glb = await (await fetch(`/__export/${key}?file=context.glb`)).arrayBuffer();
      log(`saved ${(await post(`/__export/${key}?file=context-instances.bin`, instances, 'application/octet-stream')).path}`);
      log(`saved ${(await post(`/__export/${key}?file=context-lamps.bin`, lamps, 'application/octet-stream')).path}`);
      log(`saved ${(await post(`/__export/${key}?file=context.json`, text, 'application/json')).path}`);
    } else {
      download(glb, 'context.glb', 'model/gltf-binary');
      download(instances, 'context-instances.bin', 'application/octet-stream');
      download(lamps, 'context-lamps.bin', 'application/octet-stream');
      download(text, 'context.json', 'application/json');
    }
    if (preview) {
      log('preview…');
      const fetchSaved = async (file) => {
        const res = await fetch(`/__export/${key}?file=${file}`);
        return res.ok ? new Uint8Array(await res.arrayBuffer()) : null;
      };
      const parkGlb = await fetchSaved('park-models.glb');
      if (!parkGlb) throw new Error('context preview: export park-models.glb first (--mobile)');
      const png = await renderContextPreview({
        parkGlb: parkGlb.buffer,
        parkInstances: await fetchSaved('instances.bin'),
        contextGlb: glb,
        contextInstances: instances,
        park: await (await fetch(`/parks/${key}/park.json`)).json(),
        context: json,
        container: document.body,
      });
      if (save) await post(`/__export/${key}?file=context-preview.png`, png, 'image/png');
    }
  } else log('no neighbors: nothing to export');
  log('done');
  if (save) await post(`/__export/${key}/done`, JSON.stringify({ file: 'context.glb', info }), 'application/json');
}

function download(data, name, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type }));
  a.download = name;
  a.textContent = `download ${name}`;
  a.style.display = 'block';
  document.body.appendChild(a);
}

/** park.glb, park-merged.glb, park-models-only.glb, park-models.glb (mobile app) */
function glbName(trees, { modelsOnly, mobile }) {
  if (mobile) return 'park-models.glb';
  if (modelsOnly) return 'park-models-only.glb';
  return trees === 'instanced' ? 'park.glb' : `park-${trees}.glb`;
}

run().catch(async (err) => {
  log(`ERROR ${err.stack ?? err}`);
  const key = new URLSearchParams(location.search).get('park') ?? 'xc';
  await fetch(`/__export/${key}/error`, { method: 'POST', body: String(err.stack ?? err) }).catch(() => {});
});
