import { describe, expect, it } from 'vitest';
import {
  distanceAlong,
  freeSpot,
  nearestOnLines,
  placeBeside,
  pointAlong,
  revealOrder,
  ringPoints,
  spansAcross,
} from '../../shared/decorations.js';
import { minstd } from '../../shared/random.js';

describe('seasonal decoration placement', () => {
  it('spaces points evenly around a circle', () => {
    const pts = ringPoints(10, -5, 3, 1);
    expect(pts).toHaveLength(Math.round(2 * Math.PI * 3));
    for (const [x, z] of pts) expect(Math.hypot(x - 10, z + 5)).toBeCloseTo(3);
    expect(ringPoints(0, 0, 0.1, 1)).toHaveLength(3);
  });

  it('finds the nearest point of polylines', () => {
    const near = nearestOnLines(5, 4, [
      [
        [0, 0],
        [10, 0],
      ],
    ]);
    expect(near).toEqual({ x: 5, z: 0, d: 4 });
  });

  it('puts a piece off the path, within reach and facing it', () => {
    const path = [
      [
        [-50, 0],
        [50, 0],
      ],
    ];
    const accept = (x) => x < 20; // e.g. a building east of x = 20
    const spot = freeSpot(25, 0, { lines: path, accept, clearance: 3, reach: 10 });
    expect(spot.x).toBeLessThan(20);
    const d = Math.abs(spot.z);
    expect(d).toBeGreaterThanOrEqual(3);
    expect(d).toBeLessThanOrEqual(10);
    // +z of the piece points at the path
    expect(Math.cos(spot.rotation) * -Math.sign(spot.z)).toBeCloseTo(1);
    expect(freeSpot(0, 0, { lines: path, accept: () => false })).toBeNull();
  });

  it('hangs strings across the paths only near the spots', () => {
    const path = [
      [
        [0, 0],
        [100, 0],
      ],
    ];
    const spans = spansAcross(path, { spots: [[20, 0]], radius: 12, spacing: 6, width: 8 });
    // centers at 3, 9, 15, … every 6 m along the line, kept within 12 m of x = 20
    expect(spans.map(([[x0]]) => x0)).toEqual([9, 15, 21, 27]);
    for (const [[x0, z0], [x1, z1]] of spans) {
      expect(x0).toBe(x1);
      expect(Math.abs(z1 - z0)).toBeCloseTo(8);
    }
  });

  it('reveals instances in a seeded shuffle of every index', () => {
    const order = revealOrder(50, minstd(7));
    expect([...order].sort((a, b) => a - b)).toEqual(Array.from({ length: 50 }, (_, i) => i));
    expect(revealOrder(50, minstd(7))).toEqual(order);
  });
});

describe('altars beside a stretch of path', () => {
  const line = [
    [0, 0],
    [100, 0],
  ];

  it('walks along a polyline', () => {
    expect(pointAlong(line, 25)).toEqual({ x: 25, z: 0, ux: 1, uz: 0 });
    expect(distanceAlong(line, 40, -7)).toEqual({ s: 40, d: 7 });
  });

  it('places spots on both sides, off the path, facing it, only in the stretch', () => {
    const spots = placeBeside(line, { from: 60, to: 20, spacing: 10, offsets: [6, 12], accept: () => true });
    expect(spots.map((s) => s.s)).toEqual([25, 25, 35, 35, 45, 45, 55, 55]);
    for (const s of spots) {
      expect(Math.abs(s.z)).toBe(6);
      // +z of the piece points back at the line
      expect(Math.cos(s.rotation) * Math.sign(s.z)).toBeCloseTo(-1);
    }
  });

  it('moves out past what accept refuses and keeps the spots apart', () => {
    // a row of trees 6–8 m north of the path
    const accept = (x, z) => !(z < -5 && z > -9);
    const spots = placeBeside(line, { from: 0, to: 30, spacing: 4, offsets: [6, 12], minGap: 9, accept });
    const north = spots.filter((s) => s.z < 0);
    expect(north.every((s) => s.z <= -9)).toBe(true);
    for (const a of spots) for (const b of spots) if (a !== b) expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeGreaterThanOrEqual(9);
  });
});
