import * as THREE from 'three';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { SUN_DIRECTION } from '#shared/scene.js';
import { RENDER_LAYER } from './render-layers.js';

const tmpA = new THREE.Color(),
  tmpB = new THREE.Color();
const tmpSize = new THREE.Vector2();

export const SUN = new THREE.Vector3(...SUN_DIRECTION).normalize();

/**
 * Light of the scene by day and by night (Stage.setNight blends them).
 * Day: soft, bright ambient and a warm sun with light shadows (clean pastel
 * 3D-map look). Night: deep navy sky, indigo ambient and a dim cool moon
 * (same direction as the sun: shadows and baked ground shadows agree); the
 * warm light comes from windows and street lamps (graphics/night.js,
 * layers/lamps.js).
 */
export const LIGHTING = {
  day: {
    sky: '#e3edf2', // background and fog
    hemiSky: '#f3f7ff',
    hemiGround: '#8c9c70',
    hemi: 1.6,
    sun: '#fff0d9',
    sunIntensity: 2.3,
    shadow: 0.72, // shadow darkness (light.shadow.intensity)
    exposure: 1.06,
  },
  night: {
    sky: '#0d1a3e',
    hemiSky: '#7c86cc',
    hemiGround: '#5a4462', // warm purple bounce from the lit ground
    hemi: 1.75,
    sun: '#a9b9ff',
    sunIntensity: 0.5,
    shadow: 0.5,
    exposure: 1.0,
  },
};

/**
 * Everything needed to draw: WebGL renderer, HTML label renderer, scene,
 * camera, lights and map controls.
 *
 * A frame is rendered in passes (render()):
 *   1. the whole scene
 *   2. depth of the solid buildings only (RENDER_LAYER.OCCLUDERS)
 *   3. route lines (RENDER_LAYER.ROUTES) tested against that depth,
 *      so buildings hide them but trees and the ground do not.
 */
export class Stage {
  /**
   * @param {HTMLElement} container
   * @param {{ antialias?: boolean }} [options]
   */
  constructor(container, { antialias = true } = {}) {
    this.container = container;
    this.inset = 0;
    this.insetBottom = 0;

    const renderer = new THREE.WebGLRenderer({ antialias, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = LIGHTING.day.exposure;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.shadowMap.autoUpdate = false; // see updateShadows()
    renderer.info.autoReset = false; // several passes per frame; reset in beginFrame()
    container.appendChild(renderer.domElement);
    // static data lives only on the GPU (graphics/memory.js): if the browser
    // drops the context (low memory), start over once it is back
    renderer.domElement.addEventListener('webglcontextrestored', () => location.reload());
    this.renderer = renderer;

    const labels = new CSS2DRenderer();
    labels.setSize(container.clientWidth, container.clientHeight);
    labels.domElement.className = 'labels-layer';
    container.appendChild(labels.domElement);
    this.labels = labels;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(LIGHTING.day.sky);
    scene.fog = new THREE.Fog(new THREE.Color(LIGHTING.day.sky), 600, 2400);
    this.scene = scene;

    this.camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 2, 6000);
    this.frustum = new THREE.Frustum();
    this.viewProjection = new THREE.Matrix4();

    this.hemi = new THREE.HemisphereLight();
    scene.add(this.hemi);
    const sun = new THREE.DirectionalLight();
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.6;
    sun.shadow.radius = 2.5; // softer edges (same PCF taps, no extra cost)
    scene.add(sun, sun.target);
    this.sun = sun;
    /** night lights in use: LIGHTING.night, or a seasonal theme's (setNightStyle) */
    this.nightLight = LIGHTING.night;
    this.night = -1;
    this.setNight(0);

    const controls = new MapControls(this.camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.screenSpacePanning = false;
    controls.minDistance = 30;
    controls.maxDistance = 5000;
    controls.maxPolarAngle = 1.2;
    controls.zoomToCursor = true;
    this.controls = controls;

    this.depthOnly = new THREE.MeshBasicMaterial({ colorWrite: false, side: THREE.DoubleSide });
    this.lastCamera = new Float32Array(17);
    this.frameNo = 0;
    this.shadowAt = null;
  }

  /**
   * Blends the lights, sky and fog between day (0) and night (1). Only uniforms
   * change: no shader is recompiled.
   */
  setNight(k) {
    if (k === this.night) return;
    this.night = k;
    const { day } = LIGHTING,
      night = this.nightLight;
    const mix = (a, b) => tmpA.set(a).lerp(tmpB.set(b), k);
    this.scene.background.copy(mix(day.sky, night.sky));
    this.scene.fog.color.copy(this.scene.background);
    this.hemi.color.copy(mix(day.hemiSky, night.hemiSky));
    this.hemi.groundColor.copy(mix(day.hemiGround, night.hemiGround));
    this.hemi.intensity = THREE.MathUtils.lerp(day.hemi, night.hemi, k);
    this.sun.color.copy(mix(day.sun, night.sun));
    this.sun.intensity = THREE.MathUtils.lerp(day.sunIntensity, night.sunIntensity, k);
    this.sun.shadow.intensity = THREE.MathUtils.lerp(day.shadow, night.shadow, k);
    this.renderer.toneMappingExposure = THREE.MathUtils.lerp(day.exposure, night.exposure, k);
  }

  /**
   * Night lights of a seasonal theme (src/themes) over LIGHTING.night, or null
   * for the usual ones; applied at once.
   * @param {Partial<typeof LIGHTING.night> | null} style
   */
  setNightStyle(style) {
    this.nightLight = { ...LIGHTING.night, ...style };
    const k = this.night;
    this.night = -1;
    this.setNight(k);
  }

  /** Adds a layer's object; solid layers also go on the occluder layer. */
  addLayer(layer) {
    this.scene.add(layer.object);
    if (layer.occludesRoutes) {
      layer.object.traverse((o) => {
        if (o.isMesh && !o.material.transparent) o.layers.enable(RENDER_LAYER.OCCLUDERS);
      });
    }
  }

  /**
   * Shifts the projection so the map is centered in the area not covered by
   * the sidebar (desktop, `px` on the left) or a bottom sheet (`bottom` px).
   * @returns {boolean} the canvas was resized (see resize())
   */
  setInset(px, bottom = 0) {
    this.inset = px;
    this.insetBottom = bottom;
    return this.resize();
  }

  /**
   * Fits the camera and the canvas to the container. Resizing a canvas clears
   * it (even to the same size), so it only happens when the size changed;
   * the caller then draws a frame at once (MapApp.redraw), or the cleared
   * canvas would show — a flicker — until the next frame.
   * @returns {boolean} the canvas was resized
   */
  resize() {
    const w = this.container.clientWidth,
      h = this.container.clientHeight;
    this.camera.aspect = w / h;
    if (this.inset || this.insetBottom) this.camera.setViewOffset(w, h, -this.inset / 2, (this.insetBottom ?? 0) / 2, w, h);
    else this.camera.clearViewOffset();
    this.camera.updateProjectionMatrix();
    const size = this.renderer.getSize(tmpSize);
    if (size.x === w && size.y === h) return false;
    this.renderer.setSize(w, h);
    this.labels.setSize(w, h);
    return true;
  }

  beginFrame() {
    this.renderer.info.reset();
  }

  /**
   * Fog and depth range follow the zoom: the map fades into the sky far away,
   * and the near/far planes keep depth precise from close-ups to wide views.
   */
  updateView(distance) {
    const { fog } = this.scene;
    fog.near = distance * 0.9 + 150;
    fog.far = distance * 2.6 + 900;
    const camera = this.camera;
    const near = THREE.MathUtils.clamp(distance * 0.02, 1, 40),
      far = fog.far * 1.1;
    if (Math.abs(camera.near - near) > near * 0.05 || Math.abs(camera.far - far) > far * 0.05) {
      camera.near = near;
      camera.far = far;
      camera.updateProjectionMatrix();
    }
    camera.updateMatrixWorld();
    this.frustum.setFromProjectionMatrix(this.viewProjection.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse));
  }

  /** Screen pixels covered by 1 m seen from 1 m away. */
  get fovPx() {
    return this.renderer.domElement.clientHeight / (2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)));
  }

  /**
   * The sun's shadow frustum follows what is on screen. Its size goes in steps
   * and it is only re-centered when the view has moved a fair part of it, so
   * while panning or zooming the shadow map is re-rendered every few frames
   * instead of every frame (plus every 12 frames for animated parts).
   */
  updateShadows(target, distance) {
    if (this.sun.castShadow) {
      const needed = THREE.MathUtils.clamp(distance * 0.62, 60, 480);
      const half = 60 * 1.25 ** Math.ceil(Math.log(needed / 60) / Math.log(1.25));
      const cam = this.sun.shadow.camera;
      const moved = !this.shadowAt || this.shadowAt.distanceTo(target) > half * 0.12 || cam.right !== half;
      if (cam.right !== half) {
        cam.left = -half;
        cam.right = half;
        cam.top = half;
        cam.bottom = -half;
        cam.near = 1;
        cam.far = 1600;
        cam.updateProjectionMatrix();
      }
      if (moved) {
        (this.shadowAt ??= new THREE.Vector3()).copy(target);
        this.sun.target.position.copy(target);
        this.sun.position.copy(target).addScaledVector(SUN, 700);
      }
      if (moved || this.frameNo % 12 === 0) this.renderer.shadowMap.needsUpdate = true;
    }
    this.frameNo++;
  }

  /** Screen pixels per meter at `distance` from the camera. */
  pixelsPerMeter(distance) {
    return this.fovPx / Math.max(1, distance);
  }

  render() {
    const { renderer, scene, camera } = this;
    renderer.render(scene, camera);
    // route pass: occluder depth, then the lines
    const background = scene.background;
    renderer.autoClear = false;
    renderer.clearDepth();
    scene.background = null;
    camera.layers.set(RENDER_LAYER.OCCLUDERS);
    scene.overrideMaterial = this.depthOnly;
    renderer.render(scene, camera);
    scene.overrideMaterial = null;
    camera.layers.set(RENDER_LAYER.ROUTES);
    renderer.render(scene, camera);
    camera.layers.set(RENDER_LAYER.DEFAULT);
    scene.background = background;
    renderer.autoClear = true;
  }

  /** True when the camera moved since the last call (HTML labels need re-positioning). */
  cameraMoved() {
    const e = this.camera.matrixWorld.elements,
      l = this.lastCamera;
    let changed = false;
    for (let i = 0; i < 16; i++) {
      if (Math.abs(e[i] - l[i]) > 1e-5) {
        changed = true;
        l[i] = e[i];
      }
    }
    if (Math.abs(this.camera.aspect - l[16]) > 1e-6) {
      changed = true;
      l[16] = this.camera.aspect;
    }
    return changed;
  }

  renderLabels() {
    this.labels.render(this.scene, this.camera);
  }
}
