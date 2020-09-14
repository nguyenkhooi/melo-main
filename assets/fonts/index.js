//@ts-check

import { Platform } from "react-native";

export const CIRCULAR = Platform.OS == "android" ? "Circular" : "Circular Std";
export const CIRCULAR_BOLD =
  Platform.OS == "android" ? "CircularBold" : "Circular Std";
export const CIRCULAR_LIGHT =
  Platform.OS == "android" ? "CircularLight" : "Circular Std";
export const PRODUCT_SANS =
  Platform.OS == "android" ? "ProductSans" : "Product Sans";
export const PRODUCT_SANS_BOLD =
  Platform.OS == "android" ? "ProductSansBold" : "Product Sans";
export const PRODUCT_SANS_LIGHT =
  Platform.OS == "android" ? "ProductSansLight" : "Product Sans";
