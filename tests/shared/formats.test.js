import { describe, expect, it } from 'vitest';
import { decodeVegetation, encodeVegetation, TREE, TREE_STRIDE } from '#shared/formats/vegetation.js';
import { decodeHeights, encodeHeights } from '#shared/formats/heightmap.js';
import { expandBusRows } from '#shared/vehicles.js';
import { minstd, mulberry32 } from '#shared/random.js';
import { LAMP_KIND, LAMP_RECORD_BYTES, decodeLamps, encodeLamps } from '#shared/formats/lamps.js';

describe('vegetation.bin', () => {
  it('stores 10 bytes per tree and round-trips within its precision', () => {
    const trees = [12.34, 1.5, -98.76, 1.2, 1.0, TREE.PALM, -400, 0, 400, 0.5, 6.0, TREE.CEIBA];
    const bytes = encodeVegetation(trees);
    expect(bytes.byteLength).toBe(20);
    const back = decodeVegetation(bytes.buffer);
    expect(back.length).toBe(2 * TREE_STRIDE);
    for (let i = 0; i < trees.length; i++) {
      const tolerance = i % TREE_STRIDE === 4 ? 0.02 : 0.05; // rotation is quantized to 1/255 turn
      expect(Math.abs(back[i] - trees[i])).toBeLessThan(tolerance);
    }
  });
});

describe('height.bin', () => {
  it('round-trips heights to the centimeter', () => {
    const grid = 4;
    const bytes = encodeHeights((i, j) => i * 1.234 - j * 0.5, grid);
    const back = decodeHeights(bytes.buffer);
    expect(back.length).toBe(grid * grid);
    expect(back[2 * grid + 3]).toBeCloseTo(3 * 1.234 - 1, 2);
  });
});

describe('expandBusRows', () => {
  it('spreads buses evenly between both ends of a row', () => {
    const buses = expandBusRows([{ from: [0, 0], to: [10, 20], count: 3, heading: 1, colors: ['a', 'b'] }]);
    expect(buses.map((b) => [b.x, b.z, b.color])).toEqual([
      [0, 0, 'a'],
      [5, 10, 'b'],
      [10, 20, 'a'],
    ]);
  });
});

describe('random', () => {
  it('is deterministic for a seed', () => {
    const a = mulberry32(7),
      b = mulberry32(7);
    for (let i = 0; i < 5; i++) expect(a()).toBe(b());
    const c = minstd(7),
      d = minstd(7);
    for (let i = 0; i < 5; i++) expect(c()).toBe(d());
  });

  it('returns values in [0, 1)', () => {
    const r = mulberry32(1);
    for (let i = 0; i < 1000; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});

describe('lamps.bin', () => {
  it('writes "PQL1", the count, the record size and 16-byte records that round-trip', () => {
    const lamps = [
      { x: 12.5, y: 1.25, z: -40.75, kind: LAMP_KIND.ground },
      { x: -300.125, y: 1.07, z: 8, kind: LAMP_KIND.pier },
    ];
    const bytes = encodeLamps(lamps);
    expect(bytes.byteLength).toBe(12 + 2 * LAMP_RECORD_BYTES);
    expect(String.fromCharCode(...bytes.subarray(0, 4))).toBe('PQL1');
    const view = new DataView(bytes.buffer);
    expect(view.getUint32(4, true)).toBe(2);
    expect(view.getUint32(8, true)).toBe(16);
    const back = decodeLamps(bytes);
    back.forEach((l, i) => {
      expect(l.x).toBeCloseTo(lamps[i].x, 4);
      expect(l.y).toBeCloseTo(lamps[i].y, 4);
      expect(l.z).toBeCloseTo(lamps[i].z, 4);
      expect(l.kind).toBe(lamps[i].kind);
    });
  });

  it('rejects other files and truncated ones', () => {
    expect(() => decodeLamps(new Uint8Array(12))).toThrow(/magic/);
    expect(() => decodeLamps(encodeLamps([{ x: 0, y: 0, z: 0 }]).subarray(0, 20))).toThrow(/truncated/);
  });
});
