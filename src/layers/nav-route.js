import * as THREE from 'three';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { RENDER_LAYER } from '../app/render-layers.js';

/** Look of the walking route (Google-Maps-like blue with a white casing). */
export const NAV_STYLE = {
  color: '#1a73e8',
  night: '#5b9cff', // lighter blue over the dark night map
  walked: '#8fa8c8', // the part already walked
  casing: '#ffffff',
  worldWidth: 2.6, // m: width follows the zoom between minPx and maxPx
  minPx: 6,
  maxPx: 14,
  casingPx: 5,
  lift: 1.3, // m above the ground (over walkways and routes)
};

/**
 * The walking route on the map and the walker: a thick blue line with a white
 * casing, the stretch already walked in grey, dashed connectors between the
 * network and the start / destination, a destination pin and the user's
 * position (blue dot, accuracy halo, heading cone) as HTML markers. Drawn in
 * the route pass on top of everything (no depth test: never hidden by a roof).
 * Owned by MapApp (not a park layer: it survives park switches, cleared then).
 */
export function createNavRouteLayer() {
  const group = new THREE.Group();
  group.name = 'nav-route';
  const mat = (color, { dashed = false, opacity = 1 } = {}) =>
    new LineMaterial({
      color,
      linewidth: NAV_STYLE.minPx,
      transparent: true,
      opacity,
      depthTest: false,
      depthWrite: false,
      dashed,
      dashSize: 1,
      gapSize: 0.8,
      worldUnits: false,
    });
  const casing = new Line2(new LineGeometry(), mat(NAV_STYLE.casing));
  const walked = new Line2(new LineGeometry(), mat(NAV_STYLE.walked));
  const stroke = new Line2(new LineGeometry(), mat(NAV_STYLE.color));
  const gapCasing = new LineSegments2(new LineSegmentsGeometry(), mat(NAV_STYLE.casing, { opacity: 0.85, dashed: true }));
  const gaps = new LineSegments2(new LineSegmentsGeometry(), mat(NAV_STYLE.color, { dashed: true }));
  // drawn last, the dashed connectors under the solid line
  [gapCasing, gaps, casing, walked, stroke].forEach((l, i) => {
    l.frustumCulled = false;
    l.layers.set(RENDER_LAYER.ROUTES);
    l.renderOrder = 10000 + i;
    l.visible = false;
    group.add(l);
  });

  const marker = (className, html) => {
    const anchor = document.createElement('div');
    anchor.className = 'marker-anchor';
    const el = document.createElement('div');
    el.className = className;
    el.innerHTML = html;
    anchor.appendChild(el);
    const obj = new CSS2DObject(anchor);
    obj.visible = false;
    group.add(obj);
    return { obj, el };
  };
  const me = marker('nav-me', '<div class="nav-me-halo"></div><div class="nav-me-cone"></div><div class="nav-me-dot"></div>');
  const dest = marker(
    'nav-dest',
    '<svg viewBox="0 0 24 34" aria-hidden="true"><path d="M12 33s11-11.6 11-20A11 11 0 0 0 1 13c0 8.4 11 20 11 20z"/><circle cx="12" cy="12.5" r="4.2"/></svg>',
  );

  /** resampled route (every ~3 m) with heights and distance along: [x, y, z, s] */
  let samples = [];
  let walkedAt = -1;
  let user = null;
  let widthPx = -1;
  let heightAt = () => 0;
  const y = (x, z) => Math.max(heightAt(x, z), 0.3) + NAV_STYLE.lift;

  function resample(points, from, to) {
    const out = [];
    let s = 0;
    for (let i = 1; i < points.length; i++) {
      const [x0, z0] = points[i - 1],
        [x1, z1] = points[i];
      const len = Math.hypot(x1 - x0, z1 - z0);
      const n = Math.max(1, Math.ceil(len / 3));
      for (let k = 0; k < n; k++) {
        const x = x0 + ((x1 - x0) * k) / n,
          z = z0 + ((z1 - z0) * k) / n;
        if (s + (len * k) / n >= from - 1e-6 && s + (len * k) / n <= to + 1e-6) out.push([x, y(x, z), z, s + (len * k) / n]);
      }
      s += len;
    }
    const [lx, lz] = points.at(-1);
    if (s <= to + 1e-6) out.push([lx, y(lx, lz), lz, s]);
    return out;
  }
  const setLine = (line, pts) => {
    line.visible = pts.length >= 2;
    if (!line.visible) return;
    line.geometry.dispose();
    line.geometry = new LineGeometry().setPositions(pts.flatMap((p) => [p[0], p[1], p[2]]));
    line.computeLineDistances();
  };

  function drawProgress(along) {
    const solid = samples.filter((p) => p[3] >= along);
    const done = samples.filter((p) => p[3] <= along);
    if (along > 0 && samples.length) {
      // the exact split point
      const i = samples.findIndex((p) => p[3] >= along);
      if (i > 0) {
        const a = samples[i - 1],
          b = samples[i];
        const k = (along - a[3]) / (b[3] - a[3] || 1);
        const cut = [a[0] + (b[0] - a[0]) * k, 0, a[2] + (b[2] - a[2]) * k, along];
        cut[1] = y(cut[0], cut[2]);
        solid.unshift(cut);
        done.push(cut);
      }
    }
    setLine(stroke, solid);
    setLine(casing, samples);
    setLine(walked, done);
  }

  return {
    name: 'nav-route',
    object: group,

    /**
     * Shows a route (shared/nav-graph.js → route()), or clears it with null.
     * @param {{ points: number[][], gaps: [number, number], length: number } | null} r
     * @param {{ heightAt?: (x: number, z: number) => number, destination?: { x: number, z: number } }} [options]
     */
    setRoute(r, options = {}) {
      if (options.heightAt) heightAt = options.heightAt;
      walkedAt = -1;
      if (!r) {
        samples = [];
        for (const l of [casing, walked, stroke, gapCasing, gaps]) l.visible = false;
        dest.obj.visible = false;
        return;
      }
      const [g0, g1] = r.gaps;
      samples = resample(r.points, g0, r.length - g1);
      if (samples.length < 2) samples = resample(r.points, 0, r.length);
      drawProgress(0);
      // dashed connectors (start → network, network → destination)
      const pts = [];
      const first = r.points[0],
        last = r.points.at(-1);
      const seg = (a, b) => [a[0], y(a[0], a[1]), a[1], b[0], y(b[0], b[1]), b[1]];
      if (g0 > 0.5 && samples.length) pts.push(seg(first, [samples[0][0], samples[0][2]]));
      if (g1 > 0.5 && samples.length) pts.push(seg([samples.at(-1)[0], samples.at(-1)[2]], last));
      for (const [line, on] of [
        [gaps, pts.length],
        [gapCasing, pts.length],
      ]) {
        line.visible = !!on;
        if (!on) continue;
        line.geometry.dispose();
        line.geometry = new LineSegmentsGeometry().setPositions(pts.flat());
        line.computeLineDistances();
      }
      const d = options.destination ?? { x: last[0], z: last[1] };
      dest.obj.position.set(d.x, y(d.x, d.z) + 0.5, d.z);
      dest.obj.visible = true;
    },

    /** Greys the stretch already walked (meters along the route). */
    setWalked(along) {
      if (!samples.length || Math.abs(along - walkedAt) < 2) return;
      walkedAt = along;
      drawProgress(along);
    },

    /**
     * The walker's position (null hides it).
     * @param {{ x: number, z: number, accuracy?: number, heading?: { dx: number, dz: number } | null, simulated?: boolean } | null} u
     */
    setUser(u) {
      user = u;
      me.obj.visible = !!u;
      if (!u) return;
      me.obj.position.set(u.x, y(u.x, u.z), u.z);
      me.el.classList.toggle('is-sim', !!u.simulated);
      me.el.classList.toggle('has-heading', !!u.heading);
    },

    update({ pxPerMeter, camera }) {
      if (pxPerMeter) {
        const w = THREE.MathUtils.clamp(NAV_STYLE.worldWidth * pxPerMeter, NAV_STYLE.minPx, NAV_STYLE.maxPx);
        if (Math.abs(w - widthPx) > 0.05) {
          widthPx = w;
          stroke.material.linewidth = walked.material.linewidth = w;
          casing.material.linewidth = w + NAV_STYLE.casingPx;
          gaps.material.linewidth = Math.max(3, w * 0.55);
          gapCasing.material.linewidth = Math.max(3, w * 0.55) + 2.5;
          // dashes ≈ 1.3 route widths on screen
          gaps.material.dashScale = gapCasing.material.dashScale = pxPerMeter / (w * 1.3);
        }
      }
      const night = document.documentElement.classList.contains('gx-night');
      stroke.material.color.set(night ? NAV_STYLE.night : NAV_STYLE.color);
      gaps.material.color.copy(stroke.material.color);
      if (!user || !me.obj.visible) return;
      // accuracy halo in meters; heading cone turned to the screen direction
      const halo = user.accuracy ? THREE.MathUtils.clamp(user.accuracy * 2 * pxPerMeter, 26, 260) : 0;
      me.el.style.setProperty('--halo', `${halo}px`);
      if (user.heading && camera) {
        const p = me.obj.position;
        const a = tmp.copy(p).project(camera);
        const b = tmp2.set(p.x + user.heading.dx * 10, p.y, p.z + user.heading.dz * 10).project(camera);
        const angle = Math.atan2(b.x - a.x, (b.y - a.y) / camera.aspect) * (180 / Math.PI);
        me.el.style.setProperty('--heading', `${angle.toFixed(1)}deg`);
      }
    },

    dispose() {
      for (const l of [casing, walked, stroke, gapCasing, gaps]) {
        l.geometry.dispose();
        l.material.dispose();
      }
      group.traverse((o) => o.element?.remove());
    },
  };
}

const tmp = new THREE.Vector3(),
  tmp2 = new THREE.Vector3();
