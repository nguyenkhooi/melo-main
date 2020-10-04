import { dTracks, TrackProps } from "utils";

export const get_media_success = "get_media_success";
export const now_playing_tracks = "now_playing_tracks";
export const rename_track = "rename_track";
export const delete_track = "delete_track";

export interface GetMediaAction {
  type: typeof get_media_success;
  payload: dTracks;
}

export interface NowPlayingTracksAction {
  type: typeof now_playing_tracks;
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
   * List of now playing tracks
   */
  nowPlayingTracks: dTracks;
}

export type dMediaActions =
  | GetMediaAction
  | NowPlayingTracksAction
  | RenameTrackAction
  | DeleteTrackAction;
