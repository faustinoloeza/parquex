import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { RENDER_LAYER } from '../app/render-layers.js';
import { walkwaySegments } from '#shared/walkways.js';

/** Line style (the Android app draws the same: docs/arquitectura.md, «Andadores»). */
export const WALKWAY_STYLE = {
  color: '#fffaf0', // dashes: warm white
  casing: '#4a3b2c', // soft outline under the dashes
  casingOpacity: 0.5,
  worldWidth: 0.9, // m: dash width follows the zoom between minPx and maxPx
  minPx: 2.5,
  maxPx: 7,
  casingPx: 2, // extra outline width (px)
  dashPx: 16, // on-screen dash period (px), snapped to powers of two of the zoom
  dashRatio: 0.6, // dash / period
};

/**
 * Walkways where visitors walk (park.json → walkways) as a dashed light line
 * over a soft outline: two draw calls for the whole network. Drawn in the
 * route pass (hidden by buildings, not by trees) under the official routes;
 * stretches an official route already covers are left out (shared/walkways.js).
 * @returns {import('./index.js').Layer}
 */
export function createWalkwaysLayer({ park, heightAt }) {
  const group = new THREE.Group();
  group.name = 'walkways';
  const segs = walkwaySegments(park.walkways ?? [], park.routes);
  if (!segs.length) return { name: 'walkways', object: group };
  const positions = new Float32Array((segs.length / 4) * 6);
  const y = (x, z) => Math.max(heightAt(x, z), 0.3) + 0.5;
  for (let i = 0, o = 0; i < segs.length; i += 4, o += 6) {
    const [xa, za, xb, zb] = segs.slice(i, i + 4);
    positions.set([xa, y(xa, za), za, xb, y(xb, zb), zb], o);
  }
  const geo = new LineSegmentsGeometry().setPositions(positions);
  const S = WALKWAY_STYLE;
  const material = (color, opacity, dashed) =>
    new LineMaterial({
      color,
      linewidth: S.minPx,
      transparent: true,
      opacity,
      depthTest: true,
      depthWrite: false,
      dashed,
      dashSize: S.dashRatio,
      gapSize: 1 - S.dashRatio,
      worldUnits: false,
    });
  const casing = new LineSegments2(geo, material(S.casing, S.casingOpacity, false));
  const dashes = new LineSegments2(geo, material(S.color, 1, true));
  dashes.computeLineDistances();
  // under the official routes (their casings start at renderOrder 0)
  casing.renderOrder = -2;
  dashes.renderOrder = -1;
  for (const l of [casing, dashes]) {
    l.frustumCulled = false;
    l.layers.set(RENDER_LAYER.ROUTES);
    group.add(l);
  }

  let width = -1,
    scale = -1;
  return {
    name: 'walkways',
    object: group,
    update({ pxPerMeter }) {
      if (!pxPerMeter) return;
      const w = THREE.MathUtils.clamp(S.worldWidth * pxPerMeter, S.minPx, S.maxPx);
      if (Math.abs(w - width) > 0.05) {
        width = w;
        dashes.material.linewidth = w;
        casing.material.linewidth = w + S.casingPx;
      }
      // one dash period ≈ dashPx on screen; powers of two so dashes do not crawl while zooming
      const s = 2 ** Math.round(Math.log2(pxPerMeter / S.dashPx));
      if (s !== scale) dashes.material.dashScale = scale = s;
    },
  };
}
