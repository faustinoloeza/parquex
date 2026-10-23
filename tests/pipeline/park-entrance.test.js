// park.json → entrance: the start of simulated walks, for the mobile app.
import { describe, expect, it } from 'vitest';
import { parkEntrance } from '../../pipeline/stages/park-data.js';

const pois = [
  { x: 10, z: 20, active: true, name: { es: 'Restaurante' } },
  { x: -5.123, z: 7.456, active: true, name: { es: 'Entrada' } },
];

describe('park entrance', () => {
  it('uses the definition override (sources.entrance) first', () => {
    expect(parkEntrance({ pois }, { x: 140, z: -14 })).toEqual({ x: 140, z: -14 });
  });

  it('else the activity named like the entrance, rounded to 1 cm, without its name', () => {
    expect(parkEntrance({ pois })).toEqual({ x: -5.12, z: 7.46 });
  });

  it('else the center of the designed area', () => {
    expect(parkEntrance({ pois: [], clear: { cx: 3, cz: -4 } })).toEqual({ x: 3, z: -4 });
  });
});
