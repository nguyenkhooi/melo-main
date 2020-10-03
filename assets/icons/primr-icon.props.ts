// import { IPcolors, IPpalette } from "./utils-typings";
import { ViewStyle } from "react-native";
import { KeyOf } from "utils";
import { iconOptions } from "./primr-icon";

/**
 * A list of icon names used in IconPrimr for type-check
 */
export type enum_IconName = KeyOf<typeof iconOptions>;

/**
 * Props of Icon<>
 */
export interface dIconPrimr {
  name: enum_IconName;
  size?: number;
  color?: string;
  containerStyle?: ViewStyle;
  preset?: "default" | "safe" | "circular" | "header";
  onPress?(): void;
}
export type enum_IconPkg =
  | "ion"
  | "fa5"
  | "feather"
  | "material"
  | "material-community"
  | "fontisto"
  | "entypo"
  | "simple-line-icon"
  | "antdesign";

export type dIconOptions = { type: enum_IconPkg; icon: string; scale?: number };
