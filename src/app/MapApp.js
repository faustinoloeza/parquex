import * as THREE from 'three';
import { Stage } from './Stage.js';
import { CameraRig } from './CameraRig.js';
import { QualityManager, detectQuality, gpuName } from './quality.js';
import { liteAssetsOf, loadNeighborAssets, loadParkAssets, loadParkJson } from './assets.js';
import { createParkLayers, createWorld, worldLayers } from './world.js';
import { createMarkers } from '../ui/markers.js';
import { disposeObject, estimateMemory } from '../graphics/memory.js';
import { parkOffset } from '#shared/neighbors.js';
import { nightFor } from './time-of-day.js';
import { NIGHT_TRANSITION, setNightLevel } from '../graphics/night.js';
import { createNavRouteLayer } from '../layers/nav-route.js';

/**
 * The 3D map of one park: loads its assets, builds the world and runs the
 * render loop. UI code talks to it through the public methods below.
 *
 *   const app = new MapApp(container, { park, lang, t });
 *   await app.load();
 *   app.start();
 *
 * The focused park is drawn in full and the parks next to it (and the region
 * around them) in a lightweight version. focusPark() moves the focus to one of
 * those neighbors in place: the new park is built off screen from the data
 * already loaded for its neighbor version, then swapped in with the old focus
 * turned into a neighbor, and the camera flies to it. The world frame is
 * always the focused park's own (local meters around its center): at the swap
 * the camera is moved into the new frame, so nothing jumps on screen.
 */
export class MapApp {
  /**
   * @param {HTMLElement} container
   * @param {object} options
   * @param {import('../parks/define.js').ParkDefinition} options.park
   * @param {string} options.lang
   * @param {(key: string) => string} options.t            translator
   * @param {'auto' | 'high' | 'medium' | 'low'} [options.quality]
   * @param {'auto' | 'day' | 'night'} [options.timeMode]  time of day ('auto': night 19:00–06:00 park time)
   * @param {{ reference?: boolean, still?: boolean, view?: number[] | null, neighbors?: boolean }} [options.debug]
   * @param {(fraction: number) => void} [options.onProgress]
   * @param {(poi: object | null) => void} [options.onSelect]
   */
  constructor(container, { park, lang, t, quality = 'auto', timeMode = 'auto', debug = {}, onProgress = () => {}, onSelect = () => {} }) {
    this.container = container;
    this.parkDef = park;
    this.lang = lang;
    this.t = t;
    this.initialQuality = quality;
    this.timeMode = timeMode;
    /** night level: 1 = night; the current one moves towards the target in NIGHT_TRANSITION s */
    this.nightTarget = nightFor(timeMode) ? 1 : 0;
    this.nightProgress = this.nightTarget;
    this.debug = debug;
    this.onProgress = onProgress;
    this.onSelect = onSelect;
    this.timer = new THREE.Timer();
    this.selected = null;
    this.focusedRoute = null;
    this.labelsDirty = true;
    this.paused = false;
    this.lastMove = 0;
    this.neighborsStarted = false;
    /** optional per-frame hook (stats overlay) */
    this.onFrame = null;
    /** called after focusPark() swapped the focused park in (UI: header, sidebar, URL) */
    this.onFocus = null;
    /** "Directions" pressed on an activity card (app/navigation.js) */
    this.onDirections = null;
    /** a tap on the empty map; returning true keeps the selection (choosing a start point) */
    this.onMapTap = null;
    /** per-frame hooks run after the camera update: fn({ t, dt, pxPerMeter }) (navigation) */
    this.frameHooks = new Set();
    /** key of the park focusPark() is switching to, if any */
    this.switching = null;
    // park.json and lightweight assets (level-0 ground, water, heights, trees) of
    // every park seen, focused or as a neighbor: shared by the neighbors layer and
    // focusPark(), never freed (a few MB per park)
    this.parkJsons = new Map();
    this.liteLoads = new Map();
  }

  /** park.json of a park, fetched once. */
  parkJson(key) {
    if (!this.parkJsons.has(key)) {
      const p = loadParkJson(key);
      p.catch(() => this.parkJsons.delete(key));
      this.parkJsons.set(key, p);
    }
    return this.parkJsons.get(key);
  }

  /** Lightweight assets of a park (layers/neighbors.js), fetched once and kept. */
  liteAssets(key) {
    if (!this.liteLoads.has(key)) {
      const p = loadNeighborAssets(key);
      p.catch(() => this.liteLoads.delete(key));
      this.liteLoads.set(key, p);
    }
    return this.liteLoads.get(key);
  }

  async load() {
    const assets = await loadParkAssets(this.parkDef.key, { reference: this.debug.reference, onProgress: this.onProgress });
    /** park.json: activities, routes, services, extent… */
    this.park = assets.park;
    this.parkJsons.set(this.parkDef.key, Promise.resolve(assets.park));
    const lite = liteAssetsOf(assets);
    if (lite) this.liteLoads.set(this.parkDef.key, Promise.resolve(lite));
    // the device decides the starting quality; multisampling is fixed at creation
    let autoLevel = detectQuality();
    const level = this.initialQuality === 'auto' ? autoLevel : this.initialQuality;
    this.stage = new Stage(this.container, { antialias: level !== 'low' });
    this.applyNight(this.nightProgress);
    // 'auto' follows the park's clock
    setInterval(() => this.updateNightTarget(), 60_000);
    autoLevel = detectQuality(gpuName(this.stage.renderer));
    this.world = await createWorld(this.stage, this.parkDef, assets, {
      neighbors: this.debug.neighbors !== false,
      load: { parkJson: (key) => this.parkJson(key), assets: (key) => this.liteAssets(key) },
    });
    const { heightAt, routes } = this.world;
    this.routeSlugOf = makeRouteLookup(this.park.routes);
    this.markers = createMarkers(this.stage.scene, this.park, {
      t: this.t,
      lang: this.lang,
      heightAt,
      routeSlugOf: this.routeSlugOf,
      onSelect: (poi) => this.select(poi),
      onDirections: (poi) => this.onDirections?.(poi),
    });
    // walking route and walker (app/navigation.js); kept across park switches
    this.navLayer = createNavRouteLayer();
    this.stage.scene.add(this.navLayer.object);
    this.rig = new CameraRig(this.stage, { clear: this.park.clear, heightAt });
    if (this.debug.view) {
      const [x, z, distance, polar = 45, azimuth = 0] = this.debug.view;
      const deg = THREE.MathUtils.degToRad;
      this.rig.applyView({ target: new THREE.Vector3(x, heightAt(x, z), z), distance, polar: deg(polar), azimuth: deg(azimuth) });
    }
    this.quality = new QualityManager(this.stage, this.world.layers, { adaptive: !this.debug.still, autoLevel });
    this.quality.onRecompile = () => this.compileShaders();
    this.quality.set(this.initialQuality);
    this.routes = routes;
    this.bindEvents();
    await this.compileShaders();
    return this;
  }

  /**
   * Compiles every shader without blocking the page (parallel compilation
   * where supported); rendering pauses meanwhile and keeps the last frame.
   */
  async compileShaders() {
    this.paused = true;
    const { renderer, scene, camera } = this.stage;
    try {
      await renderer.compileAsync(scene, camera);
    } finally {
      this.paused = false;
    }
  }

  bindEvents() {
    const canvas = this.stage.renderer.domElement;
    // full frame rate as soon as the user touches the map
    const wake = () => {
      this.lastMove = performance.now();
    };
    this.controls.addEventListener('start', wake);
    this.controls.addEventListener('change', wake);
    // a click on the empty map (not a drag) closes the selected card
    let down = null;
    canvas.addEventListener('pointerdown', (e) => {
      down = [e.clientX, e.clientY];
    });
    canvas.addEventListener('pointerup', (e) => {
      if (down && Math.hypot(e.clientX - down[0], e.clientY - down[1]) < 5 && !this.onMapTap?.(e)) this.select(null);
      down = null;
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.select(null);
    });
    window.addEventListener('resize', () => this.resize());
  }

  // ------------------------------------------------------------- public API

  /**
   * Keys of the parks focusPark() can move to in place: the neighboring parks
   * of the focused one (not regions). Empty without neighbors (?noneighbors).
   * @returns {Promise<string[]>}
   */
  async focusableParks() {
    return (await this.world.neighbors?.cluster) ?? [];
  }

  /**
   * Moves the focus to a neighboring park without reloading: builds it off
   * screen (reusing its neighbor data), swaps it in and turns the previous one
   * into a neighbor, then flies the camera to it. Resolves to false when it
   * cannot (not a neighbor, another switch running, superseded).
   * @param {import('../parks/define.js').ParkDefinition} parkDef
   */
  async focusPark(parkDef) {
    const key = parkDef.key;
    const { neighbors, basemap } = this.world;
    if (key === this.parkDef.key) return true;
    if (this.switching || !neighbors || !(await this.focusableParks()).includes(key)) return false;
    this.switching = key;
    let built = null;
    try {
      const [cached, park] = await Promise.all([this.liteAssets(key), this.parkJson(key)]);
      const assets = await loadParkAssets(key, { cached: { ...cached, park } });
      built = await createParkLayers(this.stage, parkDef, assets, { detached: true });
      const commitNeighbors = await neighbors.prepareFocus({ park, designArea: built.designArea });
      if (!commitNeighbors) throw new Error('superseded');
      // compile the new park's shaders before it shows (it is not in the scene yet)
      const staging = new THREE.Group();
      for (const l of built.layers) staging.add(l.object);
      await this.stage.renderer.compileAsync(staging, this.stage.camera, this.stage.scene);
      for (const l of built.layers) staging.remove(l.object);
      this.swapFocus(parkDef, park, built, commitNeighbors, basemap, assets);
      return true;
    } catch (err) {
      if (err.message !== 'superseded') console.warn('focus switch:', err);
      for (const l of built?.layers ?? []) {
        l.dispose?.();
        disposeObject(l.object, { keep: await this.keptTextures() });
      }
      return false;
    } finally {
      this.switching = null;
    }
  }

  /** Textures of the lightweight assets cache (never freed with a park's layers). */
  async keptTextures() {
    const keep = new Set();
    for (const p of this.liteLoads.values()) {
      const a = await p.catch(() => null);
      if (a) keep.add(a.ground).add(a.waterTexture);
    }
    return keep;
  }

  /** The synchronous part of focusPark(): between two frames, nothing half-done shows. */
  swapFocus(parkDef, park, built, commitNeighbors, basemap, assets) {
    const { stage } = this;
    const old = { layers: this.world.parkLayers, park: this.park, markers: this.markers };
    for (const l of old.layers) stage.scene.remove(l.object);
    for (const l of built.layers) {
      l.setQuality?.(this.quality.preset);
      stage.addLayer(l);
    }
    basemap.setFocus({ park, designArea: built.designArea });
    commitNeighbors();
    // same view, in the new park's frame
    const toNew = parkOffset(park.center, old.park.center);
    for (const v of [stage.camera.position, this.controls.target]) [v.x, v.z] = toNew.toWorld(v.x, v.z);
    stage.camera.updateMatrixWorld();

    this.parkDef = parkDef;
    this.park = park;
    this.parkBuildings = assets.buildings;
    this.parkVegetation = assets.vegetationBuffer;
    const { neighbors } = this.world;
    this.world = {
      ...this.world,
      parkLayers: built.layers,
      heightAt: built.heightAt,
      surfaceAt: built.surfaceAt,
      routes: built.routes,
      designArea: built.designArea,
      layers: worldLayers(built.layers, basemap, neighbors),
    };
    this.quality.layers = this.world.layers;
    this.routes = built.routes;
    this.routeSlugOf = makeRouteLookup(park.routes);
    this.selected = null;
    this.focusedRoute = null;
    old.markers.dispose();
    this.markers = createMarkers(stage.scene, park, {
      t: this.t,
      lang: this.lang,
      heightAt: built.heightAt,
      routeSlugOf: this.routeSlugOf,
      onSelect: (poi) => this.select(poi),
      onDirections: (poi) => this.onDirections?.(poi),
    });
    this.rig.setPark({ clear: park.clear, heightAt: built.heightAt });
    this.rig.flyTo({ ...this.rig.home }, 1.6);
    this.lastMove = performance.now();
    this.labelsDirty = true;
    this.onSelect(null);
    // free the old park; its lightweight assets stay cached for its neighbor version
    this.keptTextures().then((keep) => {
      for (const l of old.layers) {
        l.dispose?.();
        disposeObject(l.object, { keep });
      }
    });
    this.onFocus?.(park, parkDef);
  }

  /** Map controls (e.g. to follow the camera azimuth in a compass). */
  get controls() {
    return this.stage.controls;
  }

  /** Selects an activity (or clears with null): card, route highlight, camera. */
  select(poi) {
    this.selected = poi;
    this.markers.select(poi);
    this.labelsDirty = true;
    // highlight the activity's route unless the user focused one
    if (!this.focusedRoute) this.routes.focus(poi ? this.routeSlugOf(poi) : null);
    this.onSelect(poi);
    if (poi) this.rig.focusPoint(poi.x, poi.z);
  }

  /** @param {{ visible: (poi: object, slug: string | null) => boolean, services: Set<string>, routeVisibility?: [string, boolean] }} filter */
  applyFilter({ visible, services, routeVisibility }) {
    this.markers.filter(visible);
    this.markers.showServices(services);
    if (routeVisibility) this.routes.setVisible(...routeVisibility);
    this.labelsDirty = true;
  }

  /** Highlights a route and frames it (null clears). */
  focusRoute(slug) {
    this.focusedRoute = slug;
    this.routes.focus(slug ?? (this.selected ? this.routeSlugOf(this.selected) : null));
    if (!slug) return;
    const box = this.routes.bounds(slug);
    if (box && !box.isEmpty()) this.rig.frameBox(box);
  }

  /** Highlights several routes at once (the active filter chips on phones); an empty set clears. */
  focusRoutes(slugs) {
    this.focusedRoute = slugs.size ? [...slugs][0] : null;
    this.routes.focus(slugs.size ? slugs : this.selected ? this.routeSlugOf(this.selected) : null);
  }

  /** Frames a ground rectangle ({ x0, x1, z0, z1 }, meters). */
  frameArea({ x0, x1, z0, z1 }) {
    this.rig.frameBox(new THREE.Box3(new THREE.Vector3(x0, 0, z0), new THREE.Vector3(x1, 0, z1)));
  }

  zoom(factor) {
    this.rig.zoom(factor);
  }

  resetView() {
    this.rig.resetView();
  }

  toggleTilt() {
    this.rig.toggleTilt();
  }

  /**
   * Day, night or 'auto' (night from 19:00 to 06:00, park time); changes blend in ~1.5 s.
   * @param {'auto' | 'day' | 'night'} mode
   */
  setTimeMode(mode) {
    this.timeMode = mode;
    this.updateNightTarget();
  }

  /** True when the map shows (or is turning to) night. */
  get night() {
    return this.nightTarget === 1;
  }

  updateNightTarget() {
    const target = nightFor(this.timeMode) ? 1 : 0;
    if (target === this.nightTarget) return;
    this.nightTarget = target;
    this.lastMove = performance.now(); // full frame rate for the transition
  }

  /** Lights, sky, glowing windows, lamps and water at night level k (0 … 1). */
  applyNight(k) {
    this.stage.setNight(k);
    setNightLevel(k);
    document.documentElement.classList.toggle('gx-night', k > 0.5);
    this.labelsDirty = true;
  }

  /** @param {'auto' | 'high' | 'medium' | 'low'} mode */
  setQuality(mode) {
    this.quality.set(mode);
    this.labelsDirty = true;
  }

  /** Width (px) covered by the sidebar on the left (and height of a bottom sheet); the map re-centers. */
  setInset(px, bottom = 0) {
    this.stage.setInset(px, bottom);
    this.labelsDirty = true;
  }

  /** Point of the ground under a screen position (client px): { x, z } or null (sky). */
  groundAt(clientX, clientY) {
    const { camera, renderer } = this.stage;
    const rect = renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster();
    ray.setFromCamera(ndc, camera);
    // the plane at the ground height under the view's target, refined once at the hit
    const { heightAt } = this.world;
    let h = heightAt(this.controls.target.x, this.controls.target.z);
    const hit = new THREE.Vector3();
    for (let i = 0; i < 2; i++) {
      if (!ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), -h), hit)) return null;
      h = Math.max(heightAt(hit.x, hit.z), 0);
    }
    return { x: hit.x, z: hit.z };
  }

  /** Full frame rate for a while (something animates: navigation). */
  wake() {
    this.lastMove = performance.now();
  }

  resize() {
    this.stage.resize();
    this.labelsDirty = true;
  }

  /** Renderer statistics of the last frame. */
  renderStats() {
    const { render } = this.stage.renderer.info;
    return { calls: render.calls, triangles: render.triangles, pixelRatio: this.stage.renderer.getPixelRatio() };
  }

  /** Approximate video memory in use (bytes), per layer. */
  memoryStats() {
    return estimateMemory(this.stage.scene);
  }

  // ------------------------------------------------------------- render loop

  /**
   * Starts the render loop, capped to the quality preset's frame rate (lower
   * when nothing moves).
   * @param {{ frames?: number }} [options] stop after `frames` frames once
   *        streamed data has arrived (screenshots); sets window.__ready
   */
  start({ frames = Infinity } = {}) {
    let n = 0,
      last = -Infinity;
    const startedAt = performance.now();
    const { neighbors } = this.world;
    this.stage.renderer.setAnimationLoop((now) => {
      if (this.paused) return;
      const idle = now - this.lastMove > 2000;
      const fps = idle ? this.quality.preset.idleFps : this.quality.preset.maxFps;
      if (now - last < 1000 / fps - 3) return;
      last = now;
      this.frame(now);
      // neighboring parks load as soon as this park is on screen (in idle
      // moments, one by one), so they never delay it and show within seconds
      n++;
      if (neighbors && !this.neighborsStarted && n >= 2) {
        this.neighborsStarted = true;
        neighbors.start();
      }
      const streaming = this.world.layers.some((l) => l.loading) && now - startedAt < 60000;
      if (n >= frames && !streaming) {
        this.stage.renderer.setAnimationLoop(null);
        window.__ready = true;
      }
    });
  }

  frame(now = performance.now()) {
    const { stage, rig } = this;
    stage.beginFrame();
    this.timer.update();
    const dt = Math.min(this.timer.getDelta(), 0.1);
    const t = this.timer.getElapsed();

    if (this.nightProgress !== this.nightTarget) {
      const step = dt / NIGHT_TRANSITION;
      this.nightProgress =
        this.nightTarget > this.nightProgress ? Math.min(1, this.nightProgress + step) : Math.max(0, this.nightProgress - step);
      this.applyNight(THREE.MathUtils.smoothstep(this.nightProgress, 0, 1));
      this.lastMove = now;
    }
    rig.update(dt);
    if (this.frameHooks.size) {
      const info = { t, dt, pxPerMeter: stage.pixelsPerMeter(rig.distance) };
      for (const hook of this.frameHooks) hook(info);
    }
    const distance = rig.distance;
    stage.updateView(distance);
    stage.updateShadows(this.controls.target, distance);

    const frame = {
      t,
      dt,
      distance,
      pxPerMeter: stage.pixelsPerMeter(distance),
      camera: stage.camera,
      frustum: stage.frustum,
      fovPx: stage.fovPx,
      fogFar: stage.scene.fog.far,
    };
    for (const layer of this.world.layers) layer.update?.(frame);
    this.navLayer.update(frame);

    stage.render();
    this.onFrame?.(dt);
    const moved = stage.cameraMoved();
    if (moved) this.lastMove = now;
    if (moved || this.labelsDirty) {
      stage.renderLabels();
      this.markers.afterRender();
      this.labelsDirty = false;
    }
    this.quality.adapt(dt, now - this.lastMove < 500);
  }
}

/** poi → route slug, through the Spanish route name used in the official data. */
function makeRouteLookup(routes) {
  const bySpanishName = new Map(routes.map((r) => [r.name.es, r.slug]));
  return (poi) => bySpanishName.get(poi.route?.es) ?? null;
}
