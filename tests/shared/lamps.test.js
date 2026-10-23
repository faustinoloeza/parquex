// Street lamps of the night mode: spacing along lines, gaps between lamps, caps.
import { describe, expect, it } from 'vitest';
import { LAMP_LAYOUT, capLamps, placeLampsAlong, placeLampsOver } from '#shared/lamps.js';

const dist = ([ax, az], [bx, bz]) => Math.hypot(ax - bx, az - bz);
const minGap = (lamps) => {
  let best = Infinity;
  for (let i = 0; i < lamps.length; i++) for (let j = i + 1; j < lamps.length; j++) best = Math.min(best, dist(lamps[i], lamps[j]));
  return best;
};

describe('lamp placement', () => {
  it('spaces lamps evenly along a line, alternating sides', () => {
    const { spacing, offset } = LAMP_LAYOUT;
    const lamps = placeLampsAlong([
      [
        [0, 0],
        [100, 0],
        [180, 0],
      ],
    ]);
    expect(lamps.length).toBe(Math.round(180 / spacing));
    const step = 180 / lamps.length;
    lamps.forEach(([x, z], k) => {
      expect(x).toBeCloseTo((k + 0.5) * step, 6);
      expect(Math.abs(z)).toBeCloseTo(offset, 6);
      if (k) expect(Math.sign(z)).toBe(-Math.sign(lamps[k - 1][1]));
    });
    for (let k = 1; k < lamps.length; k++) {
      const gap = lamps[k][0] - lamps[k - 1][0];
      expect(gap).toBeGreaterThan(spacing * 0.75);
      expect(gap).toBeLessThan(spacing * 1.35);
    }
  });

  it('keeps the minimum gap where lines cross or run side by side, and skips refused spots', () => {
    const lines = [
      [
        [0, 0],
        [200, 0],
      ],
      [
        [0, 3],
        [200, 3],
      ], // a route over the same walkway
      [
        [100, -100],
        [100, 100],
      ], // a crossing
      [
        [300, 0],
        [303, 0],
      ], // too short
    ];
    const lamps = placeLampsAlong(lines, { accept: (x, z) => !(x > 140 && x < 160) });
    expect(minGap(lamps)).toBeGreaterThanOrEqual(LAMP_LAYOUT.minGap);
    expect(lamps.some(([x]) => x > 140 && x < 160 && x !== 100)).toBe(false);
    expect(lamps.some(([x]) => x > 290)).toBe(false);
    // the parallel line adds (almost) nothing
    const single = placeLampsAlong(lines.slice(0, 1));
    const both = placeLampsAlong(lines.slice(0, 2));
    expect(both.length - single.length).toBeLessThanOrEqual(1);
  });

  it('fills paved areas around the lamps already placed', () => {
    const along = placeLampsAlong([
      [
        [0, 50],
        [100, 50],
      ],
    ]);
    const plaza = (x, z) => (x >= 0 && x <= 100 && z >= 0 && z <= 100 ? 1 : 0);
    const lamps = placeLampsOver(along, plaza, [-50, -50, 150, 150]);
    expect(lamps.slice(0, along.length)).toEqual(along);
    expect(lamps.length).toBeGreaterThan(along.length + 10);
    expect(minGap(lamps)).toBeGreaterThanOrEqual(LAMP_LAYOUT.minGap);
    for (const [x, z] of lamps) expect(plaza(x, z)).toBe(1);
  });

  it('caps the count with an evenly spread subset', () => {
    const lamps = Array.from({ length: 1000 }, (_, i) => [i, 0]);
    expect(capLamps(lamps, 2000)).toBe(lamps);
    const kept = capLamps(lamps, 250);
    expect(kept.length).toBe(250);
    for (let k = 1; k < kept.length; k++) expect(kept[k][0] - kept[k - 1][0]).toBe(4);
  });
});
