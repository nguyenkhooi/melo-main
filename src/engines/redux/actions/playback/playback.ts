import { TrackPlaya } from "components";
import R from "ramda";
import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { store } from "store";
import { errorReporter, TrackProps } from "utils";
import {
  dRedux,
  SetCurrentTrackAction,
  SetNowPlayingTracksAction,
  SetPlayerAction,
  set_np_tracks,
  set_shuffle,
  ToggleLoopAction,
  ToggleShuffleAction,
} from "../../types";

/**
 * Set current track to play.
 * Think of users pressing specific track to play it
 * ---
 *
 * @version 0.10.13 *(Add await)*
 * @author nguyenkhooi
 */
export const setCurrentTrackk = (targetedTrack: TrackProps) => async (
  dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>
) => {
  const thisTrackPlaya = TrackPlaya.getInstance();
  try {
    await thisTrackPlaya.skipToTrack(targetedTrack.id).catch(async (e) => {
      await thisTrackPlaya.core.add(targetedTrack);
      // await thisTrackPlaya.core.remove()
    });
    dispatch({
      type: "current_track",
      payload: targetedTrack,
    });
  } catch (e) {
    errorReporter(e, "3121");
  }
};

/**
 * Set current track (by its ID) and play it.
 * Think of users choose specific track to play
 * ---
 *
 * @version 0.10.10
 * @author nguyenkhooi
 *
 */
export const setCurrentTrackID = (targetedTrackID: string) => async (
  dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>
) => {
  const {
    media: { mediaFiles },
  }: dRedux = store.getState();
  try {
    // const _currentTrack = await TrackPlayer.getCurrentTrack();
    // if (!!_currentTrack) {
    //   /** If _currentTrack exists,
    //    * skip to targeted track
    //    */
    //   await TrackPlayer.skip(targetedTrackID);
    // } else {
    //   /** If _currentTrack no exists,
    //    * reset and refill the TrackPlayer,
    //    * then skip to targeted track
    //    */
    //   await TrackPlayer.reset();
    //   await TrackPlayer.add([...mediaFiles]);
    //   await TrackPlayer.skip(targetedTrackID);
    // }
    console.log("targetedTrackID: ", targetedTrackID);
    // const targetedTrack: TrackProps = fn.js.hLookup(
    //   "id",
    //   targetedTrackID,
    //   mediaFiles
    // )[0];
    //! should not get targetedTrack from TrackPlayer since it may not contain track cover
    const targetedTrack = await TrackPlayer.getTrack(targetedTrackID);
    dispatch({
      type: "current_track",
      payload: targetedTrack,
    });
    console.log("targetedTrackID: ", targetedTrackID);

    await TrackPlayer.skip(targetedTrackID);
    await TrackPlayer.play();
    // await TrackPlayer.reset();
    // await TrackPlayer.add(targetedTrack);
    // TrackPlayer.play();
    dispatch({
      type: "set_playback",
      payload: true,
    });
  } catch (e) {
    errorReporter(e, "3122");
  }
};

type dSethPlayback = {
  type: "play" | "pause" | "fwd" | "bwd";
};
/**
 * Fn to set playback (play, pause, forward, backward)
 *
 * ---
 *
 * @version 0.10.10 *( rewrite the logic and depend on TrackPlayer<> more for faster performance)*
 * @author nguyenkhooi
 */
export const sethPlayback = ({ type }: dSethPlayback) => async (dispatch) => {
  const thisTrackPlaya = TrackPlaya.getInstance();
  try {
    const {
      media: { nowPlayingIDs },
      playback: { currentTrack },
    }: dRedux = store.getState();

    //* Identify current track position for `fwd` and `bwd` actions
    let currentTrackPosition: number;
    if (type == "fwd" || type == "bwd") {
      //* Find currentTrack's position in `nowPlayingTracks`
      currentTrackPosition = nowPlayingIDs.indexOf(currentTrack.id);
    }

    switch (type) {
      case "play":
        /**
         * *dispatch() is now run in TrackPlayer's bgService()
         * for enhancing performance
         */
        await thisTrackPlaya.play();
        break;
      case "pause":
        /**
         * *dispatch() is now run in TrackPlayer's bgService()
         * for enhancing performance
         */
        await thisTrackPlaya.pause();
        break;
      case "fwd":
        await thisTrackPlaya.next();
        return thisTrackPlaya.play();
        break;
      case "bwd":
        await thisTrackPlaya.previous();
        return thisTrackPlaya.play();
        break;
    }
  } catch (error) {
    errorReporter(error, "3123");
  }
};

export const setLoop = (isLoop: boolean): ToggleLoopAction => {
  return { type: "set_loop", payload: isLoop };
};

/**
 * Fn to toggle shuffle and adjust `nowPlayingIDs` accordingly.
 * - If `true`:
 *
 * Turn shuffle on, set `nowPlayingTracks` = `shuffleTracks`,
 *
 * - If `false`:
 *
 * Turn shuffle off, set `nowPlayingTracks` = `indexedTracked`,
 *
 * - Then, if TrackPlayer is not playing, play the first track in the list
 *
 * @version 0.10.9
 * @author nguyenkhooi
 */
export const setShuffle = (
  shouldShuffle: boolean,
  /**trackIDs?: trackID[] */
  givenTracks: TrackProps[]
) => async (
  dispatch: Dispatch<
    ToggleShuffleAction | SetCurrentTrackAction | SetNowPlayingTracksAction
  >
) => {
  let thisTrackPlaya = TrackPlaya.getInstance();
  try {
    const {
      playback: { currentTrack },
      media: { indexedTracks },
    }: dRedux = store.getState();
    const targetedTracks = await thisTrackPlaya.toggleShuffle(
      shouldShuffle,
      givenTracks,
      currentTrack
    );
    //* modify indicator
    dispatch({ type: set_shuffle, payload: shouldShuffle });
    dispatch({ type: set_np_tracks, payload: targetedTracks });
    //* track ids' order to be used
  } catch (error) {
    errorReporter(error, "3124");
    return null;
  }
};

export function playlistShuffle(
  array: any[],
  type: "knuth" | "normal" = "knuth"
) {
  try {
    switch (type) {
      case "knuth":
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
        break;
      case "normal":
        return array.sort(() => Math.random() - 0.5);
        break;
    }
  } catch (error) {
    errorReporter(error, "3125");
    return null;
  }
}
