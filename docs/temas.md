# Temas de temporada

Un tema cambia el mapa durante una temporada del año: la noche, la decoración 3D del parque, los colores de la
página y, si trae un festival, su programa. El primero es **Día de Muertos** (del 1 de octubre al 2 de noviembre),
basado en las noches del Festival de Vida y Muerte de Xcaret.

## Cómo se elige

- `src/themes/index.js` registra los temas (`THEMES`). Cada uno tiene una **temporada** (`season`: primer y
  último día de cada año, en hora del parque, UTC−5). Fuera de ella el tema no existe: no aparece en Ajustes y
  ni la preferencia guardada ni la URL lo activan.
- `activeTheme(mode, date)` decide cuál se ve:
  - `'classic'` no muestra ninguno;
  - la clave de un tema en temporada lo muestra;
  - cualquier otra cosa (`'auto'`, la predeterminada, o un tema fuera de temporada) toma el primer tema en
    temporada: dentro de la temporada el tema está activado por defecto.
- En Ajustes → **Tema** (solo mientras algún tema está en temporada): Automático (con el tema vigente entre
  paréntesis), cada tema en temporada y Clásico. Se guarda en `localStorage` (`gx3d-theme`) y cambia sin
  recargar (`MapApp.setTheme`). Con la página abierta, la temporada se revisa cada minuto: el tema aparece o se
  quita solo al cambiar el día.
- Para capturas: `?theme=muertos` o `?theme=classic` (no se guarda; también solo en temporada).

## Qué define un tema

`src/themes/<clave>/index.js` exporta un objeto `Theme`:

| Campo         | Para qué                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `key`         | `html[data-theme]`; sus estilos van en `src/styles/themes/<clave>.css`                           |
| `label`       | nombre en Ajustes (`{ es, en }`)                                                                 |
| `season`      | `{ from: [mes, día], to: [mes, día] }`: los únicos días del año en que existe (puede cruzar año) |
| `tagline`     | línea bajo "Cargando mapa…"                                                                      |
| `alwaysNight` | con el modo día/noche en Automático, siempre de noche                                            |
| `night`       | luces de la noche sobre `LIGHTING.night` (`Stage.setNightStyle`): cielo, ambiente, exposición    |
| `decorations` | `async (ctx) => Layer`: la capa 3D del parque enfocado                                           |
| `festival`    | programa de un festival y sus lugares por parque                                                 |

`decorations` recibe el contexto de `createParkLayers` (`src/app/world.js`): `park`, `parkDef`, `heightAt`,
`surfaceAt`, `buildings`, `designArea` y la capa de faroles `lamps`. Se construye otra vez al cambiar de parque
o de tema; la capa lleva `theme: '<clave>'` para encontrarla y su `dispose()` deshace lo que haya cambiado fuera
de ella. Conviene cargarla con `import()` para no sumar su código al arranque.

Los colores de la página son tokens de `src/styles/base.css` (`--navy`, `--navy-2`, `--sky`, `--teal`,
`--sunset`, `--gold`, `--link`, `--panel`, `--backdrop`); el tema los redefine bajo
`:root[data-theme='<clave>']` e importa su hoja al final de `src/styles/index.css`.

## Día de Muertos

`src/themes/muertos/`:

- **Temporada:** del 1 de octubre al 2 de noviembre, el último día del festival; el 3 de noviembre se quitan el
  tema, la decoración y el programa, y vuelven el 1 de octubre siguiente.
- **Noche:** de noche por defecto (modo día/noche en Automático), cielo violeta oscuro y ambiente ámbar tenue.
- **Decoración** (`decorations.js`, medidas en `MUERTOS_STYLE`):
  - veladoras en frascos de colores a ambos lados de cada camino (andadores y rutas), con flamas que son
    puntos de luz como las cabezas de los faroles;
  - cempasúchil a ambos lados de los caminos, macetas con velas sobre las plazas pavimentadas y anillos de
    velas y flores en cada grada del cementerio;
  - altares de tres niveles (velas, arco de cempasúchil, calaveritas, tapete de pétalos) en los lugares del
    festival, o en la entrada y tres actividades de los demás parques;
  - hileras de altares sobre el pasto a los lados de un tramo de ruta (`ALTAR_ROWS` en
    `src/parks/xc/festival-places.js`; en Xcaret, la línea negra desde la actividad 15 hasta antes de que se le
    una la verde), alternando los estilos de `altars.js`: mesa con fondo de sarapes y camino de sarapes, repisas
    blancas bajo una pérgola con papel picado y foquitos, pastel redondo bajo un toldo con guirnalda de
    cempasúchil, y pirámide escalonada con calaveras, la X de colores y esqueletos. Cada altar busca un lugar libre
    de caminos, copas de árboles (`vegetation.bin`) y ruinas, mirando al camino; se dibujan a 1.3× para que se
    lean desde el mapa;
  - calaveras gigantes decoradas en algunas plazas, y papel picado con foquitos colgado sobre los caminos
    cercanos a los altares.
- **Luz en el suelo:** la capa pasa a los faroles (`setExtraLight`, `src/layers/lamps.js`) su color naranja, un
  trazo naranja a lo largo de los caminos (pétalos bajo la luz de las velas) y halos alrededor de velas,
  altares y cementerio; todo va al mapa de luz que el terreno suma de noche.
- **Calidad:** en presets bajos se muestran menos velas y flores de los caminos (las del cementerio y los altares
  siempre).
- La ubicación (anillos, huecos libres junto a un camino, cuerdas que cruzan el andador) son funciones puras en
  `shared/decorations.js`, con pruebas.

### El festival

- `pnpm data:festival` (`pipeline/fetch-festival.js`) descarga el programa del sitio del festival (su API no
  acepta peticiones de otros sitios) a `public/parks/xc/festival.json`. Para otro año, cambia `eventCode` en
  `src/themes/muertos/festival.js` y vuelve a correrlo. Un programa de otro año no se muestra: solo hasta su
  último día.
- `src/parks/xc/festival-places.js` traduce cada lugar del programa a metros del parque; `altar` pone ahí un
  altar (`true` busca un hueco junto a los caminos, `{ x, z, rotation }` lo fija). Un lugar en `null` aparece
  en la lista sin marcador. Una prueba exige que todo lugar del programa esté en ese archivo.
- En la página: pestaña **Festival** (escritorio) o sección arriba de la lista (celular) con un día por
  pestaña (hoy durante el festival); tocar una función vuela a su lugar. En el mapa, una calavera por lugar con
  las funciones del día (chip **Festival** en el celular).

## Agregar un tema

1. `src/themes/<clave>/index.js` con al menos `key`, `label` y `season`; regístralo en `THEMES`.
2. `src/styles/themes/<clave>.css` con sus tokens y su import al final de `src/styles/index.css`.
3. Opcional: `night`, `alwaysNight`, `decorations` (una capa como `muertos/decorations.js`) y `festival`.
4. Pruebas de su temporada en `tests/themes/themes.test.js`.
