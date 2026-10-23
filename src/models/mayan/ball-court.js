import * as THREE from 'three';
import { TREE } from '#shared/formats/vegetation.js';
import { extrudeProfile, hipRoof, m4, nonIndexed, solidColor } from '../../graphics/geometry.js';
import { modelTreeGeometry } from '../parts/trees.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Thin box between two points (truss members, beams, rails). */
function bar(k, material, a, b, t) {
  const d = new THREE.Vector3().subVectors(b, a);
  const len = d.length();
  const g = new THREE.BoxGeometry(t, len, t).translate(0, len / 2, 0);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
  k.addTransformed(material, g, new THREE.Matrix4().compose(a, q, new THREE.Vector3(1, 1, 1)));
}

const v = (x, y, z) => new THREE.Vector3(x, y, z);

/**
 * Juego de Pelota (Xcaret). Length along x, everything inside length × width:
 * a sunken alley of red clay between two long side structures, each a sloped
 * flagstone bench (talud) rising to a vertical rubble wall with the stone ring
 * at mid-length. On top, a covered gallery with round columns on one side (+z)
 * and a walkway with a wooden railing and lamp posts on the other. The west end
 * (−x) is closed by a stepped grandstand with central stairs; the east end is
 * open. Over all of it a light grey hipped roof (vertex painted) on steel
 * columns standing on the side walls, with trusses underneath.
 * `roof: false` leaves the court uncovered.
 */
export default defineModel({
  type: 'ballCourt',
  label: 'Juego de pelota',
  params: { length: 72, width: 26, roof: true },
  footprint: (p) => ({ rect: [p.length, p.width] }),
  build(p) {
    const k = new ModelKit();
    const L = p.length,
      W = p.width;
    const a = W * 0.175; // half width of the playing alley
    const b = W * 0.2; // bench (talud) width
    const wz = a + b; // face of the vertical wall
    const hw = W / 2;
    const lip = 0.9, // low vertical base of the bench
      benchTop = lip + b * Math.tan((30 * Math.PI) / 180),
      deck = benchTop + 1.3; // top of the side walls
    const x0 = -L / 2 + 0.3,
      x1 = L / 2 - 0.3,
      len = x1 - x0,
      xc = (x0 + x1) / 2;

    // grandstand at the west end, inside the alley
    const steps = 9,
      tread = 0.8,
      rise = deck / steps,
      depth = steps * tread,
      xs = x0; // back of the stands

    // court floor: red clay (tierra roja), slightly sunken
    const floorLen = x1 - (xs + depth) + 0.4;
    const floor = new THREE.BoxGeometry(floorLen, 0.9, a * 2 + 0.6).translate(x1 - floorLen / 2, -0.15, 0);
    k.addTransformed('vertex', solidColor(floor, '#d4683f'), m4());

    for (const side of [-1, 1]) {
      const prof = (pts) => {
        const r = pts.map(([z, y]) => [z * side, y]);
        return side < 0 ? r.reverse() : r;
      };
      // sloped bench: light grey flagstone
      k.add(
        'paving',
        extrudeProfile(
          prof([
            [a, -0.3],
            [wz + 0.05, -0.3],
            [wz + 0.05, benchTop],
            [a, lip],
          ]),
          len,
        ),
        xc,
        0,
        0,
      );
      // vertical rubble wall and the solid side structure behind it
      k.add(
        'limestone',
        extrudeProfile(
          prof([
            [wz, -0.3],
            [hw, -0.3],
            [hw, deck],
            [wz, deck],
          ]),
          len,
        ),
        xc,
        0,
        0,
      );
      // coping along the top edge over the court and the outer edge
      k.box('stone', len + 0.1, 0.18, 0.7, xc, deck, side * (wz + 0.3));
      k.box('stone', len + 0.1, 0.18, 0.5, xc, deck, side * (hw - 0.25));

      // stone ring (hoop) at mid-length, facing the court
      const ring = new THREE.TorusGeometry(0.55, 0.16, 6, 14);
      k.add('stone', ring, 0, benchTop + 0.68, side * (wz - 0.12), 0, false);
      k.box('stone', 0.5, 0.5, 0.25, 0, benchTop + 0.43, side * (wz - 0.08));
    }

    // +z: covered gallery (portico) with round stone columns and a flat roof
    {
      const zi = wz + 0.75,
        zo = hw - 0.6,
        gx0 = xs + depth,
        gx1 = x1 - 0.4,
        gh = 2.7;
      k.box('limestone', gx1 - gx0, 0.6, 0.35, (gx0 + gx1) / 2, deck + 0.18, wz + 0.25); // low parapet
      const bays = Math.round((gx1 - gx0) / 3.6);
      for (let i = 0; i <= bays; i++) {
        const x = gx0 + 0.3 + (i / bays) * (gx1 - gx0 - 0.6);
        for (const z of [zi, zo]) k.cyl('limestone', 0.3, 0.34, gh, x, deck + 0.18, z, 8, true);
      }
      k.box('stone', gx1 - gx0 + 0.6, 0.5, hw - wz + 0.1, (gx0 + gx1) / 2, deck + 0.18 + gh, (wz + hw) / 2);
    }

    // −z: open walkway with a wooden railing and lamp posts
    {
      const zr = -(wz + 0.35);
      const posts = Math.round(len / 3);
      for (let i = 0; i <= posts; i++) {
        const x = x0 + 0.2 + (i / posts) * (len - 0.4);
        bar(k, 'wood', v(x, deck + 0.18, zr), v(x, deck + 1.2, zr), 0.16);
      }
      for (const y of [deck + 0.7, deck + 1.15]) bar(k, 'wood', v(x0 + 0.2, y, zr), v(x1 - 0.2, y, zr), 0.09);
      for (let i = 0; i < 5; i++) {
        const x = x0 + 6 + (i / 4) * (len - 12);
        bar(k, 'iron', v(x, deck + 0.18, zr - 0.5), v(x, deck + 3.4, zr - 0.5), 0.1);
        k.box('lamp', 0.3, 0.4, 0.3, x, deck + 3.4, zr - 0.5);
      }
    }

    // grandstand (gradas) across the west end, between the side walls
    const sw = wz * 2;
    for (let s = 0; s < steps; s++) {
      const front = xs + depth - s * tread;
      k.box('stone', front - xs, (s + 1) * rise + 0.3, sw, (xs + front) / 2, -0.3, 0);
      k.box('paving', tread, 0.05, sw, front - tread / 2, (s + 1) * rise, 0); // flagstone tread
    }
    // central stairs: half-height steps, a little proud, with handrails
    {
      const n = steps * 2,
        sr = deck / n,
        st = depth / n,
        w = 2.6;
      for (let s = 0; s < n; s++) {
        const front = xs + depth + 0.05 - s * st;
        k.box('paving', st, sr + 0.15, w, front - st / 2, s * sr, 0);
      }
      for (const z of [-w / 2 - 0.1, w / 2 + 0.1]) {
        bar(k, 'wood', v(xs + depth + 0.05, 1, z), v(xs + 0.3, deck + 1, z), 0.08);
        for (const t of [0, 0.5, 1]) {
          const x = xs + depth - t * (depth - 0.3);
          bar(k, 'wood', v(x, (t * deck * (depth - 0.3)) / depth, z), v(x, (t * deck * (depth - 0.3)) / depth + 1, z), 0.08);
        }
      }
    }
    // small grassy patch at the foot of the stands with a tree
    k.box('lawn', 2.4, 0.3, a - 1.8, xs + depth + 1.2, -0.15, (a + 1.6) / 2);
    k.addTransformed('vertex', modelTreeGeometry(TREE.BROAD_LIGHT), m4(xs + depth + 1.3, 0.1, a - 1.3, 0.7, 0.8, 0.75, 0.8));

    if (p.roof) {
      // big hipped roof (light grey sheet on top, white membrane underneath)
      const eave = 9.6,
        rise = 3.6,
        over = 0.5,
        roofL = L - 0.4,
        roofW = W - 0.4;
      const top = hipRoof(roofL, roofW, rise, over);
      k.addTransformed('vertex', solidColor(top, '#c9cdd0'), m4(0, eave, 0));
      const under = nonIndexed(hipRoof(roofL, roofW, rise, over));
      const pos = under.getAttribute('position').array;
      for (let i = 0; i < pos.length; i += 9)
        for (let j = 0; j < 3; j++) [pos[i + 3 + j], pos[i + 6 + j]] = [pos[i + 6 + j], pos[i + 3 + j]];
      under.computeVertexNormals();
      // normals facing up: lit like the sheet above (not by the green ground bounce)
      const nrm = under.getAttribute('normal').array;
      for (let i = 0; i < nrm.length; i++) nrm[i] = -nrm[i];
      k.add('white', under, 0, eave - 0.06, 0, 0, false);

      // steel columns standing on the side walls, triangular trusses across
      const zc = roofW / 2 - 0.4;
      const cols = 9;
      const hipStart = (roofL - roofW) / 2; // trusses only under the full-height part
      const ridge = eave + rise - 0.35;
      const slopeAt = (z) => eave - 0.2 + (rise - 0.15) * (1 - Math.abs(z) / (roofW / 2 + over));
      for (let i = 0; i < cols; i++) {
        const x = x0 + 0.6 + (i / (cols - 1)) * (len - 1.2);
        for (const s of [-1, 1]) bar(k, 'concrete', v(x, deck + 0.18, s * zc), v(x, eave - 0.1, s * zc), 0.3);
        if (Math.abs(x) > hipStart - 0.5) continue;
        const lo = eave - 1.2;
        const A = v(x, eave - 0.2, -zc),
          B = v(x, eave - 0.2, zc),
          R = v(x, ridge, 0);
        bar(k, 'concrete', A, R, 0.2);
        bar(k, 'concrete', B, R, 0.2);
        bar(k, 'concrete', v(x, lo, -zc), v(x, lo, zc), 0.14);
        for (const t of [0.2, 0.45, 0.7]) {
          for (const s of [-1, 1]) {
            const z = s * zc * (1 - t);
            bar(k, 'concrete', v(x, lo, z), v(x, slopeAt(z) - 0.1, z), 0.1);
          }
        }
      }
      // longitudinal beams: eaves and ridge
      for (const s of [-1, 1]) bar(k, 'concrete', v(x0 + 0.4, eave - 0.2, s * zc), v(x1 - 0.4, eave - 0.2, s * zc), 0.25);
      bar(k, 'concrete', v(-hipStart, ridge - 0.25, 0), v(hipStart, ridge - 0.25, 0), 0.25);
    }
    return { object: k.build() };
  },
});
