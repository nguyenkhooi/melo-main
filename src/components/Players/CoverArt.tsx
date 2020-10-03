import { img } from "assets";
// import { sstyled } from "components";
import React from "react";
import { Dimensions, Image } from "react-native";

const ImageSize = Dimensions.get("window").width * 0.82;

/**
 * Cover Art inside PlayerScreen
 * @param props
 */
export const CoverArt = (props) => {
  const imgSrc = props.artwork ? { uri: props.artwork } : img.placeholder;
  // return <Cover {...props} source={imgSrc} />;
  return (
    <Image
      {...props}
      source={imgSrc}
      style={{ width: ImageSize, height: ImageSize, borderRadius: 5 }}
    />
  );
};
