import * as THREE from 'three';
import { releaseAfterUpload } from '../../graphics/memory.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { bearingDeg, haversineKm } from '#shared/geo.js';
import { std } from '../../graphics/materials.js';
import { rock } from '../parts/rock.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Sign colors: [background, text]. */
const SIGN_COLORS = {
  pink: ['#e2367f', '#fff'],
  yellow: ['#f3c234', '#1d1d1d'],
  green: ['#2fa34f', '#fff'],
  blue: ['#1d6fd0', '#fff'],
  red: ['#d5303a', '#fff'],
  black: ['#202226', '#fff'],
  white: ['#f4f2ec', '#1d1d1d'],
};

/**
 * Wooden post with arrows to world cities. Each place is
 * { name, color, at: [lat, lng] } (distance and arrow direction computed from
 * the park center) or { name, color, km, bearing } for fixed values.
 */
export default defineModel({
  type: 'signpost',
  label: 'Poste de distancias a ciudades',
  params: { places: [] },
  build(p, { park }) {
    const group = new THREE.Group();
    const origin = [park.center.lat, park.center.lng];
    const places = p.places.map(({ name, color, at, km, bearing }) => ({
      name,
      color,
      km: at ? haversineKm(origin, at) : km,
      bearing: at ? bearingDeg(origin, at) : bearing,
    }));
    // one texture atlas with every sign, one row per sign
    // laid out in 1024-wide units on a half-size canvas (signs are small on screen)
    const ROW = 96,
      Wc = 1024,
      SCALE = 0.5;
    const c = document.createElement('canvas');
    c.width = Wc * SCALE;
    c.height = ROW * places.length * SCALE;
    const g = c.getContext('2d');
    g.scale(SCALE, SCALE);
    const fmt = (n) => (n >= 100 ? Math.round(n).toLocaleString('es-MX') : n.toFixed(1));
    places.forEach((sign, i) => {
      const [bg, fg] = SIGN_COLORS[sign.color];
      const y = i * ROW;
      g.fillStyle = bg;
      g.fillRect(0, y, Wc, ROW);
      g.fillStyle = 'rgba(0,0,0,0.12)';
      g.fillRect(0, y + ROW - 8, Wc, 8);
      g.fillStyle = fg;
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.font = `800 ${sign.name.length > 14 ? 40 : 50}px Montserrat, Arial, sans-serif`;
      g.fillText(sign.name, Wc * 0.45, y + ROW * 0.36);
      g.font = '600 26px Montserrat, Arial, sans-serif';
      g.fillText(`${fmt(sign.km)} km · ${fmt(sign.km * 0.621371)} mi`, Wc * 0.45, y + ROW * 0.76);
    });
    const atlas = releaseAfterUpload(new THREE.CanvasTexture(c));
    atlas.colorSpace = THREE.SRGBColorSpace;
    atlas.anisotropy = 8;

    // arrow plates: caps get atlas UVs, edges a plain color
    const capGeos = [],
      edgeGeos = [];
    const H = 0.17,
      D = 0.035;
    const top = 4.4,
      gap = (top - 1.4) / places.length;
    places.forEach((sign, i) => {
      const L = 0.9 + Math.min(0.55, sign.name.length * 0.035);
      const shape = new THREE.Shape(
        [
          [0, -H / 2],
          [L - H * 0.6, -H / 2],
          [L, 0],
          [L - H * 0.6, H / 2],
          [0, H / 2],
        ].map(([x, y]) => new THREE.Vector2(x, y)),
      );
      const ex = new THREE.ExtrudeGeometry(shape, { depth: D, bevelEnabled: false });
      ex.translate(0.1, 0, -D / 2);
      const pos = ex.getAttribute('position'),
        nrm = ex.getAttribute('normal');
      const cap = [],
        capUv = [],
        edge = [];
      for (let t = 0; t < pos.count; t += 3) {
        const isCap = Math.abs(nrm.getZ(t)) > 0.9;
        for (let k = 0; k < 3; k++) {
          const x = pos.getX(t + k),
            y = pos.getY(t + k),
            z = pos.getZ(t + k);
          (isCap ? cap : edge).push(x, y, z);
          if (isCap) {
            // back side mirrored so the text reads correctly from behind
            const u = (x - 0.1) / L,
              uu = nrm.getZ(t) > 0 ? u : 1 - u;
            capUv.push(uu, 1 - (i + 1 - (y + H / 2) / H) / places.length);
          }
        }
      }
      const capG = new THREE.BufferGeometry();
      capG.setAttribute('position', new THREE.Float32BufferAttribute(cap, 3));
      capG.setAttribute('uv', new THREE.Float32BufferAttribute(capUv, 2));
      capG.computeVertexNormals();
      const edgeG = new THREE.BufferGeometry();
      edgeG.setAttribute('position', new THREE.Float32BufferAttribute(edge, 3));
      edgeG.computeVertexNormals();
      // point the arrow at the real direction of the place (north = -z)
      const m = new THREE.Matrix4().compose(
        new THREE.Vector3(0, top - i * gap, 0),
        new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          THREE.MathUtils.degToRad(90 - sign.bearing) + (i % 2 ? 0.04 : -0.04),
        ),
        new THREE.Vector3(1, 1, 1),
      );
      capGeos.push(capG.applyMatrix4(m));
      edgeGeos.push(edgeG.applyMatrix4(m));
    });
    const caps = new THREE.Mesh(mergeGeometries(capGeos), new THREE.MeshStandardMaterial({ map: atlas, roughness: 0.7 }));
    const edges = new THREE.Mesh(mergeGeometries(edgeGeos), std(0xf1ede4));
    const k = new ModelKit();
    // weathered wooden post
    k.cyl('weatheredWood', 0.09, 0.12, top + 0.6, 0, 0, 0, 8);
    k.box('weatheredWood', 0.3, 0.06, 0.3, 0, top + 0.6, 0);
    // the stone seats in front of the post
    for (let i = 0; i < 6; i++)
      k.add('sandstone', rock(0.55 + (i % 3) * 0.12, i + 11), -1.8 + (i % 2) * 0.25, 0.25, -3.2 + i * 1.25, i * 0.9, true);
    group.add(k.build(), caps, edges);
    return { object: group };
  },
});
