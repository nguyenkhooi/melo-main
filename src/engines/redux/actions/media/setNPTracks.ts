import { TrackPlaya } from "components";
import { Dispatch } from "redux";
import { errorReporter, TrackProps } from "utils";
import {
    SetIndexedTracksAction,
    SetNowPlayingTracksAction,
    set_indexed_tracks,
    set_np_tracks
} from "../../types";

/**
 * Set a `nowPlayingTracks` list, representing Playa's queue for the UI.
 *
 * ---
 * - Think of users playing specific albums, artists, playlists...
 *
 * @version 0.10.13 *Created*
 * @author nguyenkhooi
 */
export const buildNowPlayingTracks = (
  targetedTracks: TrackProps[],
  indexedTracks: TrackProps[]
) => async (
  dispatch: Dispatch<SetNowPlayingTracksAction | SetIndexedTracksAction>
) => {
  try {
    let thisTrackPlaya = TrackPlaya.getInstance();
    thisTrackPlaya.setPlaylist(targetedTracks);
    dispatch({ type: set_indexed_tracks, payload: indexedTracks });
    return dispatch({ type: set_np_tracks, payload: targetedTracks });
  } catch (error) {
    errorReporter(error, "3121311210");
    return null;
  }
};
