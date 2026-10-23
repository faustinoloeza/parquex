import { describe, expect, it } from 'vitest';
import { makeGroundHoles, surfaceSampler } from '#shared/ground-holes.js';
import { makeDesignArea } from '#shared/design-area.js';
import { chunkGeometry } from '../../src/layers/terrain.js';

const square = (x0, z0, x1, z1) => [
  [x0, z0],
  [x1, z0],
  [x1, z1],
  [x0, z1],
];
// a moat: 20 m square with a 10 m island in the middle (even-odd), bridged at 3 m
const moat = { rings: [square(0, 0, 20, 20), square(5, 5, 15, 15)], cover: 3, base: { x: 10, z: 10, y: 1 } };
const holes = makeGroundHoles([moat]);

describe('makeGroundHoles', () => {
  it('fills rings with the even-odd rule', () => {
    expect(holes.contains(2, 2)).toBe(true);
    expect(holes.contains(10, 10)).toBe(false); // the island
    expect(holes.contains(25, 10)).toBe(false);
    expect(holes.at(2, 18)).toBe(moat);
  });

  it('classifies rectangles as outside, inside or across an edge', () => {
    expect(holes.classify(30, 30, 32, 32)).toBe(0);
    expect(holes.classify(1, 1, 3, 3)).toBe(1);
    expect(holes.classify(8, 8, 12, 12)).toBe(0);
    expect(holes.classify(-1, 8, 1, 10)).toBe(2);
    expect(holes.classify(4, 8, 6, 9)).toBe(2);
  });

  it('tells points near an edge', () => {
    expect(holes.near(21, 10, 1.5)).toBe(true);
    expect(holes.near(23, 10, 1.5)).toBe(false);
    expect(holes.near(10, 10, 1)).toBe(false);
  });

  it('puts what crosses a hole on its bridge', () => {
    const surface = surfaceSampler(() => 0.5, holes);
    expect(surface(2, 2)).toBe(4); // base 1 + cover 3
    expect(surface(10, 10)).toBe(0.5);
    expect(makeGroundHoles([]).empty).toBe(true);
    expect(surfaceSampler(() => 0.5, makeGroundHoles([]))(2, 2)).toBe(0.5);
  });
});

describe('chunkGeometry with ground holes', () => {
  const area = makeDesignArea({ cx: 0, cz: 0, radii: Array(8).fill(1000) });
  const heightAt = (x, z) => 0.1 * x + 0.05 * z;
  const groundArea = (g) => {
    const pos = g.getAttribute('position'),
      index = g.getIndex();
    let a = 0;
    for (let i = 0; i < index.count; i += 3) {
      const [p, q, r] = [0, 1, 2].map((k) => index.getX(i + k));
      const ux = pos.getX(q) - pos.getX(p),
        uz = pos.getZ(q) - pos.getZ(p),
        vx = pos.getX(r) - pos.getX(p),
        vz = pos.getZ(r) - pos.getZ(p);
      a += Math.abs(ux * vz - uz * vx) / 2;
    }
    return a;
  };

  it('leaves out the hole (to the carving size) and keeps the ground plane', () => {
    const full = chunkGeometry([-10, -10, 30, 30], heightAt, area, 16);
    const cut = chunkGeometry([-10, -10, 30, 30], heightAt, area, 16, holes);
    expect(groundArea(full)).toBeCloseTo(1600, 3);
    // the moat is 400 − 100 = 300 m²; squares of ≤ 0.35 m along 120 m of edges
    expect(groundArea(full) - groundArea(cut)).toBeGreaterThan(300 - 25);
    expect(groundArea(full) - groundArea(cut)).toBeLessThan(300 + 25);
    // vertices on the ground plane, none deeper in the moat than one carving square
    const depthInMoat = (x, z) => {
      if (!holes.contains(x, z)) return 0;
      const toIsland = Math.max(Math.abs(x - 10), Math.abs(z - 10)) - 5;
      return Math.min(x, 20 - x, z, 20 - z, toIsland);
    };
    const pos = cut.getAttribute('position');
    for (let i = 0; i < pos.count; i++) {
      expect(pos.getY(i)).toBeCloseTo(heightAt(pos.getX(i), pos.getZ(i)), 5);
      expect(depthInMoat(pos.getX(i), pos.getZ(i))).toBeLessThanOrEqual(0.35);
    }
  });
});
