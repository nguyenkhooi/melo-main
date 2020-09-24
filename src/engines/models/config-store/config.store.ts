// @ts-check

import { Instance, SnapshotIn, types } from "mobx-state-tree";

export function ConfigModel() {
  return types.model("Config Model", {
    g_theme: types.maybeNull(types.enumeration(["themeLight", "themeDark"])),
    /** Is player footer shown? */
    g_isFooterShown: types.maybeNull(types.boolean),
  });
}

function FooterActions() {
  return ConfigModel().actions((self) => ({
    g_toggleFooter(shown: boolean) {
      self.g_isFooterShown = shown;
    },
  }));
}

export function ConfigStore() {
  return types.compose(FooterActions(), types.model({}));
}
