import TrackPlayer, { Track } from "react-native-track-player";
import { img } from "assets";
import { dTracks, errorReporter, TrackProps } from "utils";
import _ from "lodash";
import { connector, dRedux, playlistShuffle } from "engines";
import R from "ramda";
import React from "react";
const resolveAssetSource = require("react-native/Libraries/Image/resolveAssetSource");
// const resolvedImage = resolveAssetSource(myImage);
interface P extends dRedux {}

/**
 * A wrapper API around TrackPlayer
 *
 * This API simplifies TrackPlayer
 * by exposing methods to do common things.
 *
 * @version 0.10.11 *(created)*
 * @author nguyenkhooi
 * @see https://medium.com/finimize-engineering/building-a-global-audio-player-in-react-native-dd065fc64b02
 */
class TrackPlayaa extends React.Component {
  /**
   * TrackPlaya instance
   */
  private static instance: TrackPlayaa;

  /**
   * Allows us to get a current instance, or make an instance of the player
   * and stops us reinitialising the player
   * ---
   *
   * @version 0.10.11
   * @author nguyenkhooi
   */
  static getInstance() {
    if (!TrackPlayaa.instance) {
      console.log("getting TP instance...");
      TrackPlayaa.instance = new TrackPlayaa({});
      TrackPlayaa.instance.init();
      return TrackPlayaa.instance;
    }

    return TrackPlayaa.instance;
  }

  /**
   * TrackPlaya track-changed listener
   */
  static addTrackChangeListener = (callback: () => void) =>
    TrackPlayer.addEventListener("playback-track-changed", callback);

  getCurrentTrackId() {
    return TrackPlayer.getCurrentTrack();
  }

  /**
   * Setup TrackPlayer with suitable capability,
   * //get device's media,
   * //and aligning TrackPlayer with Redux states
   *
   * @version 0.10.11
   */
  private init() {
    try {
      // set up the player so we can use it
      TrackPlayer.setupPlayer({
        iosCategoryMode: "spokenAudio",
      });

      // add support for capabilities
      const capabilities = [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_PLAY_FROM_SEARCH,
        // TrackPlayer.CAPABILITY_JUMP_FORWARD
      ];

      // list of options for the player
      const options = {
        stopWithApp: true,
        // An array of media controls capabilities
        capabilities,
        // An array of capabilities that will show up when the notification is in the compact form
        compactCapabilities: capabilities,
        icon: resolveAssetSource(img.meloWhite),
      };

      // update the options
      TrackPlayer.updateOptions(options);
    } catch (error) {
      errorReporter(error, "31200");
    }
  }

  /**
   * This function takes an item, defined with the type below,
   * and adds it to the track player
   */
  private createTrack = (item: TrackProps): Track => {
    const { url, title, id, artwork } = item;
    const track = {
      id,
      url,
      title,
      artist: "Melo",
      artwork,
      // here we use the voice algorithm, as it improves the quality of speech audio
      pitchAlgorithm: TrackPlayer.PITCH_ALGORITHM_VOICE,
    };

    return track;
  };

  getQueue = async () => await TrackPlayer.getQueue();

  pause = () => TrackPlayer.pause();

  isPlaying = async () => {
    const currentState = await TrackPlayer.getState();
    return currentState === TrackPlayer.STATE_PLAYING;
  };

  togglePlay = async () => {
    const isPlaying = await this.isPlaying();

    if (isPlaying) {
      return TrackPlayer.pause();
    } else {
      return TrackPlayer.play();
    }
  };

  next = () => TrackPlayer.skipToNext();
  previous = () => TrackPlayer.skipToPrevious();

  createPlaylist = async (
    givenTracks: TrackProps[],
    isShuffle = false,
    currentTrack: TrackProps
  ) => {
    // let isShuffle = true;
    const U_SHUFFLE_wo_CURRENT = isShuffle && currentTrack.id === "000";
    const U_SHUFFLE_w_CURRENT = isShuffle && currentTrack.id !== "000";
    if (U_SHUFFLE_wo_CURRENT) {
      try {
        const targetedTracks: TrackProps[] = playlistShuffle(
          givenTracks,
          "normal"
        );
        await TrackPlayer.reset();
        await TrackPlayer.add(targetedTracks);
      } catch (error) {
        errorReporter(error, "3127100-101");
      }
    }

    if (U_SHUFFLE_w_CURRENT) {
      try {
        const targetedTracks: TrackProps[] = playlistShuffle(
          givenTracks,
          "normal"
        );
        const queueTracks = await TrackPlayer.getQueue();
        const playedTracks = R.reject((track: Track) => {
          return queueTracks.includes(track) || track === currentTrack;
        }, mediaFiles);
      } catch (error) {
        errorReporter(error, "3127100-102");
      }
    }
  };

  /**
   * Add track/track[] before the `currentTrack`
   *
   * ---
   */
  prependToQueue = async (playables: TrackProps[] | TrackProps) => {
    /**
     * The types here simply specify that we're expecting either
     * an array of items we can play, or a single item we can play
     */
    const audioFiles = _.isArray(playables)
      ? playables.map((item) => this.createTrack(item))
      : this.createTrack(playables);

    const currentTrackId = await this.getCurrentTrackId();
    const queue = await this.getQueue();
    // const beforeCurrentTracks = R.slice
    TrackPlayer.remove();
    TrackPlayer.add(audioFiles, currentTrackId);
  };

  /**
   * Add track/track[] after the `currentTrack`
   *
   * ---
   */
  appendToQueue = (playables: TrackProps[] | TrackProps) => {
    const audioFiles = _.isArray(playables)
      ? playables.map((item) => this.createTrack(item))
      : this.createTrack(playables);
    TrackPlayer.add(audioFiles);
  };
}

export const TrackPlaya = TrackPlayaa;

// typescript things
// here we declare a definition for a 'playable item' - this allows us to
// ensure that we're passing in an object as we expect it

export type PlayableItem = {
  audioUrl: string;
  title: string;
  id: string;
  artwork: string;
};
