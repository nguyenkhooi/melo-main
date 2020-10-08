import { enum_LibrariesTopTab } from "navigation/libraries.navigator";

export const add_folders_to_skip = "add_folders_to_skip";
export const set_theme = "set_theme";
export const set_top_tabs = "set_top_tabs";

type folderName = string;

export interface SkipFoldersAction {
  type: typeof add_folders_to_skip;
  payload: folderName[];
}

export interface SetThemeAction {
  type: typeof set_theme;
  payload: "dark" | "light";
}

export interface SetTopTabsAction {
  type: typeof set_top_tabs;
  payload: enum_LibrariesTopTab[];
}

/** ---------------------------------------------------- */
export interface dSettingsState {
  /**
   * Folders to not load in the app
   */
  foldersToSkip: folderName[];
  /**
   * What theme is it?
   */
  theme: "dark" | "light";
  /**
   * List of top tab
   */
  topTabs: enum_LibrariesTopTab[];
}

export type dSettingsActions =
  | SkipFoldersAction
  | SetThemeAction
  | SetTopTabsAction;
