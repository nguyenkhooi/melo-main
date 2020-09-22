//@ts-check
import { AppRegistry, YellowBox } from "react-native";
import "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
import App from "./App";
import { name as appName } from "./app.json";
import bgService from "./src/services/RemoteControlListener";

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated fn
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Story with id",
  "Require cycles",
  "Require cycle",
]);
console.ignoredYellowBox = [
  "componentWillMount is deprecated",
  "componentWillReceiveProps is deprecated",
  "Story with id",
  "Require cycles",
  "Require cycle",
];
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => bgService);
