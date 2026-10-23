// Per-park color of the inland water (`sources.waterTint`): lagoons, rivers,
// canals and pools take it instead of the default turquoise palette; the open
// sea keeps its colors. Written to park.json by the pipeline (only when the park
// sets it) and read by the web water shader (src/layers/water.js) and the
// mobile export's water vertex colors (src/export/water.js).

const HEX = /^#[0-9a-f]{6}$/i;

/** Deep color derived from a single tint: the same hue, darker. */
const DEEP_FACTOR = 0.7;

/**
 * Normalizes `sources.waterTint` ('#rrggbb', or { shallow, deep }) to
 * { shallow, deep } hex colors; null when the park keeps the default palette.
 * @param {string | { shallow: string, deep: string } | undefined} tint
 * @returns {{ shallow: string, deep: string } | null}
 */
export function resolveWaterTint(tint) {
  if (tint == null) return null;
  const { shallow, deep } = typeof tint === 'string' ? { shallow: tint, deep: darken(tint, DEEP_FACTOR) } : tint;
  for (const c of [shallow, deep]) if (!HEX.test(c ?? '')) throw new Error(`waterTint: expected '#rrggbb' colors, got "${c}"`);
  return { shallow: shallow.toLowerCase(), deep: deep.toLowerCase() };
}

/** '#rrggbb' with every channel scaled by `f`. */
function darken(hex, f) {
  if (!HEX.test(hex)) throw new Error(`waterTint: expected '#rrggbb', got "${hex}"`);
  const c = [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * f));
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
}

/**
 * How much of a water.png tint value (sea 0, pool 0.25, lagoon 0.45, river 1)
 * takes the park's inland color: none on the open sea, all from pools on.
 */
export const INLAND_TINT_RAMP = [0.12, 0.25];

/** Depth (fraction of the 40 m shore-distance range) at which inland water reaches its deep color. */
export const INLAND_DEEP_AT = 0.2;
