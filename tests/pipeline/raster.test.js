import { describe, expect, it } from 'vitest';
import { blur, components, forEachInDisc, orientedBox, pointInPolygon, polygonArea, rasterizePolygon } from '../../pipeline/lib/raster.js';

describe('blur', () => {
  it('keeps a constant image constant', () => {
    const out = blur(new Float32Array(25).fill(3), 5, 5, 1);
    for (const v of out) expect(v).toBeCloseTo(3, 5);
  });

  it('spreads a single bright pixel', () => {
    const src = new Float32Array(49);
    src[24] = 1;
    const out = blur(src, 7, 7, 1, 1);
    expect(out[24]).toBeLessThan(1);
    expect(out[23]).toBeGreaterThan(0);
  });
});

describe('components', () => {
  it('labels 4-connected regions', () => {
    // 1 1 0
    // 0 0 0
    // 0 1 1
    const img = [1, 1, 0, 0, 0, 0, 0, 1, 1];
    const { comps, label } = components(9, 3, 3, (i) => img[i] === 1);
    expect(comps).toHaveLength(2);
    expect(label[0]).toBe(label[1]);
    expect(label[7]).not.toBe(label[0]);
  });
});

describe('polygons', () => {
  const square = [
    [0, 0],
    [4, 0],
    [4, 4],
    [0, 4],
  ];

  it('computes the signed area', () => {
    expect(Math.abs(polygonArea(square))).toBe(16);
  });

  it('tests points inside', () => {
    expect(pointInPolygon(2, 2, square)).toBe(true);
    expect(pointInPolygon(5, 2, square)).toBe(false);
  });

  it('rasterizes every covered pixel once', () => {
    const seen = new Set();
    rasterizePolygon(square, 10, 10, (i) => {
      expect(seen.has(i)).toBe(false);
      seen.add(i);
    });
    expect(seen.size).toBe(20); // rows 0..3 (top edge in, bottom edge out) × columns 0..4
  });

  it('finds the oriented box of a rotated rectangle', () => {
    const a = Math.PI / 6,
      c = Math.cos(a),
      s = Math.sin(a);
    const pts = [];
    for (let u = -10; u <= 10; u++) for (let v = -2; v <= 2; v++) pts.push([5 + u * c - v * s, 7 + u * s + v * c]);
    const box = orientedBox(pts);
    expect(box.length).toBeCloseTo(20, 5);
    expect(box.width).toBeCloseTo(4, 5);
    expect(box.cx).toBeCloseTo(5, 5);
    expect(box.cy).toBeCloseTo(7, 5);
  });
});

describe('forEachInDisc', () => {
  it('visits every offset within the radius', () => {
    const offsets = [];
    forEachInDisc(1, (du, dv) => offsets.push([du, dv]));
    expect(offsets).toHaveLength(5); // center + 4 neighbors
  });
});
