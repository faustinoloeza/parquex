// Entry point: reads the URL, loads the park's 3D map and wires the UI to it.
import './styles/index.css';
import { MapApp } from './app/MapApp.js';
import { BASE, parseRoute, routeUrl, debugFlags } from './app/routing.js';
import { readPreference, writePreference } from './app/preferences.js';
import { TIME_MODES, forcedTimeMode } from './app/time-of-day.js';
import { THEME_MODES, activeTheme, forcedThemeMode } from './themes/index.js';
import { applyTheme } from './ui/theme.js';
import { loadPark } from './parks/catalog.js';
import { RTL, loadLanguage, localized, translator } from './i18n/index.js';
import { createHeader } from './ui/header.js';
import { createSidebar } from './ui/sidebar/index.js';
import { createActivitiesSheet } from './ui/activities-sheet.js';
import { createPoiChips } from './ui/poi-chips.js';
import { parkDate, sessionsOn } from './themes/muertos/festival.js';
import { createToolbar } from './ui/toolbar.js';
import { createAttribution } from './ui/attribution.js';
import { createLoadingScreen } from './ui/loading-screen.js';
import { createDisclaimer } from './ui/disclaimer.js';
import { createStatsOverlay } from './ui/stats-overlay.js';

const MOBILE = '(max-width: 640px)';

async function boot() {
  const { park: parkKey, lang } = parseRoute();
  const canonical = routeUrl(parkKey, lang);
  if (location.pathname !== canonical) history.replaceState(null, '', canonical + location.search);
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL.has(lang) ? 'rtl' : 'ltr';
  const debug = debugFlags();
  // only what this page needs: its park's definition and its language's strings
  const [parkDef] = await Promise.all([loadPark(parkKey), loadLanguage(lang)]);

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
  // a festival's program, fetched once (a failed request is tried again next time)
  const programs = new Map();
  const festivalProgram = ({ park, file }) => {
    const url = `${BASE}parks/${park}/${file}`;
    if (!programs.has(url))
      programs.set(
        url,
        fetch(url)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => {
            programs.delete(url);
            return null;
          }),
      );
    return programs.get(url);
  };
  // the theme's code (its decoration, its page side) and its festival's program
  // download alongside the map, not one after the other once it is built
  if (theme) {
    const ignore = () => {};
    theme.preload?.().catch(ignore);
    import('./ui/theme-ui.js').catch(ignore);
    if (theme.festival?.park === parkKey) festivalProgram(theme.festival);
  }

  let t = translator(lang);
  const loading = createLoadingScreen(root, t, theme?.tagline && localized(theme.tagline, lang));
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
      altarMarkers?.deselect();
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
  // the theme's altars on the map (shown with the festival's places)
  let altarMarkers = null;
  // on phones the festival's chip starts off (its markers, until chosen); on
  // desktop, with no chip, they show from the start
  let festivalShown = !matchMedia(MOBILE).matches;
  // the page side of a theme (festival program, altar markers: ui/theme-ui.js), loaded only while one shows
  let themeUI = null;
  const switchTheme = (next) => {
    theme = next;
    applyTheme(theme);
    Promise.all([app.setTheme(theme), loadFestival()]).then(() => buildChrome(app.parkDef));
  };
  // a season that ends (or starts) with the page open: the theme follows within a minute
  setInterval(() => {
    const next = activeTheme(themeMode);
    if (next !== theme) switchTheme(next);
  }, 60_000);
  const loadFestival = async () => {
    themeUI = theme ? await import('./ui/theme-ui.js') : null;
    const f = theme?.festival;
    festival = null;
    if (!f || app.parkDef.key !== f.park) return;
    // offline: the theme shows without its program
    const program = await festivalProgram(f);
    // an old year's program never shows: only until its last day
    if (program && program.days.at(-1) >= parkDate()) festival = { info: f, program, places: f.places[f.park] ?? {} };
  };
  const phone = matchMedia(MOBILE);
  let sidebarOpen = !debug.nosidebar;

  // walking navigation (app/walking.js): loaded on the first "Go" / "Directions"
  let navigation = null;
  let walking = null;
  const directionsTo = (poi) => {
    walking ??= import('./app/walking.js').then(({ startWalking }) => {
      navigation = startWalking({ root, app, lang, onLayout: onNavLayout });
      window.__nav = navigation; // handy for debugging from the console
      return navigation;
    });
    return walking.then((nav) => nav.directions(poi));
  };
  const onNavLayout = (mode, directions) => {
    const html = document.documentElement;
    html.classList.toggle('gx-nav-preview', mode === 'preview');
    html.classList.toggle('gx-nav-active', mode === 'active');
    // the map is centered in the area the panels leave free
    if (mode === 'preview')
      app.setInset(phone.matches ? 0 : directions.panel.offsetWidth + 12, phone.matches ? directions.sheetHeight() : 0);
    else if (mode === 'active') app.setInset(0, 0);
    else syncInset();
  };
  app.onDirections = directionsTo;

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
    // an open phone sheet stays open (rebuilt once the theme's altars arrive)
    const sheetOpen = !!activities?.isOpen;
    sidebar?.el.remove();
    activities?.remove();
    chips?.remove();
    sidebar = activities = chips = null;
    festivalMarkers?.dispose();
    altarMarkers?.dispose();
    festivalMarkers = altarMarkers = null;
    app.focusRoute(null);
    const altars = app.world.parkLayers.find((l) => l.theme)?.altars ?? [];
    if (altars.length) {
      altarMarkers = themeUI.createAltarMarkers(app.stage.labelRoot, {
        altars,
        lang,
        t,
        heightAt: app.world.heightAt,
        onChange: () => (app.labelsDirty = true),
      });
      // without a festival in this park the altars always show; with it they go with its chip
      altarMarkers.show(!festival || festivalShown);
    }
    const showFestival = (on) => {
      festivalShown = on;
      festivalMarkers.show(on);
      altarMarkers?.show(on);
      chips?.setFestival(on);
    };
    let festivalPanel = null;
    if (festival) {
      const { program, places, info } = festival;
      festivalMarkers = themeUI.createFestivalMarkers(app.stage.labelRoot, {
        program,
        places,
        lang,
        t,
        heightAt: app.world.heightAt,
        onChange: () => (app.labelsDirty = true),
      });
      festivalPanel = themeUI.createFestivalPanel({
        program,
        places,
        name: info.name,
        lang,
        t,
        // a session: its place's card on the map
        onPlace: (place, at, day) => {
          app.select(null);
          showFestival(true);
          festivalMarkers.setDay(day);
          festivalMarkers.focus(place);
          app.focusPoint(at.x, at.z);
        },
        onDay: (day) => festivalMarkers.setDay(day),
        // an altar: its card on the map
        altars: altarMarkers?.list() ?? [],
        onAltar: (i) => {
          app.select(null);
          showFestival(true);
          altarMarkers.focus(i);
          app.focusPoint(altars[i].x, altars[i].z);
        },
      });
      festivalMarkers.setDay(festivalPanel.day);
      festivalMarkers.show(festivalShown);
    }
    const common = {
      park: app.park,
      lang,
      t,
      onSelect: (poi) => app.select(poi),
      onDirections: directionsTo,
      onAbout: () => disclaimer.open({ force: true }),
    };
    if (phone.matches) {
      activities = createActivitiesSheet(root, { ...common, festival: festivalPanel, onToggle: (open) => topbar.setListOpen(open) });
      if (sheetOpen) activities.open();
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
          onToggle: (on) => showFestival(on),
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
      if (await app.focusPark(await loadPark(park))) return;
    }
    navigate(park, language);
  };
  let fromHistory = false; // back / forward: the URL is already the park's
  app.onFocus = (_, def) => {
    if (!fromHistory) history.pushState(null, '', routeUrl(def.key, lang) + location.search);
    // a walk belongs to one park: switching parks cancels it
    navigation?.reset();
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
  // the theme's decoration comes once the map is on screen; its altars then join the markers and the program
  app.addThemeDecoration().then((added) => added && buildChrome(app.parkDef));
  // unofficial-site notice, once per device (not over screenshots)
  if (!debug.still) disclaimer.open();
  window.__app = app; // handy for debugging from the console
}

boot();
