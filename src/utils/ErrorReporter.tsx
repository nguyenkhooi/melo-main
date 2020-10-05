// import RenderToast from "components/RenderToast";
import { Alert, Linking } from "react-native";

/**
 * Fn to report err client-side, by sending an email to dev
 * with errorCode and e.message
 *
 * @version 0.10.5
 */
export function errorReporter(e: Error, errorCode?: string) {
  console.log("ERR " + errorCode + ": ", e);
  function mailError() {
    Linking.openURL(
      `mailto:drkhoi16@gmail.com?subject=Melo error log&body=LOG:${errorCode}\n\n${JSON.stringify(
        e.message
      )}`
    );
  }

  //   RenderToast({
  //     title: "Error",
  //     message: "Send error log to developers?",
  //     type: "error",
  //   });
  Alert.alert(
    "Oops! an error ocurred",
    "Send error log to developers?",
    [
      { text: "Cancel", onPress: () => {} },
      { text: "Send", onPress: () => mailError(e) },
    ],
    { cancelable: true }
  );
}
