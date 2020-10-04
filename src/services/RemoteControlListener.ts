import TrackPlayer from "react-native-track-player";
import { store } from "../store";
import { getRandomNumber } from "utils";

let flag = false;

async function backgroundPlayback(track) {
  console.log("bg playtrack...");
//   if (flag) return;
//   flag = true;
//   setTimeout(() => (flag = false), 250);
  await TrackPlayer.reset();
  await TrackPlayer.add(track);
  store.dispatch({ type: "current_track", payload: track });
  TrackPlayer.play();
  store.dispatch({ type: "set_playback", payload: true });
}

async function bgService() {
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
    let { playback, media } = store.getState();
    let { currentTrack, shuffle } = playback;
    let { mediaFiles } = media;
    console.log("remote-next...");
    backgroundPlayback(
      shuffle
        ? mediaFiles[getRandomNumber(0, mediaFiles.length)]
        : currentTrack.index === mediaFiles.length - 1
        ? mediaFiles[0]
        : mediaFiles[currentTrack.index + 1]
    );
  });

  TrackPlayer.addEventListener("remote-previous", () => {
    console.log("remote-previous...");
    let { playback, media } = store.getState();
    let { currentTrack, shuffle } = playback;
    let { mediaFiles } = media;
    backgroundPlayback(
      shuffle
        ? mediaFiles[getRandomNumber(0, mediaFiles.length)]
        : currentTrack.index === 0
        ? mediaFiles[mediaFiles.length - 1]
        : mediaFiles[currentTrack.index - 1]
    );
  });

  TrackPlayer.addEventListener("playback-queue-ended", ({ position }) => {
    console.log("remote-queue-end...");
    let { playback, media } = store.getState();
    let { currentTrack, shuffle, loop } = playback;
    let { mediaFiles, nowPlayingTracks  } = media;
    // console.log("current state: ", playback);
    // console.warn("current media: ", mediaFiles.length);
    if (position > 0) {
      // if (1 == 1) {
      if (loop) {
        backgroundPlayback(currentTrack);
      } else {
        backgroundPlayback(
          shuffle
            ? mediaFiles[getRandomNumber(0, mediaFiles.length)]
            : currentTrack.index === mediaFiles.length - 1
            ? mediaFiles[0]
            : mediaFiles[currentTrack.index + 1]
        );
      }
    }
  });
}

export default bgService;
