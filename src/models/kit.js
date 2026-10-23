import * as THREE from 'three';
import { GeometryBatch } from '../graphics/batch.js';
import { m4, worldUV } from '../graphics/geometry.js';
import { materials } from '../graphics/materials.js';

/**
 * Small modeling toolkit. Geometry is added in the model's local frame (meters,
 * y up, the model's front faces +z) under a material name of the shared library
 * (src/graphics/materials.js) and merged into one mesh per material on build().
 *
 *   const k = new ModelKit();
 *   k.box('limestone', 4, 2, 4, 0, 0, 0);    // w, h, d, then x, y (base), z
 *   k.cyl('wood', 0.2, 0.3, 5, 2, 0, 1);     // rTop, rBottom, h, x, y, z
 *   k.rod('iron', [0, 3, 0], [4, 3.5, 1], 0.05); // from, to, radius
 *   return { object: k.build() };
 */
export class ModelKit {
  constructor() {
    this.batch = new GeometryBatch();
  }

  /**
   * Adds a geometry at (x, y, z) rotated `ry` radians around Y. With `uv`
   * (default) its UVs are replaced by world-projected ones so textures keep a
   * constant scale in meters.
   */
  add(material, geometry, x = 0, y = 0, z = 0, ry = 0, uv = true) {
    if (uv) worldUV(geometry, 0.25);
    this.batch.add(material, geometry, m4(x, y, z, ry));
    return this;
  }

  /** Adds a geometry with an explicit matrix, keeping its own UVs. */
  addTransformed(material, geometry, matrix) {
    this.batch.add(material, geometry, matrix);
    return this;
  }

  /** Box whose base sits at y. */
  box(material, w, h, d, x, y, z, ry = 0) {
    const g = new THREE.BoxGeometry(w, h, d);
    g.translate(0, h / 2, 0);
    return this.add(material, g, x, y, z, ry);
  }

  /** Cylinder (or cone section) whose base sits at y. */
  cyl(material, rTop, rBot, h, x, y, z, segs = 16, open = false) {
    const g = new THREE.CylinderGeometry(rTop, rBot, h, segs, 1, open);
    g.translate(0, h / 2, 0);
    return this.add(material, g, x, y, z);
  }

  /** Thin open cylinder (rod, cable, branch) from point a to point b ([x, y, z]). */
  rod(material, a, b, r, segs = 5) {
    const d = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    const len = d.length();
    if (len < 1e-3) return this;
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    const mid = new THREE.Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
    return this.addTransformed(
      material,
      new THREE.CylinderGeometry(r, r, len, segs, 1, true),
      new THREE.Matrix4().compose(mid, q, new THREE.Vector3(1, 1, 1)),
    );
  }

  /**
   * Merges everything into one mesh per material.
   * @param {Record<string, THREE.Material>} [extra] model-specific materials
   */
  build(extra) {
    return this.batch.build(extra ? { ...materials(), ...extra } : materials());
  }
}
