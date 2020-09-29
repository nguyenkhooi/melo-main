//@ts-check
import { connect, ConnectedProps } from "react-redux";
// import { actionss } from "./actions";
import * as actions from "./actions";
import { ReduxStates } from "./types";

/**
 * State Map of redux
 * @param state
 */
const mapState = (state: ReduxStates) => state;

/**
 * Actions Dispatch of redux
 */
const mapDispatch = {
  ...actions,
};

/**
 * An HOC extending redux `connect()` with standard `states` and `actions`
 * for predictable, universal `props` imports
 */
export const connector = connect(mapState, mapDispatch);
export type ReduxPRops = ConnectedProps<typeof connector>;
