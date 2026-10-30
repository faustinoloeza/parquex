// Entry point: reads the URL, loads the park's 3D map and wires the UI to it.
import './styles/index.css';
import { MapApp } from './app/MapApp.js';
import { BASE, parseRoute, routeUrl, debugFlags } from './app/routing.js';
import { readPreference, writePreference } from './app/preferences.js';
import { TIME_MODES, forcedTimeMode } from './app/time-of-day.js';
import { THEME_MODES, activeTheme, forcedThemeMode } from './themes/index.js';
import { applyTheme } from './ui/theme.js';
import { PARKS } from './parks/index.js';
import { translator } from './i18n/index.js';
import { createHeader } from './ui/header.js';
import { createSidebar } from './ui/sidebar/index.js';
import { createActivitiesSheet } from './ui/activities-sheet.js';
import { createPoiChips } from './ui/poi-chips.js';
import { createFestivalPanel } from './ui/festival.js';
import { createFestivalMarkers } from './ui/festival-markers.js';
import { parkDate, sessionsOn } from './themes/muertos/festival.js';
import { createToolbar } from './ui/toolbar.js';
import { createAttribution } from './ui/attribution.js';
import { createLoadingScreen } from './ui/loading-screen.js';
import { createDisclaimer } from './ui/disclaimer.js';
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

  // seasonal theme, only in its season: the saved choice ('auto' goes by the
  // date), or forced from the URL (?theme=…: screenshots, not saved)
  const savedTheme = readPreference('theme', 'auto');
  let themeMode = forcedThemeMode() ?? (THEME_MODES.includes(savedTheme) ? savedTheme : 'auto');
  let theme = activeTheme(themeMode);
  applyTheme(theme);

  let t = translator(lang);
  const loading = createLoadingScreen(root, t, theme?.tagline?.[lang]);
  const disclaimer = createDisclaimer(root, () => t);
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
    theme,
    debug,
    onProgress: (p) => loading.progress(p),
    onSelect: (poi) => {
      sidebar?.highlight(poi);
      festivalMarkers?.deselect();
    },
  });
  try {
    await app.load();
  } catch (err) {
    console.error(err);
    loading.fail(t('loadError'));
    return;
  }

  // header and activity list of the focused park (rebuilt when the focus moves
  // to a neighboring park in place, and when the window crosses the phone
  // width): the sidebar on desktop; on phones, as in the Android app, a bottom
  // sheet opened from the top bar and filter chips over the map
  let topbar = null;
  let activities = null;
  let chips = null;
  // a seasonal festival in the focused park (src/themes): its program and places, its markers
  let festival = null;
  let festivalMarkers = null;
  let festivalShown = true;
  const switchTheme = (next) => {
    theme = next;
    applyTheme(theme);
    app.setTheme(theme);
    loadFestival().then(() => buildChrome(app.parkDef));
  };
  // a season that ends (or starts) with the page open: the theme follows within a minute
  setInterval(() => {
    const next = activeTheme(themeMode);
    if (next !== theme) switchTheme(next);
  }, 60_000);
  const loadFestival = async () => {
    const f = theme?.festival;
    festival = null;
    if (!f || app.parkDef.key !== f.park) return;
    try {
      const res = await fetch(`${BASE}parks/${f.park}/${f.file}`);
      const program = res.ok ? await res.json() : null;
      // an old year's program never shows: only until its last day
      if (program && program.days.at(-1) >= parkDate()) festival = { info: f, program, places: f.places[f.park] ?? {} };
    } catch {
      // offline: the theme shows without its program
    }
  };
  const phone = matchMedia(MOBILE);
  let sidebarOpen = !debug.nosidebar;

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
    if (mode === 'preview')
      app.setInset(phone.matches ? 0 : directions.panel.offsetWidth + 12, phone.matches ? directions.sheetHeight() : 0);
    else if (mode === 'active') app.setInset(0, 0);
    else syncInset();
  };
  navigation = new Navigation(app, directions, { lang, onLayout: onNavLayout });
  app.onDirections = (poi) => navigation.directions(poi);

  const syncInset = () => {
    if (!sidebar) {
      // the phone sheet is modal: the map keeps its full-screen framing
      topbar.setListOpen(activities.isOpen);
      app.setInset(0);
      return;
    }
    const open = !sidebar.el.classList.contains('collapsed');
    sidebarOpen = open;
    topbar.setListOpen(open);
    app.setInset(open ? sidebar.el.offsetWidth + 12 : 0);
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
      onMenu: () => (activities ? activities.open() : sidebar.toggle()),
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
      themeMode,
      onTheme: (mode) => {
        themeMode = mode;
        writePreference('theme', mode);
        switchTheme(activeTheme(mode));
      },
    });
    document.title = `${t(current.labelKey)} 3D`;
    sidebar?.el.remove();
    activities?.remove();
    chips?.remove();
    sidebar = activities = chips = null;
    festivalMarkers?.dispose();
    festivalMarkers = null;
    app.focusRoute(null);
    let festivalPanel = null;
    if (festival) {
      const { program, places, info } = festival;
      festivalMarkers = createFestivalMarkers(app.stage.scene, {
        program,
        places,
        lang,
        t,
        heightAt: app.world.heightAt,
        onChange: () => (app.labelsDirty = true),
      });
      festivalPanel = createFestivalPanel({
        program,
        places,
        name: info.name,
        lang,
        t,
        // a session: its place's card on the map
        onPlace: (place, at, day) => {
          app.select(null);
          festivalMarkers.setDay(day);
          festivalMarkers.focus(place);
          festivalShown = true;
          chips?.setFestival(true);
          app.focusPoint(at.x, at.z);
        },
        onDay: (day) => festivalMarkers.setDay(day),
      });
      festivalMarkers.setDay(festivalPanel.day);
      festivalMarkers.show(festivalShown);
    }
    const common = {
      park: app.park,
      lang,
      t,
      onSelect: (poi) => app.select(poi),
      onDirections: (poi) => navigation.directions(poi),
      onAbout: () => disclaimer.open({ force: true }),
    };
    if (phone.matches) {
      activities = createActivitiesSheet(root, { ...common, festival: festivalPanel, onToggle: (open) => topbar.setListOpen(open) });
      chips = createPoiChips(root, {
        park: app.park,
        lang,
        t,
        onFilter: (filter) => app.applyFilter(filter),
        onRoutes: (slugs) => app.focusRoutes(slugs),
        onFrame: (bounds) => app.frameArea(bounds),
        festival: festivalPanel && {
          count: sessionsOn(festival.program, festivalPanel.day).length,
          on: festivalShown,
          bounds: festivalMarkers.bounds(),
          onToggle: (on) => {
            festivalShown = on;
            festivalMarkers.show(on);
          },
        },
      });
    } else {
      sidebar = createSidebar(root, {
        ...common,
        festival: festivalPanel,
        onFilter: (filter) => app.applyFilter(filter),
        onFocusRoute: (slug) => app.focusRoute(slug),
      });
      // on desktop the map is centered in the area next to the sidebar
      sidebar.toggle(sidebarOpen);
      new MutationObserver(syncInset).observe(sidebar.el, { attributes: true, attributeFilter: ['class'] });
    }
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
    loadFestival().then(() => buildChrome(def));
  };
  window.addEventListener('popstate', async () => {
    const route = parseRoute();
    if (route.park === app.parkDef.key && route.lang === lang) return;
    fromHistory = true;
    await navigateOrFocus(route.park, route.lang);
    fromHistory = false;
  });
  await loadFestival();
  buildChrome(parkDef);
  phone.addEventListener('change', () => buildChrome(app.parkDef));

  createToolbar(root, app, t);
  createAttribution(root, lang);
  if (debug.stats) createStatsOverlay(root, app);

  app.start({ frames: debug.still ? 4 : Infinity });
  loading.done();
  // unofficial-site notice, once per device (not over screenshots)
  if (!debug.still) disclaimer.open();
  window.__app = app; // handy for debugging from the console
  window.__nav = navigation;
}

boot();
