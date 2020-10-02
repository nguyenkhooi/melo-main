import { CIRCULAR_BOLD, CIRCULAR_LIGHT, img } from "assets";
import { connector, dRedux } from "engines";
import { navigate } from "navigation";
import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,

  View
} from "react-native";
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";
import styled, { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor } from "themes";
import { DEVICE_WIDTH, getBottomSpace, getRandomNumber, scale } from "utils";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";

interface dCOMP_PlayerFooter extends dRedux {}
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
  function togglePlayback() {
    setPlayback(!isPlaying);
  }

  const progress = position / duration;
  const coverSrc = currentTrack.artwork
    ? { uri: currentTrack.artwork }
    : img.placeholder;

  function skipForward() {
    let nextTrack = shuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrack.index === currentTrackList.length - 1
      ? currentTrackList[0]
      : currentTrackList[currentTrack.index + 1];
    setCurrentTrack(nextTrack);
  }

  return (
    footerVisible &&
    currentTrack.id !== "000" && (
      <FooterCtnr {...props} onHideFooter={() => navigate("player-scr")}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Thumbnail source={coverSrc} />
          <TextWrapper>
            <Title numberOfLines={1}>{currentTrack.title || "unknown"}</Title>
            <Artist numberOfLines={1}>
              {currentTrack.artist || "unknown"}
            </Artist>
          </TextWrapper>
          {isPlaying ? (
            <StyledIcon {...icons.pauseIcon} onPress={togglePlayback} />
          ) : (
            <StyledIcon {...icons.playIcon} onPress={togglePlayback} />
          )}
          <StyledIcon {...icons.nextIcon} onPress={skipForward} />
          <ProgressWrapper>
            <Progress
              progress={isNaN(progress) ? 0 : +progress.toFixed(3)}
              color={theme.foreground}
            />
          </ProgressWrapper>
        </View>
      </FooterCtnr>
    )
  );
}

const SWIPE_DELTA = 100;

const FooterCtnr = (props) => {
  const {
    footer: { footerVisible },
    onHideFooter,
    theme,
    children,
  } = props;
  const pan = useRef(new Animated.ValueXY()).current;

  React.useEffect(
    function toggleFooter() {
      _onToggleFooter(footerVisible);
    },
    [footerVisible]
  );

  const [_isSwipeable, shouldSwipeable] = React.useState(true);
  const _transY = pan.y.interpolate({
    inputRange: [-1000, 0, 1000],
    outputRange: [1000, 0, -1000],
    extrapolate: "clamp",
  });

  const _opacityFooter = pan.y.interpolate({
    inputRange: [-60, 0, 60],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy < 0 && _isSwipeable ? true : false;
      },
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          return null;
        }
        if (gestureState.dy < 0) {
          pan.setValue({ x: gestureState.dx, y: gestureState.dy });
          // gestureState.dy < -100 && alert('Fire!!');
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        /**
         * moveY: current Y pos
         * dy: delta y. If gesture up, value <0
         */
        /** If scroll up pass threshold... */
        if (gestureState.dy < -SWIPE_DELTA) {
          shouldSwipeable(false);
          navigate("player-scr");
          Animated.spring(pan.y, {
            toValue: 0,
            tension: 1,
            useNativeDriver: true,
          }).start(() => shouldSwipeable(true));
        }
        if (gestureState.dy > -SWIPE_DELTA && gestureState.dy < 0) {
          shouldSwipeable(false);
          Animated.spring(pan.y, {
            toValue: 0,
            tension: 1,
            useNativeDriver: true,
          }).start(() => shouldSwipeable(true));
        }
        pan.flattenOffset();
      },
    })
  ).current;

  function _onToggleFooter(isFooterShown: boolean) {
    return isFooterShown
      ? Animated.timing(pan.y, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start()
      : Animated.timing(pan.y, {
          toValue: -60,
          duration: 100,
          useNativeDriver: true,
        }).start(() => onHideFooter());
  }

  return (
    <Animated.View
      style={{
        transform: [
          // { translateX: pan.x },
          { translateY: _transY },
        ],
        opacity: _opacityFooter,
        position: "absolute",
        left: 0,
        bottom: getBottomSpace() + 48,
        backgroundColor: theme.elevatedBG,
        width: "100%",
        height: scale(55),
      }}
      {...panResponder.panHandlers}
    >
      {/* <TouchableOpacity onPress={() => _onToggleFooter(false)}> */}
      {children}
      {/* </TouchableOpacity> */}
    </Animated.View>
  );
};

const Thumbnail = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  margin-left: 15px;
`;

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

const StyledIcon = styled(Icon)`
  color: ${contrastColor};
  padding: 18px;
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
