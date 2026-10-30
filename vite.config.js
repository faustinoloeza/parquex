import { defineConfig } from 'vite';
import { mobileExportPlugin } from './pipeline/vite-export.js';
import { gzipBinaryData, preloadParkData } from './pipeline/vite-fast-load.js';

export default defineConfig({
  // where the site is served from: '/' locally, '/<repo>/' on GitHub Pages (pipeline/deploy-pages.js)
  base: process.env.BASE_PATH ?? '/',
  appType: 'spa', // /xc/es, /xh/en… all serve index.html
  plugins: [
    mobileExportPlugin(), // dev only: export.html → dist-mobile/ (pnpm export:glb)
    preloadParkData(), // the park's data downloads alongside the app's script
    gzipBinaryData(), // build: gzip copies of the binary data (hosts only compress text)
  ],
  server: { host: true, port: 5173 },
  build: { chunkSizeWarningLimit: 1200 },
  test: { include: ['tests/**/*.test.js'] },
});
