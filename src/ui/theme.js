// Shows the seasonal theme on the page (src/themes): html[data-theme] turns on
// its stylesheet (src/styles/themes/<key>.css); the map side (night look,
// decoration) goes through MapApp.setTheme().

/** @param {import('../themes/index.js').Theme | null} theme  null: the classic look */
export function applyTheme(theme) {
  const html = document.documentElement;
  if (theme) html.dataset.theme = theme.key;
  else delete html.dataset.theme;
}
