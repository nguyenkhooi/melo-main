import { dRedux, setCurrentTrackID, sethPlayback } from "engines";
import TrackPlayer from "react-native-track-player";
import { getRandomNumber, TrackProps } from "utils";
import { store } from "../store";

let flag = false;

/**
 * Background fn to dispatch current_track (not )
 * @param track
 */
// async function backgroundPlayback(track: TrackProps) {
//   console.log("bg playtrack...");
//   //   if (flag) return;
//   //   flag = true;
//   //   setTimeout(() => (flag = false), 250);
//   await TrackPlayer.reset();
//   await TrackPlayer.add(track);
//   store.dispatch(setCurrentTrackID(track.id));
//   store.dispatch({ type: "current_track", payload: track });
//   TrackPlayer.play();
//   store.dispatch({ type: "set_playback", payload: true });
// }

async function bgService() {
  TrackPlayer.addEventListener("playback-state", async () => {
    const tpState = await TrackPlayer.getState();
    switch (tpState) {
      case TrackPlayer.STATE_NONE:
        return store.dispatch({ type: "set_playback", payload: false });
      case TrackPlayer.STATE_PLAYING:
        // console.log("listening play");
        return store.dispatch({ type: "set_playback", payload: true });
      case TrackPlayer.STATE_PAUSED:
        // console.log("listening pause");
        return store.dispatch({ type: "set_playback", payload: false });
      case TrackPlayer.STATE_STOPPED:
        return store.dispatch({ type: "set_playback", payload: false });
      case TrackPlayer.STATE_BUFFERING:
        return store.dispatch({ type: "set_playback", payload: false });
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

  TrackPlayer.addEventListener("playback-queue-ended", ({ position }) => {
    console.log("remote-queue-end...");
    let {
      playback: { currentTrack, loop },
      media: { mediaFiles },
    }: dRedux = store.getState();
    // console.log("current state: ", playback);
    // console.warn("current media: ", mediaFiles.length);
    if (position > 0) {
      // if (1 == 1) {
      if (loop) {
        // backgroundPlayback(currentTrack);
        store.dispatch(setCurrentTrackID(currentTrack.id));
      } else {
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
