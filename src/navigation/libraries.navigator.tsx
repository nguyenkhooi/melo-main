import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CIRCULAR } from "assets";
import { ScreenTitle } from "components";
import R from "ramda";
import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { connect } from "react-redux";
import {
  AlbumsScreen,
  ArtistsScreen,
  FoldersScreen,
  PlaylistsScreen,
} from "screens";
import { withTheme } from "styled-components/native";
import { getStatusBarHeight, KeyOf } from "utils";

const stackOptions = {
  "playlists-scr": {
    component: PlaylistsScreen,
    options: { title: "Playlists" },
  },
  "artists-scr": { component: ArtistsScreen, options: { title: "Artists" } },
  "albums-scr": { component: AlbumsScreen, options: { title: "Albums" } },
  "folders-scr": { component: FoldersScreen, options: { title: "Folders" } },
};

const SCR_KEYS = R.keys(stackOptions);
export type enum_LibrariesTopTab = KeyOf<typeof stackOptions>;

function LibrariesTopTab(props: {
  theme: { foreground: any; background: any; contrast: any };
  tabOrder: enum_LibrariesTopTab[];
}) {
  const TopTabs = createMaterialTopTabNavigator<typeof stackOptions>();
  const { foreground, background, contrast } = props.theme;
  const tabBarOptions = {
    activeTintColor: contrast,
    upperCaseLabel: false,
    tabStyle: { width: 92 } as ViewStyle,
    scrollEnabled: true,
    labelStyle: {
      fontFamily: CIRCULAR,
      fontSize: 16,
      textTransform: "capitalize",
    } as TextStyle,
    style: {
      elevation: 0,
      marginLeft: 10,
      backgroundColor: background,
    } as ViewStyle,
    indicatorStyle: {
      width: 60,
      marginLeft: 16,
      backgroundColor: foreground,
    } as ViewStyle,
    allowFontScaling: false,
  };

  return (
   <View style={{flex: 1}}>
      {/* <ScreenTitle title="Libraries" /> */}
      <TopTabs.Navigator tabBarOptions={tabBarOptions}>
        {props.tabOrder.map((tab) => (
          <TopTabs.Screen name={tab} {...stackOptions[tab]} key={tab} />
        ))}
      </TopTabs.Navigator>
    </View>
  );
}

function mapStateToProps(state) {
  return { tabOrder: state.settings.topTabs };
}

export default connect(mapStateToProps, null)(withTheme(LibrariesTopTab));
