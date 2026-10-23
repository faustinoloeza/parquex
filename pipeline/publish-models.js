// Publishes the exported mobile models (dist-mobile/, `pnpm export:mobile`) as
// a GitHub release of this repository, so installed apps can update their
// models without a new app version (docs/app-movil-noche-navegacion.md →
// Actualización de modelos). The release holds manifest.json (sizes and
// SHA-256 of every file) and one asset per park file, named <park>.<file>.
// Apps read https://github.com/<owner>/<repo>/releases/latest/download/manifest.json.
//
// Usage: node pipeline/publish-models.js [--dry-run] [--notes="…"]
//   --dry-run  only writes dist-mobile/manifest.json and lists the assets
// Needs the GitHub CLI (`gh`), logged in, inside the repository's clone.
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { SELECTABLE_PARKS } from '#parks/index.js';
import { MOBILE_DIR } from './vite-export.js';
import { buildManifest } from './lib/models-manifest.js';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const notes = args.find((a) => a.startsWith('--notes='))?.slice('--notes='.length) ?? 'Modelos exportados para la app móvil.';

const now = new Date();
const tag = `models-${now.toISOString().slice(0, 16).replace(/[-:]/g, '').replace('T', '-')}`; // models-20261023-0710
const manifest = await buildManifest(MOBILE_DIR, SELECTABLE_PARKS, { tag, published: now.toISOString() });
const parks = Object.keys(manifest.parks);
if (!parks.length) throw new Error('dist-mobile/ has no exported parks: run `pnpm export:mobile` first');
await fs.writeFile(path.join(MOBILE_DIR, 'manifest.json'), JSON.stringify(manifest, null, 1));

// release assets are flat: copy each file under its asset name
const staging = await fs.mkdtemp(path.join(os.tmpdir(), 'xh-models-'));
const assets = [path.join(MOBILE_DIR, 'manifest.json')];
let bytes = 0;
for (const park of parks)
  for (const [name, file] of Object.entries(manifest.parks[park].files)) {
    const to = path.join(staging, file.asset);
    await fs.copyFile(path.join(MOBILE_DIR, park, name), to);
    assets.push(to);
    bytes += file.size;
  }
console.log(`${tag}: ${parks.join(', ')} — ${assets.length} assets, ${(bytes / 1048576).toFixed(1)} MB`);

if (dryRun) console.log('dry run: dist-mobile/manifest.json written, nothing published');
else {
  const gh = spawnSync('gh', ['release', 'create', tag, '--title', `Modelos ${tag.slice(7)}`, '--notes', notes, '--latest', ...assets], {
    stdio: 'inherit',
  });
  if (gh.error) throw new Error(`cannot run the GitHub CLI (gh): ${gh.error.message}. Install it and run \`gh auth login\``);
  if (gh.status !== 0) process.exitCode = gh.status;
}
await fs.rm(staging, { recursive: true, force: true });
