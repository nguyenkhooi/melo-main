import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withTheme } from "styled-components/native";
import { connect } from "react-redux";

import { getStatusBarHeight } from "utils";
import { TextStyle, ViewStyle, View } from "react-native";
import { ScreenTitle } from "components";

import {
  PlaylistsScreen,
  ArtistsScreen,
  AlbumsScreen,
  FoldersScreen,
} from "screens";

const screenProps = {
  playlists: { component: PlaylistsScreen, options: { title: "Playlists" } },
  artists: { component: ArtistsScreen, options: { title: "Artists" } },
  albums: { component: AlbumsScreen, options: { title: "Albums" } },
  folders: { component: FoldersScreen, options: { title: "Folders" } },
};

function TopMaterialTabNav(props) {
  const TopTabs = createMaterialTopTabNavigator();
  const { foreground, background, contrast } = props.theme;
  const tabBarOptions = {
    activeTintColor: contrast,
    upperCaseLabel: false,
    tabStyle: { width: 92 } as ViewStyle,
    scrollEnabled: true,
    labelStyle: {
      fontFamily: 'Circular',
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
    <View style={{ paddingTop: getStatusBarHeight("safe"), flex: 1 }}>
      <ScreenTitle title="Libraries" />
      <TopTabs.Navigator tabBarOptions={tabBarOptions}>
        {props.tabOrder.map((tab) => (
          <TopTabs.Screen name={tab} {...screenProps[tab]} key={tab} />
        ))}
      </TopTabs.Navigator>
    </View>
  );
}

function mapStateToProps(state) {
  return { tabOrder: state.settings.topTabs };
}

export default connect(mapStateToProps, null)(withTheme(TopMaterialTabNav));
