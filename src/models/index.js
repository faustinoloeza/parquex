// Registry of landmark models. To add one: create a file with defineModel()
// (see docs/agregar-modelo.md) and list it here.

import tlachco from './attractions/tlachco.js';
import scenicTower from './attractions/scenic-tower.js';
import voladores from './attractions/voladores.js';
import mayanPlaza from './mayan/mayan-plaza.js';
import ballCourt from './mayan/ball-court.js';
import chapel from './colonial/chapel.js';
import chimney from './colonial/chimney.js';
import caracol from './mayan/caracol.js';
import fan from './attractions/fan-building.js';
import cemetery from './attractions/cemetery.js';
import netDome from './attractions/net-dome.js';
import pyramid from './mayan/pyramid.js';
import forum from './attractions/forum.js';
import agaveField from './colonial/agave-field.js';
import aqueduct from './colonial/aqueduct.js';
import mayanArch from './mayan/mayan-arch.js';
import domes from './attractions/domes.js';
import vitral from './attractions/vitral.js';
import letters from './attractions/letters.js';
import waterSlides from './attractions/water-slides.js';
import lighthouseSlides from './attractions/lighthouse-slides.js';
import ticketArcade from './attractions/ticket-arcade.js';
import floatingFaucet from './attractions/floating-faucet.js';
import kidsTower from './attractions/kids-tower.js';
import entranceBuilding from './mayan/entrance-building.js';
import entranceArch from './mayan/entrance-arch.js';
import flagpole from './attractions/flagpole.js';
import ruins from './mayan/ruins.js';
import altar from './mayan/altar.js';
import roundPalapa from './waterfront/round-palapa.js';
import longPalapa from './waterfront/long-palapa.js';
import dock from './waterfront/dock.js';
import walkways from './waterfront/walkways.js';
import boats from './waterfront/boats.js';
import habitat from './attractions/habitat.js';
import galleryBridge from './attractions/gallery-bridge.js';
import trailGate from './colonial/trail-gate.js';
import snorkelCove from './waterfront/snorkel-cove.js';
import stoneSign from './attractions/stone-sign.js';
import signpost from './attractions/signpost.js';
import compassRose from './attractions/compass-rose.js';
import pinwheel from './attractions/pinwheel.js';
import crookedTown from './attractions/crooked-town.js';
import slideTower from './attractions/slide-tower.js';
import pavilion from './attractions/pavilion.js';
import parkedCars from './attractions/parked-cars.js';
import trajineras from './waterfront/trajineras.js';
import fiestaArch from './attractions/fiesta-arch.js';
import zipTower from './attractions/zip-tower.js';
import pyramidGrid from './attractions/pyramid-grid.js';
import caveEntrance from './attractions/cave-entrance.js';
import toboganxote from './attractions/toboganxote.js';
import aquarium from './attractions/aquarium.js';
import greenhouse from './colonial/greenhouse.js';
import temazcal from './mayan/temazcal.js';
import charroArena from './attractions/charro-arena.js';
import crescentTickets from './attractions/crescent-tickets.js';
import palapaKiosk from './attractions/palapa-kiosk.js';
import busTerminal from './attractions/bus-terminal.js';

/** @type {Record<string, import('./define.js').ModelDefinition>} */
export const MODELS = Object.fromEntries(
  [
    tlachco,
    scenicTower,
    voladores,
    mayanPlaza,
    ballCourt,
    chapel,
    chimney,
    caracol,
    fan,
    cemetery,
    netDome,
    pyramid,
    forum,
    agaveField,
    aqueduct,
    mayanArch,
    domes,
    vitral,
    letters,
    waterSlides,
    lighthouseSlides,
    ticketArcade,
    floatingFaucet,
    kidsTower,
    entranceBuilding,
    entranceArch,
    flagpole,
    ruins,
    altar,
    roundPalapa,
    longPalapa,
    dock,
    walkways,
    boats,
    habitat,
    galleryBridge,
    trailGate,
    snorkelCove,
    stoneSign,
    signpost,
    compassRose,
    pinwheel,
    crookedTown,
    slideTower,
    pavilion,
    parkedCars,
    trajineras,
    fiestaArch,
    zipTower,
    pyramidGrid,
    caveEntrance,
    toboganxote,
    aquarium,
    greenhouse,
    temazcal,
    charroArena,
    crescentTickets,
    palapaKiosk,
    busTerminal,
  ].map((m) => [m.type, m]),
);

/** @returns {import('./define.js').ModelDefinition | undefined} */
export const getModel = (type) => MODELS[type];

/**
 * Holes the landmarks cut in the ground (models' `groundHoles`), each with the
 * placement it belongs to, for shared/ground-holes.js → makeGroundHoles.
 * @param {import('../parks/define.js').Landmark[]} landmarks
 * @returns {import('#shared/ground-holes.js').GroundHole[]}
 */
export function landmarkGroundHoles(landmarks) {
  return landmarks.flatMap((l) => {
    const model = getModel(l.type);
    const holes = model?.groundHoles?.({ ...model.params, ...l }) ?? [];
    return holes.map((hole) => ({ ...hole, base: { x: l.x, z: l.z, y: l.y } }));
  });
}
