import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { dayLabel, festivalDay, placesOn, sessionsOn } from '../../src/themes/muertos/festival.js';
import { groupProgram } from '../../pipeline/lib/festival-program.js';
import xcPlaces from '../../src/parks/xc/festival-places.js';

// park time is UTC−5 all year (America/Cancun)
const park = (iso) => new Date(`${iso}-05:00`);
const entry = (id, date, start, name, place, extra = {}) => ({
  id,
  date,
  timeStart: start,
  timeEnd: null,
  activityName: name,
  activityDescription: `${name}…`,
  categoryName: 'Música',
  placeName: place,
  ...extra,
});

describe('festival program (Día de Muertos theme)', () => {
  const es = [
    entry('1', '2026-10-31', '16:00', 'Charanga', 'Panteón '),
    entry('2', '2026-10-30', '18:00', 'Charanga', 'Panteón'),
    entry('3', '2026-10-30', '18:00', 'Charanga', 'Panteón'), // same session twice
    entry('4', '2026-10-30', '15:45', 'Foto Festival (Costo Adicional)', 'Palapa Tequila'),
    entry('5', '2026-10-30', '', 'Sin hora', 'Kiosco'),
  ];
  const en = [
    entry('1', '2026-10-31', '16:00', 'Brass band', 'Panteón', { categoryName: null }),
    entry('4', '2026-10-30', '15:45', '', ''),
  ];
  const program = groupProgram(es, en);

  it('groups the sessions by activity, without repeats or entries lacking a time', () => {
    expect(program.days).toEqual(['2026-10-30', '2026-10-31']);
    expect(program.activities.map((a) => [a.id, a.sessions.length])).toEqual([
      ['charanga@panteon', 2],
      ['foto-festival-costo-adicional@palapa-tequila', 1],
    ]);
    const [charanga, foto] = program.activities;
    expect(charanga.place).toBe('Panteón');
    expect(charanga.sessions.map((s) => `${s.date} ${s.start}`)).toEqual(['2026-10-30 18:00', '2026-10-31 16:00']);
    // English from the same id, Spanish where English is empty
    expect(charanga.name).toEqual({ es: 'Charanga', en: 'Brass band' });
    expect(charanga.category).toEqual({ es: 'Música', en: 'Música' });
    expect(foto.name.en).toBe(foto.name.es);
    expect([charanga.extraCost, foto.extraCost]).toEqual([false, true]);
  });

  it('lists a day by start time and counts its places', () => {
    expect(sessionsOn(program, '2026-10-30').map((s) => s.start)).toEqual(['15:45', '18:00']);
    expect([...placesOn(program, '2026-10-30')]).toEqual([
      ['Palapa Tequila', 1],
      ['Panteón', 1],
    ]);
  });

  it('shows today on a festival day, else the next one, else the last', () => {
    const days = ['2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02'];
    expect(festivalDay(days, park('2026-10-15T12:00:00'))).toBe('2026-10-30');
    expect(festivalDay(days, park('2026-10-31T23:30:00'))).toBe('2026-10-31'); // already Nov 1 in UTC
    expect(festivalDay(days, park('2026-11-20T12:00:00'))).toBe('2026-11-02');
    expect(dayLabel('2026-11-01', 'es')).toBe('1 nov');
  });

  it('knows every place of the downloaded program (located or listed without a marker)', () => {
    const file = JSON.parse(readFileSync(new URL('../../public/parks/xc/festival.json', import.meta.url), 'utf8'));
    for (const a of file.activities) expect(Object.keys(xcPlaces)).toContain(a.place);
  });
});
