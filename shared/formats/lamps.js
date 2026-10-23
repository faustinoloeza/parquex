// lamps.bin / context-lamps.bin — street lamps of the night mode for the
// mobile export (layers/lamps.js → placeParkLamps, web "high" cap), written
// next to park-models.glb. Little endian:
//
//   char[4] "PQL1"
//   u32     count
//   u32     recordBytes (16)
//   count × 16-byte record:
//     f32 x, y, z   local meters of the park (context-lamps.bin: of the focused
//                   park); y = foot of the post (ground, or the pier deck)
//     u8  kind      LAMP_KIND: 0 ground (walkways, routes, plazas), 1 pier deck
//     u8  0, 0, 0   reserved
//
// Records keep the web's placement order: the quality caps (medium, low) keep
// an even subset of that order (shared/lamps.js → capLamps).

export const LAMPS_MAGIC = 'PQL1';
export const LAMP_RECORD_BYTES = 16;
export const LAMP_KIND = { ground: 0, pier: 1 };

/**
 * @typedef {{ x: number, y: number, z: number, kind: number }} LampRecord
 */

/**
 * @param {LampRecord[]} lamps
 * @returns {Uint8Array}
 */
export function encodeLamps(lamps) {
  const bytes = new Uint8Array(12 + lamps.length * LAMP_RECORD_BYTES);
  const view = new DataView(bytes.buffer);
  for (let i = 0; i < 4; i++) bytes[i] = LAMPS_MAGIC.charCodeAt(i);
  view.setUint32(4, lamps.length, true);
  view.setUint32(8, LAMP_RECORD_BYTES, true);
  lamps.forEach((l, i) => {
    const o = 12 + i * LAMP_RECORD_BYTES;
    view.setFloat32(o, l.x, true);
    view.setFloat32(o + 4, l.y, true);
    view.setFloat32(o + 8, l.z, true);
    view.setUint8(o + 12, l.kind ?? LAMP_KIND.ground);
  });
  return bytes;
}

/**
 * @param {ArrayBuffer | Uint8Array} data
 * @returns {LampRecord[]}
 */
export function decodeLamps(data) {
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const magic = String.fromCharCode(...bytes.subarray(0, 4));
  if (magic !== LAMPS_MAGIC) throw new Error(`lamps: bad magic "${magic}"`);
  const count = view.getUint32(4, true),
    stride = view.getUint32(8, true);
  if (stride < 13 || bytes.byteLength < 12 + count * stride) throw new Error('lamps: truncated');
  const out = [];
  for (let i = 0; i < count; i++) {
    const o = 12 + i * stride;
    out.push({
      x: view.getFloat32(o, true),
      y: view.getFloat32(o + 4, true),
      z: view.getFloat32(o + 8, true),
      kind: view.getUint8(o + 12),
    });
  }
  return out;
}
