import { describe, expect, it } from 'vitest';
import { PARKS, DEFAULT_PARK, SELECTABLE_PARKS } from '#parks/index.js';
import * as catalog from '../../src/parks/catalog.js';

describe('park catalog (web map, src/parks/catalog.js)', () => {
  it('lists every park with the name, label and region flag of its definition', () => {
    expect(Object.keys(catalog.PARK_CATALOG)).toEqual(Object.keys(PARKS));
    for (const [key, park] of Object.entries(PARKS)) {
      const entry = catalog.PARK_CATALOG[key];
      expect(entry.name, key).toBe(park.name);
      expect(entry.labelKey, key).toBe(park.labelKey);
      expect(Boolean(entry.region), key).toBe(Boolean(park.region));
    }
    expect(catalog.SELECTABLE_PARKS).toEqual(SELECTABLE_PARKS);
    expect(catalog.DEFAULT_PARK).toBe(DEFAULT_PARK);
  });

  it('loads each full definition on demand', async () => {
    for (const key of Object.keys(PARKS)) expect(await catalog.loadPark(key), key).toBe(PARKS[key]);
  });
});
