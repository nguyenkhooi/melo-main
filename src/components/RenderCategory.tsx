import { CIRCULAR, CIRCULAR_BOLD, img } from "assets";
import React from "react";
import { Dimensions, TouchableNativeFeedback, View, Image } from "react-native";
import { withTheme } from "styled-components/native";
import { elevatedBGColor, contrastColor, contrastTransColor } from "themes";
import { scale } from "utils";

import { Txt, sstyled } from "./Generals";

const SCREEN_WIDTH = Dimensions.get("window").width;
const itemWidth = SCREEN_WIDTH / 2 - 25;
const itemHeight = itemWidth + itemWidth / 8;

function RenderCategory(props) {
  const itemMargin =
    props.index % 2 === 0 ? { marginLeft: 18, marginRight: 14 } : {};
  itemMargin.marginTop = 20;
  const imageSource = props.image ? { uri: props.image } : img.placeholder;
  const subText = `${props.numOfTracks} ${
    props.numOfTracks > 1 ? "tracks" : "track"
  }`;
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <View style={itemMargin}>
        <Thumbnail {...props} source={imageSource} />
        <CtnrTrackInfo {...props}>
          <TxtArtist {...props} numberOfLines={1}>
            {props.title}
          </TxtArtist>
          <TxtSubtitle {...props}>{subText}</TxtSubtitle>
        </CtnrTrackInfo>
      </View>
    </TouchableNativeFeedback>
  );
}

export default withTheme(RenderCategory);

const Thumbnail = sstyled(Image)((p) => ({
  width: itemWidth,
  height: itemHeight - itemHeight / 4,
  borderTopRightRadius: scale(5),
  borderTopLeftRadius: scale(5),
  backgroundColor: elevatedBGColor(p),
}));

const CtnrTrackInfo = sstyled(View)((p) => ({
  height: itemHeight / 4,
  width: itemWidth,
  justifyContent: "space-evenly",
  borderBottomRightRadius: scale(5),
  borderBottomLeftRadius: scale(5),
  marginVertical: scale(5),
  backgroundColor: elevatedBGColor(p),
}));

const TxtArtist = sstyled(Txt.P1)((p) => ({
  fontFamily: CIRCULAR_BOLD,
  marginHorizontal: scale(10),
  color: contrastColor(p),
}));
const TxtSubtitle = sstyled(Txt.P2)((p) => ({
  fontFamily: CIRCULAR,
  marginHorizontal: scale(10),
  color: contrastTransColor(0.75)(p),
}));

// const Thumbnail = styled.Image`
//   width: ${itemWidth}px;
//   height: ${itemHeight - itemHeight / 4}px;
//   border-top-right-radius: 5px;
//   border-top-left-radius: 5px;
// `;

// const CtnrTrackInfo = styled.View`
//   height: ${itemHeight / 4}px;
//   width: ${itemWidth}px;
//   justify-content: space-evenly;
//   border-bottom-right-radius: 5px;
//   border-bottom-left-radius: 5px;
//   margin-top: 5px;
//   margin-bottom: 5px;
//   elevation: 2;
//   background-color: ${elevatedBGColor};
// `;

// const TxtArtist = styled.Text`
//   font-size: 13px;
//   /* font-family: 'CircularBold'; */
//   margin-left: 10px;
//   margin-right: 10px;
//   color: ${contrastColor};
// `;

// const TxtSubtitle = styled.Text`
//   font-size: 10px;
//   font-family: ${CIRCULAR};
//   margin-left: 11px;
//   color: ${contrastTransColor(0.75)};
// `;
