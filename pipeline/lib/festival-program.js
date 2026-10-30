// The festival's activities as its API sends them (one entry per session and
// language) → the program file of the Día de Muertos theme
// (src/themes/muertos/festival.js → FestivalProgram).

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Groups the sessions by activity (name and place in Spanish). Like the
 * festival's own page, entries without a name or start time are dropped and
 * repeated ones (same name, place, start and date) kept once. English comes
 * from the entry with the same id (empty English fields fall back to Spanish).
 * @param {object[]} es  API entries in Spanish
 * @param {object[]} en  API entries in English
 * @returns {{ days: string[], activities: object[] }}
 */
export function groupProgram(es, en) {
  const english = new Map(en.map((e) => [e.id, e]));
  const seen = new Set();
  const byActivity = new Map();
  for (const e of es) {
    const name = e.activityName?.trim();
    if (!name || !e.timeStart) continue;
    const place = (e.placeName ?? '').trim();
    const key = `${name}__${place}__${e.timeStart}__${e.date}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const id = `${slug(name)}@${slug(place)}`;
    if (!byActivity.has(id)) {
      const e2 = english.get(e.id) ?? {};
      const both = (a, b) => ({ es: (a ?? '').trim(), en: (b ?? '').trim() || (a ?? '').trim() });
      byActivity.set(id, {
        id,
        name: both(name, e2.activityName),
        desc: both(e.activityDescription, e2.activityDescription),
        category: both(e.categoryName, e2.categoryName),
        place,
        extraCost: /costo adicional/i.test(name),
        sessions: [],
      });
    }
    byActivity.get(id).sessions.push({ date: e.date, start: e.timeStart, end: e.timeEnd ?? null });
  }
  const activities = [...byActivity.values()];
  for (const a of activities) a.sessions.sort((x, y) => x.date.localeCompare(y.date) || x.start.localeCompare(y.start));
  const days = [...new Set(activities.flatMap((a) => a.sessions.map((s) => s.date)))].sort();
  return { days, activities };
}
