import { dTracks, TrackProps } from "utils";

export const create_playlist = "create_playlist";
export const add_to_playlist = "add_to_playlist";
export const rename_playlist = "rename_playlist";
export const delete_playlist = "delete_playlist";
export const remove_from_playlist = "remove_from_playlist";

type dPlaylistTitle = string;

export interface CreatePlaylistAction {
  type: typeof create_playlist;
  payload: dPlaylistTitle;
}

export interface AddToPlaylistAction {
  type: typeof add_to_playlist;
  payload: { title: dPlaylistTitle; song: TrackProps };
}

export interface RenamePlaylistAction {
  type: typeof rename_playlist;
  payload: { oldTitle: dPlaylistTitle; newTitle: dPlaylistTitle };
}
export interface DeletePlaylistAction {
  type: typeof delete_playlist;
  payload: dPlaylistTitle;
}
export interface RemoveFromPlaylistAction {
  type: typeof remove_from_playlist;
  payload: {
    playlistTitle: dPlaylistTitle;
    trackTitle: string;
    artist: string;
  };
}

export interface PlaylistState {
  Favorites: dTracks;
}

export type dPlaylistActions =
  | CreatePlaylistAction
  | AddToPlaylistAction
  | RenamePlaylistAction
  | DeletePlaylistAction
  | RemoveFromPlaylistAction;
