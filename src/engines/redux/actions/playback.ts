import { fn } from "engines";
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
  ToggleLoopAction,
  ToggleShuffleAction,
} from "../types";

/**
 * Set current track to play.
 * Think of users pressing specific track to play it
 * @param currentTrack
 * @deprecated
 */
export const setCurrentTrackk = (currentTrack?: TrackProps) => async (
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
 * @version 0.10.5
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
    const targetedTrack: TrackProps = fn.js.hLookup(
      "id",
      targetedTrackID,
      mediaFiles
    )[0];
    dispatch({
      type: "current_track",
      payload: targetedTrack,
    });
    await TrackPlayer.reset();
    await TrackPlayer.add(targetedTrack);
    TrackPlayer.play();
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
 * @version 0.10.5
 */
export const sethPlayback = ({ type }: dSethPlayback) => async (dispatch) => {
  try {
    const {
      media: { nowPlayingTracks, mediaFiles },
      playback: { currentTrack },
    }: dRedux = store.getState();

    const nowPlayingIDs: string[] = fn.js.vLookup(nowPlayingTracks, "id"); //* List of now playing's id, in order
    // const currentTrackID = await TrackPlayer.getCurrentTrack(); //* Get currentTrack's ID
    const currentTrackID = currentTrack.id; //* Get currentTrack's ID from Redux
    const currentTrackPosition = nowPlayingIDs.indexOf(currentTrackID); //* Find currentTrack's position in `nowPlayingTracks`

    switch (type) {
      case "play":
        TrackPlayer.play();
        return dispatch({ type: "set_playback", payload: true });
        break;
      case "pause":
        TrackPlayer.pause();
        return dispatch({ type: "set_playback", payload: false });
        break;
      /**
       * case "fwd":
       * Recalling TrackPlayer ALWAYS inherits `mediaFiles` list (Hence [{id: 1},{id: 2},{id: 3},...]),
       *  when we manipulate the `nowPlayingTracks` list (e.g. shuffle, play specific artists...),
       *
       */
      case "fwd":
        /** Check if current track is at the end of `nowPlayingTracks`:
         *    (v) : targetedTrack = 1st track of `nowPlayingTracks`
         *    (x) : targetedTrack = next track of the `currentTrack` in `nowPlayingTracks`
         */
        // currentTrack.id === nowPlayingTracks[nowPlayingTracks.length - 1].id &&
        //   console.log("End of list");
        const targetedTrackID: string =
          currentTrack.id === nowPlayingTracks[nowPlayingTracks.length - 1].id
            ? nowPlayingTracks[0].id
            : nowPlayingIDs[currentTrackPosition + 1];

        return dispatch(setCurrentTrackID(targetedTrackID));
        // await TrackPlayer.skip(targetedTrackID);
        // TrackPlayer.play();
        // return dispatch({ type: "set_playback", payload: true });
        break;
      case "bwd":
        /** Check if current track is at the start of `nowPlayingTracks`:
         *    (v) : targetedTrack = last track of `nowPlayingTracks`
         *    (x) : targetedTrack = prev track of the `currentTrack` in `nowPlayingTracks`
         */
        // currentTrack.id === nowPlayingTracks[0].id &&
        //   console.log("Start of list");
        const targetedTrackID1: string =
          currentTrack.id === nowPlayingTracks[0].id
            ? nowPlayingTracks[nowPlayingTracks.length - 1].id
            : nowPlayingIDs[currentTrackPosition - 1];

        return dispatch(setCurrentTrackID(targetedTrackID1));
        // await TrackPlayer.skip(targetedTrackID1);
        // TrackPlayer.play();
        // return dispatch({ type: "set_playback", payload: true });
        break;

        console.log(
          "currentTrack ID: ",
          currentTrackID +
            " @ " +
            currentTrackPosition +
            " position of nowPlayingTracks" +
            nowPlayingIDs.length
        );
    }
  } catch (error) {
    errorReporter(error, "3123");
  }
};

export const setLoop = (isLoop: boolean): ToggleLoopAction => {
  return { type: "set_loop", payload: isLoop };
};

/**
 * Fn to toggle shuffle and adjust `nowPlayingTracks` accordingly.
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
 * @version 0.10.5
 */
export const setShuffle = (isShuffle: boolean, tracks?: TrackProps[]) => async (
  dispatch: Dispatch<
    ToggleShuffleAction | NowPlayingTracksAction | SetCurrentTrackAction
  >
) => {
  try {
    const {
      media: { mediaFiles },
    } = store.getState();

    const _tracks = tracks || mediaFiles;
    const targetedTracks = isShuffle
      ? knuthShuffle([..._tracks], "knuth")
      : R.sortBy(R.prop("index"))([..._tracks]);
    const playbackState = await TrackPlayer.getState();

    // const newTracks = isShuffle ? shuffledTracks : indexedTracked;
    // const currentTrackPosition = R.findIndex(
    //   R.propEq("index", currentTrack.index)
    // )(newTracks);
    // console.log(
    //   "index og vs new: ",
    //   currentTrack.index + " - " + currentTrackPosition
    // );
    dispatch({ type: "now_playing_tracks", payload: targetedTracks });
    playbackState != TrackPlayer.STATE_PLAYING &&
      dispatch(setCurrentTrackID(targetedTracks[0].id));

    console.log("is shuffled?", isShuffle);
    return dispatch({ type: "set_shuffle", payload: isShuffle });
  } catch (error) {
    errorReporter(error, "3124");
    return null;
  }
};

function knuthShuffle(array: any[], type: "knuth" | "normal" = "knuth") {
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
