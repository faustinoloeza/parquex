# Agregar un modelo 3D

Un modelo es un edificio u objeto paramétrico (una pirámide, una palapa, un asta bandera). Se define una vez en
`src/models/` y se coloca las veces que haga falta desde `src/parks/<key>/landmarks.js`.

## 1. Crear el archivo

Elige la carpeta por estilo (`mayan/`, `colonial/`, `attractions/`, `waterfront/`) y crea, por ejemplo,
`src/models/mayan/observatory.js`:

```js
import { ModelKit } from '../kit.js';
import { defineModel } from '../define.js';

/** Observatorio maya: base escalonada y torre redonda */
export default defineModel({
  type: 'observatory', // nombre que usarán los parques
  label: 'Observatorio maya', // nombre legible
  params: { size: 12, height: 9 }, // valores por defecto, se pueden cambiar en cada parque

  // opcional: área sólida que las líneas de ruta deben rodear
  footprint: (p) => ({ circle: p.size / 2 + 1 }),

  build(p) {
    const k = new ModelKit();
    k.box('limestone', p.size, 2, p.size, 0, 0, 0); // ancho, alto, fondo, luego x, y (base), z
    k.cyl('limestone', 2.5, 3, p.height, 0, 2, 0); // radio arriba, radio abajo, alto, x, y, z
    k.cyl('darkStone', 2.8, 2.8, 0.4, 0, 2 + p.height, 0);
    return { object: k.build() };
  },
});
```

Reglas del sistema local del modelo: metros, `y` hacia arriba, el frente mira a `+z` (sur), el origen es el
punto que se colocará en `x, z` del parque y queda apoyado sobre el terreno.

## 2. Registrarlo

En `src/models/index.js` importa el archivo y agrégalo a la lista. El `type` debe ser único.

## 3. Colocarlo en un parque

En `src/parks/xc/landmarks.js`:

```js
{ id: 'observatorio', type: 'observatory', x: 120, z: -40, size: 14, rotation: 30 * DEG, clear: 10 },
```

- `id` único dentro del parque (lo usan los `edits` y las herramientas de depuración);
- `x`, `z` en metros desde el centro del mapa (`x` este, `z` sur);
- `rotation` en radianes (antihorario visto desde arriba);
- `clear` radio que queda libre de árboles y edificios genéricos;
- `y` solo si debe ir a una altura fija (muelles, lanchas); si no, se apoya en el terreno;
- cualquier otro campo sobrescribe `params`.

Para ubicarlo con precisión: `pnpm data:compare xc observatorio` genera recortes ilustración / satélite con
una cuadrícula de 5 m alrededor del modelo (también acepta puntos sueltos `x:z:radio`).

## 4. Reconstruir y verificar

```
pnpm data:build xc   # recoloca árboles, edificios y rutas alrededor del modelo
pnpm test            # construye todos los modelos y valida el contenido
pnpm dev
```

## Herramientas disponibles

**`ModelKit`** (`models/kit.js`): `box`, `cyl`, `rod(material, a, b, radio)` (barra entre dos puntos), `add(material, geometría, x, y, z, rotY)` para cualquier
`BufferGeometry`, `addTransformed(material, geometría, matriz)`, y `build()` que fusiona por material.

**Geometría** (`graphics/geometry.js`): `hipRoof`, `polygonPyramid`, `extrudePolygon`, `extrudeWithHoles`,
`extrudeProfile`, `insetRoof`, `ellipse`, `frustum`, `regularPolygon`…

**Arquitectura** (`graphics/architecture.js`): `facadeWalls`, `parapet`, `posts`, `coneRoof`, `tieredRoof`.

**Piezas** (`models/parts/`): bandera ondeando, personas, felinos, flamencos, aves, rocas, autobús, árboles.

**Materiales** (`graphics/materials.js`): se piden por nombre — `limestone` (mampostería clara, los muros de
piedra del parque), `rockwall` (mampostería gris envejecida: ruinas, fosos), `paving` (piso de laja), `stone`,
`darkStone`, `white`, `ochre` (muros coloniales), `wall`, `tile`, `thatch`, `wood`, `iron`, `glass`, `pool`,
`lawn`, `leaves`, `textile` (patrones de textil mexicano), `darkRubble` (mampostería
oscura y húmeda)… Cada material nuevo que use algún modelo es un draw call más. Si un modelo necesita uno propio
(por ejemplo una textura pintada), se pasa en `k.build({ miMaterial })`. Si el nombre no existe, `build()`
lanza un error.

## Opcionales de `defineModel`

| Campo            | Para qué                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------- |
| `footprint(p)`   | `{ circle }`, `{ ellipse: [rx, rz] }` o `{ rect: [ancho, fondo] }`: las rutas lo rodean       |
| `clearPaths(p)`  | caminos absolutos `{ pts, width, closed? }` que quedan libres de árboles                      |
| `walkable(p)`    | líneas absolutas `{ line, width }` por donde se puede caminar (ajuste de rutas)               |
| `groundHoles(p)` | anillos absolutos `{ rings, cover? }` recortados del suelo (fosos hundidos, ver Arquitectura) |
| `build(p, ctx)`  | `ctx.park` (datos de `park.json`) y `ctx.heightAt(x, z)` (altura del terreno)                 |
| `update(t, dt)`  | devuelto por `build` junto a `object` para animar (cabinas, banderas, animales)               |

Lo que se anima debe ir en objetos aparte (no en el `ModelKit`): todo lo creado con `ModelKit` se considera
estático y se fusiona con el resto de los modelos.

## Rendimiento

- Usa el `ModelKit` y materiales de la biblioteca siempre que se pueda: esa geometría se fusiona con la de
  todos los modelos del parque y casi no cuesta draw calls.
- Para lo que se anima, junta en **una malla por parte que se mueve** sus piezas pintadas por vértice
  (`mergeGeometries` + `solidColor` y el material `vertex`), como `person()` y `bigCat()` en
  `models/parts/creatures.js`. Cada malla suelta es un draw call en cada cuadro.
- Superficies mate (`roughness ≥ 0.7`, sin metal) usan sombreado Lambert automáticamente; deja PBR para
  metal, vidrio o pintura brillante.
- Texturas pintadas en canvas: del tamaño que se verá en pantalla (512 px suele bastar) y con
  `releaseAfterUpload()` (`graphics/memory.js`) para no guardar una copia en RAM.
