// type dPlaylistActions =

import { TrackProps } from "utils";
import {
  AddToPlaylistAction,
  add_to_playlist,
  CreatePlaylistAction,
  create_playlist,
  DeletePlaylistAction,
  delete_playlist,
  RemoveFromPlaylistAction,
  remove_from_playlist,
  RenamePlaylistAction,
  rename_playlist
} from "../types";

export function createPlaylist(title: string): CreatePlaylistAction {
  return { type: create_playlist, payload: title };
}

export function addToPlaylist(
  title: string,
  song: TrackProps
): AddToPlaylistAction {
  return { type: add_to_playlist, payload: { title, song } };
}

export function renamePlaylist(oldTitle, newTitle): RenamePlaylistAction {
  return { type: rename_playlist, payload: { oldTitle, newTitle } };
}

export function deletePlaylist(title: string): DeletePlaylistAction {
  return { type: delete_playlist, payload: title };
}

export function removeFromPlaylist(
  playlistTitle,
  { trackTitle, artist }
): RemoveFromPlaylistAction {
  return {
    type: remove_from_playlist,
    payload: { playlistTitle, trackTitle, artist },
  };
}
