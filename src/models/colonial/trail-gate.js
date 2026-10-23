import * as THREE from 'three';
import { solidColor, worldUV } from '../../graphics/geometry.js';
import { std } from '../../graphics/materials.js';
import { canvasTexture } from '../../graphics/textures.js';
import { markShared } from '../../graphics/memory.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Opening (m): width and height under the wooden lintel. */
const OPEN = [4.6, 3.4];
/** Pillar width and depth, depth of the panel above. */
const PILLAR = 1.6,
  DEPTH = 1.2;
const BRICK = '#9a4b37',
  BEAM = '#5b3a24';

/**
 * Colonial gate at the start of the «Sendero de Selva al Río del Paraíso»
 * (activity 6; visitors' photo, 2026): pale flagstone pillars with brick
 * capitals, a wooden lintel with five beam ends sticking out, a panel with the
 * trail's name in dark letters, and a wavy crest pierced by two round oculi,
 * the lower one framed by a brick-colored band; a small statue on the right
 * pillar. Low stone walls run along the path behind it. The front faces +z.
 */
export default defineModel({
  type: 'trailGate',
  label: 'Puerta colonial de sendero',
  params: { text: ['Sendero de Selva', 'al Río del Paraíso'] },
  footprint: () => ({ rect: [OPEN[0] + 2 * PILLAR + 0.4, DEPTH + 0.4] }),
  build(p) {
    const k = new ModelKit();
    const [W, H] = OPEN;
    const half = W / 2 + PILLAR;
    const paint = (g, hex, x = 0, y = 0, z = 0) => k.add('vertex', solidColor(g.toNonIndexed(), hex), x, y, z, 0, false);
    // pillars with brick capitals
    for (const s of [-1, 1]) {
      const x = s * (W / 2 + PILLAR / 2);
      k.box('limestone', PILLAR, 5.2, DEPTH + 0.3, x, 0, 0);
      paint(new THREE.BoxGeometry(PILLAR + 0.35, 0.32, DEPTH + 0.6).translate(0, 0.16, 0), BRICK, x, 5.2, 0);
      paint(new THREE.BoxGeometry(PILLAR + 0.15, 0.2, DEPTH + 0.45).translate(0, 0.1, 0), '#b8654c', x, 5.0, 0);
    }
    // wooden lintel and beam ends
    paint(new THREE.BoxGeometry(W + 0.6, 0.45, 0.5).translate(0, 0.22, 0), BEAM, 0, H, DEPTH / 2 - 0.1);
    for (let i = 0; i < 5; i++)
      paint(new THREE.BoxGeometry(0.42, 0.4, 1.1).translate(0, 0.2, 0), BEAM, -1.8 + i * 0.9, H + 0.45, DEPTH / 2 + 0.1);
    // panel with the name, wavy crest with two oculi (extruded profile with holes)
    k.box('limestone', W + 0.2, 1.75, DEPTH - 0.2, 0, H + 0.45, 0);
    const crest = crestGeometry(half - 0.2);
    k.add('limestone', crest, 0, H + 2.2, -DEPTH / 2 + 0.1);
    const band = bandGeometry();
    paint(band, BRICK, 0, H + 2.2, DEPTH / 2 - 0.08);
    const sign = new THREE.PlaneGeometry(W - 0.2, 1.2);
    k.add('gateText', sign, 0, H + 1.5, DEPTH / 2 - 0.08 + 0.02, 0, false);
    // small stone finials and the statue on the right pillar
    paint(new THREE.SphereGeometry(0.28, 8, 6).scale(1, 1.5, 1), '#cfc7b5', -(W / 2 + PILLAR / 2), 5.85, 0);
    paint(new THREE.CylinderGeometry(0.22, 0.3, 1.3, 8).translate(0, 0.65, 0), '#b9ad97', W / 2 + PILLAR / 2, 5.52, 0);
    paint(new THREE.SphereGeometry(0.2, 8, 6), '#b9ad97', W / 2 + PILLAR / 2, 7.0, 0);
    // low stone walls along the path behind the gate
    for (const s of [-1, 1]) k.box('rockwall', 0.6, 1.0, 5, s * (W / 2 - 0.3), 0, -DEPTH / 2 - 2.5);
    return { object: k.build({ gateText: textMaterial(p.text) }) };
  },
});

/** Wavy crest above the panel: scalloped outline rising to a round top, with a big oculus and a small one above. */
function crestGeometry(halfWidth) {
  const outline = [];
  const n = 24;
  for (let i = 0; i <= n; i++) {
    const t = i / n; // 0 → 1 across
    const x = (t - 0.5) * 2 * halfWidth;
    const u = Math.abs(t - 0.5) * 2; // 0 middle → 1 ends
    const y = 0.4 + 2.6 * Math.cos((u * Math.PI) / 2) ** 2 + 0.35 * Math.sin(u * Math.PI * 2.5) * (1 - u);
    outline.push([x, Math.max(0, y)]);
  }
  const shape = new THREE.Shape();
  shape.moveTo(-halfWidth, 0);
  for (const [x, y] of outline) shape.lineTo(x, y);
  shape.lineTo(halfWidth, 0);
  shape.lineTo(-halfWidth, 0);
  const hole = (cx, cy, r) => new THREE.Path().absarc(cx, cy, r, 0, Math.PI * 2, true);
  shape.holes.push(hole(0, 1.05, 0.55), hole(0, 2.45, 0.38));
  const g = new THREE.ExtrudeGeometry(shape, { depth: DEPTH - 0.3, bevelEnabled: false, curveSegments: 12 });
  return worldUV(g, 0.25);
}

/** Brick-colored arching band over the big oculus (front face). */
function bandGeometry() {
  const s = new THREE.Shape();
  s.absarc(0, 1.05, 1.15, 0, Math.PI, false);
  s.absarc(0, 1.05, 0.9, Math.PI, 0, true);
  return new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: false, curveSegments: 12 });
}

const textMaterials = new Map();

/** The trail's name in dark, hand-cut letters on transparency, two lines. */
function textMaterial(lines) {
  const key = lines.join('|');
  if (textMaterials.has(key)) return textMaterials.get(key);
  const map = canvasTexture(
    `gateText:${key}`,
    512,
    (g, s) => {
      g.clearRect(0, 0, s, s);
      g.fillStyle = '#3b2a1e';
      g.textAlign = 'center';
      g.font = `bold ${s * 0.085}px Georgia, serif`;
      lines.forEach((line, i) => g.fillText(line, s / 2, s * (0.45 + i * 0.13)));
    },
    false,
  );
  map.repeat.set(1, 0.32);
  map.offset.set(0, 0.36);
  const m = markShared(std(0xffffff, { map, alphaTest: 0.5 }));
  textMaterials.set(key, m);
  return m;
}
