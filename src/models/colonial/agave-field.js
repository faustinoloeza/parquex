import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { mulberry32 } from '#shared/random.js';
import { drapeQuad, solidColor } from '../../graphics/geometry.js';
import { std } from '../../graphics/materials.js';
import { canvasTexture } from '../../graphics/textures.js';
import { markShared } from '../../graphics/memory.js';
import { rock } from '../parts/rock.js';
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/**
 * Field of blue agaves on a bed of white gravel (visitors' photo, 2026; the
 * pale ground shows on satellite imagery), with a limestone boulder carved
 * «xcaret México» by the path and a wooden statue of the Virgin of Guadalupe
 * with metal rays on a rubble base. Plants in loose rows (instanced, one draw
 * call); the gravel follows the terrain. The path side is −x.
 */
export default defineModel({
  type: 'agaveField',
  label: 'Plantío de agaves',
  params: { length: 26, width: 12 },
  build(p, ctx) {
    const { length: L, width: W } = p;
    const base = ctx.heightAt(p.x, p.z);
    const hAt = (x, z) => ctx.heightAt(p.x + x, p.z + z) - base;
    const k = new ModelKit();
    const group = new THREE.Group();

    // gravel bed draped over the terrain, a little larger than the planting
    const [hx, hz] = [L / 2 + 1, W / 2 + 1];
    const bed = drapeQuad(
      [
        [-hx, -hz],
        [hx, -hz],
        [hx, hz],
        [-hx, hz],
      ],
      hAt,
      { lift: 0.15 },
    );
    k.add('vertex', solidColor(bed, '#e9e4d8'), 0, 0, 0, 0, false);
    const rnd = mulberry32(17);
    for (let i = 0; i < 12; i++) {
      const x = (rnd() - 0.5) * L,
        z = (rnd() - 0.5) * W;
      k.add('rock', rock(0.18 + rnd() * 0.15, i), x, hAt(x, z) + 0.15, z, rnd() * 6.3);
    }

    // blue agaves in loose rows
    const plant = agave();
    const step = 1.9;
    const rows = Math.floor(W / step),
      cols = Math.floor(L / step);
    const spots = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const x = -L / 2 + (c + 0.5 + (r % 2) * 0.4) * step + (rnd() - 0.5) * 0.5,
          z = -W / 2 + (r + 0.5) * step + (rnd() - 0.5) * 0.5;
        if (x < -L / 2 + 2.6 && Math.abs(z) < 1.6) continue; // room for the boulder
        if (x < -L / 2 + 2.6 && z < -W / 2 + 2.6) continue; // and for the statue
        spots.push([x, z]);
      }
    const mesh = new THREE.InstancedMesh(plant, agaveMaterial(), spots.length);
    const m = new THREE.Matrix4();
    spots.forEach(([x, z], i) => {
      const sc = 0.8 + rnd() * 0.45;
      m.compose(
        new THREE.Vector3(x, hAt(x, z) + 0.12, z),
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * Math.PI * 2),
        new THREE.Vector3(sc, sc, sc),
      );
      mesh.setMatrixAt(i, m);
    });
    mesh.castShadow = mesh.receiveShadow = true;
    group.add(mesh);

    // carved boulder by the path, its face towards it
    const bx = -L / 2 + 1,
      by = hAt(bx, 0);
    k.add('sandstone', new THREE.BoxGeometry(0.75, 0.95, 1.5, 2, 2, 2).translate(0, 0.45, 0), bx, by, 0, 0);
    const plate = new THREE.PlaneGeometry(1.25, 0.6).rotateY(-Math.PI / 2);
    const uv = plate.getAttribute('uv'); // the middle band of the square logo texture
    for (let i = 0; i < uv.count; i++) uv.setY(i, 0.25 + uv.getY(i) * 0.5);
    k.add('agaveLogo', plate, bx - 0.39, by + 0.5, 0, 0, false);

    // Virgin of Guadalupe: wooden figure on a rubble base, ringed by thin rays
    const [vx, vz] = [-L / 2 + 1.2, -W / 2 + 1.2];
    const vy = hAt(vx, vz);
    k.add('rockwall', new THREE.CylinderGeometry(0.55, 0.7, 0.7, 7).translate(0, 0.35, 0), vx, vy, vz);
    const figure = new THREE.LatheGeometry(
      [
        [0.01, 0],
        [0.32, 0],
        [0.28, 0.6],
        [0.22, 1.2],
        [0.16, 1.55],
        [0.11, 1.62],
        [0.12, 1.75],
        [0.01, 1.9],
      ].map(([r, y]) => new THREE.Vector2(r, y)),
      10,
    );
    k.add('weatheredWood', figure, vx, vy + 0.7, vz);
    const rays = 30;
    for (let i = 0; i < rays; i++) {
      const a = (i / rays) * Math.PI * 2;
      const [ex, ey] = [Math.cos(a) * 0.55, Math.sin(a) * 1.15 + 1.0];
      const [fx, fy] = [Math.cos(a) * 0.85, Math.sin(a) * 1.5 + 1.0];
      if (fy < 0.15) continue; // not below the feet
      k.rod('iron', [vx + ex * 0.3, vy + 0.7 + ey, vz + ex], [vx + fx * 0.3, vy + 0.7 + fy, vz + fx], 0.012, 3);
    }

    group.add(k.build({ agaveLogo: logoMaterial() }));
    return { object: group };
  },
});

/** Blue agave about 1.1 m tall: a dense rosette of long, narrow, upright leaves (vertex-colored). */
function agave() {
  const parts = [];
  const rings = [
    [8, 0.25, 1.15],
    [9, 0.6, 1.25],
    [10, 0.95, 1.1],
  ]; // [leaves, tilt from vertical (rad), length]
  rings.forEach(([n, tilt, len], j) => {
    for (let i = 0; i < n; i++) {
      const leaf = new THREE.ConeGeometry(0.07, len, 3).translate(0, len / 2, 0).scale(1, 1, 0.4);
      leaf.rotateZ(tilt + ((i * 7) % 5) * 0.04).rotateY((i / n) * Math.PI * 2 + j * 0.35);
      parts.push(solidColor(leaf, j === 2 ? '#9bb7b6' : '#86a8ab'));
    }
  });
  return mergeGeometries(parts.map((g) => g.toNonIndexed()));
}

let agaveMat, logoMat;

function agaveMaterial() {
  agaveMat ??= markShared(std(0xffffff, { vertexColors: true, roughness: 0.8 }));
  return agaveMat;
}

/** «xcaret / MEXICO» carved in dark brown, on transparency (the boulder's face). */
function logoMaterial() {
  if (logoMat) return logoMat;
  const map = canvasTexture(
    'agaveLogo',
    256,
    (g, s) => {
      g.clearRect(0, 0, s, s);
      g.fillStyle = '#4a3324';
      g.textAlign = 'center';
      g.font = `bold ${s * 0.22}px Georgia, serif`;
      g.fillText('xcaret', s / 2, s * 0.52);
      g.font = `bold ${s * 0.1}px Arial, sans-serif`;
      g.fillText('MEXICO', s * 0.6, s * 0.68);
    },
    false,
  );
  logoMat = markShared(std(0xffffff, { map, alphaTest: 0.5 }));
  return logoMat;
}
