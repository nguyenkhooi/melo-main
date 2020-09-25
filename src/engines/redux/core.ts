//@ts-check
import { connect } from "react-redux";
// import { actions } from "./actions";
import * as actionsCreator from "./actions";
const mapState = (state) => state;

export const actions = actionsCreator;
/**
 * An HOC extending redux `connect()` with standard `states` and `actions`
 * for predictable, universal `props` imports
 */
export const connector = connect(mapState, actionsCreator);
