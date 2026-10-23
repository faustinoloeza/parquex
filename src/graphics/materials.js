import * as THREE from 'three';
import {
  thatchTexture,
  tileTexture,
  stoneTexture,
  facadeTexture,
  facadeGlowTexture,
  rubbleTexture,
  pavingTexture,
  textileTexture,
  paversTexture,
} from './textures.js';
import { markShared } from './memory.js';
import { NIGHT_COLORS, nightGlow } from './night.js';

// Palette inspired by the official illustrated map, softened towards a clean
// pastel 3D-map look (warm creams, soft terracotta, lavender-grey slate).
export const PALETTE = {
  cream: 0xf3e9d2,
  white: 0xf8f5ee,
  limestone: 0xdcd3bd,
  stone: 0xbdb5a5,
  darkStone: 0x918a7f,
  terracotta: 0xe39272,
  tileDark: 0xc06d50,
  thatch: 0xcfae78,
  thatchDark: 0xa58452,
  wood: 0x86603f,
  yellow: 0xf2c94e,
  ochre: 0xe6b35a, // colonial walls (Capilla de Guadalupe, hacienda)
  red: 0xcc5444,
  teal: 0x4bb0ae,
  green: 0x58ab5c,
  glass: 0xa9dbea,
  water: 0x63c3d6,
};

/** Night: facades light their windows (facadeGlowTexture) with this intensity. */
const WINDOW_GLOW = 1.5;

/**
 * Project material (matte, non-metallic by default). Rough dielectric surfaces
 * — most of the scene — use Lambert shading, which looks the same without a
 * specular term and costs less per pixel; shiny or metallic ones keep PBR.
 */
export function std(color, opts = {}) {
  const { roughness = 0.85, metalness = 0, ...rest } = opts;
  if (metalness === 0 && roughness >= 0.7) return new THREE.MeshLambertMaterial({ color, ...rest });
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, ...rest });
}

let library;

/**
 * Named material library shared by every model and the generic buildings.
 * Models refer to materials by name (`kit.box('limestone', …)`); sharing the
 * instances lets the landmarks layer merge all static geometry that uses the
 * same material into a single draw call.
 * @returns {Record<string, THREE.Material>}
 */
export function materials() {
  if (library) return library;
  const stone = stoneTexture();
  // rubble masonry (mampostería): the stone walls seen all over the park
  const rubble = rubbleTexture();
  // facades: plaster with a framed window per bay; at night the windows glow
  const facadeMap = facadeTexture(),
    glowMap = facadeGlowTexture();
  const facade = (color) => nightGlow(std(color, { map: facadeMap, emissive: NIGHT_COLORS.window, emissiveMap: glowMap }), WINDOW_GLOW, 0);
  library = {
    // structure
    wall: std(PALETTE.cream),
    white: std(PALETTE.white),
    limestone: std(0xffffff, { map: rubble }),
    stone: std(PALETTE.stone),
    darkStone: std(PALETTE.darkStone),
    rockwall: std(0xcac2b2, { map: rubble, roughness: 1 }), // weathered grey rubble (ruins, moats)
    darkRubble: std(0x5e5950, { map: rubble, roughness: 1 }), // dark wet rubble (walls of the felines' moat)
    paving: std(0xffffff, { map: pavingTexture(), roughness: 1 }), // flagstone floors
    textile: std(0xffffff, { map: textileTexture(), roughness: 0.8 }), // Mexican textile patterns (XCARET letters)
    pavers: std(0xffffff, { map: paversTexture(), roughness: 1 }), // grey concrete pavers (bus terminal lot)
    terrace: std(0xe8b297, { map: stone, roughness: 0.9 }),
    court: std(0xcc7a58),
    concrete: std(0xefece5, { roughness: 0.85 }),
    pierStone: std(0xe6e2d8, { map: stone, roughness: 0.9 }),
    facade: facade(PALETTE.cream),
    facadeWhite: facade(0xf8f6f0),
    // colonial painted facades (hacienda and the plaza of the Capilla de Guadalupe)
    facadeOchre: facade(PALETTE.ochre),
    facadeMaroon: facade(0xb5625a),
    // roofs
    tile: std(0xffffff, { map: tileTexture(), roughness: 0.7 }),
    thatch: std(0xffffff, { map: thatchTexture(), roughness: 1 }),
    thatchDark: std(0x94754a, { roughness: 1 }),
    slate: std(0x9aa1bd, { roughness: 0.6, metalness: 0.15 }), // soft lavender grey
    shadeNet: std(0x5f4d50, { roughness: 1 }), // dark shade cloth of the greenhouses
    // wood & metal
    wood: std(PALETTE.wood),
    weatheredWood: std(0x745438, { roughness: 1 }),
    iron: std(0x2b2f33, { roughness: 0.5, metalness: 0.6 }),
    steel: std(0xe9edf0, { roughness: 0.35, metalness: 0.6 }),
    gold: std(0xd4a537, { roughness: 0.3, metalness: 0.8 }),
    bronze: std(0x8c6a3c, { roughness: 0.4, metalness: 0.7 }),
    bell: std(0x9a7b3c, { metalness: 0.7, roughness: 0.35 }),
    lamp: nightGlow(std(0xfff3c4, { emissive: 0xffe39a, emissiveIntensity: 0.6 }), 2.4),
    // window glass and openings of the models: dark by day, warm light at night
    window: nightGlow(std(0x2f3a44, { emissive: NIGHT_COLORS.window }), 1.3, 0),
    glazedBlue: std(0x3f78d0, { roughness: 0.5 }),
    plastic: std(0xffffff, { vertexColors: true, roughness: 0.35 }), // painted per vertex
    // paint
    yellow: std(PALETTE.yellow),
    ochre: std(PALETTE.ochre),
    red: std(PALETTE.red),
    teal: std(PALETTE.teal),
    green: std(PALETTE.green),
    dark: std(0x33322f),
    boatStripe: std(0x1d3557),
    boatCanopy: std(0x1f6fb2),
    // nature
    lawn: std(0x86c05a, { roughness: 1 }),
    leaves: std(0x5a9139, { roughness: 0.9, flatShading: true }),
    rock: std(0xaca493, { roughness: 1, flatShading: true }),
    sandstone: std(0xddd2b5, { roughness: 1, flatShading: true }),
    // water & glass
    glass: nightGlow(
      std(PALETTE.glass, { roughness: 0.15, metalness: 0.3, transparent: true, opacity: 0.75, emissive: NIGHT_COLORS.window }),
      0.45,
      0,
    ),
    pool: std(PALETTE.water, { roughness: 0.1, metalness: 0.1 }),
    // per-vertex colors (painted geometry)
    vertex: std(0xffffff, { vertexColors: true }),
  };
  for (const m of Object.values(library)) markShared(m); // kept when the focused park changes
  return library;
}
