import { TrackPlaya } from "components";
import { current_track, dRedux, setCurrentTrackk, sethPlayback } from "engines";
import { Alert } from "react-native";
import { store } from "../store";

/**
 * The gateway between Playa and Rx,
 * and obviously Playa's background service
 * ---
 * @example
 * ```
 * TrackPlayer.registerPlaybackService(() => bgService);
 * ```
 *
 * - Think of when u's in background and let the playlist rolling automatically,
 * `bgService()` takes care of all playback actions
 * - That's why adjusting Rx accordingly with Playa will make sure the app is united
 */
async function bgService() {
  const thisTrackPlaya = TrackPlaya.getInstance();
  //! Put store.getState() in addEventListener to get latest states
  //// let {
  ////   playback: { currentTrack, loop },
  //// }: dRedux = store.getState();

  thisTrackPlaya.core.addEventListener("playback-state", async (e) => {
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
      case thisTrackPlaya.core.STATE_NONE:
        console.log("none", e);
        // return await store.dispatch({ type: "set_playback", payload: false });
        break;
      case thisTrackPlaya.core.STATE_PLAYING:
        console.log("playing", e);
        // console.log("listening play");
        // return await store.dispatch({ type: "set_playback", payload: true });
        break;
      case thisTrackPlaya.core.STATE_PAUSED:
        console.log("paused", e);
        // console.log("listening pause");
        // return await store.dispatch({ type: "set_playback", payload: false });
        break;
      case thisTrackPlaya.core.STATE_STOPPED:
        console.log("stop", e);
        // return await store.dispatch({ type: "set_playback", payload: false });
        break;
      case thisTrackPlaya.core.STATE_BUFFERING:
        console.log("buffering", e);
        // return await store.dispatch({ type: "set_playback", payload: false });
        break;
      case thisTrackPlaya.core.STATE_READY:
        console.log("ready", e);
        break;
      default:
        console.log("unknown", e);
    }
  });

  thisTrackPlaya.core.addEventListener("remote-play", async () => {
    console.log("remote-playing...");
    thisTrackPlaya.core.play();
    await store.dispatch({ type: "set_playback", payload: true });
  });

  thisTrackPlaya.core.addEventListener("remote-pause", async () => {
    console.log("remote-pausing...");
    thisTrackPlaya.core.pause();
    await store.dispatch({ type: "set_playback", payload: false });
  });

  thisTrackPlaya.core.addEventListener("remote-next", async () => {
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
    await store.dispatch(sethPlayback({ type: "fwd" }));
  });

  thisTrackPlaya.core.addEventListener("playback-track-changed", async (e) => {
    console.log("track changed listener: ", e);
    let {
      playback: { currentTrack },
    }: dRedux = store.getState();
    try {
      const playingItemId = await thisTrackPlaya.getCurrentTrackId();
      // no playing item and therefore listener is being trigged on a abnormal situation (e.g. logging out)
      if (playingItemId === null) {
        return null;
      }
      console.log("currentTrack: ", currentTrack.title);
      console.log(">", currentTrack.id !== "000" && !!e && !!e.nextTrack);
      if (currentTrack.id !== "000" && !!e && !!e.nextTrack) {
        const targetedTrack = await thisTrackPlaya.core.getTrack(e.nextTrack);
        await store.dispatch({
          type: current_track,
          payload: targetedTrack,
        });
        // await store.dispatch(sethPlayback({ type: "fwd" }));
      }
    } catch (error) {
      console.warn("err track-changed: ", error);
    }
  });

  thisTrackPlaya.core.addEventListener("remote-previous", async () => {
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
    await store.dispatch(sethPlayback({ type: "bwd" }));
  });

  /**
   * @note "playback-queue-ended" is not top important anymore in the latest logic,
   * since TP now contains the whole track[]
   *
   */
  thisTrackPlaya.core.addEventListener(
    "playback-queue-ended",
    async ({ position }) => {
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
          await store.dispatch(setCurrentTrackk(currentTrack));
          await store.dispatch(sethPlayback({ type: "play" }));
        } else {
          Alert.alert("Done!!");
          await store.dispatch(sethPlayback({ type: "fwd" }));
          // backgroundPlayback(
          //   shuffle
          //     ? nowPlayingTracks[getRandomNumber(0, nowPlayingTracks.length)]
          //     : currentTrack.index === nowPlayingTracks.length - 1
          //     ? nowPlayingTracks[0]
          //     : nowPlayingTracks[currentTrack.index + 1]
          // );
        }
      }
    }
  );
}

export default bgService;
