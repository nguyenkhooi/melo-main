import { PermissionsAndroid } from "react-native";
import {
  check,
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from "react-native-permissions";
import { IS_ANDROID } from "./helpers";

const getStoragePermission = async () => {
  let permissions = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  if (permissions["android.permission.READ_EXTERNAL_STORAGE"] === "granted") {
    return true;
  } else {
    return false;
  }
};

export const checkStoragePermissions = async () => {
  let granted: boolean = true;
  try {
    switch (IS_ANDROID) {
      case true:
        let result = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        if (!result) {
          let permissions = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);

          granted =
            permissions["android.permission.READ_EXTERNAL_STORAGE"] ===
            "granted";
        }
        break;
      // case true:
      //   if (results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] != "granted") {
      //     requestMultiple([
      //       PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      //       PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      //     ]).then((result) => {
      //       if (
      //         result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted"
      //       ) {
      //         granted = true;
      //       } else {
      //         granted = false;
      //       }
      //     });
      //   } else {
      //     granted = true;
      //   }
      //   break;
      case false:
        let result2 = await checkMultiple([PERMISSIONS.IOS.MEDIA_LIBRARY]);
        if (result2[PERMISSIONS.IOS.MEDIA_LIBRARY] != "granted") {
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
