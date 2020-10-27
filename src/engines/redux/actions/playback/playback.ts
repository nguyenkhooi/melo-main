import { Toasty, TrackPlaya } from "components";
import { Dispatch } from "redux";
import { store } from "store";
import { errorReporter, TrackProps } from "utils";
import {
  dRedux,
  LOOP,
  PLAYBACK,
  SetCurrentTrackAction,
  SetPlayerAction,
} from "../../types";
import { setQueueWCurrentOnTop } from "./tracks-manipulation";

/**
 * Set current track to play.
 * Think of users pressing specific track to play it
 * ---
 *
 * @version 0.10.13
 * - *Add await*
 * @author nguyenkhooi
 */
export const setCurrentTrackk = (targetedTrack: TrackProps) => async (
  dispatch: Dispatch<SetCurrentTrackAction | SetPlayerAction>
) => {
  const thisTrackPlaya = TrackPlaya.getInstance();
  try {
    await thisTrackPlaya.core.skip(targetedTrack.id).catch(async () => {
      await thisTrackPlaya.core.add(targetedTrack);
      await thisTrackPlaya.core.skip(targetedTrack.id);
      // await thisTrackPlaya.core.remove()
    });
    dispatch({
      type: PLAYBACK.CURRENT_TRACK,
      payload: targetedTrack,
    });
  } catch (e) {
    errorReporter(e, "3121");
  }
};

type dSethPlayback = {
  type: "play" | "pause" | "fwd" | "bwd";
};
/**
 * Fn to set playback (play, pause, forward, backward)
 *
 * ---
 *
 * @version 0.10.27
 * - *expand functionality for `fwd` and `bwd` with `loopType`*
 * - *tempo deprecate dispatch currentTrack w Rx due to bug w `currentTrack.id`. Currect track will be dispatched w Playa listener instead*
 * @author nguyenkhooi
 */
export const sethPlayback = ({ type }: dSethPlayback) => async () => {
  const thisTrackPlaya = TrackPlaya.getInstance();
  const {
    media: { nowPlayingTracks },
    playback: { currentTrack, loop },
  }: // media: { indexedTracks },
  dRedux = store.getState();
  try {
    switch (type) {
      case "play":
        /**
         * *dispatch() is now run in TrackPlayer's bgService()
         * for enhancing performance
         */
        await thisTrackPlaya.play();
        break;
      case "pause":
        /**
         * *dispatch() is now run in TrackPlayer's bgService()
         * for enhancing performance
         */
        await thisTrackPlaya.pause();
        break;

      case "fwd":
        await thisTrackPlaya
          .next(loop)
          // .then(async (r) => {
          //   /**
          //    *!There's a bug with currentTrack.id, so it's deprecated for now
          //    * If loop != "one" &&
          //    * Dispatch currentTrack = next track with Rx
          //    * (instead of Playa's listener)
          //    * For faster current track display
          //    */
          //   if (loop != eLoop.one) {
          //     //? && fn.js.between(timePos, 0, 5)
          //     try {
          //       const currentIndex = R.indexOf(
          //         currentTrack.id,
          //         R.pluck("id")(nowPlayingTracks)
          //       );
          //       const targetedTrack = nowPlayingTracks[currentIndex + 1];
          //       await store.dispatch({
          //         type: PLAYBACK.CURRENT_TRACK,
          //         payload: targetedTrack,
          //       });
          //     } catch (error) {
          //       console.warn(
          //         "fwd error getting targetedTrack w rx. Waiting for Playa to get it... "
          //       );
          //     }
          //   }
          // })
          .catch(async (error) => {
            if (error.message.includes("There is no tracks left to play")) {
              switch (loop) {
                /**
                 * - If current one is the last track,
                 * * loop == "all":
                 *    - Reset the queue, add the same queue,
                 *    - with the current one on top
                 *    - U will technically play the current one one more time
                 * * loop == "one":
                 *    - currentTrack.seekTo(0)
                 * * loop == "off":
                 *    - Stop playing. Reset queue (default TrackPlayer behavior)
                 *
                 */
                case LOOP.ALL:
                  // Toasty.show("Back to the start", {
                  //   type: "normal",
                  // });
                  const restartedTracks = setQueueWCurrentOnTop();
                  await thisTrackPlaya.core.reset();
                  return await thisTrackPlaya.core.add(restartedTracks);
                  //! i'll play the currentTrack again, so we don't have to dispatch it
                  // await store.dispatch({
                  //   type: PLAYBACK.CURRENT_TRACK,
                  //   payload: targetedTrack,
                  // });
                  break;
                case LOOP.ONE:
                  return null;
                  break;
                case LOOP.OFF:
                  return Toasty.show("You've reached the end of list!", {
                    type: "warning",
                  });
                  break;
                default:
                  return null;
              }
            }
          });
        await thisTrackPlaya.play();

        break;
      case "bwd":
        await thisTrackPlaya
          .previous(loop)
          // .then(async (r) => {
          //   /**
          //    *!There's a bug with currentTrack.id, so it's deprecated for now
          //    * If loop != "one" && track is playing within 5s
          //    * Dispatch currentTrack = previous track with Rx
          //    * (instead of Playa's listener)
          //    * For faster current track display
          //    */
          //   if (loop != eLoop.one && timePos >= 0 && timePos <= 5) {
          //     try {
          //       const currentIndex = R.indexOf(
          //         currentTrack.id,
          //         R.pluck("id")(nowPlayingTracks)
          //       );
          //       const targetedTrack = nowPlayingTracks[currentIndex - 1];
          //       await store.dispatch({
          //         type: PLAYBACK.CURRENT_TRACK,
          //         payload: targetedTrack,
          //       });
          //     } catch (error) {
          //       console.warn(
          //         "bwd error getting targetedTrack w rx. Waiting for Playa to get it... "
          //       );
          //     }
          //   }
          // })
          .catch(async (error) => {
            /**
             * - If current one is the first track,
             * * loop == "all":
             *    - Reset the queue, add the same queue,
             *    - with the current one on top
             *    - U will technically play the current one one more time
             * * loop == "one":
             *    - currentTrack.seekTo(0)
             * * loop == "off":
             *    - Stop playing. Reset queue (default TrackPlayer behavior)
             *
             */
            if (error.message.includes("no previous track")) {
              switch (loop) {
                case LOOP.ALL:
                  Toasty.show("To the end of queue", {
                    type: "normal",
                  });
                  const queueWoCurrent = nowPlayingTracks.filter(
                    (track) => track.id != currentTrack.id
                  );
                  await thisTrackPlaya.core.removeUpcomingTracks();
                  return await thisTrackPlaya.core.add(
                    queueWoCurrent,
                    currentTrack.id
                  );

                  // return await thisTrackPlaya.core.removeUpcomingTracks();
                  // await store.dispatch({
                  //   type: PLAYBACK.CURRENT_TRACK,
                  //   payload: targetedTrack,
                  // });
                  break;
                case LOOP.ONE:
                  return null;
                  break;
                case LOOP.OFF:
                  return Toasty.show("You've reached the end of list!", {
                    type: "warning",
                  });
                  break;
                default:
                  return null;
              }
            }

            Toasty.show("You've reached the end of list!", {
              type: "warning",
            });
          });
        await thisTrackPlaya.play();

        break;
    }
  } catch (error) {
    errorReporter(error, "3123");
  }
};
