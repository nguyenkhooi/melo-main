import { ConnectedProps } from "react-redux";

import rootReducer from "../../../reducers";
import { actionss } from "../../../actions";
import { connector } from "../core";

export type ReduxStates = ReturnType<typeof rootReducer>;
export type ReduxActions = typeof actionss;

export type dRedux = ReduxActions & ReduxStates;

//* NOTE deprecate due to dRedux returns any type
// export type dRedux = ConnectedProps<typeof connector>;
