//@ts-check
import { connect, ConnectedProps } from "react-redux";
// import { actions } from "./actions";
import * as actionsCreator from "./actions";
import { ReduxStates } from "./types";
const mapState = (state: ReduxStates) => state;

/**
 * Actions Creator of redux
 */
export const actions = actionsCreator;
/**
 * An HOC extending redux `connect()` with standard `states` and `actions`
 * for predictable, universal `props` imports
 */
export const connector = connect(mapState, actions);
export type ReduxPRops = ConnectedProps<typeof connector>;
