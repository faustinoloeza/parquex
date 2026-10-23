import * as THREE from 'three';
import { makeDesignArea } from '#shared/design-area.js';
import { makeGroundHoles } from '#shared/ground-holes.js';
import { landmarkGroundHoles } from '../models/index.js';
import { createTerrainLayer, createBuildingsLayer, createPiersLayer, createLandmarksLayer, createVehiclesLayer } from '../layers/index.js';
import { materials } from '../graphics/materials.js';
import { nameLibrary } from './materials.js';
import { MaterialMerger } from './merge.js';
import { exportTerrain } from './terrain.js';
import { exportWater } from './water.js';
import { exportVegetation, TREES } from './vegetation.js';
import { exportRoutes } from './routes.js';
import { exportShadows } from './shadows.js';
import { exportPaving } from './paving.js';
import { InstanceSet } from './instances.js';
import { applyNightLight, buildNight } from './night.js';
import { exportAnimated } from './animated.js';

/** Time (s) at which animated parts (flags, cabins, boats, butterflies) are frozen. */
const POSE_TIME = 2;

/**
 * The static world of a park as a plain three.js scene ready for GLTFExporter
 * (and a Filament / gltfio viewer): same local frame as the app (meters, y up,
 * x = east, z = south, origin at the park center), world transforms baked.
 *
 *   park
 *   ├─ terrain     one mesh per ground tile (export/terrain.js)
 *   ├─ water       flat, vertex-colored, transparent (export/water.js)
 *   ├─ vegetation  trees (export/vegetation.js)
 *   ├─ static      buildings + piers + landmarks + vehicles, one mesh per material
 *   ├─ routes      one ribbon mesh per route (export/routes.js)
 *   ├─ proto:<type> with `instances`: trees and buses replaced by prototypes
 *   └─ anim:<piece>:<i> with `mobile`: the moving parts, out of `static` (export/animated.js)
 *
 * Skipped: the real map (OSM tiles) and the animated fauna (but the bird
 * flocks of `mobile`).
 *
 * `modelsOnly` is for a viewer that draws its own ground (the mobile app shows
 * the real map): no terrain, water or routes, plus two flat layers since the
 * stylized ground is gone: the stone walkways and plazas ("paving", y = 0.01,
 * export/paving.js) and the contact shadows on top ("shadows", y = 0.02,
 * export/shadows.js).
 *
 * `mobile` is what the Android app loads: terrain, water and models (no
 * routes, the app draws its own) plus the paving draped over the terrain; no
 * shadow layer, the terrain tiles already have them baked in. With
 * `instances` (the default for `mobile`) trees and buses are not baked in:
 * one `proto:<type>` mesh per type at the origin (tree-broad, tree-palm…,
 * bus) plus the copies as `instances` (instances.bin bytes, see
 * export/instances.js and shared/formats/instances.js). `mobile` also
 * builds the night layer (`night`, export/night.js: lamps.bin, nightlight.png,
 * night.json) and puts the light map on terrain, paving and water, and takes
 * the moving parts (tower cabin, voladores, flags, butterflies, bird flocks)
 * out of the frozen static meshes: `anim:*` prototypes + animated.json
 * (export/animated.js), which the app animates.
 * @param {import('../parks/define.js').ParkDefinition} parkDef
 * @param {Awaited<ReturnType<typeof import('../app/assets.js').loadParkAssets>>} assets
 * @param {{ trees?: string, modelsOnly?: boolean, mobile?: boolean, instances?: boolean }} [options]
 * @returns {Promise<{ scene: THREE.Scene, instances: Uint8Array | null, night: ReturnType<typeof buildNight> | null, animated: object | null, info: object }>}
 */
export async function buildExportScene(
  parkDef,
  assets,
  { trees = TREES.INSTANCED, modelsOnly = false, mobile = false, instances: useInstances = mobile } = {},
) {
  const { park } = assets;
  const designArea = makeDesignArea(park.clear);
  nameLibrary(materials());
  const { heightAt } = createTerrainLayer({
    park,
    heightBuffer: assets.heightBuffer,
    overview: assets.groundOverview,
    designArea,
    baseUrl: assets.baseUrl,
  });

  const scene = new THREE.Scene();
  const root = new THREE.Group();
  root.name = 'park';
  scene.add(root);

  if (!modelsOnly) {
    const holes = makeGroundHoles(landmarkGroundHoles(parkDef.landmarks));
    root.add(await exportTerrain({ park, heightAt, designArea, baseUrl: assets.baseUrl, holes }));
    const water = exportWater({ park, waterTexture: assets.waterTexture, designArea, premultiply: mobile });
    if (water) root.add(water);
  }
  const instances = useInstances ? new InstanceSet() : null;
  const vegetation = exportVegetation({ buffer: assets.vegetationBuffer, mode: instances ? TREES.PROTOTYPES : trees, instances });
  if (!instances) root.add(vegetation.object);

  const landmarks = createLandmarksLayer({ landmarks: parkDef.landmarks, park, heightAt });
  landmarks.update({ t: POSE_TIME, dt: 0 });
  const animated = mobile ? exportAnimated({ key: park.key, landmarks, fauna: parkDef.fauna, poseTime: POSE_TIME }) : null;
  const vehicles = createVehiclesLayer({ rows: parkDef.vehicles, heightAt });
  const merger = new MaterialMerger();
  for (const layer of [createBuildingsLayer({ buildings: assets.buildings }), createPiersLayer({ park, heightAt }), landmarks])
    merger.addObject(layer.object);
  const buses = vehicles.object.children.find((o) => o.isInstancedMesh);
  if (instances && buses) instances.add('bus', buses);
  else merger.addObject(vehicles.object);
  const statics = new THREE.Group();
  statics.name = 'static';
  for (const mesh of merger.build('static')) statics.add(mesh);
  root.add(statics);
  if (instances) for (const proto of instances.prototypes) root.add(proto);
  if (animated) for (const proto of animated.prototypes) root.add(proto);

  if (modelsOnly) {
    scene.updateMatrixWorld(true);
    const shadows = exportShadows({ casters: root, park, heightAt, designArea });
    // added after the shadow pass: it receives shadows, it does not cast them
    const paving = await exportPaving({ park, baseUrl: assets.baseUrl });
    if (paving) root.add(paving);
    if (shadows) root.add(shadows);
  } else if (mobile) {
    const paving = await exportPaving({ park, baseUrl: assets.baseUrl, heightAt });
    if (paving) root.add(paving);
  } else root.add(exportRoutes({ park, heightAt }));
  // night (export/night.js): lamps, light map; its glow on terrain, paving and water
  let night = null;
  if (mobile) {
    night = buildNight({
      park,
      parkDef,
      heightAt,
      buildings: assets.buildings,
      paving: assets.paving,
      overview: assets.groundOverview,
      designArea,
    });
    applyNightLight(root, park.extent, night);
  }
  scene.updateMatrixWorld(true);
  return {
    scene,
    night,
    animated: animated?.json ?? null,
    instances: instances?.encode() ?? null,
    info: {
      trees: vegetation.count,
      treesByType: vegetation.byType,
      treeMode: instances ? TREES.PROTOTYPES : trees,
      skipped: merger.skipped,
      instances: instances?.counts() ?? null,
      instanceWarnings: instances?.warnings ?? [],
      animated: animated?.json.pieces.map((p) => p.id) ?? [],
    },
  };
}
