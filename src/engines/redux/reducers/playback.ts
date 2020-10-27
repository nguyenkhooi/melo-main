import { dPlaybackActions, dPlaybackState, LOOP, PLAYBACK } from "../types";

const INITIAL_STATE: dPlaybackState = {
  currentTrack: {
    /** Assuming index is the og position of this track in mediaFiles */
    // index: 0,
    position: "dasd",
    id: "000",
    title: "Melo",
    artist: "Khoi Tran",
    duration: 0,
    artwork: null,
    url: "",
  },
  loop: LOOP.ALL,
  shuffle: false,
};

export function playback(
  state: dPlaybackState = INITIAL_STATE,
  action: dPlaybackActions
): dPlaybackState {
  switch (action.type) {
    case "PLAYBACK.CURRENT_TRACK":
      return { ...state, currentTrack: action.payload };
    case "PLAYBACK.SET_LOOP":
      return { ...state, loop: action.payload };
    case "PLAYBACK.SET_SHUFFLE":
      return { ...state, shuffle: action.payload };
    default:
      return state;
  }
}
