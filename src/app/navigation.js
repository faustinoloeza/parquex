import * as THREE from 'three';
import { makeProjection } from '#shared/geo.js';
import { NAV, buildGraph, route as findRoute } from '#shared/nav-graph.js';
import { bannerText, chooseStart, findEntrance, guidance, prepareRoute, walkMinutes, walkerAt } from '#shared/navigation.js';
import { localized } from '../i18n/index.js';
import { watchLocation } from './geolocation.js';

/** Seconds between two re-routes while off the route. */
const REROUTE_EVERY = 4;
/** Simulation speeds (× walking speed). */
export const SIM_SPEEDS = [1, 4, 10];

/**
 * Walking navigation, Google-Maps-like (docs/arquitectura.md, «Navegación a pie»):
 *
 *   idle ──directions(poi)──► preview ──start()──► active ──(< 12 m)──► arrived
 *     ▲                         │  route drawn, camera    camera follows the walker,
 *     └──────────end()──────────┘  framed, steps panel    banner with the next maneuver
 *
 * The walk starts at the device location when it is in (or near) the park;
 * otherwise — far away, permission denied, no location — at the park entrance,
 * simulated, and the user may tap the map to choose another start. In active
 * mode the walker is the real location (re-routing when it strays > 25 m) or
 * a simulated walker moving along the route at walking speed × 1 / 4 / 10.
 * Switching the focused park (reset()) cancels everything.
 */
export class Navigation {
  /**
   * @param {import('./MapApp.js').MapApp} app
   * @param {ReturnType<typeof import('../ui/directions.js').createDirections>} ui
   * @param {{ lang: string, onLayout?: (mode: 'idle' | 'preview' | 'active') => void }} options
   */
  constructor(app, ui, { lang, onLayout = () => {} }) {
    this.app = app;
    this.ui = ui;
    this.lang = lang;
    this.onLayout = onLayout;
    this.mode = 'idle';
    this.speed = 4;
    this.fix = null; // latest real location, local meters
    this.geoError = null;
    this.stopWatch = null;
    this.manual = null;
    this.picking = false;
    this.followPaused = false;
    this.graphs = new Map();
    this.hook = (f) => this.update(f);
    app.controls.addEventListener('start', () => {
      if (this.mode === 'active' || this.mode === 'arrived') {
        this.followPaused = true;
        this.ui.setFollowPaused(true);
      }
    });
    this.reset();
  }

  get t() {
    return this.app.t;
  }

  /** The focused park changed (or first load): forget the route and the park's data. */
  reset() {
    if (this.mode !== 'idle') this.end();
    const park = this.app.park;
    this.projection = makeProjection(park.center.lat, park.center.lng);
    this.entrance = findEntrance(park, this.app.parkDef.sources?.entrance);
    this.manual = null;
    if (this.lastLatLng) this.fix = this.toLocal(this.lastLatLng);
  }

  /** Walking graph of the focused park, built on first use (≈ 15 ms for Xcaret). */
  get graph() {
    const key = this.app.parkDef.key;
    if (!this.graphs.has(key)) this.graphs.set(key, buildGraph(this.app.park));
    return this.graphs.get(key);
  }

  toLocal(f) {
    const [x, z] = this.projection.toLocal(f.lat, f.lng);
    const h = f.heading;
    return {
      x,
      z,
      accuracy: f.accuracy,
      heading: h === null ? null : { dx: Math.sin((h * Math.PI) / 180), dz: -Math.cos((h * Math.PI) / 180) },
    };
  }

  /** Starts following the device location (asks for permission the first time). */
  watch() {
    if (this.stopWatch) return;
    this.stopWatch = watchLocation(
      (f) => {
        const prev = this.fix;
        this.lastLatLng = f;
        this.fix = this.toLocal(f);
        this.geoError = null;
        // heading from the movement when the device gives none
        if (!this.fix.heading && prev && Math.hypot(this.fix.x - prev.x, this.fix.z - prev.z) > 3) {
          const d = Math.hypot(this.fix.x - prev.x, this.fix.z - prev.z);
          this.fix.heading = { dx: (this.fix.x - prev.x) / d, dz: (this.fix.z - prev.z) / d };
        } else if (!this.fix.heading && prev?.heading) this.fix.heading = prev.heading;
        this.onLocation();
      },
      (err) => {
        this.geoError = err;
        if (!this.fix || err === 'denied') this.fix = null;
        this.onLocation();
      },
    );
  }

  /** Where the walk starts now (real or simulated). */
  start() {
    const area = this.app.world.designArea;
    return chooseStart({
      fix: this.fix,
      error: this.geoError,
      signedDistance: area.signedDistance,
      entrance: this.entrance,
      manual: this.manual,
    });
  }

  /** Activities named at turns ("near …"), the destination left out. */
  landmarks() {
    return this.app.park.pois
      .filter((p) => p.active && p.id !== this.destination?.id && !(p.x === this.destination?.x && p.z === this.destination?.z))
      .map((p) => ({ name: localized(p.name, this.lang), x: p.x, z: p.z }));
  }

  computeRoute(from) {
    const dest = this.destination;
    const t0 = performance.now();
    const r = findRoute(
      this.graph,
      from,
      { x: dest.x, z: dest.z, name: localized(dest.name, this.lang) },
      { t: this.t, landmarks: this.landmarks() },
    );
    this.routeMs = performance.now() - t0;
    return prepareRoute(r);
  }

  // ------------------------------------------------------------- preview

  /** Directions to an activity: route from the current start, drawn and framed, with the steps panel. */
  directions(poi) {
    if (!poi) return;
    this.watch();
    this.stopActive();
    this.destination = poi;
    this.mode = 'preview';
    this.app.select(null);
    this.preview({ frame: true });
  }

  preview({ frame = false } = {}) {
    const from = this.start();
    this.from = from;
    this.route = this.computeRoute(from);
    const { navLayer } = this.app;
    this.app.routes.setDimmed(true);
    navLayer.setRoute(this.route, { heightAt: this.app.world.surfaceAt, destination: this.destination });
    navLayer.setUser({
      x: from.x,
      z: from.z,
      accuracy: from.simulated ? 0 : from.accuracy,
      heading: from.heading,
      simulated: from.simulated,
    });
    this.app.labelsDirty = true;
    this.app.wake();
    this.ui.showPreview({
      poi: this.destination,
      name: localized(this.destination.name, this.lang),
      distance: this.route.length,
      minutes: walkMinutes(this.route.length),
      steps: this.route.steps,
      from,
      direct: this.route.direct,
    });
    // the map makes room for the panel before the route is framed
    this.onLayout('preview');
    if (frame) this.frameRoute();
  }

  frameRoute() {
    const box = new THREE.Box3();
    for (const [x, z] of this.route.points) box.expandByPoint(new THREE.Vector3(x, 0, z));
    box.expandByScalar(15);
    this.app.rig.frameBox(box);
  }

  /** Location news: refresh the preview (start may change), or guide the real walker. */
  onLocation() {
    if (this.mode === 'preview' && !this.manual) {
      const next = this.start();
      const moved = !this.from || Math.hypot(next.x - this.from.x, next.z - this.from.z) > 5;
      if (moved || next.reason !== this.from.reason) this.preview({ frame: next.reason !== this.from?.reason });
      else this.app.navLayer.setUser({ ...this.from, accuracy: next.accuracy, heading: next.heading });
    }
  }

  /** Lets the user tap the map to choose the start point (simulated). */
  pickStart() {
    this.picking = true;
    this.ui.setPicking(true);
    this.app.onMapTap = (e) => {
      const p = this.app.groundAt(e.clientX, e.clientY);
      if (!p) return true;
      this.manual = p;
      this.cancelPick();
      if (this.mode === 'preview') this.preview();
      return true;
    };
  }

  cancelPick() {
    this.picking = false;
    this.app.onMapTap = null;
    this.ui.setPicking(false);
  }

  /** Back to the real location (or the entrance) after a point was chosen. */
  clearManual() {
    this.manual = null;
    if (this.mode === 'preview') this.preview();
  }

  // -------------------------------------------------------------- active

  /**
   * Turn-by-turn guidance. `simulate`: a walker moves along the route (the
   * default when the location is simulated); otherwise the real location.
   */
  begin({ simulate = this.from?.simulated ?? true } = {}) {
    if (!this.route) return;
    if (this.picking) this.cancelPick();
    this.simulate = simulate;
    if (!simulate && this.from?.simulated) this.simulate = true;
    this.mode = 'active';
    this.simAlong = 0;
    this.hint = 0;
    this.lastReroute = 0;
    this.followPaused = false;
    this.smoothHeading = null;
    this.onLayout('active');
    this.ui.showActive({ simulate: this.simulate, speed: this.speed });
    this.ui.setFollowPaused(false);
    this.app.frameHooks.add(this.hook);
    this.app.wake();
  }

  setSpeed(k) {
    this.speed = k;
  }

  recenter() {
    this.followPaused = false;
    this.ui.setFollowPaused(false);
  }

  stopActive() {
    this.app.frameHooks.delete(this.hook);
  }

  /** Ends the navigation (preview or active): clears the route and the panels. */
  end() {
    this.stopActive();
    if (this.picking) this.cancelPick();
    this.mode = 'idle';
    this.route = null;
    this.app.navLayer.setRoute(null);
    this.app.navLayer.setUser(null);
    this.app.routes.setDimmed(false);
    this.app.labelsDirty = true;
    this.ui.hide();
    this.onLayout('idle');
  }

  /** Per frame while active: move the walker, update the guidance and the camera. */
  update({ dt, t }) {
    const r = this.route;
    if (!r || (this.mode !== 'active' && this.mode !== 'arrived')) return;
    this.app.wake();
    let pos;
    if (this.simulate) {
      if (this.mode === 'active') this.simAlong = Math.min(r.length, this.simAlong + NAV.speed * this.speed * dt);
      const w = walkerAt(r, this.simAlong);
      pos = { x: w.x, z: w.z, heading: { dx: w.dx, dz: w.dz }, accuracy: 0, simulated: true };
    } else {
      if (!this.fix) return;
      pos = { ...this.fix, simulated: false };
    }
    const g = guidance(r, pos, { hint: this.hint, destination: this.destination });
    this.hint = g.along;
    if (g.offRoute && !this.simulate && t - this.lastReroute > REROUTE_EVERY) {
      this.lastReroute = t;
      this.ui.setBanner({ text: this.t('nav_rerouting'), turn: 'straight' });
      this.route = this.computeRoute(pos);
      this.hint = 0;
      this.app.navLayer.setRoute(this.route, { heightAt: this.app.world.surfaceAt, destination: this.destination });
      return;
    }
    if (this.simulate && this.simAlong >= r.length - 0.01) g.arrived = true;
    this.app.navLayer.setWalked(g.along);
    this.app.navLayer.setUser(pos);
    this.app.labelsDirty = true;
    if (g.arrived && this.mode !== 'arrived') {
      this.mode = 'arrived';
      this.ui.showArrived(localized(this.destination.name, this.lang));
    }
    if (this.mode === 'active') {
      const step = r.steps[g.next];
      const after = r.steps[g.next + 1];
      this.ui.setBanner({
        text: bannerText(r, g, this.t, this.lang),
        turn: step.turn,
        slight: step.slight,
        then: after && g.toNext < 60 ? after : null,
        remaining: g.remaining,
        minutes: walkMinutes(g.remaining),
      });
    }
    if (!this.followPaused) this.follow(pos, dt);
  }

  /** Camera behind the walker, tilted, heading up, looking a little ahead. */
  follow(pos, dt) {
    const k = 1 - Math.exp(-dt * 3);
    const h = pos.heading ?? this.smoothHeading ?? { dx: 0, dz: -1 };
    if (!this.smoothHeading) this.smoothHeading = { ...h };
    const sh = this.smoothHeading;
    const kh = 1 - Math.exp(-dt * 2);
    sh.dx += (h.dx - sh.dx) * kh;
    sh.dz += (h.dz - sh.dz) * kh;
    const len = Math.hypot(sh.dx, sh.dz) || 1;
    const dx = sh.dx / len,
      dz = sh.dz / len;
    const { rig } = this.app;
    const cur = rig.currentView();
    const ahead = 22;
    const tx = pos.x + dx * ahead,
      tz = pos.z + dz * ahead;
    const target = new THREE.Vector3(tx, this.app.world.surfaceAt(tx, tz), tz);
    const azimuth = Math.atan2(-dx, -dz);
    const dAz = Math.atan2(Math.sin(azimuth - cur.azimuth), Math.cos(azimuth - cur.azimuth));
    rig.tween = null;
    rig.applyView({
      target: cur.target.lerp(target, k),
      distance: THREE.MathUtils.lerp(cur.distance, 170, k),
      polar: THREE.MathUtils.lerp(cur.polar, 0.92, k),
      azimuth: cur.azimuth + dAz * k,
    });
  }
}
