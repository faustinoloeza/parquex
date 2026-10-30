import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildGraph, route } from '#shared/nav-graph.js';
import { makeDesignArea } from '#shared/design-area.js';
import {
  GUIDANCE,
  bannerText,
  chooseStart,
  findEntrance,
  formatDistance,
  guidance,
  locateOnRoute,
  prepareRoute,
  walkMinutes,
  walkerAt,
} from '#shared/navigation.js';
import { loadLanguage, translator } from '../../src/i18n/index.js';

await loadLanguage('es');
const es = translator('es');
const park = (key) => JSON.parse(readFileSync(new URL(`../../public/parks/${key}/park.json`, import.meta.url)));

describe('findEntrance', () => {
  const poi = (es, x, z, active = true) => ({ name: { es }, x, z, active });

  it('prefers an activity named like the entrance', () => {
    const p = { pois: [poi('Delfines', 1, 1), poi('Plaza Principal', 2, 2), poi('Entrada', 3, 3)] };
    expect(findEntrance(p)).toMatchObject({ x: 3, z: 3 });
    expect(findEntrance({ pois: [poi('Delfines', 1, 1), poi('Plaza Principal', 2, 2)] })).toMatchObject({ x: 2, z: 2 });
    // "Entrada a Ríos Subterráneos" is an activity, not the park entrance
    expect(findEntrance({ pois: [poi('Entrada a Ríos Subterráneos', 5, 5), poi('Taquillas', 6, 6)] })).toMatchObject({ x: 6, z: 6 });
  });

  it('uses the park definition override, then the first activity, then the center', () => {
    expect(findEntrance({ pois: [poi('Entrada', 3, 3)] }, { x: 9, z: 8 })).toMatchObject({ x: 9, z: 8 });
    expect(findEntrance({ pois: [poi('Delfines', 1, 1, false), poi('Río', 4, 4)] })).toMatchObject({ x: 4, z: 4 });
    expect(findEntrance({ pois: [], clear: { cx: 7, cz: 6 } })).toEqual({ x: 7, z: 6 });
  });

  it('finds the entrance of the real parks', () => {
    expect(findEntrance(park('xc')).name.es).toBe('Plaza Principal');
    expect(findEntrance(park('xs')).name.es).toMatch(/^Ingreso/);
    expect(findEntrance(park('xo')).name.es).toBe('Entrada');
    expect(findEntrance(park('xp')).name.es).toBe('Entrada');
  });
});

describe('chooseStart', () => {
  const area = makeDesignArea({ cx: 0, cz: 0, radii: new Array(36).fill(500) });
  const base = { signedDistance: area.signedDistance, entrance: { x: 10, z: 20 } };

  it('uses a location inside the park or near it', () => {
    expect(chooseStart({ ...base, fix: { x: 100, z: 100, accuracy: 8 } })).toMatchObject({
      x: 100,
      simulated: false,
      reason: 'gps',
      accuracy: 8,
    });
    expect(chooseStart({ ...base, fix: { x: 0, z: 790 } }).simulated).toBe(false); // 290 m outside
  });

  it('simulates at the entrance when far away, denied or unavailable', () => {
    expect(chooseStart({ ...base, fix: { x: 0, z: 810 } })).toEqual({ x: 10, z: 20, simulated: true, reason: 'far' });
    expect(chooseStart({ ...base, fix: null, error: 'denied' }).reason).toBe('denied');
    expect(chooseStart({ ...base, fix: null, error: 'unavailable' }).reason).toBe('unavailable');
    expect(chooseStart({ ...base, fix: null }).reason).toBe('waiting');
  });

  it('a point chosen on the map wins', () => {
    expect(chooseStart({ ...base, fix: { x: 1, z: 1 }, manual: { x: 5, z: 6 } })).toMatchObject({
      x: 5,
      z: 6,
      simulated: true,
      reason: 'manual',
    });
  });
});

describe('guidance', () => {
  // north 100 m, right (east) 80 m, left (north) 60 m; side walkways make both corners crossings
  const g = buildGraph({
    walkways: [
      [
        [0, 0],
        [0, -100],
        [80, -100],
        [80, -160],
      ],
      [
        [0, -100],
        [-50, -100],
      ],
      [
        [80, -100],
        [150, -100],
      ],
    ],
  });
  const r = prepareRoute(route(g, { x: 0, z: 0 }, { x: 80, z: -160, name: 'Capilla' }, { t: es }));

  it('advances the steps as the walker moves', () => {
    const at = (s) => guidance(r, walkerAt(r, s));
    expect(at(0)).toMatchObject({ next: 1, offRoute: false, arrived: false });
    expect(at(0).toNext).toBeCloseTo(100, 6);
    expect(at(60).toNext).toBeCloseTo(40, 6);
    expect(bannerText(r, at(60), es)).toBe('En 40 m gira a la derecha');
    expect(bannerText(r, at(95), es)).toBe('Gira a la derecha');
    expect(at(110).next).toBe(2);
    expect(bannerText(r, at(110), es)).toBe('En 70 m gira a la izquierda');
    expect(at(200).next).toBe(3);
    expect(bannerText(r, at(200), es)).toBe('En 40 m llegas a Capilla');
  });

  it('detects arrival within 12 m of the destination', () => {
    expect(guidance(r, { x: 80, z: -150 }).arrived).toBe(true);
    expect(guidance(r, { x: 80, z: -140 }).arrived).toBe(false);
    expect(bannerText(r, guidance(r, { x: 80, z: -155 }), es)).toBe('Has llegado');
  });

  it('detects leaving the route by more than 25 m', () => {
    expect(guidance(r, { x: 20, z: -50 }).offRoute).toBe(false);
    expect(guidance(r, { x: 30, z: -50 }).offRoute).toBe(true);
    expect(GUIDANCE.offRoute).toBe(25);
  });

  it('keeps the position near the last one where the route comes back on itself', () => {
    // out and back along the same line: 0 → 100 → 0 (+ a little detour)
    const back = prepareRoute({
      points: [
        [0, 0],
        [100, 0],
        [100, 10],
        [0, 10],
      ],
      steps: [{ along: 0 }, { along: 210 }],
    });
    expect(locateOnRoute(back, 20, 6, 15).along).toBeCloseTo(20, 6); // going out
    expect(locateOnRoute(back, 20, 6, 180).along).toBeCloseTo(190, 6); // coming back
  });
});

describe('formatting', () => {
  it('walking time at 4.5 km/h', () => {
    expect(walkMinutes(75)).toBe(1);
    expect(walkMinutes(750)).toBe(10);
    expect(walkMinutes(10)).toBe(1);
  });

  it('distances like a walking app', () => {
    expect(formatDistance(42)).toBe('40 m');
    expect(formatDistance(3)).toBe('5 m');
    expect(formatDistance(347)).toBe('350 m');
    expect(formatDistance(1234)).toBe('1,2 km');
    expect(formatDistance(1234, 'en')).toBe('1.2 km');
  });
});
