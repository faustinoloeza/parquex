// Inputs of the data pipeline for Xcaret (pipeline/build.js).
export default {
  /** short park code (park.json → code) */
  code: 'XC',
  /** park hours ("HH:MM") */
  hours: { open: '08:30', close: '21:00' },
  /** center (origin of the local frame) and corner bounds of the official map */
  mapFrame: {
    latitude: 20.5806,
    longitude: -87.11995,
    bound1Lat: 20.58475,
    bound1Long: -87.11542,
    bound2Lat: 20.57615,
    bound2Long: -87.12457,
  },
  /**
   * How the official site lays the illustration over the map (its
   * WebGLOverlayView setup); converts illustration pixels to local meters.
   */
  illustration: {
    nodeScale: 49.35928726196289,
    nodeTranslation: [2.365215539932251, 0, 4.130291938781738],
    sceneScale: 27.5,
    scenePosition: [-69, 98, -120],
    /** painted overlays (the logo) in 0..1 image coordinates [x0, y0, x1, y1] */
    masks: [[0.272, 0.185, 0.432, 0.243]],
  },
  /** OpenStreetMap download box [west, south, east, north] */
  osmBBox: [-87.13, 20.572, -87.11, 20.589],
  /** a pixel of open sea (0..1 image coords) used to flood the OSM coastline */
  seaCorner: [0.99, 0.99],
};
