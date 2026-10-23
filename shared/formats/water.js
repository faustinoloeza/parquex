// water.png — WATER_SIZE² RGB over the park extent (row 0 = north):
//   R  signed distance to the shore in meters, > 0 in the water, mapped from
//      [WATER_SDF.min, WATER_SDF.max] to 0..255 (a distance field keeps the
//      shoreline sharp when magnified, so a small texture is enough)
//   G  tint: sea 0, pool 0.25, lagoon 0.45, river 1
//   B  unused

export const WATER_SIZE = 1024;
export const WATER_SDF = { min: -8, max: 40 };
