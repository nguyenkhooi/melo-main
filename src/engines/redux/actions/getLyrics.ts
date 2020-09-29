import { getLyrics } from "genius-lyrics-api";
import { Dispatch } from "redux";
import {
  GetLyricsFailAction,
  GetLyricsSuccessAction,
  ResetLyricsAction
} from "../types";
// import { geniusApiKey } from "../constants/keys";

const geniusApiKey =
  "w5S_StCJy0VZAYJ5CTsSYrXTtLd6F2diT5pG6Tsi6-P5UdDkr48Ce5_gfK60gW92hUny8JV3aCsmJ_33QAwDEA";

//@ts-ignore
export const fetchLyrics = ({ title, artist }) => async (
  dispatch: Dispatch<
    GetLyricsFailAction | GetLyricsSuccessAction | ResetLyricsAction
  >
) => {
  const config = { title, artist, optimizeQuery: true, apiKey: geniusApiKey };
  try {
    let lyrics = await getLyrics(config);
    if (!lyrics) return dispatch({ type: "get_lyrics_fail" });
    dispatch({
      type: "get_lyrics_success",
      payload: { title, artist, lyrics },
    });
  } catch (e) {
    dispatch({ type: "get_lyrics_fail" });
  }
};

export const resetLyrics = () => {
  return { type: "reset_lyrics" };
};
