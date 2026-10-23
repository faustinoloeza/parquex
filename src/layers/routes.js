import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { RENDER_LAYER } from '../app/render-layers.js';

const WORLD_WIDTH = 1.5; // meters, so the line looks painted on the walkway
const MIN_PX = 4.5,
  MAX_PX = 13;

/**
 * Official visitor routes (park.json → routes) as screen-space lines with an
 * outline: outline → stroke → flowing dashes (focused route). They render in
 * their own pass (RENDER_LAYER.ROUTES, see Stage) so buildings hide them while
 * trees and the ground do not; the width follows the zoom (WORLD_WIDTH).
 * @returns {import('./index.js').Layer & { focus(slug: string | null): void, setDimmed(on: boolean): void, setVisible(slug: string, on: boolean): void, bounds(slug: string): THREE.Box3 | null }}
 */
export function createRoutesLayer({ park, heightAt }) {
  const group = new THREE.Group();
  group.name = 'routes';
  const routes = new Map();
  park.routes.forEach((r, ri) => {
    const positions = [];
    for (const line of r.lines) {
      // resample so the line follows the terrain
      const pts = [];
      for (let i = 1; i < line.length; i++) {
        const [x0, z0] = line[i - 1],
          [x1, z1] = line[i];
        const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, z1 - z0) / 4));
        for (let k = 0; k < n; k++) pts.push([x0 + ((x1 - x0) * k) / n, z0 + ((z1 - z0) * k) / n]);
      }
      pts.push(line[line.length - 1]);
      const y = (x, z) => Math.max(heightAt(x, z), 0.3) + 0.9;
      for (let i = 1; i < pts.length; i++) {
        const [xa, za] = pts[i - 1],
          [xb, zb] = pts[i];
        positions.push(xa, y(xa, za), za, xb, y(xb, zb), zb);
      }
    }
    if (!positions.length) return;
    const geo = new LineSegmentsGeometry().setPositions(positions);
    const mk = (color, dashed = false) =>
      new LineMaterial({
        color,
        linewidth: 4,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        dashed,
        dashSize: 5,
        gapSize: 5,
        worldUnits: false,
      });
    const casing = new LineSegments2(geo, mk(r.casing));
    const stroke = new LineSegments2(geo, mk(r.color));
    // flowing dashes shown when the route is focused
    const flow = new LineSegments2(geo, mk(r.casing, true));
    flow.computeLineDistances();
    flow.visible = false;
    for (const l of [casing, stroke, flow]) {
      l.frustumCulled = false;
      l.layers.set(RENDER_LAYER.ROUTES);
      group.add(l);
    }
    routes.set(r.slug, { def: r, index: ri, casing, stroke, flow, visible: true });
  });

  let focused = null;
  let dimAll = false; // a walking route is shown (app/navigation.js): every route steps back
  let base = 4.5; // px, updated with the zoom level
  function apply() {
    const n = routes.size;
    for (const [slug, r] of routes) {
      const isFocus = focused === slug && !dimAll;
      const dim = dimAll || (focused && !isFocus);
      const w = isFocus ? base * 1.45 : dim ? base * 0.7 : base;
      const outline = Math.min(5, Math.max(2.5, w * 0.4));
      r.stroke.material.linewidth = w;
      r.casing.material.linewidth = w + outline;
      r.flow.material.linewidth = w * 0.42;
      r.stroke.material.opacity = dim ? 0.4 : 1;
      r.casing.material.opacity = dim ? 0.3 : 1;
      r.casing.visible = r.stroke.visible = r.visible;
      r.flow.visible = r.visible && isFocus;
      // all outlines first, then all strokes; the focused route on top of everything
      const top = isFocus ? 3 * n : 0;
      r.casing.renderOrder = top + r.index;
      r.stroke.renderOrder = top + n + r.index;
      r.flow.renderOrder = top + 2 * n + r.index;
    }
  }
  apply();

  return {
    name: 'routes',
    object: group,
    focus(slug) {
      focused = slug && routes.has(slug) ? slug : null;
      apply();
    },
    /** Dims every route (under a walking route); false restores the focus state. */
    setDimmed(on) {
      dimAll = on;
      apply();
    },
    setVisible(slug, v) {
      const r = routes.get(slug);
      if (r) {
        r.visible = v;
        apply();
      }
    },
    bounds(slug) {
      const r = routes.get(slug);
      if (!r) return null;
      const box = new THREE.Box3();
      for (const l of r.def.lines) for (const [x, z] of l) box.expandByPoint(new THREE.Vector3(x, 0, z));
      return box;
    },
    update({ t, pxPerMeter }) {
      if (pxPerMeter) {
        const w = THREE.MathUtils.clamp(WORLD_WIDTH * pxPerMeter, MIN_PX, MAX_PX);
        if (Math.abs(w - base) > 0.05) {
          base = w;
          apply();
        }
      }
      if (!focused) return;
      const r = routes.get(focused);
      if (r?.flow.visible) r.flow.material.dashOffset = -t * 10;
    },
  };
}
