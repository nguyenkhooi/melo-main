import MusicFiles from "react-native-get-music-files";
import RNFetchBlob from "rn-fetch-blob";
import {
  checkStoragePermissions,
  cleanupMedia,
  errorReporter,
  getStoragePermission,
  IS_ANDROID,
} from "utils";

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
export function getMedia(isMediaLoaded: boolean) {
  return new Promise(async (resolve, reject) => {
    console.log("getting");
    try {
      let granted = await checkStoragePermissions();
      if (!granted) await getStoragePermission();
      // if (isMediaLoaded) {
      if (1 == 2) {
        let media = await getMediaWithCovers();
        console.log("getting t");
        resolve({ type: "get_media_success", payload: media });
        // resolve({ type: "current_list", payload: media });
      } else {
        console.log("getting f");
        let results = await MusicFiles.getAll(options);
        /** Temporary set __MEDIA for ios since it doesn't have local db */
        let media = /* IS_ANDROID */ 1 == 2 ? cleanupMedia(results) : __MEDIA;
        resolve({ type: "get_media_success", payload: media });
        let mediaWithCovers = await getMediaWithCovers();
        resolve({ type: "get_media_success", payload: mediaWithCovers });
      }
    } catch (e) {
      errorReporter(e);
    }
  });
}

async function getMediaWithCovers() {
  const coverFolder = RNFetchBlob.fs.dirs.DocumentDir + "/.melo";
  let results = await MusicFiles.getAll({
    ...options,
    cover: true,
    coverFolder,
  });
  return cleanupMedia(results);
}

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
