import { describe, expect, it } from 'vitest';
import { Document, NodeIO } from '@gltf-transform/core';
import { compressGlb, meshoptIO } from '../../pipeline/lib/meshopt.js';
import { parseGlb, readAccessor, summarizeGlb } from '../../pipeline/lib/glb.js';

/** A grid mesh (enough vertices for quantization/compression to matter). */
function grid(doc, buffer, n, size, offset) {
  const pos = [],
    nor = [],
    col = [],
    idx = [];
  for (let z = 0; z <= n; z++)
    for (let x = 0; x <= n; x++) {
      pos.push(offset + (x / n) * size, Math.sin(x + z) * 3, (z / n) * size);
      nor.push(0, 1, 0);
      col.push(x / n, z / n, 0.5);
    }
  for (let z = 0; z < n; z++)
    for (let x = 0; x < n; x++) {
      const a = z * (n + 1) + x;
      idx.push(a, a + n + 1, a + 1, a + 1, a + n + 1, a + n + 2);
    }
  const acc = (type, array) => doc.createAccessor().setType(type).setArray(array).setBuffer(buffer);
  const prim = doc
    .createPrimitive()
    .setAttribute('POSITION', acc('VEC3', new Float32Array(pos)))
    .setAttribute('NORMAL', acc('VEC3', new Float32Array(nor)))
    .setAttribute('COLOR_0', acc('VEC3', new Float32Array(col)))
    .setIndices(acc('SCALAR', new Uint16Array(idx)))
    .setMaterial(doc.createMaterial('m'));
  return doc.createMesh().addPrimitive(prim);
}

async function sampleGlb() {
  const doc = new Document();
  const buffer = doc.createBuffer();
  const scene = doc.createScene();
  scene.addChild(doc.createNode('terrain:ground').setMesh(grid(doc, buffer, 40, 800, -400)));
  scene.addChild(doc.createNode('proto:tree-palm').setMesh(grid(doc, buffer, 12, 6, 0)));
  return new NodeIO().writeBinary(doc);
}

describe('compressGlb', () => {
  it('compresses everything but the proto:* meshes, which stay byte-identical', async () => {
    const raw = await sampleGlb();
    const out = await compressGlb(raw);
    expect(out.byteLength).toBeLessThan(raw.byteLength);

    const before = parseGlb(raw),
      after = parseGlb(out);
    const s = summarizeGlb(after);
    expect(s.extensionsRequired).toEqual(expect.arrayContaining(['EXT_meshopt_compression', 'KHR_mesh_quantization']));
    expect(s.prototypes).toEqual([{ name: 'tree-palm', triangles: 12 * 12 * 2, primitives: 1, issues: [] }]);

    const prim = (glb, name) => glb.json.meshes[glb.json.nodes.find((n) => n.name === name).mesh].primitives[0];
    const [p0, p1] = [prim(before, 'proto:tree-palm'), prim(after, 'proto:tree-palm')];
    for (const name of ['POSITION', 'NORMAL', 'COLOR_0'])
      expect(readAccessor(after, p1.attributes[name])).toEqual(readAccessor(before, p0.attributes[name]));
    expect(readAccessor(after, p1.indices)).toEqual(readAccessor(before, p0.indices));

    // the terrain is quantized (node transform) and meshopt-compressed
    const terrain = after.json.nodes.find((n) => n.name === 'terrain:ground');
    expect(terrain.scale ?? terrain.translation).toBeDefined();
    const t = prim(after, 'terrain:ground');
    expect(after.json.accessors[t.attributes.POSITION].componentType).not.toBe(5126);
    expect(after.json.bufferViews[after.json.accessors[t.attributes.POSITION].bufferView].extensions.EXT_meshopt_compression).toBeDefined();

    // and decodes back to the same geometry (positions within the 16-bit grid)
    const io = await meshoptIO();
    const doc = await io.readBinary(out);
    const node = doc
      .getRoot()
      .listNodes()
      .find((n) => n.getName() === 'terrain:ground');
    const box = (n) => {
      const pos = n.getMesh().listPrimitives()[0].getAttribute('POSITION');
      const m = n.getWorldMatrix(),
        v = [0, 0, 0],
        min = [Infinity, Infinity, Infinity];
      for (let i = 0; i < pos.getCount(); i++) {
        pos.getElement(i, v);
        for (let c = 0; c < 3; c++) min[c] = Math.min(min[c], m[c] * v[0] + m[4 + c] * v[1] + m[8 + c] * v[2] + m[12 + c]);
      }
      return min;
    };
    const decodedMin = box(node);
    expect(decodedMin[0]).toBeCloseTo(-400, 1);
    expect(decodedMin[2]).toBeCloseTo(0, 1);
  });
});
