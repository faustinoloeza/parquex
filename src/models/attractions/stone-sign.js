import * as THREE from 'three';
import { std } from '../../graphics/materials.js';
import { canvasTexture } from '../../graphics/textures.js';
import { markShared } from '../../graphics/memory.js';
import { rock } from '../parts/rock.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Face of the boulder (m): width and height. */
const FACE = [3.2, 1.4];

/**
 * Activity sign carved in a limestone boulder (visitors' photo of «52 JAGUARES
 * Y PUMAS», 2026): the activity number on a white disc ringed by a Mayan fret,
 * the name in dark letters and the opening hours on a black plate, among
 * smaller boulders. The front faces +z.
 */
export default defineModel({
  type: 'stoneSign',
  label: 'Letrero de piedra de actividad',
  params: { number: 1, lines: ['NOMBRE'], hours: '' },
  footprint: () => ({ rect: [FACE[0] + 1, 1.4] }),
  build(p) {
    const k = new ModelKit();
    const [W, H] = FACE;
    k.add('sandstone', new THREE.BoxGeometry(W, H, 0.9, 3, 2, 1).translate(0, H / 2, 0), 0, -0.05, 0);
    k.add('sandstone', rock(0.75, 3), -W / 2 - 0.5, 0.2, 0.2, 0.4);
    k.add('sandstone', rock(0.9, 7), W / 2 + 0.55, 0.25, 0.1, 1.1);
    k.add('sandstone', rock(0.5, 9), W / 2 + 0.2, 0.1, 0.75, 2.2);
    const face = new THREE.PlaneGeometry(W - 0.1, H - 0.1);
    k.add('signFace', face, 0, H / 2 - 0.05, 0.46, 0, false);
    return { object: k.build({ signFace: faceMaterial(p) }) };
  },
});

const faces = new Map();

/** Carving of the sign on transparency: number disc with a fret ring, name, hours plate. */
function faceMaterial({ number, lines, hours }) {
  const key = `${number}|${lines.join('|')}|${hours}`;
  if (faces.has(key)) return faces.get(key);
  const map = canvasTexture(
    `stoneSign:${key}`,
    512,
    (g, s) => {
      g.clearRect(0, 0, s, s);
      // the plane is W × H (≈ 2.3 : 1): draw in the middle band of the square
      const top = s * 0.28,
        h = s * 0.44;
      const cx = s * 0.16,
        cy = top + h * 0.4,
        r = h * 0.38;
      g.fillStyle = '#4a2c1e';
      g.beginPath();
      g.arc(cx, cy, r, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#f2efe6';
      g.beginPath();
      g.arc(cx, cy, r * 0.68, 0, Math.PI * 2);
      g.fill();
      // fret: small hooks around the ring
      g.strokeStyle = '#f2efe6';
      g.lineWidth = 2;
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2;
        const x = cx + Math.cos(a) * r * 0.84,
          y = cy + Math.sin(a) * r * 0.84;
        g.strokeRect(x - 3, y - 3, 6, 6);
      }
      g.fillStyle = '#26211d';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.font = `bold ${r * 0.85}px Arial, sans-serif`;
      g.fillText(String(number), cx, cy + 2);
      g.fillStyle = '#4a2c1e';
      g.font = `bold ${h * 0.24}px Arial Black, Arial, sans-serif`;
      lines.forEach((line, i) => g.fillText(line, s * 0.62, top + h * (0.28 + i * 0.32)));
      if (hours) {
        g.fillStyle = '#151515';
        g.fillRect(s * 0.06, top + h * 0.8, s * 0.28, h * 0.17);
        g.fillStyle = '#f2efe6';
        g.font = `${h * 0.11}px Arial, sans-serif`;
        g.fillText(hours, s * 0.2, top + h * 0.885);
      }
    },
    false,
  );
  map.repeat.set(1, 0.44);
  map.offset.set(0, 0.28);
  const m = markShared(std(0xffffff, { map, alphaTest: 0.5 }));
  faces.set(key, m);
  return m;
}
