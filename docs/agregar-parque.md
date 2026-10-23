# Agregar un parque

Ejemplo: Xel-Há (`xh`). Ya tiene sus fuentes en `src/parks/xh/index.js`; falta generar sus datos y modelarlo.

## 1. Definir el parque

Crea `src/parks/<key>/index.js` con lo mínimo:

```js
import { definePark } from '../define.js';

export default definePark({
  key: 'xh', // id en la URL: /xh/es
  name: 'Xel-Há',
  labelKey: 'lbl_map_prefix_xh', // texto del encabezado
  activities, // src/parks/xh/activities.js: número, nombre, categoría, ruta, posición
  services, // opcional, src/parks/xh/services.js: baños, casilleros…
  sources: {
    code: 'xh', // código corto del parque
    mapFrame: { latitude, longitude, bound1Lat, bound1Long, bound2Lat, bound2Long }, // centro y esquinas del mapa
    illustration: { nodeScale, nodeTranslation, sceneScale, scenePosition, masks: [] },
    osmBBox: [oeste, sur, este, norte],
    hours: { open: '08:30', close: '17:00' }, // opcional
  },
});
```

y regístralo en `src/parks/index.js`. `illustration` coloca la imagen del mapa ilustrado
(`data/raw/<key>-illustration.png`, que no se distribuye con el repositorio: hay que ponerla a mano) sobre el
terreno; ver `illustrationExtent()` en `shared/geo.js`. `masks` son rectángulos de la ilustración a ignorar
(logotipos, textos).

## 2. Descargar y generar

```
pnpm data:fetch xh        # OSM → data/raw/ (la ilustración se coloca a mano en data/raw/xh-illustration.png)
pnpm data:satellite xh    # imagen satelital alineada con la ilustración
pnpm data:build xh        # → public/parks/xh/
pnpm dev                  # http://localhost:5173/xh/es
```

Con eso ya hay terreno, agua, árboles, edificios genéricos, actividades y servicios dentro del área diseñada
(la parte de la ilustración sin nubes) y el mapa real de OpenStreetMap alrededor.

## 3. Rutas — `routes.js`

Cada ruta oficial: `slug`, `name` (como en los datos oficiales), `color`, `casing`, `label` y `stroke`, el color
con que está pintada en la ilustración. Los detectores de color están en `pipeline/strokes.js`; si la ruta usa
un color nuevo, agrega ahí su detector. `osm` (expresión regular) usa caminos de OSM con ese nombre como
respaldo.

## 4. Modelos — `landmarks.js`

Coloca los lugares emblemáticos con modelos existentes o nuevos (ver [agregar-modelo.md](agregar-modelo.md)).
`pnpm data:compare xh <ids>` ayuda a medir posiciones sobre la ilustración y el satélite.

## 5. Correcciones — `edits.js`

Donde el pipeline se equivoque, corrige con `edits` (la lista completa está documentada en
`src/parks/xc/edits.js` y validada por `EDIT_KINDS` en `pipeline/site.js`):

| Tipo              | Uso                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clearTrees`      | despejar árboles y edificios en un círculo                                                                                                                           |
| `ignoreRoofs`     | formas pintadas que no son techos (personajes, letreros)                                                                                                             |
| `keepRoofs`       | techos pintados reales junto al agua o bajo árboles (palapas)                                                                                                        |
| `satelliteCover`  | usar el satélite para decidir selva / pavimento en un círculo                                                                                                        |
| `pave` / `plant`  | pavimentar o sembrar polígonos (relativos a `at` o a un `landmark`; `plant` con `cover: 'lawn'` = matorral abierto; `pave` con `surface: 'dirt'` = tierra apisonada) |
| `water`           | agua (laguna; `cover: 'river'` = río oscuro) en polígonos o `lines` (polilíneas de `width` m, 8 por omisión; también en `pave`/`plant`)                              |
| `flatten`         | nivelar el terreno bajo un modelo                                                                                                                                    |
| `keepOsmBuilding` | forzar una huella de OSM (con tipo de techo)                                                                                                                         |
| `removeOsmPiers`  | quitar muelles de OSM que se modelaron a mano                                                                                                                        |

El pipeline ya descarta solo las formas color techo junto al agua (rocas, muelles de madera, lanchas: más de
15 % de agua alrededor y menos de 80 m²) y las de la selva (troncos y sombras: chicas u oscuras, rodeadas de
vegetación); `keepRoofs` rescata las palapas reales que caigan en esas reglas. Si el agua de la ilustración es
de un turquesa más verde, baja `sources.waterHueMin` (Xel-Há usa 160; por defecto 170).

**`pave` / `plant` / `water` amplían el parque**: sus polígonos siempre cuentan como área diseñada (`outside` =
0), aunque caigan fuera del contorno (modo satélite) o bajo las nubes de la ilustración. Un `pave` trazado fuera
del contorno empuja el borde del área diseñada hacia afuera (el contorno es un perfil polar alrededor del
centroide). Si no es lo que buscas, recórtalo al contorno o, en modo satélite, ajusta `sources.outline`.

**Senderos de tierra** — `pave` con `surface: 'dirt'` pinta tierra apisonada (ocre, grano rugoso, bordes
suaves) en vez de laja: brechas de vehículos y senderos en la selva. Se camina igual que un andador (la red de
andadores y las rutas la usan, los árboles no la invaden), pero no lleva juntas de laja ni guarnición de
piedra y no entra en la máscara `paving.png` de la exportación móvil (allí queda el mapa real debajo).

```js
{ kind: 'pave', surface: 'dirt', at: [0, 0], width: 3.5, lines: [[[0, 0], [40, 12], [80, 10]]] }
```

`pnpm data:overlay xh` dibuja todo lo generado sobre la ilustración oficial para revisar alineación.

## 6. Autobuses y fauna

`vehicles.js`: filas `{ from, to, count, heading, colors }` (ver `shared/vehicles.js`).
`fauna.js`: `flamingos`, `birds`, `dolphins` con posición, radio y cantidad (ver `src/layers/fauna.js`).

## 7. Verificar

```
pnpm check     # lint, formato y pruebas (ids, tipos de modelo, edits, rutas…)
```

## Parques sin ilustración oficial (modo satélite)

Xplor (`xp`), Xenses (`xs`) y Xoximilco (`xo`) no tienen mapa ilustrado.
Para ellos el pipeline lee el suelo de la **imagen satelital** (Esri World Imagery) y de **OpenStreetMap**; las
etapas 2–8 (cobertura, terreno, edificios, rutas, árboles, texturas, `park.json`) son las mismas.

```js
export default definePark({
  key: 'xs',
  name: 'Xenses',
  labelKey: 'lbl_map_prefix_xs', // agrégalo a src/i18n/es.js y en.js
  activities, // src/parks/xs/activities.js (ver abajo)
  sources: {
    mode: 'satellite',
    code: 'xs',
    center: { lat: 20.585055, lng: -87.127065 }, // origen del sistema local (centro del contorno OSM)
    extent: { size: 1000 }, // cuadrado (m) de la cuadrícula y del satélite; opcional cx, cz
    osmPark: 'way/550357202', // contorno del parque en OSM ("way/<id>" o "relation/<id>")
    osmBBox: [-87.1335, 20.5785, -87.121, 20.591], // debe cubrir todo el cuadrado
    name: 'Xenses', // si es distinto del nombre de la definición
    hours: { open: '08:30', close: '17:00' },
    // greenWater: true,   // canales / estanques de agua verde turbia (Xoximilco)
    // seaCorner: [u, v],  // si el cuadrado incluye mar (como en Xcaret)
    // satelliteRelease: 39767, // fija una captura de Esri Wayback (ver abajo)
    // outline: [[x, z], …],    // contorno trazado a mano en metros locales (ver abajo)
    // waterTint: '#557a45',    // color del agua interior (o { shallow, deep })
  },
});
```

- **Marco** (`parkFrame()` en `shared/geo.js`, usado por `context.js`, `fetch-satellite.js` y `park-data.js`):
  centro = `sources.center`; `extent` = `sources.extent` (por omisión centrado en el origen); `bounds` = ese
  cuadrado. Se eligen a mano y no se calculan del polígono de OSM, para que las coordenadas de actividades y
  modelos no se muevan si alguien edita OSM. Regla práctica: centro del contorno OSM y lado = lado mayor del
  contorno + ~300 m (≈ 0.5 m/px con la cuadrícula de 2048²).
- **Descarga**: `pnpm data:fetch xs` baja OSM y el satélite (zoom 18, 2400²) en vez de la ilustración; también
  `pnpm data:satellite xs [zoom]`. Si un parque falla, los demás siguen.
- **Clasificación** (`pipeline/stages/classify-satellite.js`): colores del satélite (selva, matorral/pasto,
  pavimento, agua, techos) con un filtro de mayoría y limpieza de manchas pequeñas; la selva incluye copas
  claras o secas (textura rugosa, mucha copa alrededor). Encima, OSM: pasto, estacionamientos y plazas,
  calles, andadores y senderos (también los que la copa tapa), huellas de edificios, cuerpos de agua, ríos y
  albercas. Fuera del contorno (`sources.outline` o, si no hay, `osmPark`) + 25 m es `outside`: el área diseñada (`clear`) sigue el contorno.
  No hay `masks` ni trazos de rutas.
- **Edificios**: solo huellas de OSM (todas las que caen dentro); el techo se vota con el color del satélite
  (terracota → teja, café/paja → palapa, claro → plano blanco). No hay "techos pintados".
- **Actividades**: en todos los parques salen de `src/parks/<key>/activities.js`:
  `[{ number, name: { es, en }, category: { es, en }, extraCost, x, z }]` (o `lat`/`lng` en vez de `x`/`z`; y
  opcionales `id`, `route`, `active`, `hours`, `desc`, `seasonal`). Cuando varias comparten número (una
  atracción en varios puntos, como en Xcaret) cada una lleva su `id`; un `id` repetido detiene el pipeline. En
  `park.json` quedan con `y` del terreno.
  Para medir posiciones: `pnpm data:compare xs -- -170:-25:30` (o `@-170:-25:30`; npm se come los argumentos que
  empiezan con `-`), que en modo satélite muestra la cobertura generada junto al satélite.
- **Revisión**: `pnpm data:overlay xs` dibuja edificios, andadores, actividades y el contorno del área diseñada
  sobre el satélite; `data/debug/xs-landcover.png` es la cobertura final.

Correcciones habituales con `edits.js`: `pave` para plazas que el satélite no muestra (bajo la copa) y
`pave` con `surface: 'dirt'` para senderos y brechas de tierra, `plant` para manchas claras que no son plaza,
`clearTrees` alrededor de modelos y `keepOsmBuilding` para forzar un tipo de techo. Limitaciones conocidas:
sombras largas y agua turbia que parece selva (`greenWater`).

Opciones de `sources` para estos parques (todas opcionales; sin ellas nada cambia):

- **`satelliteRelease`** — imagen reproducible. Esri World Imagery cambia sin aviso (capturas nuevas, nubes:
  la actual tiene una nube sobre la entrada y el norte de Xplor). Con el id numérico de una versión de
  [Esri Wayback](https://livingatlas.arcgis.com/wayback) (`satelliteRelease: 39767` = 2024-06-27, la que usa
  Xplor), `pnpm data:satellite` y `pnpm data:fetch` bajan los tiles de
  `https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/<id>/<z>/<y>/<x>`
  y los guardan en `data/raw/tiles/wayback-<id>/<zoom>/` (separados de la caché de la imagen actual,
  `data/raw/tiles/<zoom>/`). Para elegir una versión, compara capturas en el visor de Wayback: el servicio
  redirige cada tile a la versión en que cambió por última vez, así que el mismo id siempre da la misma imagen.
- **`outline`** — contorno del parque trazado a mano, como polígono en **metros locales** `[[x, z], …]`
  (mismo sistema que actividades, modelos y `edits`; x = este, z = sur). Sustituye al polígono `osmPark` para
  `outside` y el área diseñada (+ 25 m, luego perfil polar). `osmPark` sigue siendo obligatorio como
  referencia. Úsalo cuando el polígono de OSM no sirve: en Xoximilco la relación de OSM es un rectángulo
  compartido con Xavage (el contorno sigue los canales, el embarcadero, el camino de entrada y el
  estacionamiento, y deja fuera el lago de rafting); en Xplor el de OSM incluía casas al suroeste y se quedaba
  corto al sureste. Mide los vértices con `pnpm data:compare <key> -- x:z:r` y revisa el resultado con
  `pnpm data:overlay <key>` (línea magenta). Todas las actividades, modelos y vehículos deben quedar dentro
  (con al menos ~30 m de margen respecto al borde del área diseñada, o se desvanecen hacia el mapa real).
- **`waterTint`** — color del agua interior (lagunas, ríos, canales, albercas): `'#rrggbb'` (el tono
  profundo se oscurece solo) o `{ shallow: '#rrggbb', deep: '#rrggbb' }` (orilla → centro de los canales).
  Lo usan el agua animada de la web (`src/layers/water.js`) y los colores por vértice del agua de la
  exportación móvil (`src/export/water.js`); el mar abierto conserva su paleta. Se guarda en `park.json` solo
  si el parque lo define. Xoximilco usa `{ shallow: '#5d7f48', deep: '#3d5f3a' }` (verde turbio, medido en
  el satélite).

### Regiones (terreno alrededor de varios parques)

Una **región** es un `definePark` con `region: true` y sin actividades, rutas ni modelos (ejemplo:
`src/parks/xcr`, la «Zona Xcaret» alrededor de Xcaret, Xplor y Xenses). Usa las mismas fuentes que un parque en
modo satélite pero con `sources.outline` obligatorio (no hace falta `osmPark` ni `labelKey`) y se genera igual:

```
pnpm data:fetch xcr && pnpm data:satellite xcr && pnpm data:build xcr
```

No aparece en el selector, en las URL ni en la exportación móvil; la app la dibuja solo como el vecino de menor
prioridad de los parques que toca (ver [Arquitectura](arquitectura.md#región-zona-xcaret-srcparksxcr)). Traza el
contorno sobre OSM con los caminos como bordes, ~50 m más allá del eje de cada carretera, e incluye una franja
de mar si toca la costa (`seaCorner`). Revisa con `pnpm data:overlay <key>`.
