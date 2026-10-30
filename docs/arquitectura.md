# Arquitectura

El proyecto tiene dos mitades que se comunican solo por archivos:

```
fuentes (mapa ilustrado, OSM, satélite) ► pipeline/ ──► public/parks/<key>/ ──► src/ (navegador)
                                            ▲                                    ▲
                                            └──────── src/parks/<key>/ ──────────┘
                                                   (contenido del parque)
```

El trabajo pesado (leer la ilustración, trazar rutas, colocar miles de árboles) se hace **una vez, offline**.
La app solo carga archivos compactos y los dibuja, así arranca rápido y corre fluida.

## Área diseñada y mapa real

Cada parque tiene un **área diseñada**: la parte de la ilustración oficial que no tapan sus nubes, guardada en
`park.json → clear` como un perfil polar (radio del contorno en 72 direcciones). `shared/design-area.js` la
convierte en funciones que usan ambos lados:

- el pipeline solo genera árboles, edificios y muelles dentro del área (con un margen irregular);
- la app dibuja el parque 3D dentro y, fuera, el **mapa real** (`layers/basemap.js`: tiles de OpenStreetMap,
  configurables en `src/config.js`), fundidos en una franja de ~50 m (`graphics/shaders/design-fade.js`).

```
             contorno del área diseñada
   parque 3D  ───────────── franja ─────────────  mapa real
   fade = 0   -45 m ........... 0 ........... +5 m   fade = 1
```

## Contenido de un parque — `src/parks/<key>/`

Lo comparten el pipeline y la app. Cada archivo responde una pregunta:

| Archivo         | Contenido                                                         | Lo usa         |
| --------------- | ----------------------------------------------------------------- | -------------- |
| `sources.js`    | marco del mapa, posición de la ilustración, OSM, horario          | pipeline       |
| `routes.js`     | rutas oficiales: color, nombre, trazo en la ilustración           | pipeline       |
| `landmarks.js`  | modelos 3D colocados (tipo, posición, parámetros)                 | pipeline + app |
| `edits.js`      | correcciones manuales a lo que el pipeline deduce solo            | pipeline       |
| `vehicles.js`   | filas de autobuses estacionados                                   | pipeline + app |
| `fauna.js`      | animales animados (flamencos, aves, delfines)                     | app            |
| `activities.js` | actividades: número, nombre, categoría, ruta, horario, posición   | pipeline       |
| `services.js`   | servicios (baños, casilleros, enfermería…)                        | pipeline       |
| `index.js`      | `definePark({...})` une todo; se registra en `src/parks/index.js` |                |

`src/parks/define.js` documenta la forma de cada objeto (JSDoc, autocompletado en el editor).

## Pipeline — `pipeline/`

`pnpm data:build xc` crea un contexto (`context.js`: proyección, cuadrícula de 2048², datos crudos) y ejecuta
las etapas en orden. Cada etapa documenta en su encabezado qué lee y qué deja en el contexto.

1. **classify** — clasifica la ilustración oficial por color (agua, selva, caminos…) y quita los trazos de rutas.
   Los parques sin ilustración (`sources.mode: 'satellite'`: Xplor, Xenses, Xoximilco) usan la imagen satelital
   - OSM (`classify-satellite.js`, ver [agregar-parque.md](agregar-parque.md)) y dejan los mismos productos.
2. **landcover** — cobertura final del suelo + campos de distancia; aplica OSM, satélite y `edits`; calcula el
   contorno del área diseñada.
   Las orillas pedregosas de lagunas y ríos (≤ 5 m del agua) y los islotes son roca, no plaza: así el patrón de
   laja y la capa `paving` de la app quedan solo en andadores y plazas. La clase `DIRT` (tierra apisonada:
   senderos y brechas, `pave` con `surface: 'dirt'`) se camina como un andador pero no lleva laja ni
   guarnición y no entra en `paving`.
3. **terrain** — alturas (fondo marino, ríos planos, lomas suaves).
4. **buildings** — edificios genéricos: huellas de OSM + techos pintados en la ilustración.
5. **routes** — muelles y líneas de rutas: trazo de color → línea centrada en el andador, unida y suavizada.
   También la **red de andadores** (`lib/walkway-network.js`): los caminos peatonales de OSM redibujados sobre
   los andadores del suelo (ver _Andadores_).
6. **vegetation** — árboles por probabilidad según el suelo, nunca sobre caminos, edificios ni modelos.
7. **textures** — suelo estilizado con sombras como pirámide de tiles (`ground/`, ver
   `shared/formats/ground-tiles.js`; andadores y plazas con juntas de laja), `water.png` (distancia con signo a
   la orilla + tinte) y `paving.png` (máscara de caminos y plazas: exportación móvil y faroles de noche). La
   paleta por clase (`GROUND_COLORS`) y la amplitud del ruido (`GROUND_NOISE`) están al inicio de
   `stages/textures.js` (ver _Día y noche → Estilo de día_).
8. **parkData** — `park.json`: actividades, servicios, horarios, rutas, área diseñada, lista de tiles del suelo
   y, si el parque lo define, `waterTint` (color del agua interior, `shared/water-tint.js`).

`site.js` traduce el contenido del parque (modelos y `edits`) a preguntas para las etapas:
“¿este punto debe quedar libre de árboles?”, “¿esta forma pintada no es un techo?”, “¿qué huella ocupa este
modelo?”. Por eso al mover un modelo en `landmarks.js` y reconstruir, los árboles y edificios se reacomodan solos.

Los datos se escriben en formatos compactos definidos en `shared/formats/` (los usan tanto el pipeline al
escribir como la app al leer). La construcción es determinista: mismas entradas ⇒ mismos bytes.

## Aplicación — `src/`

```
main.js ── UI (header, sidebar, toolbar, loading) ──► MapApp
                                                      ├─ loadParkAssets()   app/assets.js
                                                      ├─ Stage              renderer, escena, cámara, luces, controles
                                                      ├─ createWorld()      crea las capas en orden (cediendo al navegador)
                                                      ├─ markers            marcadores HTML de actividades
                                                      ├─ CameraRig          vistas, vuelos, límites
                                                      └─ QualityManager     calidad según el equipo y los FPS
```

**Capas** (`src/layers/`): cada una es una función `createXxxLayer(opciones)` que devuelve
`{ name, object, update?(frame), setQuality?(preset), occludesRoutes?, loading? }`. `frame` trae tiempo, cámara,
frustum y escala de pantalla; `loading` indica que la capa aún descarga datos. Para agregar una capa se escribe
el archivo y se crea en `app/world.js`.

| Capa         | Qué dibuja                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `terrain`    | relieve en bloques recortados al área diseñada (y a los huecos de los modelos); textura del suelo por niveles                           |
| `basemap`    | tiles del mapa real alrededor, con nivel de zoom por tile según la distancia                                                            |
| `water`      | agua animada (orilla, profundidad, espuma) que se desvanece hacia el mapa real; color del agua interior por parque con `park.waterTint` |
| `vegetation` | árboles instanciados; detalle por bloque según la distancia a la cámara                                                                 |
| `buildings`  | edificios genéricos del pipeline, fusionados por material                                                                               |
| `piers`      | muelles de OSM                                                                                                                          |
| `landmarks`  | modelos 3D de `src/models/`, parte estática fusionada por material                                                                      |
| `vehicles`   | autobuses estacionados                                                                                                                  |
| `walkways`   | andadores por donde camina la gente (línea discontinua clara, ver abajo)                                                                |
| `routes`     | líneas de rutas oficiales                                                                                                               |
| `lamps`      | faroles del modo noche (postes + cabezas luminosas) y el mapa de luz que usan terreno y agua, ver _Día y noche_                         |
| `fauna`      | flamencos, aves y delfines animados                                                                                                     |
| `neighbors`  | parques vecinos y región en versión ligera (suelo + árboles + agua quieta), ver _Parques vecinos_                                       |

**Orden de dibujo**: terreno → mapa real (mezclado encima, sin prueba de profundidad, solo fuera del área) →
suelo de la región (`renderOrder` −1.6) → suelo de los parques vecinos (−1.5, mezclados encima) → todo lo demás
contra la profundidad del terreno → agua (transparente).

**Render por cuadro** (`app/Stage.js`): escena principal → profundidad de lo que tapa rutas (edificios,
modelos, autobuses) → líneas de rutas, que así se ven continuas sin pintarse encima de los edificios.

**Rendimiento y memoria**:

- **Streaming acotado** (`graphics/tile-cache.js`): suelo y mapa real se piden por tiles según lo que se ve,
  con prioridad, pocas descargas simultáneas, cancelación de lo que ya no se necesita y descarte LRU por encima
  de un presupuesto que fija la calidad.
- **Una sola copia** (`graphics/memory.js`): imágenes decodificadas fuera del hilo principal
  (`graphics/texture-loader.js`) y liberadas de la RAM al subirlas a la GPU; lo mismo con la geometría estática.
  Si el navegador pierde el contexto WebGL (poca memoria), la página se recarga.
- Los modelos se construyen con `ModelKit`, que fusiona la geometría por material; después la capa de modelos
  vuelve a fusionar todo lo estático de todos los modelos ⇒ decenas de edificios en unos pocos draw calls. Las
  figuras animadas (personas, felinos) son una malla con colores por vértice por cada parte que se mueve.
- Materiales mate con sombreado Lambert (más barato por píxel); PBR solo para metal, vidrio y superficies
  brillantes.
- Árboles, autobuses y animales usan `InstancedMesh`; el viento y las banderas se animan en shaders.
- Calidad (`app/quality.js`): nivel inicial según el equipo, bajada automática si los cuadros son lentos al
  mover el mapa, tope de FPS (y menor cuando nada se mueve). Cambiar sombras recompila shaders en segundo plano.
- Sombras recalculadas solo al mover la vista y cada 12 cuadros (en «media», a lo más cada 4 cuadros al mover:
  `shadowEvery`); texturas procedurales con semilla y en caché.

## Parques vecinos

Xcaret, Xplor y Xenses están uno junto al otro cerca de Playa del Carmen y **siempre se ven juntos**, con la
tierra que los rodea (la **región** «Zona Xcaret»). El parque elegido en el selector es el **parque enfocado**:
se dibuja completo (marcadores, rutas, andadores, edificios, modelos, autobuses, fauna, suelo por streaming,
encuadre de cámara) y los parques cercanos aparecen alrededor en una **versión ligera** (`layers/neighbors.js`).

- **Quién es vecino** (`shared/neighbors.js → findNeighbors`): se leen los `park.json` de los demás parques y se
  comparan las áreas diseñadas (`clear`) en un mismo marco; son vecinos si los contornos quedan a menos de
  `NEIGHBOR_DISTANCE` (1.5 km). Sin pares fijos: hoy Xcaret ↔ Xplor, Xenses (+ la región); Xel-Há (~30 km) y
  Xoximilco (Cancún) no tienen vecinos. El orden (más cercano primero) es la prioridad donde dos vecinos se
  enciman; las regiones (`park.json → region`) van siempre al final.
- **Marco común** (`parkOffset`): el marco local del parque enfocado es el del mundo. Cada parque tiene su
  proyección equirectangular alrededor de `park.json → center`; pasar de una a otra por latitud/longitud es
  exactamente `x' = x · sx + dx`, `z' = z + dz` (`sx` ≈ 1 ± 1e-4). Es la misma proyección con la que
  `layers/basemap.js` coloca los tiles de OSM, así que suelo, árboles y calles del vecino coinciden con el mapa.
  Cada vecino es un `Group` con esa posición y escala; su geometría queda en sus propias coordenadas.
- **Contenido ligero**: suelo = solo el tile de nivel 0 (`ground/0-0-0.webp`, sin streaming) sobre una malla
  de ~12 m de las alturas de `height.bin` (≤ 128² celdas); árboles = uno de cada `treeStride` (máximo
  `maxTrees` por parque) con la geometría barata `lo`, en dos tipos (latifoliado, con tinte para la variedad
  clara y escala para ceibas; palmeras; los arbustos se omiten) y una `InstancedMesh` por tipo y cuadrante del
  parque (≤ 8 draw calls, con descarte por frustum); agua = el mismo shader en versión quieta (`#define LITE`:
  sin olas, brillos ni espuma) sobre las celdas bajas (< 0.5 m). Sin marcadores, rutas, andadores, edificios,
  modelos, autobuses ni fauna.
- **Uniones**: la opacidad del suelo vecino va por vértice (`neighborOpacity`): su propio desvanecido hacia el
  mapa real × el desvanecido del parque enfocado (y de los vecinos con prioridad). Se dibuja después del mapa
  real (`renderOrder` −1.5, mezcla como el mapa, sin prueba de profundidad: las alturas de dos parques difieren
  hasta ~2 m), así que dentro del parque enfocado solo se ve ese parque, las calles de OSM no se asoman dentro
  de un vecino y donde dos áreas se tocan los suelos se funden. Los árboles del vecino se quitan a más de 15 m
  dentro de un área con prioridad (los del parque enfocado empiezan 30 m dentro): no hay árboles dobles.
- **Carga**: en cuanto el parque enfocado está en pantalla (2 cuadros), uno por uno y en momentos ociosos se
  descargan los 4 archivos de cada vecino, se arma la geometría y se compilan sus shaders con `compileAsync`
  antes de mostrarlo (los tres parques y la región aparecen en uno o dos segundos). `loading` queda activo
  mientras tanto (`?still` espera a los vecinos). `MapApp` guarda los `park.json` y los archivos ligeros de cada
  parque visto (enfocado o vecino) para no volver a pedirlos.
- **Calidad** (`QualityPreset.neighbors`): alta `{ treeStride: 3, maxTrees: 4000, regionTrees: 6000 }`, media
  `{ 4, 2500, 3500 }`, baja `{ 6, 1200, 1500 }`. Ningún nivel los apaga: al cambiar la calidad (a mano o por la
  bajada automática) solo se rehacen los árboles de cada vecino, en el mismo cuadro, sin que desaparezcan.
  `?noneighbors` los quita para comparar.

### Cambiar de parque sin recargar

El selector del encabezado no recarga la página entre parques vecinos (`MapApp.focusPark`, usado por
`main.js`): el parque nuevo se arma fuera de escena reutilizando lo que ya estaba cargado para su versión
ligera (`loadParkAssets({ cached })`: solo falta `buildings.json`), se arman los vecinos del nuevo enfoque
(`neighbors.prepareFocus`, con el parque anterior ya como vecino ligero) y se compilan los shaders; luego, en un
solo paso entre dos cuadros (`swapFocus`), se cambian las capas del parque, el mapa real pasa al marco del
parque nuevo (`basemap.setFocus`, sin perder tiles), entran los vecinos nuevos, la cámara se traslada al marco
nuevo (misma vista: nada salta) y vuela a encuadrar el parque. Después se liberan las capas del parque anterior
(`disposeObject`; quedan los recursos compartidos marcados con `markShared` y las texturas ligeras en caché).
La URL (`history.pushState`), el título, el encabezado (nombre, horario) y la barra lateral (actividades,
rutas) pasan al parque nuevo; atrás/adelante del navegador también cambian el enfoque. Elegir un parque sin
vecindad (Xel-Há, Xoximilco) o cambiar de idioma sí recarga la página.

### Región «Zona Xcaret» (`src/parks/xcr`)

Para que los tres parques no se vean como manchas sueltas sobre el mapa de calles, el terreno entre y alrededor
de ellos también se dibuja estilizado: selva, pasto, arena, calles y caminos claros, edificios del Hotel Xcaret
como plaza, albercas, lagunas y el mar.

- **Qué es**: un «parque» con `region: true` (`definePark`), construido por el pipeline en modo satélite
  (`satelliteRelease: 39767`, la captura sin nubes de Xplor) dentro de un contorno trazado a mano
  (`sources.outline`): la carretera MEX 307 al noroeste, el camino de acceso del Hotel Xcaret al noreste hasta
  la costa, ~250–300 m de mar frente a la costa y, al suroeste, el límite municipal de Solidaridad (Calica) y el
  camino desde el entronque de la carretera. Cuadrado de 3.5 km (≈ 1.7 m/px en la cuadrícula de 2048²). Los
  bordes van ~50 m más allá del eje de cada carretera para que la calzada quede dentro de la parte opaca. No
  tiene actividades, rutas ni modelos.
- **Nunca seleccionable**: `SELECTABLE_PARKS` (`src/parks/index.js`) la deja fuera del selector, de las URL
  (`/xcr/es` abre el parque por omisión) y de la exportación móvil (`pipeline/export-glb.js`): no tiene carpeta
  propia en la app; su suelo, agua y árboles solo viajan dentro del paquete de contexto de cada parque.
- **Salida más ligera** (solo para regiones, los demás parques no cambian): solo el tile de suelo de nivel 0
  (la app nunca pide más), `vegetation.bin` con un subconjunto parejo de ≤ 30 000 árboles (todos siguen
  horneando sombras en el suelo), el contorno polar sin suavizar (no redondea las esquinas) y `region: true`
  en `park.json`. En el mar, las manchas claras chicas a más de 40 m de tierra (lanchas) se vuelven mar (solo
  parques con `seaCorner`).
- **Prioridad más baja**: es el último vecino de Xcaret, Xplor y Xenses y queda debajo de todos. Su suelo se
  dibuja antes que los vecinos (`renderOrder` −1.6) con opacidad, calculada por píxel, = (1 − su propio
  desvanecido) × el desvanecido del parque enfocado; el mapa real cede debajo de ella (`basemap.setRegion`:
  `alpha · (1 − r) / (1 − r · alpha)`), así parque enfocado, región y mapa suman exacto y los tiles de OSM que
  la región cubre ni se descargan. Los parques vecinos se mezclan encima con su propia opacidad. Su agua y sus
  árboles ceden a todos los parques (no hay árboles dentro de un parque). Árboles: una selección pareja de
  `regionTrees` entre los que quedan fuera de los parques. Cuesta ≤ 10 draw calls (suelo, agua y 8 grupos de
  árboles) y ~6 MB de textura (tile de nivel 0 + `water.png`).
- **Tono junto a Xcaret** (`sources.groundGrade`, etapa `textures`): la paleta por clase es la misma en todos
  los parques, pero la región (satélite) es casi toda selva y la orilla de la ilustración de Xcaret mezcla
  selva y pasto (≈ 60/40 %), así que se ve más clara. La selva de la región se aclara hacia el verde del pasto
  (`lawn` 0.45 = el promedio de la orilla de Xcaret) con un peso 1 en el contorno de Xcaret que baja a 0 a
  `reach` (700 m) y que se mantiene en 0 junto a Xplor y Xenses (`keep`, entrando en `keepReach` 250 m): esas
  uniones (misma selva satelital) no cambian. Los contornos salen de los `park.json` ya construidos de esos
  parques (construir la región después de ellos).
- **Mar**: el agua de la región pasa al color del mar del mapa real (`BASEMAP.sea`, `#aad3df`) y a opacidad
  completa hacia su contorno (`REGION_SEA_EDGE`: del todo en los últimos 40 m, nada a 240 m hacia dentro;
  `waterMaterial({ seaEdge })`, mezcla después del tone mapping, así que es exactamente el color de los tiles),
  así que termina sin borde contra el mar de OSM. Solo el mar abierto (no albercas ni lagunas); su atributo
  `alpha` es solo dónde cede a los parques y el shader aplica su propio desvanecido. Junto a Xcaret, el mar
  de Xcaret conserva su desvanecido de 50 m hacia lo que haya debajo.
- **Limitaciones**: a 1.7 m/px (3.4 m/px en el tile de nivel 0) el suelo de la región se ve borroso de cerca.
  Los pastos claros de la ilustración de Xcaret siguen siendo más claros que la selva aclarada de la región.

### Parques vecinos en la app (paquete de contexto)

La app de Android no calcula vecinos ni desvanecidos: `pnpm export:mobile` le deja por parque enfocado un
paquete ya resuelto (`src/export/context.js`; formato en el README): `context.glb` (`ctx-ground:<key>`,
`ctx-water:<key>`), `context-instances.bin` (árboles con los prototipos del `park-models.glb` del parque) y
`context.json`. La lógica es la misma de la web, compartida en `shared/neighbor-context.js`
(`neighborLayers`, `pickNeighborTrees`, `seaEdge`; `layers/neighbors.js` usa las mismas funciones):

- **Opacidad horneada por vértice**: parques vecinos = su propio desvanecido × el del parque enfocado × el de
  los vecinos con prioridad (como `neighborOpacity`); región = (1 − su desvanecido) × el del parque enfocado
  (la web lo calcula por píxel; los parques se mezclan encima con su propia opacidad, así que la región no
  cede a ellos, salvo que sus celdas totalmente cubiertas no se generan). Para que el alfa por vértice siga
  los contornos, las celdas de 12 m de las bandas de desvanecido se parten en 2 × 2 (6 m) con abanicos en las
  celdas vecinas (sin grietas). Agua: alfa del shader quieto × lo que cede; el mar de la región, color y
  opacidad del mar del mapa hacia su contorno (en la web se mezcla después del tone mapping; con el material
  iluminado de la app el tono puede variar un poco, por eso además se desvanece en los últimos metros).
- **Orden de dibujo** (`context.json → drawOrder`): tiles de OSM y el cuadro de desvanecido del parque (como
  hoy), después los `ctx-ground` de la menor a la mayor prioridad (región primero), mezclados con su alfa, sin
  prueba ni escritura de profundidad (las alturas de dos parques difieren hasta ~2 m), luego modelos y árboles,
  y el agua (`ctx-water` junto al agua del parque, mezclada, sin escribir profundidad). Material iluminado
  `BLEND`, como `water`: el unlit translúcido del ubershader no premultiplica el alfa.
- **Mapa real** (`basemapYield`): dentro de cada vecino o región (dentro de `opaqueOutline` y lejos de lo que
  cede) el alfa llega a 1, así que el suelo de contexto tapa los tiles de OSM sin más. Única diferencia con la
  web: en la banda de 50 m donde el parque enfocado se funde con la región, el mapa se asomaría hasta 25 %
  (`f · (1 − f)`); para igualarla, el cuadro de desvanecido de OSM usa
  `alpha = f · (1 − r) / max(1 − r · f, 1e-4)` con `r = 1 − fade(región)` (`clear` de la región en
  `context.json`), como `basemap.setRegion`. Los tiles totalmente dentro del `opaqueOutline` de la región se
  pueden omitir.
- **Árboles**: la selección de calidad alta; media y baja toman la fracción `quality.medium` / `quality.low` de
  cada rango (registro `j` si `⌊(j+1)·f⌋ > ⌊j·f⌋`; `f = 1/k` = uno de cada `k`).
- **Cambiar de parque sin recargar**: cargar el `park-models.glb`, `instances.bin` y el paquete de contexto del
  parque nuevo fuera de escena, y cambiar todo en un paso. La cámara pasa al marco nuevo con el `offset` del
  parque nuevo visto desde el anterior: en el `context.json` del parque anterior,
  `neighbors[key = nuevo].offset` da `x_nuevo = (x_anterior − offset.x) / offset.sx`,
  `z_nuevo = z_anterior − offset.z` (misma vista, nada salta), y luego vuela a encuadrarlo.
- **Prioridades** (`neighbors[i].priority`, 0 = encima de todos): Xcaret → Xenses, Xplor, región; Xplor →
  Xenses, Xcaret, región; Xenses → Xcaret, Xplor, región.

## Día y noche

Estado global `0` (día) … `1` (noche), sin recompilar nada ni reconstruir geometría:

- **Cuándo** (`app/time-of-day.js`, puro y probado): modos `auto` / `day` / `night`; `auto` = noche de las
  19:00 a las 06:00 en la hora de los parques, calculada con el desfase fijo de Quintana Roo
  (`PARK_UTC_OFFSET` = −5, `America/Cancun` no tiene horario de verano desde 2015), así que no depende de la
  zona horaria del equipo. `?night` / `?day` lo fuerzan (capturas). La elección del menú (Ajustes → Modo,
  `ui/header.js`) se guarda con `app/preferences.js` (`gx3d-timeOfDay`).
- **Transición** (`MapApp`): `nightTarget` 0/1 y un avance lineal de 1.5 s (`NIGHT_TRANSITION`) suavizado con
  `smoothstep`; cada cuadro llama `applyNight(k)` → `Stage.setNight(k)` (luces, cielo, niebla, exposición) y
  `graphics/night.js → setNightLevel(k)` (uniforme compartido `nightUniform` y emisivos). En `auto` se
  revisa la hora cada minuto. `html.gx-night` cambia el estilo de los marcadores (halo cálido, tarjeta oscura).
- **Animales en reposo** (`graphics/night.js → NIGHT_ACTIVITY`): de noche hay mucho menos movimiento. Los
  flamencos casi no se mueven, solo vuela ~15 % de las aves (el resto "duerme") y más despacio, los delfines
  saltan ~12 % de las veces y en los domos de red (mariposario, aviario) quedan pocas mariposas volando
  lento. Sigue la misma transición de 1.5 s (`nightActivity(k)`); el aleteo conserva su velocidad real.
- **Luces** (`Stage.js → LIGHTING`, se interpolan):

  |                      | día                | noche                             |
  | -------------------- | ------------------ | --------------------------------- |
  | cielo / niebla       | `#e3edf2`          | `#0d1a3e`                         |
  | hemisférica (cielo)  | `#f3f7ff` × 1.6    | `#7c86cc` × 1.75                  |
  | hemisférica (suelo)  | `#8c9c70`          | `#5a4462` (rebote cálido morado)  |
  | sol / luna           | `#fff0d9` × 2.3    | `#a9b9ff` × 0.5 (misma dirección) |
  | sombra (`intensity`) | 0.72, `radius` 2.5 | 0.5                               |
  | exposición (Neutral) | 1.06               | 1.0                               |

- **Ventanas**: las fachadas (`facade*` de `graphics/materials.js`) llevan un `emissiveMap`
  (`textures.js → facadeGlowTexture`: 4 × 4 vanos de la misma ventana que `facadeTexture`, ~72 % encendidos y
  de brillo distinto, `repeat` 1/4 para que un vano siga siendo una unidad de UV), color `#ffcf7a`, intensidad
  0 de día y 1.5 de noche (`nightGlow`). Material nuevo `window` (vidrio oscuro de día, cálido de noche) para
  ventanas y vanos de modelos (capillas, edificio de acceso, Tlachco, domos); `lamp` sube de 0.6 a 2.4 y
  `glass` brilla un poco. Siguen siendo los mismos materiales compartidos: mismos draw calls.
- **Faroles** (`layers/lamps.js`, posiciones en `shared/lamps.js`): primero en el borde de los muelles
  abiertos (sobre la cubierta), luego a lo largo de `walkways` y de las líneas de las rutas, cada ~18 m
  (`LAMP_LAYOUT`: repartidos parejo en cada línea, alternando lados a 2.2 m), con una separación mínima de
  10 m (cruces, rutas sobre andadores); después una rejilla con desfase de 16 m sobre lo pavimentado de
  `paving.png` (plazas, malecones). Nunca sobre agua, dentro de edificios (+1 m), a menos de 0.8 × `clear` de
  un modelo ni a menos de 25 m del borde del área diseñada. Tope por calidad (`QualityPreset.lamps`: alta
  2500, media 1500, baja 700; subconjunto parejo). Xcaret ≈ 480, Xel-Há ≈ 400, Xenses ≈ 130.
  Se dibujan con un `InstancedMesh` de postes (Lambert, ocultos a más de 650 m) y uno de cabezas: discos
  aditivos de cara a la cámara (1.3 m de radio, nunca menos de 3.2 px, así de lejos se ven como puntos de
  luz). Solo de noche (`object.visible`): **2 draw calls**, sin luces reales.
- **Mapa de luz** (`lightMap`, uniforme compartido creado en `app/world.js`): un canvas de 1024² sobre
  `park.extent` (fila 0 = norte) con un disco cálido de 10 m por farol (suma aditiva) más `paving.png` teñido
  × 0.34 (andadores con brillo suave, como el video de Apple Park). Se redibuja al cambiar la calidad.
  - **Terreno** (`layers/terrain.js`): `emisivo += albedo × luz × 2.2 × noche` (un `texture2D` más).
  - **Agua** (`layers/water.js`): de noche azul profundo (`WATER_NIGHT`), refleja un cielo marino, brillo de
    luna tenue, menos espuma y destellos; y los faroles: el mapa de luz leído 4, 10 y 18 m más lejos del
    observador (un reflejo aparece entre quien mira y el farol) y cortado por el oleaje en franjas.
- **Mapa real y vecinos**: los tiles de OSM (sin iluminación) se oscurecen a azul marino
  (`NIGHT_MAP_GLSL`); el mar de la región, que se funde con ese mapa, usa la misma fórmula. Suelo y árboles de
  vecinos y región son Lambert: siguen a las luces solos; su agua usa el mismo shader (sin faroles).
- **Rutas y andadores** son líneas sin iluminación: de noche se leen como líneas luminosas.

### Estilo de día

Hacia un mapa 3D de ciudad limpio y pastel, conservando la identidad del mapa ilustrado:

- **Suelo** (`pipeline/stages/textures.js`, hay que reconstruir con `pnpm data:build <key>`, la región
  después de los parques): `GROUND_COLORS` pasto `[134, 194, 94]`, selva `[84, 134, 56]`, andador
  `[240, 226, 196]` (beige cálido), plaza `[238, 230, 212]` (crema), arena `[244, 232, 200]`, roca
  `[206, 196, 172]`, tierra `[206, 176, 130]`; ruido `GROUND_NOISE` (fbm 0.07 / 0.03 en vez de 0.16 / 0.08,
  grano ±4 en vez de ±5, juntas de laja 0.08 en vez de 0.13), manchas secas y oscurecido junto a la selva
  más suaves, guarnición más clara, sombras horneadas de árboles 0.48 (antes 0.6).
- **Materiales** (`graphics/materials.js → PALETTE`): cremas más cálidos, terracota y teja más suaves
  (`tileTexture`), pizarra lavanda (`#9aa1bd`), pasto `#86c05a`, colores de pintura menos saturados.
- **Árboles** (`models/parts/trees.js`): verdes más claros y frescos, degradado `smoothstep` de abajo
  (oscuro) a arriba (claro) y oclusión barata bajo la copa (−20 %); también los usa la exportación móvil.
- **Agua** (`water.js → WATER_DAY`): azules más suaves (`#78d3d6` → `#3f8fc2`).
- **Luz**: ver la tabla de arriba (sombras más claras y de borde suave; mismo costo).

**Costo** (Chrome/Metal, 1400 × 900, calidad alta, `gl.finish`): Xcaret vista general 273 → 275 draw calls de
día (material `window`) y 276 de noche, Xcaret de cerca 150 → 154 / 156; Xel-Há 98 / 99 (vista general) y
94 / 96 (de cerca). Triángulos +0.1–1.3 % de noche (postes). Tiempo de cuadro sin cambio medible (≈ 0.5–1.6 ms).

### Lo que necesitaría la app móvil

La exportación ya lleva la paleta nueva (materiales, árboles; el suelo al reconstruir) y el material `window`.
Para la noche: (1) el estado y la regla de 19:00–06:00 `America/Cancun`; (2) luces de `LIGHTING` interpoladas
y exposición; (3) ventanas: emisivo de `facade*` con la textura `facadeGlowTexture` (o un PNG exportado)
× intensidad, y el emisivo de `window`, `lamp`, `glass`; (4) faroles: las posiciones de `placeParkLamps`
(exportables como un `PQI1` más, o recalculadas con `shared/lamps.js`), un poste instanciado y un billboard
aditivo; (5) el mapa de luz como textura (generada en el dispositivo o exportada) sumada al suelo × albedo;
(6) agua: colores de `WATER_NIGHT` y reflejos; (7) tiles de OSM y mar de contexto con `NIGHT_MAP_GLSL`.
`pnpm export:mobile` ya deja todo eso exportado (`lamps.bin`, `nightlight.png`, `night.json`, emisivos en el GLB);
el contrato está en [app-movil-noche-navegacion.md](app-movil-noche-navegacion.md).

## Andadores

`park.json → walkways` es la red de caminos peatonales: líneas `[[x, z], …]` en metros que se tocan solo en
sus extremos y con **coordenadas idénticas** en cada cruce (así se arma un grafo por igualdad exacta). La
etapa `routes` la construye a partir de `footway`/`path`/`steps`/`pedestrian` de OSM:

1. corta los caminos en cada cruce y descarta lo que queda fuera del área diseñada;
2. mueve cruces y puntos cada 10 m al andador pintado más cercano (≤ 24 m; cada punto busca primero donde cayó
   el anterior, para seguir el mismo andador) y los une con A\* sobre el ráster de andadores, por el centro;
3. los tramos sin andador cerca (veredas en la selva que la ilustración no muestra) conservan la línea de OSM y
   se pintan como camino en el suelo;
4. quita tramos de más de 4 m sobre agua sin muelle, une puntas sueltas a menos de 10 m de otra línea (la línea
   destino se parte en la unión) y descarta pedazos aislados de menos de 40 m.

La app los dibuja (`layers/walkways.js`, dos draw calls) como una línea discontinua blanco cálido sobre un
contorno café translúcido, en el mismo pase que las rutas y debajo de ellas. Donde una ruta oficial ya corre a
menos de 4 m del andador, ese tramo no se dibuja (`shared/walkways.js`): en Xcaret solo aparecen los andadores
sin ruta; en Xel-Há, que no tiene rutas oficiales, toda la red.

## Huecos en el suelo (fosos hundidos)

Un modelo puede recortar el terreno con `groundHoles(p)` (`shared/ground-holes.js`): anillos absolutos con
regla par-impar (un anillo exterior con islas adentro es un foso alrededor de ellas). Así el modelo baja por
debajo del suelo; hoy lo usa el hábitat de felinos de Xcaret (`felinos`: foso de ~4.6 m y estanques).

- **Terreno** (`layers/terrain.js → chunkGeometry`, también en la exportación móvil): las celdas dentro del
  hueco no se dibujan; las que cruzan su borde se parten en cuadros hasta ≤ 0.35 m que conservan el plano de
  la celda (sin grietas con las vecinas). Los muros del modelo llevan una albardilla que vuela 0.22 m sobre el
  hueco y tapa el escalón.
- **Pipeline**: sin árboles ni edificios genéricos a menos de 1.2 m del hueco (`site.isCleared`); el ráster
  por donde se trazan andadores y rutas lo bloquea, salvo a lo largo de las líneas `walkable` del modelo (el
  puente), así que el andador del puente cruza recto y los demás quedan fuera.
- **Encima**: con `cover` (metros sobre la base del modelo) lo que cruza el hueco —andadores, la ruta de
  navegación, el punto azul— se dibuja a esa altura (`surfaceSampler`, `world.surfaceAt`): la cubierta del
  puente. Los faroles no se ponen a menos de 1 m del hueco. La app Android aún dibuja sus andadores a la
  altura del terreno: sobre el puente quedan dentro del foso.

## Navegación a pie

Indicaciones a pie tipo Google Maps dentro del parque enfocado. Lo puro (y probado) vive en `shared/`; la app
solo lo dibuja y lo conecta con la ubicación.

```
park.json ─► shared/nav-graph.js   buildGraph · nearestPoint · route (A*) · makeSteps · pruneSpikes
                  │
                  ▼
           shared/navigation.js    findEntrance · chooseStart · guidance · bannerText · walkerAt · walkMinutes
                  │
  app/geolocation.js ─► app/navigation.js (Navigation: idle → preview → active → arrived)
                  │          ├─ layers/nav-route.js   línea azul, tramo caminado, conectores, pin, punto azul
                  │          └─ ui/directions.js      panel de indicaciones, letrero, barra inferior, aviso
  ui/markers.js «Cómo llegar» · ui/sidebar «Ir» (filas y búsqueda) ─► Navigation.directions(poi)
```

**Grafo** (`buildGraph(park)`, se arma la primera vez que se pide una ruta: Xcaret ≈ 15 ms, 2 000 nodos;
Xel-Há ≈ 3 ms):

1. `walkways`: nodos por **coordenadas idénticas** (ver _Andadores_); cada línea es una cadena de aristas.
2. `routes[].lines` (rutas oficiales) como aristas propias; corren junto a los andadores sin compartir
   coordenadas, así que se **atan** a ellos cada `NAV.linkStep` = 20 m (y en sus extremos) donde quedan a
   ≤ `NAV.link` = 6 m (aristas `link`).
3. Puntas sueltas a ≤ `NAV.snap` = 4 m de otra línea se unen a ella (partiendo la arista en el punto más
   cercano). Puntas sin salida a ≤ `NAV.deadEnd` = 25 m de un andador al que solo se llega dando una vuelta
   de más de 3 × esa distancia + 30 m se atan con una arista `bridge` (plazas, huecos de OSM).
4. Piezas separadas a ≤ `NAV.bridge` = 30 m se unen por el par de nodos más cercano (tipo Kruskal).
5. Costo = longitud × peso: ruta oficial 0.95, andador 1, `link` 1.15, `bridge` 1.4 (se prefieren un poco las
   rutas oficiales). Índice espacial de aristas en celdas de 25 m.

**Ruta** (`route(graph, from, to, { t, landmarks })`): origen y destino se proyectan sobre la arista más
cercana (si caen en piezas distintas, gana la más grande); esos tramos son los **conectores** (`gaps`, se
dibujan punteados; a las actividades se les acepta hasta `NAV.reach` = 60 m). A\* con nodos virtuales sobre
las aristas de inicio y fin (heurística euclidiana × peso mínimo). Si caminar en línea recta es más corto que
llegar a la red y salir de ella, o no hay red (Xplor), la ruta es recta (`direct`). Después
`pruneSpikes` quita idas y vueltas de < 8 m de ancho (saltos entre un andador y la ruta oficial paralela).
Una ruta en Xcaret tarda ~0.1 ms.

**Indicaciones** (`makeSteps`): un primer paso «Camina hacia el {norte…}», un paso por giro y la llegada
(«Llegas a {destino}»). Giro = cambio de rumbo medido 10 m antes y después de un vértice: > 35° en un
**cruce** (nodo de grado ≥ 3, o donde se entra / sale de la red), > 100° en una simple curva del camino;
de dos giros a menos de 18 m queda el más marcado; < 60° es «ligeramente». Se menciona la actividad más
cercana a ≤ 30 m («Gira a la derecha cerca de Capilla de Guadalupe»), sin repetirla en giros seguidos ni
nombrar el destino. Textos `nav_*` en `src/i18n/{es,en}.js`. Tiempo = distancia / 1.25 m/s, en minutos.

**Inicio** (`chooseStart`): la ubicación real (`watchPosition`, alta precisión, convertida con la proyección
del parque, `shared/geo.js → makeProjection(park.center)`) si está dentro del área diseñada o a menos de
`GUIDANCE.farFromPark` = 300 m de ella; si no (lejos, permiso negado, sin ubicación, esperando la primera
lectura) la **entrada simulada**: `sources.entrance` de la definición del parque si existe (Xel-Há:
`{ x: 140, z: -14 }`, la plaza de llegada), si no la actividad llamada «Entrada / Acceso / Ingreso…»,
«Plaza Principal» o «Taquillas» (`findEntrance`), si no la primera actividad. Un punto tocado en el mapa
(«Elegir salida», `MapApp.groundAt`) gana sobre ambos.

**Guía** (`guidance(route, pos)`, cada cuadro en modo activo): proyección de la posición sobre la ruta,
buscada primero cerca de la anterior (−40 / +120 m: una ruta que pasa dos veces cerca no salta); siguiente
maniobra = primer paso más de 2 m adelante; letrero «En {d} {maniobra}» o la maniobra sola a ≤ 8 m
(`bannerText`, distancias redondeadas a 5 m / 10 m / km); `offRoute` a > 25 m (se recalcula cada 4 s como
máximo, solo con ubicación real); `arrived` a < 12 m del destino. La simulación avanza
`1.25 m/s × {1, 4, 10}` por la polilínea (`walkerAt`).

**Cámara**: vista previa = `CameraRig.frameBox` de la ruta, con el mapa centrado en lo que deja libre el panel
(`Stage.setInset(izquierda, abajo)`: tarjeta de 360 px en escritorio, hoja inferior en teléfono). Navegación =
seguimiento suave (constante 3 s⁻¹): objetivo 22 m por delante del caminante, distancia 170 m, inclinación
0.92 rad y rumbo hacia arriba (el rumbo se suaviza para que las curvas no sacudan la vista). Mover el mapa
pausa el seguimiento; «Recentrar» lo reanuda.

**Dibujo** (`layers/nav-route.js`, de `MapApp`, no del parque): `Line2` azul `#1a73e8` (`#5b9cff` de noche)
con contorno blanco, ancho 2.6 m entre 6 y 14 px; lo ya caminado en gris azulado; conectores punteados
(`LineSegments2`); todo en el pase de rutas pero **sin prueba de profundidad** (nunca lo tapa un techo) y por
encima de rutas y andadores; mientras hay ruta las rutas oficiales se atenúan (`routes.setDimmed`). Pin rojo
del destino y caminante (punto azul, halo de precisión en metros, cono de rumbo girado según la cámara) como
marcadores HTML (`CSS2DObject`). Costo: ≤ 5 draw calls de líneas; la geometría del tramo caminado se rehace
cada 2 m.

**Estado y UI**: `html.gx-nav-preview` / `gx-nav-active` ocultan barra lateral (y en navegación el
encabezado; en teléfono también los botones del mapa). Cambiar de parque (`main.js → app.onFocus →
navigation.reset()`) cancela todo y vuelve a calcular entrada y proyección. Para depurar: `window.__nav`.

### Lo que necesitaría la app móvil

La app Android ya tiene GPS, una ubicación simulada que camina por el grafo de andadores y la hoja de la
actividad. Para igualar la web:

1. **Grafo y rutas**: portar `shared/nav-graph.js` tal cual (funciones puras, sin dependencias): mismas
   constantes `NAV` (snap 4 m, link 6 m cada 20 m, deadEnd 25 m, bridge 30 m, reach 60 m, pesos 0.95 / 1 /
   1.15 / 1.4), incluir `routes[].lines` además de `walkways`, A\* con nodos virtuales sobre las aristas,
   `pruneSpikes`, y la regla de línea recta. Las pruebas de `tests/shared/nav-graph.test.js` sirven de casos
   de aceptación (mismos números esperados).
2. **Indicaciones**: `makeSteps` con `TURNS` (35° en cruces, 100° en curvas, 60° «ligeramente», ventana 10 m,
   fusión 18 m, actividad a ≤ 30 m) y los textos `nav_*` de `src/i18n/es.js` / `en.js` (las mismas llaves en
   `strings.xml`, con los marcadores `{dir}`, `{near}`, `{name}`, `{dist}`, `{text}`).
3. **Inicio**: `chooseStart` (umbral 300 m fuera del área diseñada, `park.json → clear`) y `findEntrance`
   (`park.json → entrance` en la exportación móvil, el mismo punto que elige la web; Xel-Há `{ x: 140, z: -14 }`). La simulación actual de la app puede seguir siendo el origen cuando no hay GPS en el parque.
4. **Guía**: `guidance` / `bannerText` (búsqueda alrededor de la posición anterior, fuera de ruta a 25 m con
   recálculo cada ≥ 4 s, llegada a 12 m, «ahora» a ≤ 8 m), tiempo a 1.25 m/s, simulación × 1 / 4 / 10.
5. **UI**: botón «Cómo llegar» en la hoja de la actividad; hoja de indicaciones (destino, minutos, distancia,
   «Desde…» con «Elegir salida» y el aviso de ubicación simulada, Iniciar / Simular recorrido, lista de pasos
   con flechas); en navegación, letrero verde `#0d7a4a` arriba (flecha + texto + «Después: …» a < 60 m),
   barra inferior (minutos, metros, velocidad si simula, Terminar), «Recentrar», letrero azul «Has llegado».
6. **Mapa**: línea `#1a73e8` con contorno blanco por encima de rutas y andadores, sin prueba de profundidad;
   tramo caminado `#8fa8c8`; conectores punteados; rutas oficiales atenuadas (opacidad 0.4 / 0.3); pin
   `#ea4335`; punto azul con halo de precisión y cono de rumbo; cámara de seguimiento (22 m adelante, 170 m,
   0.92 rad, rumbo arriba, suavizado 3 s⁻¹) que se pausa al tocar el mapa.

## Modelos — `src/models/`

Biblioteca de modelos paramétricos agrupados por estilo (`mayan/`, `colonial/`, `attractions/`, `waterfront/`)
más piezas reutilizables (`parts/`). Cada archivo exporta `defineModel({...})` y se registra en
`models/index.js`. Ver [agregar-modelo.md](agregar-modelo.md).

Los materiales son una biblioteca con nombre (`graphics/materials.js`: `limestone`, `thatch`, `tile`,
`wood`…): los modelos piden un material por su nombre, así todos comparten el mismo aspecto y se pueden fusionar.
Las texturas son procedurales, pequeñas (≤ 256²) y compartidas (`graphics/textures.js`): mampostería de piedra
(`limestone`, `rockwall`), laja (`paving`), tejas, palma…

Un modelo con `update()` que la app móvil deba mover devuelve además `animation`: las piezas
(`AnimatedPiece` en `models/define.js`) con su `driver`, sus `params` y las partes que mueve `update()`. El
exportador móvil (`export/animated.js`) las saca de la geometría congelada como nodos `anim:*` y escribe
`animated.json`; la app las mueve con un port de cada `update()` (contrato y lista de drivers:
[app-movil-noche-navegacion.md §10](app-movil-noche-navegacion.md)). Un driver nuevo hay que escribirlo también
en la app.

## Pruebas

`pnpm test` (Vitest, `tests/`):

- funciones puras de `shared/` y `pipeline/lib/` (proyección, formatos binarios, ráster, unión de rutas…);
- consistencia del contenido de cada parque (ids únicos, tipos de modelo existentes, `edits` válidos…);
- construcción de **todos** los modelos colocados en los parques: geometría no vacía y sin `NaN`;
- área diseñada, tiles Web Mercator y caché de tiles (prioridad, descarte, cancelación);
- parques vecinos: selección por distancia entre contornos, la región siempre al final, cambio de marco entre
  parques y suelo vecino (`tests/shared/neighbors.test.js`); regiones fuera de los parques seleccionables, de
  las URL y de la exportación (`tests/parks/content.test.js`, `tests/app/routing.test.js`), calidades que
  nunca apagan a los vecinos y árboles de la región (`tests/pipeline/region.test.js`);
- datos generados (`public/parks/`): tiles del suelo listados y presentes, área diseñada válida;
- navegación a pie: armado del grafo (uniones exactas y por cercanía, rutas oficiales atadas, puentes,
  puntas sin salida), A\* en grafos sintéticos y en Xcaret / Xel-Há, picos, giros e indicaciones con
  actividades cercanas, entrada y ubicación simulada, avance de pasos, fuera de ruta y llegada
  (`tests/shared/nav-graph.test.js`, `tests/shared/navigation.test.js`);
- día y noche: hora de los parques (`America/Cancun`, 19:00–06:00) y modos (`tests/app/time-of-day.test.js`),
  separación de los faroles a lo largo de líneas, en plazas y con tope (`tests/shared/lamps.test.js`).

Para cambios visuales, la verificación es manual: `?still` congela la animación y permite comparar capturas.
