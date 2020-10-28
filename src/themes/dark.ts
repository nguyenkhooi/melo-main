import { THEME } from "engines";
import { dTheme } from "themes";
import { evaDark } from "utils";

export const dark: dTheme = {
  foreground: evaDark["color-primary-500"],
  foreground2: evaDark["color-basic-300"],
  elevatedBG: evaDark["color-basic-800"],
  contrast: evaDark["color-basic-300"],
  contrastTrans: evaDark["color-basic-transparent-600"],
  fgTrans: evaDark["color-primary-transparent-500"],
  bgTrans: "rgba(18, 18, 18, ",
  current: THEME.DARK,
  /**
   * The colors is available to use, but prefer using the name.
   */
  ...evaDark,
  hichPurple: evaDark["color-secondary-400"],
  maturePurple: evaDark["color-secondary-700"],
  grey900: evaDark["color-basic-900"],
  grey600: evaDark["color-basic-600"],
  grey500: evaDark["color-basic-500"],
  pitchWhite: evaDark["color-basic-100"],
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The main tinting colors.
   */
  primary: evaDark["color-primary-500"],
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: evaDark["color-primary-700"],
  /**
   * The sceondary tinting colors.
   */
  accent: evaDark["color-info-500"],
  /**
   * The secondary tinting colors, but darker.
   */
  accentDarker: evaDark["color-info-700"],
  /**
   * The screen background.
   */
  background: evaDark["color-basic-1100"],
  /**
   * The `dark` screen background.
   */
  background01: evaDark["color-basic-1100"],
  /**
   * The screen surface. Usually used for modal screen
   */
  surface: evaDark["color-basic-900"],
  /**
   * The `dark` screen surface.
   */
  surface01: evaDark["color-basic-900"],
  /**
   * A subtle color used for borders and lines.
   */
  line: evaDark["color-basic-800"],
  /**
   * The default color of text in many components.
   */
  text: evaDark["color-basic-100"],
  /**
   * The '01' color of text in many dark-background components.
   */
  text01: evaDark["color-basic-100"],
  /**
   * Secondary information.
   */
  dim: evaDark["color-basic-700"],
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
  storybookDarkBg: evaDark["color-basic-1000"],

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: evaDark["color-basic-1000"],
};
