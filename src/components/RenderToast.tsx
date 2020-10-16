// import Toasty from "react-native-toast-message";

import { Toasty } from "./Generals";

interface dToast {
  title: string;
  message?: string;
  type?: "success" | "error" | "info" | "error-log";
  position?: "top" | "bottom";
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
}
export default function RenderToast(props: dToast) {
  const {
    message,
    title,
    type = "success",
    position = "bottom",
    visibilityTime = 2000,
    autoHide = true,
    topOffset = 30,
    bottomOffset = 40,
  } = props;
  Toasty.show(title, { type, duration: visibilityTime });

  // Toasty.show({
  //   text1: title,
  //   text2: message,
  //   type,
  //   position,
  //   visibilityTime,
  //   autoHide,
  //   topOffset,
  //   bottomOffset,
  // });

  //   ToastAndroid.showWithGravityAndOffset(
  //     message,
  //     ToastAndroid.SHORT,
  //     ToastAndroid.BOTTOM,
  //     0,
  //     300
  //   );
}
