import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { makeProjection } from '#shared/geo.js';
import { FADE, makeDesignArea } from '#shared/design-area.js';
import {
  findNeighbors,
  movedDesignArea,
  neighborOpacity,
  outlineGap,
  parkOffset,
  yieldOpacity,
  NEIGHBOR_DISTANCE,
} from '#shared/neighbors.js';
import { groundGrid } from '../../src/layers/neighbors.js';

const circle = (cx, cz, r, n = 72) => ({ cx, cz, radii: Array(n).fill(r) });

describe('parkOffset', () => {
  const focus = { lat: 20.5806, lng: -87.11995 }; // Xcaret
  const other = { lat: 20.585055, lng: -87.127065 }; // Xenses
  const offset = parkOffset(focus, other);
  const pf = makeProjection(focus.lat, focus.lng);
  const po = makeProjection(other.lat, other.lng);

  it("places the other park's center at its position in the focused frame", () => {
    const [x, z] = pf.toLocal(other.lat, other.lng);
    expect(offset.dx).toBeCloseTo(x, 9);
    expect(offset.dz).toBeCloseTo(z, 9);
    expect(offset.dx).toBeLessThan(0); // Xenses is west…
    expect(offset.dz).toBeLessThan(0); // …and north of Xcaret
  });

  it('matches going through latitude / longitude exactly (same frame as the real-map tiles)', () => {
    for (const [x, z] of [
      [0, 0],
      [500, -300],
      [-650, 720],
    ]) {
      const [wx, wz] = offset.toWorld(x, z);
      const [ex, ez] = pf.toLocal(...po.toLatLng(x, z));
      expect(wx).toBeCloseTo(ex, 6);
      expect(wz).toBeCloseTo(ez, 6);
    }
  });

  it('is a near-translation: the x stretch moves points by less than 5 cm at 1 km', () => {
    expect(Math.abs(offset.sx - 1) * 1000).toBeLessThan(0.05);
  });

  it('round-trips with toLocal and is the inverse of the reverse offset', () => {
    const [wx, wz] = offset.toWorld(123.4, -56.7);
    const [x, z] = offset.toLocal(wx, wz);
    expect(x).toBeCloseTo(123.4, 9);
    expect(z).toBeCloseTo(-56.7, 9);
    const back = parkOffset(other, focus);
    const [bx, bz] = back.toWorld(wx, wz);
    expect(bx).toBeCloseTo(123.4, 6);
    expect(bz).toBeCloseTo(-56.7, 6);
  });
});

describe('outlineGap', () => {
  it('is the distance between two circles, negative when they overlap', () => {
    expect(outlineGap(makeDesignArea(circle(0, 0, 100)), makeDesignArea(circle(500, 0, 150)))).toBeCloseTo(250, 0);
    expect(outlineGap(makeDesignArea(circle(0, 0, 100)), makeDesignArea(circle(0, 220, 150)))).toBeCloseTo(-30, 0);
  });
});

describe('findNeighbors', () => {
  // two parks 1 km apart along the parallel, one 50 km away
  const lat = 20.58;
  const m = makeProjection(lat, -87.12);
  const at = (x) => m.toLatLng(x, 0);
  const park = (key, x, r) => {
    const [la, lo] = at(x);
    return { key, center: { lat: la, lng: lo }, clear: circle(0, 0, r) };
  };
  const a = park('a', 0, 300),
    b = park('b', 1000, 300),
    c = park('c', 1300 + NEIGHBOR_DISTANCE - 100 + 400, 400), // 1400 m from b, 2100 m from a
    far = park('far', 50000, 500);

  it('keeps parks whose designed areas are within NEIGHBOR_DISTANCE, closest first', () => {
    const found = findNeighbors(a, [a, b, c, far]);
    expect(found.map((n) => n.key)).toEqual(['b']);
    expect(found[0].gap).toBeCloseTo(400, 0);
    expect(found[0].area.cx).toBeCloseTo(1000, 0);
    expect(findNeighbors(b, [a, b, c, far]).map((n) => n.key)).toEqual(['a', 'c']);
    expect(findNeighbors(far, [a, b, c, far])).toEqual([]);
  });

  it('puts regions last, whatever their distance, and only near the parks they touch', () => {
    // a region overlapping a and b (gap < 0) still ranks after b (gap 400)
    const region = { ...park('r', 500, 900), region: true };
    const found = findNeighbors(a, [a, b, c, far, region]);
    expect(found.map((n) => [n.key, n.region])).toEqual([
      ['b', false],
      ['r', true],
    ]);
    expect(found[1].gap).toBeLessThan(0);
    expect(findNeighbors(far, [a, b, region])).toEqual([]);
  });

  it('finds the real neighbors in the generated park data', () => {
    const keys = ['xc', 'xh', 'xp', 'xs', 'xo'].filter((k) => fs.existsSync(`public/parks/${k}/park.json`));
    if (keys.length < 5) return;
    const parks = keys.map((k) => JSON.parse(fs.readFileSync(`public/parks/${k}/park.json`, 'utf8')));
    const of = (key) =>
      findNeighbors(
        parks.find((p) => p.key === key),
        parks,
      )
        .map((n) => n.key)
        .sort();
    expect(of('xc')).toEqual(['xp', 'xs']);
    expect(of('xp')).toEqual(['xc', 'xs']);
    expect(of('xs')).toEqual(['xc', 'xp']);
    expect(of('xh')).toEqual([]); // ~30 km away
    expect(of('xo')).toEqual([]); // Cancún
  });

  it('adds the Xcaret region as the last neighbor of Xcaret, Xplor and Xenses only', () => {
    const keys = ['xc', 'xh', 'xp', 'xs', 'xo', 'xcr'];
    if (!keys.every((k) => fs.existsSync(`public/parks/${k}/park.json`))) return;
    const parks = keys.map((k) => JSON.parse(fs.readFileSync(`public/parks/${k}/park.json`, 'utf8')));
    const of = (key) =>
      findNeighbors(
        parks.find((p) => p.key === key),
        parks,
      ).map((n) => n.key);
    expect(parks.find((p) => p.key === 'xcr').region).toBe(true);
    for (const key of ['xc', 'xp', 'xs']) {
      expect(of(key).at(-1)).toBe('xcr');
      expect(of(key)).toHaveLength(3);
    }
    expect(of('xh')).toEqual([]);
    expect(of('xo')).toEqual([]);
  });
});

describe('neighborOpacity', () => {
  // focused park at the origin (r = 300); the neighbor's own frame is 700 m east
  const focus = makeDesignArea(circle(0, 0, 300));
  const offset = { dx: 700, dz: 0, sx: 1, toWorld: (x, z) => [x + 700, z], toLocal: (x, z) => [x - 700, z] };
  const own = makeDesignArea(circle(0, 0, 300));
  const opacity = neighborOpacity(own, offset, [focus]);

  it('is 1 inside the neighbor, 0 outside it and 0 inside the focused park', () => {
    expect(opacity(0, 0)).toBe(1);
    expect(opacity(0, 400)).toBe(0); // beyond the neighbor's outline: the real map
    expect(opacity(-450, 0)).toBe(0); // world x = 250: inside the focused park
  });

  it("moves the neighbor's designed area into the focused frame", () => {
    const moved = movedDesignArea(circle(10, 20, 300), offset);
    expect([moved.cx, moved.cz]).toEqual([710, 20]);
  });

  it('cross-fades where the two outlines meet', () => {
    // neighbor r = 420 → world x 280…1120, overlapping the focused park (…300)
    const overlap = neighborOpacity(makeDesignArea(circle(0, 0, 420)), offset, [focus]);
    const values = [-440, -420, -400, -380, -360].map((x) => overlap(x, 0));
    for (let i = 1; i < values.length; i++) expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    expect(values[0]).toBe(0);
    expect(values.at(-1)).toBe(1);
  });
});

describe('groundGrid (neighbor ground)', () => {
  const park = { extent: { cx: 0, cz: 0, size: 1200 } };
  const own = makeDesignArea(circle(0, 0, 400));
  const focus = makeDesignArea(circle(-700, 0, 400)); // overlaps the west side
  const offset = { dx: 0, dz: 0, sx: 1, toWorld: (x, z) => [x, z], toLocal: (x, z) => [x, z] };
  const opacity = neighborOpacity(own, offset, [focus]);
  const grid = groundGrid(park, (x) => (x > 0 ? 1 : -1), opacity, own);

  it('only keeps cells that show something, with the opacity as vertex alpha', () => {
    const pos = grid.ground.getAttribute('position');
    const color = grid.ground.getAttribute('color');
    expect(color.itemSize).toBe(4);
    let maxR = 0;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        z = pos.getZ(i);
      maxR = Math.max(maxR, Math.hypot(x, z));
      expect(color.getW(i)).toBeCloseTo(opacity(x, z), 5);
      // nothing deep inside the focused park
      expect(focus.signedDistance(x, z)).toBeGreaterThan(-FADE.inner - 30);
    }
    expect(maxR).toBeLessThan(400 + FADE.outer + 40);
  });

  it('adds water only over low cells', () => {
    const pos = grid.water.getAttribute('position');
    expect(pos.count).toBeGreaterThan(0);
    let east = 0;
    for (let i = 0; i < pos.count; i++) if (pos.getX(i) > 20) east++;
    expect(east).toBe(0);
    expect(grid.water.getAttribute('alpha').count).toBe(pos.count);
  });

  it("gives the water its own opacity when asked (a region's water fades itself in the shader)", () => {
    const yields = yieldOpacity(offset, [focus]);
    const g = groundGrid(park, (x) => (x > 0 ? 1 : -1), opacity, own, yields);
    const pos = g.water.getAttribute('position');
    const alpha = g.water.getAttribute('alpha');
    expect(pos.count).toBe(grid.water.getAttribute('position').count); // same cells
    let beyondOwnFade = 0;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i),
        z = pos.getZ(i);
      expect(alpha.getX(i)).toBeCloseTo(yields(x, z), 5);
      if (own.fade(x, z) > 0.5 && yields(x, z) > 0.5) beyondOwnFade++;
    }
    expect(beyondOwnFade).toBeGreaterThan(0); // its own fade is not in the attribute
  });
});

describe('yieldOpacity', () => {
  it("is neighborOpacity without the neighbor's own fade", () => {
    const own = makeDesignArea(circle(0, 0, 300));
    const focus = makeDesignArea(circle(-500, 0, 300));
    const offset = { dx: 0, dz: 0, sx: 1, toWorld: (x, z) => [x, z], toLocal: (x, z) => [x, z] };
    const y = yieldOpacity(offset, [focus]);
    const o = neighborOpacity(own, offset, [focus]);
    for (const [x, z] of [
      [-230, 0],
      [-190, 10],
      [0, 0],
      [295, 0],
      [400, 0],
    ]) {
      expect(y(x, z)).toBeCloseTo(focus.fade(x, z), 9);
      expect(o(x, z)).toBeCloseTo(y(x, z) * (1 - own.fade(x, z)), 9);
    }
  });
});
