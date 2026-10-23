import * as THREE from 'three';
import { nightGlowOf } from '../graphics/night.js';

// Plain glTF-friendly materials for the mobile export. The app's materials
// often carry shader tweaks (wind sway, wing flap, onBeforeCompile UV remaps)
// that GLTFExporter cannot write; here every material becomes a plain
// MeshStandardMaterial (→ pbrMetallicRoughness) with the same look at rest:
//   Lambert → roughness 1, metalness 0 (same diffuse response, no specular)
//   Basic   → roughness 1 (unlit has no core glTF equivalent we want to rely on)
// Emissive intensity is baked into the emissive color, except on the
// materials that glow at night (graphics/night.js → nightGlow: facade*,
// window, glass, lamp): those keep their emissive color as emissiveFactor and
// their daytime intensity as KHR_materials_emissive_strength (0 for windows),
// so the app turns them on at night by setting `emissiveStrength`
// (userData.night: the night value). A facade's night windows
// (facadeGlowTexture) go as emissiveTexture on TEXCOORD_1 (its repeat differs
// from the base map's, see emissiveUv()). Texture repeat/offset are baked into
// the geometry UVs (no KHR_texture_transform, see bakeTextureTransform()).

const cache = new Map();
const plainMaps = new Map();

/**
 * Same texture source with an identity UV transform (the transform goes into
 * the geometry instead). Clones share the image, so GLTFExporter writes it once.
 * @param {THREE.Texture} map
 */
export function plainTexture(map) {
  if (isIdentity(map)) return map;
  const key = map.source.uuid;
  if (!plainMaps.has(key)) {
    const t = map.clone();
    t.repeat.set(1, 1);
    t.offset.set(0, 0);
    t.center.set(0, 0);
    t.rotation = 0;
    t.updateMatrix();
    plainMaps.set(key, t);
  }
  return plainMaps.get(key);
}

/**
 * The emissive map of a night-glowing material, identity transform, on UV
 * channel 0 when its transform equals the base map's (same UVs), else 1
 * (TEXCOORD_1, written by emissiveUv()).
 * @param {THREE.Texture} emissiveMap
 * @param {THREE.Texture | null} map
 */
function emissiveTexture(emissiveMap, map) {
  const channel = sameTransform(emissiveMap, map) ? 0 : 1;
  const key = `${emissiveMap.source.uuid}:${channel}`;
  if (!plainMaps.has(key)) {
    const t = emissiveMap.clone();
    t.repeat.set(1, 1);
    t.offset.set(0, 0);
    t.center.set(0, 0);
    t.rotation = 0;
    t.channel = channel;
    t.updateMatrix();
    t.name = emissiveMap.name || 'emissive';
    plainMaps.set(key, t);
  }
  return plainMaps.get(key);
}

const sameTransform = (a, b) => (b ? a.repeat.equals(b.repeat) && a.offset.equals(b.offset) && a.rotation === b.rotation : isIdentity(a));

/**
 * TEXCOORD_1 of a geometry whose material's emissive map has its own
 * transform: the source UVs (before bakeTextureTransform) through that
 * transform. Call before baking the base map's transform into `uv`.
 * @param {THREE.BufferGeometry} geometry
 * @param {THREE.Texture} emissiveMap the app material's (with its repeat)
 */
export function emissiveUv(geometry, emissiveMap) {
  const uv = geometry.getAttribute('uv');
  const out = new Float32Array((uv?.count ?? geometry.getAttribute('position').count) * 2);
  if (uv) {
    emissiveMap.updateMatrix();
    const v = new THREE.Vector2();
    for (let i = 0; i < uv.count; i++) {
      v.fromBufferAttribute(uv, i).applyMatrix3(emissiveMap.matrix);
      out[i * 2] = v.x;
      out[i * 2 + 1] = v.y;
    }
  }
  geometry.setAttribute('uv1', new THREE.BufferAttribute(out, 2));
}

function isIdentity(map) {
  return map.repeat.x === 1 && map.repeat.y === 1 && map.offset.x === 0 && map.offset.y === 0 && map.rotation === 0;
}

/**
 * Applies a texture's repeat/offset/rotation to a geometry's UVs in place.
 * @param {THREE.BufferGeometry} geometry
 * @param {THREE.Texture} map
 */
export function bakeTextureTransform(geometry, map) {
  const uv = geometry.getAttribute('uv');
  if (!uv || isIdentity(map)) return;
  map.updateMatrix();
  const v = new THREE.Vector2();
  for (let i = 0; i < uv.count; i++) {
    v.fromBufferAttribute(uv, i).applyMatrix3(map.matrix);
    uv.setXY(i, v.x, v.y);
  }
  uv.needsUpdate = true;
}

/**
 * Plain standard material equivalent to `source`, shared between all sources
 * that look the same (so their meshes can be merged).
 * @param {THREE.Material} source
 * @param {{ vertexColors?: boolean, name?: string }} [overrides] vertexColors: e.g. instance colors
 *        baked into vertices; name: used when `source` has none
 * @returns {THREE.MeshStandardMaterial}
 */
export function exportMaterial(source, overrides = {}) {
  const lambertLike = source.isMeshLambertMaterial || source.isMeshBasicMaterial;
  const glow = source.emissive ? nightGlowOf(source) : undefined;
  const params = {
    name: source.name || overrides.name || '',
    color: source.color ? source.color.getHex(THREE.LinearSRGBColorSpace) : 0xffffff,
    map: source.map ? plainTexture(source.map) : null,
    roughness: source.isMeshStandardMaterial ? source.roughness : lambertLike ? 1 : 0.6,
    metalness: source.isMeshStandardMaterial ? source.metalness : 0,
    // night glow: color as is, intensity as emissive strength; else baked in
    emissive: source.emissive
      ? source.emissive
          .clone()
          .multiplyScalar(glow ? 1 : (source.emissiveIntensity ?? 1))
          .getHex(THREE.LinearSRGBColorSpace)
      : 0,
    emissiveIntensity: glow ? glow.day : 1,
    emissiveMap: glow && source.emissiveMap ? emissiveTexture(source.emissiveMap, source.map) : null,
    vertexColors: overrides.vertexColors ?? !!source.vertexColors,
    transparent: !!source.transparent,
    opacity: source.opacity ?? 1,
    alphaTest: source.alphaTest ?? 0,
    side: source.side === THREE.FrontSide ? THREE.FrontSide : THREE.DoubleSide,
    depthWrite: source.depthWrite,
  };
  const key = JSON.stringify({
    ...params,
    name: undefined,
    map: params.map?.uuid ?? null,
    emissiveMap: params.emissiveMap?.uuid ?? null,
    night: glow?.night,
  });
  let material = cache.get(key);
  if (!material) {
    material = new THREE.MeshStandardMaterial({ ...params, color: new THREE.Color().setHex(params.color, THREE.LinearSRGBColorSpace) });
    material.emissive.setHex(params.emissive, THREE.LinearSRGBColorSpace);
    material.name =
      params.name || `${source.type.replace(/^Mesh|Material$/g, '').toLowerCase()}-${params.color.toString(16).padStart(6, '0')}`;
    if (material.map && !material.map.name) material.map.name = material.name;
    // GLTFExporter writes userData as glTF extras (night strength, also in night.json)
    if (glow) material.userData.night = { day: glow.day, night: glow.night };
    cache.set(key, material);
  }
  return material;
}

/** Gives the shared library materials their library key as name (readable glTF). */
export function nameLibrary(library) {
  for (const [name, material] of Object.entries(library)) if (!material.name) material.name = name;
}
