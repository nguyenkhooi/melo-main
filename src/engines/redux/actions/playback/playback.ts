import R from "ramda";
import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { store } from "store";
import { errorReporter, TrackProps } from "utils";
import {
  dRedux,
  NowPlayingTracksAction,
  SetCurrentTrackAction,
  SetPlayerAction,
  set_shuffle,
  ToggleLoopAction,
  ToggleShuffleAction,
} from "../../types";

/**
 * Set current track to play.
 * Think of users pressing specific track to play it
 * @param currentTrack
 * @deprecated
 */
export const setCurrentTrackk = () => async (
  dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>
) => {
  try {
    // await TrackPlayer.reset();
    // await TrackPlayer.add(currentTrack);
    // dispatch({
    //   type: "current_track",
    //   payload: currentTrack,
    // });
    // TrackPlayer.play();
    // dispatch({
    //   type: "set_playback",
    //   payload: true,
    // });

    const currentTrack = await TrackPlayer.getTrack(
      await TrackPlayer.getCurrentTrack()
    );
    dispatch({
      type: "current_track",
      payload: currentTrack,
    });
    TrackPlayer.play();
    dispatch({
      type: "set_playback",
      payload: true,
    });
  } catch (e) {
    errorReporter(e, "3121");
  }
};

/**
 * Set current track (by its ID) and play it.
 * Think of users choose specific track to play
 * ---
 *
 * @version 0.10.10
 * @author nguyenkhooi
 *
 */
export const setCurrentTrackID = (targetedTrackID: string) => async (
  dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>
) => {
  const {
    media: { mediaFiles },
  }: dRedux = store.getState();
  try {
    // const _currentTrack = await TrackPlayer.getCurrentTrack();
    // if (!!_currentTrack) {
    //   /** If _currentTrack exists,
    //    * skip to targeted track
    //    */
    //   await TrackPlayer.skip(targetedTrackID);
    // } else {
    //   /** If _currentTrack no exists,
    //    * reset and refill the TrackPlayer,
    //    * then skip to targeted track
    //    */
    //   await TrackPlayer.reset();
    //   await TrackPlayer.add([...mediaFiles]);
    //   await TrackPlayer.skip(targetedTrackID);
    // }
    console.log("targetedTrackID: ", targetedTrackID);
    // const targetedTrack: TrackProps = fn.js.hLookup(
    //   "id",
    //   targetedTrackID,
    //   mediaFiles
    // )[0];
    //! should not get targetedTrack from TrackPlayer since it may not contain track cover
    const targetedTrack = await TrackPlayer.getTrack(targetedTrackID);
    dispatch({
      type: "current_track",
      payload: targetedTrack,
    });
    console.log("targetedTrackID: ", targetedTrackID);

    await TrackPlayer.skip(targetedTrackID);
    await TrackPlayer.play();
    // await TrackPlayer.reset();
    // await TrackPlayer.add(targetedTrack);
    // TrackPlayer.play();
    dispatch({
      type: "set_playback",
      payload: true,
    });
  } catch (e) {
    errorReporter(e, "3122");
  }
};

type dSethPlayback = {
  type: "play" | "pause" | "fwd" | "bwd";
};
/**
 * Fn to set playback (play, pause, forward, backward)
 * ---
 *
 * @version 0.10.10 *( rewrite the logic and depend on TrackPlayer<> more for faster performance)*
 * @author nguyenkhooi
 */
export const sethPlayback = ({ type }: dSethPlayback) => async (dispatch) => {
  try {
    const {
      media: { nowPlayingIDs },
      playback: { currentTrack },
    }: dRedux = store.getState();

    //* Identify current track position for `fwd` and `bwd` actions
    let currentTrackPosition: number;
    if (type == "fwd" || type == "bwd") {
      //* Find currentTrack's position in `nowPlayingTracks`
      currentTrackPosition = nowPlayingIDs.indexOf(currentTrack.id);
    }

    switch (type) {
      case "play":
        /**
         * *dispatch() is now run in TrackPlayer's bgService()
         * for enhancing performance
         */
        await TrackPlayer.play();
        break;
      case "pause":
        /**
         * *dispatch() is now run in TrackPlayer's bgService()
         * for enhancing performance
         */
        await TrackPlayer.pause();
        break;
      /**
       * case "fwd":
       * Recalling TrackPlayer ALWAYS inherits `mediaFiles` list (Hence [{id: 1},{id: 2},{id: 3},...]),
       *  when we manipulate the `nowPlayingTracks` list (e.g. shuffle, play specific artists...),
       *
       */
      case "fwd":
        /** Check if current track is at the end of `nowPlayingTracks`:
         *    ✅ : targetedTrack = 1st track of `nowPlayingTracks`
         *    ❌ : targetedTrack = next track of the `currentTrack` in `nowPlayingTracks`
         */
        // currentTrack.id === nowPlayingTracks[nowPlayingTracks.length - 1].id &&
        //   console.log("End of list");
        const targetedTrackID: string =
          currentTrack.id === nowPlayingIDs[nowPlayingIDs.length - 1]
            ? nowPlayingIDs[0]
            : nowPlayingIDs[currentTrackPosition + 1];

        // console.log(
        //   "targetedID: ",
        //   currentTrack.id +
        //     " - " +
        //     currentTrackPosition +
        //     " - " +
        //     targetedTrackID
        // );

        TrackPlayer.skipToNext();

        // return dispatch(setCurrentTrackID(targetedTrackID));

        // await TrackPlayer.skip(targetedTrackID);
        // TrackPlayer.play();
        // return dispatch({ type: "set_playback", payload: true });
        break;
      case "bwd":
        /** Check if current track is at the start of `nowPlayingTracks`:
         *    ✅ : targetedTrack = last track of `nowPlayingTracks`
         *    ❌ : targetedTrack = prev track of the `currentTrack` in `nowPlayingTracks`
         */
        // currentTrack.id === nowPlayingTracks[0].id &&
        //   console.log("Start of list");
        const targetedTrackID1: string =
          currentTrack.id === nowPlayingIDs[0]
            ? nowPlayingIDs[nowPlayingIDs.length - 1]
            : nowPlayingIDs[currentTrackPosition - 1];

        // console.log(
        //   "targetedID: ",
        //   currentTrack.id +
        //     " - " +
        //     currentTrackPosition +
        //     " - " +
        //     targetedTrackID1
        // );

        TrackPlayer.skipToPrevious();
        // dispatch(setCurrentTrackID(targetedTrackID1));

        // await TrackPlayer.skip(targetedTrackID1);
        // await TrackPlayer.skip(targetedTrackID1);
        // TrackPlayer.play();
        // return dispatch({ type: "set_playback", payload: true });
        break;
    }
  } catch (error) {
    errorReporter(error, "3123");
  }
};

export const setLoop = (isLoop: boolean): ToggleLoopAction => {
  return { type: "set_loop", payload: isLoop };
};

/**
 * Fn to toggle shuffle and adjust `nowPlayingIDs` accordingly.
 * - If `true`:
 *
 * Turn shuffle on, set `nowPlayingTracks` = `shuffleTracks`,
 *
 * - If `false`:
 *
 * Turn shuffle off, set `nowPlayingTracks` = `indexedTracked`,
 *
 * - Then, if TrackPlayer is not playing, play the first track in the list
 *
 * @version 0.10.9
 * @author nguyenkhooi
 */
export const setShuffle = (
  isShuffle: boolean,
  /**trackIDs?: trackID[] */
  givenTracks?: TrackProps[]
) => async (
  dispatch: Dispatch<
    ToggleShuffleAction | NowPlayingTracksAction | SetCurrentTrackAction
  >
) => {
  try {
    const {
      media: { mediaIDs, mediaFiles },
    }: dRedux = store.getState();
    //* modify indicator
    dispatch({ type: set_shuffle, payload: isShuffle });
    //* track ids' order to be used
    const _tracks = givenTracks || mediaFiles;
    //* If shuffle == true, shuffle _trackIDs, else use the OG one
    const targetedTracks = isShuffle
      ? (playlistShuffle([..._tracks], "normal") as TrackProps[])
      : (mediaFiles as TrackProps[]);
    const playbackState = await TrackPlayer.getState();

    // dispatch({ type: now_playing_tracks, payload: targetedIDs });

    console.log("is shuffled?", isShuffle);

    const TRACK_PLAYER_IS_PLAYING = playbackState == TrackPlayer.STATE_PLAYING;
    const TRACK_PLAYER_IS_NOT_PLAYING = !TRACK_PLAYER_IS_PLAYING;

    /**
     * If track player is playing,
     * reject the `currentTrack` out of `targetedTracks` -> `shuffledTracks`,
     * and add `shuffledTracks` after the `currentTrack`
     */
    if (TRACK_PLAYER_IS_PLAYING) {
      const _currentTrackID = await TrackPlayer.getCurrentTrack();
      const shuffledTracks = R.reject(
        (track) => track.id === _currentTrackID,
        targetedTracks
      );
      await TrackPlayer.removeUpcomingTracks();
      await TrackPlayer.add([...shuffledTracks]);
    }

    /**
     * If track player is not playing,
     *  reset the TrackPlayer, and add targetedTracks,
     *  set its 1st track as currentTrack
     */
    if (TRACK_PLAYER_IS_NOT_PLAYING) {
      await TrackPlayer.reset();
      await TrackPlayer.add([...targetedTracks]);
      //@ts-ignore
      dispatch(setCurrentTrackID(targetedTracks[0].id));
    }
    // return (
    //   playbackState != TrackPlayer.STATE_PLAYING &&
    //   //@ts-ignore
    //   dispatch(setCurrentTrackID(targetedTracks[0]))
    // );
  } catch (error) {
    errorReporter(error, "3124");
    return null;
  }
};

export function playlistShuffle(
  array: any[],
  type: "knuth" | "normal" = "knuth"
) {
  try {
    switch (type) {
      case "knuth":
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
        break;
      case "normal":
        return array.sort(() => Math.random() - 0.5);
        break;
    }
  } catch (error) {
    errorReporter(error, "3125");
    return null;
  }
}
