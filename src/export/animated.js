import * as THREE from 'three';
import { MaterialMerger } from './merge.js';
import { combine } from './instances.js';
import { BIRD_FLAP, BIRD_MATERIAL, BIRD_SCALE, faunaLayout, flockGeometry } from '../layers/fauna.js';
import { NIGHT_ACTIVITY } from '../graphics/night.js';

// Moving parts of the mobile export: what the models' update() moves (tower
// cabin, voladores, flags, butterflies; models/define.js → AnimatedPiece) and
// the bird flocks of the fauna layer leave the frozen static meshes and become
// one plain prototype per part (`anim:<piece>:<i>`, float32 like proto:*, left
// out of the meshopt compression: the app reads them from the GLB binary) plus
// animated.json, with what each app driver needs to redo update(). Contract:
// docs/app-movil-noche-navegacion.md → Animaciones.

const PREFIX = 'anim:';
/** Seconds of update() sampled to bound each piece (longer than the slowest cycle: the tower cabin, 70 s). */
const SAMPLE_SECONDS = 140;
/** At most the 0.1 s steps the butterflies' night-aware clock accepts, so their whole orbits are sampled. */
const SAMPLE_STEP = 0.1;
/** Margin (m) around the sampled boxes: the wing beats happen in a shader the boxes do not see. */
const BOX_MARGIN = 1.5;
const WHITE = new THREE.Color(1, 1, 1);

/**
 * Takes the moving parts out of the landmarks layer (call before merging it)
 * and describes them for the app. Leaves the layer posed at `poseTime`.
 * @param {object} options
 * @param {string} options.key park key
 * @param {ReturnType<typeof import('../layers/landmarks.js').createLandmarksLayer>} options.landmarks
 * @param {object} [options.fauna] src/parks/<park>/fauna.js (its bird flocks; flamingos and dolphins stay web-only)
 * @param {number} options.poseTime time the rest of the landmarks are frozen at
 * @returns {{ prototypes: THREE.Mesh[], json: object }}
 */
export function exportAnimated({ key, landmarks, fauna, poseTime }) {
  const boxes = sampleBoxes(landmarks);
  landmarks.update({ t: poseTime, dt: 0 });
  const prototypes = [];
  const pieces = [];

  for (const { id, object, pieces: list } of landmarks.animations) {
    object.updateMatrixWorld(true);
    for (const piece of list) {
      const pieceId = `${id}:${piece.name}`;
      const parts = piece.parts.map((p) => (p.isObject3D ? { object: p } : p));
      const names = parts.map((part, i) => {
        const name = `${PREFIX}${pieceId}:${i}`;
        prototypes.push(prototype(part, name));
        return name;
      });
      for (const { object: o } of parts) o.removeFromParent(); // not frozen into the static meshes
      pieces.push({
        id: pieceId,
        driver: piece.driver,
        position: round(object.position.toArray()),
        rotY: round(object.rotation.y),
        box: boxArray(boxes.get(piece)),
        size: round(piece.size),
        params: piece.params,
        parts: names,
      });
    }
  }

  const { flocks } = faunaLayout(fauna);
  for (const [k, flock] of (fauna?.birds ?? []).entries()) {
    const name = `${PREFIX}fauna:birds${k}:0`;
    const mesh = new THREE.Mesh(flockGeometry(flock), new THREE.MeshStandardMaterial(BIRD_MATERIAL));
    prototypes.push(prototype({ object: mesh }, name));
    const scale = flock.scale ?? BIRD_SCALE;
    const span = (flock.span ?? 1.6) * scale;
    const birds = flocks[k];
    const reach = Math.max(...birds.map((b) => b.rr)) + span;
    const low = Math.min(...birds.map((b) => b.hh)) - 3 - span,
      high = Math.max(...birds.map((b) => b.hh)) + 3 + span;
    pieces.push({
      id: `fauna:birds${k}`,
      driver: 'flock',
      position: [0, 0, 0],
      rotY: 0,
      box: round([flock.x - reach, low, flock.z - reach * 0.8 - span, flock.x + reach, high, flock.z + reach * 0.8 + span]),
      size: round(2 * span),
      params: { x: flock.x, z: flock.z, scale, flap: BIRD_FLAP, birds },
      parts: [name],
    });
  }

  return {
    prototypes,
    json: {
      format: 'parquex-animated',
      version: 1,
      park: key,
      frame: `local meters of ${key}/park.json (x east, y up, z south, origin at its center)`,
      nightActivity: { pace: NIGHT_ACTIVITY.pace, birds: NIGHT_ACTIVITY.birds },
      pieces,
    },
  };
}

/**
 * World box of each piece over SAMPLE_SECONDS of update(), plus BOX_MARGIN.
 * @returns {Map<object, THREE.Box3>}
 */
function sampleBoxes(landmarks) {
  const boxes = new Map();
  for (let i = 0; i * SAMPLE_STEP <= SAMPLE_SECONDS; i++) {
    landmarks.update({ t: i * SAMPLE_STEP, dt: SAMPLE_STEP });
    for (const { object, pieces } of landmarks.animations) {
      object.updateMatrixWorld(true);
      for (const piece of pieces) {
        if (!boxes.has(piece)) boxes.set(piece, new THREE.Box3());
        const box = boxes.get(piece);
        for (const p of piece.parts) {
          const o = p.isObject3D ? p : p.object;
          o.traverse((m) => m.isInstancedMesh && m.computeBoundingBox()); // cached by three.js otherwise
          box.expandByObject(o, true); // precise: the vertices update() deforms
        }
      }
    }
  }
  for (const box of boxes.values()) box.expandByScalar(BOX_MARGIN);
  return boxes;
}

/**
 * One part as a prototype in its own frame (no node transform): its meshes and
 * its children's, merged per material (one primitive each), always with
 * COLOR_0 like the proto:* nodes (white where the material has no vertex
 * colors; the app tints it per copy). An InstancedMesh gives one copy; `rest`
 * gives the undeformed geometry of a mesh update() deforms.
 * @param {{ object: THREE.Object3D, rest?: () => THREE.BufferGeometry }} part
 * @param {string} name
 */
function prototype({ object, rest }, name) {
  const merger = new MaterialMerger();
  if (object.isInstancedMesh) merger.addGeometry(object.geometry, new THREE.Matrix4(), object.material, WHITE);
  else {
    object.updateMatrixWorld(true);
    const inverse = object.matrixWorld.clone().invert();
    object.traverse((o) => {
      if (!o.isMesh || !o.visible) return;
      const own = o === object;
      const matrix = own ? new THREE.Matrix4() : new THREE.Matrix4().multiplyMatrices(inverse, o.matrixWorld);
      merger.addGeometry(own && rest ? rest() : o.geometry, matrix, o.material, WHITE);
    });
  }
  const meshes = merger.build('anim');
  if (!meshes.length) throw new Error(`${name}: no meshes`);
  return combine(meshes, name);
}

const round = (v) => (Array.isArray(v) ? v.map(round) : Math.round(v * 1000) / 1000);

const boxArray = (b) => round([b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z]);
