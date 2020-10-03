import { NavigationProp } from "@react-navigation/native";
import { dTheme } from "themes";

export interface dSCR extends React.FC {
  /**
   * NOTE prroperly setup types later
   */
  navigation: NavigationProp<{}>;
  theme: dTheme;
}
