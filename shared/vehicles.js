// Parked vehicles are authored as rows (see src/parks/<park>/vehicles.js).

/** Radius in meters kept free of trees and generic buildings around a bus. */
export const BUS_CLEARANCE = 6.5;

/**
 * Expands bus rows into one entry per bus.
 * @param {Array<{ from: number[], to: number[], count: number, heading: number, colors: string[] }>} rows
 * @returns {Array<{ x: number, z: number, heading: number, color: string }>}
 */
export function expandBusRows(rows = []) {
  const out = [];
  for (const row of rows) {
    for (let i = 0; i < row.count; i++) {
      const t = row.count === 1 ? 0 : i / (row.count - 1);
      out.push({
        x: row.from[0] + (row.to[0] - row.from[0]) * t,
        z: row.from[1] + (row.to[1] - row.from[1]) * t,
        heading: row.heading,
        color: row.colors[i % row.colors.length],
      });
    }
  }
  return out;
}
