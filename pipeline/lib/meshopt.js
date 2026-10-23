// Geometry compression of the mobile GLB (park-models.glb) for the Android app
// (Filament gltfio decodes both extensions): vertex cache/fetch reordering,
// KHR_mesh_quantization and EXT_meshopt_compression, with gltf-transform.
//
// The app reads the `proto:<type>` and `anim:<piece>:<i>` meshes straight from
// the GLB binary (float32 POSITION/NORMAL/COLOR_0, uint16/uint32 indices, no
// node transform), so they are left out of every step and written as plain
// buffer views in the GLB chunk, byte for byte as the export page wrote them.
// Textures are not touched.
import { Logger, NodeIO, PropertyType, VertexLayout } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTMeshoptCompression } from '@gltf-transform/extensions';
import { prune, quantize, reorder } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';
import { parseGlb } from './glb.js';

/** Nodes the app reads from the binary itself: prototypes of the copies and moving parts. */
const PLAIN = /^(proto|anim):/;

/**
 * Quantization bits. Positions get 16 (≈3 cm over a 2 km park, the terrain is
 * one mesh): the paving drapes 5 cm over the terrain and must not sink in it.
 * UVs outside [0, 1] (repeating textures) are left as float by quantize().
 */
export const QUANTIZE_BITS = { quantizePosition: 16, quantizeNormal: 10, quantizeTexcoord: 12, quantizeColor: 8 };

/** EXT_meshopt_compression that leaves some accessors uncompressed (written by the core writer instead). */
class SelectiveMeshopt extends EXTMeshoptCompression {
  /** @type {Set<import('@gltf-transform/core').Accessor>} */
  skip = new Set();

  prewrite(context, propertyType) {
    if (propertyType !== PropertyType.ACCESSOR || !this.skip.size) return super.prewrite(context, propertyType);
    // the extension claims every accessor of the document: hide the skipped ones while it does
    const root = this.document.getRoot();
    const list = root.listAccessors;
    root.listAccessors = () => list.call(root).filter((a) => !this.skip.has(a));
    try {
      return super.prewrite(context, propertyType);
    } finally {
      delete root.listAccessors;
    }
  }
}

/** gltf-transform I/O with every extension and the meshopt encoder/decoder (separate, not interleaved, vertex buffers). */
export async function meshoptIO() {
  await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready]);
  return new NodeIO()
    .setLogger(new Logger(Logger.Verbosity.ERROR)) // not "Skipping TEXCOORD_0; out of [0,1] range" for each tiled UV set
    .registerExtensions(ALL_EXTENSIONS)
    .registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder })
    .setVertexLayout(VertexLayout.SEPARATE);
}

/** Accessors of a mesh (attributes, indices, morph targets). */
function meshAccessors(mesh) {
  const out = [];
  for (const prim of mesh.listPrimitives()) {
    out.push(...prim.listAttributes());
    if (prim.getIndices()) out.push(prim.getIndices());
    for (const target of prim.listTargets()) out.push(...target.listAttributes());
  }
  return out;
}

/** Runs `fn` while root.listMeshes() leaves out `hidden` (reorder() and quantize() have no mesh filter). */
async function withoutMeshes(doc, hidden, fn) {
  const root = doc.getRoot();
  const list = root.listMeshes;
  root.listMeshes = () => list.call(root).filter((m) => !hidden.has(m));
  try {
    await fn();
  } finally {
    delete root.listMeshes;
  }
}

/**
 * Compresses a GLB: reorder + quantize + EXT_meshopt_compression on every mesh
 * except the `proto:*` and `anim:*` ones.
 * @param {Uint8Array} bytes GLB written by the export page
 * @returns {Promise<Uint8Array>}
 */
export async function compressGlb(bytes) {
  const io = await meshoptIO();
  const doc = await io.readBinary(bytes);
  const root = doc.getRoot();
  // gltf-transform names a texture after its image: keep GLTFExporter's texture names (glTF textures[].name)
  const images = root.listTextures();
  for (const t of parseGlb(bytes).json.textures ?? []) if (t.name && !images[t.source]?.getName()) images[t.source]?.setName(t.name);
  const protoMeshes = new Set();
  for (const node of root.listNodes()) {
    if (!PLAIN.test(node.getName())) continue;
    if (node.getMesh()) protoMeshes.add(node.getMesh());
  }
  for (const node of root.listNodes())
    if (!PLAIN.test(node.getName()) && protoMeshes.has(node.getMesh()))
      throw new Error(`node "${node.getName()}" shares the mesh of a proto:* or anim:* node`);
  const protoAccessors = new Set([...protoMeshes].flatMap(meshAccessors));

  await withoutMeshes(doc, protoMeshes, () =>
    doc.transform(reorder({ encoder: MeshoptEncoder, target: 'size', cleanup: false }), quantize({ ...QUANTIZE_BITS, cleanup: false })),
  );
  // the float accessors replaced by quantized ones
  await doc.transform(prune({ propertyTypes: [PropertyType.ACCESSOR], keepAttributes: true, keepIndices: true }));
  for (const a of protoAccessors) if (a.isDisposed()) throw new Error('a proto:* or anim:* accessor was removed while compressing');

  const meshopt = doc.createExtension(SelectiveMeshopt).setRequired(true);
  meshopt.setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
  meshopt.skip = protoAccessors;
  return io.writeBinary(doc);
}
