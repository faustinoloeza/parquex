import { describe, expect, it } from 'vitest';
import { FADE, makeDesignArea } from '#shared/design-area.js';

// a square-ish profile: radius 100 towards +x, 200 towards +z, … (4 samples)
const area = makeDesignArea({ cx: 10, cz: -20, radii: [100, 200, 100, 200] });

describe('makeDesignArea', () => {
  it('interpolates the outline radius between samples and wraps around', () => {
    expect(area.radiusAt(0)).toBeCloseTo(100);
    expect(area.radiusAt(Math.PI / 4)).toBeCloseTo(150);
    expect(area.radiusAt(Math.PI / 2)).toBeCloseTo(200);
    expect(area.radiusAt(-Math.PI / 4)).toBeCloseTo(150);
    expect(area.radiusAt(2 * Math.PI)).toBeCloseTo(100);
  });

  it('measures the signed distance to the outline (negative inside)', () => {
    expect(area.signedDistance(10 + 60, -20)).toBeCloseTo(-40);
    expect(area.signedDistance(10, -20 + 250)).toBeCloseTo(50);
  });

  it('fades from the park (0) to the real map (1) across the band', () => {
    expect(area.fade(10, -20)).toBe(0);
    expect(area.fade(10 + 100 - FADE.inner - 1, -20)).toBe(0);
    expect(area.fade(10 + 100 + FADE.outer + 1, -20)).toBe(1);
    const mid = area.fade(10 + 100 - (FADE.inner - FADE.outer) / 2, -20);
    expect(mid).toBeGreaterThan(0.3);
    expect(mid).toBeLessThan(0.7);
  });

  it('tells whether a point is inside with a margin', () => {
    expect(area.contains(10 + 50, -20, 30)).toBe(true);
    expect(area.contains(10 + 80, -20, 30)).toBe(false);
  });

  it('classifies rectangles against the designed area', () => {
    expect(area.coversRect(0, -30, 20, -10)).toBe(true);
    expect(area.coversRect(0, -30, 200, -10)).toBe(false);
    expect(area.touchesRect(1000, 1000, 1100, 1100)).toBe(false);
    expect(area.touchesRect(90, -30, 400, -10)).toBe(true);
  });
});
