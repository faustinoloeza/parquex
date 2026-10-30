/**
 * @typedef {object} QualityPreset
 * @property {number} pixelRatio   maximum device pixel ratio
 * @property {number} shadows      shadow map size (0 = no shadows)
 * @property {number} shadowEvery  frames between shadow map renders at most (Stage.updateShadows): phones
 *           re-render it less often while the view moves
 * @property {number} lod          camera distance (m) beyond which trees use cheap models (~90 → ~20
 *           triangles; a tree there is a few pixels wide)
 * @property {boolean} fauna       animated animals
 * @property {number} maxFps       frame rate cap while the view moves
 * @property {number} idleFps      frame rate cap when nothing moves (animations only)
 * @property {number} groundLevel  finest ground tile level streamed (shared/formats/ground-tiles.js)
 * @property {number} groundTiles  ground detail tiles kept in memory (~5.6 MB each)
 * @property {number} mapTiles     real-map tiles kept in memory (~0.35 MB each)
 * @property {number} mapDetail    map tile texels per screen pixel before using a finer zoom
 * @property {number} lamps        street lamps drawn at night at most (layers/lamps.js)
 * @property {{ treeStride: number, maxTrees: number, regionTrees: number } | null} neighbors  neighboring
 *           parks, lightweight (layers/neighbors.js): one tree in treeStride, at most maxTrees per park, at most
 *           regionTrees in a region (outside the parks); null = not shown (no preset does that: the parks next
 *           to each other always show together, only sparser)
 */

/** @type {Record<'high' | 'medium' | 'low', QualityPreset>} */
export const QUALITY_PRESETS = {
  high: {
    pixelRatio: 2,
    shadows: 2048,
    shadowEvery: 1,
    lod: 460,
    fauna: true,
    maxFps: 60,
    idleFps: 60,
    groundLevel: 2,
    groundTiles: 8,
    mapTiles: 96,
    mapDetail: 1.5,
    lamps: 2500,
    neighbors: { treeStride: 3, maxTrees: 4000, regionTrees: 6000 },
  },
  medium: {
    pixelRatio: 1.5,
    shadows: 1024,
    shadowEvery: 4,
    lod: 220,
    fauna: true,
    maxFps: 60,
    idleFps: 30,
    groundLevel: 2,
    groundTiles: 6,
    mapTiles: 64,
    mapDetail: 1.75,
    lamps: 1500,
    neighbors: { treeStride: 4, maxTrees: 2500, regionTrees: 3500 },
  },
  low: {
    pixelRatio: 1,
    shadows: 0,
    shadowEvery: 4,
    lod: 150,
    fauna: false,
    maxFps: 30,
    idleFps: 20,
    groundLevel: 1,
    groundTiles: 4,
    mapTiles: 40,
    mapDetail: 2.5,
    lamps: 700,
    neighbors: { treeStride: 6, maxTrees: 1200, regionTrees: 1500 },
  },
};
const ORDER = ['high', 'medium', 'low'];

/**
 * Starting level for 'auto' from what the browser tells about the device:
 * memory (Chromium only), CPU cores, touch screen and software rendering.
 * @param {string} [gpu] WebGL renderer name, if known
 * @returns {'high' | 'medium' | 'low'}
 */
export function detectQuality(gpu = '') {
  const memory = navigator.deviceMemory ?? 8; // GB, rounded down; undefined outside Chromium
  const cores = navigator.hardwareConcurrency ?? 4;
  const touch = matchMedia('(pointer: coarse)').matches;
  if (/swiftshader|llvmpipe|software|basic render/i.test(gpu)) return 'low';
  if (memory <= 2 || cores <= 2) return 'low';
  if (memory <= 4 || cores <= 4 || touch) return 'medium';
  return 'high';
}

/** Renderer name reported by WebGL (may be empty when the browser hides it). */
export function gpuName(renderer) {
  const gl = renderer.getContext();
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  return info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
}

/**
 * Applies graphics presets. In 'auto' mode it starts from detectQuality() and
 * steps down when frames stay slow while the user moves the map.
 */
export class QualityManager {
  /**
   * @param {import('./Stage.js').Stage} stage
   * @param {import('../layers/index.js').Layer[]} layers
   * @param {{ adaptive?: boolean, autoLevel?: 'high' | 'medium' | 'low' }} [options]
   */
  constructor(stage, layers, { adaptive = true, autoLevel = 'high' } = {}) {
    this.stage = stage;
    this.layers = layers;
    this.adaptive = adaptive;
    this.mode = 'auto';
    this.autoLevel = autoLevel;
    this.preset = QUALITY_PRESETS[autoLevel];
    this.perf = { acc: 0, frames: 0, slow: 0 };
    /** called when a change needs shaders recompiled (shadows on/off); returns a promise */
    this.onRecompile = null;
    /** called after the canvas was resized (it is blank until drawn) */
    this.onResize = null;
  }

  /** @param {'auto' | 'high' | 'medium' | 'low'} mode */
  set(mode) {
    this.mode = mode;
    const preset = (this.preset = QUALITY_PRESETS[mode === 'auto' ? this.autoLevel : mode]);
    const { renderer, sun } = this.stage;
    const shadows = preset.shadows > 0;
    const recompile = shadows !== sun.castShadow;
    renderer.shadowMap.enabled = shadows;
    sun.castShadow = shadows; // changes the lights state: lit materials get new programs
    if (shadows && sun.shadow.mapSize.x !== preset.shadows) {
      sun.shadow.mapSize.set(preset.shadows, preset.shadows);
      sun.shadow.map?.dispose();
      sun.shadow.map = null;
    }
    for (const layer of this.layers) layer.setQuality?.(preset);
    // a new pixel ratio resizes the canvas, which clears it: with shaders to
    // compile first (rendering pauses meanwhile) it waits for them, so the last
    // frame stays on screen, and the next one is drawn at once (onResize)
    const pixelRatio = Math.min(window.devicePixelRatio, preset.pixelRatio);
    const resize = () => {
      if (renderer.getPixelRatio() !== pixelRatio) renderer.setPixelRatio(pixelRatio);
      this.stage.resize();
      this.onResize?.();
    };
    if (recompile && this.onRecompile) this.onRecompile().then(resize);
    else resize();
  }

  /**
   * Call every rendered frame with the frame time. Only frames rendered while
   * the view moves count (idle frames are capped on purpose).
   */
  adapt(dt, active) {
    if (this.mode !== 'auto' || !this.adaptive || !active) return;
    const p = this.perf;
    p.acc += dt;
    p.frames++;
    if (p.acc < 2) return;
    const avg = p.acc / p.frames;
    p.acc = 0;
    p.frames = 0;
    p.slow = avg > Math.max(1 / 30, 1.6 / this.preset.maxFps) ? p.slow + 1 : 0;
    if (p.slow >= 2) {
      const i = ORDER.indexOf(this.autoLevel);
      if (i < ORDER.length - 1) {
        this.autoLevel = ORDER[i + 1];
        this.set('auto');
      }
      p.slow = 0;
    }
  }
}
