import { describe, expect, it } from 'vitest';
import {
  decodeInstances,
  encodeInstances,
  instanceMatrix,
  INSTANCE_RECORD_BYTES,
  linearToSrgbByte,
  srgbByteToLinear,
} from '#shared/formats/instances.js';

const tree = { x: 12.5, y: -0.15, z: -300.25, rotY: 1.25, scale: 1.1, scaleY: 1.3, r: 255, g: 240, b: 200 };
const bus = { x: -198, y: 0.3, z: -166, rotY: -0.925, scale: 1, scaleY: 1, r: 232, g: 96, b: 143 };

describe('instances.bin', () => {
  it('writes the header, names and 28-byte records', () => {
    const bytes = encodeInstances([
      { name: 'tree-palm', records: [tree, tree] },
      { name: 'bus', records: [bus] },
    ]);
    expect(INSTANCE_RECORD_BYTES).toBe(28);
    expect(String.fromCharCode(...bytes.subarray(0, 4))).toBe('PQI1');
    const view = new DataView(bytes.buffer);
    expect(view.getUint32(4, true)).toBe(2);
    expect(view.getUint16(8, true)).toBe(9);
    expect(new TextDecoder().decode(bytes.subarray(10, 19))).toBe('tree-palm');
    expect(view.getUint32(19, true)).toBe(2);
    expect(view.getFloat32(23, true)).toBe(12.5);
    expect(bytes[23 + 27]).toBe(0); // reserved
    expect(bytes.byteLength).toBe(8 + (2 + 9 + 4 + 2 * 28) + (2 + 3 + 4 + 28));
  });

  it('round-trips records (float32 precision)', () => {
    const [palms, buses] = decodeInstances(
      encodeInstances([
        { name: 'tree-palm', records: [tree] },
        { name: 'bus', records: [bus] },
      ]),
    );
    expect(palms.name).toBe('tree-palm');
    expect(buses.name).toBe('bus');
    for (const [a, b] of [
      [palms.records[0], tree],
      [buses.records[0], bus],
    ])
      for (const k of Object.keys(b)) expect(a[k]).toBeCloseTo(b[k], 4);
  });

  it('rejects other files and truncated ones', () => {
    expect(() => decodeInstances(new Uint8Array(8))).toThrow();
    const bytes = encodeInstances([{ name: 'bus', records: [bus] }]);
    expect(() => decodeInstances(bytes.subarray(0, bytes.length - 1))).toThrow();
  });

  it('builds T · R_y · S matrices', () => {
    const m = instanceMatrix({ x: 1, y: 2, z: 3, rotY: Math.PI / 2, scale: 2, scaleY: 3 });
    // (1, 1, 0) local → scaled (2, 3, 0) → rotated +90° around y: x → −z → translated
    const p = [m[0] + m[4] + m[12], m[1] + m[5] + m[13], m[2] + m[6] + m[14]];
    expect(p[0]).toBeCloseTo(1);
    expect(p[1]).toBeCloseTo(5);
    expect(p[2]).toBeCloseTo(1);
  });

  it('converts tints between linear and sRGB bytes', () => {
    for (const b of [0, 1, 37, 128, 254, 255]) expect(linearToSrgbByte(srgbByteToLinear(b))).toBe(b);
    expect(linearToSrgbByte(1.5)).toBe(255);
  });
});
