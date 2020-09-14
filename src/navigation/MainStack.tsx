import React from "react";
import { withTheme } from "styled-components/native";
import {
  createStackNavigator,
  TransitionPresets,
  HeaderBackButton,
} from "@react-navigation/stack";
import { View } from "react-native";
import BottomTabNav from "./BottomTabNav";
// import AddToPlaylist from '../screens/AddToPlayList';
import AboutScreen from "../screens/AboutScreen";
import ShowPlaylistScreen from "../screens/ShowPlaylistScreen";
import ShowContentScreen from "../screens/ShowContentScreen";
import TabOrder from "../screens/TabOrder";
import Icon from "../components/Icon";
import { CIRCULAR, CIRCULAR_BOLD } from "assets";
import { foregroundColor } from "themes";

const durationSpec = { config: { duration: 200 } };

function MainStack(props) {
  const Stack = createStackNavigator();
  const { background, contrast, foreground } = props.theme;

  const screenOptions = {
    ...TransitionPresets.ScaleFromCenterAndroid,
    transitionSpec: {
      open: durationSpec,
      close: durationSpec,
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
      // <View style={{ paddingHorizontal: 10 }}>
      //   <Icon name="angle-left" type="fa5" color={contrast} size={28} />
      // </View>
      <HeaderBackButton
        {...props}
        style={{}}
        tintColor={foreground}
        labelStyle={{ color: "transparent" }}
        // onPress={() => {
        //   // Do something
        // }}
      />
    ),
  };

  const noHeader = { headerShown: false };
  const headerTitle = ({ route }) => ({ title: route.params.title });
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Home" component={BottomTabNav} options={noHeader} />
      {/* <Stack.Screen
				name="addToPlaylist"
				component={AddToPlaylist}
				options={{ title: 'Add to playlist' }}
			/> */}
      <Stack.Screen
        name="playlist"
        component={ShowPlaylistScreen}
        options={headerTitle}
      />
      <Stack.Screen
        name="content"
        component={ShowContentScreen}
        options={headerTitle}
      />
      <Stack.Screen
        name="tab-order"
        component={TabOrder}
        options={{ title: "Arrange Order" }}
      />
      <Stack.Screen
        name="about"
        component={AboutScreen}
        options={{ title: "About" }}
      />
    </Stack.Navigator>
  );
}

export default withTheme(MainStack);
