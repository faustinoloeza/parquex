import { describe, expect, it } from 'vitest';
import { resolveWaterTint } from '#shared/water-tint.js';
import { tileCacheDir, tileUrl } from '../../pipeline/lib/satellite.js';

describe('resolveWaterTint', () => {
  it('keeps the default palette when the park sets none', () => {
    expect(resolveWaterTint(undefined)).toBeNull();
  });

  it('derives a darker deep color from a single tint', () => {
    expect(resolveWaterTint('#557A45')).toEqual({ shallow: '#557a45', deep: '#3b5530' });
  });

  it('accepts a shallow / deep pair and rejects malformed colors', () => {
    expect(resolveWaterTint({ shallow: '#5d7f48', deep: '#3d5f3a' })).toEqual({ shallow: '#5d7f48', deep: '#3d5f3a' });
    expect(() => resolveWaterTint('green')).toThrow(/rrggbb/);
    expect(() => resolveWaterTint({ shallow: '#5d7f48' })).toThrow(/rrggbb/);
  });
});

describe('satellite tile source', () => {
  it('uses the live imagery by default and a Wayback release when pinned', () => {
    expect(tileUrl(18, 1, 2)).toBe('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/18/2/1');
    expect(tileUrl(18, 1, 2, 39767)).toBe(
      'https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/39767/18/2/1',
    );
    expect(tileCacheDir('/tiles', 18)).toBe('/tiles/18');
    expect(tileCacheDir('/tiles', 18, 39767)).toBe('/tiles/wayback-39767/18');
  });
});
