import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { errorReporter, TrackProps } from "utils";
import { NowPlayingTracksAction, SetCurrentTrackAction } from "../types";
import { sethPlayback } from "./playback";

/**
 * Set a now playing list to play.
 * Think of users playing specific albums, artists, playlists...
 * @param nowPlayingTracks
 * @param shuffle
 *
 * NOTE: The only one that can "reset" and "add" TrackPlayer is setNowPlayingTracks
 * so that TrackPlayer's playing list == nowPlayingLists
 */
export const setNowPlayingTracks = (
  nowPlayingTracks: TrackProps[],
  shouldPlay?: boolean,
  startingTrack?: TrackProps
) => async (
  dispatch: Dispatch<NowPlayingTracksAction | SetCurrentTrackAction>
) => {
  try {
    let _nowPlayingTracks = nowPlayingTracks;
    await TrackPlayer.reset();
    await TrackPlayer.add(_nowPlayingTracks);
    // let reIndexedTracks = [];
    // for (let i = 0; i < nowPlayingTracks.length; i++) {
    //   reIndexedTracks[i] = { ...nowPlayingTracks[i], index: i };
    //   // reIndexedTracks[i]["index"] = i;
    // }
    dispatch({
      type: "now_playing_tracks",
      payload: _nowPlayingTracks,
    });

    if (shouldPlay) {
      const _startingTrack = startingTrack || _nowPlayingTracks[0];
      dispatch({ type: "current_track", payload: _startingTrack });
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
