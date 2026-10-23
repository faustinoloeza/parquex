import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { SUN } from '../app/Stage.js';
import { decodeInstances, instanceMatrix, srgbByteToLinear } from '#shared/formats/instances.js';
import { makeDesignArea } from '#shared/design-area.js';
import { BASEMAP } from '../config.js';
import { designFadeGLSL, designFadeUniforms } from '../graphics/shaders/design-fade.js';

/**
 * Loads an exported GLB back with GLTFLoader (checks that it parses; meshopt
 * compression and quantized attributes are decoded) and renders an oblique
 * overview with plain lights, roughly what a glTF viewer shows. Returns the image as PNG. With `instances` (instances.bin), the
 * `proto:<type>` nodes are hidden and drawn once per record, as the app does. The moving parts
 * (`anim:*`, at the origin until the app places them) are hidden.
 * @param {ArrayBuffer} glb
 * @param {object} park park.json
 * @param {HTMLElement} container
 * @param {Uint8Array | null} [instances]
 * @returns {Promise<Blob>}
 */
export async function renderPreview(glb, park, container, instances = null) {
  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).parseAsync(glb, '');
  unpremultiplyBlend(gltf.scene);
  if (instances) expandInstances(gltf, decodeInstances(instances));
  for (const [o, name] of nodeNames(gltf)) if (name.startsWith('anim:')) o.visible = false;
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(1600, 1000, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#dde8ee');
  scene.add(new THREE.HemisphereLight(0xeaf6ff, 0x6f8a4a, 1.7));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.3);
  sun.position.copy(SUN).multiplyScalar(100);
  scene.add(sun, gltf.scene);

  const { cx, cz, size } = park.extent;
  const camera = new THREE.PerspectiveCamera(38, 1.6, 5, 6000);
  camera.position.set(cx, size * 0.75, cz + size * 0.62);
  camera.lookAt(cx, 0, cz + size * 0.04);
  renderer.render(scene, camera);
  const info = renderer.info.render;
  console.log(`preview: ${info.calls} draw calls, ${info.triangles} triangles`);
  return new Promise((resolve) => renderer.domElement.toBlob(resolve, 'image/png'));
}

/**
 * The context bundle (export/context.js) around the focused park, drawn the way
 * context.json asks the app to: a flat "real map" in the map's land color with
 * the focused park's fade (and the region correction of basemapYield), the
 * focused park's park-models.glb (+ instances.bin), then the ctx-ground nodes
 * (region first, the closest neighbor last; blended, no depth test), the trees
 * of context-instances.bin with the focused park's prototypes and the water.
 * Wide oblique view over every neighbor. Returns the image as PNG.
 * @param {{ parkGlb: ArrayBuffer, parkInstances: Uint8Array | null, contextGlb: ArrayBuffer,
 *   contextInstances: Uint8Array, park: object, context: object, container: HTMLElement }} options
 * @returns {Promise<Blob>}
 */
export async function renderContextPreview({ parkGlb, parkInstances, contextGlb, contextInstances, park, context, container }) {
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const [parkGltf, contextGltf] = await Promise.all([loader.parseAsync(parkGlb, ''), loader.parseAsync(contextGlb, '')]);
  unpremultiplyBlend(parkGltf.scene);
  unpremultiplyBlend(contextGltf.scene);
  if (parkInstances) expandInstances(parkGltf, decodeInstances(parkInstances));
  expandInstances(parkGltf, decodeInstances(contextInstances), contextGltf.scene);
  const nodeName = (gltf, o) => {
    const node = gltf.parser.associations.get(o)?.nodes;
    return node != null ? gltf.parser.json.nodes[node].name : '';
  };
  parkGltf.scene.traverse((o) => {
    if (o.isMesh && nodeName(parkGltf, o).startsWith('terrain')) o.renderOrder = -3;
  });
  for (const [o, name] of nodeNames(parkGltf)) if (name.startsWith('anim:')) o.visible = false;
  const priority = Object.fromEntries(context.neighbors.map((n) => [n.key, n]));
  contextGltf.scene.traverse((o) => {
    const name = o.isMesh ? nodeName(contextGltf, o) || nodeName(contextGltf, o.parent) : '';
    if (!name.startsWith('ctx-ground:')) return;
    const n = priority[name.slice('ctx-ground:'.length)];
    // after the map, region first, then the parks from the last to the closest
    o.renderOrder = n.region ? -1.6 : -1.5 + (context.neighbors.length - n.priority) * 0.01;
    Object.assign(o.material, {
      transparent: false,
      depthTest: false,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendSrc: THREE.SrcAlphaFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
    });
  });

  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(1600, 1000, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.width = '100%';

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BASEMAP.background);
  scene.add(new THREE.HemisphereLight(0xeaf6ff, 0x6f8a4a, 1.7));
  const sun = new THREE.DirectionalLight(0xfff1dc, 2.3);
  sun.position.copy(SUN).multiplyScalar(100);
  const region = context.neighbors.find((n) => n.region);
  scene.add(sun, mapStandIn(park, region), parkGltf.scene, contextGltf.scene);

  const box = new THREE.Box3();
  for (const n of context.neighbors)
    if (n.bounds) box.union(new THREE.Box3(new THREE.Vector3(n.bounds.x0, 0, n.bounds.z0), new THREE.Vector3(n.bounds.x1, 0, n.bounds.z1)));
  const { cx, cz, size } = park.extent;
  box.union(new THREE.Box3(new THREE.Vector3(cx - size / 2, 0, cz - size / 2), new THREE.Vector3(cx + size / 2, 0, cz + size / 2)));
  const center = box.getCenter(new THREE.Vector3());
  const span = Math.max(box.max.x - box.min.x, box.max.z - box.min.z);
  const camera = new THREE.PerspectiveCamera(38, 1.6, 10, 20000);
  camera.position.set(center.x + span * 0.18, span * 0.62, center.z + span * 0.62);
  camera.lookAt(center.x, 0, center.z + span * 0.06);
  renderer.render(scene, camera);
  const info = renderer.info.render;
  console.log(`context preview: ${info.calls} draw calls, ${info.triangles} triangles`);
  return new Promise((resolve) => renderer.domElement.toBlob(resolve, 'image/png'));
}

/**
 * Stand-in for the app's real map: a flat quad in the map's land color whose
 * alpha is the focused park's fade, corrected under a region as
 * context.json → basemapYield asks (f · (1 − r) / (1 − r · f)), drawn after the
 * terrain like the app's fade quad.
 */
/**
 * Mobile GLBs store premultiplied vertex colors on alpha-blended meshes
 * (Filament's FADE blending un-premultiplies them); three.js blends straight
 * alpha, so undo it here to preview what the app shows.
 */
function unpremultiplyBlend(root) {
  root.traverse((o) => {
    const color = o.isMesh && o.material?.transparent && o.geometry.getAttribute('color');
    if (!color || color.itemSize !== 4) return;
    for (let i = 0; i < color.count; i++) {
      const a = color.getW(i);
      if (a > 1e-4) color.setXYZ(i, color.getX(i) / a, color.getY(i) / a, color.getZ(i) / a);
    }
    color.needsUpdate = true;
  });
}

function mapStandIn(park, region) {
  const focus = makeDesignArea(park.clear);
  const area = region ? makeDesignArea(region.clear) : focus;
  const uniforms = {
    ...designFadeUniforms(focus),
    ...designFadeUniforms(area, 'region'),
    uColor: { value: new THREE.Color(BASEMAP.background) },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader:
      'varying vec2 vWorld; void main() { vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xz; gl_Position = projectionMatrix * viewMatrix * w; }',
    fragmentShader: `
      uniform vec3 uColor;
      varying vec2 vWorld;
      ${designFadeGLSL(focus.radii.length)}
      ${designFadeGLSL(area.radii.length, 'region')}
      void main() {
        float f = designFade(vWorld);
        ${region ? 'float r = 1.0 - regionFade(vWorld); f = f * (1.0 - r) / max(1.0 - r * f, 1e-4);' : ''}
        gl_FragColor = vec4(uColor, f);
        #include <colorspace_fragment>
      }`,
    transparent: false,
    depthTest: false,
    depthWrite: false,
    blending: THREE.CustomBlending,
    blendSrc: THREE.SrcAlphaFactor,
    blendDst: THREE.OneMinusSrcAlphaFactor,
    toneMapped: false,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(20000, 20000).rotateX(-Math.PI / 2), material);
  mesh.renderOrder = -2.5;
  return mesh;
}

/** Objects of a loaded GLB with their glTF node names (GLTFLoader strips ':' from object names). */
function nodeNames(gltf) {
  const out = [];
  gltf.scene.traverse((o) => {
    const node = gltf.parser.associations.get(o)?.nodes;
    const name = node != null ? gltf.parser.json.nodes[node].name : null;
    if (name) out.push([o, name]);
  });
  return out;
}

/**
 * Hides each `proto:<type>` node and adds an InstancedMesh per primitive with
 * the records' matrices and tints (sRGB bytes → linear instance colors, which
 * multiply COLOR_0 like the app does), to `into` (default: the GLB's scene).
 */
function expandInstances(gltf, types, into = gltf.scene) {
  const protos = new Map();
  for (const [o, name] of nodeNames(gltf)) if (name.startsWith('proto:')) protos.set(name.slice(6), o);
  const m = new THREE.Matrix4(),
    c = new THREE.Color();
  for (const { name, records } of types) {
    const proto = protos.get(name);
    if (!proto) throw new Error(`instances.bin type "${name}" has no proto:${name} node`);
    proto.visible = false;
    const meshes = [];
    proto.traverse((o) => o.isMesh && meshes.push(o));
    for (const mesh of meshes) {
      const out = new THREE.InstancedMesh(mesh.geometry, mesh.material, records.length);
      records.forEach((r, i) => {
        out.setMatrixAt(i, m.fromArray(instanceMatrix(r)));
        out.setColorAt(i, c.setRGB(srgbByteToLinear(r.r), srgbByteToLinear(r.g), srgbByteToLinear(r.b), THREE.LinearSRGBColorSpace));
      });
      out.name = `instances:${name}`;
      into.add(out);
    }
  }
}
