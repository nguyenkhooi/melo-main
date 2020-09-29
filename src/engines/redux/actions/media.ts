import TrackPlayer from "react-native-track-player";
import { errorReporter, getRandomNumber, TrackProps } from "utils";

/**
 * Set a current track list to play.
 * Think of users playing specific albums, artists, playlists...
 * @deprecated NOTE should move to media actions
 * @param currentTrackList
 * @param shuffle
 */
export const setCurrentTrackList = (
  currentTrackList: TrackProps[],
  shuffle: boolean = false
) => async (dispatch) => {
  try {
    await TrackPlayer.reset();
    await TrackPlayer.add(currentTrackList);
    dispatch({
      type: "current_track_list",
      payload: currentTrackList,
    });

    /**
     * Check if shuffle is true or not. If true,
     * set the `nextTrack` to random item, else
     * play the first item in the `currentTrackList`
     */
    let nextTrack = shuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrackList[0];
    console.log(
      "setCurrentList: ",
      currentTrackList.length + ", shuffle: " + shuffle + nextTrack
    );
    dispatch({
      type: "current_track",
      payload: nextTrack,
    });
    // TrackPlayer.play();
    // dispatch({
    //   type: "set_playback",
    //   payload: true,
    // });
  } catch (e) {
    errorReporter(e);
  }
};
