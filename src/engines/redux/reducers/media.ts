import { dMediaActions, dMediaState } from "../types";

const INITIAL_STATE: dMediaState = {
  mediaFiles: [],
  mediaLoaded: false,
  currentTrackList: [],
};

export function media(
  state: dMediaState = INITIAL_STATE,
  action: dMediaActions
) {
  switch (action.type) {
    case "get_media_success":
      return { mediaLoaded: true, mediaFiles: action.payload };
    case "current_track_list":
      return { ...state, currentTrackList: action.payload };
    case "rename_track": {
      let mediaArr = [...state.mediaFiles];
      let index = mediaArr.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) mediaArr[index] = action.payload;
      return { ...state, mediaFiles: mediaArr };
    }
    case "delete_track": {
      let mediaArray = [...state.mediaFiles];
      let i = mediaArray.findIndex((item) => item.id === action.payload.id);
      if (i !== -1) {
        mediaArray.splice(i, 1);
        mediaArray = mediaArray.map((val, i) => {
          return { ...val, index: i };
        });
      }
      return { ...state, mediaFiles: mediaArray };
    }
    default:
      return state;
  }
}
