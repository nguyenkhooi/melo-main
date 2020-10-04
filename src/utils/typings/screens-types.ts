import { NavigationProp } from "@react-navigation/native";
import { ReactElement } from "react";
import { dTheme } from "themes";

export interface dSCR extends ReactElement<any, any> {
  /**
   * NOTE prroperly setup types later
   */
  navigation: NavigationProp<{}>;
  theme: dTheme;
}
