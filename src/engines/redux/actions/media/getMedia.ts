import { fn } from "engines/functions";
import MusicFiles from "react-native-get-music-files";
import { Dispatch } from "redux";
import RNFetchBlob from "rn-fetch-blob";
import { store } from "store";
import {
  checkStoragePermissions,
  cleanupMedia,
  dTracks,
  errorReporter,
  IS_ANDROID,
  trackID,
} from "utils";
import {
  dRedux,
  GetMediaAction,
  get_media_order,
  GetMediaOrderAction,
  NowPlayingTracksAction,
  get_media_success,
  now_playing_tracks,
} from "../../types";

// import MusicFiles from 'react-native-get-music-files-v3dev-test';

const __MEDIA = [
  {
    id: "1111",
    url:
      "https://public.bn.files.1drv.com/y4mWAjfXUaX3MzwmEcxUB45BbNjTNY558YqL-Lth8YYXnNiH7XTGLR69Ydy4TsqL0gN2bx34zMkdhMPPt-gyHDtlTEcyqkfMV2ZJ8MlIPaSHzz_mqg29k_bth1jHZ1gNWLSw3TTh6of7D6oEbXorGaCdgHTvYmKNxoWRyEwNi6WoeVq_s0TuvGTB3Yb1oCQ0aAS91uI01S7ztLNhEDJ1aWAWYtLChQXyjUSHgNyUZpU7W4?",
    title: "Better Man",
    artist: "Westlife",
    artwork:
      "https://cms-assets.tutsplus.com/uploads/users/114/posts/34296/image/Final-image.jpg",
    duration: 197,
  },
  {
    id: "2222",
    url:
      "https://public.bn.files.1drv.com/y4muaFchxLV7UzJJFJbRAXkEMTEZRLiZKJOXipitiTVmR9-acUOhv8K8LDQkDfVvrbJedhAIo77ER_V_xU2Yg2Qyuoq6qRcLpXf5hzNm61gqpZo4ELdZWvrDH5mJcR7LWslXCI6HIsiiZovn-tkRb0jLvQsSWdZ2MhW5Q-w6Od7Tj7Eo0pvYuP9dDHXuGLHSp8DxpG6YgHFV-Xrv-iX9SBQB4kEfC6-ZXyHokH-dsHBDoA?",
    title: "#Catena",
    artist: "Toc Tien",
    artwork:
      "https://images-na.ssl-images-amazon.com/images/I/717VbeZb0bL._AC_SL1500_.jpg",
    duration: 269,
  },
  {
    id: "3333",
    url:
      "https://public.bn.files.1drv.com/y4mnV7bTKO72j_Xgu4x9Cu-bXWhPv_pDvZE4dPN_QNgAnFgfCCEmWxDkXZ9grjds-Ww4WuQzFTq1FFdePZbzwKsLcCbCH_-kDhW2KQ3mQ1WMchVmoB0sRfOPkl7yJiZz0iY8pw6I_luykIef4eYpWdKRsI5QlU1sqkRdwcmpslC_4jmcRzHFZ5nJiXdIMsxf6OLCRthzHY8JMW8w2xjvGE0tpnJQV7ISQC2zgH8dzTNppU?",
    title: "Di theo anh",
    artist: "Mar D ",
    artwork:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/59dd3a65996579.5b073c5b3628d.gif",
    duration: 211,
  },
  {
    id: "4444",
    url:
      "https://public.bn.files.1drv.com/y4mxLaYyJngI9Lew4xbyeTr2733OCyaxvgYq7MB3aAXDzUxc_OpwaR7NCyANb-uewWyOUt1etCvieWzsRw0zqIGHtNXpYz2-Rx9Dy5TQ2uF6hlhqe6M5nb4RuvG1r4HRl5YNbL_KTPWijqp2KAX1-GGAiFhV1hVzhzRd43RMCFOq1AywpjEODFdbOaIKLj3h9NS2b1lShUV9nXncK-V9Un2-G6x__Wf1yO-5HBwQyVZDr4?",
    title: "Prism",
    artist: "Claris",
    artwork:
      "https://www.digitalmusicnews.com/wp-content/uploads/2020/04/DaBaby-Blame-It-On-Baby.jpg",
    duration: 276,
  },
];

const options = {
  cover: false,
  batchSize: 0,
  batchNumber: 0,
  sortBy: "TITLE",
  sortOrder: "ASC",
  title: true,
  artist: true,
  album: true,
  duration: true,
  blured: false,
};

/**
 * Get media from device then
 * distribute them to `now_playing_tracks` and `mediaFiles`
 */
export const getMedia = () => async (
  dispatch: Dispatch<
    GetMediaAction | NowPlayingTracksAction | GetMediaOrderAction
  >
) => {
  try {
    // let granted = await checkStoragePermissionsOG();
    // if (!granted) await getStoragePermission();

    let granted = await checkStoragePermissions();
    let { media }: dRedux = store.getState();
    console.log("granted: ", media.mediaLoaded && granted);
    if (media.mediaLoaded && granted) {
      let tracks = await getMediaWithCovers();
      const trackIDs = fn.js.vLookup(tracks, "id") as trackID[];
      dispatch({ type: "get_media_success", payload: tracks });
      /** If nowPlayingTracks = []:
       *  - no queue
       *  - 1st time app startup
       */
      if (media.nowPlayingIDs == []) {
        dispatch({ type: "now_playing_tracks", payload: trackIDs });
      }
    } else {
      console.log("New coming...");
      // let results = await MusicFiles.getAll(options);
      /** Temporary set __MEDIA for ios since it doesn't have local db */
      let tracks: dTracks = IS_ANDROID
        ? cleanupMedia(await MusicFiles.getAll(options))
        : __MEDIA;
      const trackIDs = fn.js.vLookup(tracks, "id") as trackID[];

      dispatch({ type: get_media_success, payload: tracks });
      dispatch({ type: now_playing_tracks, payload: trackIDs });
      dispatch({ type: get_media_order, payload: trackIDs });
      let trackWithCovers = await getMediaWithCovers();
      const trackwCoversIDs = fn.js.vLookup(tracks, "id") as trackID[];
      dispatch({ type: get_media_success, payload: trackWithCovers });
      dispatch({ type: now_playing_tracks, payload: trackwCoversIDs });
      dispatch({ type: get_media_order, payload: trackwCoversIDs });
    }
  } catch (e) {
    errorReporter(e);
  }
};

const getMediaWithCovers = async () => {
  const coverFolder = RNFetchBlob.fs.dirs.DocumentDir + "/.melo";
  let results = await MusicFiles.getAll({
    ...options,
    cover: true,
    coverFolder,
  });
  return cleanupMedia(results);
};
