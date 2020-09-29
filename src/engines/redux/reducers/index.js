//@ts-check
import { combineReducers } from "redux";
import { player } from "./blacklistedPlayback";
import { lyrics } from "./lyrics";
import { media } from "./media";
import { playback } from "./playback";
import { footer } from "./playerFooter";
import { playlists } from "./playlist";
import { settings } from "./settings";
// export { media, footer, playback, player, playlists, settings, lyrics };

export const rootReducer = combineReducers({
  media,
  footer,
  playback,
  player,
  playlists,
  settings,
  lyrics,
});
