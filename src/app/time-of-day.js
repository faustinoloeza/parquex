// Time of day of the map (day / night) and the user's choice in the settings.
//
// 'auto' follows the clock of the parks (Quintana Roo, America/Cancun): night
// from 19:00 to 06:00. Quintana Roo is on UTC−5 all year (no daylight saving
// time since 2015), so a fixed offset gives the park's local time on any device,
// whatever its own time zone.

/** Offset (hours) of the parks' local time from UTC: America/Cancun, no DST. */
export const PARK_UTC_OFFSET = -5;
/** Local hours (park time) when night starts and ends in 'auto'. */
export const NIGHT_HOURS = { from: 19, to: 6 };
/** Choices of the settings menu. */
export const TIME_MODES = ['auto', 'day', 'night'];

/**
 * Hour of the day (0 ≤ h < 24, fractional) in the parks' local time.
 * @param {Date | number} [date]
 */
export function parkHour(date = Date.now()) {
  const ms = typeof date === 'number' ? date : date.getTime();
  const h = (ms / 3_600_000 + PARK_UTC_OFFSET) % 24;
  return h < 0 ? h + 24 : h;
}

/** True between 19:00 and 06:00 park time. */
export function isNightAt(date = Date.now()) {
  const h = parkHour(date);
  return h >= NIGHT_HOURS.from || h < NIGHT_HOURS.to;
}

/**
 * Whether the map shows night for a mode of the settings ('auto' | 'day' | 'night')
 * at a given moment; unknown modes behave like 'auto'.
 * @param {string} mode
 * @param {Date | number} [date]
 */
export function nightFor(mode, date = Date.now()) {
  if (mode === 'day') return false;
  if (mode === 'night') return true;
  return isNightAt(date);
}

/**
 * Mode forced from the URL for screenshots (?night / ?day), else null.
 * @param {string} [search]
 */
export function forcedTimeMode(search = typeof location === 'undefined' ? '' : location.search) {
  const params = new URLSearchParams(search);
  if (params.has('night')) return 'night';
  if (params.has('day')) return 'day';
  return null;
}
