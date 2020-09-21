import { log } from "react-native-reanimated";
import TrackPlayer, { Track } from "react-native-track-player";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { errorReporter, getRandomNumber, TrackProps } from "utils";

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

export const setCurrentTrack = (currentTrack: TrackProps) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(currentTrack);
    dispatch({
      type: "current_track",
      payload: currentTrack,
    });
    TrackPlayer.play();
    dispatch({
      type: "set_playback",
      payload: true,
    });
  } catch (e) {
    errorReporter(e);
  }
};

export const setPlayback = (isPlaying?: boolean) => {
  isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
  return { type: "set_playback", payload: isPlaying };
};

export const setLoop = (isLoop) => {
  return { type: "set_loop", payload: isLoop };
};

export const setShuffle = (isShuffle) => {
  return { type: "set_shuffle", payload: isShuffle };
};
