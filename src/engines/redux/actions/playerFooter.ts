import { Dispatch } from "redux";
import { ToggleFooterAction } from "../types";

/**
 * @deprecated
 */
export const showFooter = () => {
  return { type: "show_footer" };
};

/**
 * @deprecated
 */
export const hideFooter = () => {
  return { type: "hide_footer" };
};

export const toggleFooter = (
  type: "show" | "hide",
  callback?: () => void
) => async (dispatch: Dispatch<ToggleFooterAction>) => {
  await dispatch({
    type: "toggle_footer",
    payload: type == "show" ? true : false,
  });
  !!callback && callback();
};
