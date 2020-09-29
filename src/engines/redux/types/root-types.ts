// import { rootReducer } from "../../../reducers";
import * as actionss from "../actions";
// import { actionss } from "../actions";
import { rootReducer } from "../reducers";



export type ReduxStates = ReturnType<typeof rootReducer>;
export type ReduxActions = typeof actionss;

export type dRedux = ReduxActions & ReduxStates;

//* NOTE deprecate due to dRedux returns any type
// export type dRedux = ConnectedProps<typeof connector>;
