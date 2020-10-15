import { TrackPlaya } from "components";
import R from "ramda";
import MusicFiles from "react-native-get-music-files";
import { Dispatch } from "redux";
import RNFetchBlob from "rn-fetch-blob";
import { store } from "store";
import {
  checkStoragePermissions,
  cleanupMedia,
  errorReporter,
  IS_ANDROID,
  TrackProps
} from "utils";
import {
  current_track,
  dRedux,
  GetMediaAction,
  get_media_success,
  SetIndexedTracksAction,
  SetLoadingAction,
  SetNowPlayingTracksAction,
  set_indexed_tracks,
  set_loading,
  set_np_tracks
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
 * distribute them to `np_tracks`, `indexed_tracks`, and `mediaFiles`
 * ---
 *
 * @version 0.10.14
 * - *(mediaFiles === [] -> !!!mediaFiles[0])*
 * - *(Update logic in `>U_RETURN_TO_APP` to improve loading time)*
 * - *(Build logic for `>U_REFRESH_APP` to get recently added tracks from device)*
 * @author nguyenkhooi
 * ---
 * @description
 * - Scenarios to use getMedia(_)
 *  - **U_FIRST_USE_THE_APP** (User first opens the app):
 *    - states: `{%mediaFiles: [], %nowPlayingTracks: [], %currentTrack: null}`
 *    - getMedia(_) -> `{%mediaFiles: track[](og), %nowPlayingTracks: track[](og), %currentTrack: null}`
 *    - reset and fill Playa -> `Playa.queue: track[](og)`
 *  - **U_RETURN_TO_THE_APP** (User returns to the app):
 *    - states: `{%mediaFiles: track[](og), %nowPlayingTracks: track[](og), %currentTrack: null}`;
 *    - getMedia(_) ->
 *    ?- getMedia(_) now should **add** to `%mediaFiles`, instead of replacing it
 */
export const getMedia = (isManual?: "manual") => async (
  dispatch: Dispatch<
    | GetMediaAction
    | SetNowPlayingTracksAction
    | SetIndexedTracksAction
    //// | GetMediaOrderAction
    | SetLoadingAction
  >
) => {
  const thisTrackPlaya = TrackPlaya.getInstance();
  try {
    // let granted = await checkStoragePermissionsOG();
    // if (!granted) await getStoragePermission();

    let granted = await checkStoragePermissions();
    let {
      media: { mediaFiles, nowPlayingTracks },
      playback: { currentTrack },
    }: dRedux = store.getState();
    const noCurrentTrack =
      (!!currentTrack && currentTrack.id === "000") || !!!currentTrack;
    /** set loading to true */
    // dispatch({ type: set_loading, payload: true });
    console.log(
      "Granted should be true by now. Getting media...",
      `${!!mediaFiles[0] ? "have %mediaFiles" : "no %mediaFiles"}|${
        "have current track: " + noCurrentTrack
      }|${granted ? "granted" : "no granted"}|${
        !!isManual ? "manual" : "no manual"
      }`
    );
    /**
     * *When u first use the app:
     * ---
     * - Get `deviceTracks._` and update `%mediaFiles = deviceTracks._`
     * - `np_tracks, indexed_tracks = %mediaFiles`
     *
     */
    const U_FIRST_USE_THE_APP = granted && !!!mediaFiles[0] && noCurrentTrack;

    /**
     * *When u return to the app,
     * with it being granted, %mediaFiles is fetched,
     * but u haven't chosen any track/track[] to play yet
     * ---
     *
     * -
     */
    const U_RETURN_TO_APP_WO_NP_TRACKS =
      granted && !!mediaFiles[0] && noCurrentTrack && !!!isManual;

    /**
     * *When u return to the app, NORMALLY!! (damnit)
     * ---
     * - If `!!%mediaFiles`, just add them to Playa right away
     * *-> load way faster
     *
     * todo Should we care about >U_RETURN_TO_APP_WO_NP_TRACKS? yessir
     */
    const U_RETURN_TO_APP_NORMALLY =
      granted && !!mediaFiles[0] && !noCurrentTrack && !!!isManual;

    /**
     * *When u hit refresh:
     * ---
     * - Compare `deviceTracks._` w `%mediaFiles` to get new tracks
     * ? put them in "Recently Added" playlist
     */
    const U_REFRESH_THE_APP =
      granted && !!mediaFiles[0] && !noCurrentTrack && !!isManual;

    if (U_FIRST_USE_THE_APP) {
      console.log("U_FIRST_USE_THE_APP");
      // let results = await MusicFiles.getAll(options);
      /** Temporary set __MEDIA for ios since it doesn't have local db */
      let deviceTracks: TrackProps[] = IS_ANDROID
        ? cleanupMedia(await MusicFiles.getAll(options))
        : __MEDIA;
      // // const trackIDs = fn.js.vLookup(deviceTracks, "id") as trackID[];
      console.log("adding to Playa...");
      await thisTrackPlaya.core.add([...deviceTracks]);
      dispatch({ type: get_media_success, payload: deviceTracks });
      dispatch({ type: set_np_tracks, payload: deviceTracks });

      //! replace get_media_order w set_indexed_tracks, but need to see the performance
      // // dispatch({ type: get_media_order, payload: trackIDs });
      dispatch({ type: set_indexed_tracks, payload: deviceTracks });
      dispatch({ type: set_loading, payload: false });

      /**
       * Now get tracks' covers and replace `mediaFiles` with it.
       */
      let trackWithCovers = await getMediaWithCovers();
      dispatch({ type: get_media_success, payload: trackWithCovers });
      dispatch({ type: set_np_tracks, payload: trackWithCovers });
      dispatch({ type: set_indexed_tracks, payload: trackWithCovers });
    }

    if (U_RETURN_TO_APP_WO_NP_TRACKS) {
      console.log("U_RETURN_TO_APP_WO_NP_TRACKS");
      dispatch({
        type: current_track,
        payload: {
          /** Assuming index is the og position of this track in mediaFiles */
          // index: 0,
          position: "dasd",
          id: "000",
          title: "Melo",
          artist: "Khoi Tran",
          duration: 0,
          // artwork: null,
          url: "",
        },
      });
      await thisTrackPlaya.core.add([...mediaFiles]);
      dispatch({ type: get_media_success, payload: mediaFiles });
      dispatch({ type: set_np_tracks, payload: mediaFiles });

      //! replace get_media_order w set_indexed_tracks, but need to see the performance
      // // dispatch({ type: get_media_order, payload: trackIDs });
      dispatch({ type: set_indexed_tracks, payload: mediaFiles });
      dispatch({ type: set_loading, payload: false });
    }

    if (U_RETURN_TO_APP_NORMALLY) {
      console.log("U_RETURN_TO_THE_APP");

      /**
       * If `currentTrack` exists, add that track to Playa first
       *
       * ---
       * - Why? if user wants to play it,
       * they don't have to wait for the whole `tracks` to load
       */
      console.log("add currentTrack to Playa...: ");
      await thisTrackPlaya.core.add(currentTrack);
      console.log("now continue getting device tracks...");

      /**
       * Now, we start manipulating tracks from %mediaFiles
       *
       * ---
       * - Slice %mediaFiles into `beforeCurrentTracks` and `afterCurrentTracks`
       * - Create a queue of `[...afterCurrentTracks, ...beforeCurrentTracks]`
       * to make `%nowPlayingTracks` "feels" like `%mediaFiles`,
       * tho this list starts with the `currentTrack` instead of `%mediaFiles[0]`
       * //- then remove `currentTrack` above out the list to avoid duplication
       */
      const currentPos = R.indexOf(currentTrack.id, R.pluck("id")(mediaFiles));
      let beforeCurrentTracks = R.slice(
        0,
        currentPos,
        mediaFiles
      ) as TrackProps[];
      console.log("BC: ", beforeCurrentTracks.length);
      let afterCurrentTracks = R.slice(
        currentPos + 1,
        mediaFiles.length,
        mediaFiles
      ) as TrackProps[];
      console.log("AC: ", afterCurrentTracks.length);
      const queueTracks = [...afterCurrentTracks, ...beforeCurrentTracks];
      const _npTracks = R.reject((track) => track.id === "000", [
        currentTrack,
        ...queueTracks,
      ]);
      // let tracks = R.reject((track) => track.id === currentTrack.id, [
      //   ...mediaFiles,
      // ]);
      await thisTrackPlaya.core.removeUpcomingTracks();
      await thisTrackPlaya.core.add(queueTracks);
      // // const trackIDs = fn.js.vLookup(mediaFiles, "id") as trackID[];

      /**
       * If `nowPlayingTracks` = []:
       *  - no queue
       *  - 1st time app startup
       */
      if (nowPlayingTracks == []) {
        dispatch({ type: set_np_tracks, payload: mediaFiles });
      } else {
        dispatch({ type: set_np_tracks, payload: _npTracks });
      }
      //! replace get_media_order w set_indexed_tracks, but need to see the performance
      // // dispatch({ type: get_media_order, payload: trackIDs });
      dispatch({ type: set_indexed_tracks, payload: mediaFiles });

      dispatch({ type: set_loading, payload: false });
    }

    if (U_REFRESH_THE_APP) {
      console.log("U_REFRESH_THE_APP");
      /**
       * Get deviceTracks and compare w mediaFiles
       * to get new tracks -> update RecentlyAdded[*]
       */
      let deviceTracks = await getMediaWithCovers();
      const newTracks = R.reject(
        (track: TrackProps) => R.pluck("id")(mediaFiles).includes(track.id),
        deviceTracks
      );
      console.log("# of New Tracks ", newTracks.length);
    }
  } catch (e) {
    errorReporter(e);
  }

  return console.log("Done getting media!");
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
