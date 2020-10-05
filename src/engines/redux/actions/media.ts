import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { errorReporter, TrackProps } from "utils";
import { NowPlayingTracksAction, SetCurrentTrackAction } from "../types";
import { setCurrentTrackID, sethPlayback } from "./playback";

/**
 * Set a `nowPlayingTracks` list, for index reference.
 * Think of users playing specific albums, artists, playlists...
 * But remember, TrackPlayer ALWAYS inherits `MediaFiles[]`,
 * so don't use `TrackPlayer.add(nowPlayingTracks)`
 *
 * @param nowPlayingTracks
 *
 * NOTE: The only one that can "reset" and "add" TrackPlayer is setNowPlayingTracks
 * so that TrackPlayer's playing list == nowPlayingLists
 */
export const setNowPlayingTracks = (
  
  nowPlayingTracks: TrackProps[],
  /**  Should we play this list? */
  shouldPlay?: boolean,

  /** Specific starting track, if needed */
  startingTrack?: TrackProps
) => async (
  dispatch: Dispatch<NowPlayingTracksAction | SetCurrentTrackAction>
) => {
  try {
    // await TrackPlayer.reset();
    // await TrackPlayer.add([...nowPlayingTracks]);

    dispatch({
      type: "now_playing_tracks",
      payload: nowPlayingTracks,
    });

    if (shouldPlay) {
      const _startingTrack = startingTrack || nowPlayingTracks[0];
      dispatch(setCurrentTrackID(_startingTrack.id));
      // dispatch({ type: "current_track", payload: _startingTrack });
      // dispatch(sethPlayback({ type: "play" }));
    }
    //* NOTE below is for reference, is deprecated now
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
