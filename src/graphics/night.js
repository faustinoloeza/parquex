// Shared night state of every material in the scene (0 = day … 1 = night).
//
// Night needs no rebuild and no extra programs: custom shaders (terrain, water,
// real map, lamps) read the same `nightUniform` object, and library materials
// with lit windows (facades, lamps) get their emissive intensity set from it.
// Stage.setNight() moves the lights; setNightLevel() moves everything else.

/**
 * At night the animals rest (layers/fauna.js, the net domes' butterflies and
 * birds): share of their daytime activity left at full night — pace of
 * drifting/turning, flying birds, dolphin jumps.
 */
export const NIGHT_ACTIVITY = { pace: 0.12, birds: 0.15, jumps: 0.12 };

/** Activity factor (1 by day … `k` at full night) for the current night level. */
export const nightActivity = (k) => 1 + (k - 1) * nightUniform.value;

/** Uniform shared by every night-aware shader: 0 day … 1 night. */
export const nightUniform = { value: 0 };

/** Seconds of the day ↔ night transition (app/MapApp.js; linear progress eased with smoothstep). */
export const NIGHT_TRANSITION = 1.5;

/** Warm light of windows and lamps at night (sRGB). */
export const NIGHT_COLORS = {
  window: '#ffcf7a',
  lamp: '#ffc56b',
};

/**
 * The real map (unlit OSM tiles) at night: color × tint + lift, in linear
 * light (layers/basemap.js, and the region's sea that meets it, layers/water.js).
 */
export const NIGHT_MAP = { tint: [0.05, 0.065, 0.15], lift: [0.004, 0.006, 0.018] };

export const NIGHT_MAP_GLSL = /* glsl */ `
  #define NIGHT_MAP_TINT vec3(${NIGHT_MAP.tint.join(', ')})
  #define NIGHT_MAP_LIFT vec3(${NIGHT_MAP.lift.join(', ')})
`;

/** @type {{ material: import('three').Material & { emissiveIntensity: number }, day: number, night: number }[]} */
const glows = [];

/**
 * A material whose emissive intensity goes from `day` to `night` with the time of day.
 * @template {import('three').Material & { emissiveIntensity: number }} M
 * @param {M} material
 * @param {number} night emissive intensity at night
 * @param {number} [day]  emissive intensity by day
 * @returns {M}
 */
export function nightGlow(material, night, day = material.emissiveIntensity ?? 0) {
  glows.push({ material, day, night });
  material.emissiveIntensity = day + (night - day) * nightUniform.value;
  return material;
}

/**
 * Day and night emissive intensities of a material made with nightGlow(), or
 * undefined (the mobile export writes them for the app, export/materials.js).
 * @param {import('three').Material} material
 * @returns {{ day: number, night: number } | undefined}
 */
export function nightGlowOf(material) {
  const g = glows.find((x) => x.material === material);
  return g && { day: g.day, night: g.night };
}

/** Sets the night level (0 … 1) of the shaders and glowing materials. */
export function setNightLevel(k) {
  nightUniform.value = k;
  for (const g of glows) g.material.emissiveIntensity = g.day + (g.night - g.day) * k;
}
