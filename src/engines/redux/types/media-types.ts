import { trackID, TrackProps } from "utils";

export const get_media_success = "get_media_success";
export const set_loading = "set_loading";
/**
 * @deprecated soon
 */
export const now_playing_tracks = "now_playing_tracks";
export const get_media_order = "get_media_order";
export const rename_track = "rename_track";
export const delete_track = "delete_track";
export const set_indexed_tracks = "set_indexed_tracks";
export const set_np_tracks = "set_np_tracks";
export interface GetMediaAction {
  type: typeof get_media_success;
  payload: TrackProps[];
}

export interface SetLoadingAction {
  type: typeof set_loading;
  payload: boolean;
}

/**
 * @deprecated soon
 */
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

export interface SetIndexedTracksAction {
  type: typeof set_indexed_tracks;
  payload: TrackProps[];
}

export interface SetNowPlayingTracksAction {
  type: typeof set_np_tracks;
  payload: TrackProps[];
}

/** ---------------------------------------------------- */
export interface dMediaState {
  /**
   * Device's media tracklist,
   * //the ONLY track list inherited by TrackPlayer
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

  /**
   * List of tracks, in original order
   *
   * ---
   * - Use to quickly return `npTracks` when `shuffle = false`
   */
  indexedTracks: TrackProps[];

  /**
   * List of Now Playing tracks
   *
   * ---
   * - ...
   */
  nowPlayingTracks: TrackProps[];
}

export type dMediaActions =
  | GetMediaAction
  | SetLoadingAction
  | GetMediaOrderAction
  | NowPlayingTracksAction
  | RenameTrackAction
  | DeleteTrackAction
  | SetIndexedTracksAction
  | SetNowPlayingTracksAction;
