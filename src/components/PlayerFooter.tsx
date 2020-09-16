import { CIRCULAR_BOLD, CIRCULAR_LIGHT } from "assets";
import React from "react";
import { Dimensions, TouchableWithoutFeedback, View } from "react-native";
import {
  PanGestureHandler,
  State as GestureState
} from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";
import { connect } from "react-redux";
import styled, { withTheme } from "styled-components/native";
import { getBottomSpace, getRandomNumber } from "utils";
import * as actions from "../actions";
import * as navigation from "../navigation/NavigationService";
import { contrastColor, contrastTransColor } from "../themes/styles";
import Icon from "./Icon";
import ProgressBar from "./ProgressBar";
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
    swipeThreshold = 0.6,
    media,
    loop,
    shuffle,
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
          // If swipe distance exceeds threshold, open player screen
          cond(
            lessThan(translationY, -100),
            call([animState.position], () => {
              //   Alert.alert("great");
              navigation.navigate("player");
            })
          ),
        ]),
    },
  ]);

  const _height = interpolate(animState.position, {
    inputRange: [-100, 0, 100],
    outputRange: [20, 0, 20],
    extrapolate: Extrapolate.CLAMP,
  });

  const _opacity = interpolate(animState.position, {
    inputRange: [-100, 0, 100],
    outputRange: [0, 1, 0.2],
    extrapolate: Extrapolate.CLAMP,
  });

  function skipForward() {
    let nextTrack = shuffle
      ? media[getRandomNumber(0, media.length)]
      : currentTrack.index === media.length - 1
      ? media[0]
      : media[currentTrack.index + 1];
    props.setCurrentTrack(nextTrack);
  }
  return renderFooter && currentTrack.id !== "000" ? (
    //   return 1 == 1 && renderFooter ? (
    <MainWrapper>
      <PanGestureHandler
        // activeOffsetY={-10}
        onGestureEvent={onPanEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={{
            // flex: 1,
            width: "100%",
            backgroundColor: theme.elevatedBG,
            transform: [{ translateY: _height }],
            opacity: _opacity,
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
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("player")}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Thumbnail source={coverSrc} />
              <TextWrapper>
                <Title numberOfLines={1}>
                  {currentTrack.title || "unknown"}
                </Title>
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
          </TouchableWithoutFeedback>
        </Animated.View>
      </PanGestureHandler>
    </MainWrapper>
  ) : null;
}

function mapStateToProps(state) {
  return {
    renderFooter: state.footer.footerVisible,
    currentTrack: state.playback.currentTrack,
    isPlaying: state.player.isPlaying,

    media: state.media.mediaFiles,
    loop: state.playback.loop,
    shuffle: state.playback.shuffle,
  };
}

export default connect(mapStateToProps, actions)(withTheme(PlayerFooter));

const MainWrapper = styled.View`
  height: 60px;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: ${getBottomSpace() + 48};
  flex-direction: row;
  align-items: center;
`;

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

/** WITH SPRING */
// import React, { Component } from "react";
// import { StyleSheet, View, NativeModules, Text } from "react-native";
// import { PanGestureHandler, State } from "react-native-gesture-handler";

// import Animated, { interpolate } from "react-native-reanimated";

// const { UIManager } = NativeModules;

// const {
//   event,
//   Value,
//   Clock,
//   lessThan,
//   greaterThan,
//   divide,
//   diff,
//   abs,
//   startClock,
//   stopClock,
//   cond,
//   add,
//   sub,
//   multiply,
//   eq,
//   set,
// } = Animated;

// /**
//  * itrn fn to mimic spring physics
//  * @param dt
//  * @param position
//  * @param velocity
//  * @param anchor
//  * @param mass
//  * @param tension
//  */
// function spring(dt, position, velocity, anchor, mass = 1, tension = 300) {
//   const dist = sub(position, anchor);
//   const acc = divide(multiply(-1, tension, dist), mass);
//   return set(velocity, add(velocity, multiply(dt, acc)));
// }

// /**
//  * itrn fn to mimic the damping physics
//  * @param dt
//  * @param velocity
//  * @param mass
//  * @param damping
//  */
// function damping(dt, velocity, mass = 1, damping = 30) {
//   const acc = divide(multiply(-1, damping, velocity), mass);
//   return set(velocity, add(velocity, multiply(dt, acc)));
// }

// function interaction(gestureTranslation, gestureState, callback?) {
//   const dragging = new Value(0);
//   const start = new Value(0);
//   const position = new Value(0);
//   const anchor = new Value(0);
//   const velocity = new Value(0);

//   const clock = new Clock();
//   const dt = divide(diff(clock), 1000);
//   return cond(
//     greaterThan(0, gestureTranslation),
//     cond(eq(gestureState, State.ACTIVE), [
//       cond(dragging, 0, [set(dragging, 1), set(start, position)]),

//       set(anchor, add(start, gestureTranslation)),

//       // spring attached to pan gesture "anchor"
//       spring(dt, position, velocity, anchor),
//       damping(dt, velocity),

//       // spring attached to the center position (0)
//       spring(dt, position, velocity, 0),
//       damping(dt, velocity),

//       set(position, add(position, multiply(velocity, dt))),
//     ]),

//     [
//       set(dragging, 0),
//       startClock(clock),
//       spring(dt, position, velocity, 0),
//       damping(dt, velocity),
//       set(position, add(position, multiply(velocity, dt))),
//     ]
//   );
// }

// function Box() {
//   let gestureX = new Value(0);
//   let gestureY = new Value(0);
//   let state = new Value(-1);

//   const _onGestureEvent = event([
//     {
//       nativeEvent: {
//         translationX: gestureX,
//         translationY: gestureY,
//         state: state,
//       },
//     },
//   ]);
//   const _transX = interaction(gestureX, state);
//   const _transY = interaction(gestureY, state);
//   const _height = interpolate(_transY, {
//     inputRange: [-10, 0, 10],
//     outputRange: [60, 30, 30],
//   });
//   return (
//     <PanGestureHandler
//       onGestureEvent={_onGestureEvent}
//       onHandlerStateChange={_onGestureEvent}
//     >
//       <Animated.View
//         style={[
//           styles.box,
//           {
//             height: _height,
//             // transform: [
//             //   // { translateX: _transX },
//             //   { translateY: _transY },
//             // ],
//           },
//         ]}
//       >
//         <Text>Hello</Text>
//       </Animated.View>
//     </PanGestureHandler>
//   );
// }

// export default class Example extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Box />
//       </View>
//     );
//   }
// }

// const BOX_SIZE = 100;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF",
//   },
//   box: {
//     width: "100%",
//     height: BOX_SIZE,
//     alignSelf: "center",
//     backgroundColor: "teal",
//     margin: BOX_SIZE / 2,
//   },
// });
