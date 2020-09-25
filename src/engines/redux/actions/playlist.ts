// type dPlaylistActions =

import { TrackProps } from "utils";

export const  create_playlist = "create_playlist";
export const  add_to_playlist = "add_to_playlist";
export const  rename_playlist = "rename_playlist";
export const  delete_playlist = "delete_playlist";
export const  remove_from_playlist = "remove_from_playlist";

type dPlaylistTitle = string;

interface CreatePlaylistAction {
  type: typeof create_playlist;
  payload: dPlaylistTitle;
}

interface AddToPlaylistAction {
  type: typeof add_to_playlist;
  payload: { title: dPlaylistTitle; song: TrackProps };
}

interface RenamePlaylistAction {
  type: typeof rename_playlist;
  payload: { oldTitle: dPlaylistTitle; newTitle: dPlaylistTitle };
}
interface DeletePlaylistAction {
  type: typeof delete_playlist;
  payload: dPlaylistTitle;
}
interface RemoveFromPlaylistAction {
  type: typeof remove_from_playlist;
  payload: {
    playlistTitle: dPlaylistTitle;
    trackTitle: string;
    artist: string;
  };
}

export interface PlaylistState {
  Favourites: TrackProps[] | undefined[];
}

export type dPlaylistActions =
  | CreatePlaylistAction
  | AddToPlaylistAction
  | RenamePlaylistAction
  | DeletePlaylistAction
  | RemoveFromPlaylistAction;

export const createPlaylist = (title: string): CreatePlaylistAction => {
  return { type: create_playlist, payload: title };
};

export const addToPlaylist = (
  title: string,
  song: TrackProps
): AddToPlaylistAction => {
  return { type: add_to_playlist, payload: { title, song } };
};

export const renamePlaylist = (oldTitle, newTitle): RenamePlaylistAction => {
  return { type: rename_playlist, payload: { oldTitle, newTitle } };
};

export const deletePlaylist = (title: string): DeletePlaylistAction => {
  return { type: delete_playlist, payload: title };
};

export const removeFromPlaylist = (
  playlistTitle,
  { trackTitle, artist }
): RemoveFromPlaylistAction => {
  return {
    type: remove_from_playlist,
    payload: { playlistTitle, trackTitle, artist },
  };
};
