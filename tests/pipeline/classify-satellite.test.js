import { describe, expect, it } from 'vitest';
import { COLOR } from '../../pipeline/classes.js';
import { classifySatelliteRaster, satelliteColorClass } from '../../pipeline/stages/classify-satellite.js';
import { roofFromSatellite } from '../../pipeline/stages/buildings.js';
import { makeOsm } from '../../pipeline/lib/osm.js';
import { makeProjection } from '#shared/geo.js';

// 200 × 200 m at 1 px/m, local origin at the center
const N = 200;
const grid = { N, pxPerM: 1, toPx: (x, z) => [x + N / 2, z + N / 2] };
const proj = makeProjection(20.585, -87.127);

const JUNGLE = [110, 124, 80];
const PAVING = [205, 198, 180];
const POOL = [90, 190, 200];
const LAWN = [150, 150, 125];
const DARK_WATER = [40, 70, 95];

function syntheticImage() {
  const rgb = new Uint8Array(N * N * 3);
  const rect = (u0, v0, u1, v1, c) => {
    for (let v = v0; v < v1; v++) for (let u = u0; u < u1; u++) rgb.set(c, (v * N + u) * 3);
  };
  rect(0, 0, N, N, JUNGLE);
  rect(20, 20, 60, 60, PAVING);
  rect(120, 20, 160, 60, POOL);
  rect(20, 120, 60, 180, LAWN);
  rect(120, 120, 160, 160, DARK_WATER);
  return rgb;
}

/** OSM elements from local-meter geometry. */
function syntheticOsm() {
  const elements = [];
  let id = 1;
  const way = (pts, tags, closed = false) => {
    const ids = pts.map(([x, z]) => {
      const [lat, lon] = proj.toLatLng(x, z);
      elements.push({ type: 'node', id: id, lat, lon });
      return id++;
    });
    const w = { type: 'way', id: id++, nodes: closed ? [...ids, ids[0]] : ids, tags };
    elements.push(w);
    return w;
  };
  const square = (x0, z0, x1, z1) => [
    [x0, z0],
    [x1, z0],
    [x1, z1],
    [x0, z1],
  ];
  const park = way(square(-60, -60, 60, 60), { tourism: 'theme_park' }, true);
  way(
    [
      [-90, 0],
      [90, 0],
    ],
    { highway: 'footway' },
  );
  way(square(-10, 30, 10, 40), { building: 'yes' }, true);
  way(square(-30, 60, -10, 80), { natural: 'water' }, true);
  return { osm: makeOsm({ elements }, proj), parkRef: `way/${park.id}` };
}

describe('satelliteColorClass', () => {
  it('reads jungle, paving, open scrub and water', () => {
    expect(satelliteColorClass(...JUNGLE)).toBe(COLOR.FOREST);
    expect(satelliteColorClass(...PAVING)).toBe(COLOR.PATH);
    expect(satelliteColorClass(...LAWN)).toBe(COLOR.LAWN);
    expect(satelliteColorClass(...POOL)).toBe(COLOR.POOL);
    expect(satelliteColorClass(...DARK_WATER)).toBe(COLOR.SEA);
    expect(satelliteColorClass(30, 35, 25)).toBe(COLOR.FOREST); // canopy shadow
    expect(satelliteColorClass(190, 110, 80)).toBe(COLOR.ROOF); // terracotta
  });
});

describe('classifySatelliteRaster', () => {
  const { osm, parkRef } = syntheticOsm();
  const out = classifySatelliteRaster({ grid, blurRGB: syntheticImage(), osm, park: { sources: { osmPark: parkRef } } });
  const at = (x, z) => out.cls[(z + N / 2) * N + (x + N / 2)];
  const outsideAt = (x, z) => out.outside[(z + N / 2) * N + (x + N / 2)];

  it('classifies the satellite colors', () => {
    expect(at(0, -60)).toBe(COLOR.FOREST);
    expect(at(-60, -60)).toBe(COLOR.PATH);
    expect(at(40, -60)).toBe(COLOR.POOL);
    expect(at(-60, 50)).toBe(COLOR.LAWN);
    expect(at(40, 40)).toBe(COLOR.SEA);
  });

  it('paints OSM walkways, buildings and water over the satellite', () => {
    expect(at(-30, 0)).toBe(COLOR.PATH); // footway through the jungle
    expect(at(-30, 5)).toBe(COLOR.FOREST);
    expect(at(0, 35)).toBe(COLOR.STONE); // building footprint → built ground
    expect(at(-20, 70)).toBe(COLOR.SEA); // natural=water → lagoon
  });

  it('marks everything beyond the park outline + margin as outside', () => {
    expect(outsideAt(0, 0)).toBe(0);
    expect(outsideAt(70, 0)).toBe(0); // within the 25 m margin
    expect(outsideAt(-95, -95)).toBe(1);
    expect(outsideAt(0, 98)).toBe(1);
  });

  it('leaves no unknown pixels and no painted overlays', () => {
    expect(out.cls.includes(COLOR.UNKNOWN)).toBe(false);
    expect(out.forced.every((v) => v === 0)).toBe(true);
    expect(out.osmSea.every((v) => v === 0)).toBe(true); // no seaCorner
  });

  it('uses sources.outline (local meters) instead of the OSM outline', () => {
    // a western strip only: the OSM square's eastern half becomes outside
    const outline = [
      [-90, -40],
      [-20, -40],
      [-20, 40],
      [-90, 40],
    ];
    const own = classifySatelliteRaster({
      grid,
      blurRGB: syntheticImage(),
      osm,
      park: { sources: { osmPark: 'way/999999', outline } }, // osmPark not looked up
    });
    const outsideOwn = (x, z) => own.outside[(z + N / 2) * N + (x + N / 2)];
    expect(outsideOwn(-80, 0)).toBe(0); // beyond the OSM square, inside the outline
    expect(outsideOwn(0, 0)).toBe(0); // within the 25 m margin
    expect(outsideOwn(40, 0)).toBe(1); // inside the OSM square, far from the outline
    expect(outsideOwn(-50, 80)).toBe(1);
  });

  it('fails clearly when the park outline is missing', () => {
    expect(() => classifySatelliteRaster({ grid, blurRGB: syntheticImage(), osm, park: { sources: { osmPark: 'way/999999' } } })).toThrow(
      /osmBBox/,
    );
  });
});

describe('roofFromSatellite', () => {
  it('votes tile, thatch and flat roofs from the satellite color', () => {
    expect(roofFromSatellite(185, 105, 80)).toBe('tile');
    expect(roofFromSatellite(150, 125, 85)).toBe('thatch');
    expect(roofFromSatellite(225, 222, 215)).toBe('white');
    expect(roofFromSatellite(120, 122, 125)).toBe('stone');
  });
});
