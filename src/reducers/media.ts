const INITIAL_STATE = { mediaFiles: [], mediaLoaded: false, currentList: [] };

const get_media_success = "get_media_success";
const rename_track = "rename_track";
const delete_track = "delete_track";

export type enumTrackActions =
  | "get_media_success"
  | "rename_track"
  | "delete_track";

export default function (
  state = INITIAL_STATE,
  action: { type: enumTrackActions; payload: { id: any } }
) {
  switch (action.type) {
    case "get_media_success":
      return { mediaLoaded: true, mediaFiles: action.payload };
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
