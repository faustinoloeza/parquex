import { describe, expect, it } from 'vitest';
import { THEMES, THEME_MODES, activeTheme, forcedThemeMode, inSeason, parkMonthDay, themeModes } from '../../src/themes/index.js';

// park time is UTC−5 all year (America/Cancun)
const park = (iso) => new Date(`${iso}-05:00`);

describe('seasonal themes', () => {
  it('reads the day in park time, not UTC', () => {
    // 30 Sep 22:00 in the park is already 1 Oct in UTC
    expect(parkMonthDay(park('2026-09-30T22:00:00'))).toEqual([9, 30]);
    expect(parkMonthDay(park('2026-11-02T23:30:00'))).toEqual([11, 2]);
  });

  it('shows Día de Muertos from October 1 to November 2, then never', () => {
    expect(activeTheme('auto', park('2026-09-30T23:59:59'))).toBeNull();
    expect(activeTheme('auto', park('2026-10-01T00:00:00'))?.key).toBe('muertos');
    expect(activeTheme('auto', park('2026-11-02T23:59:59'))?.key).toBe('muertos');
    expect(activeTheme('auto', park('2026-11-03T00:00:00'))).toBeNull();
    // and again next year
    expect(activeTheme('auto', park('2027-10-15T12:00:00'))?.key).toBe('muertos');
  });

  it('cannot be picked out of its season, from the settings or the URL', () => {
    expect(activeTheme('muertos', park('2026-11-20T12:00:00'))).toBeNull();
    expect(activeTheme('muertos', park('2026-06-15T12:00:00'))).toBeNull();
    expect(themeModes(park('2026-11-03T08:00:00'))).toEqual([]);
  });

  it('in season, lets the settings choose it or the classic look', () => {
    const day = park('2026-10-31T20:00:00');
    expect(themeModes(day)).toEqual(['auto', 'muertos', 'classic']);
    expect(activeTheme('muertos', day)?.key).toBe('muertos');
    expect(activeTheme('classic', day)).toBeNull();
    // unknown modes behave like auto
    expect(activeTheme('nope', day)?.key).toBe('muertos');
  });

  it('handles seasons that wrap the new year', () => {
    const winter = { season: { from: [12, 15], to: [1, 6] } };
    expect(inSeason(winter, park('2026-12-24T12:00:00'))).toBe(true);
    expect(inSeason(winter, park('2027-01-06T23:00:00'))).toBe(true);
    expect(inSeason(winter, park('2027-01-07T00:00:00'))).toBe(false);
    expect(inSeason(winter, park('2026-12-14T23:59:00'))).toBe(false);
  });

  it('knows every mode for saved choices and reads ?theme', () => {
    expect(THEME_MODES).toEqual(['auto', ...Object.keys(THEMES), 'classic']);
    expect(forcedThemeMode('?theme=muertos')).toBe('muertos');
    expect(forcedThemeMode('?theme=classic')).toBe('classic');
    expect(forcedThemeMode('?theme=xmas&night')).toBeNull();
    expect(forcedThemeMode('')).toBeNull();
  });
});
