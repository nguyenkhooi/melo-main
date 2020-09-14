import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { withTheme } from "styled-components/native";
import TopMaterialTabNav from "./TopMaterialTabNav";
import { Icon } from "components";
import { ViewStyle } from "react-native";

import { SearchScreen, SettingsScreen, TracksScreen } from "screens";

function BottomTabNav(props) {
  const BottomTabs = createBottomTabNavigator();
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

  function iconProvider(route) {
    return ({ focused, color }) => {
      switch (route) {
        case "Tracks":
          return (
            <Icon
              name="music"
              type="fa5"
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "Search":
          return (
            <Icon
              name="search"
              type="fa5"
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "Library":
          return (
            <Icon
              name="archive"
              type="fa5"
              size={focused ? 24 : 21}
              color={color}
            />
          );
        case "Settings":
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
      initialRouteName="Tracks"
      backBehavior="initialRoute"
      tabBarOptions={tabBarOptions}
      lazy={false}
    >
      <BottomTabs.Screen
        name="Tracks"
        component={TracksScreen}
        options={{
          tabBarIcon: iconProvider("Tracks"),
        }}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarIcon: iconProvider("Search") }}
      />
      <BottomTabs.Screen
        name="Library"
        component={TopMaterialTabNav}
        options={{ tabBarIcon: iconProvider("Library") }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: iconProvider("Settings") }}
      />
    </BottomTabs.Navigator>
  );
}

export default withTheme(BottomTabNav);
