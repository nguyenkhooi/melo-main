//@ts-check
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { Kitt, PlayerFooter } from "components";
// import PlayerFooter from "components/PlayerFooter";
import { connector } from "engines";
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
      <Kitt.ApplicationProvider
        {...eva}
        theme={theme === "light" ? evaLight : evaDark}
        customMapping={evaConfig}
      >
        <ThemeProvider theme={themes[theme]}>
          <StatusBar
            barStyle={statusBarContent}
            backgroundColor={color}
            animated
          />
          <PrimaryStack />
          <PlayerFooter ref={(r) => PlayerFooter.setRef(r)} />
        </ThemeProvider>
      </Kitt.ApplicationProvider>
    </NavigationContainer>
  );
});
