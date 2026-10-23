// World layers. Every layer is created by a createXxxLayer(options) function
// and returns a Layer; MapApp adds `object` to the scene and calls update()
// every frame and setQuality() when the graphics preset changes.
//
// To add a layer: write src/layers/<name>.js and create it in
// src/app/world.js (the order there is the scene order).

/**
 * @typedef {object} FrameInfo
 * @property {number} t           seconds since start
 * @property {number} dt          seconds since the previous frame (≤ 0.1)
 * @property {number} distance    camera distance to its target (m)
 * @property {number} pxPerMeter  screen pixels per meter at the target
 * @property {import('three').PerspectiveCamera} camera
 * @property {import('three').Frustum} frustum  camera frustum (world space)
 * @property {number} fovPx       screen pixels covered by 1 m seen from 1 m away
 * @property {number} fogFar      distance (m) beyond which nothing shows
 *
 * @typedef {object} Layer
 * @property {string} name
 * @property {import('three').Object3D} object
 * @property {boolean} [occludesRoutes]  solid geometry that hides route lines
 * @property {(frame: FrameInfo) => void} [update]
 * @property {(preset: import('../app/quality.js').QualityPreset) => void} [setQuality]
 * @property {boolean} [loading]  true while the layer is still streaming data
 */

export { createTerrainLayer } from './terrain.js';
export { createBasemapLayer } from './basemap.js';
export { createWaterLayer } from './water.js';
export { createVegetationLayer } from './vegetation.js';
export { createBuildingsLayer } from './buildings.js';
export { createPiersLayer } from './piers.js';
export { createLandmarksLayer } from './landmarks.js';
export { createVehiclesLayer } from './vehicles.js';
export { createRoutesLayer } from './routes.js';
export { createWalkwaysLayer } from './walkways.js';
export { createFaunaLayer } from './fauna.js';
export { createNeighborsLayer } from './neighbors.js';
export { createLampsLayer } from './lamps.js';
