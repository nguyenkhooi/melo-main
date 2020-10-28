//@ts-check
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { Kitt, PlayerFooter } from "components";
// import PlayerFooter from "components/PlayerFooter";
import { AppProvider, connector, THEME } from "engines";
import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import * as themes from "themes";
import { evaConfig, evaDark, evaLight } from "utils";
import { navigationRef } from "./navigation-service";
import PrimaryStack from "./primary.navigator";

/**
 * Most of the HOC is put here to reduce the codeload for App.tsx
 */
export const RootNavigator = connector((props) => {
  const {
    settings: { theme },
    setTheme,
  } = props;
  const color =
    theme === THEME.LIGHT ? themes.light.background : themes.dark.background;
  const statusBarContent = `${
    theme === THEME.LIGHT ? "dark" : "light"
  }-content`;
  const wrapperColor = {
    colors: {
      background: color,
      // primary: string; background: string; card: string; text: string; border: string; notification: string;
    },
    dark: theme === THEME.DARK,
  };

  return (
    <NavigationContainer ref={navigationRef} theme={wrapperColor}>
      <AppProvider theme={theme} setTheme={setTheme}>
        <Kitt.ApplicationProvider
          {...eva}
          theme={theme === THEME.LIGHT ? evaLight : evaDark}
          customMapping={evaConfig}
        >
          <ThemeProvider
            theme={theme === THEME.LIGHT ? themes.light : themes.dark}
          >
            <StatusBar
              barStyle={statusBarContent}
              backgroundColor={color}
              animated
            />
            <PrimaryStack />
            <PlayerFooter ref={(r) => PlayerFooter.setRef(r)} />
          </ThemeProvider>
        </Kitt.ApplicationProvider>
      </AppProvider>
    </NavigationContainer>
  );
});
