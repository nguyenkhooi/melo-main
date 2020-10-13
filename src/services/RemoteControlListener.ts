import { TrackPlaya } from "components";
import {
  dRedux,
  setCurrentTrackk,
  sethPlayback,
} from "engines";
import { Alert } from "react-native";
import TrackPlayer from "react-native-track-player";
import { store } from "../store";


async function bgService() {
  //! Put store.getState() in addEventListener to get latest states
  //// let {
  ////   playback: { currentTrack, loop },
  //// }: dRedux = store.getState();

  TrackPlayer.addEventListener("playback-state", async (e) => {
    /**
     * 0  - none
     * 1  - stop
     * 2  - pause
     * 3  - play
     * ?4  -
     * ?5  -
     * 6  - buffering
     * 7  - connecting
     * ?8  - "ready"
     */
    switch (e.state) {
      case TrackPlayer.STATE_NONE:
        console.log("none", e);
        // return store.dispatch({ type: "set_playback", payload: false });
        break;
      case TrackPlayer.STATE_PLAYING:
        console.log("playing", e);
        // console.log("listening play");
        // return store.dispatch({ type: "set_playback", payload: true });
        break;
      case TrackPlayer.STATE_PAUSED:
        console.log("paused", e);
        // console.log("listening pause");
        // return store.dispatch({ type: "set_playback", payload: false });
        break;
      case TrackPlayer.STATE_STOPPED:
        console.log("stop", e);
        // return store.dispatch({ type: "set_playback", payload: false });
        break;
      case TrackPlayer.STATE_BUFFERING:
        console.log("buffering", e);
        // return store.dispatch({ type: "set_playback", payload: false });
        break;
      case TrackPlayer.STATE_READY:
        console.log("ready", e);
        break;
      default:
        console.log("unknown", e);
    }
  });

  TrackPlayer.addEventListener("remote-play", () => {
    console.log("remote-playing...");
    TrackPlayer.play();
    store.dispatch({ type: "set_playback", payload: true });
  });

  TrackPlayer.addEventListener("remote-pause", () => {
    console.log("remote-pausing...");
    TrackPlayer.pause();
    store.dispatch({ type: "set_playback", payload: false });
  });

  TrackPlayer.addEventListener("remote-next", () => {
    console.log("remote-next...");
    // let {
    //   playback: { currentTrack, shuffle },
    //   media: { mediaFiles },
    // }: dRedux = store.getState();
    // let { currentTrack, shuffle } = playback;
    // let { mediaFiles } = media;
    // backgroundPlayback(
    //   shuffle
    //     ? mediaFiles[getRandomNumber(0, mediaFiles.length)]
    //     : currentTrack.index === mediaFiles.length - 1
    //     ? mediaFiles[0]
    //     : mediaFiles[currentTrack.index + 1]
    // );
    store.dispatch(sethPlayback({ type: "fwd" }));
  });

  TrackPlayer.addEventListener("playback-track-changed", async (e) => {
    console.log("track changed listener: ", e);
    let {
      playback: { currentTrack },
    }: dRedux = store.getState();
    try {
      const playingItemId = await TrackPlaya.getInstance().getCurrentTrackId();
      // no playing item and therefore listener is being trigged on a abnormal situation (e.g. logging out)
      if (playingItemId === null) {
        return null;
      }
      console.log("currentTrack: ", currentTrack.title);
      console.log(">", currentTrack.id !== "000" && !!e && !!e.nextTrack);
      if (currentTrack.id !== "000" && !!e && !!e.nextTrack) {
        const targetedTrack = await TrackPlayer.getTrack(e.nextTrack);
        store.dispatch({
          type: "current_track",
          payload: targetedTrack,
        });
        // store.dispatch(sethPlayback({ type: "fwd" }));
      }
    } catch (error) {
      console.warn("err track-changed: ", error);
    }
  });

  TrackPlayer.addEventListener("remote-previous", () => {
    console.log("remote-previous...");
    // let { playback, media }: dRedux = store.getState();
    // let { currentTrack, shuffle } = playback;
    // let { mediaFiles } = media;
    // backgroundPlayback(
    //   shuffle
    //     ? mediaFiles[getRandomNumber(0, mediaFiles.length)]
    //     : currentTrack.index === 0
    //     ? mediaFiles[mediaFiles.length - 1]
    //     : mediaFiles[currentTrack.index - 1]
    // );
    store.dispatch(sethPlayback({ type: "bwd" }));
  });

  /**
   * @note "playback-queue-ended" is not top important anymore in the latest logic,
   * since TP now contains the whole track[]
   *
   */
  TrackPlayer.addEventListener("playback-queue-ended", ({ position }) => {
    console.log("remote-queue-end...:", position);
    let {
      playback: { currentTrack, loop },
    }: dRedux = store.getState();
    // console.log("current state: ", playback);
    // console.warn("current media: ", mediaFiles.length);
    if (position > 0) {
      // if (1 == 1) {
      if (loop) {
        // backgroundPlayback(currentTrack);
        store.dispatch(setCurrentTrackk(currentTrack));
      } else {
        Alert.alert("Done!!");
        store.dispatch(sethPlayback({ type: "fwd" }));
        // backgroundPlayback(
        //   shuffle
        //     ? nowPlayingTracks[getRandomNumber(0, nowPlayingTracks.length)]
        //     : currentTrack.index === nowPlayingTracks.length - 1
        //     ? nowPlayingTracks[0]
        //     : nowPlayingTracks[currentTrack.index + 1]
        // );
      }
    }
  });
}

export default bgService;
