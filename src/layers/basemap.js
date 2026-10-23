import * as THREE from 'three';
import { makeProjection } from '#shared/geo.js';
import { lngLatToTile, tileBounds } from '#shared/web-mercator.js';
import { TileCache } from '../graphics/tile-cache.js';
import { loadTexture } from '../graphics/texture-loader.js';
import { designFadeGLSL, designFadeUniforms } from '../graphics/shaders/design-fade.js';
import { NIGHT_MAP_GLSL, nightUniform } from '../graphics/night.js';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec2 vWorld;
  #include <fog_pars_vertex>
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xz;
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const fragmentShader = (radii) => /* glsl */ `
  uniform sampler2D map;
  uniform vec3 color;
  uniform float uRegionOn;
  uniform float uNight;
  ${NIGHT_MAP_GLSL}
  varying vec2 vUv;
  varying vec2 vWorld;
  #include <fog_pars_fragment>
  ${designFadeGLSL(radii)}
  ${designFadeGLSL(radii, 'region')}
  void main() {
    float alpha = designFade(vWorld);
    if (uRegionOn > 0.5) {
      // a region (layers/neighbors.js) is blended over the map with opacity
      // r · alpha: the map keeps (1 - r) · alpha of the final color, so the
      // focused park, the region and the map add up exactly
      float r = 1.0 - regionFade(vWorld);
      alpha = alpha * (1.0 - r) / max(1.0 - r * alpha, 1e-4);
    }
    if (alpha < 0.004) discard; // the 3D park (or a region) is drawn there
    #ifdef USE_TILE
      vec3 c = texture2D(map, vUv).rgb;
    #else
      vec3 c = color;
    #endif
    // night: the map dims to navy (it is unlit), light streets stay a little lighter
    c = mix(c, c * NIGHT_MAP_TINT + NIGHT_MAP_LIFT, uNight);
    gl_FragColor = vec4(c, alpha);
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;

/** Ground plane (one unit square) with v = 0 at the north edge, like image rows. */
function unitQuad() {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, 0, -0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, 0.5], 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 1, 1], 2));
  g.setIndex([0, 2, 1, 1, 2, 3]);
  return g;
}

/**
 * The real map around the park: raster map tiles (OpenStreetMap by default,
 * see src/config.js) laid on the ground plane, as far as the eye reaches.
 *
 * Tiles are chosen every frame like a 2D web map, but per tile: near tiles at
 * a fine zoom, far ones (towards the horizon) coarse, so each tile covers
 * about its own pixel size on screen. Missing tiles show their loaded parent
 * meanwhile. The map is blended over the terrain outside the designed area
 * (design-fade shader) and never drawn under the 3D park. Neighboring parks
 * (layers/neighbors.js) are blended over it afterwards, so it never shows
 * through them either; under a region (setRegion) it fades out so that the
 * focused park, the region and the map add up, and tiles the region covers are
 * not even downloaded. setFocus() moves it to another park's frame (in-app
 * focus switch) keeping the downloaded tiles.
 *
 * Drawn right after the terrain, without depth test, so everything else
 * (trees, buildings, water) still sorts against the terrain depth.
 * @returns {import('./index.js').Layer}
 */
export function createBasemapLayer({ park, designArea, config }) {
  let projection = makeProjection(park.center.lat, park.center.lng);
  const radiiCount = designArea.radii.length;
  const shared = {
    ...designFadeUniforms(designArea),
    ...designFadeUniforms(designArea, 'region'),
    uRegionOn: { value: 0 },
    uNight: nightUniform,
  };
  const fragment = fragmentShader(radiiCount);
  let region = null; // area of the region over the map (focused park's frame)
  const makeMaterial = (tile) =>
    new THREE.ShaderMaterial({
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.UniformsLib.fog),
        ...shared,
        map: { value: null },
        color: { value: new THREE.Color(config.background) },
      },
      vertexShader,
      fragmentShader: fragment,
      defines: tile ? { USE_TILE: '' } : {},
      fog: true,
      depthTest: false,
      depthWrite: false,
      // blended but kept in the opaque pass (transparent: false) so it is drawn
      // before trees and buildings, ordered by renderOrder
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      // keep the canvas opaque (its alpha would let the page show through)
      blendSrcAlpha: THREE.OneFactor,
      blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
    });

  const object = new THREE.Group();
  object.name = 'basemap';
  const quad = unitQuad();

  // flat background in the map's land color, under the tiles
  const background = new THREE.Mesh(quad, makeMaterial(false));
  background.renderOrder = -2.5;
  background.frustumCulled = false;
  object.add(background);

  const pool = [];
  const meshAt = (k) => {
    if (!pool[k]) {
      const mesh = new THREE.Mesh(quad, makeMaterial(true));
      mesh.frustumCulled = false; // placed by hand, culled per tile below
      mesh.matrixAutoUpdate = false;
      object.add(mesh);
      pool[k] = mesh;
    }
    return pool[k];
  };

  const urlOf = (key) => {
    const [z, x, y] = key.split('/');
    return config.url.replace('{z}', z).replace('{x}', x).replace('{y}', y);
  };
  const tiles = new TileCache({
    load: (key, signal) => loadTexture(urlOf(key), { signal, anisotropy: 4 }),
    capacity: 96,
    concurrency: 6,
  });

  /** Local rectangle [x0, z0, x1, z1] of a tile (x0 west, z0 north). */
  const rectOf = (x, y, z) => {
    const [n, w, s, e] = tileBounds(x, y, z);
    const [x0, z0] = projection.toLocal(n, w);
    const [x1, z1] = projection.toLocal(s, e);
    return [x0, z0, x1, z1];
  };

  let detail = 1.5; // tile texels per screen pixel before switching to a finer zoom
  let dirty = true;
  tiles.onLoad = () => {
    dirty = true;
  };
  const box = new THREE.Box3();
  const closest = new THREE.Vector3();
  const lastView = new THREE.Matrix4();
  const ROOT_ZOOM = 8;

  function selectTiles({ camera, frustum, fovPx, range }) {
    const eye = camera.position;
    const leaves = [];
    const visit = (x, y, z) => {
      const [x0, z0, x1, z1] = rectOf(x, y, z);
      if (designArea.coversRect(x0, z0, x1, z1) || region?.coversRect(x0, z0, x1, z1)) return;
      box.min.set(x0, -2, z0);
      box.max.set(x1, 2, z1);
      if (!frustum.intersectsBox(box)) return;
      const dist = box.clampPoint(eye, closest).distanceTo(eye);
      if (dist > range) return;
      const px = ((x1 - x0) * fovPx) / Math.max(dist, 1);
      if (px > config.tileSize * detail && z < config.maxZoom) {
        for (let k = 0; k < 4; k++) visit(x * 2 + (k & 1), y * 2 + (k >> 1), z + 1);
      } else leaves.push({ x, y, z, rect: [x0, z0, x1, z1], dist });
    };
    // root tiles around the camera, as far as the fog lets anything show
    const [n, w] = projection.toLatLng(eye.x - range, eye.z - range);
    const [s, e] = projection.toLatLng(eye.x + range, eye.z + range);
    const [tx0, ty0] = lngLatToTile(w, n, ROOT_ZOOM).map(Math.floor);
    const [tx1, ty1] = lngLatToTile(e, s, ROOT_ZOOM).map(Math.floor);
    for (let y = ty0; y <= ty1; y++) for (let x = tx0; x <= tx1; x++) visit(x, y, ROOT_ZOOM);
    return leaves;
  }

  function update(frame) {
    const { camera, fogFar } = frame;
    const range = Math.min(fogFar, 60000);
    background.position.set(camera.position.x, 0, camera.position.z);
    background.scale.set(range * 2, 1, range * 2);

    const moved = !lastView.equals(camera.matrixWorld);
    if (!moved && !dirty && !tiles.busy) return;
    lastView.copy(camera.matrixWorld);
    dirty = false;

    tiles.beginFrame();
    const leaves = selectTiles({ ...frame, range });
    const draw = new Map(); // key → { rect, z, texture }
    for (const t of leaves) {
      const key = `${t.z}/${t.x}/${t.y}`;
      const texture = tiles.get(key);
      if (texture) {
        draw.set(key, { rect: t.rect, z: t.z, texture });
        continue;
      }
      tiles.request(key, t.z * 1e6 + t.dist);
      // meanwhile, the closest loaded ancestor
      let { x, y, z } = t;
      while (z > config.minZoom) {
        x >>= 1;
        y >>= 1;
        z--;
        const parent = `${z}/${x}/${y}`;
        const tex = tiles.get(parent);
        if (tex) {
          if (!draw.has(parent)) draw.set(parent, { rect: rectOf(x, y, z), z, texture: tex });
          break;
        }
        if (z === Math.max(config.minZoom, t.z - 3)) tiles.request(parent, z * 1e6); // quick coarse cover
      }
    }
    tiles.endFrame();

    let k = 0;
    for (const { rect, z, texture } of draw.values()) {
      const mesh = meshAt(k++);
      const [x0, z0, x1, z1] = rect;
      mesh.matrix.makeScale(x1 - x0, 1, z1 - z0).setPosition((x0 + x1) / 2, 0, (z0 + z1) / 2);
      mesh.matrixWorldNeedsUpdate = true;
      mesh.material.uniforms.map.value = texture;
      mesh.renderOrder = -2 + z * 0.01; // finer tiles over their parents
      mesh.visible = true;
    }
    for (; k < pool.length; k++) pool[k].visible = false;
  }

  /** Copies an outline into the uniforms of `name` ('design' or 'region'). */
  const setArea = (area, name) => {
    const u = name === 'region' ? 'uRegion' : 'uDesign';
    shared[`${u}Center`].value.set(area.cx, area.cz);
    shared[`${u}Radii`].value.set(area.radii);
  };

  return {
    name: 'basemap',
    object,
    update,
    /**
     * Moves the map to another focused park's frame (MapApp.focusPark): its
     * projection and designed area. Loaded tiles are kept.
     * @param {{ park: object, designArea: ReturnType<typeof import('#shared/design-area.js').makeDesignArea> }} focus
     */
    setFocus(focus) {
      if (focus.designArea.radii.length !== radiiCount) throw new Error('designed areas need the same number of radii');
      projection = makeProjection(focus.park.center.lat, focus.park.center.lng);
      designArea = focus.designArea;
      setArea(designArea, 'design');
      dirty = true; // tiles are repositioned on the next frame
    },
    /**
     * The region drawn over the map (focused park's frame), or null.
     * @param {ReturnType<typeof import('#shared/design-area.js').makeDesignArea> | null} area
     */
    setRegion(area) {
      if (area && area.radii.length !== radiiCount) {
        console.warn('basemap: region outline with a different number of radii; the map is not faded under it');
        area = null;
      }
      region = area;
      if (area) setArea(area, 'region');
      shared.uRegionOn.value = area ? 1 : 0;
      dirty = true;
    },
    setQuality(preset) {
      detail = preset.mapDetail;
      tiles.capacity = preset.mapTiles;
      dirty = true;
    },
    /** True while map tiles are still downloading. */
    get loading() {
      return tiles.busy;
    },
  };
}
