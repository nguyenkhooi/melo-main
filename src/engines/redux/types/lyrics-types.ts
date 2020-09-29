
export const get_lyrics_success = "get_lyrics_success";
export const get_lyrics_fail = "get_lyrics_fail";
export const reset_lyrics = "reset_lyrics";

export interface GetLyricsSuccessAction {
  type: typeof get_lyrics_success;
  payload: { title: string; artist: string; lyrics: string };
}

export interface GetLyricsFailAction {
  type: typeof get_lyrics_fail;
}

export interface ResetLyricsAction {
  type: typeof reset_lyrics;
}

/** ---------------------------------------------------- */
export interface dLyricsState {
  /**
   * Current Lyrics
   */
  currentLyrics: string;
  /**
   * Is lyrics found?
   */
  error: boolean;
}

export type dLyricsActions =
  | GetLyricsFailAction
  | GetLyricsSuccessAction
  | ResetLyricsAction;
