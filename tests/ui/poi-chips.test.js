import { describe, expect, it } from 'vitest';
import { groupsOf, OTHER } from '../../src/ui/poi-chips.js';

const L = (value) => value?.es ?? '';
const poi = (id, category, route = '', extra = {}) => ({
  id,
  number: Number(id),
  active: true,
  x: Number(id) * 10,
  z: -Number(id) * 10,
  name: { es: `Actividad ${id}`, en: '' },
  category: { es: category, en: '' },
  route: { es: route, en: '' },
  ...extra,
});

describe('filter chips (phones)', () => {
  it('groups activities by route, the rest under "other"', () => {
    const park = {
      routes: [
        {
          slug: 'rio',
          name: { es: 'Ruta del Río' },
          label: { es: 'Línea negra' },
          color: '#232323',
          casing: '#ffffff',
          lines: [
            [
              [0, 0],
              [100, 50],
            ],
          ],
        },
        {
          slug: 'selva',
          name: { es: 'Ruta de la Selva' },
          label: { es: '' },
          color: '#16a34a',
          casing: '#0f3d1f',
          lines: [
            [
              [5, 5],
              [8, 9],
            ],
          ],
        },
      ],
      pois: [
        poi('1', 'Restaurantes', 'Ruta del Río'),
        poi('2', 'Tiendas', 'Ruta del Río'),
        poi('3', 'Tiendas', 'Ruta de la Selva'),
        poi('4', 'Tiendas'),
      ],
    };
    const { groups, groupOf } = groupsOf(park, L);
    expect(groups.map((g) => [g.key, g.label, g.count])).toEqual([
      ['route:rio', 'Línea negra', 2],
      ['route:selva', 'Ruta de la Selva', 1], // no label: the route name
      [OTHER, null, 1],
    ]);
    expect(groups[0].bounds).toEqual({ x0: 0, x1: 100, z0: 0, z1: 50 });
    expect(groupOf(park.pois[2])).toBe('route:selva');
    expect(groupOf(park.pois[3])).toBe(OTHER);
  });

  it('groups by category in parks without routes', () => {
    const park = { routes: [], pois: [poi('1', 'Restaurantes'), poi('2', 'Atracciones'), poi('3', 'Atracciones'), poi('4', '')] };
    const { groups } = groupsOf(park, L);
    expect(groups.map((g) => [g.key, g.count])).toEqual([
      ['cat:Restaurantes', 1],
      ['cat:Atracciones', 2],
      [OTHER, 1],
    ]);
    expect(groups[0].color).toBe('#ef4444'); // its style in icons.js
    expect(groups[1].color).toMatch(/^#[0-9a-f]{6}$/); // no style: the spare palette
    expect(groups[1].bounds).toEqual({ x0: 20, x1: 30, z0: -30, z1: -20 });
  });

  it('leaves inactive activities out of every group', () => {
    const park = { routes: [], pois: [poi('1', 'Tiendas'), poi('2', 'Tiendas', '', { active: false })] };
    const { groups, groupOf } = groupsOf(park, L);
    expect(groups.map((g) => g.count)).toEqual([1]);
    expect(groupOf(park.pois[1])).toBeNull();
  });
});
