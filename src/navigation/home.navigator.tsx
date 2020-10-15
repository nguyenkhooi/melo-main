import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs";
import { IconPrimr } from "assets";
import R from "ramda";
import React from "react";
import { ViewStyle } from "react-native";
import { SearchScreen, SettingsScreen, TracksScreen } from "screens";
import { withTheme } from "styled-components/native";
import { backgroundColor } from "themes";
import { getStatusBarHeight, KeyOf, scale } from "utils";
import TopMaterialTabNav from "./libraries.navigator";
// import AnimatedTabBar, {
//   TabsConfig,
//   FlashyTabBarItemConfig,
// } from "@gorhom/animated-tabbar";

const stackOptions = {
  // "test-scr": { component: TestScreen },
  "tracks-scr": { component: TracksScreen, options: { title: "Your Melo" } },
  "search-scr": { component: SearchScreen, options: { title: "Search" } },
  "libraries-scr": {
    component: TopMaterialTabNav,
    options: { title: "Libraries" },
  },
  "settings-scr": { component: SettingsScreen, options: { title: "Settings" } },
};

// const tabs: TabsConfig<FlashyTabBarItemConfig> = {
//   "tracks-scr": {
//     labelStyle: {
//       color: "#5B37B7",
//     },
//     icon: {
//       component: (
//         <IconPrimr
//           preset={"default"}
//           name={"placeholder"}
//           size={17}
//           color={"white"}
//         />
//       ),
//       color: "dodgerblue",
//     },
//   },
//   "search-scr": {
//     labelStyle: {
//       color: "#1194AA",
//     },
//     icon: {
//       component: (
//         <IconPrimr
//           preset={"default"}
//           name={"placeholder"}
//           size={17}
//           color={"white"}
//         />
//       ),
//       color: "dodgerblue",
//     },
//   },
// };

const SCR_KEYS = R.keys(stackOptions);
// const BottomTabs = createBottomTabNavigator<typeof stackOptions>();
const TopTabs = createMaterialTopTabNavigator<typeof stackOptions>();
export type enum_HomeBottomTab = KeyOf<typeof stackOptions>;

function HomeBottomTab(props) {
  const { foreground, contrastTrans, elevatedBG } = props.theme;
  const tabBarOptions: MaterialTopTabBarOptions = {
    showLabel: false,
    showIcon: true,
    iconStyle: {
      width: scale(30),
      height: scale(30),
      justifyContent: "center",
      alignItems: "center",
    },
    activeTintColor: foreground,
    inactiveTintColor: `${contrastTrans}0.7)`,

    style: {
      // height: 48,
      borderTopWidth: 0,
      backgroundColor: backgroundColor(props),
      paddingTop: getStatusBarHeight("safe", "ios-only"),
    } as ViewStyle,
    allowFontScaling: false,
  };

  function iconProvider(route: enum_HomeBottomTab) {
    return ({ focused, color }) => {
      switch (route) {
        case "test-scr":
          return (
            <IconPrimr
              preset={"default"}
              name={"placeholder"}
              size={focused ? scale(24) : scale(22)}
              color={color}
            />
          );
        case "tracks-scr":
          return (
            <IconPrimr
              preset={"default"}
              name={"music"}
              size={focused ? scale(24) : scale(22)}
              color={color}
            />
          );
        case "search-scr":
          return (
            <IconPrimr
              preset={"default"}
              name={"search"}
              size={focused ? scale(24) : scale(22)}
              color={color}
            />
          );
        case "libraries-scr":
          return (
            <IconPrimr
              preset={"default"}
              name={"archive"}
              size={focused ? scale(24) : scale(22)}
              color={color}
            />
          );
        case "settings-scr":
          return (
            <IconPrimr
              preset={"default"}
              name={"cog"}
              size={focused ? scale(24) : scale(22)}
              color={color}
            />
          );
      }
    };
  }

  return (
    <TopTabs.Navigator
      initialRouteName="tracks-scr"
      // initialRouteName="test-scr"
      backBehavior="initialRoute"
      tabBarOptions={tabBarOptions}
      lazy={false}
      // tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} />}
    >
      {SCR_KEYS.map((scr) => (
        <TopTabs.Screen
          name={scr}
          {...stackOptions[scr]}
          options={{
            ...stackOptions[scr].options,
            tabBarIcon: iconProvider(scr),
          }}
        />
      ))}
    </TopTabs.Navigator>
  );
}

export default withTheme(HomeBottomTab);
