// instances.bin — copies of the repeated models of the mobile export (trees,
// buses), written next to park-models.glb. The GLB holds one prototype node
// `proto:<type>` per type (at the origin, base at y = 0, no node transform);
// the app rebuilds each copy from its record. Little endian:
//
//   char[4] "PQI1"
//   u32     typeCount
//   per type:
//     u16   nameLen
//     u8[]  name (UTF-8, the <type> of proto:<type>)
//     u32   count
//     count × 28-byte record:
//       f32 x, y, z     local meters (as park.json), y = base on the terrain
//       f32 rotY        radians around +y (three.js rotation.y)
//       f32 scale       XZ scale
//       f32 scaleY      Y scale
//       u8  r, g, b     sRGB tint multiplying COLOR_0 in linear (255 = none)
//       u8  0           reserved
//
// Matrix of a copy = T(x, y, z) · R_y(rotY) · S(scale, scaleY, scale).

export const INSTANCES_MAGIC = 'PQI1';
export const INSTANCE_RECORD_BYTES = 28;

/**
 * @typedef {{ x: number, y: number, z: number, rotY: number, scale: number, scaleY: number, r: number, g: number, b: number }} InstanceRecord
 * @typedef {{ name: string, records: InstanceRecord[] }} InstanceType
 */

/**
 * @param {InstanceType[]} types
 * @returns {Uint8Array}
 */
export function encodeInstances(types) {
  const names = types.map((t) => new globalThis.TextEncoder().encode(t.name));
  let size = 8;
  types.forEach((t, i) => (size += 2 + names[i].length + 4 + t.records.length * INSTANCE_RECORD_BYTES));
  const bytes = new Uint8Array(size);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < 4; i++) bytes[i] = INSTANCES_MAGIC.charCodeAt(i);
  view.setUint32(4, types.length, true);
  let o = 8;
  types.forEach((t, i) => {
    if (names[i].length > 0xffff) throw new Error(`instance type name too long: ${t.name}`);
    view.setUint16(o, names[i].length, true);
    bytes.set(names[i], o + 2);
    o += 2 + names[i].length;
    view.setUint32(o, t.records.length, true);
    o += 4;
    for (const r of t.records) {
      view.setFloat32(o, r.x, true);
      view.setFloat32(o + 4, r.y, true);
      view.setFloat32(o + 8, r.z, true);
      view.setFloat32(o + 12, r.rotY, true);
      view.setFloat32(o + 16, r.scale, true);
      view.setFloat32(o + 20, r.scaleY, true);
      bytes[o + 24] = r.r;
      bytes[o + 25] = r.g;
      bytes[o + 26] = r.b;
      bytes[o + 27] = 0;
      o += INSTANCE_RECORD_BYTES;
    }
  });
  return bytes;
}

/**
 * @param {ArrayBuffer | Uint8Array} buffer
 * @returns {InstanceType[]}
 */
export function decodeInstances(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (String.fromCharCode(...bytes.subarray(0, 4)) !== INSTANCES_MAGIC) throw new Error('not an instances.bin file');
  const typeCount = view.getUint32(4, true);
  const types = [];
  let o = 8;
  for (let t = 0; t < typeCount; t++) {
    const nameLen = view.getUint16(o, true);
    const name = new globalThis.TextDecoder().decode(bytes.subarray(o + 2, o + 2 + nameLen));
    o += 2 + nameLen;
    const count = view.getUint32(o, true);
    o += 4;
    if (o + count * INSTANCE_RECORD_BYTES > bytes.byteLength) throw new Error(`instances.bin truncated in "${name}"`);
    const records = new Array(count);
    for (let i = 0; i < count; i++, o += INSTANCE_RECORD_BYTES)
      records[i] = {
        x: view.getFloat32(o, true),
        y: view.getFloat32(o + 4, true),
        z: view.getFloat32(o + 8, true),
        rotY: view.getFloat32(o + 12, true),
        scale: view.getFloat32(o + 16, true),
        scaleY: view.getFloat32(o + 20, true),
        r: bytes[o + 24],
        g: bytes[o + 25],
        b: bytes[o + 26],
      };
    types.push({ name, records });
  }
  return types;
}

/**
 * Column-major 4×4 matrix of a record: T(x, y, z) · R_y(rotY) · S(scale, scaleY, scale)
 * (same layout as THREE.Matrix4.elements and glTF).
 * @param {InstanceRecord} r
 * @param {number[] | Float32Array} [out]
 */
export function instanceMatrix(r, out = new Array(16)) {
  const c = Math.cos(r.rotY),
    s = Math.sin(r.rotY);
  out[0] = c * r.scale;
  out[1] = 0;
  out[2] = -s * r.scale;
  out[3] = 0;
  out[4] = 0;
  out[5] = r.scaleY;
  out[6] = 0;
  out[7] = 0;
  out[8] = s * r.scale;
  out[9] = 0;
  out[10] = c * r.scale;
  out[11] = 0;
  out[12] = r.x;
  out[13] = r.y;
  out[14] = r.z;
  out[15] = 1;
  return out;
}

/** sRGB-encoded 0..255 channel of a linear 0..1 value (glTF / three.js transfer function). */
export function linearToSrgbByte(v) {
  const c = Math.min(1, Math.max(0, v));
  return Math.round((c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055) * 255);
}

/** Linear 0..1 value of a sRGB 0..255 channel. */
export function srgbByteToLinear(b) {
  const c = b / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
