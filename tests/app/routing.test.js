// URLs and park selection: regions (src/parks/xcr) are not parks a visitor can open.
import { describe, expect, it } from 'vitest';
import { parseRoute, routeUrl } from '../../src/app/routing.js';
import { QUALITY_PRESETS } from '../../src/app/quality.js';
import { DEFAULT_PARK } from '#parks/index.js';

describe('parseRoute', () => {
  it('opens selectable parks and falls back to the default park for regions and unknown keys', () => {
    expect(parseRoute('/xp/en')).toEqual({ park: 'xp', lang: 'en' });
    expect(parseRoute('/xcr/es').park).toBe(DEFAULT_PARK);
    expect(parseRoute('/nope/es').park).toBe(DEFAULT_PARK);
  });

  it('reads and writes routes under the site base (GitHub Pages)', () => {
    expect(parseRoute('/parquex/xh/en', '/parquex/')).toEqual({ park: 'xh', lang: 'en' });
    expect(parseRoute('/parquex/', '/parquex/')).toEqual({ park: DEFAULT_PARK, lang: 'es' });
    expect(routeUrl('xc', 'es', '/parquex/')).toBe('/parquex/xc/es');
    expect(routeUrl('xc', 'es')).toBe('/xc/es');
  });
});

describe('quality presets', () => {
  it('always draw the neighboring parks and the region, sparser on lower levels', () => {
    const levels = ['high', 'medium', 'low'].map((q) => QUALITY_PRESETS[q].neighbors);
    for (const n of levels) {
      expect(n).not.toBeNull();
      expect(n.maxTrees).toBeGreaterThan(0);
      expect(n.regionTrees).toBeGreaterThan(0);
    }
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i].maxTrees).toBeLessThan(levels[i - 1].maxTrees);
      expect(levels[i].regionTrees).toBeLessThan(levels[i - 1].regionTrees);
      expect(levels[i].treeStride).toBeGreaterThanOrEqual(levels[i - 1].treeStride);
    }
    expect(QUALITY_PRESETS.high.neighbors.regionTrees).toBeLessThanOrEqual(6000);
  });
});
