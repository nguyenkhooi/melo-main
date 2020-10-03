import {
  CIRCULAR_BOLD,
  CIRCULAR_LIGHT,
  dIconPrimr,
  IconPrimr,
  img
} from "assets";
import { connector, dRedux } from "engines";
import { navigate } from "navigation";
import React, { useRef } from "react";
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";
import styled, { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor } from "themes";
import {
  C,
  DEVICE_WIDTH,
  dSCR,
  getBottomSpace,
  getRandomNumber,
  spacing
} from "utils";
import ProgressBar from "./ProgressBar";

interface dCOMP_PlayerFooter extends dSCR, dRedux {}
function PlayerFooter(props: dCOMP_PlayerFooter) {
  const {
    footer: { footerVisible },
    playback: { currentTrack, loop, shuffle },
    player: { isPlaying },
    media: { mediaFiles },
    setPlayback,
    setCurrentTrack,
    hideFooter,
    theme,
    swipeThreshold = 0.6,
  } = props;
  const currentTrackList = mediaFiles;
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
      <FooterCtnr {...props} onHideFooter={() => navigate("player-scr")}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: spacing[2],
          }}
        >
          <Thumbnail
            source={coverSrc}
            onPress={async () => {
              await hideFooter();
              navigate("player-scr");
            }}
          />
          <TextWrapper>
            <Title numberOfLines={1}>{currentTrack.title || "unknown"}</Title>
            <Artist numberOfLines={1}>
              {currentTrack.artist || "unknown"}
            </Artist>
          </TextWrapper>
        </View>
        <ProgressWrapper>
          <Progress
            progress={isNaN(progress) ? 0 : +progress.toFixed(3)}
            color={theme.foreground}
          />
        </ProgressWrapper>
      </FooterCtnr>
    )
  );
}

const Y_SWIPE_DELTA = 100;
const X_SWIPE_DELTA = 70;

interface dFooterCtnr extends dCOMP_PlayerFooter {
  onHideFooter(): void;
}
const FooterCtnr = (props: dFooterCtnr) => {
  const {
    footer: { footerVisible },
    player: { isPlaying },
    media: { mediaFiles },
    playback: { currentTrack, loop, shuffle },
    setPlayback,
    setCurrentTrack,
    hideFooter,
    onHideFooter,
    theme,
    children,
  } = props;
  const currentTrackList = mediaFiles;

  React.useEffect(
    function toggleFooter() {
      _onToggleFooter(footerVisible);
    },
    [footerVisible]
  );
  /**
   * PLAYBACK FUNCTIONS
   */
  function _togglePlayback() {
    setPlayback(!isPlaying);
  }
  function _skipForward() {
    let nextTrack = shuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrack.index === currentTrackList.length - 1
      ? currentTrackList[0]
      : currentTrackList[currentTrack.index + 1];

    // let nextTrack = mediaFiles[currentTrack.index + 1];
    // console.log("forward! ", nextTrack);
    setCurrentTrack(nextTrack);
  }
  function _skipBackward() {
    let nextTrack = shuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrack.index === 0
      ? currentTrackList[currentTrackList.length - 1]
      : currentTrackList[currentTrack.index - 1];
    // let nextTrack = mediaFiles[currentTrack.index - 1];
    // console.log("backward! ", nextTrack);
    setCurrentTrack(nextTrack);
  }

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
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) > 1.5 * Math.abs(gestureState.dy)) {
          return false;
        } else return gestureState.dy < 0 && _isYSwipeable ? true : false;
      },
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          return null;
        }
        if (gestureState.dy < 0) {
          panY.setValue(gestureState.dy);
          // gestureState.dy < -100 && alert('Fire!!');
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        /**
         * moveY: current Y pos
         * dy: delta y. If gesture up, value <0
         */
        /** If scroll up pass threshold... */
        if (gestureState.dy < -Y_SWIPE_DELTA) {
          shouldYSwipeable(false);
          navigate("player-scr");
          shouldYSwipeable(true);
        }
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
        onMoveShouldSetPanResponder: (evt, gestureState) => {
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
            _skipForward();
            // setAction("next");
          } else if (gestureState.dx > X_SWIPE_DELTA) {
            /** If scroll right pass threshold... */
            shouldXSwipeable(false);
            _skipBackward();
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
          <ActionIcon {...props} name="pause" onPress={_togglePlayback} />
        ) : (
          <ActionIcon {...props} name="play" onPress={_togglePlayback} />
        )}
        <ActionIcon {...props} name="forward" onPress={_skipForward} />
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

const TextWrapper = styled.View`
  height: 75%;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 15px;
`;

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

const icons = {
  playIcon: {
    name: "play",
    type: "fa5",
    size: 20,
  },
  pauseIcon: {
    name: "pause",
    type: "fa5",
    size: 20,
  },
  nextIcon: {
    name: "forward",
    type: "fa5",
    size: 20,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connector(withTheme(PlayerFooter));
