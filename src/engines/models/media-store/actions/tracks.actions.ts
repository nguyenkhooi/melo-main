import { dTrack } from "engines/models/media-store/track-doc/track.doc";
import { flow } from "mobx-state-tree";
import MusicFiles from "react-native-get-music-files";
import TrackPlayer, { Track } from "react-native-track-player";
import RNFetchBlob from "rn-fetch-blob";
import {
  checkStoragePermissions,
  getStoragePermission,
  cleanupMedia,
  errorReporter,
  IS_ANDROID,
} from "utils";
import { MediaModel } from "../media.store";

export function TracksActions() {
  return MediaModel().actions((self) => ({
    /** Fetch track from device */
    g_fetchTracks: flow(function* () {
      try {
        let granted = yield checkStoragePermissions();
        if (!granted) yield getStoragePermission();
        // if (isMediaLoaded) {
        if (1 == 2) {
          let media = yield getMediaWithCovers();
          console.log("getting t");
          self.g_tracks = media;
        } else {
          console.log("getting f");
          let results = yield MusicFiles.getAll(options);
          /** Temporary set __MEDIA for ios since it doesn't have local db */
          let media = 1 == 2 ? cleanupMedia(results) : __MEDIA;
          //   let media = IS_ANDROID ? cleanupMedia(results) : __MEDIA;
          self.g_tracks = media;
          console.log("media length: ", self.g_tracks.length);
          let mediaWithCovers = yield getMediaWithCovers();
          self.g_tracks = mediaWithCovers;
        }
      } catch (e) {
        errorReporter(e);
        self.g_areTracksLoaded = true;
      }
    }),

    /**
     * Get current track
     * @param currentTrack
     */
    async g_setCurrentTrack(
      currentTrack: dTrack,
      shouldPlayed: boolean = false
    ) {
      try {
        await TrackPlayer.reset();
        await TrackPlayer.add(currentTrack);
        self.g_currentTrack = currentTrack;
        shouldPlayed && TrackPlayer.play();
        //   dispatch({
        //     type: "set_playback",
        //     payload: true,
        //   });
      } catch (e) {
        errorReporter(e);
      }
    },
  }));
}

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

const getMediaWithCovers = async () => {
  const coverFolder = RNFetchBlob.fs.dirs.DocumentDir + "/.melo";
  let results = await MusicFiles.getAll({
    ...options,
    cover: true,
    coverFolder,
  });
  return cleanupMedia(results);
};

const __MEDIA = [
  {
    id: "1111",
    url:
      "https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj",
    title: "Longing",
    artist: "David Chavez",
    artwork:
      "https://cms-assets.tutsplus.com/uploads/users/114/posts/34296/image/Final-image.jpg",
    duration: 143,
  },
  {
    id: "2222",
    url:
      "https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E",
    title: "Soul Searching (Demo)",
    artist: "David Chavez",
    artwork:
      "https://images-na.ssl-images-amazon.com/images/I/717VbeZb0bL._AC_SL1500_.jpg",
    duration: 77,
  },
  {
    id: "3333",
    url:
      "https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI",
    title: "Lullaby (Demo)",
    artist: "David Chavez",
    artwork:
      "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/59dd3a65996579.5b073c5b3628d.gif",
    duration: 71,
  },
  {
    id: "4444",
    url:
      "https://drive.google.com/uc?export=download&id=1V-c_WmanMA9i5BwfkmTs-605BQDsfyzC",
    title: "Rhythm City (Demo)",
    artist: "David Chavez",
    artwork:
      "https://www.digitalmusicnews.com/wp-content/uploads/2020/04/DaBaby-Blame-It-On-Baby.jpg",
    duration: 106,
  },
];
