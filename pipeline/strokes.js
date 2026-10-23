// Route lines painted on the official illustration, by color. A route's
// `stroke` (src/parks/<park>/routes.js) names one of these detectors.
//   dashed     the stroke is drawn in dashes, joined later along the walkway
//   overWater  the stroke may cross water (bridges, piers)
export const STROKES = {
  white: { test: (r, g, b) => r >= 246 && g >= 246 && b >= 246 },
  brown: { test: (r, g, b) => r >= 60 && r <= 135 && g >= 30 && g <= 90 && b <= 50 && r - g >= 18 && g - b >= 16 },
  black: { test: (r, g, b) => r < 26 && g < 26 && b < 26, dashed: true, overWater: true },
  blue: { test: (r, g, b) => r < 50 && g < 60 && b > 150, dashed: true, overWater: true },
  red: { test: (r, g, b) => r > 180 && g < 60 && b < 60, dashed: true, overWater: true },
  green: { test: (r, g, b) => r < 85 && b < 90 && g > 118 && g - r > 68 && g - b > 62, dashed: true, overWater: true },
};
