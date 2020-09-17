//@ts-check
import { Toast } from "components";
import RootNavigator from "navigation";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import SplashScreen from "./src/screens/SplashScreen";
// import { Toasty } from "components";

export default function App() {
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    setTimeout(() => setTimePassed(true), 750);
    store.dispatch({ type: "set_playback", payload: false }); // To make sure currentTrack is paused at startup
    // if (Text.defaultProps == null) Text.defaultProps = {};
    // Text.defaultProps.allowFontScaling = false;
    console.disableYellowBox = true;
  });

  function renderApp(isReady) {
    if (isReady && timePassed) {
      return <RootNavigator />;
    }
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{renderApp}</PersistGate>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}
