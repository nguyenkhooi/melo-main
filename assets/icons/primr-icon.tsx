// import Octicons from "react-native-vector-icons/Octicons"
import * as R from "ramda";
import React from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
//* rn-vector-icons imports
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import { scale } from "utils";
import { dIconOptions, dIconPrimr, enum_IconPkg } from "./primr-icon.props";

// const PrimrMoon = createIconSetFromIcoMoon(
//   icoMoonConfig,
//   "IconPrimr",
//   "iconcarp.ttf"
// );

/**
 * Icon Options to use with IconPrimr<>
 */
export const iconOptions = {
  admin: { type: "fa5", icon: "user-tie" } as dIconOptions,
  archive: { type: "fa5", icon: "archive" } as dIconOptions,
  arrow_left: {
    type: "fa5",
    icon: Platform.OS == "android" ? "arrow-left" : "chevron-left",
  } as dIconOptions,
  arrow_right: {
    type: "fa5",
    icon: Platform.OS == "android" ? "arrow-right" : "chevron-right",
  } as dIconOptions,
  arrow_down: {
    type: "fa5",
    icon: Platform.OS == "android" ? "arrow-down" : "chevron-down",
  } as dIconOptions,
  award: { type: "fa5", icon: "award" } as dIconOptions,
  backward: { type: "fa5", icon: "backward" } as dIconOptions,
  bars: { type: "fa5", icon: "bars" } as dIconOptions,
  ban: { type: "fa5", icon: "ban" } as dIconOptions,
  calendar: { type: "fa5", icon: "calendar" } as dIconOptions,
  chevron_right: {
    type: "fa5",
    icon: "chevron-right",
  } as dIconOptions,
  chevron_down: {
    type: "fa5",
    icon: "chevron-down",
  } as dIconOptions,
  check: {
    type: "fa5",
    icon: "check",
  } as dIconOptions,
  compass: { type: "fa5", icon: "compass" } as dIconOptions,
  cog: { type: "fa5", icon: "cog" } as dIconOptions,
  contacts: { type: "fa5", icon: "address-book" } as dIconOptions,
  dots_horizontal: { type: "fa5", icon: "ellipsis-h" } as dIconOptions,
  dots_vertical: { type: "fa5", icon: "ellipsis-v" } as dIconOptions,
  home: { type: "fa5", icon: "home" } as dIconOptions,
  exclamation_circle: {
    type: "fa5",
    icon: "exclamation-circle",
  } as dIconOptions,
  email: { type: "fa5", icon: "envelope-open-text" } as dIconOptions,
  eye: { type: "fa5", icon: "eye" } as dIconOptions,
  eye_slash: { type: "fa5", icon: "eye-slash" } as dIconOptions,
  forward: { type: "fa5", icon: "forward" } as dIconOptions,
  list: { type: "fa5", icon: "th-list" } as dIconOptions,
  lock: { type: "fa5", icon: "lock" } as dIconOptions,
  loop: { type: "entypo", icon: "loop", scale: 1.1 } as dIconOptions,
  loop_one: {
    type: "material-community",
    icon: "numeric-1-box",
  } as dIconOptions,
  minus: { type: "fa5", icon: "minus" } as dIconOptions,
  music: { type: "fa5", icon: "music" } as dIconOptions,
  pause: { type: "fa5", icon: "pause" } as dIconOptions,
  pen: { type: "fa5", icon: "pen" } as dIconOptions,
  placeholder: { type: "fa5", icon: "kickstarter-k" } as dIconOptions,
  play: { type: "fa5", icon: "play" } as dIconOptions,
  playlist: {
    type: "material-community",
    icon: "playlist-music",
    scale: 1.4,
  } as dIconOptions,

  plus: { type: "fa5", icon: "plus" } as dIconOptions,
  rocket: { type: "fa5", icon: "rocket" } as dIconOptions,
  search: { type: "fa5", icon: "search" } as dIconOptions,
  share: { type: "fa5", icon: "share-alt" } as dIconOptions,
  shuffle: { type: "entypo", icon: "shuffle", scale: 1.1 } as dIconOptions,
  sms: { type: "fa5", icon: "sms" } as dIconOptions,
  trash: { type: "fa5", icon: "trash" } as dIconOptions,
  tv: { type: "fa5", icon: "tv" } as dIconOptions,
  videocam: { type: "ion", icon: "videocam" } as dIconOptions,
  unlock: { type: "fa5", icon: "unlock" } as dIconOptions,
  x: { type: "fa5", icon: "times" } as dIconOptions,
  /**
   * Card Brand Icon. Have to fit Stripe's brand name
   * @see https://stripe.com/docs/api/cards/object#card_object-brand
   */
  "american express": {
    type: "fontisto",
    icon: "american-express",
    scale: 0.8,
  } as dIconOptions,
  "diners club": { type: "fa5", icon: "cc-diners-club" } as dIconOptions,
  discover: { type: "fa5", icon: "cc-discover" } as dIconOptions,
  jcb: { type: "fa5", icon: "cc-jcb" } as dIconOptions,
  mastercard: { type: "fa5", icon: "cc-mastercard" } as dIconOptions,
  visa: { type: "fa5", icon: "cc-visa" } as dIconOptions,
};

/**
 * Main and the only Icon component of the whole codebase
 *
 * @version 1.10.4
 * @example
 *  <IconPrimr preset={`safe`} name={`arrow_left`} size={30} color={"black"} />
 */
export default function IconPrimr(props: dIconPrimr) {
  const {
    preset = "safe",
    name = "placeholder",
    size = 20,
    color = "dodgerblue",
    disabled = false,
    containerStyle = {},
    onPress,
  } = props;
  const _containerStyle: ViewStyle = R.mergeAll(
    R.flatten([
      presets(size)[preset].containerStyle ||
        presets(size).default.containerStyle,
      containerStyle,
    ])
  );
  const _iconStyle: dIconPrimr = R.mergeAll(
    R.flatten([
      presets(size)[preset].icon || presets().default.icon,
      {
        size,
        color,
        name,
      },
    ])
  );
  if (iconOptions[name] == undefined) {
    console.log("Icon err: icon " + name + " not existed in iconOptions!");
    return (
      <View
        style={{ ..._containerStyle, borderWidth: 1, borderColor: "tomato" }}
      />
    );
  } else {
    const { type, scale = 1, icon } = iconOptions[name];
    const { size, color } = _iconStyle;
    const BrandedIcon = getType(type);
    const IconContainer = !!onPress ? TouchableOpacity : View;
    return (
      <IconContainer
        disabled={disabled}
        style={_containerStyle}
        onPress={onPress}
      >
        <BrandedIcon name={icon} solid size={size * scale} color={color} />
      </IconContainer>
    );
  }
}

/** Get Icon type from `react-native-vector-icons */
const getType = (type: enum_IconPkg) => {
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
    case "ion":
      return Ionicons;
    default:
      return MaterialIcon;
  }
};

export const presets = (size?: number) => ({
  default: {
    containerStyle: null,
    icon: { name: null, size: scale(11), color: "black" },
  },
  safe: {
    containerStyle: { margin: scale(5) },
    icon: { name: null, size: scale(11), color: "black" },
  },
  header: {
    containerStyle: null,
    icon: { name: null, size: scale(24), color: "black" },
  },
  circular: {
    containerStyle: {
      borderRadius: size * 2,
      width: size * 1.8,
      height: size * 1.8,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: null,
  },
});
