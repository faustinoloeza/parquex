/** FPS, draw calls, triangles, pixel ratio and video memory (enable with ?stats). */
export function createStatsOverlay(root, app) {
  const el = document.createElement('div');
  el.className = 'stats';
  root.appendChild(el);
  let acc = 0,
    frames = 0,
    memory = '',
    lastMemory = 0;
  app.onFrame = (dt) => {
    acc += dt;
    frames++;
    if (acc < 0.5) return;
    const { calls, triangles, pixelRatio } = app.renderStats();
    if (performance.now() - lastMemory > 2000) {
      const m = app.memoryStats();
      memory = ` · ~${Math.round((m.geometry + m.texture) / 1e6)} MB GPU`;
      lastMemory = performance.now();
    }
    el.textContent = `${Math.round(frames / acc)} fps · ${calls} draws · ${(triangles / 1e6).toFixed(2)}M tris · px ${pixelRatio}${memory}`;
    acc = 0;
    frames = 0;
  };
  return el;
}
