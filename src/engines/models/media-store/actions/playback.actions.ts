import { dTrack } from "engines/models/media-store/track-doc/track.doc";
import TrackPlayer from "react-native-track-player";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { errorReporter, getRandomNumber, TrackProps } from "utils";
import { MediaModel } from "../media.store";

export function PlaybackActions() {
  return MediaModel().actions(() => ({}));
}

export const setCurrentList = (
  currentList: TrackProps[],
  shuffle: boolean = false
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(currentList);
    dispatch({
      type: "current_list",
      payload: currentList,
    });

    /**
     * Check if shuffle is true or not. If true,
     * set the `nextTrack` to random item, else
     * play the first item in the `currentList`
     */
    let nextTrack = shuffle
      ? currentList[getRandomNumber(0, currentList.length)]
      : currentList[0];
    console.log(
      "setCurrentList: ",
      currentList.length + ", shuffle: " + shuffle + nextTrack
    );
    dispatch({
      type: "current_track",
      payload: nextTrack,
    });
    // TrackPlayer.play();
    // dispatch({
    //   type: "set_playback",
    //   payload: true,
    // });
  } catch (e) {
    errorReporter(e);
  }
};

/**
 * Fn to set current track to play next
 * @param currentTrack
 * @param shouldPlayed
 */
export const setCurrentTrack = (
  currentTrack: dTrack,
  shouldPlayed: boolean = false
) => {
  return new Promise<{ type: "current_track"; payload: dTrack }>(
    async function (resolve) {
      try {
        await TrackPlayer.reset();
        await TrackPlayer.add(currentTrack);
        resolve({
          type: "current_track",
          payload: currentTrack,
        });
        shouldPlayed && TrackPlayer.play();
        //   dispatch({
        //     type: "set_playback",
        //     payload: true,
        //   });
      } catch (e) {
        errorReporter(e);
      }
    }
  );
};

/**
 * Set TrackPlayer to `play` or `pause`
 * @param isPlaying
 */
export const setPlayback = (isPlaying?: boolean) => {
  isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
  return new { type: "set_playback", payload: isPlaying }();
};

export const setLoop = (isLoop) => {
  return { type: "set_loop", payload: isLoop };
};

export const setShuffle = (isShuffle) => {
  return { type: "set_shuffle", payload: isShuffle };
};
