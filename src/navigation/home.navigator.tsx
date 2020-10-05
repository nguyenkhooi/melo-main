import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IconPrimr } from "assets";
import R from "ramda";
import React from "react";
import { ViewStyle } from "react-native";
import {
  SearchScreen,
  SettingsScreen,
  TestScreen,
  TracksScreen,
} from "screens";
import { withTheme } from "styled-components/native";
import { getBottomSpace, KeyOf } from "utils";
import TopMaterialTabNav from "./libraries.navigator";

const stackOptions = {
  // "test-scr": { component: TestScreen },
  "tracks-scr": { component: TracksScreen },
  "search-scr": { component: SearchScreen },
  "libraries-scr": { component: TopMaterialTabNav },
  "settings-scr": { component: SettingsScreen },
};

const SCR_KEYS = R.keys(stackOptions);
const BottomTabs = createBottomTabNavigator<typeof stackOptions>();
export type enum_HomeBottomTab = KeyOf<typeof stackOptions>;

function HomeBottomTab(props) {
  const { foreground, contrastTrans, elevatedBG } = props.theme;
  const tabBarOptions = {
    showLabel: false,
    activeTintColor: foreground,
    inactiveTintColor: `${contrastTrans}0.7)`,
    activeBackgroundColor: elevatedBG,
    inactiveBackgroundColor: elevatedBG,
    style: {
      height: getBottomSpace("safe") + 48,
      borderTopWidth: 0,
      backgroundColor: elevatedBG,
    } as ViewStyle,
    allowFontScaling: false,
  };

  function iconProvider(route: enum_HomeBottomTab) {
    return ({ focused, color }) => {
      switch (route) {
        case "test-scr":
          return (
            <IconPrimr
              preset={`safe`}
              name={"placeholder"}
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "tracks-scr":
          return (
            <IconPrimr
              preset={`safe`}
              name={"music"}
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "search-scr":
          return (
            <IconPrimr
              preset={`safe`}
              name={"search"}
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "libraries-scr":
          return (
            <IconPrimr
              preset={`safe`}
              name={"archive"}
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "settings-scr":
          return (
            <IconPrimr
              preset={`safe`}
              name={"cog"}
              size={focused ? 24 : 21}
              color={color}
            />
          );
      }
    };
  }

  return (
    <BottomTabs.Navigator
      initialRouteName="tracks-scr"
      // initialRouteName="test-scr"
      backBehavior="initialRoute"
      tabBarOptions={tabBarOptions}
      lazy={false}
    >
      {SCR_KEYS.map((scr) => (
        <BottomTabs.Screen
          name={scr}
          {...stackOptions[scr]}
          options={{
            tabBarIcon: iconProvider(scr),
          }}
        />
      ))}
    </BottomTabs.Navigator>
  );
}

export default withTheme(HomeBottomTab);
