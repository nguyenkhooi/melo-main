import { dConfigActions, dConfigState } from "../types";

const INITIAL_STATE: dConfigState = { footerVisible: true };

export function footer(
  state: dConfigState = INITIAL_STATE,
  action: dConfigActions
) {
  switch (action.type) {
    case "toggle_footer":
      return { ...state, footerVisible: action.payload };
    default:
      return state;
  }
}
