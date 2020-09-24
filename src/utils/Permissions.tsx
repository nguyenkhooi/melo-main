import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple
} from "react-native-permissions";
import { IS_ANDROID } from "./helpers";

export const checkStoragePermissions = async () => {
  let granted: boolean = true;
  try {
    let results = await checkMultiple(
      IS_ANDROID
        ? [
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ]
        : [PERMISSIONS.IOS.MEDIA_LIBRARY]
    );

    switch (IS_ANDROID) {
      case true:
        if (results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] != "granted") {
          requestMultiple([
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          ]).then((result) => {
            if (
              result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted"
            ) {
              granted = true;
            } else {
              granted = false;
            }
          });
        } else {
          granted = true;
        }
        break;
      case false:
        if (results[PERMISSIONS.IOS.MEDIA_LIBRARY] != "granted") {
          requestMultiple([PERMISSIONS.IOS.MEDIA_LIBRARY]).then((result) => {
            if (result[PERMISSIONS.IOS.MEDIA_LIBRARY] === "granted") {
              granted = true;
            } else {
              granted = false;
            }
          });
        } else {
          granted = true;
        }
        break;
    }
  } catch (error) {
    console.warn("error checking permission: ", error);
  }

  return granted;
};
