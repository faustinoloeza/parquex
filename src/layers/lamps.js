import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { capLamps, placeLampsAlong, placeLampsOver } from '#shared/lamps.js';
import { PAVING_SIZE } from '#shared/formats/paving.js';
import { NIGHT_COLORS, nightUniform } from '../graphics/night.js';
import { makeGroundHoles } from '#shared/ground-holes.js';
import { landmarkGroundHoles } from '../models/index.js';

/**
 * Look of the lamps (also written for the mobile app, export/night.js):
 * post height (m; the glowing head sits on top), post color and parts, the
 * glowing head (disc radius in m, never under minPx pixels), the night light
 * map (texels per side over park.extent, radius (m) of a lamp's pool of light,
 * paving glow: paving.png × pathGlow) and the camera distance (m) beyond which
 * posts are hidden (sub-pixel, only the heads show).
 */
export const LAMP_STYLE = {
  postHeight: 4.2,
  postColor: '#2c3036',
  pole: { radiusTop: 0.06, radiusBottom: 0.08, sides: 5 },
  lantern: { radiusTop: 0.22, radiusBottom: 0.12, height: 0.35, centerAbovePost: 0.12, sides: 5 },
  postSink: 0.1,
  head: { radius: 1.3, minPx: 3.2, aboveGround: 4.35 }, // center height above the ground (post + 0.15 m)
  lightMapSize: 1024,
  poolRadius: 10,
  pathGlow: 0.34,
  postDistance: 650,
};
const POST_HEIGHT = LAMP_STYLE.postHeight;
const LIGHT_MAP_SIZE = LAMP_STYLE.lightMapSize;
const POOL_RADIUS = LAMP_STYLE.poolRadius;
const PATH_GLOW = LAMP_STYLE.pathGlow;
const POST_DISTANCE = LAMP_STYLE.postDistance;

const headVertex = /* glsl */ `
  uniform vec2 uViewport;
  uniform float uSize;
  uniform float uMinPx;
  varying vec2 vQ;
  void main() {
    vec4 center = modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    vec4 clip = projectionMatrix * viewMatrix * center;
    // a disc facing the camera, uSize m in radius but never smaller than uMinPx pixels
    float px = max(uSize * projectionMatrix[1][1] * 0.5 * uViewport.y / clip.w, uMinPx);
    vQ = position.xy * 2.0; // -1 … 1
    clip.xy += vQ * (2.0 * px / uViewport) * clip.w;
    gl_Position = clip;
  }
`;
const headFragment = /* glsl */ `
  uniform float uNight;
  uniform vec3 uColor;
  uniform float uCore;
  varying vec2 vQ;
  void main() {
    float d = length(vQ);
    if (d > 1.0) discard;
    float core = smoothstep(0.42, 0.12, d);
    float halo = pow(1.0 - d, 1.6) * 0.85;
    vec3 c = mix(uColor, vec3(1.0, 0.96, 0.86), core * uCore) * (core + halo) * uNight;
    gl_FragColor = vec4(c, 1.0);
  }
`;

/**
 * Glowing disc facing the camera, `uSize` m in radius but never under `uMinPx`
 * pixels, white-hot at the core (uCore: 0 … 1) and `uColor` around it
 * (uniforms: uNight, uColor, uCore, uViewport, uSize, uMinPx): the lamp heads,
 * and the candle flames of the Día de Muertos theme (src/themes/muertos).
 */
export const GLOW_DISC = { vertexShader: headVertex, fragmentShader: headFragment };

/**
 * Light a seasonal theme adds at night (src/themes): the lamps' color, warm
 * strokes along lines (petal carpets) and small pools (candles) in the light map.
 * @typedef {object} ExtraLight
 * @property {string} [lampColor]
 * @property {number} [lampCore]  white-hot core of the lamp heads (0 … 1; 1 by default)
 * @property {{ lines: number[][][], width: number, alpha: number, color: string }} [strokes]  width in m
 * @property {number[][]} [pools]  [x, z, radius (m), alpha] each
 */

/**
 * Street lamps of the night mode (graphics/night.js): along the walkways and the
 * official routes (park.json) and over plazas and quays (paving.png), about
 * every 22 m (shared/lamps.js), never on water, inside buildings or on the
 * landmarks. No real lights: one InstancedMesh of posts, one of glowing heads
 * (additive discs facing the camera, a few pixels wide from afar, like dots of
 * light) and a light map over the park (soft warm pools around each lamp plus a
 * glow on the paving) that the terrain adds to the ground and the water
 * reflects (`lightMap`, shared with those layers). Two draw calls, and only at
 * night. The quality preset caps the lamps (QualityPreset.lamps).
 *
 * @param {{ park: object, heightAt: (x: number, z: number) => number, buildings: object[],
 *   landmarks: import('../parks/define.js').Landmark[], paving: ImageBitmap | null,
 *   designArea: ReturnType<typeof import('#shared/design-area.js').makeDesignArea>,
 *   lightMap: { value: THREE.Texture } }} options
 * @returns {import('./index.js').Layer & { lamps: number[][], cover: ((x: number, z: number) => number) | null,
 *   setExtraLight(light: ExtraLight | null): void }}
 */
export function createLampsLayer({ park, heightAt, buildings, landmarks, paving, designArea, lightMap }) {
  const cover = pavingSampler(paving, park.extent);
  const all = placeParkLamps({ park, heightAt, buildings, landmarks, cover, designArea });

  const object = new THREE.Group();
  object.name = 'lamps';
  object.visible = false;

  const postMaterial = new THREE.MeshLambertMaterial({ color: LAMP_STYLE.postColor });
  const posts = new THREE.InstancedMesh(postGeometry(), postMaterial, Math.max(1, all.length));
  posts.name = 'lamps:posts';
  const headUniforms = {
    uNight: nightUniform,
    uColor: { value: new THREE.Color(NIGHT_COLORS.lamp) },
    uCore: { value: 1 },
    uViewport: { value: new THREE.Vector2(1, 1) },
    uSize: { value: LAMP_STYLE.head.radius },
    uMinPx: { value: LAMP_STYLE.head.minPx },
  };
  const heads = new THREE.InstancedMesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.ShaderMaterial({
      uniforms: headUniforms,
      vertexShader: headVertex,
      fragmentShader: headFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    Math.max(1, all.length),
  );
  heads.name = 'lamps:heads';
  heads.renderOrder = 2; // after the water
  const m = new THREE.Matrix4();
  all.forEach(([x, z, deck], i) => {
    const y = deck ?? heightAt(x, z);
    posts.setMatrixAt(i, m.makeTranslation(x, y - LAMP_STYLE.postSink, z));
    heads.setMatrixAt(i, m.makeTranslation(x, y + LAMP_STYLE.head.aboveGround, z));
  });
  for (const mesh of [posts, heads]) {
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere(); // of every lamp (before `count` is capped)
    mesh.count = 0;
    object.add(mesh);
  }

  // matrices of every lamp: a new cap re-picks from all of them
  const allMatrices = [posts, heads].map((mesh) => mesh.instanceMatrix.array.slice());
  let shown = -1;
  let extra = null;
  let disposed = false;
  const lamps = [];
  /** Shows at most `max` lamps (an even subset) and redraws the light map with them. */
  function show(max, redraw = false) {
    const kept = capLamps(
      all.map((p, i) => i),
      max,
    );
    if (kept.length === shown && !redraw) return;
    shown = kept.length;
    // the kept lamps first, so `count` draws exactly them
    [posts, heads].forEach((mesh, n) => {
      const src = allMatrices[n],
        dst = mesh.instanceMatrix.array;
      kept.forEach((i, k) => dst.set(src.subarray(i * 16, i * 16 + 16), k * 16));
      mesh.count = kept.length;
      mesh.instanceMatrix.needsUpdate = true;
    });
    lamps.length = 0;
    for (const i of kept) lamps.push(all[i]);
    const old = lightMap.value;
    lightMap.value = lightMapTexture(lamps, park.extent, paving, extra);
    if (old?.userData.lampLightMap) old.dispose();
  }

  return {
    name: 'lamps',
    object,
    lamps,
    /** paved coverage (0 … 1) at a point, from paving.png; null without it */
    cover,
    setQuality(preset) {
      show(preset.lamps ?? all.length);
    },
    /** Light of a seasonal theme (null: none); redraws the light map. */
    setExtraLight(light) {
      extra = light;
      // a theme layer let go after this one (park switch): nothing to redraw, the paving is freed
      if (disposed) return;
      headUniforms.uColor.value.set(light?.lampColor ?? NIGHT_COLORS.lamp);
      headUniforms.uCore.value = light?.lampCore ?? 1;
      if (shown >= 0) show(shown, true);
    },
    update({ distance, fovPx, camera }) {
      const k = nightUniform.value;
      object.visible = k > 0.001 && shown > 0;
      if (!object.visible) return;
      posts.visible = distance < POST_DISTANCE;
      const h = 2 * fovPx * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      headUniforms.uViewport.value.set(h * camera.aspect, h);
    },
    dispose() {
      disposed = true;
      if (lightMap.value?.userData.lampLightMap) lightMap.value.dispose();
      paving?.close?.();
    },
  };
}

/**
 * Every lamp position of a park (before the quality cap): [x, z] or, on a pier,
 * [x, z, deck height]. On the edge of the piers' decks first, then along
 * walkways and routes, then over the remaining paved areas.
 */
export function placeParkLamps({ park, heightAt, buildings, landmarks, cover, designArea }) {
  const blocked = obstacles(buildings, landmarks);
  const inside = (x, z) => designArea.signedDistance(x, z) < -25 && !blocked(x, z);
  const accept = (x, z) => heightAt(x, z) > 0.15 && inside(x, z);
  // piers: decks 1.8 m wide at ≥ 0.9 m (layers/piers.js)
  const decks = (park.piers ?? []).filter((p) => !p.closed).map((p) => p.pts);
  const onPiers = placeLampsAlong(decks, { offset: 0.75, accept: inside });
  const deckHeight = new Map(onPiers.map(([x, z]) => [`${x},${z}`, Math.max(0.9, heightAt(x, z) + 0.1) + 0.17]));
  const lines = [...(park.walkways ?? []), ...park.routes.flatMap((r) => r.lines)];
  let lamps = placeLampsAlong(lines, { accept, lamps: onPiers });
  if (cover) {
    const { cx, cz, size } = park.extent;
    lamps = placeLampsOver(lamps, cover, [cx - size / 2, cz - size / 2, cx + size / 2, cz + size / 2], { accept });
  }
  return lamps.map(([x, z]) => {
    const deck = deckHeight.get(`${x},${z}`);
    return deck === undefined ? [x, z] : [x, z, deck];
  });
}

/** Lamp post: a thin pole and a small lantern (the glow is drawn by the heads). */
function postGeometry() {
  const { pole: p, lantern: l } = LAMP_STYLE;
  const pole = new THREE.CylinderGeometry(p.radiusTop, p.radiusBottom, POST_HEIGHT, p.sides, 1, true);
  pole.translate(0, POST_HEIGHT / 2, 0);
  const lantern = new THREE.CylinderGeometry(l.radiusTop, l.radiusBottom, l.height, l.sides);
  lantern.translate(0, POST_HEIGHT + l.centerAbovePost, 0);
  pole.deleteAttribute('uv');
  lantern.deleteAttribute('uv');
  return mergeGeometries([pole.toNonIndexed(), lantern.toNonIndexed()]);
}

/**
 * `(x, z) => true` inside a building (1 m margin), near a landmark (0.8 × its
 * clear radius) or over a hole it cuts in the ground (sunken moat, 1 m margin).
 */
export function obstacles(buildings, landmarks) {
  const holes = makeGroundHoles(landmarkGroundHoles(landmarks));
  const CELL = 40;
  const cells = new Map();
  const key = (i, j) => i * 100003 + j;
  const put = (x0, z0, x1, z1, test) => {
    for (let j = Math.floor(z0 / CELL); j <= Math.floor(z1 / CELL); j++)
      for (let i = Math.floor(x0 / CELL); i <= Math.floor(x1 / CELL); i++) {
        const k = key(i, j);
        if (!cells.has(k)) cells.set(k, []);
        cells.get(k).push(test);
      }
  };
  for (const b of buildings) {
    if (b.poly) {
      const xs = b.poly.map((p) => p[0]),
        zs = b.poly.map((p) => p[1]);
      put(Math.min(...xs) - 1, Math.min(...zs) - 1, Math.max(...xs) + 1, Math.max(...zs) + 1, (x, z) => nearPolygon(b.poly, x, z, 1));
    } else if (b.box) {
      const r = Math.max(b.box.length, b.box.width) / 2 + 1;
      const { cx, cz } = b.box;
      put(cx - r, cz - r, cx + r, cz + r, (x, z) => Math.hypot(x - cx, z - cz) < r);
    }
  }
  for (const l of landmarks) {
    const r = (l.clear ?? 0) * 0.8;
    if (r > 0) put(l.x - r, l.z - r, l.x + r, l.z + r, (x, z) => Math.hypot(x - l.x, z - l.z) < r);
  }
  return (x, z) => (cells.get(key(Math.floor(x / CELL), Math.floor(z / CELL))) ?? []).some((test) => test(x, z)) || holes.near(x, z, 1);
}

/** Inside the polygon or within `margin` m of its outline. */
function nearPolygon(poly, x, z, margin) {
  let inside = false;
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i],
      [xj, zj] = poly[j];
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
    const dx = xj - xi,
      dz = zj - zi;
    const t = Math.max(0, Math.min(1, ((x - xi) * dx + (z - zi) * dz) / (dx * dx + dz * dz || 1)));
    best = Math.min(best, Math.hypot(x - xi - dx * t, z - zi - dz * t));
  }
  return inside || best < margin;
}

/** paving.png (0..1 per cell, nearest) as `(x, z) => coverage`, or null without it. */
export function pavingSampler(bitmap, { cx, cz, size }) {
  if (!bitmap) return null;
  const S = PAVING_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const g = canvas.getContext('2d', { willReadFrequently: true });
  g.drawImage(bitmap, 0, 0, S, S);
  const data = g.getImageData(0, 0, S, S).data;
  canvas.width = canvas.height = 1;
  if (!data?.length) return null;
  return (x, z) => {
    const u = Math.floor(((x - cx) / size + 0.5) * S),
      v = Math.floor(((z - cz) / size + 0.5) * S);
    return u < 0 || v < 0 || u >= S || v >= S ? 0 : data[(v * S + u) * 4] / 255;
  };
}

let poolSprite = null;
/** Soft warm disc drawn once per lamp into the light map. */
function pool() {
  if (poolSprite) return poolSprite;
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, 'rgba(255,206,140,0.9)');
  grd.addColorStop(0.3, 'rgba(255,178,98,0.45)');
  grd.addColorStop(0.65, 'rgba(255,150,70,0.14)');
  grd.addColorStop(1, 'rgba(255,140,60,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, s, s);
  return (poolSprite = c);
}

/**
 * Night light over park.extent (row 0 = north, like the ground): the paving
 * glow plus a warm pool around every lamp, added up.
 */
function lightMapTexture(lamps, extent, paving, extra) {
  const canvas = drawLightMap(lamps, extent, paving, extra);
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.userData.lampLightMap = true;
  texture.onUpdate = () => {
    canvas.width = canvas.height = 1; // on the GPU now
    texture.onUpdate = null;
  };
  return texture;
}

/**
 * The light map as a LIGHT_MAP_SIZE² canvas (sRGB, row 0 = north edge of
 * park.extent): the warm-tinted paving × PATH_GLOW, then one pool sprite per
 * lamp, added ('lighter', clamped at 1), then the extra light of a seasonal
 * theme. Also exported for the mobile app (export/night.js → nightlight.png).
 * @param {number[][]} lamps [x, z, …]
 * @param {{ cx: number, cz: number, size: number }} extent
 * @param {ImageBitmap | null} paving
 * @param {ExtraLight | null} [extra]
 * @returns {HTMLCanvasElement}
 */
export function drawLightMap(lamps, { cx, cz, size }, paving, extra = null) {
  const S = LIGHT_MAP_SIZE;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const g = canvas.getContext('2d');
  g.fillStyle = '#000';
  g.fillRect(0, 0, S, S);
  if (paving) {
    // warm-tinted paving mask
    const tint = document.createElement('canvas');
    tint.width = tint.height = PAVING_SIZE;
    const t = tint.getContext('2d');
    t.drawImage(paving, 0, 0);
    t.globalCompositeOperation = 'multiply';
    t.fillStyle = '#ffd9a0';
    t.fillRect(0, 0, PAVING_SIZE, PAVING_SIZE);
    g.globalAlpha = PATH_GLOW;
    g.drawImage(tint, 0, 0, S, S);
    g.globalAlpha = 1;
    tint.width = tint.height = 1;
  }
  g.globalCompositeOperation = 'lighter';
  const r = (POOL_RADIUS / size) * S;
  const sprite = pool();
  const px = (x, z) => [((x - cx) / size + 0.5) * S, ((z - cz) / size + 0.5) * S];
  for (const [x, z] of lamps) {
    const [u, v] = px(x, z);
    g.drawImage(sprite, u - r, v - r, 2 * r, 2 * r);
  }
  if (extra?.strokes) {
    const { lines, width, alpha, color } = extra.strokes;
    g.globalAlpha = alpha;
    g.strokeStyle = color;
    g.lineWidth = Math.max(1, (width / size) * S);
    g.lineCap = g.lineJoin = 'round';
    for (const line of lines) {
      g.beginPath();
      line.forEach(([x, z], i) => g[i ? 'lineTo' : 'moveTo'](...px(x, z)));
      g.stroke();
    }
  }
  for (const [x, z, radius, alpha] of extra?.pools ?? []) {
    const [u, v] = px(x, z);
    const pr = Math.max(1, (radius / size) * S);
    g.globalAlpha = alpha;
    g.drawImage(sprite, u - pr, v - pr, 2 * pr, 2 * pr);
  }
  g.globalAlpha = 1;
  return canvas;
}
