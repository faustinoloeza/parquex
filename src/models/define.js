/**
 * @typedef {object} ModelContext
 * @property {object} park                 park.json data (center, extent, …)
 * @property {(x: number, z: number) => number} heightAt  terrain height
 *
 * @typedef {object} ModelInstance
 * @property {import('three').Object3D} object   model in its local frame
 * @property {(t: number, dt: number) => void} [update]  per-frame animation
 * @property {AnimatedPiece[]} [animation]  what update() moves, for the mobile app (src/export/animated.js)
 *
 * @typedef {object} AnimatedPiece  a moving part the Android app replays with a driver of its own
 * @property {string} name     unique within the model ("cabin", "flag"…)
 * @property {string} driver   app driver that redoes update() (docs/app-movil-noche-navegacion.md → Animaciones)
 * @property {object} params   what the driver needs besides the time
 * @property {number} size     meters of its smallest moving figure (the app animates it only when that covers a few pixels)
 * @property {Array<import('three').Object3D | { object: import('three').Object3D, rest: () => import('three').BufferGeometry }>} parts
 *           objects update() moves, exported in their own frame (the driver gives their whole local matrix);
 *           `rest` gives the undeformed geometry of a mesh whose vertices update() moves
 *
 * @typedef {{ circle: number } | { ellipse: [number, number] } | { rect: [number, number] }} Footprint
 *
 * @typedef {object} ModelDefinition
 * @property {string} type                 id used by park landmarks
 * @property {string} label                human name
 * @property {object} [params]             default parameters
 * @property {(p: object) => Footprint} [footprint]  solid area (local meters) that
 *           route lines must go around (pipeline/stages/routes.js)
 * @property {(p: object) => Array<{ pts: number[][], width: number, closed?: boolean }>} [clearPaths]
 *           absolute paths kept free of generated trees and buildings
 * @property {(p: object) => Array<{ line: number[][], width: number }>} [walkable]
 *           absolute lines visitors can walk on (route snapping)
 * @property {(p: object) => Array<{ rings: number[][][], cover?: number }>} [groundHoles]
 *           absolute areas cut out of the terrain, so the model can go below ground (sunken
 *           moats): even-odd rings; `cover` = height above the model's base of the bridge
 *           that walkways crossing it are drawn on (shared/ground-holes.js)
 * @property {(p: object, ctx: ModelContext) => ModelInstance} build
 */

/**
 * Declares a landmark model. Parameters given in a park's landmarks.js are
 * merged over `params` before calling build/footprint.
 * @param {ModelDefinition} def
 */
export function defineModel(def) {
  if (!def.type || typeof def.build !== 'function') throw new Error('defineModel: type and build() are required');
  return { params: {}, ...def };
}
