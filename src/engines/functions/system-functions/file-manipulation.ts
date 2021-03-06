import { Toasty } from "components";
import RNFetchBlob from "rn-fetch-blob";

const mime = "audio/mpeg";

/**
 * Remove track from fs
 * @param track
 */
export const deleteTrack = (track) => async (dispatch) => {
  try {
    await RNFetchBlob.fs.unlink(track.url);
    await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
    dispatch({ type: "delete_track", payload: track });
  } catch (e) {
    Toasty("Please try again later", "Error Deleting This Track");
    console.warn(JSON.stringify(e));
  }
};

/**
 * Rename track
 * @param track
 * @param newName
 */
export const renameTrack = (track, newName: string) => async (dispatch) => {
  try {
    let pathArr = track.url.split("/");
    let extension = pathArr[pathArr.length - 1].split(".");
    extension = extension[extension.length - 1];
    pathArr[pathArr.length - 1] = `${newName}.${extension}`;
    let newPath = pathArr.join("/");
    let exists = await RNFetchBlob.fs.exists(newPath);
    if (exists) return Toasty("A file with the same name already exists");
    await RNFetchBlob.fs.mv(track.url, newPath);
    await RNFetchBlob.fs.scanFile([{ path: newPath, mime }]);
    await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
    dispatch({
      type: "rename_track",
      payload: { ...track, title: newName, url: newPath },
    });
  } catch (e) {
    Toasty("Please try again later", "Error Renaming This Track", "error");
    console.warn(JSON.stringify(e));
  }
};
