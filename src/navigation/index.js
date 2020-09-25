//@ts-check
import { NavigationContainer } from "@react-navigation/native";
import PlayerFooter from "components/PlayerFooter";
import { connector } from "engines";
import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import * as themes from "themes";
import { navigationRef } from "./navigation-service";
import PrimaryStack from "./primary.navigator";

function RootNavigator(props) {
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
    <NavigationContainer ref={navigationRef} theme={wrapperColor}>
      <ThemeProvider theme={themes[theme]}>
        <StatusBar
          barStyle={statusBarContent}
          backgroundColor={color}
          animated
        />
        <PrimaryStack />
        <PlayerFooter />
      </ThemeProvider>
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    theme: state.settings.theme,
  };
}

export default connector(RootNavigator);
/**
 * NOTE Currently deprecate due to useless "out-of-context" use for Navigation()
 */
export * from "./navigation-service";
export { default as AppNavigation } from "./root.navigator";

