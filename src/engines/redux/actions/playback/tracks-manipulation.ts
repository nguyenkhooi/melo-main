import { Toasty, TrackPlaya } from "components";
import R from "ramda";
import { Dispatch } from "redux";
import { store } from "store";
import { errorReporter, TrackProps } from "utils";
import {
  current_track,
  dRedux,
  SetCurrentTrackAction,
  SetIndexedTracksAction,
  SetNowPlayingTracksAction,
  set_indexed_tracks,
  set_np_tracks,
  set_shuffle,
  ToggleLoopAction,
  ToggleShuffleAction,
} from "../../types";

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
 * @version 0.10.13
 * - *(add `set_np_tracks` dispatch)*
 * @author nguyenkhooi
 */
export const setShuffle = (
  shouldShuffle: boolean,
  /**trackIDs?: trackID[] */
  indexedTracks: TrackProps[]
) => async (
  dispatch: Dispatch<
    | ToggleShuffleAction
    | SetIndexedTracksAction
    | SetNowPlayingTracksAction
    | SetCurrentTrackAction
  >
) => {
  let thisTrackPlaya = TrackPlaya.getInstance();
  try {
    const {
      playback: { currentTrack },
    }: // media: { indexedTracks },
    dRedux = store.getState();

    let __toast = Toasty.show(
      shouldShuffle ? "Shuffling..." : "Unshuffling...",
      {
        type: "normal",
        icon: "loading",
      }
    );

    //* Handle null/000 currentTrack
    const _currentTrack: TrackProps =
      !!currentTrack && currentTrack.id == "000"
        ? indexedTracks[0]
        : currentTrack;
    const targetedTracks = await thisTrackPlaya.toggleShuffle(
      shouldShuffle,
      indexedTracks,
      _currentTrack
    );
    //* modify indicator
    dispatch({ type: current_track, payload: _currentTrack });
    dispatch({ type: set_shuffle, payload: shouldShuffle });
    if (!!__toast) {
      Toasty.update(__toast, shouldShuffle ? "Shuffle: On" : "Shuffle: Off", {
        type: "normal",
      });
    }
    dispatch({ type: set_indexed_tracks, payload: indexedTracks });
    dispatch({ type: set_np_tracks, payload: targetedTracks });
  } catch (error) {
    errorReporter(error, "3124");
    return null;
  }
};

/**
 *  Setup %nowPlayingTracks, but starting with `%currentTrack`
 *
 * ---
 * - Slice %mediaFiles into `beforeCurrentTracks` and `afterCurrentTracks`
 * - Create a queue of `[...afterCurrentTracks, ...beforeCurrentTracks]`
 * to make `%nowPlayingTracks` "feels" like `%mediaFiles`,
 * tho this list starts with the `currentTrack` instead of `%mediaFiles[0]`
 * //- then remove `currentTrack` above out the list to avoid duplication
 */
export const displayCurrentTracks = (targetedTracks?: TrackProps[]) => async (
  dispatch: Dispatch<SetNowPlayingTracksAction>
) => {
  let {
    media: { nowPlayingTracks },
    playback: { currentTrack },
  }: dRedux = store.getState();

  const _targetedTracks = targetedTracks || nowPlayingTracks;

  const currentPos = R.indexOf(currentTrack.id, R.pluck("id")(_targetedTracks));
  let beforeCurrentTracks = R.slice(
    0,
    currentPos,
    _targetedTracks
  ) as TrackProps[];
  console.log("BC: ", beforeCurrentTracks.length);
  let afterCurrentTracks = R.slice(
    currentPos + 1,
    _targetedTracks.length,
    _targetedTracks
  ) as TrackProps[];
  console.log("AC: ", afterCurrentTracks.length);
  const currentTracks = [
    currentTrack,
    ...afterCurrentTracks,
    ...beforeCurrentTracks,
  ];
  return currentTracks;
  // dispatch({ type: "set_np_tracks", payload: currentTracks });
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
