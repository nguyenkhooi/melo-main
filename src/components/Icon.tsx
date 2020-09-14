import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { IconProps } from "react-native-vector-icons/Icon";

export default function Icon(props: PROPS_Icon) {
  // const {n}=props
  const BrandedIcon = getType(props.type);
  return <BrandedIcon {...props} solid />;
}

const getType = (type: ENUM_IconPkg) => {
  switch (type) {
    case "fa5":
      return FontAwesome5;
    case "feather":
      return FeatherIcon;
    case "material":
      return MaterialIcon;
    case "material-community":
      return MaterialCommunityIcon;
    case "fontisto":
      return Fontisto;
    case "entypo":
      return EntypoIcon;
    case "simple-line-icon":
      return SimpleLineIcon;
    case "antdesign":
      return AntDesign;
    default:
      return MaterialIcon;
  }
};

export type PROPS_Icon = IconProps & { type: ENUM_IconPkg };
type ENUM_IconPkg =
  | "fa5"
  | "feather"
  | "material"
  | "material-community"
  | "fontisto"
  | "entypo"
  | "simple-line-icon"
  | "antdesign";
