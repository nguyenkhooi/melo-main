import TrackPlayer from "react-native-track-player";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { errorReporter, getRandomNumber, TrackProps } from "utils";

export const setCurrentList = (
  currentTrackList: TrackProps[],
  shuffle: boolean = false
) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(currentTrackList);
    dispatch({
      type: "current_track_list",
      payload: currentTrackList,
    });

    /**
     * Check if shuffle is true or not. If true,
     * set the `nextTrack` to random item, else
     * play the first item in the `currentTrackList`
     */
    let nextTrack = shuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrackList[0];
    console.log(
      "setCurrentList: ",
      currentTrackList.length + ", shuffle: " + shuffle + nextTrack
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

/**
 * Set Shuffle
 * @param isShuffle
 */
export const setShuffle = (isShuffle) => {
  return { type: "set_shuffle", payload: isShuffle };
};
