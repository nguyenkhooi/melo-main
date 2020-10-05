import { ErrorInfo } from "react";
// import RenderToast from "components/RenderToast";
import { Alert, Linking } from "react-native";

export function errorReporter(e: string, customMessage?: string) {
  console.log("ERR " + customMessage + ": ", e);
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

function mailError(e) {
  Linking.openURL(
    `mailto:drkhoi16@gmail.com?subject=Melo error log&body=LOG\n\n${JSON.stringify(
      e
    )}`
  );
}
