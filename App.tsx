//@ts-check
import { NavigationContainerRef } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Toasty from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import SplashScreen from "./src/screens/SplashScreen";
import RootNavigator, {
  canExit,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from "navigation";
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

  // @ts-ignore
  const navigationRef = React.useRef<NavigationContainerRef>();

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
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{renderApp}</PersistGate>
      <Toasty ref={(ref) => Toasty.setRef(ref)} />
    </Provider>
  );
}
