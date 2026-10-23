import * as THREE from 'three';
import { FADE, makeDesignArea } from '#shared/design-area.js';
import { findNeighbors, neighborOpacity, yieldOpacity } from '#shared/neighbors.js';
import { REGION_SEA_EDGE, pickNeighborTrees } from '#shared/neighbor-context.js';
import { BASEMAP } from '../config.js';
import { TREE, TREE_SHAPES, TREE_STRIDE, decodeVegetation } from '#shared/formats/vegetation.js';
import { treeGeometries } from '../models/parts/trees.js';
import { swayMaterial } from '../graphics/shaders/sway.js';
import { designFadeGLSL, designFadeUniforms } from '../graphics/shaders/design-fade.js';
import { releaseGeometryAfterUpload, releaseStatic } from '../graphics/memory.js';
import { heightSampler } from './terrain.js';
import { fillTrees } from './vegetation.js';
import { waterMaterial } from './water.js';

/** Target size (m) of a neighbor ground cell (the focused park uses ≈ 2.7 m). */
const GROUND_CELL = 12;
const MAX_SEGMENTS = 128;
/** Heights (m) below which a ground cell may hold water (land is ≥ 0, water ≤ 0). */
const WATER_BELOW = 0.5;
/** renderOrder of the ground: regions under the neighbor parks, both after the real map (-2.5 … -1.8). */
const GROUND_ORDER = { park: -1.5, region: -1.6 };
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));
/** Waits for an idle moment (at most 500 ms). */
const idle = () =>
  new Promise((resolve) => (window.requestIdleCallback ? requestIdleCallback(() => resolve(), { timeout: 500 }) : setTimeout(resolve, 50)));

/**
 * Neighboring parks (shared/neighbors.js) in a lightweight version around the
 * focused one: the level-0 ground tile over the terrain heights, a subset of
 * the trees (cheap geometry, a few InstancedMeshes) and still water. No
 * markers, routes, walkways, buildings, models, vehicles or fauna. A region
 * (park.json → region, src/parks/xcr: the land around Xcaret, Xplor and
 * Xenses) is the last, lowest-priority neighbor: drawn under every park.
 *
 * Nothing is loaded until start() (MapApp calls it as soon as the focused park
 * is on screen). The quality preset's `neighbors` sets the tree density; a
 * change rebuilds only the trees, in place (no frame without neighbors).
 * prepareFocus() builds the set of another focused park off screen (MapApp's
 * in-app focus switch) and returns the function that swaps it in. The layer
 * never frees textures: `load.assets` owns them (MapApp keeps them cached).
 *
 * Blending: a neighbor park's ground is drawn after the real map with an
 * opacity per vertex = its own fade towards the map × the fade of the focused
 * park (and of closer neighbors), so inside the focused park only the focused
 * park shows, the real map never shows through a neighbor and two parks
 * cross-fade where their outlines meet. A region's ground is drawn before the
 * neighbor parks with opacity (1 − its own fade) × the focused park's fade,
 * computed per pixel; the real map fades out under it (basemap setRegion,
 * through `onRegion`) so focused park, region and map add up exactly, and the
 * neighbor parks are blended over it. Its water and trees yield to every park.
 *
 * @param {object} options
 * @param {{ park: object, designArea: ReturnType<typeof makeDesignArea> }} options.focus focused park (park.json, area)
 * @param {import('../app/Stage.js').Stage} options.stage
 * @param {THREE.Vector3} options.sunDirection
 * @param {string[]} options.keys every park key (candidates)
 * @param {{ parkJson: (key: string) => Promise<object>,
 *   assets: (key: string, o: { signal: AbortSignal }) => ReturnType<typeof import('../app/assets.js').loadNeighborAssets> }} options.load
 * @param {(area: ReturnType<typeof makeDesignArea> | null) => void} [options.onRegion] region shown (its area in
 *        the focused frame) or gone
 * @returns {import('./index.js').Layer & { start(): void, dispose(): void, neighbors: string[], cluster: Promise<string[]>,
 *   prepareFocus(focus: object): Promise<(() => void) | null> }}
 */
export function createNeighborsLayer({ focus, stage, sunDirection, keys, load, onRegion = () => {} }) {
  const object = new THREE.Group();
  object.name = 'neighbors';
  const time = { value: 0 };

  /** @type {import('../app/quality.js').QualityPreset['neighbors']} */
  let trees = null; // null = neighbors off
  let started = false;
  let parks = null; // Promise of the park.json summaries of every park (fetched once)
  let generation = 0; // bumps on every rebuild / dispose: stale builds stop
  let controller = null;
  let busy = false;
  let shown = []; // neighbors on screen: { key, group, region, setTrees, dispose }
  let treeDefs = null;

  function parksOnce() {
    parks ??= Promise.all(
      keys.map((k) =>
        load.parkJson(k).then(
          (p) => ({
            key: k,
            center: p.center,
            clear: p.clear,
            extent: p.extent,
            heightGrid: p.heightGrid,
            waterTint: p.waterTint,
            region: p.region,
          }),
          () => null,
        ),
      ),
    ).then((list) => list.filter(Boolean));
    return parks;
  }
  const neighborsOf = async (f) =>
    findNeighbors(
      f.park,
      (await parksOnce()).filter((p) => p.key !== f.park.key),
    );

  function show(neighbor) {
    if (neighbor.trees !== trees) neighbor.setTrees(trees);
    object.add(neighbor.group);
    shown.push(neighbor);
    if (neighbor.region) onRegion(neighbor.regionArea);
  }

  function hideAll() {
    for (const n of shown) {
      object.remove(n.group);
      n.dispose();
    }
    if (shown.some((n) => n.region)) onRegion(null);
    shown = [];
  }

  function cancel() {
    generation++;
    controller?.abort();
    controller = null;
    busy = false;
  }

  /**
   * Builds the neighbors of `f`. progressive: each one shows as soon as it is
   * ready (first load); otherwise none shows and the result is the list, to be
   * swapped in at once (null when superseded).
   */
  async function build(f, { progressive }) {
    cancel();
    if (progressive) hideAll();
    if (!trees) return progressive ? undefined : [];
    const gen = generation;
    busy = true;
    controller = new AbortController();
    const { signal } = controller;
    const ready = [];
    const stale = () => gen !== generation;
    try {
      const found = await neighborsOf(f);
      const yieldTo = [f.designArea]; // the focused park, then each neighbor park already placed
      for (const n of found) {
        if (stale()) break;
        const assets = await load.assets(n.key, { signal });
        await idle();
        if (stale()) break;
        treeDefs ??= liteTreeDefs(time);
        const neighbor = buildNeighbor(n, assets, [...yieldTo], { focusArea: f.designArea, treeDefs, trees, sunDirection });
        if (!n.region) yieldTo.push(n.area);
        // compile its shaders off the critical path, then show it
        await stage.renderer.compileAsync(neighbor.group, stage.camera, stage.scene);
        if (stale()) {
          neighbor.dispose();
          break;
        }
        if (progressive) {
          show(neighbor);
          await nextFrame();
        } else ready.push(neighbor);
      }
    } catch (err) {
      if (err?.name !== 'AbortError') console.warn('neighbor parks:', err);
    } finally {
      if (!stale()) busy = false;
    }
    if (stale()) {
      for (const n of ready) n.dispose();
      return null;
    }
    return ready;
  }

  return {
    name: 'neighbors',
    object,
    /** Keys of the neighbors on screen. */
    get neighbors() {
      return shown.map((n) => n.key);
    },
    /** Keys of the neighboring parks of the focused one (not regions): focus can move to them in place. */
    get cluster() {
      return neighborsOf(focus).then((found) => found.filter((n) => !n.region).map((n) => n.key));
    },
    /** Loads the neighbors (once the focused park is shown). */
    start() {
      if (started) return;
      started = true;
      build(focus, { progressive: true });
    },
    /**
     * Builds the neighbors of another focused park (its park.json and designed
     * area, in its own frame) without showing them. Resolves to the function
     * that swaps them in (synchronously, with the old set freed), or null when
     * superseded.
     */
    async prepareFocus(next) {
      const ready = await build(next, { progressive: false });
      if (!ready) return null;
      return () => {
        hideAll();
        focus = next;
        started = true;
        for (const n of ready) show(n);
      };
    },
    setQuality(preset) {
      const next = preset.neighbors ?? null;
      if (next?.treeStride === trees?.treeStride && next?.maxTrees === trees?.maxTrees && next?.regionTrees === trees?.regionTrees) return;
      const was = trees;
      trees = next;
      if (!next) {
        cancel();
        hideAll();
      } else if (!was) {
        if (started) build(focus, { progressive: true });
      } else for (const n of shown) n.setTrees(next); // density only: in place
    },
    update({ t }) {
      time.value = t;
    },
    /** True until the neighbors are on screen (or known to be none). */
    get loading() {
      return !!trees && (!started || busy);
    },
    dispose() {
      started = false;
      cancel();
      hideAll();
      if (treeDefs) {
        for (const kind of Object.values(treeDefs)) {
          kind.geometry.dispose();
          kind.material.dispose();
        }
      }
      treeDefs = null;
    },
  };
}

/**
 * Tree geometry for neighbors, in two kinds so a neighbor costs few draw
 * calls. Broadleaf trees use the cheap broadleaf model; the light variety and
 * the ceibas are drawn with it too, tinted (ceibas also scaled up) to match.
 * Palms keep their cheap model. Bushes (1.5 m) are left out: from the
 * distance neighbors are seen at, the ground already shows them.
 */
function liteTreeDefs(time) {
  const defs = treeGeometries();
  const meanColor = (g) => {
    const c = g.getAttribute('color');
    const m = new THREE.Color(0, 0, 0);
    for (let i = 0; i < c.count; i++) {
      m.r += c.getX(i) / c.count;
      m.g += c.getY(i) / c.count;
      m.b += c.getZ(i) / c.count;
    }
    return m;
  };
  const broad = meanColor(defs[TREE.BROAD].lo);
  const tintLike = (type) => {
    const m = meanColor(defs[type].lo);
    return new THREE.Color(m.r / broad.r, m.g / broad.g, m.b / broad.b);
  };
  const kinds = {
    broad: {
      geometry: defs[TREE.BROAD].lo,
      material: swayMaterial(time),
      types: [TREE.BROAD, TREE.BROAD_LIGHT, TREE.CEIBA],
      scale: { [TREE.CEIBA]: TREE_SHAPES[TREE.CEIBA].crown / TREE_SHAPES[TREE.BROAD].crown },
      tint: { [TREE.BROAD_LIGHT]: tintLike(TREE.BROAD_LIGHT), [TREE.CEIBA]: tintLike(TREE.CEIBA) },
    },
    palm: {
      geometry: defs[TREE.PALM].lo,
      material: swayMaterial(time, { side: defs[TREE.PALM].side }),
      types: [TREE.PALM],
    },
  };
  // free the geometry that is not used
  for (const [type, d] of Object.entries(defs)) {
    if (d.hi !== d.lo) d.hi.dispose();
    if (+type !== TREE.BROAD && +type !== TREE.PALM) d.lo.dispose();
  }
  return kinds;
}

/**
 * Meshes of one neighbor, in its own frame inside a group placed with the
 * park offset (shared/neighbors.js → parkOffset). Textures belong to `assets`
 * (not freed here).
 */
function buildNeighbor(n, assets, yieldTo, { focusArea, treeDefs, trees: treeCount, sunDirection }) {
  const { park, offset, key, region } = n;
  const own = makeDesignArea(park.clear); // in the neighbor's own frame
  const heightAt = heightSampler(park, assets.heightBuffer);
  const opacity = neighborOpacity(own, offset, yieldTo);

  const group = new THREE.Group();
  group.name = `neighbor:${key}`;
  group.position.set(offset.dx, 0, offset.dz);
  group.scale.set(offset.sx, 1, 1);

  // cells and water follow `opacity` (everything this neighbor yields to); a
  // region's ground computes its own opacity per pixel (see regionGround) and
  // so does its water (own fade / sea edge, see waterMaterial → seaEdge)
  const grid = groundGrid(park, heightAt, opacity, own, region ? yieldOpacity(offset, yieldTo) : opacity);
  const disposables = [];
  if (grid.ground) {
    const material = region
      ? regionGround(assets.ground, n.area, focusArea)
      : new THREE.MeshLambertMaterial({
          map: assets.ground,
          vertexColors: true, // rgba: the opacity per vertex
          // over the focused park's ground where both fade, whichever is higher
          // (heights differ by up to ~2 m between two parks' height maps); the
          // coast is flat, so the ground hiding itself does not matter
          depthTest: false,
          depthWrite: false,
          // blended like the real map but kept in the opaque pass, after it
          blending: THREE.CustomBlending,
          blendSrc: THREE.SrcAlphaFactor,
          blendDst: THREE.OneMinusSrcAlphaFactor,
          blendSrcAlpha: THREE.OneFactor,
          blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
        });
    const mesh = new THREE.Mesh(releaseGeometryAfterUpload(grid.ground), material);
    mesh.name = `neighbor:${key}:ground`;
    mesh.renderOrder = region ? GROUND_ORDER.region : GROUND_ORDER.park; // after the terrain (-3) and the real map
    group.add(mesh);
    disposables.push(grid.ground, material);
  }
  if (grid.water) {
    const seaEdge = region ? { area: own, color: BASEMAP.sea, band: REGION_SEA_EDGE } : undefined;
    const material = waterMaterial({ park, waterTexture: assets.waterTexture, sunDirection, seaEdge });
    const mesh = new THREE.Mesh(releaseGeometryAfterUpload(grid.water), material);
    mesh.name = `neighbor:${key}:water`;
    mesh.renderOrder = 1;
    group.add(mesh);
    disposables.push(grid.water, material);
  }

  const data = decodeVegetation(assets.vegetationBuffer);
  let treeMeshes = [];
  const neighbor = {
    key,
    group,
    region,
    /** the region's area in the focused frame (basemap) */
    regionArea: region ? n.area : null,
    trees: null,
    /** (Re)builds the trees for a density preset (QualityPreset.neighbors). */
    setTrees(preset) {
      for (const mesh of treeMeshes) {
        group.remove(mesh);
        mesh.dispose();
      }
      treeMeshes = preset ? liteTrees(data, preset, region, offset, yieldTo, treeDefs, own) : [];
      for (const mesh of treeMeshes) group.add(releaseStatic(mesh));
      neighbor.trees = preset;
    },
    dispose() {
      for (const d of disposables) d.dispose();
      for (const mesh of treeMeshes) mesh.dispose();
    },
  };
  neighbor.setTrees(treeCount);
  releaseStatic(group);
  return neighbor;
}

/**
 * Ground material of a region: opacity = (1 − the region's own fade) × the
 * focused park's fade, per pixel and in world space, exactly what the real map
 * leaves to it (layers/basemap.js setRegion). Drawn like a neighbor ground.
 */
function regionGround(map, regionArea, focusArea) {
  const material = new THREE.MeshLambertMaterial({
    map,
    depthTest: false,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendSrc: THREE.SrcAlphaFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    blendSrcAlpha: THREE.OneFactor,
    blendDstAlpha: THREE.OneMinusSrcAlphaFactor,
  });
  const uniforms = { ...designFadeUniforms(focusArea), ...designFadeUniforms(regionArea, 'region') };
  const glsl = designFadeGLSL(focusArea.radii.length) + designFadeGLSL(regionArea.radii.length, 'region');
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vRegionWorld;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvRegionWorld = (modelMatrix * vec4(transformed, 1.0)).xz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec2 vRegionWorld;\n${glsl}`)
      .replace(
        '#include <color_fragment>',
        '#include <color_fragment>\ndiffuseColor.a *= (1.0 - regionFade(vRegionWorld)) * designFade(vRegionWorld);',
      );
  };
  material.customProgramCacheKey = () => `region-ground-${focusArea.radii.length}-${regionArea.radii.length}`;
  return material;
}

/**
 * Ground grid over the neighbor's extent with an rgba color per vertex (white,
 * alpha = opacity), keeping only cells that show something; plus the cells low
 * enough to hold water, with an `alpha` attribute (= waterOpacity, by default
 * the same opacity) for the still-water shader.
 */
export function groundGrid(park, heightAt, opacity, own, waterOpacity = opacity) {
  const { cx, cz, size } = park.extent;
  const S = Math.min(MAX_SEGMENTS, Math.ceil(size / GROUND_CELL));
  const cell = size / S;
  const x0 = cx - size / 2,
    z0 = cz - size / 2;
  const V = S + 1;
  const alpha = new Float32Array(V * V);
  const height = new Float32Array(V * V);
  for (let j = 0; j < V; j++) {
    for (let i = 0; i < V; i++) {
      const x = x0 + i * cell,
        z = z0 + j * cell;
      alpha[j * V + i] = opacity(x, z);
      height[j * V + i] = heightAt(x, z);
    }
  }
  const groundCells = [],
    waterCells = [];
  for (let j = 0; j < S; j++) {
    for (let i = 0; i < S; i++) {
      const k = [j * V + i, j * V + i + 1, (j + 1) * V + i, (j + 1) * V + i + 1];
      if (Math.max(...k.map((v) => alpha[v])) < 0.002) continue;
      if (own.signedDistance(x0 + (i + 0.5) * cell, z0 + (j + 0.5) * cell) > FADE.outer + cell * 1.5) continue;
      groundCells.push(i, j);
      if (Math.min(...k.map((v) => height[v])) < WATER_BELOW) waterCells.push(i, j);
    }
  }

  const make = (cells, water) => {
    if (!cells.length) return null;
    const remap = new Int32Array(V * V).fill(-1);
    const index = [];
    let count = 0;
    const vertex = (i, j) => {
      const k = j * V + i;
      if (remap[k] < 0) remap[k] = count++;
      return remap[k];
    };
    for (let c = 0; c < cells.length; c += 2) {
      const i = cells[c],
        j = cells[c + 1];
      const a = vertex(i, j),
        b = vertex(i + 1, j),
        d = vertex(i, j + 1),
        e = vertex(i + 1, j + 1);
      index.push(a, d, b, b, d, e);
    }
    const position = new Float32Array(count * 3);
    const normal = water ? null : new Float32Array(count * 3);
    const uv = water ? null : new Float32Array(count * 2);
    const color = water ? new Float32Array(count) : new Float32Array(count * 4);
    for (let k = 0; k < V * V; k++) {
      const r = remap[k];
      if (r < 0) continue;
      const i = k % V,
        j = Math.floor(k / V);
      const x = x0 + i * cell,
        z = z0 + j * cell;
      if (water) {
        position.set([x, 0, z], r * 3);
        color[r] = waterOpacity === opacity ? alpha[k] : waterOpacity(x, z);
        continue;
      }
      position.set([x, height[k], z], r * 3);
      const nx = (heightAt(x - cell, z) - heightAt(x + cell, z)) / (2 * cell),
        nz = (heightAt(x, z - cell) - heightAt(x, z + cell)) / (2 * cell);
      const l = Math.hypot(nx, 1, nz);
      normal.set([nx / l, 1 / l, nz / l], r * 3);
      uv.set([i / S, j / S], r * 2); // v = 0 at the north edge, like the image rows
      color.set([1, 1, 1, alpha[k]], r * 4);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
    if (water) geometry.setAttribute('alpha', new THREE.BufferAttribute(color, 1));
    else {
      geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      geometry.setAttribute('color', new THREE.BufferAttribute(color, 4));
    }
    geometry.setIndex(count > 65535 ? index : new THREE.BufferAttribute(Uint16Array.from(index), 1));
    return geometry;
  };
  return { ground: make(groundCells, false), water: make(waterCells, true), segments: S };
}

/**
 * The trees of a neighbor drawn for a density preset, except where an area the
 * neighbor yields to takes over, as one InstancedMesh per kind of tree (see
 * liteTreeDefs) and quarter of the neighbor, so views that show only part of
 * it skip the rest. Parks: one tree in treeStride, at most maxTrees. Regions:
 * an even pick of at most regionTrees among the trees outside every park.
 */
function liteTrees(data, preset, region, offset, yieldTo, kinds, own) {
  const kindOf = new Map();
  for (const [name, kind] of Object.entries(kinds)) for (const t of kind.types) kindOf.set(t, name);
  const picked = pickNeighborTrees(data, preset, region, offset, yieldTo).indices;
  const buckets = new Map();
  for (const i of picked) {
    const o = i * TREE_STRIDE;
    const key = `${kindOf.get(data[o + 5])}:${data[o] < own.cx ? 'w' : 'e'}${data[o + 2] < own.cz ? 'n' : 's'}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(i);
  }
  const meshes = [];
  for (const [key, indices] of buckets) {
    const kind = kinds[key.split(':')[0]];
    const mesh = new THREE.InstancedMesh(kind.geometry, kind.material, indices.length);
    mesh.name = `trees:${key}`;
    fillTrees(mesh, data, indices, kind);
    meshes.push(mesh);
  }
  return meshes;
}
