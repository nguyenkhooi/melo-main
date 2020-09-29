// import { rootReducer } from "../../../reducers";
import * as actions from "../actions";
// import { actionss } from "../actions";
import { rootReducer } from "../reducers";

export type ReduxStates = ReturnType<typeof rootReducer>;
export type ReduxActions = typeof actions;

export type dRedux = ReduxActions & ReduxStates;

//* NOTE deprecate due to dRedux returns any type
// export type dRedux = ConnectedProps<typeof connector>;
