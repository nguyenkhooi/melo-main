import { fn } from "engines/functions";
import R from "ramda";
import MusicFiles from "react-native-get-music-files";
import TrackPlayer from "react-native-track-player";
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
  TrackProps,
} from "utils";
import {
  dRedux,
  GetMediaAction,
  GetMediaOrderAction,
  get_media_order,
  get_media_success,
  NowPlayingTracksAction,
  now_playing_tracks,
  SetLoadingAction,
  set_loading,
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

export const setLoading = (isLoading: boolean): SetLoadingAction => {
  return { type: "set_loading", payload: isLoading };
};

/**
 * Get media from device then
 * distribute them to `now_playing_tracks` and `mediaFiles`
 * ---
 *
 * @version 0.10.12 *(Update correct queueTracks in "U_RETURN_TO_THE_APP" )*
 * @author nguyenkhooi
 *
 * @description
 * - Scenarios to use getMedia()
 *  - **U_FIRST_USE_THE_APP** (User first opens the app):
 *    - states: `{mediaFiles: [], nowPlayingIDs: [], currentTrack: null}`
 *    - getMedia() -> `{mediaFiles: track[](og), nowPlayingIDs: trackID[](og), currentTrack: null}`
 *    - reset and fill TrackPlayer -> `TP.queue: track[](og)`
 *  !- **U_RETURN_TO_THE_APP** (User returns to the app):
 *    - states: `{mediaFiles: track[](og), nowPlayingIDs: trackID[](og), currentTrack: null}`;
 *    - getMedia() ->
 *    ?- getMedia() now should **add** to `mediaFiles`, instead of replacing it
 */
export const getMedia = (isManual?: "manual") => async (
  dispatch: Dispatch<
    | GetMediaAction
    | NowPlayingTracksAction
    | GetMediaOrderAction
    | SetLoadingAction
  >
) => {
  try {
    // let granted = await checkStoragePermissionsOG();
    // if (!granted) await getStoragePermission();

    let granted = await checkStoragePermissions();
    let {
      media: { mediaFiles, mediaLoaded, nowPlayingIDs },
      playback: { currentTrack },
    }: dRedux = store.getState();

    /** set loading to true */
    // dispatch({ type: set_loading, payload: true });

    console.log("U_RETURN_TO_THE_APP: ", mediaFiles !== [] && granted);
    const U_FIRST_USE_THE_APP = !(mediaFiles !== [] && granted);
    const U_RETURN_TO_THE_APP = mediaFiles !== [] && granted && !!!isManual;
    const U_REFRESH_THE_APP = !!isManual;

    //* CASE: FIRST TIME USER OPENS THE APP
    if (U_FIRST_USE_THE_APP) {
      console.log("New coming...");
      // let results = await MusicFiles.getAll(options);
      /** Temporary set __MEDIA for ios since it doesn't have local db */
      let tracks: dTracks = IS_ANDROID
        ? cleanupMedia(await MusicFiles.getAll(options))
        : __MEDIA;
      const trackIDs = fn.js.vLookup(tracks, "id") as trackID[];
      console.log("adding to TP...");
      await TrackPlayer.add([...tracks]);
      dispatch({ type: get_media_success, payload: tracks });
      dispatch({ type: now_playing_tracks, payload: trackIDs });
      dispatch({ type: get_media_order, payload: trackIDs });

      /**
       * Now get tracks' covers and replace `mediaFiles` with it.
       */
      let trackWithCovers = await getMediaWithCovers();
      dispatch({ type: get_media_success, payload: trackWithCovers });
      dispatch({ type: set_loading, payload: false });
    }

    //* CASE: WHEN USER RETURNS TO THE APP
    if (U_RETURN_TO_THE_APP) {
      /**
       * If `currentTrack` exists, add that track to TP first
       *
       * ---
       * - Why? if user wants to play it,
       * they don't have to wait for the whole `tracks` to load
       */
      if (!!currentTrack && currentTrack.id !== "000") {
        await TrackPlayer.add(currentTrack);
        console.log("add currentTrack to TP...: ");
      }

      /**
       * Now, we start getting tracks from device
       *
       * ---
       * - Slice deviceTracks into `beforeCurrentTracks` and `afterCurrentTracks`
       * - Create a queue of `[...afterCurrentTracks, ...beforeCurrentTracks]` to make `nowPlayingTracks` "feels" like `deviceTracks`, tho this list starts with the `currentTrack` instead of `deviceTracks[0]`
       * //- then remove `currentTrack` above out the list to avoid duplication
       */
      let deviceTracks = await getMediaWithCovers();
      const currentPos = R.indexOf(
        currentTrack.id,
        R.pluck("id")(deviceTracks)
      );
      let beforeCurrentTracks = R.slice(
        0,
        currentPos,
        deviceTracks
      ) as TrackProps[];
      console.log("BC: ", beforeCurrentTracks.length);
      let afterCurrentTracks = R.slice(
        currentPos + 1,
        deviceTracks.length,
        deviceTracks
      ) as TrackProps[];
      console.log("AC: ", afterCurrentTracks.length);
      const queueTracks = [...afterCurrentTracks, ...beforeCurrentTracks];
      // let tracks = R.reject((track) => track.id === currentTrack.id, [
      //   ...deviceTracks,
      // ]);
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add(queueTracks);
      const trackIDs = fn.js.vLookup(deviceTracks, "id") as trackID[];
      console.log(
        "add TP wo currentTrack...: ",
        deviceTracks.length + " - " + queueTracks.length
      );

      /**
       * If `nowPlayingTracks` = []:
       *  - no queue
       *  - 1st time app startup
       */
      if (nowPlayingIDs == []) {
        dispatch({ type: now_playing_tracks, payload: trackIDs });
      }
      dispatch({ type: get_media_success, payload: deviceTracks });
      dispatch({ type: get_media_order, payload: trackIDs });
      dispatch({ type: set_loading, payload: false });
    }

    if (U_REFRESH_THE_APP) {
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
