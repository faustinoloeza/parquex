// Reading binary glTF (.glb) files: the JSON chunk plus a summary used to
// check the mobile export (pipeline/export-glb.js), including its prototypes
// (`proto:<type>` nodes) expanded with instances.bin.
import { instanceMatrix, srgbByteToLinear } from '#shared/formats/instances.js';

const GLB_MAGIC = 0x46546c67; // 'glTF'
const CHUNK_JSON = 0x4e4f534a;
const CHUNK_BIN = 0x004e4942;

/**
 * Splits a GLB into its JSON document and binary chunk.
 * @param {Uint8Array} bytes
 * @returns {{ json: object, bin: Uint8Array | null }}
 */
export function parseGlb(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (view.getUint32(0, true) !== GLB_MAGIC) throw new Error('not a GLB file');
  if (view.getUint32(4, true) !== 2) throw new Error('unsupported glTF version');
  const length = view.getUint32(8, true);
  let json = null,
    bin = null;
  for (let offset = 12; offset < length;) {
    const size = view.getUint32(offset, true),
      type = view.getUint32(offset + 4, true);
    const data = bytes.subarray(offset + 8, offset + 8 + size);
    if (type === CHUNK_JSON) json = JSON.parse(new TextDecoder().decode(data));
    else if (type === CHUNK_BIN) bin = data;
    offset += 8 + size;
  }
  if (!json) throw new Error('GLB without JSON chunk');
  return { json, bin };
}

/** Width and height of a PNG or JPEG image, or null. */
export function imageSize(data) {
  if (data[0] === 0x89 && data[1] === 0x50) {
    const v = new DataView(data.buffer, data.byteOffset);
    return { width: v.getUint32(16), height: v.getUint32(20) };
  }
  if (data[0] === 0xff && data[1] === 0xd8) {
    for (let i = 2; i + 9 < data.length;) {
      if (data[i] !== 0xff) return null;
      const marker = data[i + 1],
        len = (data[i + 2] << 8) | data[i + 3];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker))
        return { height: (data[i + 5] << 8) | data[i + 6], width: (data[i + 7] << 8) | data[i + 8] };
      i += 2 + len;
    }
  }
  return null;
}

const PROTO = 'proto:';
const ANIM = 'anim:';
/** Extensions that compress or quantize vertex data (not allowed on prototypes). */
const COMPRESSION = /^(KHR_mesh_quantization|EXT_meshopt_compression|KHR_draco_mesh_compression)$/;
const FLOAT = 5126;
const COMPONENTS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 };
const ARRAYS = { 5120: Int8Array, 5121: Uint8Array, 5122: Int16Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };

/**
 * Counts what a renderer will draw: one draw call per primitive of each mesh
 * node (instanced nodes too), triangles including instances, textures with
 * their decoded size (RGBA8, without mipmaps). Prototype nodes (`proto:<type>`,
 * hidden by the app and drawn once per instances.bin record) are listed apart
 * in `prototypes` and left out of the draw calls and triangles, with the
 * problems the app would trip on (node transform, non-float attributes,
 * compression extensions) in `issues`. The moving parts (`anim:<piece>:<i>`,
 * hidden too and drawn by the app's animation drivers) go in `animated`, with
 * the same checks.
 * @param {{ json: object, bin: Uint8Array | null }} glb
 */
export function summarizeGlb({ json, bin }) {
  const accessors = json.accessors ?? [];
  const summary = {
    extensionsUsed: json.extensionsUsed ?? [],
    extensionsRequired: json.extensionsRequired ?? [],
    nodes: json.nodes?.length ?? 0,
    meshes: json.meshes?.length ?? 0,
    materials: json.materials?.length ?? 0,
    drawCalls: 0,
    triangles: 0,
    instancedNodes: [],
    prototypes: [],
    animated: [],
    meshList: [],
    textures: [],
  };
  for (const node of json.nodes ?? []) {
    if (node.mesh == null) continue;
    const mesh = json.meshes[node.mesh];
    const instancing = node.extensions?.EXT_mesh_gpu_instancing;
    const instances = instancing ? accessors[instancing.attributes.TRANSLATION].count : 1;
    let triangles = 0;
    for (const p of mesh.primitives) {
      if ((p.mode ?? 4) !== 4) continue;
      triangles += (p.indices != null ? accessors[p.indices].count : accessors[p.attributes.POSITION].count) / 3;
    }
    if (node.name?.startsWith(PROTO)) {
      summary.prototypes.push({
        name: node.name.slice(PROTO.length),
        triangles,
        primitives: mesh.primitives.length,
        issues: protoIssues(json, node, mesh),
      });
      continue;
    }
    if (node.name?.startsWith(ANIM)) {
      summary.animated.push({
        name: node.name.slice(ANIM.length),
        triangles,
        vertices: mesh.primitives.reduce((n, p) => n + accessors[p.attributes.POSITION].count, 0),
        primitives: mesh.primitives.length,
        issues: protoIssues(json, node, mesh),
      });
      continue;
    }
    summary.drawCalls += mesh.primitives.length;
    summary.triangles += triangles * instances;
    summary.meshList.push({ name: node.name ?? mesh.name ?? '', triangles, instances });
    if (instancing) summary.instancedNodes.push({ name: node.name ?? '', instances, trianglesEach: triangles });
  }
  const imageNames = new Map((json.textures ?? []).map((t) => [t.source, t.name]));
  for (const [i, image] of (json.images ?? []).entries()) {
    const view = json.bufferViews[image.bufferView];
    const data = bin ? bin.subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength) : null;
    const size = data ? imageSize(data) : null;
    summary.textures.push({
      name: image.name ?? imageNames.get(i) ?? '',
      mimeType: image.mimeType,
      bytes: view.byteLength,
      width: size?.width,
      height: size?.height,
      decodedBytes: size ? size.width * size.height * 4 : 0,
    });
  }
  return summary;
}

/**
 * What a prototype node does wrong for the app (empty when fine). The rest of
 * the file may be compressed (EXT_meshopt_compression, KHR_mesh_quantization,
 * see pipeline/lib/meshopt.js), but the app reads the prototypes' accessors
 * straight from the GLB binary chunk (buffer 0).
 */
function protoIssues(json, node, mesh) {
  const issues = [];
  if (node.matrix || node.translation || node.rotation || node.scale) issues.push('node transform');
  if (node.extensions?.EXT_mesh_gpu_instancing) issues.push('EXT_mesh_gpu_instancing');
  const plain = (index) => {
    const view = json.bufferViews?.[json.accessors[index].bufferView];
    if (!view) issues.push('accessor without buffer view');
    else if (view.extensions) issues.push('compressed buffer view');
    else if ((view.buffer ?? 0) !== 0 || json.buffers?.[0]?.uri) issues.push('buffer view outside the GLB binary chunk');
  };
  for (const p of mesh.primitives) {
    for (const e of Object.keys(p.extensions ?? {})) if (COMPRESSION.test(e)) issues.push(e);
    for (const name of ['POSITION', 'NORMAL', 'COLOR_0']) {
      const a = json.accessors[p.attributes[name]];
      if (!a) issues.push(`no ${name}`);
      else if (a.componentType !== FLOAT || a.normalized) issues.push(`${name} not float32`);
    }
    for (const a of Object.values(p.attributes)) plain(a);
    if (p.indices != null) {
      if (![5123, 5125].includes(json.accessors[p.indices].componentType)) issues.push('indices not uint16/uint32');
      plain(p.indices);
    }
  }
  return [...new Set(issues)];
}

/**
 * Contents of an accessor as a typed array (tightly packed copy; no sparse accessors).
 * @param {{ json: object, bin: Uint8Array }} glb
 * @param {number} index
 */
export function readAccessor({ json, bin }, index) {
  const a = json.accessors[index];
  const Type = ARRAYS[a.componentType];
  const n = COMPONENTS[a.type];
  const size = Type.BYTES_PER_ELEMENT;
  const view = json.bufferViews[a.bufferView];
  const stride = view.byteStride ?? n * size;
  const start = bin.byteOffset + (view.byteOffset ?? 0) + (a.byteOffset ?? 0);
  const data = new DataView(bin.buffer);
  const get = `get${Type.name.replace('Array', '')}`;
  const out = new Type(a.count * n);
  for (let i = 0; i < a.count; i++) for (let k = 0; k < n; k++) out[i * n + k] = data[get](start + i * stride + k * size, true);
  return out;
}

/**
 * Rebuilds what the app draws from the prototypes and instances.bin (each
 * prototype triangle once per record) and measures it: triangles, bounding
 * box and triangle-weighted mean COLOR_0 (times the tint) per type.
 * @param {{ json: object, bin: Uint8Array }} glb
 * @param {import('#shared/formats/instances.js').InstanceType[]} types decoded instances.bin
 * @returns {Record<string, { copies: number, triangles: number, min: number[], max: number[], color: number[] }>}
 */
export function expandPrototypes(glb, types) {
  const nodes = new Map((glb.json.nodes ?? []).filter((n) => n.name?.startsWith(PROTO)).map((n) => [n.name.slice(PROTO.length), n]));
  const out = {};
  const m = new Array(16);
  for (const { name, records } of types) {
    const node = nodes.get(name);
    if (!node || node.mesh == null) throw new Error(`instances.bin type "${name}" has no proto:${name} mesh node`);
    const stats = {
      copies: records.length,
      triangles: 0,
      min: [Infinity, Infinity, Infinity],
      max: [-Infinity, -Infinity, -Infinity],
      color: [0, 0, 0],
    };
    for (const p of glb.json.meshes[node.mesh].primitives) {
      const pos = readAccessor(glb, p.attributes.POSITION);
      const col = p.attributes.COLOR_0 != null ? readAccessor(glb, p.attributes.COLOR_0) : null;
      const cn = col ? COMPONENTS[glb.json.accessors[p.attributes.COLOR_0].type] : 0;
      const index = p.indices != null ? readAccessor(glb, p.indices) : Uint32Array.from({ length: pos.length / 3 }, (_, i) => i);
      // the prototype's mean triangle color, before the tint
      const mean = [0, 0, 0];
      for (let t = 0; t < index.length; t += 3)
        for (let k = 0; k < 3; k++) for (let c = 0; c < 3; c++) mean[c] += col ? col[index[t + k] * cn + c] : 1;
      const tris = index.length / 3;
      for (const r of records) {
        instanceMatrix(r, m);
        for (let v = 0; v < pos.length; v += 3) {
          const x = pos[v],
            y = pos[v + 1],
            z = pos[v + 2];
          const w = [
            m[0] * x + m[4] * y + m[8] * z + m[12],
            m[1] * x + m[5] * y + m[9] * z + m[13],
            m[2] * x + m[6] * y + m[10] * z + m[14],
          ];
          for (let c = 0; c < 3; c++) {
            if (w[c] < stats.min[c]) stats.min[c] = w[c];
            if (w[c] > stats.max[c]) stats.max[c] = w[c];
          }
        }
        const tint = [r.r, r.g, r.b].map(srgbByteToLinear);
        for (let c = 0; c < 3; c++) stats.color[c] += (mean[c] / 3) * tint[c];
      }
      stats.triangles += tris * records.length;
    }
    stats.color = stats.color.map((v) => v / Math.max(1, stats.triangles));
    out[name] = stats;
  }
  return out;
}
