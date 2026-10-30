// Downloads the program of Xcaret's Festival de Vida y Muerte (its activities,
// places and times for every day, in Spanish and English) into
// public/parks/xc/festival.json, for the Día de Muertos theme
// (src/themes/muertos/festival.js). The festival's site does not allow other
// sites to ask its API (no CORS), so the map reads this copy.
//
// Usage: node pipeline/fetch-festival.js   (pnpm data:festival)
import fs from 'node:fs/promises';
import path from 'node:path';
import { FESTIVAL } from '../src/themes/muertos/festival.js';
import { groupProgram } from './lib/festival-program.js';

async function sessions(language) {
  const res = await fetch(FESTIVAL.api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'xcaret-maps-3d/0.1' },
    body: JSON.stringify({ language, eventCode: FESTIVAL.eventCode }),
  });
  if (!res.ok) throw new Error(`${res.status} ${FESTIVAL.api} (${language})`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error(`${FESTIVAL.api} (${language}): not a list`);
  return data;
}

const [es, en] = await Promise.all([sessions('es'), sessions('en')]);
const program = groupProgram(es, en);
const file = path.join('public/parks', FESTIVAL.park, FESTIVAL.file);
await fs.writeFile(
  file,
  JSON.stringify({ event: FESTIVAL.eventCode, source: FESTIVAL.source, fetched: new Date().toISOString().slice(0, 10), ...program }),
);
const count = program.activities.reduce((n, a) => n + a.sessions.length, 0);
console.log(`${file}: ${program.activities.length} activities, ${count} sessions, days ${program.days.join(', ')}`);
