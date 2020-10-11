//@ts-check
import {
  canExit,
  navigationRef,
  RootNavigator,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence
} from "navigation";
import React, { useEffect, useState } from "react";
import { YellowBox } from "react-native";
import Toasty from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { setupPlayer } from "services";
import { persistor, store } from "store";
import SplashScreen from "./src/screens/SplashScreen";
// import { Toasty } from "components";

export default function App() {
  const [timePassed, setTimePassed] = useState(false);

  useEffect(() => {
    setTimeout(() => setTimePassed(true), 2750);
    store.dispatch({ type: "set_playback", payload: false }); // To make sure currentTrack is paused at startup
    store.dispatch({ type: "set_loading", payload: true });
    // store.dispatch(setShuffle(false)); // Tempor disable shuffle at startup since getMedia() will return `indexedTracks`
    setupPlayer();
    // if (Text.defaultProps == null) Text.defaultProps = {};
    // Text.defaultProps.allowFontScaling = false;
    console.disableYellowBox = true;
  });

  setRootNavigation(navigationRef);
  useBackButtonHandler(navigationRef, canExit);
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence();

  function renderApp(isReady) {
    if (isReady && timePassed) {
      return (
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      );
    }
    return <SplashScreen isMediaReady={(b) => setTimePassed(b)} />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{renderApp}</PersistGate>
      <Toasty ref={(ref) => Toasty.setRef(ref)} />
    </Provider>
  );
}

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated fn
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Story with id",
  "Require cycle",
]);
console.disableYellowBox = true;
