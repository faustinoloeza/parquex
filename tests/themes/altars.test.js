import { describe, expect, it } from 'vitest';
import { ALTAR_STYLES, altarGeometry } from '../../src/themes/muertos/altars.js';
import { minstd } from '../../shared/random.js';
import { ALTAR_ROWS } from '../../src/parks/xc/festival-places.js';

describe('Día de Muertos altars', () => {
  it('builds every style as one colored geometry with candles about 5 m wide', () => {
    for (const style of Object.keys(ALTAR_STYLES)) {
      const { geometry, candles, bulbs } = altarGeometry(style, minstd(1));
      expect(geometry.getAttribute('position').count, style).toBeGreaterThan(100);
      expect(geometry.getAttribute('color'), style).toBeTruthy();
      expect(candles.length, style).toBeGreaterThan(5);
      geometry.computeBoundingBox();
      const { min, max } = geometry.boundingBox;
      expect(max.x - min.x, style).toBeLessThan(6);
      expect(min.y, style).toBeGreaterThanOrEqual(-0.05); // flowers may sit a little into the ground
      for (const c of candles) expect(c[3], style).toMatch(/^#[0-9a-f]{6}$/i);
      expect(Array.isArray(bulbs)).toBe(true);
    }
  });

  it('lines the rows with known styles', () => {
    for (const row of ALTAR_ROWS) for (const s of row.styles) expect(Object.keys(ALTAR_STYLES)).toContain(s);
  });
});
