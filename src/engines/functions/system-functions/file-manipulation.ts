import { Toasty } from "components";
import RenderToast from "components/RenderToast";
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
    Toasty.show("Please try again later", { type: "danger" });
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
    if (exists)
      return Toasty.show("A file with the same name already exists", {
        type: "danger",
      });

    await RNFetchBlob.fs.mv(track.url, newPath);
    await RNFetchBlob.fs.scanFile([{ path: newPath, mime }]);
    await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
    dispatch({
      type: "rename_track",
      payload: { ...track, title: newName, url: newPath },
    });
  } catch (e) {
    Toasty.show("Cannot rename this track", { type: "danger" });
    console.warn(JSON.stringify(e));
  }
};
