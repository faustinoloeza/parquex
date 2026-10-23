import { describe, expect, it } from 'vitest';
import { lngLatToTile, tileBounds, tileToLat, tileToLng } from '#shared/web-mercator.js';

describe('web mercator tiles', () => {
  it('maps the world corners', () => {
    expect(tileToLng(0, 0)).toBe(-180);
    expect(tileToLng(1, 0)).toBe(180);
    expect(tileToLat(0, 0)).toBeCloseTo(85.0511, 3);
    expect(tileToLat(1, 1)).toBeCloseTo(0, 9);
  });

  it('finds the tile that contains a point', () => {
    const lat = 20.5806,
      lng = -87.11995;
    for (const z of [8, 13, 16, 19]) {
      const [x, y] = lngLatToTile(lng, lat, z).map(Math.floor);
      const [n, w, s, e] = tileBounds(x, y, z);
      expect(lng).toBeGreaterThanOrEqual(w);
      expect(lng).toBeLessThan(e);
      expect(lat).toBeLessThanOrEqual(n);
      expect(lat).toBeGreaterThan(s);
    }
  });

  it('round-trips tile edges', () => {
    const [x, y] = lngLatToTile(tileToLng(1234, 12), tileToLat(1700, 12), 12);
    expect(x).toBeCloseTo(1234, 6);
    expect(y).toBeCloseTo(1700, 6);
  });
});
