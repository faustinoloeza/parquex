// Consistency of the park content (src/parks/<park>): ids, model types and
// references between files. These catch typos before the pipeline or the app
// fail with a less obvious error.
import { describe, expect, it } from 'vitest';
import { PARKS, DEFAULT_PARK, SELECTABLE_PARKS } from '#parks/index.js';
import { getModel } from '#models/index.js';
import { EDIT_KINDS, resolveSite } from '../../pipeline/site.js';
import { STROKES } from '../../pipeline/strokes.js';
import { pointInPolygon } from '../../pipeline/lib/raster.js';
import { resolveWaterTint } from '#shared/water-tint.js';
import es from '../../src/i18n/es.js';
import en from '../../src/i18n/en.js';

const finite = (...values) => values.every((v) => Number.isFinite(v));

describe('park registry', () => {
  it('has the default park', () => {
    expect(PARKS[DEFAULT_PARK]).toBeDefined();
  });

  it('registers every park under its own key', () => {
    for (const [key, park] of Object.entries(PARKS)) expect(park.key).toBe(key);
  });

  it('keeps regions out of the selectable parks (header, URL, mobile export)', () => {
    const regions = Object.keys(PARKS).filter((key) => PARKS[key].region);
    expect(regions).toEqual(['xcr']);
    expect(SELECTABLE_PARKS).toEqual(['xc', 'xh', 'xp', 'xs', 'xo']);
    expect(SELECTABLE_PARKS).toContain(DEFAULT_PARK);
  });
});

describe('regions', () => {
  it('are satellite-mode land with a traced outline and nothing to visit', () => {
    for (const park of Object.values(PARKS).filter((p) => p.region)) {
      expect(park.sources.mode).toBe('satellite');
      expect(park.sources.outline.length).toBeGreaterThanOrEqual(3);
      expect(park.activities).toEqual([]);
      expect(park.landmarks).toEqual([]);
      expect(park.routes).toEqual([]);
      expect(park.labelKey).toBeUndefined();
    }
  });

  it('keeps the outline (+ margin and fade band) inside the build square', () => {
    for (const park of Object.values(PARKS).filter((p) => p.region)) {
      const { outline, extent } = park.sources;
      const half = extent.size / 2 - 25 - 5; // PARK_MARGIN, FADE.outer
      for (const [x, z] of outline) {
        expect(Math.abs(x - (extent.cx ?? 0))).toBeLessThan(half);
        expect(Math.abs(z - (extent.cz ?? 0))).toBeLessThan(half);
      }
    }
  });
});

describe.each(Object.values(PARKS))('park $key', (park) => {
  it('has the pipeline sources', () => {
    const { sources } = park;
    expect(sources.code).toBeTruthy();
    expect(sources.osmBBox).toHaveLength(4);
    if (sources.mode === 'satellite') {
      // no official illustration: frame and designed area from sources + OSM
      expect(finite(sources.center.lat, sources.center.lng)).toBe(true);
      expect(sources.extent.size).toBeGreaterThan(100);
      // regions have no OSM polygon: only their traced outline
      if (!park.region) expect(sources.osmPark).toMatch(/^(way|relation)\/\d+$/);
      expect(sources.name).toBeTruthy();
      const { lat, lng } = sources.center;
      const [w, s, e, n] = sources.osmBBox;
      expect(lng > w && lng < e && lat > s && lat < n, 'center inside osmBBox').toBe(true);
    } else {
      expect(sources.mode).toBeUndefined();
      const f = sources.mapFrame;
      expect(finite(f.latitude, f.longitude, f.bound1Lat, f.bound1Long, f.bound2Lat, f.bound2Long)).toBe(true);
      expect(sources.illustration.nodeTranslation).toHaveLength(3);
    }
  });

  it('keeps its activities, models and vehicles inside a hand-traced outline', () => {
    const { outline } = park.sources;
    if (!outline) return;
    expect(park.sources.mode).toBe('satellite');
    expect(outline.length).toBeGreaterThanOrEqual(3);
    const points = [
      ...(park.activities ?? []).filter((a) => a.x != null).map((a) => [`activity ${a.number}`, a.x, a.z]),
      ...park.landmarks.map((l) => [l.id, l.x, l.z]),
      ...(park.vehicles ?? []).flatMap((v) =>
        v.from
          ? [
              ['bus', ...v.from],
              ['bus', ...v.to],
            ]
          : [],
      ),
    ];
    for (const [name, x, z] of points) expect(pointInPolygon(x, z, outline), `${name} at ${x}, ${z}`).toBe(true);
  });

  it('has a valid water tint, if any', () => {
    expect(() => resolveWaterTint(park.sources.waterTint)).not.toThrow();
  });

  it('places activities with unique ids and both languages', () => {
    const ids = park.activities.map((a) => a.id ?? a.number);
    expect(new Set(ids).size).toBe(ids.length);
    for (const a of park.activities) {
      expect(Number.isInteger(a.number), `activity ${a.number}`).toBe(true);
      expect(a.name.es && a.name.en, `activity ${a.number}: name`).toBeTruthy();
      expect(a.category.es && a.category.en, `activity ${a.number}: category`).toBeTruthy();
      expect(finite(a.x, a.z) || finite(a.lat, a.lng), `activity ${a.number}: position`).toBe(true);
    }
  });

  it('has a UI label for the header in every language', () => {
    if (park.region) return; // never in the header
    expect(park.labelKey).toMatch(/^lbl_/);
    expect(es[park.labelKey]).toBeTruthy();
    expect(en[park.labelKey]).toBeTruthy();
  });

  it('uses unique landmark ids', () => {
    const ids = park.landmarks.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('places landmarks with known model types at finite positions', () => {
    for (const l of park.landmarks) {
      expect(getModel(l.type), `${l.id}: unknown type "${l.type}"`).toBeDefined();
      expect(finite(l.x, l.z), `${l.id}: position`).toBe(true);
      if (l.rotation !== undefined) expect(finite(l.rotation), `${l.id}: rotation`).toBe(true);
    }
  });

  it('uses known edit kinds that reference existing landmarks', () => {
    const ids = new Set(park.landmarks.map((l) => l.id));
    for (const e of park.edits) {
      expect(EDIT_KINDS).toContain(e.kind);
      if (e.landmark) expect(ids.has(e.landmark), `edit ${e.kind}: landmark "${e.landmark}"`).toBe(true);
      else if (e.at) expect(finite(...e.at)).toBe(true);
    }
  });

  it('defines routes with unique slugs and known stroke detectors', () => {
    const slugs = park.routes.map((r) => r.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const r of park.routes) {
      expect(r.color).toMatch(/^#[0-9a-f]{6}$/i);
      expect(r.label.es && r.label.en).toBeTruthy();
      if (r.stroke) expect(STROKES[r.stroke], `${r.slug}: stroke "${r.stroke}"`).toBeDefined();
    }
  });

  it('resolves the site for the pipeline', () => {
    const site = resolveSite(park);
    expect(typeof site.isCleared).toBe('function');
    for (const l of park.landmarks.filter((l) => l.clear > 0)) expect(site.isCleared(l.x, l.z)).toBe(true);
  });
});

describe('i18n', () => {
  it('has the same keys in every language', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort());
  });
});
