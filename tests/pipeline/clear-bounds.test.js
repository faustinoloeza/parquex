import { describe, expect, it } from 'vitest';
import { clearBounds } from '../../pipeline/stages/park-data.js';

describe('clearBounds', () => {
  it('frames a circular designed area with a margin', () => {
    const b = clearBounds({ cx: 100, cz: -50, radii: Array(72).fill(200) });
    expect(b).toEqual({ x0: -120, x1: 320, z0: -270, z1: 170 });
  });

  it('follows an off-center outline', () => {
    const radii = Array.from({ length: 4 }, (_, i) => [300, 100, 50, 100][i]);
    expect(clearBounds({ cx: 0, cz: 0, radii })).toEqual({ x0: -70, x1: 320, z0: -120, z1: 120 });
  });
});
