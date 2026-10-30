import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { buildGraph, compassOf, makeSteps, nearestPoint, pruneSpikes, route, turnAngle } from '#shared/nav-graph.js';
import { loadLanguage, translator } from '../../src/i18n/index.js';

await Promise.all([loadLanguage('es'), loadLanguage('en')]);
const es = translator('es');
const en = translator('en');

describe('buildGraph', () => {
  it('joins walkways at exactly equal coordinates', () => {
    const g = buildGraph({
      walkways: [
        [
          [0, 0],
          [100, 0],
        ],
        [
          [100, 0],
          [100, 100],
        ],
        [
          [100, 0],
          [200, 0],
        ],
      ],
    });
    expect(g.stats.nodes).toBe(4);
    expect(g.stats.edges).toBe(3);
    expect(g.stats.components).toBe(1);
  });

  it('snaps a loose end within 4 m onto the middle of another line', () => {
    const g = buildGraph({
      walkways: [
        [
          [0, 0],
          [100, 0],
        ],
        [
          [50, 3],
          [50, 80],
        ],
      ],
    });
    expect(g.stats.components).toBe(1);
    // the first line was split at (50, 0)
    expect(g.x.some((x, i) => x === 50 && g.z[i] === 0)).toBe(true);
    const r = route(g, { x: 0, z: 0 }, { x: 50, z: 80 });
    expect(r.length).toBeCloseTo(50 + 3 + 77, 0);
  });

  it('ties official route lines to the walkways they run along', () => {
    const g = buildGraph({
      walkways: [
        [
          [0, 0],
          [0, 200],
        ],
      ],
      routes: [
        {
          lines: [
            [
              [3, 0],
              [3, 100],
              [150, 100],
            ],
          ],
        },
      ],
    });
    expect(g.stats.components).toBe(1);
    expect(g.edges.some((e) => e.kind === 'link')).toBe(true);
    // from the far end of the walkway to the end of the route line
    const r = route(g, { x: 0, z: 200 }, { x: 150, z: 100 });
    expect(r.direct).toBe(false);
    expect(r.length).toBeLessThan(100 + 3 + 150 + 10);
  });

  it('bridges separate pieces closer than 30 m, not farther ones', () => {
    const pieces = (gap) =>
      buildGraph({
        walkways: [
          [
            [0, 0],
            [100, 0],
          ],
          [
            [100 + gap, 0],
            [200 + gap, 0],
          ],
        ],
      });
    expect(pieces(20).stats.components).toBe(1);
    expect(pieces(20).edges.some((e) => e.kind === 'bridge')).toBe(true);
    expect(pieces(50).stats.components).toBe(2);
  });

  it('ties a dead end to a walkway just beyond it when the way around is long', () => {
    // a U: the end of one arm stops 15 m short of the other arm
    const g = buildGraph({
      walkways: [
        [
          [0, 0],
          [0, 200],
          [100, 200],
          [100, 15],
        ],
        [
          [100, 0],
          [0, 0],
        ],
      ],
    });
    const r = route(g, { x: 100, z: 15 }, { x: 100, z: 0 });
    expect(r.length).toBeLessThan(40);
  });

  it('builds the networks of the real parks quickly, in few pieces', () => {
    for (const key of ['xc', 'xh']) {
      const park = JSON.parse(readFileSync(new URL(`../../public/parks/${key}/park.json`, import.meta.url)));
      const t0 = performance.now();
      const g = buildGraph(park);
      expect(performance.now() - t0).toBeLessThan(500);
      expect(g.stats.nodes).toBeGreaterThan(500);
      const main = Math.max(...g.compSize);
      expect(main / g.stats.nodes).toBeGreaterThan(0.9);
      // most activities are within a connector's reach of the network
      const pois = park.pois.filter((p) => p.active);
      const near = pois.filter((p) => nearestPoint(g, p.x, p.z, { max: 60 }));
      expect(near.length / pois.length).toBeGreaterThan(0.9);
    }
  });
});

describe('route', () => {
  // a grid street network 100 m apart, 3 × 3 blocks
  const grid = [];
  for (let i = 0; i <= 3; i++) {
    grid.push([
      [i * 100, 0],
      [i * 100, 100],
      [i * 100, 200],
      [i * 100, 300],
    ]);
    grid.push([
      [0, i * 100],
      [100, i * 100],
      [200, i * 100],
      [300, i * 100],
    ]);
  }
  const g = buildGraph({ walkways: grid });

  it('finds the shortest path (Manhattan distance on a grid)', () => {
    const r = route(g, { x: 0, z: 0 }, { x: 300, z: 200 });
    expect(r.length).toBeCloseTo(500, 3);
    expect(r.points[0]).toEqual([0, 0]);
    expect(r.points.at(-1)).toEqual([300, 200]);
  });

  it('adds connectors from off-network points (gaps)', () => {
    const r = route(g, { x: 50, z: -20 }, { x: 250, z: 330 });
    expect(r.gaps[0]).toBeCloseTo(20, 5);
    expect(r.gaps[1]).toBeCloseTo(30, 5);
    expect(r.points[1]).toEqual([50, 0]);
  });

  it('routes along a single edge when both ends project onto it', () => {
    const r = route(g, { x: 10, z: 2 }, { x: 80, z: -2 });
    expect(r.direct).toBe(false);
    expect(r.length).toBeCloseTo(2 + 70 + 2, 3);
    expect(r.points.length).toBe(4);
    // a straight walk shorter than the way to the network and back
    expect(route(g, { x: 40, z: 45 }, { x: 60, z: 55 }).direct).toBe(true);
    const r3 = route(g, { x: 10, z: 5 }, { x: 290, z: 5 });
    expect(r3.direct).toBe(false);
    expect(r3.length).toBeCloseTo(5 + 280 + 5, 3);
  });

  it('falls back to a straight line without a network', () => {
    const r = route(buildGraph({}), { x: 0, z: 0 }, { x: 30, z: 40 });
    expect(r.direct).toBe(true);
    expect(r.length).toBeCloseTo(50, 6);
    expect(r.steps.at(-1).turn).toBe('arrive');
  });

  it('prefers official routes slightly over plain walkways', () => {
    // two parallel ways of equal length; the route line one wins
    const h = buildGraph({
      walkways: [
        [
          [0, 0],
          [0, 50],
          [200, 50],
          [200, 0],
        ],
      ],
      routes: [
        {
          lines: [
            [
              [0, 0],
              [0, -50],
              [200, -50],
              [200, 0],
            ],
          ],
        },
      ],
    });
    const r = route(h, { x: 0, z: 0 }, { x: 200, z: 0 });
    expect(r.points.some(([, z]) => z === -50)).toBe(true);
  });
});

describe('turn instructions', () => {
  it('measures turns: right is clockwise seen from above with north up', () => {
    // north (-z) then east (+x)
    expect(turnAngle(0, -1, 1, 0)).toBeCloseTo(90, 6);
    expect(turnAngle(0, -1, -1, 0)).toBeCloseTo(-90, 6);
    expect(compassOf(0, -1)).toBe('n');
    expect(compassOf(1, 1)).toBe('se');
  });

  it('heads off, turns and arrives', () => {
    const steps = makeSteps(
      [
        [0, 0],
        [0, -100], // north 100 m
        [80, -100], // east: right turn
        [80, -160], // north: left turn
      ],
      { t: es, name: 'Capilla' },
    );
    expect(steps.map((s) => s.turn)).toEqual(['straight', 'right', 'left', 'arrive']);
    expect(steps[0].instruction).toBe('Camina hacia el norte');
    expect(steps[0].distance).toBeCloseTo(100, 6);
    expect(steps[1].instruction).toBe('Gira a la derecha');
    expect(steps[1].distance).toBeCloseTo(80, 6);
    expect(steps[3].instruction).toBe('Llegas a Capilla');
    expect(steps[3].along).toBeCloseTo(240, 6);
  });

  it('ignores gentle bends and merges zig-zags into one turn', () => {
    const bends = makeSteps([
      [0, 0],
      [0, -100],
      [10, -200], // ≈ 6° bend
    ]);
    expect(bends.map((s) => s.turn)).toEqual(['straight', 'arrive']);
    // a corner cut in two 45° vertices 5 m apart: one right turn
    const corner = makeSteps([
      [0, 0],
      [0, -100],
      [4, -104],
      [100, -104],
    ]);
    expect(corner.map((s) => s.turn)).toEqual(['straight', 'right', 'arrive']);
  });

  it('flags slight turns and mentions a nearby landmark', () => {
    const steps = makeSteps(
      [
        [0, 0],
        [0, -100],
        [40, -170], // ≈ 30°: no turn
        [40, -170],
      ],
      { t: es },
    );
    expect(steps.length).toBe(2);
    const slight = makeSteps(
      [
        [0, 0],
        [0, -100],
        [50, -170], // ≈ 35.5°
      ],
      { t: en, landmarks: [{ name: 'Capilla de Guadalupe', x: 10, z: -105 }] },
    );
    expect(slight[1]).toMatchObject({ turn: 'right', slight: true, near: 'Capilla de Guadalupe' });
    expect(slight[1].instruction).toBe('Turn slightly right near Capilla de Guadalupe');
  });

  it('turns on a real park route are consistent', () => {
    const park = JSON.parse(readFileSync(new URL('../../public/parks/xc/park.json', import.meta.url)));
    const g = buildGraph(park);
    const pois = park.pois.filter((p) => p.active);
    const r = route(g, pois[0], pois[40], { t: es });
    expect(r.steps[0].turn).toBe('straight');
    expect(r.steps.at(-1).turn).toBe('arrive');
    for (let i = 1; i < r.steps.length; i++) expect(r.steps[i].along).toBeGreaterThanOrEqual(r.steps[i - 1].along);
    expect(r.steps.reduce((s, x) => s + x.distance, 0)).toBeCloseTo(r.length, 3);
  });
});

describe('pruneSpikes', () => {
  it('cuts an out-and-back spike between parallel lines', () => {
    const pts = [
      [0, 0],
      [50, 0],
      [80, 0], // out along a walkway…
      [80, 4], // …hop to the parallel route line…
      [52, 4], // …and back
      [50, 30],
    ];
    expect(pruneSpikes(pts)).toEqual([
      [0, 0],
      [50, 0],
      [52, 4],
      [50, 30],
    ]);
  });

  it('keeps an ordinary path', () => {
    const pts = [
      [0, 0],
      [0, 50],
      [50, 50],
      [50, 0],
    ];
    expect(pruneSpikes(pts)).toEqual(pts);
  });
});

describe('turns at junctions', () => {
  it('only announces bends of a single path when they are sharp', () => {
    // one walkway bending 90° (no crossing), and the same corner with a side branch
    const bend = buildGraph({
      walkways: [
        [
          [0, 0],
          [0, -100],
          [100, -100],
        ],
      ],
    });
    expect(route(bend, { x: 0, z: 0 }, { x: 100, z: -100 }).steps.map((s) => s.turn)).toEqual(['straight', 'arrive']);
    const crossing = buildGraph({
      walkways: [
        [
          [0, 0],
          [0, -100],
          [100, -100],
        ],
        [
          [0, -100],
          [0, -200],
        ],
      ],
    });
    expect(route(crossing, { x: 0, z: 0 }, { x: 100, z: -100 }).steps.map((s) => s.turn)).toEqual(['straight', 'right', 'arrive']);
  });
});
