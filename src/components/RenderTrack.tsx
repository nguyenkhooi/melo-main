import { CIRCULAR, IconPrimr, img } from "assets";
import { connector, dRedux, sethPlayback } from "engines";
import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import styled, { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { DEVICE_WIDTH, scale, spacing, TrackProps } from "utils";
import { Txt } from "./Generals";
import { sstyled } from "./Sstyled";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface dTrackComp extends dRedux {
  item: TrackProps;
  parent:
    | "track-scr"
    | "now-playing-scr"
    | "search-scr"
    | "contents-scr"
    | "playlist-scr";
  setOptions({ visible: boolean, item: TrackProps }): void;
}

/**
 * Track Info Render used in multiple TrackLists throughout the project
 * Component's behavior depends on its parent
 *
 * @version 0.10.5
 */
export const RenderTrack: React.FC<dTrackComp> = connector(
  React.memo(
    (props: dTrackComp) => {
      const {
        item,
        playback: { currentTrack, shuffle },
        media: { mediaFiles },
        setCurrentTrackID,
        setShuffle,
        setOptions,
        parent,
      } = props;

      async function onTrackPress() {
        if (item.id !== currentTrack.id) {
          switch (parent) {
            case "track-scr":
              /** If track is pressed,
               * set `nowPlayingTracks` using `setShuffle()`
               * NOTE should think more about this
               */
              await setCurrentTrackID(item.id);
              // await setShuffle(shuffle, mediaFiles);
              return;
              break;
            case "search-scr":
              setShuffle(shuffle, mediaFiles);
              setCurrentTrackID(item.id);
              return;
              break;
            case "playlist-scr":
              return;
              break;
            case "now-playing-scr":
              return;
              break;
            case "contents-scr":
              return;
              break;
            default:
              return;
              break;
          }
        }
      }

      const coverSrc = item.artwork ? { uri: item.artwork } : img.placeholder;
      return (
        <Touchable onPress={onTrackPress} activeOpacity={0.4}>
          <Thumbnail source={coverSrc} />
          <CtnrTrackInfo>
            <Title numberOfLines={1} current={item.id === currentTrack.id}>
              {/* {item.title} */}
              {item.id}
            </Title>
            <Artist {...props} numberOfLines={1}>
              {item.artist}
            </Artist>
            {/* <Text>{JSON.stringify(Object.keys(item))}</Text> */}
          </CtnrTrackInfo>
          <IconPrimr
            preset={`safe`}
            name={"dots_vertical"}
            size={20}
            color={contrastTransColor(0.75)(props)}
            onPress={() => setOptions({ visible: true, item })}
          />
        </Touchable>
      );
    },
    (prevProps: dTrackComp, nextProps: dTrackComp) =>
      !(
        nextProps.playback.currentTrack.id === nextProps.item.id ||
        prevProps.playback.currentTrack.id === prevProps.item.id ||
        prevProps.item !== nextProps.item
      )
  )
);

export default withTheme(RenderTrack);

const Touchable = sstyled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  height: scale(65),
  marginTop: scale(10),
  paddingLeft: spacing[2],
});

const Thumbnail = sstyled(Image)({
  height: scale(50),
  width: scale(50),
  borderRadius: scale(3),
});

const CtnrTrackInfo = sstyled(View)({
  flexDirection: "column",
  flex: 1,
  justifyContent: "space-evenly",
  height: scale(52),
  marginLeft: spacing[2],
});

const Title = sstyled(Txt.P1)({
  fontFamily: CIRCULAR,
  width: DEVICE_WIDTH / 2,
});

const Artist = sstyled(Txt.P2)((p) => ({
  fontFamily: CIRCULAR,
  width: DEVICE_WIDTH / 2,
  color: contrastTransColor(0.75)(p),
}));

// const Title = styled.Text`
//   font-family: ${CIRCULAR};
//   font-size: 14px;
//   width: ${SCREEN_WIDTH / 2}px;
//   color: ${(props) =>
//     props.current ? foregroundColor(props) : contrastColor(props)};
// `;

// const Artist = styled.Text`
//   /* font-family: 'CircularLight'; */
//   font-size: 14px;
//   width: ${SCREEN_WIDTH / 2}px;
//   color: ${contrastTransColor(0.75)};
// `;

// const Touchable = styled.TouchableOpacity`
//   flex-direction: row;
//   align-items: center;
//   height: 65px;
//   margin-top: 10px;
//   padding-left: 15px;
// `;

// const Thumbnail = styled.Image`
//   height: 50px;
//   width: 50px;
//   border-radius: 2px;
// `;

// const CtnrTrackInfo = styled.View`
//   flex-direction: column;
//   flex: 1;
//   height: 52px;
//   margin-left: 15px;
//   justify-content: space-evenly;
// `;
