// Entry point: reads the URL, loads the park's 3D map and wires the UI to it.
import './styles/index.css';
import { MapApp } from './app/MapApp.js';
import { parseRoute, routeUrl, debugFlags } from './app/routing.js';
import { readPreference, writePreference } from './app/preferences.js';
import { TIME_MODES, forcedTimeMode } from './app/time-of-day.js';
import { PARKS } from './parks/index.js';
import { translator } from './i18n/index.js';
import { createHeader } from './ui/header.js';
import { createSidebar } from './ui/sidebar/index.js';
import { createToolbar } from './ui/toolbar.js';
import { createAttribution } from './ui/attribution.js';
import { createLoadingScreen } from './ui/loading-screen.js';
import { createStatsOverlay } from './ui/stats-overlay.js';
import { createDirections } from './ui/directions.js';
import { Navigation } from './app/navigation.js';

const MOBILE = '(max-width: 640px)';

async function boot() {
  const { park: parkKey, lang } = parseRoute();
  const canonical = routeUrl(parkKey, lang);
  if (location.pathname !== canonical) history.replaceState(null, '', canonical + location.search);
  document.documentElement.lang = lang;
  const debug = debugFlags();
  const parkDef = PARKS[parkKey];

  const root = document.getElementById('root');
  const stage = document.createElement('div');
  stage.className = 'gx-map-container';
  root.appendChild(stage);

  let t = translator(lang);
  const loading = createLoadingScreen(root, t);
  const navigate = (park, language) => {
    location.href = routeUrl(park, language);
  };
  const header = createHeader(root, { park: parkKey, lang, t, onNavigate: navigate });

  let sidebar = null;
  let quality = debug.still ? 'medium' : readPreference('quality', 'auto');
  // day / night: the saved choice, or forced from the URL (?night, ?day: screenshots, not saved)
  const saved = readPreference('timeOfDay', 'auto');
  let timeMode = forcedTimeMode() ?? (TIME_MODES.includes(saved) ? saved : 'auto');
  const app = new MapApp(stage, {
    park: parkDef,
    lang,
    t,
    quality,
    timeMode,
    debug,
    onProgress: (p) => loading.progress(p),
    onSelect: (poi) => sidebar?.highlight(poi),
  });
  try {
    await app.load();
  } catch (err) {
    console.error(err);
    loading.fail(t('loadError'));
    return;
  }

  // header and sidebar of the focused park (rebuilt when the focus moves to a
  // neighboring park in place)
  let topbar = null;
  const desktop = !matchMedia(MOBILE).matches;
  let sidebarOpen = !(debug.nosidebar || !desktop);

  // walking navigation: directions panel + guidance (app/navigation.js)
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
  const onNavLayout = (mode) => {
    const html = document.documentElement;
    html.classList.toggle('gx-nav-preview', mode === 'preview');
    html.classList.toggle('gx-nav-active', mode === 'active');
    // the map is centered in the area the panels leave free
    if (mode === 'preview') app.setInset(desktop ? directions.panel.offsetWidth + 12 : 0, desktop ? 0 : directions.sheetHeight());
    else if (mode === 'active') app.setInset(0, 0);
    else syncInset();
  };
  navigation = new Navigation(app, directions, { lang, onLayout: onNavLayout });
  app.onDirections = (poi) => navigation.directions(poi);

  const syncInset = () => {
    const open = !sidebar.el.classList.contains('collapsed');
    sidebarOpen = open;
    topbar.setListOpen(open);
    app.setInset(desktop && open ? sidebar.el.offsetWidth + 12 : 0);
  };
  const buildChrome = (current) => {
    // the park's own labels (official data) refine the UI strings
    t = translator(lang, app.park.labels);
    app.t = t;
    header.remove();
    topbar?.remove();
    topbar = createHeader(root, {
      park: current.key,
      lang,
      t,
      hours: app.park.hours,
      quality,
      onNavigate: navigateOrFocus,
      onMenu: () => sidebar.toggle(),
      onQuality: (mode) => {
        quality = mode;
        writePreference('quality', mode);
        app.setQuality(mode);
      },
      timeMode,
      onTimeMode: (mode) => {
        timeMode = mode;
        writePreference('timeOfDay', mode);
        app.setTimeMode(mode);
      },
    });
    document.title = `${t(current.labelKey)} 3D`;
    sidebar?.el.remove();
    sidebar = createSidebar(root, {
      park: app.park,
      lang,
      t,
      onSelect: (poi) => app.select(poi),
      onFilter: (filter) => app.applyFilter(filter),
      onFocusRoute: (slug) => app.focusRoute(slug),
      onDirections: (poi) => navigation.directions(poi),
    });
    // on desktop the map is centered in the area next to the sidebar
    sidebar.toggle(sidebarOpen);
    new MutationObserver(syncInset).observe(sidebar.el, { attributes: true, attributeFilter: ['class'] });
    syncInset();
  };
  // parks next to the focused one (Xcaret, Xplor, Xenses) switch in place: the
  // map keeps everything loaded and flies to the new park; any other park or
  // language reloads the page
  const navigateOrFocus = async (park, language) => {
    if (language === lang && (await app.focusableParks()).includes(park)) {
      if (await app.focusPark(PARKS[park])) return;
    }
    navigate(park, language);
  };
  let fromHistory = false; // back / forward: the URL is already the park's
  app.onFocus = (_, def) => {
    if (!fromHistory) history.pushState(null, '', routeUrl(def.key, lang) + location.search);
    // a walk belongs to one park: switching parks cancels it
    navigation.reset();
    buildChrome(def);
  };
  window.addEventListener('popstate', async () => {
    const route = parseRoute();
    if (route.park === app.parkDef.key && route.lang === lang) return;
    fromHistory = true;
    await navigateOrFocus(route.park, route.lang);
    fromHistory = false;
  });
  buildChrome(parkDef);

  createToolbar(root, app, t);
  createAttribution(root, lang);
  if (debug.stats) createStatsOverlay(root, app);

  app.start({ frames: debug.still ? 4 : Infinity });
  loading.done();
  window.__app = app; // handy for debugging from the console
  window.__nav = navigation;
}

boot();
