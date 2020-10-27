import { TrackProps } from "utils";

export enum PLAYBACK {
  CURRENT_TRACK,
  SET_LOOP,
  SET_SHUFFLE,
}

export enum LOOP {
  ONE = "one",
  ALL = "all",
  OFF = "off",
}

export interface SetCurrentTrackAction {
  type: "PLAYBACK.CURRENT_TRACK";
  payload: TrackProps;
}

export interface ToggleLoopAction {
  type: "PLAYBACK.SET_LOOP";
  payload: LOOP;
}

export interface ToggleShuffleAction {
  type: "PLAYBACK.SET_SHUFFLE";
  payload: boolean;
}

/** ---------------------------------------------------- */
export type dPlaybackState = {
  /**
   * Current Track (likely is currently playing)
   */
  currentTrack: TrackProps;
  /**
   * Is the playback in loop?
   */
  loop: LOOP;

  /**
   * Is the playback in shuffle
   */
  shuffle: boolean;
};

export type dPlaybackActions =
  | ToggleLoopAction
  | SetCurrentTrackAction
  | ToggleShuffleAction;
