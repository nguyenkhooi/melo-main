import { TrackPlaya } from "components";
import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { dTracks, errorReporter, trackID, TrackProps } from "utils";
import {
  NowPlayingTracksAction,
  SetCurrentTrackAction,
  SetIndexedTracksAction,
  SetNowPlayingTracksAction,
  set_indexed_tracks,
  set_np_tracks,
} from "../../types";
import { setCurrentTrackID } from "../playback/playback";

/**
 * Set a `nowPlayingTracks` list, for index reference.
 * Think of users playing specific albums, artists, playlists...
 * But remember, TrackPlayer ALWAYS inherits `MediaFiles[]`,
 * so don't use `TrackPlayer.add(nowPlayingTracks)`
 *
 * @deprecated soon
 *
 * NOTE: The only one that can "reset" and "add" TrackPlayer is setNowPlayingTracks
 * so that TrackPlayer's playing list == nowPlayingLists
 */
export const setNowPlayingTracks = (
  nowPlayingTrackIDs: trackID[],
  nowPlayingTracks?: dTracks,

  /**  Should we play this list? */
  shouldPlay?: boolean,

  /** Specific starting track, if needed */
  startingTrackID?: trackID
  // startingTrack?: TrackProps
) => async (
  dispatch: Dispatch<NowPlayingTracksAction | SetCurrentTrackAction>
) => {
  try {
    // await TrackPlayer.reset();
    // await TrackPlayer.add([...nowPlayingTracks]);

    dispatch({
      type: "now_playing_tracks",
      payload: nowPlayingTrackIDs,
    });

    if (shouldPlay) {
      await TrackPlayer.reset();
      await TrackPlayer.add([...nowPlayingTracks]);

      const _startingTrackID = startingTrackID || nowPlayingTrackIDs[0];
      //@ts-ignore
      dispatch(setCurrentTrackID(_startingTrackID));
      // dispatch({ type: "current_track", payload: _startingTrack });
      // dispatch(sethPlayback({ type: "play" }));
    }
    // ! below is for reference, is deprecated now
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

export const buildNowPlayingTracks = (
  targetedTracks: TrackProps[],
  indexedTracks: TrackProps[]
) => async (
  dispatch: Dispatch<SetNowPlayingTracksAction | SetIndexedTracksAction>
) => {
  let thisTrackPlaya = TrackPlaya.getInstance();
  thisTrackPlaya.setPlaylist(targetedTracks);
  dispatch({ type: set_indexed_tracks, payload: indexedTracks });
  return dispatch({ type: set_np_tracks, payload: targetedTracks });
};
