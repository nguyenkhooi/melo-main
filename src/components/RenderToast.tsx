import Toasty from "react-native-toast-message";

export default function RenderToast(
  message: string,
  title: string,
  type: "success" | "error" | "info" = "success",
  position: "top" | "bottom",
  visibilityTime: number = 2000,
  autoHide: boolean = true,
  topOffset: number = 30,
  bottomOffset: number = 40
) {
  Toasty.show({
    text1: title,
    text2: message,
    type,
    position,
    visibilityTime,
    autoHide,
    topOffset,
    bottomOffset,
  });
  //   ToastAndroid.showWithGravityAndOffset(
  //     message,
  //     ToastAndroid.SHORT,
  //     ToastAndroid.BOTTOM,
  //     0,
  //     300
  //   );
}
