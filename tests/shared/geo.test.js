import { describe, expect, it } from 'vitest';
import { bearingDeg, haversineKm, illustrationExtent, makeProjection, parkFrame } from '#shared/geo.js';

describe('makeProjection', () => {
  const proj = makeProjection(20.58, -87.12);

  it('maps the origin to (0, 0)', () => {
    const [x, z] = proj.toLocal(20.58, -87.12);
    expect(x).toBeCloseTo(0, 9);
    expect(z).toBeCloseTo(0, 9);
  });

  it('uses x = east and z = south', () => {
    const [x, z] = proj.toLocal(20.581, -87.119);
    expect(x).toBeGreaterThan(0);
    expect(z).toBeLessThan(0);
  });

  it('round-trips local meters ↔ lat/lng', () => {
    const [lat, lng] = proj.toLatLng(123.4, -567.8);
    const [x, z] = proj.toLocal(lat, lng);
    expect(x).toBeCloseTo(123.4, 6);
    expect(z).toBeCloseTo(-567.8, 6);
  });

  it('agrees with the haversine distance at park scale', () => {
    const [lat, lng] = proj.toLatLng(300, 400);
    expect(haversineKm([20.58, -87.12], [lat, lng]) * 1000).toBeCloseTo(500, -1);
  });
});

describe('illustrationExtent', () => {
  it('scales the node and moves it by the scene position', () => {
    const ext = illustrationExtent({ nodeScale: 2, nodeTranslation: [1, 0, 3], sceneScale: 10, scenePosition: [5, 7, 0] });
    expect(ext).toEqual({ size: 20, cx: 15, cz: 23 });
  });
});

describe('bearingDeg', () => {
  it('returns compass bearings', () => {
    expect(bearingDeg([0, 0], [1, 0])).toBeCloseTo(0, 6);
    expect(bearingDeg([0, 0], [0, 1])).toBeCloseTo(90, 6);
    expect(bearingDeg([0, 0], [-1, 0])).toBeCloseTo(180, 6);
    expect(bearingDeg([0, 0], [0, -1])).toBeCloseTo(-90, 6);
  });
});

describe('parkFrame', () => {
  const illustration = { nodeScale: 50, nodeTranslation: [2, 0, 4], sceneScale: 27, scenePosition: [-69, 98, -120], masks: [] };
  const mapFrame = { latitude: 20.58, longitude: -87.12, bound1Lat: 20.585, bound1Long: -87.115, bound2Lat: 20.576, bound2Long: -87.125 };

  it('uses the map frame and the illustration when there is one', () => {
    const f = parkFrame({ sources: { illustration, mapFrame } });
    expect(f.center).toEqual({ lat: 20.58, lng: -87.12 });
    expect(f.extent).toEqual(illustrationExtent(illustration));
    expect(f.bounds.x0).toBeLessThan(0);
    expect(f.bounds.x1).toBeGreaterThan(0);
    expect(f.bounds.z0).toBeLessThan(0); // bound1 is north: z < 0
    expect(f.projection.toLocal(20.58, -87.12).map(Math.abs)).toEqual([0, 0]);
  });

  it('needs the map frame for illustrated parks', () => {
    expect(() => parkFrame({ sources: { illustration } })).toThrow(/mapFrame/);
  });

  it('uses sources.center and sources.extent in satellite mode (no map frame)', () => {
    const park = { sources: { mode: 'satellite', center: { lat: 20.585, lng: -87.127 }, extent: { size: 1000 } } };
    const f = parkFrame(park);
    expect(f.center).toEqual({ lat: 20.585, lng: -87.127 });
    expect(f.extent).toEqual({ cx: 0, cz: 0, size: 1000 });
    expect(f.bounds).toEqual({ x0: -500, x1: 500, z0: -500, z1: 500 });
    const [lat, lng] = f.projection.toLatLng(0, 0);
    expect(lat).toBeCloseTo(20.585, 9);
    expect(lng).toBeCloseTo(-87.127, 9);
    // a map frame does not override the satellite frame
    expect(parkFrame({ sources: { ...park.sources, mapFrame } }).center).toEqual(f.center);
  });

  it('honours an off-center satellite extent', () => {
    const f = parkFrame({ sources: { mode: 'satellite', center: { lat: 21, lng: -86.86 }, extent: { size: 400, cx: 50, cz: -20 } } });
    expect(f.bounds).toEqual({ x0: -150, x1: 250, z0: -220, z1: 180 });
  });

  it('rejects satellite parks without center or extent', () => {
    expect(() => parkFrame({ sources: { mode: 'satellite', center: { lat: 21, lng: -86.86 } } })).toThrow(/extent/);
  });
});
