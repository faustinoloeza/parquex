import { describe, expect, it } from 'vitest';
import { densify, joinPieces, offsetShared, simplify } from '../../pipeline/lib/route-snapping.js';

describe('route snapping helpers', () => {
  it('densify adds points no farther than the step', () => {
    const pts = densify(
      [
        [0, 0],
        [10, 0],
      ],
      1,
    );
    expect(pts.length).toBeGreaterThanOrEqual(11);
    for (let i = 1; i < pts.length; i++)
      expect(Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])).toBeLessThanOrEqual(1 + 1e-9);
  });

  it('simplify drops collinear points', () => {
    const line = [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [3, 3],
    ];
    expect(simplify(line, 0.1)).toEqual([
      [0, 0],
      [3, 0],
      [3, 3],
    ]);
  });

  it('joinPieces merges pieces whose ends touch', () => {
    const lines = joinPieces(
      [
        [
          [0, 0],
          [10, 0],
        ],
        [
          [11, 0],
          [20, 0],
        ],
      ],
      { bridge: 0 },
    );
    expect(lines).toHaveLength(1);
    expect(lines[0][0]).toEqual([0, 0]);
    expect(lines[0].at(-1)).toEqual([20, 0]);
  });

  it('joinPieces bridges a T junction straight ahead', () => {
    const stem = [
      [0, 20],
      [0, 6],
    ];
    const bar = [
      [-30, 0],
      [30, 0],
    ];
    const lines = joinPieces([stem, bar], { bridge: 10 });
    const bridges = lines.filter((l) => l.length === 2 && l[0] === stem[1]);
    expect(bridges).toHaveLength(1);
    expect(bridges[0][1][0]).toBeCloseTo(0, 0); // lands right below the stem
  });

  it('offsetShared separates two routes on the same walkway', () => {
    const line = [
      [0, 0],
      [40, 0],
    ];
    const [a, b] = offsetShared([{ lines: [line] }, { lines: [line.slice().reverse()] }]);
    const mid = (l) => l.find((p) => Math.abs(p[0] - 20) < 2) ?? l[Math.floor(l.length / 2)];
    expect(Math.abs(mid(a.lines[0])[1] - mid(b.lines[0])[1])).toBeGreaterThan(1);
  });
});
