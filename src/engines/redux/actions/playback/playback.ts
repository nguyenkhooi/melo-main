import { TrackPlaya } from "components";
import { Dispatch } from "redux";
import { store } from "store";
import { errorReporter, TrackProps } from "utils";
import {
  current_track,
  dRedux,
  SetCurrentTrackAction,
  SetIndexedTracksAction,
  SetNowPlayingTracksAction,
  SetPlayerAction,
  set_indexed_tracks,
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
    await thisTrackPlaya.skipToTrack(targetedTrack.id).catch(async () => {
      await thisTrackPlaya.core.add(targetedTrack);
      await thisTrackPlaya.skipToTrack(targetedTrack.id);
      // await thisTrackPlaya.core.remove()
    });
    dispatch({
      type: current_track,
      payload: targetedTrack,
    });
  } catch (e) {
    errorReporter(e, "3121");
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
 * @version 0.10.13 *(remove findCurrentPosition; it's in Playa now)*
 * @author nguyenkhooi
 */
export const sethPlayback = ({ type }: dSethPlayback) => async () => {
  const thisTrackPlaya = TrackPlaya.getInstance();
  try {
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
 * Fn to toggle shuffle
 * using Playa's `toggleShuffle()`
 * and adjust `nowPlayingTracks` accordingly.
 * ---
 * @example
 * ```
 * setShuffle(true, mediaFiles)
 * ```
 *---
 * - If `true`:
 *
 * Turn shuffle on, set `nowPlayingTracks` = shuffled(indexedTracks),
 *
 * - If `false`:
 *
 * Turn shuffle off, set `nowPlayingTracks` = `indexedTracks`,
 *
 * - Then, if TrackPlayer is not playing, play the first track in the list
 *
 * @version 0.10.13 *(add `set_np_tracks` dispatch)*
 * @author nguyenkhooi
 */
export const setShuffle = (
  shouldShuffle: boolean,
  /**trackIDs?: trackID[] */
  indexedTracks: TrackProps[]
) => async (
  dispatch: Dispatch<
    ToggleShuffleAction | SetIndexedTracksAction | SetNowPlayingTracksAction
  >
) => {
  let thisTrackPlaya = TrackPlaya.getInstance();
  try {
    const {
      playback: { currentTrack },
    }: // media: { indexedTracks },
    dRedux = store.getState();
    const targetedTracks = await thisTrackPlaya.toggleShuffle(
      shouldShuffle,
      indexedTracks,
      currentTrack
    );
    //* modify indicator
    dispatch({ type: set_shuffle, payload: shouldShuffle });
    dispatch({ type: set_indexed_tracks, payload: indexedTracks });
    dispatch({ type: set_np_tracks, payload: targetedTracks });
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
