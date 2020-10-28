import { THEME } from "engines/providers";
import { enum_LibrariesTopTab } from "navigation/libraries.navigator";

export const setSkipFolders = (folders) => {
  if (folders) {
    let folderArray = folders.split(",").map((val) => val.toLowerCase().trim());
    return { type: "add_folders_to_skip", payload: folderArray };
  }
  return { type: "add_folders_to_skip", payload: [] };
};

export const setTheme = (theme: THEME) => {
  return { type: "set_theme", payload: theme };
};

export const setTopTabs = (tabs: enum_LibrariesTopTab[]) => {
  return { type: "set_top_tabs", payload: tabs };
};
