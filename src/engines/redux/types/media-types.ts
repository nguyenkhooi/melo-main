import { dTracks, TrackProps } from "utils";

export const get_media_success = "get_media_success";
export const current_track_list = "current_track_list";
export const rename_track = "rename_track";
export const delete_track = "delete_track";

export interface GetMediaAction {
  type: typeof get_media_success;
  payload: dTracks;
}

export interface CurrentTrackAction {
  type: typeof current_track_list;
  payload: dTracks;
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
   * List of device's media files
   */
  mediaFiles: dTracks;
  /**
   * Is media loaded?
   */
  mediaLoaded: boolean;
  /**
   * Current Track List. When app is 1st started,
   * currentTrackList == mediaFiles
   */
  currentTrackList: dTracks;
}

export type dMediaActions =
  | GetMediaAction
  | CurrentTrackAction
  | RenameTrackAction
  | DeleteTrackAction;
