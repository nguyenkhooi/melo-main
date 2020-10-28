/* eslint-disable @typescript-eslint/interface-name-prefix */
import { C, ValueOf } from "utils";

export type dColors = typeof C;
export type PALETTE = ValueOf<dColors>;

/**
 * List of theme index
 *
 */
export enum THEME {
  LIGHT = "themeLight",
  DARK = "themeDark",
}

export type dFontFamily =
  | "Montserrat-Bold"
  | "Roboto_medium"
  | "Roboto"
  | "System";
