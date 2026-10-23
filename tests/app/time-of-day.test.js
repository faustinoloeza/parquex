// Day / night: 'auto' is night from 19:00 to 06:00 in the parks' local time
// (America/Cancun, UTC−5 all year), whatever the device's own time zone.
import { describe, expect, it } from 'vitest';
import { forcedTimeMode, isNightAt, nightFor, parkHour, PARK_UTC_OFFSET, TIME_MODES } from '../../src/app/time-of-day.js';

/** A moment given in park local time (UTC−5). */
const cancun = (iso) => new Date(`${iso}-05:00`);

describe('time of day', () => {
  it('reads the hour in America/Cancun (UTC−5, no daylight saving time)', () => {
    expect(PARK_UTC_OFFSET).toBe(-5);
    expect(parkHour(new Date('2026-10-16T00:00:00Z'))).toBe(19);
    expect(parkHour(new Date('2026-07-01T12:30:00Z'))).toBe(7.5); // summer: still UTC−5
    expect(parkHour(new Date('2026-01-15T04:00:00Z'))).toBe(23);
    // matches the IANA zone where the runtime has it
    const intl = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Cancun', hour: 'numeric', hourCycle: 'h23' });
    for (const iso of ['2026-03-08T12:00:00Z', '2026-11-01T06:00:00Z', '2026-06-21T23:59:00Z']) {
      expect(Math.floor(parkHour(new Date(iso)))).toBe(+intl.format(new Date(iso)));
    }
  });

  it('is night from 19:00 to 06:00 park time', () => {
    expect(isNightAt(cancun('2026-10-16T18:59:59'))).toBe(false);
    expect(isNightAt(cancun('2026-10-16T19:00:00'))).toBe(true);
    expect(isNightAt(cancun('2026-10-16T23:30:00'))).toBe(true);
    expect(isNightAt(cancun('2026-10-17T00:00:00'))).toBe(true);
    expect(isNightAt(cancun('2026-10-17T05:59:59'))).toBe(true);
    expect(isNightAt(cancun('2026-10-17T06:00:00'))).toBe(false);
    expect(isNightAt(cancun('2026-10-17T12:00:00'))).toBe(false);
  });

  it('follows the settings mode', () => {
    expect(TIME_MODES).toEqual(['auto', 'day', 'night']);
    const evening = cancun('2026-10-16T20:00:00'),
      noon = cancun('2026-10-16T12:00:00');
    expect(nightFor('auto', evening)).toBe(true);
    expect(nightFor('auto', noon)).toBe(false);
    expect(nightFor('day', evening)).toBe(false);
    expect(nightFor('night', noon)).toBe(true);
    expect(nightFor('unknown', evening)).toBe(true); // like 'auto'
  });

  it('can be forced from the URL for screenshots', () => {
    expect(forcedTimeMode('?still&night')).toBe('night');
    expect(forcedTimeMode('?day')).toBe('day');
    expect(forcedTimeMode('?still')).toBe(null);
  });
});
