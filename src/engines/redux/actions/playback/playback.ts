import { Toasty, TrackPlaya } from "components";
import { fn } from "engines/functions";
import R from "ramda";
import { Dispatch } from "redux";
import { store } from "store";
import { errorReporter, TrackProps } from "utils";
import {
  current_track,
  dRedux,
  eLoop,
  SetCurrentTrackAction,
  SetPlayerAction
} from "../../types";

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
      type: current_track,
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
 * @version 0.10.16
 * - *bwd seekTo(0) if timePos in [0,5]*
 * - *fwd and bwd w loop option*
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
          .then(async (r) => {
            switch (loop) {
              case eLoop.all:
                break;
              case eLoop.all:
                break;
            }
            if (loop) {
              return null;
            } else {
              //*
              if (fn.js.between(timePos, 0, 5)) {
                try {
                  const currentIndex = R.indexOf(
                    currentTrack.id,
                    R.pluck("id")(nowPlayingTracks)
                  );
                  const targetedTrack = nowPlayingTracks[currentIndex + 1];
                  await store.dispatch({
                    type: current_track,
                    payload: targetedTrack,
                  });
                } catch (error) {
                  console.warn(
                    "fwd error getting targetedTrack w rx. Waiting for Playa to get it... "
                  );
                }
              }
            }
          })
          .catch((error) => {
            if (error.message.includes("There is no tracks left to play")) {
              // loop == eLoop.all ? thisTrackPlaya
            }
            error.message.includes("There is no tracks left to play") &&
              Toasty.show("You've reached the end of list!", {
                type: "warning",
              });
          });
        await thisTrackPlaya.play();

        break;
      case "bwd":
        const timePos = await thisTrackPlaya.core.getPosition();
        await thisTrackPlaya
          .previous(loop)
          .then(async (r) => {
            if (loop) {
              return null;
            } else {
              if (fn.js.between(timePos, 0, 5)) {
                try {
                  const currentIndex = R.indexOf(
                    currentTrack.id,
                    R.pluck("id")(nowPlayingTracks)
                  );
                  const targetedTrack = nowPlayingTracks[currentIndex - 1];
                  await store.dispatch({
                    type: current_track,
                    payload: targetedTrack,
                  });
                } catch (error) {
                  console.warn(
                    "bwd error getting targetedTrack w rx. Waiting for Playa to get it... "
                  );
                }
              }
            }
          })
          .catch((error) => {
            error.message.includes("no previous track") &&
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
