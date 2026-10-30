// App-wide settings.

/**
 * Real map shown around the designed area of each park (src/layers/basemap.js).
 * The default is the standard OpenStreetMap tile server, fine for development
 * and moderate traffic (https://operations.osmfoundation.org/policies/tiles/).
 * For heavy production traffic point `url` to a tile provider or an own tile
 * server with the same {z}/{x}/{y} scheme, and update the attribution.
 */
export const BASEMAP = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileSize: 256,
  minZoom: 3,
  maxZoom: 19,
  /** color of the map style's land, shown while tiles load */
  background: '#f2efe9',
  /** color of the map style's sea: a region's sea fades to it at its outline (layers/neighbors.js) */
  sea: '#aad3df',
  attribution: {
    es: '© colaboradores de OpenStreetMap',
    en: '© OpenStreetMap contributors',
    zh: '© OpenStreetMap 贡献者',
    ja: '© OpenStreetMap 貢献者',
    fr: '© les contributeurs d’OpenStreetMap',
    pt: '© colaboradores do OpenStreetMap',
    ko: '© OpenStreetMap 기여자',
    ar: '© مساهمو OpenStreetMap',
    it: '© contributori di OpenStreetMap',
    hi: '© OpenStreetMap योगदानकर्ता',
  },
  attributionUrl: 'https://www.openstreetmap.org/copyright',
};
