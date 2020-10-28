import { CIRCULAR, CIRCULAR_BOLD, IconPrimr, img } from "assets";
import { sstyled, TrackPlaya, Txt } from "components";
import {
  ReduxActions,
  ReduxStates,
  setCurrentTrackk,
  useAppContext
} from "engines";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { DEVICE_WIDTH, scale, spacing, TrackProps } from "utils";

const DEV_MODE = false;

const _mapStates = (states: ReduxStates) => {
  const {
    playback: { currentTrack },
  } = states;
  return { currentTrack };
};

const _mapDispatch = { setCurrentTrackk } as ReduxActions;

/**
 * Track Info Render used in multiple TrackLists throughout the project
 * Component's behavior depends on its parent
 *
 * @version 0.10.28
 * - * renderfy *
 * @author nguyenkhooi
 */
export function TrackItem(p: dTrackComp) {
  const RENDER = React.memo(
    connect(
      _mapStates,
      _mapDispatch
    )(
      (rx: dState & dActions) => {
        const {
          currentTrack,
          setCurrentTrackk,
          item,
          onLongPress,
          setOptions,
          parent = "default",
        } = { ...p, ...rx };
        const { C } = useAppContext();
        const [_isDisabled, shouldDisabled] = React.useState(false);
        const thisTrackPlaya = TrackPlaya.getInstance();
        async function onTrackPress() {
          //* to prevent pressing the same track multiple times
          if (
            !!currentTrack &&
            !!currentTrack.id &&
            item.id !== currentTrack.id
          ) {
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
            onLongPress={() =>
              !!onLongPress
                ? onLongPress()
                : setOptions({ visible: true, item })
            }
            activeOpacity={0.4}
          >
            <Thumbnail source={coverSrc} />
            <CtnrTrackInfo>
              <Title numberOfLines={1} current={item.id === currentTrack.id}>
                {item.title}
              </Title>
              <Artist numberOfLines={1}>
                {`${DEV_MODE ? item.id + "•" : ""}${item.artist} `}
              </Artist>
              {/* <Text>{JSON.stringify(Object.keys(item))}</Text> */}
            </CtnrTrackInfo>
            <IconPrimr
              preset={`safe`}
              name={"dots_vertical"}
              size={20}
              color={C.dim}
              onPress={() => setOptions({ visible: true, item })}
            />
          </Touchable>
        );
      }
      // (prevProps: dTrackComp, nextProps: dTrackComp) => {
      //   if (!!prevProps.currentTrack || !!nextProps.currentTrack) {
      //     !(
      //       // nextProps.currentTrack.id === nextProps.item.id ||
      //       (
      //         prevProps.currentTrack.id === prevProps.item.id ||
      //         prevProps.item !== nextProps.item ||
      //         prevProps.theme.current !== nextProps.theme.current
      //       )
      //     );
      //   } else {
      //     !(
      //       prevProps.item !== nextProps.item ||
      //       prevProps.theme.current !== nextProps.theme.current
      //     );
      //   }
      // }
    )
  );

  return <RENDER />;
}

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
  backgroundColor: p.C.surface,
}));

const CtnrTrackInfo = sstyled(View)({
  flexDirection: "column",
  flex: 1,
  justifyContent: "space-evenly",
  height: scale(52),
  marginLeft: spacing[2],
});

const Title = sstyled(Txt.P1)((p) => ({
  fontFamily: CIRCULAR_BOLD,
  width: DEVICE_WIDTH / 2,
  color: p.current ? p.C.primary : p.C.text,
}));

const Artist = sstyled(Txt.P2)((p) => ({
  fontFamily: CIRCULAR,
  width: DEVICE_WIDTH / 2,
  color: p.C.dim,
}));

interface dState extends ReturnType<typeof _mapStates> {}
interface dActions extends Partial<typeof _mapDispatch> {}
interface dTrackComp {
  item: TrackProps;
  parent:
    | "default"
    | "track-scr"
    | "now-playing-scr"
    | "search-scr"
    | "contents-scr"
    | "playlist-scr";
  setOptions?({ visible: boolean, item: TrackProps }): void;
  onLongPress?(): void;
}
