import { img } from "assets";
import TrackPlayer from "react-native-track-player";
import { errorReporter } from "utils";
const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
// const resolvedImage = resolveAssetSource(myImage);

/**
 * Setup TrackPlayer with suitable capability,
 * get device's media,
 * and aligning TrackPlayer with Redux states
 *
 * @version 0.10.5
 */
export async function setupPlayer() {
  try {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_PLAY_FROM_SEARCH,
        // TrackPlayer.CAPABILITY_JUMP_FORWARD
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      /** @see https://github.com/react-native-kit/react-native-track-player/blob/dev/docs/API.md#playback-service */
      /** @see https://react-native-track-player.js.org/documentation/#player-functions
       */
      icon: resolveAssetSource(img.meloWhite),
    });

    /**
     * Aligning TrackPlayer with Redux states
     * @deprecated
     * @summary TrackPlayer ONLY inherits track lists from `mediaFiles`,
     * so we should not see TrackPlayer.add("other_track_list")
     * anywhere else
     */
    // const {
    //   playback: { currentTrack },
    // }: dRedux = store.getState();
    // !!currentTrack &&
    //   currentTrack.id !== "000" &&
    //   (await TrackPlayer.add(currentTrack));

    // const _currentTrack = await TrackPlayer.getCurrentTrack();
    // if (!!currentTrack && !_currentTrack) {
    //   console.info("unlikely case: ", currentTrack.id);
    //   /** If `currentTrack` exists, but `_currentTrack` no exist (unlikely, but just in case)
    //    * reset and refill the TrackPlayer,
    //    * then skip to `cureentTrack` track
    //    */
    //   await TrackPlayer.reset();
    //   await TrackPlayer.add([...mediaFiles]);
    //   // await TrackPlayer.skip(currentTrack.id)
    // }

    // if (!_currentTrack && !_currentTrack) {
    //   /** If both `currentTrack` and `_currentTrack` no exist (e.g. 1st start up)
    //    * reset and refill the TrackPlayer,
    //    */
    //   await TrackPlayer.reset();
    //   await TrackPlayer.add([...mediaFiles]);
    // }

    // if (!!_currentTrack && !!currentTrack) {
    //   /** If `_currentTrack` and `currentTrack` exists,
    //    * skip to targeted track
    //    */
    //   // continue;
    // }
  } catch (error) {
    errorReporter(error, "31200");
  }
}
