// Publishes the web map on GitHub Pages without GitHub Actions: builds it with
// Vite under the repository's path (/<repo>/, vite.config.js → base), adds
// 404.html (so deep links such as /<repo>/xc/es open the map) and .nojekyll,
// and pushes the result as the `gh-pages` branch, replacing its previous
// content. Pages setting: Deploy from a branch → gh-pages, / (root).
//
// Usage: node pipeline/deploy-pages.js [--dry-run]
//   --dry-run  builds dist/ and stops before pushing
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const dryRun = process.argv.includes('--dry-run');
const git = (args, opts = {}) => execFileSync('git', args, { encoding: 'utf8', cwd: root, ...opts }).trim();

const remote = git(['remote', 'get-url', 'origin']);
const repo = remote.match(/[/:]([^/]+?)(\.git)?$/)?.[1];
if (!repo) throw new Error(`cannot tell the repository name from the origin remote (${remote})`);
const base = process.env.BASE_PATH ?? `/${repo}/`;
const commit = git(['rev-parse', '--short', 'HEAD']);

console.log(`building for ${base} (${commit})…`);
execFileSync(path.join(root, 'node_modules', '.bin', 'vite'), ['build'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: base },
});
const dist = path.join(root, 'dist');
await fs.copyFile(path.join(dist, 'index.html'), path.join(dist, '404.html'));
await fs.writeFile(path.join(dist, '.nojekyll'), '');

if (dryRun) console.log('dry run: dist/ is ready, nothing pushed');
else {
  // a fresh one-commit repository with dist/ as its content, pushed over gh-pages
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'xh-pages-'));
  try {
    await fs.cp(dist, tmp, { recursive: true });
    git(['init', '-q', '-b', 'gh-pages'], { cwd: tmp });
    git(['add', '-A'], { cwd: tmp });
    git(['commit', '-q', '-m', `Sitio publicado desde ${commit}`], { cwd: tmp });
    execFileSync('git', ['push', '--force', remote, 'gh-pages'], { cwd: tmp, stdio: 'inherit' });
    console.log(`published: https://<user>.github.io${base} (Pages source: gh-pages, / (root))`);
  } finally {
    await fs.rm(tmp, { recursive: true, force: true });
  }
}
