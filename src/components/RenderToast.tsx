import Toast from "react-native-toast-message";
export { default as Toast } from "react-native-toast-message";

/**
 * An animated toast message component that can be called as function.
 *
 * @example
 * Toasty("Success!","A toast is created")
 *
 * @param message
 * @param title
 * @param type
 * @param position
 * @param visibilityTime
 * @param autoHide
 * @param topOffset
 * @param bottomOffset
 */
export function RenderToast(
  title: string,
  message?: string,
  type: "success" | "error" | "info" = "success",
  position: "top" | "bottom" = "bottom",
  visibilityTime: number = 2000,
  autoHide: boolean = true,
  topOffset: number = 30,
  bottomOffset: number = 40
) {
  Toast.show({
    text1: title,
    text2: message,
    type,
    position,
    visibilityTime,
    autoHide,
    topOffset,
    bottomOffset,
  });
}

/**
 * Custom Toast appearance.
 *  If nothing change, remember to mask them
 *  or the toast won't show up
 */
export const toastConfig = {
  //   success: (internalState) => (
  //     <View style={{ height: 60, width: "100%", backgroundColor: "pink" }}>
  //       <Text>{internalState.text1}</Text>
  //     </View>
  //   ),
  // success: () => {},
  // error: () => {},
  // info: () => {},
  // any_custom_type: () => {},
};
