import React from "react";
//@ts-check
import { Dimensions, Platform, StatusBar } from "react-native";
import { scale } from "react-native-size-matters";
// export const scale = (value) => value;

/**
 * Check if device is iphoneX
 */
export function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

/**
 * A fn that gets statusbar height,
 * with option to skip on android,
 * due to its platform specification
 * 
 * @version 0.10.15
 */
export function getStatusBarHeight(safe?: string, isIosOnly?: "ios-only") {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: isIosOnly ? 0 : StatusBar.currentHeight,
    default: 0,
  });
}

/**
 * @description Get bottom space "safe area" of the device. Especially useful for iphone X screen
 * @param safe - Safe padding around bottom space
 */
export function getBottomSpace(safe?: string) {
  if (safe) {
    return isIphoneX() ? 34 + scale(10) : scale(10);
  } else {
    return isIphoneX() ? 34 : 0;
  }
}

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;

/**
 * A hook that gets dynamic dimensions
 * @version 0.9.19
 */
export const useDimension = (type: "screen" | "window" = "window") => {
  const [dimensions, setDimensions] = React.useState({
    window,
    screen,
  });

  const onChange = ({ window, screen }) => {
    setDimensions({ window, screen });
  };
  React.useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);
  //@ts-ignore
  const width = dimensions[type].width || Dimensions.get("window").width;
  //@ts-ignore
  const height = dimensions[type].height || Dimensions.get("window").height;
  return { width, height };
};

export const IS_ANDROID = Platform.OS === "android";

export const LOCAL_STORAGE_KEY = "mid5LocalStorage";
