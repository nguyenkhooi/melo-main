import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { errorReporter, TrackProps } from "utils";
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
