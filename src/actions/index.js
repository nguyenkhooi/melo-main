export * from "./getMedia";
export * from "./playerFooter";
export * from "./playback";
export * from "./playlist";
export * from "./fileSystem";
export * from "./settings";
export * from "./getLyrics";

import * as media from "./getMedia";
import * as playerFooter from "./playerFooter";
import * as playback from "./playback";
import * as playlist from "./playlist";
import * as fileSystem from "./fileSystem";
import * as settings from "./settings";
import * as getLyrics from "./getLyrics";

export const actionss = {
  ...media,
  ...playerFooter,
  ...playback,
  ...playlist,
  ...fileSystem,
  ...settings,
  ...getLyrics,
};
