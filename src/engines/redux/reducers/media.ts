import {
  delete_track,
  dMediaActions,
  dMediaState,
  get_media_order,
  get_media_success,
  now_playing_tracks,
  rename_track,
} from "../types";

const INITIAL_STATE: dMediaState = {
  mediaFiles: [],
  mediaLoaded: false,
  mediaIDs: [],
  nowPlayingIDs: [],
};

export function media(
  state: dMediaState = INITIAL_STATE,
  action: dMediaActions
) {
  switch (action.type) {
    case get_media_success:
      return {
        ...state,
        mediaLoaded: true,
        mediaFiles: action.payload,
      } as dMediaState;
    case now_playing_tracks:
      return { ...state, nowPlayingIDs: action.payload };
    case get_media_order:
      return { ...state, mediaIDs: action.payload };
    case rename_track: {
      let mediaArr = [...state.mediaFiles];
      let index = mediaArr.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) mediaArr[index] = action.payload;
      return { ...state, mediaFiles: mediaArr };
    }
    case delete_track: {
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
