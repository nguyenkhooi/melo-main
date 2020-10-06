export const show_footer = "show_footer";
export const hide_footer = "hide_footer";

export const toggle_footer = "toggle_footer";

export interface ToggleFooterAction {
  type: typeof toggle_footer;
  payload: boolean;
}

/** ---------------------------------------------------- */
export interface dConfigState {
  /**
   * Is footer visible?
   */
  footerVisible: boolean;
}

export type dConfigActions = ToggleFooterAction;
