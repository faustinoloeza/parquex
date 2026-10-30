# Mapas 3D de Grupo Xcaret

Réplica en 3D, hecha con [three.js](https://threejs.org), de los mapas interactivos oficiales
([Xcaret](https://maps.xcaret.com/xc/es), [Xel-Há](https://maps.xcaret.com/xh/es)): terreno, agua,
vegetación, edificios, modelos de los lugares emblemáticos, rutas oficiales, actividades, servicios y horarios.
Alrededor del área diseñada de cada parque se ve el mapa real de [OpenStreetMap](https://www.openstreetmap.org),
sin cortes. Está pensado para ir fluido también en equipos modestos (ver _Rendimiento_).
Xplor, Xenses y Xoximilco no tienen mapa ilustrado oficial: su suelo sale de la imagen satelital y de OSM
(_modo satélite_, ver [Agregar un parque](docs/agregar-parque.md)).

```
npm install
npm run dev         # http://localhost:5173/xc/es
```

Los comandos de abajo se escriben `pnpm <script>`; con npm son `npm run <script>` (y los argumentos que empiezan
con `-` van después de `--`, por ejemplo `npm run export:glb -- xc --trees=both`).

## Estructura

```
src/                 aplicación (navegador)
  main.js            punto de entrada: une la UI con MapApp
  app/               motor del mapa: escena, cámara, calidad, carga de datos, URL
  layers/            capas del mundo (terreno, mapa real, agua, árboles, edificios, rutas…)
  models/            biblioteca de modelos 3D de lugares (pirámides, capillas, palapas…)
  graphics/          geometría, materiales, texturas y shaders compartidos por los modelos
  parks/             contenido de cada parque (fuentes, rutas, modelos colocados, correcciones)
  ui/                interfaz: encabezado, barra lateral, marcadores, controles, créditos del mapa
  i18n/              textos en español e inglés
  styles/            CSS por componente
  config.js          ajustes globales (servidor de tiles del mapa real)
shared/              código usado por la app y por el pipeline (geografía, área diseñada, formatos)
pipeline/            generación offline de los datos de cada parque (Node + sharp)
  stages/            etapas: clasificación, cobertura, terreno, edificios, rutas, árboles…
  lib/               utilidades (ráster, OSM, trazado de líneas…)
  tools/             herramientas de depuración (superposición, comparación con satélite)
public/parks/<key>/  datos generados que carga la app (se versionan)
data/                descargas crudas y depuración (no se versiona; ver «Fuentes de datos»)
tests/               pruebas unitarias (Vitest)
docs/                documentación
```

## Comandos

| Comando                          | Qué hace                                                                  |
| -------------------------------- | ------------------------------------------------------------------------- |
| `pnpm dev`                       | servidor de desarrollo                                                    |
| `pnpm build` / `preview`         | compilación de producción en `dist/` y vista previa                       |
| `pnpm data:fetch [park]`         | descarga OSM (y el satélite de los parques en modo satélite)              |
| `pnpm data:satellite [park]`     | descarga la imagen satelital de referencia                                |
| `pnpm data:build [park]`         | genera `public/parks/<park>/` (≈ 12 s, resultado determinista)            |
| `pnpm data:overlay [park]`       | dibuja los datos generados sobre la ilustración (o el satélite)           |
| `pnpm data:compare [park] [ids]` | recortes ilustración / satélite alrededor de modelos o puntos             |
| `pnpm data:festival`             | programa del Festival de Vida y Muerte para el tema Día de Muertos        |
| `pnpm export:glb [park]`         | exporta el mundo estático a `dist-mobile/<park>/park.glb` (app móvil)     |
| `pnpm export:mobile [park]`      | solo modelos + sombras (`park-models.glb`) y copia a la app Android       |
| `pnpm publish:models`            | publica la exportación móvil como Release de GitHub (la app se actualiza) |
| `pnpm deploy:pages`              | compila el sitio y lo publica en GitHub Pages (rama `gh-pages`)           |
| `pnpm lint` / `format`           | ESLint / Prettier                                                         |
| `pnpm test`                      | pruebas unitarias                                                         |
| `pnpm check`                     | lint + formato + pruebas (antes de subir cambios)                         |

Parámetros de depuración en la URL: `?stats` (FPS, draw calls, triángulos y memoria de video), `?still`
(renderiza hasta que llegan los datos y se detiene, para capturas), `?nosidebar`, `?ref` (ilustración oficial
como suelo; requiere `data/raw`), `?view=x,z,distancia,polar,azimut` (cámara inicial en metros y grados, para
capturas repetibles), `?noneighbors` (sin los parques vecinos, para comparar), `?night` / `?day` (fuerza la
noche o el día sin guardar la preferencia, para capturas).

## Publicación en Cloudflare Workers

`wrangler.jsonc` publica el sitio compilado (`dist/`) como un Worker de solo archivos estáticos; las rutas que no
son archivos (`/xc/es`, `/xh/en`…) responden con `index.html` (`not_found_handling: single-page-application`) y
la app lee la ruta. Con el repositorio conectado en Cloudflare (**Workers & Pages → el Worker → Settings →
Builds**): comando de compilación **`npm run build`**, comando de implementación **`npx wrangler deploy`**,
directorio raíz vacío. Se sirve en la raíz del dominio (`base` `/`), así que no hace falta `BASE_PATH`.

## Publicación en GitHub Pages

`pnpm deploy:pages` (`pipeline/deploy-pages.js`) compila el sitio con `BASE_PATH=/<repo>/` (la `base` de Vite) y
sube el resultado a la rama `gh-pages`, que se reemplaza en cada publicación; no usa GitHub Actions. Las rutas del
mapa y de los datos siguen esa base (`src/app/routing.js → BASE`), y `404.html` es una copia de `index.html` para
que los enlaces directos como `/<repo>/xc/es` abran el mapa. En el repositorio: **Settings → Pages → Deploy from a
branch → `gh-pages`, `/ (root)`**. Sitio: `https://<usuario>.github.io/<repo>/`.

## Fuentes de datos

El repositorio solo trae código, modelos y los datos ya generados (`public/parks/`); no incluye recursos de
terceros. Para regenerar un parque (`pnpm data:build`) hacen falta sus insumos en `data/raw/` (no versionado):

- OSM: `pnpm data:fetch` lo descarga (© colaboradores de OpenStreetMap, ODbL).
- Imagen satelital de los parques en modo satélite: `pnpm data:satellite`.
- Xcaret y Xel-Há se construyen sobre la imagen de su mapa ilustrado oficial,
  `data/raw/<key>-illustration.png`, que no se distribuye ni se descarga: hay que colocarla a mano.

Actividades, servicios, horarios y marco del mapa de cada parque están en `src/parks/<key>/` (`activities.js`,
`services.js`, `sources.js`).

## Día y noche

El mapa tiene modo de día y de noche. En **Ajustes → Modo** se elige _Automático_ (por omisión), _Día_ o
_Noche_; la elección se guarda en el navegador. _Automático_ sigue la hora de los parques (Quintana Roo,
`America/Cancun`, UTC−5 todo el año): de noche de las 19:00 a las 06:00, sin importar la zona horaria del
equipo, y se revisa cada minuto. El cambio es un fundido de ~1.5 s, sin recargar ni recompilar shaders.

- **Día**: paleta suave tipo mapa 3D de ciudad (pasto verde fresco, andadores beige claro, plazas crema, poco
  ruido en el suelo), sombras suaves y agua azul cielo un poco desaturada.
- **Noche**: cielo y niebla azul marino, luz ambiente índigo y una luna tenue; ventanas cálidas en edificios y
  modelos; **faroles** a lo largo de andadores, rutas, muelles y plazas (postes, cabezas luminosas y charcos de
  luz en el suelo); andadores con un brillo suave; agua azul profundo con reflejos cálidos de los faroles; el
  mapa real (OSM) oscurecido. Sin luces reales ni pases extra: 2 draw calls más (postes y cabezas).

Detalles en [Arquitectura](docs/arquitectura.md#día-y-noche).

## Navegación a pie

Como en Google Maps, pero caminando dentro del parque: en la tarjeta de una actividad, **Cómo llegar** (o el
botón **Ir** de cada fila de la barra lateral y de los resultados de búsqueda) traza la ruta desde tu ubicación
por los andadores y las rutas oficiales, la encuadra y abre un panel (tarjeta lateral en escritorio, hoja
inferior en teléfono) con el tiempo a pie (4.5 km/h), la distancia y las indicaciones («Gira a la derecha
cerca de Capilla de Guadalupe»). **Iniciar** entra en modo navegación: la cámara sigue al caminante (inclinada,
con la dirección hacia arriba), un letrero grande dice la siguiente maniobra («En 40 m gira a la izquierda»),
las indicaciones avanzan solas, la ruta se recalcula si te alejas más de 25 m y a menos de 12 m del destino
aparece «Has llegado». **Terminar** sale.

- **Ubicación**: se pide permiso al navegador la primera vez (`watchPosition`). Si estás a más de 300 m del
  área del parque, si niegas el permiso o no hay ubicación, se **simula** en la entrada del parque y se avisa
  («Estás lejos del parque: ubicación simulada en la entrada»); **Elegir salida** permite tocar el mapa para
  empezar en otro punto.
- **Simular recorrido** (siempre disponible, y lo que hace **Iniciar** con la ubicación simulada) mueve el punto
  azul por la ruta a velocidad de caminata × 1, 4 o 10, para probarla sin estar en el parque.
- Funciona de día y de noche (la ruta se aclara de noche) y cambiar de parque cancela la navegación.
  Xplor no tiene red de andadores en los datos: ahí las indicaciones van en línea recta.

Detalles en [Arquitectura](docs/arquitectura.md#navegación-a-pie).

## Parques vecinos

Los parques que están juntos (Xcaret, Xplor y Xenses, cerca de Playa del Carmen) siempre se ven al mismo
tiempo, sobre la «Zona Xcaret»: el terreno entre y alrededor de ellos (de la carretera al mar, con el Hotel
Xcaret) también estilizado, para que se lean como un solo territorio. El parque elegido en el selector se
muestra completo y los demás en una versión ligera (suelo, algunos árboles y agua quieta, sin marcadores ni
modelos), alineados con el mapa real; se cargan en cuanto el parque elegido está en pantalla y ninguna calidad
los apaga (en «baja» llevan menos árboles). Entre estos parques el selector no recarga la página: cambia el
enfoque y la cámara vuela al parque. Xel-Há y Xoximilco no tienen vecinos. Detalles en
[Arquitectura](docs/arquitectura.md#parques-vecinos).

## Mapa real (OpenStreetMap)

Fuera del área diseñada se dibujan tiles de mapa reales. Por defecto se usa el servidor estándar de
OpenStreetMap, adecuado para desarrollo y tráfico moderado según su
[política de uso](https://operations.osmfoundation.org/policies/tiles/). Para producción con mucho tráfico,
cambia `BASEMAP.url` en `src/config.js` por un proveedor de tiles (o un servidor propio) con el mismo esquema
`{z}/{x}/{y}` y actualiza el crédito. El crédito «© colaboradores de OpenStreetMap» es obligatorio y siempre
se muestra en la esquina inferior derecha.

## Exportación para la app móvil (glTF)

La app nativa de Android (Filament / gltfio) dibuja el mismo parque a partir de un `.glb` por parque:

```
pnpm export:glb                    # todos los parques → dist-mobile/<park>/park.glb + park.json
pnpm export:glb xc --trees=both    # además park-merged.glb (árboles como geometría fusionada)
pnpm export:glb --android          # y copia el resultado a ~/AndroidStudioProjects/Parquex/…/assets/parks/
pnpm export:mobile                 # lo que usa la app: park-models.glb + instances.bin (= --mobile --android)
pnpm export:glb xh --mobile --no-instances   # park-models.glb con árboles y autobuses fusionados (comparar)
pnpm export:glb --mobile --no-meshopt        # park-models.glb sin comprimir la geometría (comparar)
pnpm export:glb --mobile --no-context        # sin el paquete de contexto (parques vecinos y región)
pnpm export:glb --models-only      # park-models-only.glb: sin terreno, agua ni rutas (visor con su propio mapa)
```

Con `--mobile` (`pnpm export:mobile`) sale `park-models.glb`, lo que carga la app: terreno, agua y modelos, el
empedrado sobre el terreno, sin rutas (las dibuja la app) ni capa de sombras (ya vienen en el suelo). Los
modelos repetidos **no** van horneados copia por copia: el GLB lleva un prototipo por tipo y `instances.bin`
(al lado, también copiado con `--android`) la lista de copias; la app oculta los prototipos y reconstruye en el
dispositivo la geometría fusionada (gltfio no dibuja `EXT_mesh_gpu_instancing` y `InstanceBuffer` se queda en 64).

- **Prototipos** (`src/export/instances.js`): un nodo `proto:<tipo>` por tipo en el origen, base en `y = 0`, sin
  transformación; su malla tiene `POSITION`, `NORMAL` y `COLOR_0` en float32, índices uint16/uint32, sin
  compresión ni cuantización; cada primitiva con su material (las hojas que la web dibuja por las dos caras
  salen `doubleSided`). Tipos: `tree-broad`, `tree-broad-light`, `tree-bush`, `tree-palm`, `tree-ceiba` (la
  geometría barata `lo` de los árboles) y `bus`.
- **`instances.bin`** (`shared/formats/instances.js`, little endian): `"PQI1"`, `u32` tipos; por tipo `u16` largo
  y nombre UTF-8 (el `<tipo>` de `proto:<tipo>`), `u32` copias y 28 bytes por copia: `f32 x, y, z` (metros
  locales, `y` = base sobre el terreno), `f32 rotY` (rad, como `rotation.y`), `f32 scale` (XZ), `f32 scaleY`,
  `u8 r, g, b` (tinte sRGB que multiplica `COLOR_0` en lineal; 255 = sin tinte) y un byte en 0. Matriz =
  `T(x, y, z) · R_y(rotY) · S(scale, scaleY, scale)`.
- **Árboles**: los mismos datos que la versión fusionada (`vegetation.bin`, hundidos 0.15 m, palmeras con altura
  variable y tono por árbol de `src/layers/vegetation.js`). El tono llega a ≈ 1.17 y un byte no pasa de 1, así
  que el `COLOR_0` de los prototipos de árbol va multiplicado por 1.17 y el tinte de cada copia dividido.
- **Autobuses**: un prototipo `bus` (una primitiva); como en la web, el color de la línea multiplica todo el
  autobús: la carrocería es blanca (toma el color) y ventanas, llantas y defensas son casi negras.
- Resultado (tamaños de octubre 2026): Xcaret 15.7 MB → 7.5 MB + 308 KB, Xel-Há 14.6 MB → 4.7 MB + 402 KB;
  la geometría reconstruida coincide con la fusionada (mismos triángulos, caja y color medio) y el
  `*-preview.png` dibuja los prototipos con sus copias, como la app.
- **Compresión de geometría** (por defecto con `--mobile`; `--no-meshopt` la quita): el servidor de desarrollo
  pasa el GLB por `pipeline/lib/meshopt.js` (gltf-transform + meshoptimizer) antes de escribirlo: reordena
  vértices e índices, cuantiza (`KHR_mesh_quantization`: posiciones a 16 bits por malla, ≈ 3 cm en 2 km, con la
  escala y el desplazamiento en el nodo; normales 10 bits, color 8 bits, UV 12 bits salvo las que se repiten
  fuera de [0, 1], que quedan en float) y comprime los buffer views con `EXT_meshopt_compression`. Ambas
  extensiones quedan en `extensionsRequired`; gltfio 1.77 las decodifica. Los nodos `proto:*` quedan fuera: sus
  accessors van sin comprimir en el bloque binario del GLB, byte a byte como los escribe la página. Nombres de
  nodos y texturas (JPEG/PNG) no cambian. Xcaret 7.48 MB → 2.95 MB, Xel-Há 4.74 MB → 1.95 MB; misma cantidad de
  triángulos por malla, cajas a menos de 1 cm y el `*-preview.png` (que carga el archivo comprimido con
  `MeshoptDecoder`) casi idéntico al sin comprimir.

**Paquete de contexto (parques vecinos y región)**: con `--mobile` (salvo `--no-context` o `--no-instances`),
cada parque con vecinos (`shared/neighbors.js → findNeighbors`: hoy Xcaret, Xplor y Xenses, con la región
«Zona Xcaret» `xcr`, que nunca se exporta como carpeta propia) también recibe, en el **marco local del parque
enfocado** (el mismo de su `park-models.glb`), lo que la web dibuja alrededor (`src/export/context.js`, página
`export.html?park=<key>&context`), ya recortado contra el parque enfocado, así que la app no calcula
desvanecidos:

- `context.glb`: por vecino, en orden de prioridad (parques más cercanos primero, región al final), un nodo
  `ctx-ground:<key>` (malla del suelo de ~12 m de las alturas del vecino, subdividida a ~6 m en las bandas de
  desvanecido, con el tile de nivel 0 en JPEG 1024²) y un nodo `ctx-water:<key>` (agua quieta, colores de
  `export/water.js`, con `waterTint` si el vecino lo tiene; en la región, el mar abierto pasa al color del mar
  del mapa `#aad3df` y a opacidad completa hacia su contorno, `REGION_SEA_EDGE`). La opacidad que la web calcula
  (su propio desvanecido × ceder al parque enfocado × ceder a los vecinos con prioridad;
  `shared/neighbor-context.js → neighborLayers`) va horneada en el alfa de `COLOR_0` (VEC4), materiales
  iluminados `alphaMode: BLEND` (suelo rugosidad 1 como el terreno; agua 0.35 como `water`). Los triángulos con
  sus tres vértices en alfa 0 se quitan. Sin árboles ni prototipos; comprimido con el mismo paso meshopt.
  Posiciones ya en el marco enfocado (sin transformación propia salvo la de la cuantización).
- `context-instances.bin`: los árboles de los vecinos, mismo formato `PQI1` que `instances.bin` y mismos nombres
  de tipo que los `proto:*` del `park-models.glb` del parque enfocado (`tree-broad`, `tree-broad-light`,
  `tree-palm`, `tree-ceiba`; sin arbustos, como la web). Es la selección de la calidad **alta** de la web (uno de
  cada `treeStride` = 3, máximo `maxTrees` 4000 por parque; la región, una selección pareja de `regionTrees`
  6000), sin árboles a más de 15 m dentro de un área con prioridad. Dentro de cada tipo, los registros van por
  vecino en orden de prioridad (`context.json → neighbors[i].trees.types[tipo] = { first, count }`).
- `context.json`: `focus`, `fade` (45/5 m) y por vecino `key`, `name`, `region`, `priority`, `offset`
  (`x' = x · sx + dx`, `z' = z + dz` desde su marco), `clear` (su área diseñada en el marco enfocado), `outline`
  (donde empieza a verse) y `opaqueOutline` (donde termina su propio desvanecido), `bounds`, nodos, triángulos y
  árboles (`stride`, rangos, y `quality.medium` / `quality.low`: la fracción de registros que la web dibuja en
  esas calidades; la app conserva el registro `j` de cada rango si `⌊(j+1)·f⌋ > ⌊j·f⌋`). `basemapYield` y
  `drawOrder` dicen cómo se mezcla con el mapa (ver `docs/arquitectura.md → Parques vecinos en la app`).
- Resultado (octubre 2026): Xcaret 1.28 MB + 325 KB, Xplor 1.34 MB + 321 KB, Xenses 1.43 MB + 348 KB; 6 draw
  calls (suelo + agua × 3) y ~100–120 mil triángulos por paquete. `context-preview.png` lo dibuja con el
  `park-models.glb` e `instances.bin` del parque, como la app.

El script imprime el tamaño de `instances.bin`, las copias por tipo y lo que la app reconstruye, el tamaño antes
y después de comprimir, `extensionsUsed` / `extensionsRequired`, y avisa si un prototipo tiene transformación,
atributos que no son float32 o buffer views comprimidos. Con `--models-only` sale `park-models-only.glb`, para un
visor que dibuja su propio suelo: sin terreno, agua ni rutas, árboles fusionados y dos capas planas encima del
mapa:

- `paving` (`src/export/paving.js`): andadores y plazas de piedra. El pipeline escribe `paving.png` (máscara de
  512² con la cobertura de caminos y plazas, sin calles ni estacionamientos de OSM ni manchas sueltas,
  `shared/formats/paving.js`) y la exportación la convierte con _marching squares_ (bordes suaves, filas
  completas fusionadas) en una sola malla indexada a `y = 0.01`, normales hacia arriba y UV en metros (4 m por
  repetición) con el material `paving` de la biblioteca (textura de laja 256², rugosidad 1): un draw call,
  ≈ 32 000 triángulos y ≈ 1 MB en Xcaret. Va debajo de las sombras.
- `shadows` (`src/export/shadows.js`): las sombras de árboles, edificios y modelos con el mismo sol de la app,
  proyectadas sobre el terreno, vistas desde arriba y guardadas como PNG negro + alfa (2048², material unlit
  transparente, `y = 0.02`). Reemplaza las sombras que antes venían pintadas en el suelo.

El comando arranca Vite, abre `export.html?park=<key>&save&preview` en Google Chrome sin ventana (WebGL por
SwiftShader; otra ruta con `CHROME=<ruta>`), espera a que la página envíe el archivo al servidor de desarrollo
(`pipeline/vite-export.js`, solo en `pnpm dev`) e imprime tamaño, draw calls, triángulos, texturas y extensiones.
También deja `*-preview.png`: el GLB vuelto a cargar con `GLTFLoader` y dibujado. La página también se puede
abrir a mano en `pnpm dev` (`/export.html?park=xh` descarga el archivo).

Qué se exporta (`src/export/`, mismas coordenadas que la app: metros, `x` = este, `z` = sur, origen en el
centro del parque, transformaciones ya aplicadas):

- **Terreno**: una malla por tile del suelo de nivel 1 (hasta 4 × 1024² en JPEG ≈ 2048² sobre el parque,
  ≤ 16 MB decodificado; el nivel 2 serían 64 MB). El remapeo de UV por bloque de la app se hornea en la
  geometría; las sombras ya vienen pintadas en el suelo. Malla de 64 celdas por bloque (la app usa 128).
- **Agua**: malla plana a `y = 0` sobre las celdas con agua de `water.png`, con el color en reposo del shader
  por vértice y transparencia (sin olas, brillos ni espuma).
- **Árboles**: geometría barata (`lo`) de cada tipo; por defecto una malla instanciada por tipo
  (`EXT_mesh_gpu_instancing`), sin la variación de tono por árbol. Con `--trees=merged`, geometría fusionada por
  zona de 350 m (con tono), para visores sin esa extensión. Con `--mobile`, prototipos + `instances.bin`.
- **Edificios, muelles, modelos y autobuses**: todo fusionado en una malla por material; las partes animadas
  quedan congeladas en una pose; cuerdas (líneas) omitidas. Con `--mobile` los autobuses van como prototipo y
  las partes que mueven los modelos (cabina de la torre, voladores, banderas, mariposas) más las bandadas de aves
  salen sueltas como nodos `anim:*` con `animated.json`, para que la app las anime (`src/export/animated.js`).
- **Rutas**: cintas de triángulos (contorno + color) sobre el suelo, una malla `route:<slug>` por ruta.
- Materiales simples `pbrMetallicRoughness` (Lambert → rugosidad 1), sin `KHR_texture_transform`; solo
  `KHR_materials_emissive_strength` en los materiales que brillan de noche. No se exportan el mapa real (OSM) ni
  la fauna (salvo, con `--mobile`, las bandadas de aves).

**Noche y navegación** (con `--mobile`, `src/export/night.js`): por parque `lamps.bin` (faroles, `PQL1`),
`nightlight.png` (mapa de luz 1024²) y `night.json` (luces, agua, mapa, marcadores, transición, regla automática
y fuerza emisiva nocturna por material); `context-lamps.bin` en los paquetes de contexto; `park.json` de
`dist-mobile` con `entrance`. En `park-models.glb`, ventanas (`facade*` con `facade-glow` en `TEXCOORD_1`),
`window`, `glass`, `lamp`, terreno, empedrado (`paving-ground`) y agua llevan su emisivo con fuerza de día (0, o
0.6 en `lamp`): la app solo sube `emissiveStrength` de noche. Contrato completo para Android:
[docs/app-movil-noche-navegacion.md](docs/app-movil-noche-navegacion.md).

## Rendimiento

- **Memoria acotada**: el suelo se descarga como pirámide de tiles (una vista general de ~140 KB al inicio y
  detalle solo cerca de la cámara); los tiles del mapa real se cargan por demanda con un límite por calidad.
  Las imágenes se decodifican fuera del hilo principal y la copia en RAM se libera al subirlas a la GPU.
- **Calidad automática** según el equipo (RAM, núcleos, GPU por software, pantalla táctil) y adaptativa si los
  cuadros se vuelven lentos; también se puede fijar en la barra lateral. Cada nivel limita resolución, sombras,
  detalle de árboles y del suelo, tiles en memoria, densidad de árboles de los parques vecinos y cuadros por segundo (30 en
  «baja»; menos cuando nada se mueve).
- **Menos trabajo por cuadro**: nivel de detalle de árboles por zona, materiales mate con sombreado Lambert,
  geometría estática fusionada por material y figuras animadas en una malla por parte.
- Los shaders se compilan al cargar (en paralelo donde el navegador lo permite), sin congelar la página.

## Documentación

- [Arquitectura](docs/arquitectura.md): cómo se generan los datos y cómo se dibuja el mapa.
- [Temas de temporada](docs/temas.md): Día de Muertos y cómo agregar otros temas.
- [Agregar un modelo 3D](docs/agregar-modelo.md): crear un edificio nuevo y colocarlo en un parque.
- [Agregar un parque](docs/agregar-parque.md): de las fuentes oficiales a un mapa funcionando.

## Convenciones

- Sistema local en **metros**: `x` = este, `z` = sur, origen en el centro del mapa del parque; `y` = altura.
- Rotaciones en radianes, antihorario visto desde arriba.
- Todo lo aleatorio usa semillas (`shared/random.js`): mismo código ⇒ mismos datos y mismas capturas.
- El contenido de un parque (dónde va cada cosa) vive en `src/parks/<key>/`; el código de los modelos
  (cómo se ve cada cosa) en `src/models/`. Un mismo modelo puede usarse en varios parques.
- Los datos derivados de la ilustración oficial se generan; la ilustración nunca se publica.
