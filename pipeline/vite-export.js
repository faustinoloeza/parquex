// Vite dev-server plugin for the mobile export (export.html, src/export/):
//
//   POST /__export/<park>?file=park.glb   body → dist-mobile/<park>/<file> (.glb, .png, .bin or .json)
//                                         (also copies public/parks/<park>/park.json next to it)
//        …&meshopt                        a .glb is first compressed (pipeline/lib/meshopt.js:
//                                         EXT_meshopt_compression + KHR_mesh_quantization, proto:* untouched)
//   GET  /__export/<park>?file=park.glb   the file as written (the page previews the compressed GLB)
//   POST /__export/<park>/done            the page finished (JSON summary)
//   POST /__export/<park>/error           the page failed (error text)
//
// Only active with `vite` (serve), never in builds. pipeline/export-glb.js
// listens to `exportEvents` to know when the page is done.
import fs from 'node:fs/promises';
import path from 'node:path';
import { EventEmitter } from 'node:events';

export const MOBILE_DIR = path.resolve(import.meta.dirname, '..', 'dist-mobile');
const PUBLIC_PARKS = path.resolve(import.meta.dirname, '..', 'public', 'parks');

/**
 * Emits 'saved' ({ park, file, path, bytes, rawBytes }: rawBytes = size before compression), 'done' ({ park, summary }) and
 * 'error' ({ park, message }). Kept on a global symbol: Vite bundles its config
 * file, so this module may be loaded twice in the same process.
 */
export const exportEvents = (globalThis[Symbol.for('xcaret-maps-3d.mobile-export')] ??= new EventEmitter());

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

/** @returns {import('vite').Plugin} */
export function mobileExportPlugin() {
  return {
    name: 'mobile-export',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__export/', async (req, res) => {
        const send = (code, body) => {
          res.statusCode = code;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        };
        try {
          const url = new URL(req.url, 'http://localhost');
          const [park, action] = url.pathname.split('/').filter(Boolean);
          if (!/^[a-z0-9-]+$/.test(park ?? '')) return send(400, { error: 'bad park key' });
          const file = url.searchParams.get('file') ?? 'park.glb';
          const validFile = /^[\w.-]+\.(glb|png|bin|json)$/.test(file);
          if (req.method === 'GET' && !action && validFile) {
            res.setHeader('Content-Type', 'application/octet-stream');
            return res.end(await fs.readFile(path.join(MOBILE_DIR, park, file)));
          }
          if (req.method !== 'POST') return send(405, { error: 'POST only' });
          let body = await readBody(req);
          if (action === 'done') {
            exportEvents.emit('done', { park, summary: JSON.parse(body.toString() || '{}') });
            return send(200, {});
          }
          if (action === 'error') {
            exportEvents.emit('error', { park, message: body.toString() });
            return send(200, {});
          }
          if (!validFile) return send(400, { error: 'bad file name' });
          const dir = path.join(MOBILE_DIR, park);
          await fs.mkdir(dir, { recursive: true });
          const out = path.join(dir, file);
          const rawBytes = body.length;
          if (url.searchParams.has('meshopt') && file.endsWith('.glb')) {
            const { compressGlb } = await import('./lib/meshopt.js'); // gltf-transform + meshoptimizer, only when asked
            body = Buffer.from(await compressGlb(body));
          }
          await fs.writeFile(out, body);
          await fs.copyFile(path.join(PUBLIC_PARKS, park, 'park.json'), path.join(dir, 'park.json'));
          const relative = path.relative(process.cwd(), out);
          exportEvents.emit('saved', { park, file, path: out, bytes: body.length, rawBytes });
          const mb = (n) => `${(n / 1048576).toFixed(2)} MB`;
          server.config.logger.info(
            `mobile export: ${relative} (${rawBytes === body.length ? '' : `${mb(rawBytes)} → `}${mb(body.length)})`,
          );
          return send(200, { path: relative, bytes: body.length, rawBytes });
        } catch (err) {
          send(500, { error: String(err) });
        }
      });
    },
  };
}
