import {
  CIRCULAR_BOLD,
  CIRCULAR_LIGHT,
  dIconPrimr,
  IconPrimr,
  img,
} from "assets";
import { connector, dRedux } from "engines";
import { navigate } from "navigation";
import React, { useRef } from "react";
import {
  Animated,
  Image,
  PanResponder,
  TouchableOpacity,
  View,
} from "react-native";
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";
import styled, { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor } from "themes";
import { C, DEVICE_WIDTH, dSCR, getBottomSpace, spacing } from "utils";
import ProgressBar from "./ProgressBar";
import { sstyled } from "./Sstyled";

interface dCOMP_PlayerFooter extends dSCR, dRedux {}

/**
 * One of the most animated-complex components of the whole project,
 *
 * PlayerFooter<> is a footer with playback control. It has an ability to:
 * -  Show/hide based on specific screen, with fadeInUp/fadeOutDown animation
 * -  Play/Pause, Forward button
 * -  Swipe horizontally to skip/return track
 * -  Swipe vertically to open SS_PlayerScreen
 *
 * @version 1.1.0
 * @param props
 */
function PlayerFooter(props: dCOMP_PlayerFooter) {
  const {
    playback: { currentTrack },
    media: { mediaFiles },
    hideFooter,
    theme,
  } = props;
  const { position, duration } = useTrackPlayerProgress(100);
  // const navigation = useNavigation();

  const progress = position / duration;
  const coverSrc = currentTrack.artwork
    ? { uri: currentTrack.artwork }
    : img.placeholder;

  return (
    /** NOTE replace with animation. See _toggleFooter() */
    // footerVisible &&
    currentTrack.id !== "000" && (
      <CtnrFooter {...props} onHideFooter={() => navigate("player-scr")}>
        <CtnrFooterContent {...props}>
          <Thumbnail
            source={coverSrc}
            onPress={async () => {
              await hideFooter();
              navigate("player-scr");
            }}
          />
          <CtnrTrackInfo>
            <Title numberOfLines={1}>{currentTrack.title || "unknown"}</Title>
            <Artist numberOfLines={1}>
              {currentTrack.artist || "unknown"}
            </Artist>
          </CtnrTrackInfo>
        </CtnrFooterContent>
        <ProgressWrapper>
          <Progress
            progress={isNaN(progress) ? 0 : +progress.toFixed(3)}
            color={theme.foreground}
          />
        </ProgressWrapper>
      </CtnrFooter>
    )
  );
}

const Y_SWIPE_DELTA = 100;
const X_SWIPE_DELTA = 70;

interface dFooterCtnr extends dCOMP_PlayerFooter {
  onHideFooter(): void;
}

/**
 * FooterCtnr<> is a container of the PlayerFooter<>,
 * where all of the animation configs stay.
 * Try the best not to put much playback actions here, though
 * it's inevitable since the animation depends on actions
 * and vice versa
 */
const CtnrFooter = (props: dFooterCtnr) => {
  const {
    footer: { footerVisible },
    player: { isPlaying },
    media: { mediaFiles },
    playback: { currentTrack, shuffle },
    sethPlayback,
    theme,
    children,
  } = props;
  const currentTrackList = mediaFiles;

  /**
   * Run `_onToggleFooter()` ani every time `footerVisible` changes
   */
  React.useEffect(
    function toggleFooter() {
      _onToggleFooter(footerVisible);
    },
    [footerVisible]
  );

  /**
   * ANI FUNCTIONS
   */
  const panX = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

  const [_isYSwipeable, shouldYSwipeable] = React.useState(true);
  const [, shouldXSwipeable] = React.useState(true);

  /**
   * Reverse transition for the footer:
   * user swipes up, the footer slides down
   */
  const _transY = panY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [100, 0, -100],
    extrapolate: "clamp",
  });

  const _opacityFooter = panY.interpolate({
    inputRange: [-60, 0, 60],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  const _opacityButtons = panY.interpolate({
    inputRange: [-20, 0, 20],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  const _opacityTrackInfo = panX.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  const YpanResponder = useRef(
    PanResponder.create({
      /** If user swipes horizontally more than vertically, disable `YpanResponder` */
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 1.5 * Math.abs(gestureState.dy)) {
          return false;
        } else return gestureState.dy < 0 && _isYSwipeable ? true : false;
      },
      onPanResponderGrant: () => {},
      /** If user swipes down, don't track; else, track `dy` w `panY` */
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          return null;
        }
        if (gestureState.dy < 0) {
          panY.setValue(gestureState.dy);
          // gestureState.dy < -100 && alert('Fire!!');
        }
      },
      /**
       * moveY: current Y pos
       * dy: delta y. If gesture up, value <0
       */
      onPanResponderRelease: (evt, gestureState) => {
        /** If scroll up pass threshold, open `player-scr` */
        if (gestureState.dy < -Y_SWIPE_DELTA) {
          shouldYSwipeable(false);
          navigate("player-scr");
          shouldYSwipeable(true);
        }
        /** If scroll not pass threshold, return to initial pos */
        if (gestureState.dy > -Y_SWIPE_DELTA && gestureState.dy < 0) {
          shouldYSwipeable(false);
          Animated.spring(panY, {
            toValue: 0,
            tension: 1,
            useNativeDriver: true,
          }).start(() => shouldYSwipeable(true));
        }
      },
    })
  ).current;

  /**
   * @note useMemo() here instead of useRef() since
   * onPanResponderRelease involves in changing currentTrack.index;
   * hence, we cannot use `current` index whenever we fire functions
   */
  const XpanResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => {
          // return gestureState.dy < 0 && _isXSwipeable ? true : false;
          return true;
        },
        onPanResponderGrant: () => {},
        onPanResponderMove: (evt, gestureState) => {
          panX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (evt, gestureState) => {
          /** If scroll left pass threshold... */

          if (gestureState.dx < -X_SWIPE_DELTA) {
            shouldXSwipeable(false);
            sethPlayback({
              type: "fwd",
              currentTrackList,
              currentTrack,
              isShuffle: shuffle,
            });
            // setAction("next");
          } else if (gestureState.dx > X_SWIPE_DELTA) {
            /** If scroll right pass threshold... */
            shouldXSwipeable(false);
            sethPlayback({
              type: "bwd",
              currentTrackList,
              currentTrack,
              isShuffle: shuffle,
            });
            // setAction("back");
          }
          setTimeout(() => {
            Animated.spring(panX, {
              toValue: 0,
              tension: 1,
              useNativeDriver: true,
            }).start(() => shouldXSwipeable(true));
          }, 200);
        },
      }),
    [currentTrack.index]
  );

  function _onToggleFooter(isFooterShown: boolean) {
    if (isFooterShown) {
      Animated.timing(panY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      // onHideFooter();
      Animated.timing(panY, {
        toValue: -70,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        bottom: getBottomSpace() + 51,
        width: "100%",
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateY: _transY }],
          backgroundColor: theme.elevatedBG,
          opacity: _opacityFooter,
        }}
        {...YpanResponder.panHandlers}
      >
        <Animated.View
          {...XpanResponder.panHandlers}
          style={{
            transform: [{ translateX: panX }],
            opacity: _opacityTrackInfo,
            justifyContent: "space-around",
          }}
        >
          {/* <TouchableOpacity onPress={() => _onToggleFooter(false)}> */}
          {children}
          {/* </TouchableOpacity> */}
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          opacity: _opacityButtons,
          position: "absolute",
          right: 0,
          flexDirection: "row",
          bottom: 0,
        }}
      >
        {isPlaying ? (
          <ActionIcon
            {...props}
            name="pause"
            onPress={() =>
              sethPlayback({
                type: "pause",
              })
            }
          />
        ) : (
          <ActionIcon
            {...props}
            name="play"
            onPress={() => sethPlayback({ type: "play" })}
          />
        )}
        <ActionIcon
          {...props}
          name="forward"
          onPress={() =>
            sethPlayback({
              type: "fwd",
              currentTrackList,
              currentTrack,
              isShuffle: shuffle,
            })
          }
        />
      </Animated.View>
    </View>
  );
};

interface dActionIcon extends dIconPrimr, dFooterCtnr {}
const ActionIcon = (props: dActionIcon) => (
  <IconPrimr
    {...props}
    preset={"default"}
    size={20}
    color={props.theme.current == "light" ? C.text : C.text01}
    containerStyle={{ padding: spacing[4] }}
  />
);

const Thumbnail = (props) => {
  const { onPress, source } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        style={{ height: 42, width: 42, borderRadius: 21, marginLeft: 15 }}
      />
    </TouchableOpacity>
  );
};

const CtnrFooterContent = sstyled(View)({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing[2],
});

const CtnrTrackInfo = sstyled(View)({
  height: "75%",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
  marginLeft: 15,
});
// const TextWrapper = styled.View`
//   height: 75%;
//   flex: 1;
//   flex-direction: column;
//   justify-content: space-evenly;
//   margin-left: 15px;
// `;

// const Title= sstyled(Text)(({theme})=>({
//   fontFamile: CIRCULAR_BOLD,
//   fontSize: 14,
//   color: theme.current
// }))
const Title = styled.Text`
  font-family: ${CIRCULAR_BOLD};
  font-size: 14px;
  color: ${contrastColor};
  width: ${DEVICE_WIDTH / 2}px;
`;

const Artist = styled.Text`
  font-family: ${CIRCULAR_LIGHT};
  font-size: 12px;
  color: ${contrastTransColor(0.8)};
  width: ${DEVICE_WIDTH / 2}px;
`;

const ProgressWrapper = styled.View`
  position: absolute;
  top: 0;
`;

const Progress = styled(ProgressBar)`
  height: 2px;
  width: ${DEVICE_WIDTH}px;
  background-color: ${contrastTransColor(0.1)};
`;

export default connector(withTheme(PlayerFooter));
