import { dLyricsActions, dLyricsState } from "../types";

const INITIAL_STATE: dLyricsState = { currentLyrics: "", error: false };

export function lyrics(
  state: dLyricsState = INITIAL_STATE,
  action: dLyricsActions
) {
  switch (action.type) {
    case "get_lyrics_success":
      return { currentLyrics: action.payload, error: false };
    case "get_lyrics_fail":
      return { currentLyrics: "", error: true };
    case "reset_lyrics":
      return { currentLyrics: "", error: false };
    default:
      return state;
  }
}
