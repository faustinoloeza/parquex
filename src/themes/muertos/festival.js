// Xcaret's Festival de Vida y Muerte (src/themes/muertos): where its program
// comes from (pipeline/fetch-festival.js → public/parks/xc/festival.json) and
// how the map reads it — the day to show, its sessions by time, its places.
import { PARK_UTC_OFFSET } from '../../app/time-of-day.js';
import { LOCALES } from '../../i18n/index.js';

export const FESTIVAL = {
  park: 'xc',
  name: {
    es: 'Festival de Vida y Muerte',
    en: 'Life and Death Festival',
    zh: '生与死节',
    ja: '生と死の祭典',
    fr: 'Festival de la Vie et de la Mort',
    pt: 'Festival da Vida e da Morte',
    ko: '삶과 죽음의 축제',
    ar: 'مهرجان الحياة والموت',
    it: 'Festival della Vita e della Morte',
    hi: 'जीवन और मृत्यु उत्सव',
  },
  eventCode: 'FTVYM_2026',
  // the festival site's own endpoint (POST { language, eventCode }); no CORS, so
  // only the pipeline asks it
  api: 'https://www.festivaldevidaymuerte.com/api/getActFest',
  source: 'https://www.festivaldevidaymuerte.com/es/actividades-culturales-y-artisticas/',
  file: 'festival.json',
};

/**
 * @typedef {object} FestivalActivity
 * @property {string} id
 * @property {{ es: string, en: string }} name
 * @property {{ es: string, en: string }} desc
 * @property {{ es: string, en: string }} category
 * @property {string} place      the festival's place name (src/parks/xc/festival-places.js)
 * @property {boolean} extraCost
 * @property {{ date: string, start: string, end: string | null }[]} sessions  date "YYYY-MM-DD", times "HH:MM"
 *
 * @typedef {{ event: string, source: string, fetched: string, days: string[], activities: FestivalActivity[] }} FestivalProgram
 */

/**
 * "YYYY-MM-DD" of a moment in park time.
 * @param {Date | number} [date]
 */
export function parkDate(date = Date.now()) {
  const ms = typeof date === 'number' ? date : date.getTime();
  return new Date(ms + PARK_UTC_OFFSET * 3_600_000).toISOString().slice(0, 10);
}

/**
 * Day of the program to show: today on a festival day, else the next one, else
 * the last one (the festival is over).
 * @param {string[]} days sorted
 * @param {Date | number} [date]
 */
export function festivalDay(days, date = Date.now()) {
  const today = parkDate(date);
  return days.includes(today) ? today : (days.find((d) => d > today) ?? days.at(-1));
}

/**
 * Sessions of a day by start time (then name): { activity, start, end }.
 * @param {FestivalProgram} program
 * @param {string} day
 */
export function sessionsOn(program, day) {
  const out = [];
  for (const activity of program.activities)
    for (const s of activity.sessions) if (s.date === day) out.push({ activity, start: s.start, end: s.end });
  return out.sort((a, b) => a.start.localeCompare(b.start) || a.activity.name.es.localeCompare(b.activity.name.es));
}

/**
 * Places with sessions that day and how many: Map place → count.
 * @param {FestivalProgram} program
 * @param {string} day
 */
export function placesOn(program, day) {
  const counts = new Map();
  for (const { activity } of sessionsOn(program, day)) counts.set(activity.place, (counts.get(activity.place) ?? 0) + 1);
  return counts;
}

/**
 * Short label of a day ("30 oct", "Oct 30").
 * @param {string} day "YYYY-MM-DD"
 * @param {string} lang
 */
export function dayLabel(day, lang) {
  return new Date(`${day}T12:00:00Z`)
    .toLocaleDateString(LOCALES[lang] ?? 'es-MX', { day: 'numeric', month: 'short', timeZone: 'UTC' })
    .replace('.', '');
}
