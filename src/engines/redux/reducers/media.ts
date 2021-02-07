import {
  delete_track,
  dMediaActions,
  dMediaState,
  get_media_order,
  get_media_success,
  rename_track,
  set_indexed_tracks,
  set_loading,
  set_np_tracks,
} from "../types";

const INITIAL_STATE: dMediaState = {
  mediaFiles: [],
  mediaLoaded: false,
  mediaIDs: [],
  indexedTracks: [],
  nowPlayingTracks: [],
};

export function media(
  state: dMediaState = INITIAL_STATE,
  action: dMediaActions
) {
  switch (action.type) {
    case set_loading:
      state.mediaLoaded = !action.payload;
      return state;
      // return {
      //   ...state,
      //   mediaLoaded: !action.payload,
      // };
      break;
    case get_media_success:
      state.mediaLoaded = true;
      state.mediaFiles = action.payload;
      return state;
      // return {
      //   ...state,
      //   mediaLoaded: true,
      //   mediaFiles: action.payload,
      // } as dMediaState;
      break;
    case get_media_order:
      state.mediaIDs = action.payload;
      return state;
      // return { ...state, mediaIDs: action.payload };
      break;
    case rename_track: {
      let mediaArr = [...state.mediaFiles];
      let index = mediaArr.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) mediaArr[index] = action.payload;

      state.mediaFiles = mediaArr;
      return state;
      // return { ...state, mediaFiles: mediaArr };
      break;
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
      state.mediaFiles = mediaArray;
      return state;
      // return { ...state, mediaFiles: mediaArray };
      break;
    }
    case set_indexed_tracks:
      state.indexedTracks = action.payload;
      return state;
      // return { ...state, indexedTracks: action.payload } as dMediaState;

    case set_np_tracks:
      state.nowPlayingTracks = action.payload;
      return state;
      // return { ...state, nowPlayingTracks: action.payload } as dMediaState;
      break;
    default:
      return state;
  }
}
