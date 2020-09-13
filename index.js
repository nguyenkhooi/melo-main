//@ts-check
import "react-native-gesture-handler";
import { AppRegistry, YellowBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import TrackPlayer from "react-native-track-player";
import bgService from "./src/services/RemoteControlListener";

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated fn
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Story with id",
  "Require cycle",
]);
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => bgService);
