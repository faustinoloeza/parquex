# App móvil: estilo de día, modo noche y navegación a pie

Contrato entre la exportación web (`pnpm export:mobile`) y la app Android (Filament / gltfio 1.77.3,
`UbershaderProvider`). Todo lo que aquí se describe ya está en `app/src/main/assets/parks/<key>/` después de
`pnpm export:mobile`; la app no necesita valores por parque escritos a mano.

Coordenadas: las de siempre, metros locales del parque (`x` = este, `y` = arriba, `z` = sur, origen en el centro
del parque, el mismo marco que `park-models.glb`, `instances.bin` y `park.json`). En los archivos de contexto,
el marco del parque enfocado.

## 1. Archivos por parque

| archivo                 | nuevo | qué es                                                                    |
| ----------------------- | ----- | ------------------------------------------------------------------------- |
| `park-models.glb`       | no    | cambia: paleta de día nueva y emisivos nocturnos (§2, §4)                 |
| `instances.bin`         | no    | sin cambios (byte a byte igual)                                           |
| `park.json`             | no    | igual, más `entrance: { x, z }` al final (§7)                             |
| `lamps.bin`             | sí    | faroles, formato `PQL1` (§3)                                              |
| `nightlight.png`        | sí    | mapa de luz nocturno 1024², el mismo canvas de la web (§4)                |
| `night.json`            | sí    | parámetros de noche: luces, agua, mapa, marcadores, materiales (§5)       |
| `context.glb`           | no    | cambia solo el color del agua de día (paleta nueva)                       |
| `context-instances.bin` | no    | sin cambios                                                               |
| `context-lamps.bin`     | sí    | faroles de los parques vecinos en el marco enfocado (§3.3), solo xc/xp/xs |
| `context.json`          | no    | más `files.lamps`, `lamps` y `neighbors[i].lamps = { first, count }`      |
| `animated.json`         | sí    | piezas que se mueven y sus nodos `anim:*` en `park-models.glb` (§10)      |

Tamaños (octubre 2026):

| parque | `park-models.glb` antes → ahora | `lamps.bin` (faroles)   | `nightlight.png` | `night.json` | `context-lamps.bin` | `context.glb` antes → ahora |
| ------ | ------------------------------- | ----------------------- | ---------------- | ------------ | ------------------- | --------------------------- |
| xc     | 3.15 → 3.32 MB                  | 7.5 KB (479, 12 muelle) | 414 KB           | 8 KB         | 3.0 KB (192)        | 1.35 → 1.29 MB              |
| xh     | 1.96 → 2.08 MB                  | 6.3 KB (401, 13 muelle) | 337 KB           | 8 KB         | —                   | —                           |
| xo     | 2.08 → 2.14 MB                  | 2.1 KB (133)            | 177 KB           | 8 KB         | —                   | —                           |
| xp     | 1.69 → 1.71 MB                  | 1.0 KB (64)             | 140 KB           | 8 KB         | 9.5 KB (607)        | 1.41 → 1.34 MB              |
| xs     | 1.42 → 1.43 MB                  | 2.0 KB (128)            | 190 KB           | 8 KB         | 8.5 KB (543)        | 1.50 → 1.43 MB              |

El GLB crece ~20–170 KB: dos texturas nuevas (`nightlight-ground` JPEG 1024², `nightlight-water` JPEG 512²,
+5.3 MB RGBA decodificado con mipmaps) y un `TEXCOORD_1` en terreno, empedrado y fachadas.

## 2. Estilo de día (automático)

No hay nada que programar: el GLB ya trae la paleta nueva (cremas cálidos, teja y terracota suaves, pizarra
lavanda, pasto `#86c05a`, árboles más claros con degradado), el suelo nuevo de los tiles y los modelos nuevos
(cementerio, juego de pelota, arco). El agua del GLB (colores por vértice) ahora usa la paleta de día de la web
(`WATER_DAY`: `#78d3d6` → `#3f8fc2`, laguna `#4aaebb`, alberca `#94deea`, río `#284066`, cielo `#dcf1fb`), también
en `ctx-water:*`. Con `emissiveStrength` en su valor del archivo el aspecto de día es idéntico al de antes.

Luces de día recomendadas (las de la web, `night.json → lighting.day`): cielo/niebla `#e3edf2`, hemisférica
`#f3f7ff` / suelo `#8c9c70` × 1.6, sol `#fff0d9` × 2.3, sombra 0.72, exposición 1.06 (tone mapping Neutral).

## 3. Faroles

### 3.1 `lamps.bin` (`shared/formats/lamps.js`, little endian)

```
char[4] "PQL1"
u32     count
u32     recordBytes        (16; leer con este paso, no con una constante)
count × registro:
  f32 x, y, z              y = pie del poste (suelo, o la cubierta del muelle)
  u8  kind                 0 = suelo (andadores, rutas, plazas), 1 = muelle
  u8  0, 0, 0              reservados
```

Son las posiciones de la web (`layers/lamps.js → placeParkLamps`, con el tope de calidad **alta**, 2500), en su
orden de colocación (muelles, luego andadores y rutas, luego plazas). Para calidad media (1500) o baja (700),
si `count > tope`: conservar el registro `j` cuando `⌊(j+1)·f⌋ > ⌊j·f⌋`, `f = tope / count`
(`night.json → lamps.caps`, `capRule`). Hoy ningún parque pasa de 700, así que todas las calidades los muestran
todos.

### 3.2 Dibujo (`night.json → lamps.style`)

- **Poste** (instanciado, un draw call, material sin textura `#2c3036`, mate): cilindro abierto de 5 lados,
  radio 0.08 m abajo / 0.06 m arriba, 4.2 m de alto, más una linterna de 5 lados (radio 0.12 abajo, 0.22 arriba,
  0.35 m de alto) centrada a 4.32 m. Base en `y − 0.1` (hundido 10 cm). Oculto con la cámara a más de **650 m**
  del objetivo (los postes son sub-píxel; solo quedan las cabezas).
- **Cabeza** (instanciada, un draw call, mezcla **aditiva**, sin escribir profundidad, después del agua): disco
  de cara a la cámara centrado en `y + 4.35`, radio **1.3 m** pero nunca menos de **3.2 px** en pantalla. Con
  `d` = distancia al centro (0…1): `core = smoothstep(0.42, 0.12, d)`, `halo = (1 − d)^1.6 · 0.85`,
  `color = mix(#ffc56b, #fff5db, core) · (core + halo) · k` (lineal; `k` = nivel de noche). Descartar `d > 1`.
- **Visibilidad**: todo el grupo solo si `k > 0.001`. Sin luces reales.

### 3.3 `context-lamps.bin`

Mismo formato, en el marco del parque enfocado: los faroles de los parques vecinos (no la región `xcr`) donde su
suelo de contexto se ve (opacidad ≥ 0.5). Rango por vecino en `context.json → neighbors[i].lamps`. **La web no
dibuja faroles de los vecinos**: es opcional; si se usan, recomendado solo cabezas. Sin mapa de luz para vecinos.

## 4. Ventanas, emisivos y mapa de luz dentro del GLB

Todos los materiales que brillan de noche traen su color emisivo y su textura; su fuerza de día va en
`KHR_materials_emissive_strength` (0, salvo `lamp`). La app solo hace, por material, en cada cambio de `k`:

```kotlin
mi.setParameter("emissiveStrength", day + (night - day) * k)
```

(`MaterialInstance` de cada primitiva cuyo material tenga ese nombre; `asset.getMaterialInstances()` /
`MaterialInstance.name`). Los valores también están en `extras.night = { day, night }` de cada material del glTF
y en `night.json → materials.list`.

| material (nombre glTF)                                 | `emissiveFactor` (sRGB) | textura emisiva                     | día | noche |
| ------------------------------------------------------ | ----------------------- | ----------------------------------- | --- | ----- |
| `facade`, `facadeWhite`, `facadeOchre`, `facadeMaroon` | `#ffcf7a`               | `facade-glow` 512², **TEXCOORD_1**  | 0   | 1.5   |
| `window` (vidrios y vanos de modelos)                  | `#ffcf7a`               | —                                   | 0   | 1.3   |
| `glass`                                                | `#ffcf7a`               | —                                   | 0   | 0.45  |
| `lamp` (faroles de los modelos)                        | `#ffe39a`               | —                                   | 0.6 | 2.4   |
| `ground-1-i-j` (terreno, nodos `terrain:*`)            | blanco                  | `nightlight-ground`, **TEXCOORD_1** | 0   | 2.2   |
| `paving-ground` (nodo `paving`)                        | blanco                  | `nightlight-ground`, **TEXCOORD_1** | 0   | 2.2   |
| `water` (nodo `water`)                                 | blanco                  | `nightlight-water`, TEXCOORD_0      | 0   | 1.5   |

Notas:

- No todos los parques usan todos los materiales (`inThisPark` en `night.json`). Xel-Há, por ejemplo, no tiene
  `window` ni `lamp`.
- **Fachadas**: `facade-glow` son 4 × 4 vanos (~72 % encendidos, de brillo distinto); su UV es `uv0 / 4` y por
  eso va en `TEXCOORD_1` (gltfio la lee con `emissiveIndex`/`emissiveUvMatrix` del ubershader, sin
  `KHR_texture_transform`). Se eligió `emissiveFactor` = color de ventana (no `[1,1,1]`) para que el resultado
  sea exactamente el de la web (`emissive × emissiveMap × intensidad`).
- **Terreno y empedrado**: `nightlight-ground` = albedo del suelo (tile de nivel 0) × mapa de luz, en luz lineal,
  así que `emisivo = nightlight-ground × 2.2 × k` reproduce el término de la web
  `albedo × luz × 2.2 × k`. `TEXCOORD_1` = UV sobre `park.extent` (ver abajo). El empedrado (nodo `paving`,
  encima del terreno) usa la misma textura porque tapa justamente los andadores pintados.
- **Agua**: `nightlight-water` = el mapa de luz (512²) en `TEXCOORD_0` = UV sobre `park.extent`; simplificación
  de los reflejos de la web (allá el mapa se lee 4, 10 y 18 m más lejos del observador con pesos 0.5 / 0.4 / 0.3,
  cortado por el oleaje, × 3). Para el color de noche ver §5 (`water.nightMultiply`).
- **Calibración**: las fuerzas son las de three.js (emisivo sumado al color lineal antes del tone mapping). Si
  la exposición de la cámara de Filament no es la neutra, el emisivo de gltfio puede verse más fuerte o débil:
  ajustar con un factor global (`EMISSIVE_SCALE`, único valor a escribir a mano) comparando con las capturas web
  (`?night`).
- `extensionsUsed` incluye ahora `KHR_materials_emissive_strength` (soportado por gltfio; no está en
  `extensionsRequired`).

### 4.1 `nightlight.png` (el mapa de luz completo)

Copia exacta del canvas de la web (`layers/lamps.js → drawLightMap`): 1024², sRGB, fila 0 = borde norte.
Negro; `paving.png` teñido `#ffd9a0` × 0.34 (andadores con brillo suave); un disco cálido de 10 m de radio por
farol (gradiente radial `rgba(255,206,140,0.9)` → `rgba(255,178,98,0.45)` a 0.3 → `rgba(255,150,70,0.14)` a
0.65 → 0), sumados y saturados a 1. Mapeo (`night.json → lightMap.extent`):

```
u = (x − x0) / size        v = (z − z0) / size        (x0 = cx − size/2, z0 = cz − size/2 de park.extent)
```

No hace falta para el render básico (ya va dentro del GLB); sirve si la app quiere su propio material (p. ej.
reflejos desplazados en el agua o un mapa de luz por calidad).

## 5. `night.json` (uno por parque; todo menos `lamps`, `lightMap` y `materials.inThisPark` es igual en todos)

- `when`: modos `auto` / `day` / `night`; `auto` = noche de **19:00 a 06:00** hora del parque, **UTC−5 fijo**
  (`America/Cancun`, sin horario de verano), no la zona del teléfono; revisar cada 60 s. Transición
  **1.5 s**: progreso lineal `p` 0 ↔ 1 y `k = smoothstep(0, 1, p)`. Estilo nocturno de la UI cuando `k > 0.5`.
- `lighting.day` / `lighting.night`, interpolados con `k` (colores en RGB lineal):

  |                   | día             | noche            |
  | ----------------- | --------------- | ---------------- |
  | cielo / niebla    | `#e3edf2`       | `#0d1a3e`        |
  | hemisférica cielo | `#f3f7ff` × 1.6 | `#7c86cc` × 1.75 |
  | hemisférica suelo | `#8c9c70`       | `#5a4462`        |
  | sol / luna        | `#fff0d9` × 2.3 | `#a9b9ff` × 0.5  |
  | sombra            | 0.72            | 0.5              |
  | exposición        | 1.06            | 1.0              |

  La luna usa la dirección del sol (las sombras horneadas siguen coincidiendo). En Filament: la hemisférica se
  aproxima con la luz indirecta (IBL/SH de dos colores) y la intensidad relativa; mantener las proporciones.

- `colors`: ventana `#ffcf7a`, farol `#ffc56b`.
- `materials.list`: tabla de §4 (`name`, `emissiveFactor` lineal, `emissiveColor`, `day`, `night`,
  `emissiveTexture { name, texCoord }`, `inThisPark`).
- `lamps`: archivo, formato, `count`, `piers`, `caps`, `capRule`, `style` (§3.2), `head`, `visibility`.
- `lightMap`: archivo, tamaño, espacio de color, `extent { x0, z0, size }`, `uv`, cómo lo usan terreno y agua.
- `water`: `day` (`WATER_DAY`), `night` (`#1b2c66` cielo, `#1c4fa0` poco profundo, `#0b2462` profundo), agua
  interior de noche = base × (0.16, 0.22, 0.42) al 80 %, y `nightMultiply` ≈ (0.065, 0.092, 0.375): el agua del
  GLB trae el color de día en `COLOR_0`, así que de noche `baseColorFactor = mix(1, nightMultiply, k)` (RGB,
  alfa intacto). Aplicar lo mismo a `ctx-water:*`.
- `map`: tiles de OSM (sin iluminar) y mar de borde de la región: `c' = mix(c, c · (0.05, 0.065, 0.15) +
(0.004, 0.006, 0.018), k)` en lineal (en la app: `baseColorFactor` del material unlit de los tiles =
  `mix(1, tint, k)` más el `lift` si el material lo permite; sin `lift` la diferencia es mínima).
- `markers`: brillo de marcadores `0 0 0 1px #0b142e66, 0 0 10px #ffd59a59`; tarjeta seleccionada `#1b2440`
  con texto `#f1f3f9` (categoría `#f1f3f9b3`); paneles de navegación `#1b2440f5`, texto `#f1f3f9`, secundario
  `#f1f3f9b3`, tiempo `#81c995`, enlaces `#8ab4f8`; punto azul con halo `0 0 0 3px #5b9cff55, 0 0 12px #5b9cffaa`.
- `navigation`: ruta `#1a73e8` (de noche `#5b9cff`), tramo caminado `#8fa8c8`, contorno `#ffffff`.
- `contextFade`: 45 / 5 m (igual que `context.json`).

Rutas oficiales y andadores son líneas sin iluminación: de noche se leen solas como líneas luminosas, no se
tocan. La fauna no existe en la app: los "animales dormidos" de la web no aplican.

## 6. Pasos en la app (noche)

1. Estado `nightTarget` (0/1) por modo y reloj (UTC−5); `p` avanza `dt / 1.5`; `k = smoothstep(p)`.
2. Por cuadro con `k` nuevo: luces/cielo/niebla/exposición (§5), `emissiveStrength` de cada material de la
   tabla (`context.glb` no tiene emisivos: su suelo sigue a las luces solo), agua `baseColorFactor`,
   tiles OSM, faroles visibles si `k > 0.001`, uniformes de las cabezas, estilo UI si `k > 0.5`.
3. Faroles: cargar `lamps.bin` al cargar el parque, tope por calidad, dos `InstancedMesh`-equivalentes
   (o geometría fusionada como los árboles: postes ~40 triángulos × N, cabezas 2 triángulos × N).
4. Al cambiar de parque sin recargar: los archivos de noche del parque nuevo se cargan con su bundle.

## 7. Navegación a pie

La lógica es pura y está probada en `shared/nav-graph.js` y `shared/navigation.js`: portarla tal cual a Kotlin;
`tests/shared/nav-graph.test.js` y `tests/shared/navigation.test.js` son casos de aceptación (mismos números).

**Entrada**: `park.json → entrance { x, z }` (nuevo, solo en la exportación móvil por ahora; la siguiente
`pnpm data:build` también lo escribe en `public/`). Es el punto que elige la web: `sources.entrance` de la
definición si existe, si no la actividad llamada «Entrada / Acceso / Ingreso…», «Plaza Principal» o
«Taquillas», si no la primera activa, si no el centro del área diseñada. Valores: xc `(-70.43, -94.3)`, xh
`(140, -14)`, xo `(441, -80)`, xp `(12, -150)`, xs `(190, 68)`. El resto de `park.json` es idéntico (verificado).

**Grafo** (`buildGraph(park)`): `walkways` (nodos por coordenadas idénticas) + `routes[].lines`; constantes
`NAV`: `snap` 4 m (puntas sueltas), `link` 6 m cada `linkStep` 20 m (rutas oficiales atadas a andadores),
`deadEnd` 25 m (puntas sin salida atadas si la vuelta es > 3× + 30 m), `bridge` 30 m (piezas separadas, tipo
Kruskal), `reach` 60 m (máximo de una actividad a la red), velocidad 1.25 m/s (4.5 km/h); pesos ruta oficial
0.95, andador 1, `link` 1.15, `bridge` 1.4. Índice espacial de aristas en celdas de 25 m.

**Ruta** (`route(graph, from, to)`): proyección de origen y destino sobre la arista más cercana (si caen en
piezas distintas gana la más grande); conectores punteados; A\* con nodos virtuales sobre las aristas
(heurística euclidiana × peso mínimo); línea recta si es más corta que entrar y salir de la red o si no hay red
(Xplor); `pruneSpikes` quita idas y vueltas de < 8 m.

**Indicaciones** (`makeSteps`, `TURNS`): primer paso «Camina hacia el {dir}»; giro si el rumbo cambia > 35° en
un cruce (grado ≥ 3 o entrada/salida de la red) o > 100° en una curva, medido 10 m antes y después; de dos
giros a < 18 m queda el más marcado; < 60° = «ligeramente»; actividad más cercana a ≤ 30 m como referencia (sin
repetirla en giros seguidos ni nombrar el destino); llegada «Llegas a {name}». Tiempo = distancia / 1.25 m/s,
en minutos, mínimo 1. Distancias redondeadas a 5 m (< 100 m), 10 m (< 1 km) o km con un decimal (coma en
español).

**Inicio** (`chooseStart`): punto tocado («Elegir salida») > GPS si está dentro del área diseñada o a ≤ 300 m
(`park.json → clear`) > entrada simulada (lejos, permiso negado, sin ubicación o esperando la primera lectura).

**Guía** (`guidance`, cada cuadro): proyección sobre la ruta buscando −40 / +120 m alrededor de la anterior;
siguiente maniobra = primer paso a más de 2 m; letrero «En {dist} {maniobra}» o la maniobra sola a ≤ 8 m;
fuera de ruta a > 25 m (recalcular cada ≥ 4 s, solo con GPS real); llegada a < 12 m. Simulación a 1.25 m/s ×
1, 4 o 10.

**Textos** (`src/i18n/es.js` / `en.js`; mismas llaves en `strings.xml`, marcadores `{dir}`, `{near}`, `{name}`,
`{dist}`, `{text}`):

| llave              | es                                                            | en                                                                   |
| ------------------ | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| `nav_directions`   | Cómo llegar                                                   | Directions                                                           |
| `nav_go`           | Ir                                                            | Go                                                                   |
| `nav_goTo`         | Cómo llegar a                                                 | Directions to                                                        |
| `nav_start`        | Iniciar                                                       | Start                                                                |
| `nav_simulate`     | Simular recorrido                                             | Simulate walk                                                        |
| `nav_end`          | Terminar                                                      | End                                                                  |
| `nav_steps`        | Indicaciones                                                  | Steps                                                                |
| `nav_min`          | min                                                           | min                                                                  |
| `nav_walk`         | a pie                                                         | walking                                                              |
| `nav_from`         | Desde                                                         | From                                                                 |
| `nav_from_gps`     | Tu ubicación                                                  | Your location                                                        |
| `nav_from_sim`     | Entrada del parque (simulada)                                 | Park entrance (simulated)                                            |
| `nav_from_manual`  | Punto elegido en el mapa                                      | Point chosen on the map                                              |
| `nav_locating`     | Buscando tu ubicación…                                        | Finding your location…                                               |
| `nav_far`          | Estás lejos del parque: ubicación simulada en la entrada      | You are far from the park: simulated location at the entrance        |
| `nav_denied`       | Sin permiso de ubicación: ubicación simulada en la entrada    | No location permission: simulated location at the entrance           |
| `nav_unavailable`  | Ubicación no disponible: ubicación simulada en la entrada     | Location unavailable: simulated location at the entrance             |
| `nav_manual`       | Salida desde el punto elegido (simulada)                      | Starting from the chosen point (simulated)                           |
| `nav_pick`         | Elegir salida                                                 | Choose start                                                         |
| `nav_pick_hint`    | Toca el mapa para elegir el punto de partida                  | Tap the map to choose the starting point                             |
| `nav_cancel`       | Cancelar                                                      | Cancel                                                               |
| `nav_speed`        | Velocidad de la simulación                                    | Simulation speed                                                     |
| `nav_recenter`     | Recentrar                                                     | Re-center                                                            |
| `nav_rerouting`    | Recalculando ruta…                                            | Rerouting…                                                           |
| `nav_direct`       | Sin andador cercano: se indica en línea recta                 | No walkway nearby: straight-line directions                          |
| `nav_then`         | Después                                                       | Then                                                                 |
| `nav_arrived`      | Has llegado                                                   | You have arrived                                                     |
| `nav_simulating`   | Simulación                                                    | Simulation                                                           |
| `nav_head`         | Camina hacia el {dir}                                         | Head {dir}                                                           |
| `nav_dir_n` … `nw` | norte, noreste, este, sureste, sur, suroeste, oeste, noroeste | north, northeast, east, southeast, south, southwest, west, northwest |
| `nav_left`         | Gira a la izquierda                                           | Turn left                                                            |
| `nav_right`        | Gira a la derecha                                             | Turn right                                                           |
| `nav_slight_left`  | Gira ligeramente a la izquierda                               | Turn slightly left                                                   |
| `nav_slight_right` | Gira ligeramente a la derecha                                 | Turn slightly right                                                  |
| `nav_near`         | {text} cerca de {near}                                        | {text} near {near}                                                   |
| `nav_arrive`       | Llegas a tu destino                                           | Arrive at your destination                                           |
| `nav_arrive_at`    | Llegas a {name}                                               | Arrive at {name}                                                     |
| `nav_in`           | En {dist} {text}                                              | In {dist} {text}                                                     |

En `nav_in` la maniobra va con la primera letra en minúscula («En 40 m gira a la izquierda»).

**UI** (como la web): «Cómo llegar» en la hoja de la actividad; hoja de indicaciones con destino, minutos,
distancia, «Desde…» con «Elegir salida» y el aviso de ubicación simulada, Iniciar / Simular recorrido y la lista
de pasos con flechas. En navegación: letrero verde `#0d7a4a` arriba (flecha + texto + «Después: …» si la
siguiente maniobra está a < 60 m), barra inferior (minutos, metros, velocidad si simula, Terminar),
«Recentrar» al mover el mapa, letrero azul «Has llegado». Cambiar de parque cancela la navegación.

**Mapa**: línea `#1a73e8` (`#5b9cff` de noche) con contorno blanco, 2.6 m de ancho entre 6 y 14 px, encima de
rutas y andadores y **sin prueba de profundidad**; tramo caminado `#8fa8c8`; conectores punteados; rutas
oficiales atenuadas (opacidad 0.4 / 0.3) mientras hay ruta; pin `#ea4335`; punto azul con halo de precisión
y cono de rumbo. Cámara: vista previa encuadrando la ruta en lo que deja libre la hoja; navegación con
seguimiento suave (3 s⁻¹), objetivo 22 m por delante, distancia 170 m, inclinación 0.92 rad, rumbo arriba;
tocar el mapa pausa el seguimiento.

## 8. Lo que la app tiene que escribir a mano

Nada por parque. Solo constantes de lógica que vienen del código web y no de los datos: `NAV`, `TURNS`,
`GUIDANCE` (§7), las cadenas `nav_*`, los colores de UI que no son de `night.json` (verde del letrero
`#0d7a4a`, pin `#ea4335`, opacidades de rutas atenuadas), las fórmulas de los drivers de animación (§10) y,
si hace falta, un `EMISSIVE_SCALE` global de calibración de Filament (§4).

## 9. Lista de pruebas (capturas a comparar con la web, `?day` / `?night`)

1. Xcaret de día, vista general: igual que antes salvo agua algo más suave; sin ventanas encendidas.
2. Xcaret de noche, vista general: cielo `#0d1a3e`, puntos de faroles, charcos cálidos en andadores y plazas.
3. Xcaret de noche, de cerca en la plaza de la Capilla de Guadalupe / hacienda: ventanas `facade*` en mosaico
   irregular (no todas iguales), `window` cálidas, postes visibles (< 650 m).
4. Xcaret de noche desde > 650 m: sin postes, cabezas ≥ 3.2 px.
5. Xel-Há de noche junto al agua: charcos de luz en la orilla reflejados en el agua; agua azul profundo.
6. Muelles (Xel-Há): faroles sobre la cubierta (kind 1), no hundidos en el agua.
7. Transición día → noche en modo automático cambiando la hora (18:59 → 19:00, UTC−5): fundido de 1.5 s.
8. Xplor / Xenses / Xcaret con contexto de noche: vecinos oscurecidos por las luces, sin faroles (o solo cabezas
   si se activa `context-lamps.bin`), tiles OSM azul marino.
9. Calidad baja / media: mismos faroles (todos los parques < 700).
10. Navegación: «Cómo llegar» a una actividad lejana en Xcaret desde la entrada simulada (`entrance`), lista de
    pasos idéntica a la web; Iniciar + Simular × 10 hasta «Has llegado»; ruta recalculada al salirse 25 m (GPS
    real); Xplor en línea recta (`nav_direct`); la misma ruta de noche (`#5b9cff`).
11. Xel-Há: la salida simulada en `(140, -14)` (plaza de llegada), no en una actividad.
12. Rendimiento: draw calls de día sin cambio, de noche +2 (postes, cabezas); FPS en teléfono de gama media.

## 10. Animaciones (`animated.json`, `src/export/animated.js`)

En la web varias piezas se mueven en cada cuadro (`update()` de los modelos y la capa de fauna). Con `--mobile` el
exportador ya no las congela en `static`: cada parte que mueve `update()` sale como un nodo propio
`anim:<pieza>:<i>` en `park-models.glb` (en el marco de la propia parte, sin transformación de nodo, float32 e
índices uint16 sin meshopt ni cuantización, como los `proto:*`, siempre con `COLOR_0`; una primitiva por
material), y `animated.json` dice cómo moverlas. Hoy solo Xcaret tiene piezas; los demás parques escriben
`pieces: []`.

```json
{ "format": "parquex-animated", "version": 1, "park": "xc", "frame": "…",
  "nightActivity": { "pace": 0.12, "birds": 0.15 },
  "pieces": [{ "id": "torre:cabin", "driver": "towerCabin", "position": [152, 0, -406], "rotY": 0,
               "box": [x0, y0, z0, x1, y1, z1], "size": 13.2, "params": { "height": 80 },
               "parts": ["anim:torre:cabin:0"] }] }
```

- `position`, `rotY`: transformación del landmark (las bandadas: origen, coordenadas absolutas). Mundo =
  T(position) · R_y(rotY) · matriz local de la parte (la que pondría three.js: posición · rotación · escala).
- `box`: caja en el marco del parque que contiene todo el recorrido (140 s de `update()` muestreados, +1.5 m).
- `size`: metros de la figura móvil más chica; la app solo anima piezas en pantalla que se vean de ≥ 2 px.
- `nightActivity`: de noche (k = nivel de noche) el reloj de vuelo avanza × `1 + (pace − 1)·k` y de cada
  enjambre o bandada se ven `max(1, round(n · (1 + (birds − 1)·k)))` copias (`graphics/night.js`).

| `driver`     | piezas (xc)                          | partes                             | `params`                                                           | qué rehace (`update()` de…)                                                                              |
| ------------ | ------------------------------------ | ---------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `towerCabin` | `torre:cabin`                        | la cabina (vidrio, piso, techo)    | `height`                                                           | `scenic-tower.js`: sube y baja en 70 s, gira 0.12 rad/s                                                  |
| `flag`       | `torre:flag`, `bandera:flag`         | la tela plana en reposo            | `at`, `width`, `height`, `speed`                                   | `parts/flag.js`: ola por vértice (normales recalculadas) y vaivén del asta                               |
| `voladores`  | `voladores:dance`                    | caporal + 4 voladores              | `height`, `ropeColor`                                              | `voladores.js`: ciclo de 48 s; voladores cabeza abajo (R_z(π) en su matriz); la app dibuja las 4 cuerdas |
| `netDome`    | `mariposario:flies`, `aviario:flies` | un ala blanca (× `flies`)          | `rx`, `rz`, `scale`, `flap`, `flies[]` (`a, s, h, rr, color` sRGB) | `net-dome.js` + aleteo de `flap.js` (eje x)                                                              |
| `flock`      | `fauna:birds0…4`                     | un ave con sus colores (× `birds`) | `x`, `z`, `scale`, `flap`, `birds[]` (`phase, speed, rr, hh`)      | `layers/fauna.js` (`faunaLayout`) + aleteo (eje z)                                                       |

Aleteo (`flap`: `axis`, `speed`, `amp`, `threshold`): los vértices con |p.eje| > `threshold` giran
sign(p.eje) · sin(t·speed + i·1.731) · amp en el plano (eje, y), con t en tiempo real e i el índice de la copia.
Flamencos, delfines, lanchas y felinos siguen congelados (o fuera) en la app.

En la app (`AnimatedModels`, `AnimationDrivers`): un renderable por pieza con los MaterialInstance de gltfio,
vértices transformados en la CPU (~3.6 k en xc) y subidos con búferes rotativos, a 30 fps solo mientras alguna
pieza se vea; nunca en calidad Baja. Si cambia una fórmula de un `update()` listado arriba, hay que cambiarla
también en `AnimationDrivers.kt` (sus pruebas usan números sacados de three.js).

## 11. Huecos en el suelo (`park.json → groundHoles`)

Opcional. Los huecos que los modelos recortan del terreno y que tienen un puente encima (hoy, el foso de los
felinos de Xcaret): `[{ rings: [[[x, z], …], …], y }]`. Los anillos están en metros del parque y se rellenan con
la regla par-impar (`shared/ground-holes.js`). `y` es la altura de lo que se pisa (la cubierta del puente). El
terreno de `park-models.glb` ya trae el hueco. La app dibuja a esa `y` los andadores, la ruta de navegación, el
punto azul y el pin que caen dentro de los anillos.

## 12. Actualización de modelos (sin publicar otra versión de la app)

La app trae sus modelos en `assets/parks/` y, junto a ellos, `assets/parks/manifest.json` (`tag: "bundled"`), que
escribe `pnpm export:mobile`. Cuando se cambian los modelos, `pnpm publish:models` sube la exportación
(`dist-mobile/`) como un Release del repositorio en GitHub (`pipeline/publish-models.js`, necesita `gh` con sesión
iniciada):

- `manifest.json` (`pipeline/lib/models-manifest.js`):
  `{ format: 1, tag, published, parks: { <park>: { files: { <archivo>: { size, sha256, asset } } } } }`.
- Un asset por archivo, llamado `<park>.<archivo>` (por ejemplo `xc.park-models.glb`).

Lo que hace la app:

1. Al abrir (o una vez al día) descarga
   `https://github.com/<usuario>/<repo>/releases/latest/download/manifest.json`. Si no hay red o falla, sigue con
   lo que tiene.
2. Ignora el manifiesto si `format` no es uno que conoce: una versión vieja de la app no carga archivos de un
   formato nuevo.
3. Para cada parque compara el `sha256` de cada archivo con el de su copia vigente (la de `assets/` o la última
   descargada). Los distintos los baja de `https://github.com/<usuario>/<repo>/releases/download/<tag>/<asset>`
   a una carpeta temporal y comprueba tamaño y `sha256`.
4. Solo si llegaron todos los archivos de ese parque, cambia la carpeta temporal por la vigente
   (`filesDir/parks/<park>/`, más su `manifest.json`) y la usa a partir de la siguiente carga del parque. Si algo
   falla, borra la temporal y sigue con la anterior.
5. Al cargar un parque usa `filesDir/parks/<park>/` si existe; si no, `assets/parks/<park>/`.
