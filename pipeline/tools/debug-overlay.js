// Renders the generated data (routes, buildings, services, activities,
// landmarks, walkways) over the official illustration to check alignment
// (satellite-mode parks: over the satellite image, plus the designed area).
//
// Usage: node pipeline/tools/debug-overlay.js [park] [x0,z0,size]   (NOPOI=1 hides activities)
// Output: data/debug/<park>-overlay.jpg
import fs from 'node:fs/promises';
import sharp from 'sharp';
import { PARKS } from '#parks/index.js';

const key = process.argv[2] ?? 'xc';
const [x0, z0, size] = (process.argv[3] ?? '').split(',').map(Number);
const park = JSON.parse(await fs.readFile(`public/parks/${key}/park.json`, 'utf8'));
const { cx, cz, size: S } = park.extent;
const crop = size ? { x0, z0, size } : { x0: cx - S / 2, z0: cz - S / 2, size: S };
const OUT = 1400;
const px = (x, z) => [((x - crop.x0) / crop.size) * OUT, ((z - crop.z0) / crop.size) * OUT];
const pts = (l) =>
  l
    .map((p) =>
      px(...p)
        .map((v) => v.toFixed(1))
        .join(','),
    )
    .join(' ');
const satellite = PARKS[key].sources.mode === 'satellite';
let svg = `<svg width="${OUT}" height="${OUT}" xmlns="http://www.w3.org/2000/svg">`;
if (satellite) {
  // designed-area outline and OSM walkway network
  const { cx: ax, cz: az, radii } = park.clear;
  const ring = radii.map((r, i) => {
    const a = (i / radii.length) * Math.PI * 2;
    return [ax + Math.cos(a) * r, az + Math.sin(a) * r];
  });
  svg += `<polygon points="${pts(ring)}" fill="none" stroke="#ff00ff" stroke-width="2" stroke-dasharray="8 5"/>`;
  for (const l of park.walkways ?? []) svg += `<polyline points="${pts(l)}" fill="none" stroke="#ffe600" stroke-width="2"/>`;
}
for (const r of park.routes)
  for (const l of r.lines) {
    svg += `<polyline points="${l
      .map((p) =>
        px(...p)
          .map((v) => v.toFixed(1))
          .join(','),
      )
      .join(' ')}" fill="none" stroke="${r.casing}" stroke-width="5"/>`;
    svg += `<polyline points="${l
      .map((p) =>
        px(...p)
          .map((v) => v.toFixed(1))
          .join(','),
      )
      .join(' ')}" fill="none" stroke="${r.color}" stroke-width="2.5"/>`;
  }
const blds = JSON.parse(await fs.readFile(`public/parks/${key}/buildings.json`, 'utf8'));
for (const b of blds) {
  const { cx, cz, length, width, angle } = b.box;
  const [u, v] = px(cx, cz);
  const k = OUT / crop.size;
  svg += `<rect x="${(-length / 2) * k}" y="${(-width / 2) * k}" width="${length * k}" height="${width * k}" transform="translate(${u},${v}) rotate(${(angle * 180) / Math.PI})" fill="rgba(255,0,0,0.25)" stroke="#f00" stroke-width="1"/>`;
}
const SC = { wc: '#00a2ff', locker: '#ffb000', 'first-aid': '#ff2020', wheelchair: '#a020f0', ramp: '#ff6a00' };
for (const s of park.services ?? []) {
  const [u, v] = px(s.x, s.z);
  svg += `<rect x="${u - 6}" y="${v - 6}" width="12" height="12" fill="${SC[s.type]}" stroke="#000"/>`;
}
for (const p of process.env.NOPOI ? [] : park.pois) {
  const [u, v] = px(p.x, p.z);
  svg += `<circle cx="${u}" cy="${v}" r="4" fill="#102734" stroke="#76d1ff"/><text x="${u + 5}" y="${v + 4}" font-size="11" fill="#fff" stroke="#000" stroke-width="0.4">${p.number}</text>`;
}
for (const l of PARKS[key].landmarks) {
  const [u, v] = px(l.x, l.z);
  const r = ((l.clear || l.radius || 8) / crop.size) * OUT;
  svg += `<circle cx="${u}" cy="${v}" r="${r}" fill="none" stroke="#ff00ff" stroke-width="2"/><text x="${u + 4}" y="${v - 4}" font-size="13" fill="#ff0" stroke="#000" stroke-width="0.5">${l.id}</text>`;
}
svg += '</svg>';
const ill = satellite ? `data/raw/${key}-satellite.jpg` : `data/raw/${key}-illustration.png`;
const meta = await sharp(ill).metadata();
const k = meta.width / S;
const left = Math.round((crop.x0 - (cx - S / 2)) * k),
  top = Math.round((crop.z0 - (cz - S / 2)) * k),
  w = Math.round(crop.size * k);
const base = await sharp(ill).extract({ left, top, width: w, height: w }).resize(OUT, OUT).toBuffer();
await fs.mkdir('data/debug', { recursive: true });
await sharp(base)
  .composite([{ input: Buffer.from(svg) }])
  .jpeg({ quality: 85 })
  .toFile(`data/debug/${key}-overlay.jpg`);
console.log('ok');
