import { ToastAndroid } from "react-native";

import Toasty from "react-native-toast-message";

export default function RenderToast(message: string) {
  Toasty.show({ text2: message });
  //   ToastAndroid.showWithGravityAndOffset(
  //     message,
  //     ToastAndroid.SHORT,
  //     ToastAndroid.BOTTOM,
  //     0,
  //     300
  //   );
}
