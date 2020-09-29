import { TrackProps } from "utils";

export const current_track = "current_track";
export const set_loop = "set_loop";
export const set_shuffle = "set_shuffle";

export interface SetCurrentTrackAction {
  type: typeof current_track;
  payload: TrackProps;
}

export interface ToggleLoopAction {
  type: typeof set_loop;
  payload: boolean;
}

export interface ToggleShuffleAction {
  type: typeof set_shuffle;
  payload: boolean;
}

/** ---------------------------------------------------- */
export interface dPlaybackState {
  /**
   * Current Track (likely is currently playing)
   */
  currentTrack: TrackProps;
  /**
   * Is the playback in loop?
   */
  loop: boolean;

  /**
   * Is the playback in shuffle
   */
  shuffle: boolean;
}

export type dPlaybackActions =
  | ToggleLoopAction
  | SetCurrentTrackAction
  | ToggleShuffleAction;
