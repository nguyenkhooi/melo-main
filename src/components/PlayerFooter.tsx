import React from "react";
import {
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
  View,
} from "react-native";
import styled, { withTheme } from "styled-components/native";
import { connect } from "react-redux";
import * as actions from "../actions";
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";
import * as navigation from "../navigation/NavigationService";
import ProgressBar from "./ProgressBar";
import Icon from "./Icon";
import {
  contrastColor,
  elevatedBGColor,
  contrastTransColor,
} from "../themes/styles";
import { CIRCULAR_BOLD, CIRCULAR_LIGHT } from "assets";
import {
  PanGestureHandler,
  State as GestureState,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
const {
  event,
  cond,
  Value,
  block,
  set,
  eq,
  not,
  clockRunning,
  and,
  startClock,
  stopClock,
  spring,
  greaterThan,
  lessThan,
  call,
  Clock,
} = Animated;
const placeholder = require("../../assets/placeholder.jpg");

const SCREEN_WIDTH = Dimensions.get("window").width;

function PlayerFooter(props) {
  const {
    isPlaying,
    renderFooter,
    currentTrack,
    theme,
    swipeThreshold = 0.4,
  } = props;
  const { position, duration } = useTrackPlayerProgress(100);

  function togglePlayback() {
    props.setPlayback(!isPlaying);
  }

  const progress = position / duration;
  const coverSrc = currentTrack.artwork
    ? { uri: currentTrack.artwork }
    : placeholder;

  let clock = new Clock();
  let gestureState = new Value(GestureState.UNDETERMINED);
  let animState = {
    finished: new Value(0),
    position: new Value(0),
    velocity: new Value(0),
    time: new Value(0),
  };

  // Spring animation config
  // Determines how "springy" row is when it
  // snaps back into place after released
  let animConfig = {
    toValue: new Value(0),
    damping: 20,
    mass: 0.2,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.2,
    restDisplacementThreshold: 0.2,
  };

  // Called whenever gesture state changes. (User begins/ends pan,
  // or if the gesture is cancelled/fails for some reason)
  const onHandlerStateChange = event([
    {
      nativeEvent: ({ state }) =>
        block([
          // Update our animated value that tracks gesture state
          set(gestureState, state),
          // Spring row back into place when user lifts their finger before reaching threshold
          cond(
            and(eq(state, GestureState.END), not(clockRunning(clock))),
            startClock(clock)
          ),
        ]),
    },
  ]);

  const onPanEvent = event([
    {
      nativeEvent: ({ translationY }) =>
        block([
          cond(eq(gestureState, GestureState.ACTIVE), [
            // Update our translate animated value as the user pans
            // console.log("heyy"),
            set(animState.position, translationY),
          ]),
          // If swipe distance exceeds threshold, delete item
          cond(
            //   eq(gestureState, GestureState.),
            lessThan(translationY, swipeThreshold),
            call([animState.position], () => {
              //   Alert.alert("great");
              navigation.navigate("player");
            })
          ),
        ]),
    },
  ]);
  return renderFooter && currentTrack.id !== "000" ? (
    <PanGestureHandler
      minDeltaX={10}
      onGestureEvent={onPanEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={{
          flex: 1,
          height: animState.position,
          transform: [{ translateY: animState.position }],
        }}
      >
        <Animated.Code>
          {() =>
            block([
              // If the clock is running, increment position in next tick by calling spring()
              cond(clockRunning(clock), [
                spring(clock, animState, animConfig),
                // Stop and reset clock when spring is complete
                cond(animState.finished, [
                  stopClock(clock),

                  set(animState.finished, 0),
                ]),
              ]),
            ])
          }
        </Animated.Code>
        <View style={{ height: 100 }}>
          <Title numberOfLines={1}>{currentTrack.title || "unknown"}</Title>
        </View>
      </Animated.View>
    </PanGestureHandler>
  ) : null;
}

function mapStateToProps(state) {
  return {
    renderFooter: state.footer.footerVisible,
    currentTrack: state.playback.currentTrack,
    isPlaying: state.player.isPlaying,
  };
}

export default connect(mapStateToProps, actions)(withTheme(PlayerFooter));

const MainWrapper = styled.View`
  height: 60px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 50px;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  background-color: ${elevatedBGColor};
`;

const Thumbnail = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
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
  width: ${SCREEN_WIDTH / 2}px;
`;

const Artist = styled.Text`
  font-family: ${CIRCULAR_LIGHT};
  font-size: 12px;
  color: ${contrastTransColor(0.8)};
  width: ${SCREEN_WIDTH / 2}px;
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
  width: ${SCREEN_WIDTH}px;
  background-color: ${contrastTransColor(0.1)};
`;

const icons = {
  playIcon: {
    name: "play-arrow",
    type: "material",
    size: 24,
  },
  pauseIcon: {
    name: "pause",
    type: "material",
    size: 24,
  },
};
