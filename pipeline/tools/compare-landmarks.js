// Side-by-side crops around landmarks with a 5 m grid and the landmark's
// center and clear radius, to check placements: illustration | satellite
// (satellite-mode parks: generated land cover | satellite).
//
// Usage: node pipeline/tools/compare-landmarks.js [park] [ids…]
//   ids: landmark ids and/or probes "x:z:radius" (any spot), separated by commas
//   or spaces. With npm, a probe starting with "-" must come after `--` or be
//   prefixed with "@" (npm takes "-170:-25:30" as one of its own options):
//     npm run data:compare xs -- -170:-25:30     npm run data:compare xs @-170:-25:30
// Output: data/debug/compare/<park>-NN.jpg (3 landmarks per sheet)
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { PARKS } from '#parks/index.js';
import { illustrationExtent, parkFrame } from '#shared/geo.js';

const key = process.argv[2] ?? 'xc';
const park = PARKS[key];
if (!park) throw new Error(`Unknown park "${key}" (known: ${Object.keys(PARKS).join(', ')})`);
// npm turns "-x:z:r" arguments into npm_config_* variables instead of passing them
const swallowed = Object.keys(process.env).filter((k) => /^npm_config_\d[\d.]*:_?[\d.]+:[\d.]+$/.test(k));
if (swallowed.length)
  throw new Error('npm took the negative probe as its own option: use `npm run data:compare <park> -- -x:z:r` or "@-x:z:r"');
const args = process.argv
  .slice(3)
  .flatMap((a) => a.split(','))
  .filter(Boolean);
const only = args.length ? args : undefined;
const satellite = park.sources.mode === 'satellite';
const ext = satellite ? parkFrame(park).extent : illustrationExtent(park.sources.illustration);
const LANDMARKS = park.landmarks;
const sources = [satellite ? `data/debug/${key}-landcover.png` : `data/raw/${key}-illustration.png`, `data/raw/${key}-satellite.jpg`];
const LABELS = [satellite ? 'LAND' : 'ILL', 'SAT'];
const metas = await Promise.all(sources.map((f) => sharp(f).metadata()));
const P = 420; // panel px

async function panel(i, box, mark) {
  const k = metas[i].width / ext.size;
  const left = Math.round((box[0] - ext.cx + ext.size / 2) * k),
    top = Math.round((box[1] - ext.cz + ext.size / 2) * k);
  const w = Math.round((box[2] - box[0]) * k);
  const sc = P / (box[2] - box[0]);
  let svg = `<svg width="${P}" height="${P}" xmlns="http://www.w3.org/2000/svg">`;
  for (let x = Math.ceil(box[0] / 5) * 5; x <= box[2]; x += 5) {
    const u = (x - box[0]) * sc;
    svg += `<line x1="${u}" y1="0" x2="${u}" y2="${P}" stroke="#ff0" stroke-width="${x % 10 ? 0.4 : 0.9}" opacity="0.5"/>`;
    if (x % 20 === 0) svg += `<text x="${u + 2}" y="11" font-size="11" fill="#ff0" stroke="#000" stroke-width="0.3">${x}</text>`;
  }
  for (let z = Math.ceil(box[1] / 5) * 5; z <= box[3]; z += 5) {
    const v = (z - box[1]) * sc;
    svg += `<line x1="0" y1="${v}" x2="${P}" y2="${v}" stroke="#0ff" stroke-width="${z % 10 ? 0.4 : 0.9}" opacity="0.5"/>`;
    if (z % 20 === 0) svg += `<text x="2" y="${v - 2}" font-size="11" fill="#0ff" stroke="#000" stroke-width="0.3">${z}</text>`;
  }
  const [mu, mv] = [(mark.x - box[0]) * sc, (mark.z - box[1]) * sc];
  svg += `<circle cx="${mu}" cy="${mv}" r="${mark.r * sc}" fill="none" stroke="#f0f" stroke-width="1.5"/><path d="M${mu - 6} ${mv}h12M${mu} ${mv - 6}v12" stroke="#f0f" stroke-width="2"/>`;
  svg += `<text x="${P - 4}" y="${P - 6}" text-anchor="end" font-size="14" font-weight="bold" fill="#fff" stroke="#000" stroke-width="0.6">${mark.id} ${LABELS[i]}</text></svg>`;
  const img = await sharp(sources[i]).extract({ left, top, width: w, height: w }).resize(P, P).toBuffer();
  return sharp(img)
    .composite([{ input: Buffer.from(svg) }])
    .png()
    .toBuffer();
}

// ad-hoc probes: "x:z:r" entries in the id list
const probes = (only ?? [])
  .map((s) => s.match(/^@?(-?[\d.]+):(-?[\d.]+):([\d.]+)$/))
  .filter(Boolean)
  .map(([id, x, z, r]) => ({ id: id.replace(/^@/, ''), x: +x, z: +z, clear: +r }));
const list = [...LANDMARKS.filter((l) => !only || only.includes(l.id)), ...probes];
const rows = [];
for (const l of list) {
  const r = l.radius ?? (l.size != null ? l.size / 2 : (l.clear ?? 10));
  const R = Math.max(25, (l.clear || r || 10) * 1.8, (l.length ?? 0) * 0.9);
  const box = [l.x - R, l.z - R, l.x + R, l.z + R];
  const mark = { x: l.x, z: l.z, r: l.clear || r || 8, id: l.id };
  rows.push(await Promise.all([panel(0, box, mark), panel(1, box, mark)]));
}
await fs.mkdir('data/debug/compare', { recursive: true });
const per = 3;
for (let s = 0; s < rows.length; s += per) {
  const chunk = rows.slice(s, s + per);
  const comp = [];
  chunk.forEach(([a, b], i) => {
    comp.push({ input: a, left: 0, top: i * (P + 6) }, { input: b, left: P + 6, top: i * (P + 6) });
  });
  const file = `data/debug/compare/${key}-${String(s / per).padStart(2, '0')}.jpg`;
  await sharp({ create: { width: 2 * P + 6, height: chunk.length * (P + 6), channels: 3, background: '#222' } })
    .composite(comp)
    .jpeg({ quality: 85 })
    .toFile(file);
  console.log(file, chunk.length);
}
