import { describe, expect, it } from 'vitest';
import { resolveSite } from '../../pipeline/site.js';
import { pointInPolygon } from '../../pipeline/lib/raster.js';

const park = (edits) => ({ landmarks: [], vehicles: [], edits });
const inside = (polygons, x, z) => polygons.some((poly) => pointInPolygon(x, z, poly));

describe('resolveSite ground edits', () => {
  it('turns water lines into strips `width` meters wide, relative to `at`', () => {
    const [edit] = resolveSite(
      park([
        {
          kind: 'water',
          at: [100, 50],
          width: 10,
          lines: [
            [
              [0, 0],
              [40, 0],
              [40, 30],
            ],
          ],
        },
      ]),
    ).groundEdits;
    expect(edit.kind).toBe('water');
    expect(inside(edit.polygons, 120, 50)).toBe(true); // on the first segment
    expect(inside(edit.polygons, 120, 54)).toBe(true); // within half the width
    expect(inside(edit.polygons, 120, 56)).toBe(false);
    expect(inside(edit.polygons, 140, 50)).toBe(true); // the joint
    expect(inside(edit.polygons, 143, 65)).toBe(true); // second segment
    expect(inside(edit.polygons, 120, 70)).toBe(false);
  });

  it('keeps polygons and order of pave / plant / water edits', () => {
    const square = [
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 1],
    ];
    const edits = resolveSite(
      park([
        { kind: 'pave', at: [0, 0], polygons: [square] },
        { kind: 'water', at: [5, 5], cover: 'river', polygons: [square] },
        { kind: 'plant', at: [0, 0], cover: 'lawn', polygons: [square] },
      ]),
    ).groundEdits;
    expect(edits.map((e) => e.kind)).toEqual(['pave', 'water', 'plant']);
    expect(edits[1].cover).toBe('river');
    expect(edits[1].polygons[0][2]).toEqual([6, 6]);
  });

  it('passes the pave surface on and rejects unknown ones', () => {
    const square = [
      [0, 0],
      [1, 0],
      [1, 1],
    ];
    const [dirt, stone] = resolveSite(
      park([
        { kind: 'pave', surface: 'dirt', at: [0, 0], polygons: [square] },
        { kind: 'pave', at: [0, 0], polygons: [square] },
      ]),
    ).groundEdits;
    expect(dirt.surface).toBe('dirt');
    expect(stone.surface).toBeUndefined();
    expect(() => resolveSite(park([{ kind: 'pave', surface: 'gravel', at: [0, 0], polygons: [square] }]))).toThrow(/surface/);
    expect(() => resolveSite(park([{ kind: 'plant', surface: 'dirt', at: [0, 0], polygons: [square] }]))).toThrow(/pave only/);
  });
});
