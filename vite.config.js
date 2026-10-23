import { defineConfig } from 'vite';
import { mobileExportPlugin } from './pipeline/vite-export.js';

export default defineConfig({
  // where the site is served from: '/' locally, '/<repo>/' on GitHub Pages (pipeline/deploy-pages.js)
  base: process.env.BASE_PATH ?? '/',
  appType: 'spa', // /xc/es, /xh/en… all serve index.html
  plugins: [mobileExportPlugin()], // dev only: export.html → dist-mobile/ (pnpm export:glb)
  server: { host: true, port: 5173 },
  build: { chunkSizeWarningLimit: 1200 },
  test: { include: ['tests/**/*.test.js'] },
});
