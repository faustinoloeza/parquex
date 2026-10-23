import * as THREE from 'three';
import { capLamps } from '#shared/lamps.js';
import { encodeLamps, LAMP_KIND, LAMP_RECORD_BYTES, LAMPS_MAGIC } from '#shared/formats/lamps.js';
import { PAVING_FILE } from '#shared/formats/paving.js';
import { FADE } from '#shared/design-area.js';
import { LAMP_STYLE, drawLightMap, pavingSampler, placeParkLamps } from '../layers/lamps.js';
import { LAMP_GAIN } from '../layers/terrain.js';
import { WATER_DAY, WATER_NIGHT } from '../layers/water.js';
import { NAV_STYLE } from '../layers/nav-route.js';
import { LIGHTING } from '../app/Stage.js';
import { QUALITY_PRESETS } from '../app/quality.js';
import { NIGHT_HOURS, PARK_UTC_OFFSET } from '../app/time-of-day.js';
import { NIGHT_COLORS, NIGHT_MAP, NIGHT_TRANSITION, nightGlowOf } from '../graphics/night.js';
import { materials as libraryMaterials } from '../graphics/materials.js';

// Night mode of the mobile export (see docs/app-movil-noche-navegacion.md):
//
//   lamps.bin        the street lamps of the web (layers/lamps.js → placeParkLamps,
//                    "high" cap), PQL1 (shared/formats/lamps.js)
//   nightlight.png   the web's light map (warm lamp pools + paving glow) over
//                    park.extent, 1024², sRGB, row 0 = north
//   night.json       lights, sky, water, map tint, markers, transition, auto
//                    rule and the night emissive strength of every material
//
// and, inside park-models.glb, the light map ready for gltfio: the terrain
// tiles and the paving get `nightlight-ground` (ground albedo × light map,
// so emissive = the web's albedo × light) and the water `nightlight-water`
// (the light map) as emissiveTexture on TEXCOORD_1 (terrain, paving) /
// TEXCOORD_0 (water) = park.extent UVs, emissive strength 0 (the day look is
// unchanged); the app sets their `emissiveStrength` at night.

/** Night emissive strength of the water (the lamps' light map, no view-dependent offset: a simplification of the web's reflections). */
export const WATER_LAMP_STRENGTH = 1.5;
/** Size of the light map copy used by the water in the GLB (the reflections are soft). */
const WATER_LIGHT_SIZE = 512;

/**
 * Lamp records of a park as the web places them for the "high" preset: post
 * foot height (ground or pier deck) and kind.
 * @param {{ park: object, parkDef: object, heightAt: (x: number, z: number) => number, buildings: object[],
 *   paving: ImageBitmap | null, designArea: object }} options
 * @returns {{ x: number, y: number, z: number, kind: number }[]}
 */
export function exportLampRecords({ park, parkDef, heightAt, buildings, paving, designArea }) {
  const cover = pavingSampler(paving, park.extent);
  const all = placeParkLamps({ park, heightAt, buildings, landmarks: parkDef.landmarks ?? [], cover, designArea });
  return capLamps(all, QUALITY_PRESETS.high.lamps).map(([x, z, deck]) => ({
    x,
    y: deck ?? heightAt(x, z),
    z,
    kind: deck === undefined ? LAMP_KIND.ground : LAMP_KIND.pier,
  }));
}

/** buildings.json and paving.png of a park (the lamps of a neighbor, export/context.js). */
export async function loadLampInputs(key) {
  const base = `/parks/${key}/`;
  const buildings = await fetch(`${base}buildings.json`).then((r) => (r.ok ? r.json() : []));
  const paving = await fetch(base + PAVING_FILE)
    .then((r) => (r.ok ? r.blob() : null))
    .then((b) => b && createImageBitmap(b, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' }))
    .catch(() => null);
  return { buildings, paving };
}

/**
 * The night layer of a park for the mobile export: lamps, the web's light map
 * and its two GLB textures.
 * @param {{ park: object, parkDef: object, heightAt: (x: number, z: number) => number, buildings: object[],
 *   paving: ImageBitmap | null, overview: THREE.Texture, designArea: object }} options
 */
export function buildNight({ park, parkDef, heightAt, buildings, paving, overview, designArea }) {
  const lamps = exportLampRecords({ park, parkDef, heightAt, buildings, paving, designArea });
  const light = drawLightMap(
    lamps.map((l) => [l.x, l.z]),
    park.extent,
    paving,
  );
  const groundLight = canvasTexture(albedoTimesLight(overview.image, light), 'nightlight-ground');
  const water = document.createElement('canvas');
  water.width = water.height = WATER_LIGHT_SIZE;
  water.getContext('2d').drawImage(light, 0, 0, WATER_LIGHT_SIZE, WATER_LIGHT_SIZE);
  const waterLight = canvasTexture(water, 'nightlight-water');
  return { lamps, lampsBin: encodeLamps(lamps), light, groundLight, waterLight };
}

function canvasTexture(canvas, name) {
  const t = new THREE.CanvasTexture(canvas);
  t.name = name;
  t.flipY = false; // rows north → south, v = 0 at the top (like the ground tiles)
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  t.userData.mimeType = 'image/jpeg';
  return t;
}

/**
 * ground albedo (level-0 ground tile, over park.extent) × light map, in
 * linear light, as an sRGB canvas the size of the light map: the terrain's
 * night term of the web (albedo × light × LAMP_GAIN) is then emissive =
 * this × strength.
 */
function albedoTimesLight(groundImage, light) {
  const S = light.width;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = S;
  const g = canvas.getContext('2d', { willReadFrequently: true });
  g.drawImage(groundImage, 0, 0, S, S);
  const ground = g.getImageData(0, 0, S, S);
  const lit = light.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, S, S).data;
  const toLinear = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const c = i / 255;
    toLinear[i] = c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }
  const d = ground.data;
  for (let i = 0; i < d.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const v = toLinear[d[i + c]] * toLinear[lit[i + c]];
      d[i + c] = Math.round(255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * v ** (1 / 2.4) - 0.055));
    }
    d[i + 3] = 255;
  }
  g.putImageData(ground, 0, 0);
  return canvas;
}

/**
 * Puts the light map on the terrain tiles and the paving (nightlight-ground,
 * TEXCOORD_1) and the water (nightlight-water, TEXCOORD_0), emissive strength 0
 * by day; userData.night is the strength at full night.
 * @param {THREE.Object3D} root the export scene's `park` group
 * @param {{ cx: number, cz: number, size: number }} extent
 * @param {ReturnType<typeof buildNight>} night
 */
export function applyNightLight(root, extent, night) {
  const x0 = extent.cx - extent.size / 2,
    z0 = extent.cz - extent.size / 2;
  const extentUv = (geometry, name) => {
    const p = geometry.getAttribute('position');
    const uv = new Float32Array(p.count * 2);
    for (let i = 0; i < p.count; i++) {
      uv[i * 2] = (p.getX(i) - x0) / extent.size;
      uv[i * 2 + 1] = (p.getZ(i) - z0) / extent.size;
    }
    geometry.setAttribute(name, new THREE.BufferAttribute(uv, 2));
  };
  const glow = (material, map, channel, strength) => {
    map.channel = channel;
    material.emissiveMap = map;
    material.emissive.setRGB(1, 1, 1);
    material.emissiveIntensity = 0;
    material.userData.night = { day: 0, night: strength };
  };
  const ground = night.groundLight;
  root.traverse((o) => {
    if (!o.isMesh) return;
    if (o.name.startsWith('terrain:')) {
      extentUv(o.geometry, 'uv1');
      glow(o.material, ground, 1, LAMP_GAIN);
    } else if (o.name === 'paving') {
      extentUv(o.geometry, 'uv1');
      o.material = o.material.clone(); // the library's paving stays plain on the models
      o.material.name = 'paving-ground';
      glow(o.material, ground, 1, LAMP_GAIN);
    } else if (o.name === 'water') {
      extentUv(o.geometry, 'uv');
      glow(o.material, night.waterLight, 0, WATER_LAMP_STRENGTH);
    }
  });
}

const hex = (c) => `#${new THREE.Color(c).getHexString()}`;
const linear = (c) => new THREE.Color(c).toArray().map((v) => +v.toFixed(5));
const round = (v, d = 3) => Math.round(v * 10 ** d) / 10 ** d;

/**
 * night.json of a park: what the app needs for the night mode, from the
 * web's own constants (one source of truth).
 * @param {{ park: object, key: string, night: ReturnType<typeof buildNight>, scene: THREE.Object3D }} options
 */
export function nightJson({ park, key, night, scene }) {
  const { cx, cz, size } = park.extent;
  const materials = new Map();
  const used = new Set();
  // a mesh may carry several materials (the anim:* prototypes, export/animated.js)
  const meshMaterials = [];
  scene.traverse((o) => o.isMesh && meshMaterials.push(...[o.material].flat()));
  for (const m of meshMaterials) used.add(m.name);
  const add = (name, emissive, glow, map) => {
    if (materials.has(name)) return;
    materials.set(name, {
      name,
      emissiveFactor: linear(emissive),
      emissiveColor: hex(emissive),
      day: glow.day,
      night: glow.night,
      emissiveTexture: map ? { name: map.name, texCoord: map.channel } : null,
      inThisPark: used.has(name),
    });
  };
  // every glowing material of the library (same names in every park's GLB), then terrain, paving, water
  for (const [name, m] of Object.entries(libraryMaterials())) {
    const glow = nightGlowOf(m);
    if (glow) add(name, m.emissive, glow, m.emissiveMap && { name: m.emissiveMap.name, channel: 1 });
  }
  for (const m of meshMaterials) if (m.userData.night) add(m.name, m.emissive, m.userData.night, m.emissiveMap);
  const lamps = night.lamps;
  return {
    format: 'parquex-night',
    version: 1,
    park: key,
    frame: `local meters of ${key}/park.json (x east, y up, z south, origin at its center)`,
    when: {
      modes: ['auto', 'day', 'night'],
      auto: `night from ${NIGHT_HOURS.from}:00 to ${String(NIGHT_HOURS.to).padStart(2, '0')}:00 park time`,
      nightHours: NIGHT_HOURS,
      utcOffsetHours: PARK_UTC_OFFSET,
      timeZone: 'America/Cancun (UTC−5 all year, no DST)',
      recheckSeconds: 60,
      transitionSeconds: NIGHT_TRANSITION,
      easing: 'k = smoothstep(0, 1, p); p moves linearly 0 ↔ 1 over transitionSeconds',
      nightClassAbove: 0.5,
    },
    lighting: {
      day: LIGHTING.day,
      night: LIGHTING.night,
      blend: 'colors lerped in linear RGB (three.js Color.lerp of sRGB hex → linear), numbers lerped, with k',
      toneMapping: 'Neutral (Khronos PBR Neutral)',
      fog: 'color = sky; near = distance * 0.9 + 150, far = distance * 2.6 + 900 (distance = camera to target, m)',
    },
    colors: { window: NIGHT_COLORS.window, lamp: NIGHT_COLORS.lamp },
    materials: {
      rule: 'emissiveStrength = day + (night - day) * k, per material (MaterialInstance.setParameter("emissiveStrength", …)); emissiveFactor and textures are already in park-models.glb',
      list: [...materials.values()],
    },
    lamps: {
      file: 'lamps.bin',
      format: `${LAMPS_MAGIC}: u32 count, u32 recordBytes (${LAMP_RECORD_BYTES}); per record f32 x, y, z (y = post foot), u8 kind (0 ground, 1 pier), 3 reserved bytes`,
      count: lamps.length,
      piers: lamps.filter((l) => l.kind === LAMP_KIND.pier).length,
      caps: { high: QUALITY_PRESETS.high.lamps, medium: QUALITY_PRESETS.medium.lamps, low: QUALITY_PRESETS.low.lamps },
      capRule: 'keep record j (0-based) when floor((j + 1) * f) > floor(j * f), f = cap / count (only when count > cap)',
      style: { ...LAMP_STYLE, headColor: NIGHT_COLORS.lamp, headCore: '#fff5db' },
      head: 'additive camera-facing disc, radius head.radius m but at least head.minPx px; d = distance to center (0..1): core = smoothstep(0.42, 0.12, d), halo = (1 - d)^1.6 * 0.85, color = mix(headColor, headCore, core) * (core + halo) * k',
      visibility: `only when k > 0.001; posts hidden beyond ${LAMP_STYLE.postDistance} m camera distance (heads stay)`,
    },
    lightMap: {
      file: 'nightlight.png',
      size: night.light.width,
      colorSpace: 'sRGB',
      extent: { x0: round(cx - size / 2), z0: round(cz - size / 2), size },
      uv: 'u = (x - x0) / size, v = (z - z0) / size (row 0 = north edge, z0)',
      content: `black, paving.png tinted #ffd9a0 × ${LAMP_STYLE.pathGlow}, plus a warm radial pool of ${LAMP_STYLE.poolRadius} m per lamp, added and clamped`,
      terrain: `emissive += albedo × light × ${LAMP_GAIN} × k (in park-models.glb: nightlight-ground = albedo × light on TEXCOORD_1 of terrain:* and paving; strength ${LAMP_GAIN} × k)`,
      water: `web: light map sampled 4, 10 and 18 m further from the viewer (weights 0.5, 0.4, 0.3) × ripple × 3 × k; in park-models.glb: nightlight-water on the water's TEXCOORD_0, strength ${WATER_LAMP_STRENGTH} × k (no offset)`,
    },
    water: {
      day: WATER_DAY,
      night: WATER_NIGHT,
      inlandNight: 'inland water (lagoons, rivers): base × (0.16, 0.22, 0.42), 80 %',
      nightMultiply: waterNightMultiply(),
      approximation:
        'park-models.glb water has its day color in COLOR_0: at night multiply it by mix(1, nightMultiply, k) (baseColorFactor), a simplification of the web shader',
    },
    map: {
      nightTint: NIGHT_MAP.tint,
      nightLift: NIGHT_MAP.lift,
      rule: 'OSM tiles (unlit) and the region sea edge: linear color = mix(c, c * tint + lift, k)',
    },
    contextFade: { inner: FADE.inner, outer: FADE.outer },
    markers: {
      nightAbove: 0.5,
      activity: {
        glow: '0 0 0 1px #0b142e66, 0 0 10px #ffd59a59',
        selectedBackground: '#1b2440',
        selectedText: '#f1f3f9',
        category: '#f1f3f9b3',
      },
      navPanel: { background: '#1b2440f5', text: '#f1f3f9', secondary: '#f1f3f9b3', time: '#81c995', link: '#8ab4f8' },
      walker: { glow: '0 0 0 3px #5b9cff55, 0 0 12px #5b9cffaa' },
    },
    navigation: { route: NAV_STYLE.color, routeNight: NAV_STYLE.night, walked: NAV_STYLE.walked, casing: NAV_STYLE.casing },
  };
}

/** Linear RGB factor that takes the day sea colors to the night ones (average of shallow and deep). */
function waterNightMultiply() {
  const ratio = (d, n) => {
    const a = new THREE.Color(d),
      b = new THREE.Color(n);
    return [b.r / a.r, b.g / a.g, b.b / a.b];
  };
  const s = ratio(WATER_DAY.shallow, WATER_NIGHT.shallow),
    d = ratio(WATER_DAY.deep, WATER_NIGHT.deep);
  return s.map((v, i) => round((v + d[i]) / 2, 4));
}
