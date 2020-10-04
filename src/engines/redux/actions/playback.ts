import R from "ramda";
import TrackPlayer from "react-native-track-player";
import { Dispatch } from "redux";
import { errorReporter, getRandomNumber, TrackProps } from "utils";
import {
  GetMediaAction,
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
 */
export const setCurrentTrack = (currentTrack: TrackProps) => async (
  dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>
) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(currentTrack);
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
    errorReporter(e);
  }
};

type dSethPlayback = {
  type: "play" | "pause" | "fwd" | "bwd";
  nowPlayingTracks?: TrackProps[];
  currentTrack?: TrackProps;
  isShuffle?: boolean;
};
export const sethPlayback = ({
  type,
  nowPlayingTracks,
  currentTrack,
  isShuffle,
}: dSethPlayback) => async (dispatch) => {
  try {
    const currentTrackPosition =
      !!nowPlayingTracks &&
      !!currentTrack &&
      R.findIndex(R.propEq("index", currentTrack.index))(nowPlayingTracks);

    switch (type) {
      case "play":
        TrackPlayer.play();
        return dispatch({ type: "set_playback", payload: true });
        break;
      case "pause":
        TrackPlayer.pause();
        return dispatch({ type: "set_playback", payload: false });
        break;
      case "fwd":
        console.log(
          "the end?",
          currentTrack.id === nowPlayingTracks[nowPlayingTracks.length - 1].id
        );
        let nextTrack =
          currentTrack.id === nowPlayingTracks[nowPlayingTracks.length - 1].id
            ? nowPlayingTracks[0]
            : nowPlayingTracks[currentTrackPosition + 1];

        return dispatch(setCurrentTrack(nextTrack));
        break;
      case "bwd":
        console.log("the start?", currentTrack.id === nowPlayingTracks[0].id);
        let prevTrack =
          currentTrack.id === nowPlayingTracks[0].id
            ? nowPlayingTracks[nowPlayingTracks.length - 1]
            : nowPlayingTracks[currentTrackPosition - 1];

        return dispatch(setCurrentTrack(prevTrack));
        break;
    }
  } catch (error) {
    errorReporter(error);
  }
};

export const setLoop = (isLoop: boolean): ToggleLoopAction => {
  return { type: "set_loop", payload: isLoop };
};

/**
 * - If `true`:
 *
 * Turn shuffle on, set `nowPlayingTracks` = `shuffleTracks`,
 * then adjust the playback fn according to it
 * - If `false`:
 *
 * Turn shuffle off, set `nowPlayingTracks` = `indexedTracked`,
 * then adjust the playback fn according to it
 * @param isShuffle
 */
export const setShuffle = (
  isShuffle: boolean,
  tracks: TrackProps[],
  currentTrack?: TrackProps
) => async (
  dispatch: Dispatch<ToggleShuffleAction | NowPlayingTracksAction>
) => {
  try {
    const shuffledTracks = shuffle(Object.assign(tracks, {}));
    const indexedTracked = R.sortBy(R.prop("index"))(Object.assign(tracks, {}));
    if (isShuffle) {
      dispatch({ type: "now_playing_tracks", payload: shuffledTracks });
    } else {
      dispatch({ type: "now_playing_tracks", payload: indexedTracked });
    }
    // const newTracks = isShuffle ? shuffledTracks : indexedTracked;
    // const currentTrackPosition = R.findIndex(
    //   R.propEq("index", currentTrack.index)
    // )(newTracks);
    // console.log(
    //   "index og vs new: ",
    //   currentTrack.index + " - " + currentTrackPosition
    // );
    return dispatch({ type: "set_shuffle", payload: isShuffle });
  } catch (error) {
    errorReporter(error);
    return null;
  }
};

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

function knuthShuffle(array: any[]) {
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
}
