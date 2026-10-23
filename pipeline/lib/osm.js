import fs from 'node:fs/promises';

/**
 * OpenStreetMap download (api.openstreetmap.org map.json) with ways resolved
 * to local coordinates.
 * @param {string} file
 * @param {{ toLocal: (lat: number, lng: number) => [number, number] }} projection
 */
export async function loadOsm(file, projection) {
  return makeOsm(JSON.parse(await fs.readFile(file, 'utf8')), projection);
}

/**
 * OpenStreetMap data ({ elements: [...] } as map.json returns it) with ways
 * resolved to local coordinates.
 * @param {{ elements: object[] }} osm
 * @param {{ toLocal: (lat: number, lng: number) => [number, number] }} projection
 */
export function makeOsm(osm, projection) {
  const nodes = new Map(osm.elements.filter((e) => e.type === 'node').map((e) => [e.id, e]));
  const byRef = new Map(osm.elements.map((e) => [`${e.type}/${e.id}`, e]));
  const wayPoints = (way) =>
    way.nodes
      .map((id) => nodes.get(id))
      .filter(Boolean)
      .map((n) => projection.toLocal(n.lat, n.lon));
  return {
    elements: osm.elements,
    /** Way geometry as [[x, z], ...] in local meters. */
    wayPoints,
    isClosed: (way) => way.nodes[0] === way.nodes[way.nodes.length - 1],
    /** Element by reference ("way/123", "relation/456"), or undefined. */
    find: (ref) => byRef.get(ref),
    /**
     * Rings of an area (closed way, or multipolygon relation with its member
     * ways joined end to end) in local meters: { outer: [[x, z]…][], inner: […][] }.
     * Unclosed leftovers of a relation are dropped.
     */
    areaRings(el) {
      if (el.type === 'way') return { outer: el.nodes[0] === el.nodes[el.nodes.length - 1] ? [wayPoints(el)] : [], inner: [] };
      const rings = { outer: [], inner: [] };
      if (el.type !== 'relation') return rings;
      for (const role of ['outer', 'inner']) {
        const parts = el.members
          .filter((m) => m.type === 'way' && (m.role || 'outer') === role)
          .map((m) => byRef.get(`way/${m.ref}`)?.nodes)
          .filter((n) => n?.length > 1)
          .map((n) => [...n]);
        while (parts.length) {
          let ring = parts.shift();
          // append the parts that continue the ring until it closes
          for (let grew = true; grew && ring[0] !== ring[ring.length - 1];) {
            grew = false;
            for (let k = 0; k < parts.length; k++) {
              const p = parts[k];
              const end = ring[ring.length - 1];
              if (p[0] === end) ring = ring.concat(p.slice(1));
              else if (p[p.length - 1] === end) ring = ring.concat(p.slice(0, -1).reverse());
              else continue;
              parts.splice(k, 1);
              grew = true;
              break;
            }
          }
          if (ring[0] === ring[ring.length - 1]) rings[role].push(wayPoints({ nodes: ring }));
        }
      }
      return rings;
    },
  };
}
