import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import R from "ramda";
import React from "react";
import {
  AddToPlaylist,
  LyricsScreen,
  NowPlayingScreen,
  PlayerScreen,
} from "screens";
import { DEVICE_HEIGHT, KeyOf } from "utils";
import MainStack from "./main.navigator";

const stackOptions = {
  "main-scr": { component: MainStack },
  "player-scr": { component: PlayerScreen },
  "addToPlaylist-scr": {
    component: AddToPlaylist,
    options: { title: "Add to playlist" },
  },
  "lyrics-scr": { component: LyricsScreen },
  "now-playing-scr": {
    component: NowPlayingScreen,
    options: { gestureResponseDistance: { vertical: 60 } },
  },
};

const SCR_KEYS = R.keys(stackOptions);
export type enum_PrimaryStack = KeyOf<typeof stackOptions>;

const screenOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  /** Modal swipe distance */
  gestureResponseDistance: { vertical: DEVICE_HEIGHT * 0.4 },
};

function PrimaryStack() {
  const Modal = createStackNavigator();
  return (
    <Modal.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName="main-scr"
      screenOptions={screenOptions}
    >
      {SCR_KEYS.map((scr) => (
        <Modal.Screen name={scr} {...stackOptions[scr]} />
      ))}
      {/* <Modal.Screen name="main-scr" component={MainStack} />
      <Modal.Screen name="player" component={PlayerScreen} />
      <Modal.Screen
        name="addToPlaylist"
        component={AddToPlaylist}
        options={{ title: "Add to playlist" }}
      />
      <Modal.Screen name="lyrics" component={LyricsScreen} /> */}
    </Modal.Navigator>
  );
}

export default PrimaryStack;
