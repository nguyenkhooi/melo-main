import { RenderToast, Toasty } from "components";
import { Alert } from "react-native";
import { Dispatch } from "redux";
import RNFetchBlob from "rn-fetch-blob";
import { TrackProps } from "utils";
import { DeleteTrackAction, RenameTrackAction } from "../types";

const mime = "audio/mpeg";

/**
 * Delete the selected track from device
 * @param track
 */
export const deleteTrack = (track: TrackProps) => async (
  dispatch: Dispatch<DeleteTrackAction>
) => {
  try {
    await RNFetchBlob.fs.unlink(track.url);
    await RNFetchBlob.fs.scanFile([{ path: track.url, mime }]);
    dispatch({ type: "delete_track", payload: track });
  } catch (e) {
    Alert.alert(JSON.stringify(e));
  }
};

/**
 * Rename selected track with given name
 * @param track
 * @param newName
 */
export const renameTrack = (track: TrackProps, newName: string) => async (
  dispatch: Dispatch<RenameTrackAction>
) => {
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
    //* NOTE update err handling
    Alert.alert(JSON.stringify(e));
  }
};
