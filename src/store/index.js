//@ts-check
// import reducers from "engines/redux/reducers";
import { AsyncStorage } from "react-native";
import { applyMiddleware, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import reducers from "../reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["footer", "player", "search-scr"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
