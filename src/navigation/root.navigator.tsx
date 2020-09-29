//@ts-check
import {
  NavigationContainer,
  NavigationContainerRef
} from "@react-navigation/native";
import { PlayerFooter } from "components";
// import PlayerFooter from "components/PlayerFooter";
import { connector, dRedux } from "engines";
import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import * as themes from "themes";
import PrimaryStack from "./primary.navigator";

function mapStateToProps(state) {
  return {
    theme: state.settings.theme,
  };
}

/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
export const RootNavigator = React.forwardRef<
  NavigationContainerRef & dRedux,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  const {
    settings: { theme },
  } = props;
  const color = themes[theme].background;
  const statusBarContent = `${theme === "light" ? "dark" : "light"}-content`;
  const wrapperColor = {
    colors: {
      background: color,
    },
  };
  return (
    <NavigationContainer
      ref={ref}
      // {...props}
      onStateChange={props.onStateChange}
      initialState={props.initialState}
      theme={wrapperColor}
    >
      <ThemeProvider theme={themes[theme]}>
        <StatusBar
          barStyle={statusBarContent}
          backgroundColor={color}
          animated
        />
        <PrimaryStack />
        <PlayerFooter navigationRef={ref} />
      </ThemeProvider>
    </NavigationContainer>
  );
});

RootNavigator.displayName = "RootNavigator";

export default connector(RootNavigator);
