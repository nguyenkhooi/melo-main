import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { errorReporter, getRandomNumber, TrackProps } from "utils";
import {
  SetCurrentTrackAction,
  SetPlayerAction,
  ToggleLoopAction,
  ToggleShuffleAction
} from "../types";

/**
 * Set current track to play.
 * Think of users pressing specific track to play it
 * @param currentTrack
 */
export const setCurrentTrack = (currentTrack: TrackProps) => async (
  dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>
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

/**
 * Set play or pause
 * @param isPlaying
 */
export const setPlayback = (isPlaying?: boolean): SetPlayerAction => {
  isPlaying ? TrackPlayer.play() : TrackPlayer.pause();
  return { type: "set_playback", payload: isPlaying };
};

type dSethPlayback = {
  type: "play" | "pause" | "fwd" | "bwd";
  currentTrackList?: TrackProps[];
  currentTrack?: TrackProps;
  isShuffle?: boolean;
};
export const sethPlayback = ({
  type,
  currentTrackList,
  currentTrack,
  isShuffle,
}: dSethPlayback) => async (dispatch) => {
  try {
    switch (type) {
      case "play":
        TrackPlayer.play();
        return dispatch({ type: "set_playback", payload: true });
        break;
      case "pause":
        TrackPlayer.pause();
        return dispatch({ type: "set_playback", payload: false });
        break;
      case "fwd":
        let nextTrack = isShuffle
          ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
          : currentTrack.index === currentTrackList.length - 1
          ? currentTrackList[0]
          : currentTrackList[currentTrack.index + 1];
        return dispatch(setCurrentTrack(nextTrack));
        break;
      case "bwd":
        let prevTrack = isShuffle
          ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
          : currentTrack.index === currentTrackList.length - 1
          ? currentTrackList[0]
          : currentTrackList[currentTrack.index - 1];
        return dispatch(setCurrentTrack(prevTrack));
        break;
    }
  } catch (error) {
    errorReporter(error);
  }
};

export const setForward = (
  currentTrackList: TrackProps[],
  currentTrack: TrackProps,
  isShuffle: boolean
) => async (dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>) => {
  try {
    let nextTrack = isShuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrack.index === currentTrackList.length - 1
      ? currentTrackList[0]
      : currentTrackList[currentTrack.index + 1];
    dispatch(setCurrentTrack(nextTrack));
  } catch (error) {
    errorReporter(error);
  }
};

export const setLoop = (isLoop: boolean): ToggleLoopAction => {
  return { type: "set_loop", payload: isLoop };
};

/**
 * Set Shuffle
 * @param isShuffle
 */
export const setShuffle = (isShuffle: boolean): ToggleShuffleAction => {
  return { type: "set_shuffle", payload: isShuffle };
};
