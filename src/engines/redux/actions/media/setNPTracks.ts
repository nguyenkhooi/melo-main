import { Dispatch } from "redux";
import { errorReporter, trackID } from "utils";
import { NowPlayingTracksAction, SetCurrentTrackAction } from "../../types";
import { setCurrentTrackID } from "../playback";

/**
 * Set a `nowPlayingTracks` list, for index reference.
 * Think of users playing specific albums, artists, playlists...
 * But remember, TrackPlayer ALWAYS inherits `MediaFiles[]`,
 * so don't use `TrackPlayer.add(nowPlayingTracks)`
 *
 * @param nowPlayingTrackIDs
 *
 * NOTE: The only one that can "reset" and "add" TrackPlayer is setNowPlayingTracks
 * so that TrackPlayer's playing list == nowPlayingLists
 */
export const setNowPlayingTracks = (
  nowPlayingTrackIDs: trackID[],

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
