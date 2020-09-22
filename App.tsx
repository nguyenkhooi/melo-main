//@ts-check
import { RootStore, RootStoreProvider, setupRootStore } from "engines";
import RootNavigator, {
  canExit,
  navigationRef,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence
} from "navigation";
import React, { useEffect, useState } from "react";
import Toasty from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import SplashScreen from "./src/screens/SplashScreen";
// import { Toasty } from "components";

export default function App() {
  const [timePassed, setTimePassed] = useState(false);
  const [rootStore, setRootStore] = React.useState<RootStore | undefined>(undefined) // prettier-ignore
  const [_netInfo, setNetInfo] = React.useState(null);
  // const [_frbsAuthe, setFRBSAuthe] = React.useState<FirebaseAuthTypes.User>(
  //   null
  // );
  const [appShown, showApp] = React.useState(false);

  useEffect(() => {
    setupRootStore().then(async (result) => {
      setRootStore(result);
      setTimeout(() => setTimePassed(true), 750);
    });
    store.dispatch({ type: "set_playback", payload: false }); // To make sure currentTrack is paused at startup
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
    return <SplashScreen />;
  }

  return (
    <RootStoreProvider value={rootStore}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>{renderApp}</PersistGate>
        <Toasty ref={(ref) => Toasty.setRef(ref)} />
      </Provider>
    </RootStoreProvider>
  );
}
