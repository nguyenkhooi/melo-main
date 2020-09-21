import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "components";
import R from "ramda";
import React from "react";
import { ViewStyle } from "react-native";
import { SearchScreen, SettingsScreen, TracksScreen } from "screens";
import { withTheme } from "styled-components/native";
import { KeyOf } from "utils";
import TopMaterialTabNav from "./libraries.navigator";

const stackOptions = {
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
      borderTopWidth: 0,
      backgroundColor: elevatedBG,
    } as ViewStyle,
    allowFontScaling: false,
  };

  function iconProvider(route: enum_HomeBottomTab) {
    return ({ focused, color }) => {
      switch (route) {
        case "tracks-scr":
          return (
            <Icon
              name="music"
              type="fa5"
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "search-scr":
          return (
            <Icon
              name="search"
              type="fa5"
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "libraries-scr":
          return (
            <Icon
              name="archive"
              type="fa5"
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "settings-scr":
          return (
            <Icon
              name="cog"
              type="fa5"
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
