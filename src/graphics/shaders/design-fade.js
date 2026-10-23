import * as THREE from 'three';
import { FADE } from '#shared/design-area.js';

/**
 * GLSL for the blend between the 3D park and the real map around the designed
 * area (shared/design-area.js): designFade(xz) is 0 inside the park and 1
 * where only the real map shows, exactly like designArea.fade() in JS;
 * designDistance(xz) is the signed distance to the outline (m, < 0 inside).
 *
 * The uniforms object can be shared by every material that uses it. `name`
 * declares another outline next to the park's (e.g. 'region' →
 * uRegionCenter, uRegionRadii, uRegionFade, regionDistance(xz) and regionFade(xz)).
 * @param {ReturnType<typeof import('#shared/design-area.js').makeDesignArea>} area
 * @param {string} [name]
 */
export function designFadeUniforms(area, name = 'design') {
  const u = `u${name[0].toUpperCase()}${name.slice(1)}`;
  return {
    [`${u}Center`]: { value: new THREE.Vector2(area.cx, area.cz) },
    [`${u}Radii`]: { value: Float32Array.from(area.radii) },
    [`${u}Fade`]: { value: new THREE.Vector2(FADE.inner, FADE.outer) },
  };
}

/**
 * @param {number} n number of radii of the outline
 * @param {string} [name] see designFadeUniforms
 */
export function designFadeGLSL(n, name = 'design') {
  const u = `u${name[0].toUpperCase()}${name.slice(1)}`;
  return /* glsl */ `
  uniform vec2 ${u}Center;
  uniform float ${u}Radii[${n}];
  uniform vec2 ${u}Fade;
  // signed distance (m, radial) to the outline, < 0 inside, like signedDistance() in JS
  float ${name}Distance(vec2 p) {
    vec2 d = p - ${u}Center;
    float f = mod(atan(d.y, d.x) / 6.28318530718 * ${n}.0 + ${n}.0, ${n}.0);
    int i = int(floor(f));
    int j = i + 1 == ${n} ? 0 : i + 1;
    float r = mix(${u}Radii[i], ${u}Radii[j], fract(f));
    return length(d) - r;
  }
  float ${name}Fade(vec2 p) {
    return smoothstep(-${u}Fade.x, ${u}Fade.y, ${name}Distance(p));
  }
`;
}
