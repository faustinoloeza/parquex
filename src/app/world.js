import {
  createTerrainLayer,
  createBasemapLayer,
  createWaterLayer,
  createVegetationLayer,
  createBuildingsLayer,
  createPiersLayer,
  createLandmarksLayer,
  createVehiclesLayer,
  createRoutesLayer,
  createWalkwaysLayer,
  createFaunaLayer,
  createNeighborsLayer,
  createLampsLayer,
} from '../layers/index.js';
import * as THREE from 'three';
import { PARKS } from '../parks/index.js';
import { loadParkJson, loadNeighborAssets } from './assets.js';
import { makeDesignArea } from '#shared/design-area.js';
import { makeGroundHoles, surfaceSampler } from '#shared/ground-holes.js';
import { landmarkGroundHoles } from '../models/index.js';
import { BASEMAP } from '../config.js';
import { SUN } from './Stage.js';
import { markShared } from '../graphics/memory.js';

/** Light map placeholder until the lamps layer draws its own (no light). */
const NO_LIGHT = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1);
NO_LIGHT.needsUpdate = true;
markShared(NO_LIGHT);

/** Lets the browser paint (loading screen) between heavy steps. */
const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Creates the layers of the focused park (everything but the real map and the
 * neighbors), in scene order, and adds them to the stage. Yields to the
 * browser between layers so the page never freezes for long.
 * @param {import('./Stage.js').Stage} stage
 * @param {import('../parks/define.js').ParkDefinition} parkDef
 * @param {Awaited<ReturnType<typeof import('./assets.js').loadParkAssets>>} assets
 * @param {{ detached?: boolean, onTerrain?: (layer: object) => Promise<void> | void,
 *   theme?: import('../themes/index.js').Theme | null }} [options]
 *        detached: not added to the stage (in-app focus switch: the caller adds them all at once);
 *        onTerrain: called right after the terrain (the real map goes there in the scene order);
 *        theme: seasonal theme whose decoration layer goes on top (src/themes)
 */
export async function createParkLayers(stage, parkDef, assets, { detached = false, onTerrain, theme = null } = {}) {
  const { park } = assets;
  const designArea = makeDesignArea(park.clear);
  const holes = makeGroundHoles(landmarkGroundHoles(parkDef.landmarks));
  const layers = [];
  const add = async (layer) => {
    if (!detached) stage.addLayer(layer);
    layers.push(layer);
    await nextFrame();
    return layer;
  };

  // night light of the street lamps over the park (drawn by the lamps layer,
  // added to the ground by the terrain and reflected by the water)
  const lightMap = { value: NO_LIGHT };
  const terrain = await add(
    createTerrainLayer({
      park,
      lightMap,
      heightBuffer: assets.heightBuffer,
      overview: assets.groundOverview,
      stream: assets.streamGround,
      designArea,
      baseUrl: assets.baseUrl,
      holes,
    }),
  );
  const { heightAt } = terrain;
  // where people walk: the terrain, or a bridge over a sunken moat
  const surfaceAt = surfaceSampler(heightAt, holes);
  await onTerrain?.(terrain);
  await add(createWaterLayer({ park, waterTexture: assets.waterTexture, sunDirection: SUN, designArea, lightMap }));
  await add(createVegetationLayer({ buffer: assets.vegetationBuffer }));
  await add(createBuildingsLayer({ buildings: assets.buildings }));
  await add(createPiersLayer({ park, heightAt }));
  await add(createLandmarksLayer({ landmarks: parkDef.landmarks, park, heightAt }));
  await add(createVehiclesLayer({ rows: parkDef.vehicles, heightAt }));
  await add(createWalkwaysLayer({ park, heightAt: surfaceAt }));
  const lamps = await add(
    createLampsLayer({
      park,
      heightAt,
      buildings: assets.buildings,
      landmarks: parkDef.landmarks,
      paving: assets.paving,
      designArea,
      lightMap,
    }),
  );
  const routes = await add(createRoutesLayer({ park, heightAt }));
  await add(createFaunaLayer({ fauna: parkDef.fauna }));
  // a seasonal theme's decoration (src/themes); MapApp.setTheme() builds it again on a theme change
  const decorate = async (t) =>
    t?.decorations
      ? t.decorations({
          park,
          parkDef,
          heightAt,
          surfaceAt,
          buildings: assets.buildings,
          vegetation: assets.vegetationBuffer,
          designArea,
          lamps,
        })
      : null;
  const decoration = await decorate(theme);
  if (decoration) await add(decoration);
  return { layers, heightAt, surfaceAt, routes, designArea, decorate };
}

/**
 * Creates every layer of the map for its first focused park: the park's own
 * layers, the real map (kept when the focus moves to another park) and the
 * neighboring parks.
 * @param {import('./Stage.js').Stage} stage
 * @param {import('../parks/define.js').ParkDefinition} parkDef
 * @param {Awaited<ReturnType<typeof import('./assets.js').loadParkAssets>>} assets
 * @param {{ neighbors?: boolean, load?: object, theme?: import('../themes/index.js').Theme | null }} [options]
 *        neighbors: false leaves neighboring parks out (?noneighbors); load: how the neighbors layer gets
 *        park.json and lightweight assets (MapApp's cache); theme: seasonal theme (src/themes)
 */
export async function createWorld(
  stage,
  parkDef,
  assets,
  { neighbors: withNeighbors = true, load = { parkJson: loadParkJson, assets: loadNeighborAssets }, theme = null } = {},
) {
  const { park } = assets;
  let basemap = null;
  const own = await createParkLayers(stage, parkDef, assets, {
    theme,
    onTerrain: async () => {
      basemap = createBasemapLayer({ park, designArea: makeDesignArea(park.clear), config: BASEMAP });
      stage.addLayer(basemap);
      await nextFrame();
    },
  });
  // neighboring parks, lightweight; MapApp starts loading them once this park is on screen
  let neighbors = null;
  if (withNeighbors) {
    neighbors = createNeighborsLayer({
      focus: { park, designArea: own.designArea },
      stage,
      sunDirection: SUN,
      keys: Object.keys(PARKS),
      load,
      onRegion: (area) => basemap.setRegion(area),
    });
    stage.addLayer(neighbors);
    await nextFrame();
  }
  return {
    ...own,
    parkLayers: own.layers,
    basemap,
    neighbors,
    /** every layer, in scene order */
    layers: worldLayers(own.layers, basemap, neighbors),
  };
}

/** The map's layers in scene order: the park's terrain, the real map, the rest of the park, the neighbors. */
export function worldLayers(parkLayers, basemap, neighbors) {
  const [terrain, ...rest] = parkLayers;
  return [terrain, basemap, ...rest, ...(neighbors ? [neighbors] : [])];
}
