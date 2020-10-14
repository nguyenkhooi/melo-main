import { CIRCULAR, IconPrimr, img } from "assets";
import { ReduxActions, ReduxStates, setCurrentTrackk } from "engines";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { connect, useDispatch } from "react-redux";
import { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { DEVICE_WIDTH, dSCR, scale, spacing, TrackProps } from "utils";
import { sstyled, Txt } from "./Generals";
import { TrackPlaya } from "./TrackPlaya/TrackPlaya";

const DEV_MODE = true;

const mapStates = (states: ReduxStates) => {
  const {
    playback: { currentTrack },
  } = states;
  return { currentTrack };
};

const mapDispatch = { setCurrentTrackk } as ReduxActions;

/**
 * Track Info Render used in multiple TrackLists throughout the project
 * Component's behavior depends on its parent
 *
 * @version 0.10.13 *( connector -> connect() w mapStates and mapDispatch )*
 * @author nguyenkhooi
 */
export const RenderTrack: React.FC<dTrackComp> = React.memo(
  (props: dTrackComp) => {
    const {
      currentTrack,
      setCurrentTrackk,
      item,
      setOptions,
      parent = "default",
    } = props;
    const dispatch = useDispatch();
    const [_isDisabled, shouldDisabled] = React.useState(false);
    const thisTrackPlaya = TrackPlaya.getInstance();
    async function onTrackPress() {
      //* to prevent pressing the same track multiple times
      if (item.id !== currentTrack.id) {
        shouldDisabled(true);
        switch (parent) {
          case "track-scr":
            await setCurrentTrackk(item);
            thisTrackPlaya.play();
            return shouldDisabled(false);
            break;
          case "search-scr":
            await setCurrentTrackk(item);
            thisTrackPlaya.play();
            return shouldDisabled(false);
            break;
          case "playlist-scr":
            await setCurrentTrackk(item);
            thisTrackPlaya.play();
            return shouldDisabled(false);
            break;
          case "now-playing-scr":
            await setCurrentTrackk(item);
            thisTrackPlaya.play();
            return shouldDisabled(false);
            break;
          case "contents-scr":
            await setCurrentTrackk(item);
            thisTrackPlaya.play();
            return shouldDisabled(false);
            break;
          case "default":
            await setCurrentTrackk(item);
            thisTrackPlaya.play();
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
            {item.title}
          </Title>
          <Artist {...props} numberOfLines={1}>
            {`${DEV_MODE ? item.id + "•" : ""}${item.artist} `}
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
      nextProps.currentTrack.id === nextProps.item.id ||
      prevProps.currentTrack.id === prevProps.item.id ||
      prevProps.item !== nextProps.item ||
      prevProps.theme.current !== nextProps.theme.current
    )
);

export default connect(mapStates, mapDispatch)(withTheme(RenderTrack));

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

interface dState extends ReturnType<typeof mapStates> {}
interface dActions extends Partial<typeof mapDispatch> {}
interface dTrackComp extends dState, dActions, dSCR {
  item: TrackProps;
  parent:
    | "default"
    | "track-scr"
    | "now-playing-scr"
    | "search-scr"
    | "contents-scr"
    | "playlist-scr";
  setOptions({ visible: boolean, item: TrackProps }): void;
}
