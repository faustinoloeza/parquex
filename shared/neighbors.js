// Neighboring parks: parks whose designed areas lie close to the focused one
// (Xcaret, Xplor and Xenses touch each other near Playa del Carmen) are drawn
// around it in a lightweight version (ground + trees).
//
// Each park's data lives in its own local frame (shared/geo.js: meters on a
// tangent plane around park.json → center). The focused park's frame is the
// world frame; a neighbor is placed with the exact affine map between both
// equirectangular projections, the same one the real-map tiles go through
// (layers/basemap.js projects lat/lng with the focused park's projection), so
// neighbor ground, trees and OpenStreetMap line up.

import { makeProjection } from './geo.js';
import { makeDesignArea } from './design-area.js';

/** Designed areas closer than this (m, outline to outline) are neighbors. */
export const NEIGHBOR_DISTANCE = 1500;

/**
 * Affine map from `other`'s local frame to `focus`'s local frame:
 *   world x = x · sx + dx,  world z = z + dz
 * sx = cos(lat other) / cos(lat focus) differs from 1 by ~1e-4 for parks a
 * few km apart (a few cm over a park), but it is exact and free, so it is kept.
 * @param {{ lat: number, lng: number }} focus  park.json → center of the focused park
 * @param {{ lat: number, lng: number }} other  park.json → center of the neighbor
 * @returns {{ dx: number, dz: number, sx: number,
 *   toWorld: (x: number, z: number) => [number, number], toLocal: (x: number, z: number) => [number, number] }}
 */
export function parkOffset(focus, other) {
  const f = makeProjection(focus.lat, focus.lng);
  const o = makeProjection(other.lat, other.lng);
  const [dx, dz] = f.toLocal(other.lat, other.lng);
  const sx = f.mLng / o.mLng;
  return {
    dx,
    dz,
    sx,
    toWorld: (x, z) => [x * sx + dx, z + dz],
    toLocal: (x, z) => [(x - dx) / sx, z - dz],
  };
}

/**
 * A park's designed area (park.json → clear) moved into another frame. The
 * polar radii are kept (the sx stretch is ≈ 1e-4).
 * @param {{ cx: number, cz: number, radii: number[] }} clear
 * @param {ReturnType<typeof parkOffset>} offset
 */
export function movedDesignArea(clear, offset) {
  const [cx, cz] = offset.toWorld(clear.cx, clear.cz);
  return makeDesignArea({ cx, cz, radii: clear.radii });
}

/**
 * Smallest distance (m) between two designed-area outlines, sampled along
 * both; ≤ 0 when they overlap. Radial approximation like signedDistance().
 * @param {ReturnType<typeof makeDesignArea>} a
 * @param {ReturnType<typeof makeDesignArea>} b
 */
export function outlineGap(a, b) {
  let gap = Infinity;
  const sample = (from, to) => {
    const n = from.radii.length * 2;
    for (let k = 0; k < n; k++) {
      const angle = (k / n) * Math.PI * 2;
      const r = from.radiusAt(angle);
      gap = Math.min(gap, to.signedDistance(from.cx + Math.cos(angle) * r, from.cz + Math.sin(angle) * r));
    }
  };
  sample(a, b);
  sample(b, a);
  return gap;
}

/**
 * Parks to draw around the focused one, closest first (the order is also the
 * priority where two neighbors overlap). Regions (park.json → region: land
 * around several parks, src/parks/xcr) come last whatever their distance: they
 * overlap the parks they surround and must yield to all of them.
 * @param {{ key: string, center: { lat: number, lng: number }, clear: object }} focus park.json of the focused park
 * @param {Array<{ key: string, center: { lat: number, lng: number }, clear: object, region?: boolean }>} parks park.json of every other park
 * @param {number} [maxGap] meters between outlines
 * @returns {Array<{ key: string, park: object, offset: ReturnType<typeof parkOffset>, area: ReturnType<typeof makeDesignArea>, gap: number, region: boolean }>}
 *          area: the neighbor's designed area in the focused park's frame
 */
export function findNeighbors(focus, parks, maxGap = NEIGHBOR_DISTANCE) {
  const focusArea = makeDesignArea(focus.clear);
  const found = [];
  for (const park of parks) {
    if (park.key === focus.key || !park.center || !park.clear) continue;
    const offset = parkOffset(focus.center, park.center);
    // quick reject: centers farther apart than both outlines plus the gap
    const [cx, cz] = offset.toWorld(park.clear.cx, park.clear.cz);
    const reach = focusArea.maxRadius + Math.max(...park.clear.radii) + maxGap;
    if (Math.hypot(cx - focusArea.cx, cz - focusArea.cz) > reach) continue;
    const area = movedDesignArea(park.clear, offset);
    const gap = outlineGap(focusArea, area);
    if (gap <= maxGap) found.push({ key: park.key, park, offset, area, gap, region: !!park.region });
  }
  return found.sort((a, b) => a.region - b.region || a.gap - b.gap || (a.key < b.key ? -1 : 1));
}

/**
 * Opacity of a neighbor's ground at a point: its own fade towards the real map
 * (local frame) times the fade of every area it yields to (world frame): the
 * focused park and the neighbors ranked before it. 1 = only the neighbor shows.
 * @param {ReturnType<typeof makeDesignArea>} own   the neighbor's area, local frame
 * @param {ReturnType<typeof parkOffset>} offset
 * @param {Array<ReturnType<typeof makeDesignArea>>} yieldTo areas in the world frame
 * @returns {(x: number, z: number) => number} takes local coordinates
 */
export function neighborOpacity(own, offset, yieldTo) {
  return (x, z) => {
    let a = 1 - own.fade(x, z);
    if (a <= 0) return 0;
    const [wx, wz] = offset.toWorld(x, z);
    for (const area of yieldTo) a *= area.fade(wx, wz);
    return a;
  };
}

/**
 * Like neighborOpacity without the neighbor's own fade: only where it yields
 * to other areas (a region's water applies its own fade in the shader).
 * @param {ReturnType<typeof parkOffset>} offset
 * @param {Array<ReturnType<typeof makeDesignArea>>} yieldTo areas in the world frame
 * @returns {(x: number, z: number) => number} takes local coordinates
 */
export function yieldOpacity(offset, yieldTo) {
  return (x, z) => {
    const [wx, wz] = offset.toWorld(x, z);
    let a = 1;
    for (const area of yieldTo) a *= area.fade(wx, wz);
    return a;
  };
}
