import { Alert, PermissionsAndroid } from "react-native";
import {
  check,
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from "react-native-permissions";
import { IS_ANDROID } from "./helpers";

export const getStoragePermission = async () => {
  let permissions = await PermissionsAndroid.requestMultiple(
    [
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ],
    {
      title: "Melo Storage Permission",
      message: "Melo needs to access your storage",
    }
  );

  if (permissions["android.permission.READ_EXTERNAL_STORAGE"] === "granted") {
    return;
  } else {
    null;
    // Alert.alert(
    //   "Permission required",
    //   "Allow Melo to access your storage",
    //   [{ text: "OK", onPress: async () => await getStoragePermission() }],
    //   { cancelable: false }
    // );
  }
};

export const checkStoragePermissions = async () => {
  let granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  );
  return granted;
};

export const checkStoragePermissionss = async () => {
  let granted: boolean;
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
