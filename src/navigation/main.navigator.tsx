import {
  createStackNavigator,
  HeaderBackButton,
  TransitionPresets,
} from "@react-navigation/stack";
import { CIRCULAR_BOLD } from "assets";
import R from "ramda";
import React from "react";
import { PlaylistsScreen, TabArrangementScreen } from "screens";
import { withTheme } from "styled-components/native";
import { KeyOf } from "utils";
// import AddToPlaylist from '../screens/AddToPlayList';
import AboutScreen from "../screens/AboutScreen";
import ShowContentScreen from "../screens/ShowContentScreen";
import ShowPlaylistScreen from "../screens/ShowPlaylistScreen";
import HomeBottomTab from "./home.navigator";
import { nConfig } from "./navigation-service";

const stackOptions = {
  "home-scr": { component: HomeBottomTab, options: nConfig.noHeader },
  "playlist-scr": {
    component: ShowPlaylistScreen,
    options: nConfig.headerTitle,
  },
  "content-scr": {
    component: ShowContentScreen,
    options: nConfig.headerTitle,
  },
  "tab-order-scr": {
    component: TabArrangementScreen,
    options: { title: "Arrange Order" },
  },
  "about-scr": {
    component: AboutScreen,
    options: { title: "A boat" },
  },
};

const SCR_KEYS = R.keys(stackOptions);
export type enum_MainStack = KeyOf<typeof stackOptions>;

function MainStack(props) {
  const Stack = createStackNavigator<typeof stackOptions>();
  const { background, contrast, foreground } = props.theme;

  const screenOptions = {
    ...TransitionPresets.ScaleFromCenterAndroid,
    transitionSpec: {
      open: nConfig.durationSpec,
      close: nConfig.durationSpec,
    },
    headerStyle: {
      elevation: 0,
      backgroundColor: background,
      borderWidth: 0,
    },
    headerTitleStyle: {
      fontFamily: CIRCULAR_BOLD,
      fontSize: 18,
      color: contrast,
      marginLeft: 30,
      marginRight: 30,
    },

    headerTitleAlign: "center",
    headerLeft: (props) => (
      <HeaderBackButton
        {...props}
        style={{}}
        tintColor={foreground}
        labelStyle={{ color: "transparent" }}
      />
    ),
  };
  return (
    <Stack.Navigator
      initialRouteName="home-scr"
      headerMode="screen"
      screenOptions={screenOptions}
    >
      {SCR_KEYS.map((scr) => (
        <Stack.Screen name={scr} {...stackOptions[scr]} />
      ))}
    </Stack.Navigator>
  );
}

export default withTheme(MainStack);
