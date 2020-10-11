import { trackID, TrackProps } from "utils";

export const get_media_success = "get_media_success";
export const set_loading = "set_loading";
export const now_playing_tracks = "now_playing_tracks";
export const get_media_order = "get_media_order";
export const rename_track = "rename_track";
export const delete_track = "delete_track";
export interface GetMediaAction {
  type: typeof get_media_success;
  payload: TrackProps[];
}

export interface SetLoadingAction {
  type: typeof set_loading;
  payload: boolean;
}

export interface NowPlayingTracksAction {
  type: typeof now_playing_tracks;
  // payload: TrackProps[];
  payload: trackID[];
}

export interface GetMediaOrderAction {
  type: typeof get_media_order;
  // payload: TrackProps[];
  payload: trackID[];
}

export interface RenameTrackAction {
  type: typeof rename_track;
  payload: TrackProps & { title: string; url: string };
}

export interface DeleteTrackAction {
  type: typeof delete_track;
  payload: TrackProps;
}

/** ---------------------------------------------------- */
export interface dMediaState {
  /**
   * Device's media tracklist,
   * the ONLY track list inherited by TrackPlayer
   */
  mediaFiles: TrackProps[];
  /**
   * Is media loaded?
   */
  mediaLoaded: boolean;
  /**
   * OG mediaIDs list,
   * used for shuffling og order of mediaFiles
   */
  mediaIDs: trackID[];
  /**
   * Now playing tracklist,
   * which is the REFERENCE list,
   * and is not inherited by TrackPlayer
   *
   * - playback fn depends on this list
   * to skip to appropiate track
   */
  nowPlayingIDs: trackID[];
}

export type dMediaActions =
  | GetMediaAction
  | SetLoadingAction
  | GetMediaOrderAction
  | NowPlayingTracksAction
  | RenameTrackAction
  | DeleteTrackAction;
