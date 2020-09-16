import { img } from "assets";
import TrackPlayer from "react-native-track-player";
const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
// const resolvedImage = resolveAssetSource(myImage);

export async function setupPlayer() {
  await TrackPlayer.setupPlayer();
  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      // TrackPlayer.CAPABILITY_JUMP_FORWARD
    ],
    compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
    /** @see https://github.com/react-native-kit/react-native-track-player/blob/dev/docs/API.md#playback-service */
    icon: resolveAssetSource(img.meloWhite),
  });
}
