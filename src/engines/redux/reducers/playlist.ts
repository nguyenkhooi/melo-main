import {
	add_to_playlist,
	create_playlist,
	delete_playlist,
	dPlaylistActions,
	PlaylistState,
	remove_from_playlist,
	rename_playlist
} from "../actions";

//* Object of playlist folders; starting with Favourites
const INITIAL_STATE: PlaylistState = { Favourites: [] };

export default function (state = INITIAL_STATE, action: dPlaylistActions) {
  switch (action.type) {
    case create_playlist:
      return { ...state, [action.payload]: [] };
    case add_to_playlist: {
      let { title, song } = action.payload;
      let updatedList = { ...state };
      updatedList[title].push(song);
      return { ...updatedList };
    }
    case remove_from_playlist: {
      let playlists = { ...state };
      let { playlistTitle } = action.payload;
      let index = playlists[playlistTitle].findIndex(
        (item) =>
          item.title === action.payload.trackTitle &&
          item.artist === action.payload.artist
      );
      if (index !== -1) playlists[playlistTitle].splice(index, 1);
      return { ...playlists };
    }
    case rename_playlist: {
      let { oldTitle, newTitle } = action.payload;
      let newList = { ...state };
      newList[newTitle] = newList[oldTitle];
      delete newList[oldTitle];
      return { ...newList };
    }
    case delete_playlist: {
      let listCopy = { ...state };
      delete listCopy[action.payload];
      return { ...listCopy };
    }
    default:
      return state;
  }
}
