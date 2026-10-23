import { describe, expect, it } from 'vitest';
import { makeRouter } from '../../pipeline/lib/route-snapping.js';
import { buildWalkwayNetwork, componentSizes, splitAtJunctions } from '../../pipeline/lib/walkway-network.js';
import { walkwaySegments } from '../../shared/walkways.js';

const keyOf = ([x, z]) => `${x},${z}`;

describe('splitAtJunctions / componentSizes', () => {
  it('cuts lines at shared vertices and counts components by exact coordinates', () => {
    const lines = [
      [
        [0, 0],
        [5, 0],
        [10, 0],
      ],
      [
        [5, 0],
        [5, 5],
      ],
      [
        [20, 20],
        [30, 20],
      ],
    ];
    const edges = splitAtJunctions(lines);
    expect(edges).toHaveLength(4);
    expect(componentSizes(lines)).toEqual([4, 2]);
  });
});

describe('buildWalkwayNetwork', () => {
  // 100 × 60 m raster at 1 px/m: a walkway band 4 m wide along z = 30 (z 28..32)
  const N = 100;
  const walk = new Uint8Array(N * N),
    center = new Float32Array(N * N),
    blocked = new Uint8Array(N * N);
  for (let v = 0; v < N; v++)
    for (let u = 0; u < N; u++) {
      const i = v * N + u;
      walk[i] = v >= 28 && v < 32 ? 1 : 0;
      center[i] = walk[i] ? Math.min(v - 27, 32 - v) : 0;
    }
  const router = makeRouter({ N, pxPerM: 1, toPx: (x, z) => [x, z], toLocal: (u, v) => [u, v], walk, center, blocked, centerWeight: 1 });

  it('moves OSM lines onto the walkway and keeps junctions shared', () => {
    // OSM: the walkway 8 m north of where it is, plus a spur from its middle
    const ways = [
      [
        [10, 22],
        [50, 22],
        [90, 22],
      ],
      [
        [50, 22],
        [50, 99],
      ],
    ];
    const { lines, trails } = buildWalkwayNetwork(ways, { router, inside: () => true, overWater: () => false });
    const main = lines.filter((l) => l.every(([, z]) => z < 40));
    expect(main.length).toBeGreaterThan(0);
    for (const l of main) for (const [, z] of l) expect(Math.abs(z - 30)).toBeLessThan(2.5);
    // every line end is shared with another line or is a dead end of the network
    expect(componentSizes(lines)).toHaveLength(1);
    // the spur runs where there is no walkway: kept as a trail to paint
    expect(trails.length).toBeGreaterThan(0);
    const ends = lines.flatMap((l) => [keyOf(l[0]), keyOf(l[l.length - 1])]);
    expect(ends.filter((k) => ends.indexOf(k) !== ends.lastIndexOf(k)).length).toBeGreaterThan(0);
  });

  it('drops stretches over open water', () => {
    const ways = [
      [
        [10, 22],
        [90, 22],
      ],
    ];
    const { lines } = buildWalkwayNetwork(ways, { router, inside: () => true, overWater: (x) => x > 40 && x < 60 });
    for (const l of lines) for (const [x] of l) expect(x <= 41 || x >= 59).toBe(true);
  });
});

describe('walkwaySegments', () => {
  it('hides walkway stretches that run along an official route', () => {
    const walkways = [
      [
        [0, 0],
        [100, 0],
      ],
    ];
    const routes = [
      {
        lines: [
          [
            [0, 1],
            [40, 1],
          ],
        ],
      },
    ];
    const segs = walkwaySegments(walkways, routes);
    const xs = [];
    for (let i = 0; i < segs.length; i += 4) xs.push((segs[i] + segs[i + 2]) / 2);
    expect(Math.min(...xs)).toBeGreaterThan(40);
    expect(walkwaySegments(walkways, []).length / 4).toBe(25);
  });
});
