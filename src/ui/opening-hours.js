// Opening hours in park local time (Quintana Roo, UTC-5 all year).
const TIME_ZONE = 'America/Cancun';

function nowMinutes() {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(
    new Date(),
  );
  const h = +parts.find((p) => p.type === 'hour').value,
    m = +parts.find((p) => p.type === 'minute').value;
  return (h % 24) * 60 + m;
}

const toMinutes = (s) => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};

/**
 * @param {string} range e.g. "12:00-19:00"
 * @returns {{ open: boolean, from: string, to: string } | null}
 */
export function openState(range) {
  const m = /(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/.exec(range ?? '');
  if (!m) return null;
  const now = nowMinutes(),
    a = toMinutes(m[1]),
    b = toMinutes(m[2]);
  return { open: now >= a && now < b, from: m[1], to: m[2] };
}
