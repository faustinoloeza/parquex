// Walking navigation, loaded the first time someone asks for directions
// (main.js): the directions panel (ui/directions.js), the guidance and its
// walking graph (app/navigation.js) and the route on the map
// (layers/nav-route.js). The map opens without any of it.
import { createDirections } from '../ui/directions.js';
import { Navigation } from './navigation.js';
import { createNavRouteLayer } from '../layers/nav-route.js';

/**
 * @param {{ root: HTMLElement, app: import('./MapApp.js').MapApp, lang: string,
 *   onLayout: (mode: 'idle' | 'preview' | 'active', directions: ReturnType<typeof createDirections>) => void }} options
 *   onLayout: the panels changed (main.js re-centers the map in the free area)
 * @returns {Navigation}
 */
export function startWalking({ root, app, lang, onLayout }) {
  app.setNavLayer(createNavRouteLayer());
  let navigation = null;
  const directions = createDirections(root, {
    t: () => app.t,
    lang,
    onStart: () => navigation.begin(),
    onSimulate: () => navigation.begin({ simulate: true }),
    onEnd: () => navigation.end(),
    onPick: () => navigation.pickStart(),
    onCancelPick: () => navigation.cancelPick(),
    onClearManual: () => navigation.clearManual(),
    onSpeed: (k) => navigation.setSpeed(k),
    onRecenter: () => navigation.recenter(),
  });
  navigation = new Navigation(app, directions, { lang, onLayout: (mode) => onLayout(mode, directions) });
  return navigation;
}
