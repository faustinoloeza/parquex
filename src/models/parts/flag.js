import * as THREE from 'three';
import { markShared, releaseAfterUpload } from '../../graphics/memory.js';

// The Mexican flag: canvas texture plus a waving cloth mesh, used by the
// flagpole and the scenic tower.

let flagTexture = null;

// Mexican flag (4:7) with a simplified, recognisable coat of arms: eagle on a
// nopal over a rock in the lake, devouring a snake, framed by oak and laurel.
export function mexicanFlagTexture() {
  if (flagTexture) return flagTexture;
  // drawn in 1024 × 585 units on a half-size canvas (plenty for its size on screen)
  const W = 1024,
    H = 585,
    SCALE = 0.5;
  const c = document.createElement('canvas');
  c.width = W * SCALE;
  c.height = Math.round(H * SCALE);
  const g = c.getContext('2d');
  g.scale(SCALE, SCALE);
  const third = W / 3;
  g.fillStyle = '#006847';
  g.fillRect(0, 0, third + 1, H);
  g.fillStyle = '#ffffff';
  g.fillRect(third, 0, third + 1, H);
  g.fillStyle = '#ce1126';
  g.fillRect(2 * third, 0, third, H);
  const cx = W / 2,
    cy = H / 2 + 6,
    s = H / 585;
  g.save();
  g.translate(cx, cy);
  g.scale(s, s);
  g.lineJoin = 'round';
  g.lineCap = 'round';

  // wreath: oak (left) and laurel (right) branches tied by a tricolor ribbon
  const leaf = (x, y, a, len, wid, col) => {
    g.save();
    g.translate(x, y);
    g.rotate(a);
    g.fillStyle = col;
    g.beginPath();
    g.ellipse(0, 0, len, wid, 0, 0, Math.PI * 2);
    g.fill();
    g.restore();
  };
  for (let i = 0; i < 9; i++) {
    const t = 0.35 + i * 0.13;
    const x = -Math.cos(t) * 92,
      y = Math.sin(t) * 70 + 22;
    leaf(x - 8, y - 4, t + 2.2, 14, 7, '#3c6e2f');
    leaf(-x + 8, y - 4, -t + 0.95, 14, 5, '#5a8f3a');
    if (i % 2) {
      g.fillStyle = '#b3242e';
      g.beginPath();
      g.arc(-x + 2, y + 6, 3.2, 0, 7);
      g.fill();
    }
  }
  g.strokeStyle = '#5b4325';
  g.lineWidth = 3;
  g.beginPath();
  g.arc(0, 22, 88, 0.3, Math.PI - 0.3);
  g.stroke();
  [
    ['#006847', -16],
    ['#ffffff', 0],
    ['#ce1126', 16],
  ].forEach(([col, dx]) => {
    g.fillStyle = col;
    g.beginPath();
    g.ellipse(dx, 108, 9, 6, 0, 0, 7);
    g.fill();
  });

  // lake and rock
  g.fillStyle = '#2f7fb6';
  g.beginPath();
  g.ellipse(0, 86, 62, 11, 0, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#bfe3f5';
  g.lineWidth = 2;
  for (let i = -2; i <= 2; i++) {
    g.beginPath();
    g.arc(i * 22, 88, 7, 0.2, Math.PI - 0.2);
    g.stroke();
  }
  g.fillStyle = '#8b6b48';
  g.beginPath();
  g.moveTo(-26, 82);
  g.quadraticCurveTo(0, 64, 26, 82);
  g.closePath();
  g.fill();

  // nopal with pads and red tunas
  const pad = (x, y, rx, ry, a) => {
    g.save();
    g.translate(x, y);
    g.rotate(a);
    g.fillStyle = '#4c8a34';
    g.beginPath();
    g.ellipse(0, 0, rx, ry, 0, 0, 7);
    g.fill();
    g.strokeStyle = '#2f5e22';
    g.lineWidth = 1.5;
    g.stroke();
    g.restore();
  };
  pad(0, 60, 12, 18, 0);
  pad(-18, 46, 10, 14, -0.6);
  pad(18, 46, 10, 14, 0.6);
  pad(-30, 30, 8, 11, -0.9);
  pad(30, 32, 8, 11, 0.9);
  g.fillStyle = '#c0283a';
  [
    [-34, 20],
    [-24, 34],
    [26, 22],
    [36, 26],
    [8, 42],
  ].forEach(([x, y]) => {
    g.beginPath();
    g.arc(x, y, 3.5, 0, 7);
    g.fill();
  });

  // eagle: body, spread wings, tail, legs on the nopal
  const brown = '#6b4423',
    dark = '#4a2e16',
    gold = '#c99a3b';
  g.fillStyle = brown;
  // left wing (raised)
  g.beginPath();
  g.moveTo(-6, -10);
  g.bezierCurveTo(-40, -30, -70, -80, -58, -112);
  g.bezierCurveTo(-48, -90, -40, -70, -20, -52);
  g.bezierCurveTo(-30, -60, -34, -40, -10, -28);
  g.closePath();
  g.fill();
  // right wing
  g.beginPath();
  g.moveTo(10, -14);
  g.bezierCurveTo(46, -30, 78, -70, 70, -104);
  g.bezierCurveTo(56, -84, 46, -66, 26, -54);
  g.bezierCurveTo(36, -60, 40, -42, 16, -30);
  g.closePath();
  g.fill();
  g.strokeStyle = dark;
  g.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    g.beginPath();
    g.moveTo(-14 - i * 8, -34 - i * 12);
    g.lineTo(-40 - i * 4, -50 - i * 14);
    g.stroke();
    g.beginPath();
    g.moveTo(20 + i * 8, -36 - i * 10);
    g.lineTo(46 + i * 4, -50 - i * 12);
    g.stroke();
  }
  // body and tail
  g.fillStyle = brown;
  g.beginPath();
  g.ellipse(2, -6, 18, 30, 0.15, 0, 7);
  g.fill();
  g.fillStyle = dark;
  g.beginPath();
  g.moveTo(-8, 18);
  g.lineTo(-22, 40);
  g.lineTo(4, 30);
  g.lineTo(16, 40);
  g.lineTo(12, 18);
  g.closePath();
  g.fill();
  // head facing left (profile) with golden beak
  g.fillStyle = brown;
  g.beginPath();
  g.ellipse(-16, -40, 11, 9, -0.3, 0, 7);
  g.fill();
  g.fillStyle = gold;
  g.beginPath();
  g.moveTo(-26, -42);
  g.lineTo(-38, -36);
  g.lineTo(-26, -35);
  g.closePath();
  g.fill();
  g.fillStyle = '#fff';
  g.beginPath();
  g.arc(-18, -43, 2, 0, 7);
  g.fill();
  // legs gripping the nopal
  g.strokeStyle = gold;
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(-4, 20);
  g.lineTo(-8, 38);
  g.moveTo(8, 20);
  g.lineTo(12, 38);
  g.stroke();
  // snake held in the beak and talon
  g.strokeStyle = '#2f7a3a';
  g.lineWidth = 4;
  g.beginPath();
  g.moveTo(-36, -36);
  g.bezierCurveTo(-52, -20, -30, -8, -44, 6);
  g.bezierCurveTo(-56, 18, -36, 26, -24, 16);
  g.stroke();
  g.fillStyle = '#2f7a3a';
  g.beginPath();
  g.ellipse(-37, -34, 4, 3, 0, 0, 7);
  g.fill();
  g.restore();

  flagTexture = releaseAfterUpload(new THREE.CanvasTexture(c));
  flagTexture.colorSpace = THREE.SRGBColorSpace;
  flagTexture.anisotropy = 8;
  return markShared(flagTexture);
}

/**
 * A flag cloth as a piece for the mobile app (models/define.js → AnimatedPiece):
 * driver "flag", the flat cloth in the mesh frame, where it hangs (`at`).
 * @param {ReturnType<typeof createFlagCloth>} cloth
 */
export function flagPiece(cloth) {
  const { mesh, width, height, speed } = cloth;
  return {
    name: 'flag',
    driver: 'flag',
    params: { at: mesh.position.toArray(), width, height, speed },
    size: width,
    parts: [{ object: mesh, rest: cloth.rest }],
  };
}

// Waving cloth: the hoist edge is fixed to the pole, a travelling wave grows
// towards the fly end, and the cloth droops slightly. The mobile export
// (src/export/animated.js) takes the flat cloth (rest()) and the app replays
// update() (driver "flag").
export function createFlagCloth(width, { segments = [28, 10], speed = 3.2 } = {}) {
  const height = (width * 4) / 7;
  const geo = new THREE.PlaneGeometry(width, height, segments[0], segments[1]);
  geo.translate(width / 2, -height / 2, 0);
  const mat = new THREE.MeshStandardMaterial({ map: mexicanFlagTexture(), side: THREE.DoubleSide, roughness: 0.75 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  const pos = geo.getAttribute('position');
  const base = Float32Array.from(pos.array);
  let frame = 0;
  return {
    mesh,
    width,
    height,
    speed,
    /** the flat cloth, as before any update() */
    rest() {
      const g = geo.clone();
      g.getAttribute('position').array.set(base);
      const n = g.getAttribute('normal');
      for (let i = 0; i < n.count; i++) n.setXYZ(i, 0, 0, 1);
      return g;
    },
    update(t) {
      // cloth only needs ~30 updates per second
      if ((frame++ & 1) === 1) return;
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3],
          y = base[i * 3 + 1];
        const w = x / width;
        const wave =
          Math.sin(x * (7 / width) - t * speed + y * (1.2 / height)) * 0.13 * width +
          Math.sin(x * (15 / width) - t * speed * 1.7 + 1.3) * 0.035 * width;
        pos.setXYZ(i, x - w * w * 0.04 * width, y - w * w * 0.08 * height + Math.sin(t * 1.3 + w * 3) * 0.01 * height * w, wave * w);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      mesh.rotation.y = 0.35 + Math.sin(t * 0.21) * 0.3;
    },
  };
}
