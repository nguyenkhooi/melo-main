import { CIRCULAR, IconPrimr, img } from "assets";
import { connector, dRedux } from "engines";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { DEVICE_WIDTH, scale, spacing, TrackProps } from "utils";
import { sstyled, Txt } from "./Generals";

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
 * @version 0.10.10 *( disable to touch until `onTrackPress()` is done )*
 */
export const RenderTrack: React.FC<dTrackComp> = React.memo(
  (props: dTrackComp) => {
    const {
      item,
      playback: { currentTrack },
      media: { mediaFiles, mediaIDs },
      setCurrentTrackID,
      setNowPlayingTracks,
      setOptions,
      parent = "track-scr",
    } = props;

    const [_isDisabled, shouldDisabled] = React.useState(false);

    async function onTrackPress() {
      //* to prevent pressing the same track multiple times
      if (item.id !== currentTrack.id) {
        shouldDisabled(true);
        switch (parent) {
          case "track-scr":
            // await setCurrentTrackID(item.id);
            await setNowPlayingTracks(mediaIDs, mediaFiles, true, item.id);
            return shouldDisabled(false);
            break;
          case "search-scr":
            await setCurrentTrackID(item.id);
            return shouldDisabled(false);
            break;
          case "playlist-scr":
            await setCurrentTrackID(item.id);
            return shouldDisabled(false);
            break;
          case "now-playing-scr":
            await setCurrentTrackID(item.id);
            return shouldDisabled(false);
            break;
          case "contents-scr":
            await setCurrentTrackID(item.id);
            return shouldDisabled(false);
            break;
          default:
            return shouldDisabled(false);
            break;
          // }
        }
      }
    }

    const coverSrc = item.artwork ? { uri: item.artwork } : img.placeholder;
    return (
      <Touchable
        disabled={_isDisabled}
        onPress={() => onTrackPress()}
        onLongPress={() => setOptions({ visible: true, item })}
        activeOpacity={0.4}
      >
        <Thumbnail {...props} source={coverSrc} />
        <CtnrTrackInfo>
          <Title
            {...props}
            numberOfLines={1}
            current={item.id === currentTrack.id}
          >
            {/* {item.title} */}
            {item.duration}
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
);

export default connector(withTheme(RenderTrack));

const Touchable = sstyled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  height: scale(65),
  marginTop: scale(10),
  paddingLeft: spacing[2],
});

const Thumbnail = sstyled(Image)((p) => ({
  height: scale(50),
  width: scale(50),
  borderRadius: scale(3),
  backgroundColor: p.theme.elevatedBG,
}));

const CtnrTrackInfo = sstyled(View)({
  flexDirection: "column",
  flex: 1,
  justifyContent: "space-evenly",
  height: scale(52),
  marginLeft: spacing[2],
});

const Title = sstyled(Txt.P1)((p) => ({
  fontFamily: CIRCULAR,
  width: DEVICE_WIDTH / 2,
  color: p.current ? foregroundColor(p) : contrastColor(p),
}));

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
