//@ts-check
import { connect } from "react-redux";
import { actionss } from "./actions";

const mapState = (state) => state;

/**
 * An HOC extending redux `connect()` with standard `states` and `actions`
 * for predictable, universal `props` imports
 */
export const connector = connect(mapState, actionss);
