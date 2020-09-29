import { dPlayerAction, dPlayerState } from "../types";

const INITIAL_STATE: dPlayerState = { isPlaying: false };

export function player(
  state: dPlayerState = INITIAL_STATE,
  action: dPlayerAction
) {
  switch (action.type) {
    case "set_playback":
      return { ...state, isPlaying: action.payload };
    default:
      return state;
  }
}
