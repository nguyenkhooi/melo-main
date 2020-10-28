import { THEME } from "engines";
import { evaDark, evaLight } from "utils";

export const light = {
  foreground: evaLight["color-primary-500"],
  foreground2: evaLight["color-primary-500"],
  elevatedBG: evaLight["color-basic-300"],
  contrast: evaLight["color-basic-700"],
  contrastTrans: evaLight["color-basic-transparent-600"],
  fgTrans: evaLight["color-primary-transparent-500"],
  bgTrans: evaLight["color-basic-transparent-100"],
  current: THEME.LIGHT,
  /**
   * The colors is available to use, but prefer using the name.
   */
  ...evaLight,
  hichPurple: evaLight["color-secondary-500"],
  maturePurple: evaLight["color-secondary-800"],
  grey900: evaLight["color-basic-900"],
  grey600: evaLight["color-basic-600"],
  grey500: evaLight["color-basic-500"],
  pitchWhite: evaLight["color-basic-100"],
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The main tinting colors.
   */
  primary: evaLight["color-primary-500"],
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: evaLight["color-primary-700"],
  /**
   * The sceondary tinting colors.
   */
  accent: evaLight["color-info-500"],
  /**
   * The secondary tinting colors, but darker.
   */
  accentDarker: evaLight["color-info-700"],
  /**
   * The screen background.
   */
  background: evaLight["color-basic-100"],
  /**
   * The `dark` screen background.
   */
  background01: evaLight["color-basic-1000"],
  /**
   * The screen surface. Usually used for modal screen
   */
  surface: evaLight["color-basic-300"],
  /**
   * The `dark` screen surface.
   */
  surface01: evaLight["color-basic-800"],
  /**
   * A subtle color used for borders and lines.
   */
  line: evaLight["color-basic-400"],
  /**
   * The default color of text in many components.
   */
  text: evaLight["color-basic-1100"],
  /**
   * The '01' color of text in many dark-background components.
   */
  text01: evaLight["color-basic-300"],
  /**
   * Secondary information.
   */
  dim: evaLight["color-basic-500"],
  /**
   * Error messages and icons.
   */
  errorRed: evaDark["color-danger-500"],
  /**
   * Warning color
   */
  hazardYellow: evaDark["color-warning-500"],
  /**
   * Info color
   */
  infoBlue: evaDark["color-info-500"],
  /**
   * Success color
   */
  awakenVolt: evaDark["color-success-400"],

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is colors.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: evaLight["color-basic-1000"],

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: evaLight["color-basic-1000"],
};

export type dTheme = typeof light;
