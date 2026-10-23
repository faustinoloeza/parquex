import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FADE, makeDesignArea } from '#shared/design-area.js';
import { TREE, TREE_STRIDE } from '#shared/formats/vegetation.js';
import {
  BASEMAP_YIELD,
  NEIGHBOR_TREE_TYPES,
  TREE_YIELD,
  clipTransparent,
  contextGroundGrid,
  neighborLayers,
  neighborPlacement,
  outlinePolyline,
  pickNeighborTrees,
  regionWaterFactor,
  seaEdge,
} from '#shared/neighbor-context.js';

const parkJson = (key) => ({ ...JSON.parse(fs.readFileSync(`public/parks/${key}/park.json`, 'utf8')), key });
const ALL = ['xc', 'xh', 'xp', 'xs', 'xo', 'xcr'].map(parkJson);
const layersOf = (key) =>
  neighborLayers(
    ALL.find((p) => p.key === key),
    ALL.filter((p) => p.key !== key),
  );

describe('neighborLayers (real parks)', () => {
  it('xc, xp and xs see the two other parks first and the region last; xh and xo none', () => {
    for (const key of ['xc', 'xp', 'xs']) {
      const keys = layersOf(key).map((n) => n.key);
      expect(keys).toHaveLength(3);
      expect(keys.at(-1)).toBe('xcr');
      expect(new Set(keys)).toEqual(new Set(['xc', 'xp', 'xs', 'xcr'].filter((k) => k !== key)));
    }
    expect(layersOf('xh')).toEqual([]);
    expect(layersOf('xo')).toEqual([]);
  });

  it('ground opacity is 0 inside the focused park and 1 deep inside a neighbor clear of other parks', () => {
    for (const key of ['xc', 'xp', 'xs']) {
      const focus = makeDesignArea(ALL.find((p) => p.key === key).clear);
      const layers = layersOf(key);
      for (const n of layers) {
        // its own center (own frame) is inside it; parks: clear of the focused park
        const [wx, wz] = n.offset.toWorld(n.own.cx, n.own.cz);
        if (!n.region && n.yieldTo.every((a) => a.signedDistance(wx, wz) > FADE.outer))
          expect(n.opacity.ground(n.own.cx, n.own.cz)).toBe(1);
        // focused park center, in the neighbor's frame
        const [lx, lz] = n.offset.toLocal(focus.cx, focus.cz);
        expect(n.opacity.ground(lx, lz)).toBe(0);
        expect(n.opacity.cull(lx, lz)).toBe(0);
        expect(n.opacity.water(lx, lz)).toBe(0);
      }
    }
  });

  it('a park yields to the parks ranked before it; the region ground only to the focused park', () => {
    const [first, second, region] = layersOf('xc');
    expect(second.yieldTo).toHaveLength(2); // focused park + first
    expect(second.yieldTo[1]).toBe(first.area);
    expect(region.region).toBe(true);
    // a point deep inside the first neighbor: the second neighbor and the region cull it, but the region's ground
    // alpha stays 1 there (the parks are blended over it)
    const [rx, rz] = region.offset.toLocal(first.area.cx, first.area.cz);
    expect(region.opacity.cull(rx, rz)).toBe(0);
    expect(region.opacity.ground(rx, rz)).toBe(1);
    expect(region.opacity.water(rx, rz)).toBe(0);
  });
});

describe('region water', () => {
  const own = makeDesignArea({ cx: 0, cz: 0, radii: Array(72).fill(1000) });
  it('is the map sea right at the outline on the open sea, never on pools or deep inside', () => {
    expect(seaEdge(own, 990, 0, 0)).toBeCloseTo(1, 5);
    expect(seaEdge(own, 990, 0, 0.3)).toBe(0); // pool / lagoon
    expect(seaEdge(own, 500, 0, 0)).toBe(0); // 500 m inside
  });
  it('keeps full opacity on the sea edge, the own fade elsewhere, times the yield', () => {
    expect(regionWaterFactor(1, 1, 1)).toBe(1);
    expect(regionWaterFactor(1, 0.4, 0)).toBeCloseTo(0.6);
    expect(regionWaterFactor(0.5, 1, 1)).toBe(0.5);
    expect(regionWaterFactor(0, 0, 1)).toBe(0);
  });
});

describe('clipTransparent', () => {
  it('drops triangles whose three vertices are transparent and compacts the vertices', () => {
    const alpha = [0, 0, 0, 1, 0];
    const { index, vertices } = clipTransparent([0, 1, 2, 1, 2, 3, 2, 4, 0], alpha);
    expect(vertices).toEqual([1, 2, 3]);
    expect(index).toEqual([0, 1, 2]);
  });
  it('counts alpha below half an 8-bit step as 0', () => {
    expect(clipTransparent([0, 1, 2], [0.001, 0, 0]).index).toEqual([]);
    expect(clipTransparent([0, 1, 2], [0.01, 0, 0]).index).toHaveLength(3);
  });
});

describe('contextGroundGrid', () => {
  const extent = { cx: 0, cz: 0, size: 1200 };
  const own = makeDesignArea({ cx: 0, cz: 0, radii: Array(72).fill(400) });
  const alpha = (x, z) => 1 - own.fade(x, z);
  const grid = contextGroundGrid(extent, own, alpha, alpha);

  it('splits only the cells of the fade band', () => {
    expect(grid.cell).toBeCloseTo(12, 5);
    expect(grid.step).toBeCloseTo(6, 5);
    expect(grid.fine).toBeGreaterThan(0);
    expect(grid.fine).toBeLessThan(grid.cells / 3);
  });

  it('is watertight: every interior edge is shared by exactly two triangles (no T-junction cracks)', () => {
    const edges = new Map();
    for (let t = 0; t < grid.index.length; t += 3)
      for (let e = 0; e < 3; e++) {
        const a = grid.index[t + e],
          b = grid.index[t + ((e + 1) % 3)];
        const key = a < b ? `${a},${b}` : `${b},${a}`;
        edges.set(key, (edges.get(key) ?? 0) + 1);
      }
    expect(Math.max(...edges.values())).toBe(2);
    // a T-junction leaves a vertex in the middle of an edge used once on one side
    const point = (v) => [grid.points[v * 2], grid.points[v * 2 + 1]];
    const boundary = [...edges].filter(([, c]) => c === 1).map(([k]) => k.split(',').map(Number));
    const pts = new Set(boundary.flat());
    for (const [a, b] of boundary) {
      const [ax, az] = point(a),
        [bx, bz] = point(b);
      for (const v of pts) {
        if (v === a || v === b) continue;
        const [px, pz] = point(v);
        const cross = (bx - ax) * (pz - az) - (bz - az) * (px - ax);
        const dot = (px - ax) * (bx - ax) + (pz - az) * (bz - az);
        const inside = cross === 0 && dot > 0 && dot < (bx - ax) ** 2 + (bz - az) ** 2;
        expect(inside).toBe(false);
      }
    }
  });

  it('winds every triangle like groundGrid: normal (b − a) × (c − a) pointing +y', () => {
    for (let t = 0; t < grid.index.length; t += 3) {
      const [a, b, c] = [0, 1, 2].map((k) => grid.index[t + k]);
      const [ax, az] = [grid.points[a * 2], grid.points[a * 2 + 1]];
      const [bx, bz] = [grid.points[b * 2], grid.points[b * 2 + 1]];
      const [cx, cz] = [grid.points[c * 2], grid.points[c * 2 + 1]];
      // y component of the cross product = (bz − az)(cx − ax) − (bx − ax)(cz − az)
      expect((bz - az) * (cx - ax) - (bx - ax) * (cz - az)).toBeGreaterThan(0);
    }
  });

  it('covers nothing beyond the outline band', () => {
    for (let v = 0; v < grid.points.length / 2; v++) {
      const x = grid.x0 + grid.points[v * 2] * grid.step,
        z = grid.z0 + grid.points[v * 2 + 1] * grid.step;
      expect(own.signedDistance(x, z)).toBeLessThan(FADE.outer + grid.cell * 3);
    }
  });
});

describe('pickNeighborTrees', () => {
  // 3000 trees in a row, x = 0 … 2999, cycling through every type
  const data = new Float32Array(3000 * TREE_STRIDE);
  for (let i = 0; i < 3000; i++) data.set([i, 0, 0, 1, 0, i % 5], i * TREE_STRIDE);
  const offset = { toWorld: (x, z) => [x, z] };
  const yieldTo = [makeDesignArea({ cx: 0, cz: 0, radii: Array(72).fill(500) })];

  it('parks: one in stride, no bushes, none deeper than TREE_YIELD inside an area it yields to', () => {
    const { indices, stride } = pickNeighborTrees(data, { treeStride: 3, maxTrees: 4000 }, false, offset, yieldTo);
    expect(stride).toBe(3);
    for (const i of indices) {
      expect(i % 3).toBe(0);
      expect(NEIGHBOR_TREE_TYPES).toContain(data[i * TREE_STRIDE + 5]);
      expect(data[i * TREE_STRIDE + 5]).not.toBe(TREE.BUSH);
      expect(i).toBeGreaterThanOrEqual(500 - TREE_YIELD);
    }
    expect(pickNeighborTrees(data, { treeStride: 3, maxTrees: 500 }, false, offset, yieldTo).stride).toBe(6);
  });

  it('regions: an even pick of at most regionTrees among the eligible trees', () => {
    const { indices, eligible, cap } = pickNeighborTrees(data, { treeStride: 3, maxTrees: 4000, regionTrees: 600 }, true, offset, yieldTo);
    expect(cap).toBe(600);
    expect(indices.length).toBeLessThanOrEqual(601); // float steps: the web's pick can take one more
    expect(indices.length).toBeGreaterThan(590);
    expect(eligible).toBeGreaterThan(1900);
  });
});

describe('context.json pieces', () => {
  it('neighborPlacement: offset, outlines and designed area in the focused frame', () => {
    const layers = layersOf('xc');
    layers.forEach((n, i) => {
      const p = neighborPlacement(n, i);
      expect(p).toMatchObject({ key: n.key, region: n.region, priority: i });
      expect(Object.keys(p.offset)).toEqual(['x', 'z', 'sx']);
      expect(p.clear.radii).toHaveLength(n.park.clear.radii.length);
      expect(p.outline).toHaveLength(n.park.clear.radii.length * 2);
      expect(p.opaqueOutline).toHaveLength(p.outline.length);
      // outline = signed distance +FADE.outer, opaque outline = −FADE.inner
      expect(n.area.signedDistance(...p.outline[5])).toBeCloseTo(FADE.outer, 0);
      expect(n.area.signedDistance(...p.opaqueOutline[5])).toBeCloseTo(-FADE.inner, 0);
    });
  });

  it('outlinePolyline follows the radii', () => {
    const area = makeDesignArea({ cx: 10, cz: 20, radii: [100, 100, 100, 100] });
    expect(outlinePolyline(area, -10, 4)[0][0]).toBeCloseTo(100, 6);
    expect(outlinePolyline(area, 0, 4)[1][1]).toBeCloseTo(120, 6);
  });

  it('basemapYield documents drawing over the map and the region correction formula', () => {
    expect(BASEMAP_YIELD.mode).toBe('draw-over');
    expect(BASEMAP_YIELD.regionCorrection.formula).toMatch(/f \* \(1 - r\) \/ max\(1 - r \* f/);
  });
});

describe('exported bundles (dist-mobile, when present)', () => {
  for (const key of ['xc', 'xp', 'xs']) {
    const file = `dist-mobile/${key}/context.json`;
    it.skipIf(!fs.existsSync(file))(`${key}/context.json has the contract shape`, () => {
      const json = JSON.parse(fs.readFileSync(file, 'utf8'));
      expect(json).toMatchObject({ format: 'parquex-context', version: 1, focus: key });
      expect(json.neighbors.map((n) => n.key)).toEqual(layersOf(key).map((n) => n.key));
      for (const n of json.neighbors) {
        expect(n.nodes.ground).toBe(`ctx-ground:${n.key}`);
        expect(n.bounds.x1).toBeGreaterThan(n.bounds.x0);
        for (const range of Object.values(n.trees.types)) expect(range.count).toBeGreaterThan(0);
        expect(n.trees.quality.low).toBeLessThan(n.trees.quality.medium);
      }
    });
  }
});
