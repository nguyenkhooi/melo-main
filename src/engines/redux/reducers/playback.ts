import {
  current_track,
  dPlaybackActions,
  dPlaybackState,
  set_loop,
  set_shuffle
} from "../types";

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
  loop: false,
  shuffle: false,
};

export function playback(
  state: dPlaybackState = INITIAL_STATE,
  action: dPlaybackActions
): dPlaybackState {
  switch (action.type) {
    case current_track:
      return { ...state, currentTrack: action.payload };
    case set_loop:
      return { ...state, loop: action.payload };
    case set_shuffle:
      return { ...state, shuffle: action.payload };
    default:
      return state;
  }
}
