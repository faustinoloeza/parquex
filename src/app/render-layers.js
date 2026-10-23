// three.js render layers used by the Stage's render passes.
export const RENDER_LAYER = {
  /** everything (main pass) */
  DEFAULT: 0,
  /** solid buildings: their depth is redrawn before the route lines */
  OCCLUDERS: 1,
  /** route lines, drawn last and depth-tested against the occluders only */
  ROUTES: 2,
};
