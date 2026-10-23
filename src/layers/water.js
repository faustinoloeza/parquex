import * as THREE from 'three';
import { WATER_SDF } from '#shared/formats/water.js';
import { FADE } from '#shared/design-area.js';
import { INLAND_DEEP_AT, INLAND_TINT_RAMP } from '#shared/water-tint.js';
import { designFadeGLSL, designFadeUniforms } from '../graphics/shaders/design-fade.js';
import { NIGHT_MAP_GLSL, nightUniform } from '../graphics/night.js';

// Stylized water: wave normals, fresnel sky reflection, sun glints, white
// wave strokes on the open sea (like the illustrated map) and shoreline foam.
// At night (uNight, graphics/night.js) it turns deep blue, reflects a navy sky
// and the warm light of the street lamps (the lamps' light map, layers/lamps.js)
// as rippling streaks towards the viewer.

const vertexShader = /* glsl */ `
  uniform vec3 uExtent; // west, north, size of water.png in local meters
  varying vec2 vUv;
  varying vec3 vWorld;
  #ifdef LITE
    attribute float alpha;
    varying float vAlpha;
  #endif
  #ifdef SEA_EDGE
    varying vec2 vLocal;
  #endif
  #include <fog_pars_vertex>
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    #ifdef LITE
      vUv = (position.xz - uExtent.xy) / uExtent.z; // the park's own frame (neighbor parks are moved)
      vAlpha = alpha;
    #else
      vUv = (wp.xz - uExtent.xy) / uExtent.z; // v = 0 at the north edge, like the image rows
    #endif
    vWorld = wp.xyz;
    #ifdef SEA_EDGE
      vLocal = position.xz;
    #endif
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const fragmentShader = (radii, edgeRadii) => /* glsl */ `
  #ifdef LITE
    varying float vAlpha;
  #else
    ${designFadeGLSL(radii)}
  #endif
  #ifdef SEA_EDGE
    ${designFadeGLSL(edgeRadii, 'edge')}
    uniform vec3 uSeaEdgeColor;
    uniform vec2 uSeaEdgeBand;
    varying vec2 vLocal;
    ${NIGHT_MAP_GLSL}
  #endif
  uniform sampler2D uWater;
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uSky;
  uniform vec3 uSeaShallow;
  uniform vec3 uSeaDeep;
  uniform vec3 uLagoon;
  uniform vec3 uPool;
  uniform vec3 uRiver;
  uniform float uInland; // 1 when the park sets its own inland water color (park.waterTint)
  uniform vec3 uInlandShallow;
  uniform vec3 uInlandDeep;
  uniform float uNight;
  uniform vec3 uNightSky;
  uniform vec3 uNightShallow;
  uniform vec3 uNightDeep;
  #ifdef NIGHT_LIGHTS
    uniform sampler2D uLightMap;
    uniform vec3 uExtent;
  #endif
  varying vec2 vUv;
  varying vec3 vWorld;
  #include <fog_pars_fragment>

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float waves(vec2 q) {
    return noise(q * 0.16 + uTime * vec2(0.06, 0.035))
      + 0.5 * noise(q * 0.42 - uTime * vec2(0.05, 0.08))
      + 0.25 * noise(q * 1.1 + uTime * vec2(0.11, -0.07));
  }

  void main() {
    vec4 w = texture2D(uWater, vUv);
    float sd = mix(${WATER_SDF.min.toFixed(1)}, ${WATER_SDF.max.toFixed(1)}, w.r); // meters to the shore, > 0 in the water
    float mask = smoothstep(-0.45, 0.45, sd);
    if (mask < 0.01) discard; // land: done before any further work
    float edge = 0.0;
    #ifdef SEA_EDGE
      // open sea near the outline (seaEdge): towards the real map's sea color and
      // opaque, so it meets the map's sea without an edge; vAlpha is only where
      // it yields to the parks, its own fade applies elsewhere (pools, lagoons)
      edge = (1.0 - smoothstep(uSeaEdgeBand.x, uSeaEdgeBand.y, -edgeDistance(vLocal))) * (1.0 - smoothstep(0.1, 0.25, w.g));
      mask *= vAlpha * mix(1.0 - edgeFade(vLocal), 1.0, edge);
    #elif defined(LITE)
      mask *= vAlpha; // the neighbor's own fade and where it yields to other parks
    #else
      mask *= 1.0 - designFade(vWorld.xz);
    #endif
    if (mask < 0.01) discard;
    float tint = w.g;
    float depth = clamp(sd / 40.0, 0.0, 1.0); // 0 at the shore .. 1 at 40 m

    vec3 sea = mix(uSeaShallow, uSeaDeep, smoothstep(0.02, 0.85, depth));
    vec3 base = tint < 0.25 ? mix(sea, uPool, tint / 0.25)
      : tint < 0.45 ? mix(uPool, uLagoon, (tint - 0.25) / 0.2)
      : mix(uLagoon, uRiver, (tint - 0.45) / 0.55);
    // park.waterTint: lagoons, rivers and pools take the park's own color
    float inland = uInland * smoothstep(${INLAND_TINT_RAMP[0].toFixed(2)}, ${INLAND_TINT_RAMP[1].toFixed(2)}, tint);
    base = mix(base, mix(uInlandShallow, uInlandDeep, smoothstep(0.0, ${INLAND_DEEP_AT.toFixed(2)}, depth)), inland);

    vec2 p = vWorld.xz;
    #ifdef LITE
      vec3 n = vec3(0.0, 1.0, 0.0); // still water: no waves, glints or foam
    #else
      float e = 0.5;
      float strength = mix(1.0, 0.35, smoothstep(0.45, 1.0, tint));
      vec3 n = normalize(vec3(
        (waves(p - vec2(e, 0.0)) - waves(p + vec2(e, 0.0))) * strength,
        1.2,
        (waves(p - vec2(0.0, e)) - waves(p + vec2(0.0, e))) * strength));
    #endif

    // night: deep blue, darker inland water
    vec3 nightBase = mix(uNightShallow, uNightDeep, smoothstep(0.02, 0.85, depth));
    nightBase = mix(nightBase, base * vec3(0.16, 0.22, 0.42), smoothstep(0.2, 0.5, tint) * 0.8);
    base = mix(base, nightBase, uNight);

    vec3 V = normalize(cameraPosition - vWorld);
    float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
    vec3 col = mix(base, mix(uSky, uNightSky, uNight), fres * mix(0.55, 0.2, inland)); // murky water reflects less sky
    vec3 H = normalize(uSunDir + V);
    #ifndef LITE
    col += pow(max(dot(n, H), 0.0), 220.0) * mix(1.4, 0.35, uNight); // sun / dim moon glint
    col *= 0.92 + 0.16 * waves(p * 0.6);

    // white wave strokes on the open sea, like the illustrated map
    float sparkle = smoothstep(0.82, 0.95, noise(p * vec2(0.9, 2.2) + vec2(uTime * 0.25, uTime * 0.1)));
    sparkle *= smoothstep(0.86, 1.0, noise(p * 0.21 - uTime * 0.03));
    col += sparkle * (1.0 - smoothstep(0.1, 0.4, tint)) * smoothstep(0.15, 0.5, depth) * mix(0.55, 0.12, uNight);

    // shoreline foam
    float shore = 1.0 - smoothstep(0.0, 0.07, depth);
    float foam = shore * (0.55 + 0.45 * sin(depth * 160.0 - uTime * 1.8 + noise(p * 0.5) * 6.0));
    foam *= 1.0 - smoothstep(0.3, 0.6, tint);
    foam *= 1.0 - inland * 0.9; // murky inland water: hardly any foam
    col = mix(col, vec3(1.0), clamp(foam, 0.0, 1.0) * mix(0.55, 0.12, uNight));
    #endif
    #ifdef NIGHT_LIGHTS
    if (uNight > 0.001) {
      // lamps reflected on the water: their light map looked up a few meters
      // further from the viewer (a reflection shows between the viewer and the
      // lamp), broken up by the waves into streaks
      vec2 away = normalize(vWorld.xz - cameraPosition.xz + vec2(1e-4)) / uExtent.z;
      vec2 side = vec2(-away.y, away.x);
      float ripple = 0.35 + 1.3 * smoothstep(0.35, 0.8, noise(vec2(dot(p, side * uExtent.z) * 1.6, dot(p, away * uExtent.z) * 0.25 + uTime * 0.6)));
      vec3 glow = texture2D(uLightMap, vUv + away * 4.0).rgb * 0.5
        + texture2D(uLightMap, vUv + away * 10.0).rgb * 0.4
        + texture2D(uLightMap, vUv + away * 18.0).rgb * 0.3;
      col += glow * ripple * uNight * 3.0;
    }
    #endif

    float alpha = mask * mix(mix(mix(0.62, 0.96, smoothstep(0.0, 0.35, depth + tint)), 0.96, inland), 1.0, edge);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #ifdef SEA_EDGE
      // after tone mapping: exactly the map's color (dimmed at night like the map, layers/basemap.js)
      vec3 mapSea = mix(uSeaEdgeColor, uSeaEdgeColor * NIGHT_MAP_TINT + NIGHT_MAP_LIFT, uNight);
      gl_FragColor.rgb = mix(gl_FragColor.rgb, mapSea, edge);
    #endif
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;

/** Water colors by day: soft, slightly desaturated sky blues. */
export const WATER_DAY = {
  sky: '#dcf1fb',
  shallow: '#78d3d6',
  deep: '#3f8fc2',
  lagoon: '#4aaebb',
  pool: '#94deea',
  river: '#284066',
};
/** Water at night: deep saturated blue reflecting a navy sky. */
export const WATER_NIGHT = { sky: '#1b2c66', shallow: '#1c4fa0', deep: '#0b2462' };

/**
 * Animated water surface of the designed area. water.png (shared/formats/water.js)
 * holds the signed distance to the shore — mask, depth color and foam — and the
 * tint (sea, pool, lagoon, river). park.waterTint (shared/water-tint.js), when
 * the park sets one, recolors the inland water. It fades out where the real map
 * takes over.
 * @returns {import('./index.js').Layer}
 */
export function createWaterLayer({ park, waterTexture, sunDirection, designArea, lightMap }) {
  const material = waterMaterial({ park, waterTexture, sunDirection, designArea, lightMap });
  const { uniforms } = material;
  const mesh = new THREE.Mesh(outlineGeometry(designArea, park.extent), material);
  mesh.renderOrder = 1;
  mesh.name = 'water';
  return {
    name: 'water',
    object: mesh,
    update({ t }) {
      uniforms.uTime.value = t;
    },
  };
}

/**
 * The water shader. Without `designArea` it is the still, cheaper version for
 * neighbor parks (layers/neighbors.js): no waves, glints or foam; its opacity
 * comes from an `alpha` vertex attribute and water.png is looked up with the
 * park's own (untransformed) coordinates.
 *
 * `seaEdge` (still version only; regions, src/parks/xcr): the open sea turns
 * into the real map's sea color (`color`, opaque) towards the neighbor's own
 * outline (`area`, its frame), fully within `band[0]` m of it and not at all
 * beyond `band[1]` m inside, so it ends seamlessly against the map's sea. The
 * `alpha` attribute is then only where it yields to other parks: the shader
 * applies the neighbor's own fade itself (kept on pools and lagoons).
 * @param {{ park: object, waterTexture: THREE.Texture, sunDirection: THREE.Vector3,
 *   designArea?: ReturnType<typeof import('#shared/design-area.js').makeDesignArea>,
 *   seaEdge?: { area: ReturnType<typeof import('#shared/design-area.js').makeDesignArea>, color: string,
 *     band: [number, number] }, lightMap?: { value: THREE.Texture } }} options  lightMap: the street lamps'
 *        night light over park.extent (layers/lamps.js), reflected at night (full version only)
 */
export function waterMaterial({ park, waterTexture: waterTex, sunDirection: sunDir, designArea, seaEdge, lightMap }) {
  const { cx, cz, size } = park.extent;
  const uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      uWater: { value: waterTex },
      uTime: { value: 0 },
      uSunDir: { value: sunDir.clone().normalize() },
      uSky: { value: new THREE.Color(WATER_DAY.sky) },
      uSeaShallow: { value: new THREE.Color(WATER_DAY.shallow) },
      uSeaDeep: { value: new THREE.Color(WATER_DAY.deep) },
      uLagoon: { value: new THREE.Color(WATER_DAY.lagoon) },
      uPool: { value: new THREE.Color(WATER_DAY.pool) },
      uRiver: { value: new THREE.Color(WATER_DAY.river) },
      uInland: { value: park.waterTint ? 1 : 0 },
      uInlandShallow: { value: new THREE.Color(park.waterTint?.shallow ?? '#000000') },
      uInlandDeep: { value: new THREE.Color(park.waterTint?.deep ?? '#000000') },
      uNightSky: { value: new THREE.Color(WATER_NIGHT.sky) },
      uNightShallow: { value: new THREE.Color(WATER_NIGHT.shallow) },
      uNightDeep: { value: new THREE.Color(WATER_NIGHT.deep) },
    },
  ]);
  uniforms.uNight = nightUniform; // shared (merge() clones)
  uniforms.uWater.value = waterTex;
  uniforms.uExtent = { value: new THREE.Vector3(cx - size / 2, cz - size / 2, size) };
  if (designArea) Object.assign(uniforms, designFadeUniforms(designArea));
  const defines = designArea ? {} : { LITE: '' };
  if (lightMap && designArea) {
    uniforms.uLightMap = lightMap;
    defines.NIGHT_LIGHTS = '';
  }
  if (seaEdge && !designArea) {
    Object.assign(uniforms, designFadeUniforms(seaEdge.area, 'edge'), {
      uSeaEdgeColor: { value: new THREE.Color(seaEdge.color) },
      uSeaEdgeBand: { value: new THREE.Vector2(...seaEdge.band) },
    });
    defines.SEA_EDGE = '';
  }
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader: fragmentShader(designArea?.radii.length ?? 0, defines.SEA_EDGE === undefined ? 0 : seaEdge.area.radii.length),
    defines,
    transparent: true,
    fog: true,
    depthWrite: false,
  });
}

/**
 * Flat polygon covering the designed area plus its fade band (no pixels are
 * shaded where the real map shows), clamped to the extent of water.png.
 */
function outlineGeometry(area, { cx, cz, size }) {
  const n = area.radii.length * 2;
  const half = size / 2;
  const position = [area.cx, 0, area.cz];
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2;
    const r = area.radiusAt(a) + FADE.outer + 3;
    const x = THREE.MathUtils.clamp(area.cx + Math.cos(a) * r, cx - half, cx + half);
    const z = THREE.MathUtils.clamp(area.cz + Math.sin(a) * r, cz - half, cz + half);
    position.push(x, 0, z);
  }
  const index = [];
  for (let k = 0; k < n; k++) index.push(0, 1 + ((k + 1) % n), 1 + k); // counter-clockwise seen from above
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3));
  geometry.setIndex(index);
  return geometry;
}
