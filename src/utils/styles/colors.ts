import { evaDark } from "./eva-dark";
import { evaLight } from "./eva-light";

export const light = {
  foreground: evaLight["color-primary-500"],
  foreground2: evaLight["color-primary-500"],
  background: evaLight["color-basic-200"],
  elevatedBG: evaLight["color-basic-300"],
  contrast: evaLight["color-basic-700"],
  contrastTrans: evaLight["color-basic-transparent-600"],
  fgTrans: "rgba(63, 81, 181, ",
  bgTrans: evaLight["color-basic-transparent-100"],
  success: evaLight["color-success-500"],
  warning: evaLight["color-warning-500"],
  danger: evaLight["color-danger-500"],
  current: "light",
};

export const dark = {
  foreground: evaDark["color-primary-500"],
  foreground2: evaDark["color-basic-300"],
  background: evaDark["color-basic-1000"],
  elevatedBG: evaDark["color-basic-800"],
  contrast: evaDark["color-basic-300"],
  contrastTrans: evaDark["color-basic-transparent-600"],
  fgTrans: "rgba(30, 215, 96, ",
  bgTrans: "rgba(18, 18, 18, ",
  success: evaDark["color-success-500"],
  warning: evaDark["color-warning-500"],
  danger: evaDark["color-danger-500"],
  current: "dark",
};

/**
 * Roles for colors. Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner colors.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const colors = light;
