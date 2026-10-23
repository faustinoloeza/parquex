import { describe, expect, it } from 'vitest';
import { expandPrototypes, imageSize, parseGlb, readAccessor, summarizeGlb } from '../../pipeline/lib/glb.js';

/** Minimal GLB: JSON chunk (padded with spaces) + binary chunk. */
function makeGlb(json, bin = new Uint8Array(0)) {
  let text = new TextEncoder().encode(JSON.stringify(json));
  const pad = (n) => (4 - (n % 4)) % 4;
  text = Uint8Array.from([...text, ...new Array(pad(text.length)).fill(0x20)]);
  const binPadded = Uint8Array.from([...bin, ...new Array(pad(bin.length)).fill(0)]);
  const total = 12 + 8 + text.length + (bin.length ? 8 + binPadded.length : 0);
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);
  view.setUint32(0, 0x46546c67, true);
  view.setUint32(4, 2, true);
  view.setUint32(8, total, true);
  view.setUint32(12, text.length, true);
  view.setUint32(16, 0x4e4f534a, true);
  out.set(text, 20);
  if (bin.length) {
    const o = 20 + text.length;
    view.setUint32(o, binPadded.length, true);
    view.setUint32(o + 4, 0x004e4942, true);
    out.set(binPadded, o + 8);
  }
  return out;
}

const png = (w, h) => {
  const b = new Uint8Array(24);
  b.set([0x89, 0x50, 0x4e, 0x47]);
  new DataView(b.buffer).setUint32(16, w);
  new DataView(b.buffer).setUint32(20, h);
  return b;
};

describe('parseGlb', () => {
  it('reads the JSON and binary chunks', () => {
    const { json, bin } = parseGlb(makeGlb({ asset: { version: '2.0' } }, new Uint8Array([1, 2, 3])));
    expect(json.asset.version).toBe('2.0');
    expect([...bin.subarray(0, 3)]).toEqual([1, 2, 3]);
  });

  it('rejects other files', () => {
    expect(() => parseGlb(new Uint8Array(20))).toThrow();
  });
});

describe('imageSize', () => {
  it('reads PNG headers', () => {
    expect(imageSize(png(512, 293))).toEqual({ width: 512, height: 293 });
  });
});

describe('summarizeGlb', () => {
  it('counts draw calls, instanced triangles and textures', () => {
    const json = {
      accessors: [{ count: 30 }, { count: 60 }, { count: 7 }, { count: 9 }],
      meshes: [{ primitives: [{ attributes: { POSITION: 0 }, indices: 1 }] }, { primitives: [{ attributes: { POSITION: 3 } }] }],
      nodes: [{ mesh: 0 }, { mesh: 1, extensions: { EXT_mesh_gpu_instancing: { attributes: { TRANSLATION: 2 } } } }],
      images: [{ bufferView: 0, mimeType: 'image/png' }],
      textures: [{ source: 0, name: 'tile' }],
      bufferViews: [{ byteOffset: 0, byteLength: 24 }],
      extensionsUsed: ['EXT_mesh_gpu_instancing'],
    };
    const s = summarizeGlb(parseGlb(makeGlb(json, png(256, 128))));
    expect(s.drawCalls).toBe(2);
    expect(s.triangles).toBe(20 + 3 * 7);
    expect(s.instancedNodes).toEqual([{ name: '', instances: 7, trianglesEach: 3 }]);
    expect(s.textures[0]).toMatchObject({ name: 'tile', width: 256, height: 128, decodedBytes: 256 * 128 * 4 });
  });
});

describe('prototypes', () => {
  // one triangle prototype: POSITION, NORMAL, COLOR_0 (float) + uint16 indices
  const floats = new Float32Array([0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0.5, 0.5, 0.5, 1, 1, 1]);
  const bin = new Uint8Array(floats.byteLength + 8);
  bin.set(new Uint8Array(floats.buffer));
  bin.set(new Uint8Array(new Uint16Array([0, 1, 2]).buffer), floats.byteLength);
  const json = (node = {}) => ({
    accessors: [
      { bufferView: 0, componentType: 5126, count: 3, type: 'VEC3' },
      { bufferView: 0, byteOffset: 36, componentType: 5126, count: 3, type: 'VEC3' },
      { bufferView: 0, byteOffset: 72, componentType: 5126, count: 3, type: 'VEC3' },
      { bufferView: 1, componentType: 5123, count: 3, type: 'SCALAR' },
    ],
    bufferViews: [
      { byteOffset: 0, byteLength: 108 },
      { byteOffset: 108, byteLength: 6 },
    ],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1, COLOR_0: 2 }, indices: 3 }] }],
    nodes: [{ name: 'proto:bus', mesh: 0, ...node }],
  });

  it('lists prototypes apart from the draw calls and flags transforms', () => {
    const ok = summarizeGlb(parseGlb(makeGlb(json(), bin)));
    expect(ok.drawCalls).toBe(0);
    expect(ok.prototypes).toEqual([{ name: 'bus', triangles: 1, primitives: 1, issues: [] }]);
    const moved = summarizeGlb(parseGlb(makeGlb(json({ translation: [1, 0, 0] }), bin)));
    expect(moved.prototypes[0].issues).toEqual(['node transform']);
    // the rest of the file may be compressed, the prototype's own buffer views not
    const compressed = json();
    compressed.extensionsUsed = ['EXT_meshopt_compression', 'KHR_mesh_quantization'];
    expect(summarizeGlb(parseGlb(makeGlb(compressed, bin))).prototypes[0].issues).toEqual([]);
    compressed.bufferViews[0].extensions = {
      EXT_meshopt_compression: { buffer: 0, byteLength: 50, count: 3, byteStride: 12, mode: 'ATTRIBUTES' },
    };
    compressed.accessors[0].componentType = 5122;
    expect(summarizeGlb(parseGlb(makeGlb(compressed, bin))).prototypes[0].issues).toEqual([
      'POSITION not float32',
      'compressed buffer view',
    ]);
  });

  it('reads accessors and expands the prototypes with instance records', () => {
    const glb = parseGlb(makeGlb(json(), bin));
    expect([...readAccessor(glb, 3)]).toEqual([0, 1, 2]);
    expect([...readAccessor(glb, 0)]).toEqual([0, 0, 0, 1, 0, 0, 0, 2, 0]);
    const records = [
      { x: 10, y: 0, z: 0, rotY: 0, scale: 1, scaleY: 1, r: 255, g: 255, b: 255 },
      { x: -10, y: 1, z: 5, rotY: Math.PI, scale: 2, scaleY: 0.5, r: 255, g: 0, b: 255 },
    ];
    const { bus } = expandPrototypes(glb, [{ name: 'bus', records }]);
    expect(bus.copies).toBe(2);
    expect(bus.triangles).toBe(2);
    expect(bus.min.map((v) => +v.toFixed(5))).toEqual([-12, 0, 0]);
    expect(bus.max.map((v) => +v.toFixed(5))).toEqual([11, 2, 5]);
    // mean triangle color (5/6, 5/6, 5/6), green removed from the second copy
    expect(bus.color[0]).toBeCloseTo(5 / 6);
    expect(bus.color[1]).toBeCloseTo(5 / 12);
  });
});
