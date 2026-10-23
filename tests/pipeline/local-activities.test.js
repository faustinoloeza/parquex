import { describe, expect, it } from 'vitest';
import { localActivities } from '../../pipeline/lib/local-activities.js';
import { makeProjection } from '#shared/geo.js';

const ctx = { key: 'xs', projection: makeProjection(20.585, -87.127), sampleHeight: () => 1.234 };
/** Keys of an activity in park.json, as stage parkData writes the official ones. */
const POI_KEYS = ['id', 'number', 'lat', 'lng', 'x', 'z', 'y', 'extraCost', 'active', 'name', 'category', 'route'];

describe('localActivities', () => {
  const pois = localActivities(
    [
      { number: 2, name: { es: 'Río', en: 'River' }, category: { es: 'Agua', en: 'Water' }, lat: 20.586, lng: -87.126 },
      { number: 1, name: { es: 'Pueblo', en: 'Village' }, category: { es: 'Recorridos', en: 'Tours' }, extraCost: true, x: 10.123, z: -20 },
    ],
    ctx,
  );

  it('has the same shape as the official activities, sorted by number', () => {
    expect(pois.map((p) => p.number)).toEqual([1, 2]);
    for (const p of pois) expect(Object.keys(p)).toEqual(POI_KEYS);
    expect(pois[0]).toMatchObject({
      id: 'xs-1',
      x: 10.12,
      z: -20,
      y: 1.23,
      extraCost: true,
      active: true,
      name: { es: 'Pueblo', en: 'Village' },
      category: { es: 'Recorridos', en: 'Tours' },
      route: { es: null, en: null },
    });
    expect(pois[1].extraCost).toBe(false);
  });

  it('converts between local meters and lat/lng', () => {
    const [x, z] = ctx.projection.toLocal(20.586, -87.126);
    expect(pois[1].x).toBeCloseTo(x, 2);
    expect(pois[1].z).toBeCloseTo(z, 2);
    const [lat, lng] = ctx.projection.toLatLng(10.123, -20);
    expect(pois[0].lat).toBeCloseTo(lat, 6);
    expect(pois[0].lng).toBeCloseTo(lng, 6);
  });

  it('rejects activities without a position', () => {
    expect(() => localActivities([{ number: 1, name: { es: 'a', en: 'a' }, category: {} }], ctx)).toThrow(/x\/z or lat\/lng/);
  });
});
