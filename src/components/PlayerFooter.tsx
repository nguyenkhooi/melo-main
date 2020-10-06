import {
  CIRCULAR_BOLD,
  CIRCULAR_LIGHT,
  dIconPrimr,
  IconPrimr,
  img,
} from "assets";
import { connector, dRedux, setCurrentTrackID } from "engines";
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
import { DEVICE_WIDTH, dSCR, getBottomSpace, spacing } from "utils";
import ProgressBar from "./ProgressBar";
import { sstyled } from "./Generals";

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
 * @version 0.10.6
 */
function PlayerFooter(props: dCOMP_PlayerFooter) {
  const {
    playback: { currentTrack },
    media: { mediaFiles },
    toggleFooter,
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
              toggleFooter("hide", () => navigate("player-scr"));
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

const Y_SWIPE_DELTA = 160;
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
    media: { mediaFiles, nowPlayingTracks },
    playback: { currentTrack, shuffle },
    sethPlayback,
    setShuffle,
    toggleFooter,
    theme,
    children,
  } = props;

  /**
   * ANI FUNCTIONS
   */
  const panX = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;

  const [_isYSwipeable, shouldYSwipeable] = React.useState(true);
  const [_isXSwipeable, shouldXSwipeable] = React.useState(true);

  /**
   * Reverse transition for the footer:
   * user swipes up, the footer slides down
   */
  const _transY = panY.interpolate({
    inputRange: [-160, -60, 0, 100],
    outputRange: [120, 0, 0, -100],
    extrapolate: "clamp",
  });

  const _opacityFooter = panY.interpolate({
    inputRange: [-100, -60, 0, 60],
    // outputRange: [0, 1, 1, 0],
    outputRange: [1, 1, 1, 1],
    extrapolate: "clamp",
  });

  const _opacityFwd = panX.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });
  const _opacityBwd = panX.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const _opacityTrackInfo = panX.interpolate({
    inputRange: [-50, 0, 50],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  /**
   * Run `_onToggleFooter()` ani every time `footerVisible` changes
   */
  React.useEffect(
    function toggleFooter() {
      _onToggleFooter(footerVisible);
    },
    [footerVisible]
  );

  const YpanResponder = useRef(
    PanResponder.create({
      /** If user swipes horizontally more than vertically, disable `YpanResponder` */
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 1.5 * Math.abs(gestureState.dy)) {
          return false;
        } else return gestureState.dy < 0 && _isYSwipeable ? true : false;
      },
      onPanResponderGrant: () => {
        shouldXSwipeable(false);
      },
      /** If user swipes down, don't track; else, track `dy` w `panY` */
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          return null;
        }
        if (gestureState.dy < -0) {
          panY.setValue(gestureState.dy);
          // gestureState.dy < -100 && alert('Fire!!');
        }
        // if (gestureState.dy < -Y_SWIPE_DELTA) {
        //   navigate("player-scr");
        // }
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
          setTimeout(() => {
            toggleFooter("hide");
          }, 400);
          // Animated.timing(panY, {
          //   toValue: -(100 + 60),
          //   duration: 500,
          //   useNativeDriver: true,
          // }).start(() => {
          //   // navigate("player-scr");
          //   shouldXSwipeable(true);
          //   shouldYSwipeable(true);
          // });
        }
        /** If scroll not pass threshold, return to initial pos */
        if (gestureState.dy > -Y_SWIPE_DELTA && gestureState.dy < 0) {
          shouldYSwipeable(false);
          Animated.spring(panY, {
            toValue: 0,
            tension: 1,
            useNativeDriver: true,
          }).start(() => {
            shouldXSwipeable(true);
            shouldYSwipeable(true);
          });
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
          return _isXSwipeable;
        },
        onPanResponderGrant: () => {
          shouldYSwipeable(false);
        },
        onPanResponderMove: (evt, gestureState) => {
          panX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (evt, gestureState) => {
          /** If scroll left pass threshold... */
          if (gestureState.dx < -X_SWIPE_DELTA) {
            shouldXSwipeable(false);
            sethPlayback({ type: "fwd" });
            // setAction("next");
          } else if (gestureState.dx > X_SWIPE_DELTA) {
            /** If scroll right pass threshold... */
            shouldXSwipeable(false);
            sethPlayback({ type: "bwd" });
            // setAction("back");
          }
          setTimeout(() => {
            Animated.spring(panX, {
              toValue: 0,
              tension: 1,
              useNativeDriver: true,
            }).start(() => {
              shouldXSwipeable(true);
              shouldYSwipeable(true);
            });
          }, 200);
        },
      }),
    [currentTrack.index]
  );

  function _onToggleFooter(isFooterShown: boolean) {
    console.log("toggling...");
    if (isFooterShown) {
      Animated.timing(panY, {
        delay: 100,
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        shouldXSwipeable(true);
        shouldYSwipeable(true);
      });
    } else {
      const aniHide = Animated.timing(panY, {
        toValue: -150,
        duration: 100,
        useNativeDriver: true,
      });
      _isYSwipeable && aniHide.start();
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
            // transform: [{ translateX: panX }],
            opacity: _opacityTrackInfo,
            justifyContent: "space-around",
          }}
        >
          {/* <TouchableOpacity onPress={() => _onToggleFooter(false)}> */}
          {children}
          {/* </TouchableOpacity> */}
        </Animated.View>
      </Animated.View>
      {/* <Animated.View
        style={{
          // transform: [{ translateY: _transY }],
          opacity: _opacityFwd,
          position: "absolute",
          left: 30,
          flexDirection: "row",
          bottom: 0,
        }}
      >
        <ActionIcon {...props} name="forward" disabled={!footerVisible} />
      </Animated.View>
      <Animated.View
        style={{
          // transform: [{ translateY: _transY }],
          opacity: _opacityBwd,
          position: "absolute",
          left: 30,
          flexDirection: "row",
          bottom: 0,
        }}
      >
        <ActionIcon {...props} name="backward" disabled={!footerVisible} />
      </Animated.View> */}

      <Animated.View
        style={{
          transform: [{ translateY: _transY }],
          opacity: _opacityFooter,
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
            onPress={() => sethPlayback({ type: "pause" })}
            disabled={!footerVisible}
          />
        ) : (
          <ActionIcon
            {...props}
            name="play"
            onPress={() => {
              sethPlayback({ type: "play" });
            }}
            disabled={!footerVisible}
          />
        )}
        <ActionIcon
          {...props}
          name="forward"
          disabled={!footerVisible}
          onPress={() => sethPlayback({ type: "fwd" })}
        />
        {/* <ActionIcon
          {...props}
          name="backward"
          disabled={!footerVisible}
          onPress={() => sethPlayback({ type: "bwd" })}
        />
        <ActionIcon
          {...props}
          name="shuffle"
          color={shuffle ? "dodgerblue" : "grey"}
          disabled={!footerVisible}
          onPress={() => setShuffle(!shuffle, nowPlayingTracks)}
        /> */}
      </Animated.View>
    </View>
  );
};

interface dActionIcon extends dIconPrimr {}
const ActionIcon = (props: dActionIcon) => (
  <IconPrimr
    preset={"default"}
    size={20}
    color={contrastColor(props)}
    containerStyle={{ padding: spacing[4] }}
    {...props}
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
