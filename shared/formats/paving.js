// paving.png — PAVING_SIZE² grayscale over the park extent (row 0 = north):
// how much of each cell is stone paving (walkways and plazas of the land
// cover, 0..255), faded out with the designed area. The web app's ground tiles
// already paint the paving: it only uses it at night (street lamps over plazas
// and the soft glow of the walkways, src/layers/lamps.js); the mobile export
// turns it into a flat "paving" mesh for a viewer that draws the real map as
// ground (src/export/paving.js).

export const PAVING_SIZE = 512; // 2.65 m per sample for Xcaret: ~35k triangles once traced
export const PAVING_FILE = 'paving.png';
