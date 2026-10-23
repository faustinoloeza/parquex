import * as THREE from 'three';

const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/**
 * @typedef {object} View  camera orbit around a target
 * @property {THREE.Vector3} target
 * @property {number} distance
 * @property {number} polar    angle from the vertical (0 = top-down)
 * @property {number} azimuth
 */

/** How far (m) from the park the view may wander over the real map. */
const PAN_RADIUS = 15000;

/**
 * Camera behaviour on top of MapControls: named views, animated flights,
 * zoom / tilt buttons and keeping the view within reach of the park.
 */
export class CameraRig {
  /**
   * @param {import('./Stage.js').Stage} stage
   * @param {{ clear: { cx: number, cz: number, radii: number[] }, heightAt: (x: number, z: number) => number }} options
   */
  constructor(stage, { clear, heightAt }) {
    this.camera = stage.camera;
    this.controls = stage.controls;
    this.clear = clear;
    this.heightAt = heightAt;
    this.tween = null;
    this.controls.addEventListener('start', () => {
      this.tween = null; // user interaction cancels flights
    });
    this.home = this.homeView();
    this.applyView(this.home);
  }

  /**
   * Another focused park (MapApp.focusPark): its outline and heights for the
   * views and the pan limit. The camera stays put; flyTo(this.home) frames it.
   * @param {{ clear: { cx: number, cz: number, radii: number[] }, heightAt: (x: number, z: number) => number }} park
   */
  setPark({ clear, heightAt }) {
    this.clear = clear;
    this.heightAt = heightAt;
    this.tween = null;
    this.home = this.homeView();
  }

  /** Whole park in view, slightly tilted. */
  homeView() {
    const { clear } = this;
    const target = new THREE.Vector3(clear.cx, 0, clear.cz + 40);
    const r = Math.max(...clear.radii);
    const fit = (r * 1.05) / Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) / Math.min(1, this.camera.aspect);
    return { target, distance: Math.min(this.controls.maxDistance, fit * 0.78), polar: 0.62, azimuth: 0 };
  }

  /** @param {View} view */
  applyView({ target, distance, polar, azimuth }) {
    const offset = new THREE.Vector3().setFromSphericalCoords(distance, polar, azimuth);
    this.controls.target.copy(target);
    this.camera.position.copy(target).add(offset);
    this.controls.update();
  }

  /** @returns {View} */
  currentView() {
    const offset = this.camera.position.clone().sub(this.controls.target);
    const s = new THREE.Spherical().setFromVector3(offset);
    return { target: this.controls.target.clone(), distance: s.radius, polar: s.phi, azimuth: s.theta };
  }

  /** Animates towards `view` (missing fields keep their current value). */
  flyTo(view, duration = 1.4) {
    const from = this.currentView();
    const to = { ...from, ...view };
    // turn the shortest way around
    const dAz = Math.atan2(Math.sin(to.azimuth - from.azimuth), Math.cos(to.azimuth - from.azimuth));
    to.azimuth = from.azimuth + dAz;
    this.tween = { from, to, t: 0, duration };
  }

  /** Close view of a point (selected activity). */
  focusPoint(x, z) {
    const cur = this.currentView();
    this.flyTo({
      target: new THREE.Vector3(x, this.heightAt(x, z), z),
      distance: Math.min(cur.distance, 190),
      polar: Math.min(Math.max(cur.polar, 0.75), 0.95),
    });
  }

  /** Fits a horizontal box (e.g. a route) in view. */
  frameBox(box) {
    const c = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const r = Math.max(size.x, size.z) * 0.6 + 40;
    const dist = r / Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) / Math.min(1, this.camera.aspect);
    this.flyTo({ target: c.setY(this.heightAt(c.x, c.z)), distance: THREE.MathUtils.clamp(dist, 140, 1000), polar: 0.55 });
  }

  zoom(factor) {
    const cur = this.currentView();
    this.flyTo({ distance: THREE.MathUtils.clamp(cur.distance * factor, this.controls.minDistance, this.controls.maxDistance) }, 0.5);
  }

  resetView() {
    this.flyTo({ ...this.home }, 1.2);
  }

  /** Toggles between top-down (2D) and tilted (3D). */
  toggleTilt() {
    const cur = this.currentView();
    this.flyTo({ polar: cur.polar > 0.2 ? 0.001 : 0.8, azimuth: cur.polar > 0.2 ? 0 : cur.azimuth }, 0.9);
  }

  /** Advances the flight or the damped controls; keeps the target near the park. */
  update(dt) {
    const tw = this.tween;
    if (tw) {
      tw.t = Math.min(1, tw.t + dt / tw.duration);
      const k = ease(tw.t);
      this.applyView({
        target: tw.from.target.clone().lerp(tw.to.target, k),
        distance: THREE.MathUtils.lerp(tw.from.distance, tw.to.distance, k),
        polar: THREE.MathUtils.lerp(tw.from.polar, tw.to.polar, k),
        azimuth: THREE.MathUtils.lerp(tw.from.azimuth, tw.to.azimuth, k),
      });
      if (tw.t >= 1) this.tween = null;
    } else {
      this.controls.update();
    }
    this.clampTarget();
  }

  /** Keeps the camera target within PAN_RADIUS of the park. */
  clampTarget() {
    const { clear } = this;
    const tg = this.controls.target;
    const dx = tg.x - clear.cx,
      dz = tg.z - clear.cz;
    const r = Math.hypot(dx, dz);
    const max = PAN_RADIUS;
    if (r > max) {
      const k = max / r;
      const shift = new THREE.Vector3(clear.cx + dx * k - tg.x, 0, clear.cz + dz * k - tg.z);
      tg.add(shift);
      this.camera.position.add(shift);
    }
  }

  /** Distance from the camera to its target. */
  get distance() {
    return this.camera.position.distanceTo(this.controls.target);
  }
}
