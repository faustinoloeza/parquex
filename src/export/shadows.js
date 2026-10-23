import * as THREE from 'three';
import { GROUND_LEVELS, groundTileId, groundTileRect } from '#shared/formats/ground-tiles.js';
import { chunkGeometry } from '../layers/terrain.js';
import { SUN } from '../app/Stage.js';

/** Texture size (px) of the shadow layer: 2048² ≈ 0.7 m per texel for Xcaret, 16 MB decoded RGBA. */
export const SHADOW_SIZE = 2048;
/** Darkness of a full shadow (alpha), like the tree shadows baked into the ground tiles. */
const STRENGTH = 0.4;
/** Height (m) of the flat shadow layer: just above a map drawn at y = 0. */
const LIFT = 0.02;
/** Cells per finest chunk of the terrain the shadows are cast on (it is not exported). */
const RECEIVER_SEGMENTS = 32;

/**
 * Contact shadows of trees, buildings and models for a viewer that draws its
 * own ground (the mobile app shows the real map instead of the park terrain):
 * casts the scene's shadows with the app's sun onto the park terrain, renders
 * them from straight above and returns a flat, unlit, transparent mesh
 * ("shadows", black + alpha) at y = LIFT over the shadowed area. Rows of the
 * texture run north → south (flipY false, v = 0 at the north edge).
 *
 * @param {object} options
 * @param {THREE.Object3D} options.casters  the exported objects (rendered here, then given back to their parent)
 * @param {object} options.park             park.json
 * @param {(x: number, z: number) => number} options.heightAt
 * @param {object} options.designArea
 * @param {number} [options.size]           texture size (px)
 * @returns {THREE.Mesh | null}
 */
export function exportShadows({ casters, park, heightAt, designArea, size = SHADOW_SIZE }) {
  const box = new THREE.Box3().setFromObject(casters);
  if (box.isEmpty()) return null;
  // shadows fall away from the sun: up to (height × horizontal/vertical) meters
  const reach = Math.min(60, (box.max.y - box.min.y) * (Math.hypot(SUN.x, SUN.z) / SUN.y)) + 4;
  const x0 = box.min.x - reach,
    x1 = box.max.x + reach,
    z0 = box.min.z - reach,
    z1 = box.max.z + reach;
  const w = x1 - x0,
    h = z1 - z0;
  const cx = (x0 + x1) / 2,
    cz = (z0 + z1) / 2;

  const scene = new THREE.Scene();
  const parent = casters.parent;
  scene.add(casters);
  const receivers = terrainReceivers(park, heightAt, designArea);
  scene.add(receivers);
  casters.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const sun = new THREE.DirectionalLight(0xffffff, 1);
  const span = Math.hypot(w, h) / 2 + 50;
  sun.position.set(cx, 0, cz).addScaledVector(SUN, span * 2);
  sun.target.position.set(cx, 0, cz);
  sun.castShadow = true;
  const mapSize = Math.min(8192, renderer.capabilities.maxTextureSize);
  sun.shadow.mapSize.set(mapSize, mapSize);
  Object.assign(sun.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 1, far: span * 4 });
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.3;
  sun.shadow.radius = 2;
  scene.add(sun, sun.target);

  // casters only cast: during this render they wear a blank material that
  // writes neither color nor depth (the shadow pass uses its own depth
  // materials). Their real materials must not be rendered here: uploading a
  // texture frees its image (graphics/memory.js), and the GLB would get 1×1 ones.
  const hidden = new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false });
  const saved = new Map();
  casters.traverse((o) => {
    if (!o.isMesh) return;
    saved.set(o, o.material);
    o.material = hidden;
  });

  const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, 1, 2000);
  camera.position.set(cx, 1000, cz);
  camera.up.set(0, 0, -1); // north at the top of the image
  camera.lookAt(cx, 0, cz);

  const target = new THREE.WebGLRenderTarget(size, size);
  renderer.setRenderTarget(target);
  renderer.setClearColor(0x000000, 0);
  renderer.render(scene, camera);
  const pixels = new Uint8Array(size * size * 4);
  renderer.readRenderTargetPixels(target, 0, 0, size, size, pixels);
  renderer.setRenderTarget(null);

  for (const [mesh, material] of saved) mesh.material = material;
  hidden.dispose();
  if (parent) parent.add(casters);
  receivers.traverse((o) => o.geometry?.dispose());
  target.dispose();
  sun.shadow.map?.dispose();
  renderer.dispose();

  const texture = new THREE.CanvasTexture(shadowCanvas(pixels, size));
  texture.flipY = false;
  texture.name = 'shadows';
  const material = new THREE.MeshBasicMaterial({
    name: 'shadows',
    color: 0x000000,
    map: texture,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(flatRect(x0, z0, x1, z1, LIFT), material);
  mesh.name = 'shadows';
  mesh.renderOrder = -1;
  return mesh;
}

/** The park terrain (not exported), with a material that only shows the shadows it receives. */
function terrainReceivers(park, heightAt, designArea) {
  const group = new THREE.Group();
  const material = new THREE.ShadowMaterial({ opacity: STRENGTH });
  const finest = GROUND_LEVELS - 1;
  const n = 2 ** finest;
  const available = new Set(park.ground.tiles);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      if (!available.has(groundTileId(finest, i, j))) continue;
      const g = chunkGeometry(groundTileRect(park.extent, finest, i, j), heightAt, designArea, RECEIVER_SEGMENTS);
      if (!g) continue;
      const mesh = new THREE.Mesh(g, material);
      mesh.receiveShadow = true;
      group.add(mesh);
    }
  }
  return group;
}

/** Alpha of the rendered shadows on black, rows flipped to north → south and softened a little. */
function shadowCanvas(pixels, size) {
  const raw = document.createElement('canvas');
  raw.width = raw.height = size;
  const ctx = raw.getContext('2d');
  const image = ctx.createImageData(size, size);
  for (let row = 0; row < size; row++) {
    const src = (size - 1 - row) * size * 4; // GL rows start at the bottom (south)
    for (let u = 0; u < size; u++) image.data[(row * size + u) * 4 + 3] = pixels[src + u * 4 + 3];
  }
  ctx.putImageData(image, 0, 0);
  const soft = document.createElement('canvas');
  soft.width = soft.height = size;
  const sctx = soft.getContext('2d');
  sctx.filter = 'blur(1px)';
  sctx.drawImage(raw, 0, 0);
  return soft;
}

/** Horizontal rectangle at height y, normal up, uv (0, 0) at the north-west corner. */
function flatRect(x0, z0, x1, z1, y) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([x0, y, z0, x1, y, z0, x0, y, z1, x1, y, z1], 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 1, 1], 2));
  geometry.setIndex([0, 2, 1, 1, 2, 3]);
  return geometry;
}
