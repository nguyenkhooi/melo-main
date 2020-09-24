import rootReducer from "../../../reducers";
import { actionss } from "../../../actions";

export type ReduxStates = ReturnType<typeof rootReducer>;
export type ReduxActions = typeof actionss;
