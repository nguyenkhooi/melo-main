import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { errorReporter, getRandomNumber, TrackProps } from "utils";
import {
  dPlaybackActions,
  GetMediaAction,
  NowPlayingTracksAction,
  SetCurrentTrackAction,
} from "../types";
import { sethPlayback } from "./playback";

/**
 * Set a now playing list to play.
 * Think of users playing specific albums, artists, playlists...
 * @param nowPlayingTracks
 * @param shuffle
 */
export const setNowPlayingTracks = (
  nowPlayingTracks: TrackProps[],
  shouldPlay?: boolean
) => async (
  dispatch: Dispatch<NowPlayingTracksAction | SetCurrentTrackAction>
) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(nowPlayingTracks);
    // let reIndexedTracks = [];
    // for (let i = 0; i < nowPlayingTracks.length; i++) {
    //   reIndexedTracks[i] = { ...nowPlayingTracks[i], index: i };
    //   // reIndexedTracks[i]["index"] = i;
    // }
    dispatch({
      type: "now_playing_tracks",
      payload: nowPlayingTracks,
    });

    if (shouldPlay) {
      dispatch({ type: "current_track", payload: nowPlayingTracks[0] });
      dispatch(sethPlayback({ type: "play" }));
      // dispatch({ type: "" });
    }

    // /**
    //  * Check if shuffle is true or not. If true,
    //  * set the `nextTrack` to random item, else
    //  * play the first item in the `nowPlayingTracks`
    //  */
    // let nextTrack = shuffle
    //   ? nowPlayingTracks[getRandomNumber(0, nowPlayingTracks.length)]
    //   : nowPlayingTracks[0];
    // console.log(
    //   "setCurrentList: ",
    //   nowPlayingTracks.length + ", shuffle: " + shuffle + nextTrack
    // );
    // dispatch({
    //   type: "current_track",
    //   payload: nextTrack,
    // });
    // TrackPlayer.play();
    // dispatch({
    //   type: "set_playback",
    //   payload: true,
    // });
  } catch (e) {
    errorReporter(e);
  }
};
