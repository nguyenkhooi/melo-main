import React, { useState, useEffect } from "react";
import {
  View,
  Animated,
  Dimensions,
  StatusBar,
  ViewStyle,
  Text,
  Button,
  UIManager,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import TrackPlayer from "react-native-track-player";
import { connect } from "react-redux";
import * as actions from "actions";
import QuickScrollList from "react-native-quick-scroll";
import { setupPlayer } from "services";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import RenderTrack from "components/RenderTrack";
// import OptionsModal from "components/OptionsModal";
import { flatListItemLayout } from "utils/FlatListLayout";
import { scanMessage } from "constants";
import { contrastColor, foregroundColor } from "themes/styles";
import { ScreenTitle } from "components";
import { getStatusBarHeight, scale, getRandomNumber, IS_ANDROID } from "utils";

import { OptionsModal, $$_Player } from "components";

const ScreenHeight = Dimensions.get("window").height;
const StatusBarHeight = StatusBar.currentHeight;
const FooterHeight = 60;
const BottomTabHeight = 49;
const ViewportHeight =
  ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight);
const itemHeight = 75;

function TracksScreen(props) {
  const [scrollY] = useState(new Animated.Value(0));
  const [modal, setModal] = useState({ visible: false, item: {} });
  const {
    currentTrack,
    mediaLoaded,
    media,
    shuffle,
    setShuffle,
    setPlayback,
    isPlaying,
  } = props;

  useEffect(() => {
    let unsubscribe = props.navigation.addListener("focus", props.showFooter);
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    props.getMedia();
    setupPlayer().then(
      () => currentTrack.id !== "000" && TrackPlayer.add(currentTrack)
    );
  }, []);

  const renderMargin =
    currentTrack.id !== "000" ? { marginBottom: 60, flex: 1 } : { flex: 1 };
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [50, 0],
    extrapolate: "clamp",
  });

  if (mediaLoaded) {
    if (media.length > 0) {
      return (
        <View
          style={{ paddingTop: getStatusBarHeight("safe"), ...renderMargin }}
        >
          <ScreenTitle title={"Your Melo"} />
          <TouchableOpacity
            onPress={() => {
              setShuffle(true);
              let nextTrack = media[getRandomNumber(0, media.length)];
              props.setCurrentTrack(nextTrack);
              setPlayback(true);
            }}
          >
            <ShuffleText style={{ padding: scale(15) }}>
              Shuffle 'Em All
            </ShuffleText>
          </TouchableOpacity>
          <QuickScrollList
            keyExtractor={(asset) => asset.id.toString()}
            data={media}
            renderItem={({ item }) => (
              <RenderTrack item={item} setOptions={setModal} />
            )}
            getItemLayout={flatListItemLayout}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={16}
            contentContainerStyle={styles.flatlistContent}
            initialScrollIndex={currentTrack.index || undefined}
            itemHeight={itemHeight}
            viewportHeight={ViewportHeight}
            rightOffset={10}
            thumbStyle={styles.thumbStyle}
          />
          <Animated.View
            style={[styles.header, { height: headerHeight }]}
          ></Animated.View>

          <OptionsModal
            selectedTrack={modal.item}
            isVisible={modal.visible}
            onPressCancel={() => setModal({ ...modal, visible: false })}
          />
        </View>
      );
    }
    return (
      <MessageWrapper>
        <Message numberOfLines={2}>
          {"Oops! Melo couldn't find any music on your device"}
        </Message>
      </MessageWrapper>
    );
  }

  return <RenderActivityIndicator text={scanMessage} />;
}

const ShuffleText = styled.Text`
  font-family: "Circular";
  font-size: 14px;
  color: ${foregroundColor};
`;

// export default function Screen(props) {
//   const modals = Array.from({ length: 8 }).map(
//     (_) => React.useRef(null).current
//   );
//   const animated = React.useRef(new Animated.Value(0)).current;
//   return (
//     <Animated.View
//       style={{
//         borderRadius: animated.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, 12],
//         }),
//         transform: [
//           {
//             scale: animated.interpolate({
//               inputRange: [0, 1],
//               outputRange: [1, 0.92],
//             }),
//           },
//         ],
//         opacity: animated.interpolate({
//           inputRange: [0, 1],
//           outputRange: [1, 0.75],
//         }),
//       }}
//     >
//       <Text onPress={() => modals[6].open(1)}>Press here</Text>
//       <$$_Player
//         {...props}
//         ref={(el) => (modals[6] = el)}
//         animated={animated}
//       />
//     </Animated.View>
//   );
// }

function mapStateToProps(state) {
  return {
    currentTrack: state.playback.currentTrack,
    media: state.media.mediaFiles,
    mediaLoaded: state.media.mediaLoaded,
    shuffle: state.playback.shuffle,
    isPlaying: state.player.isPlaying,
  };
}

export default connect(mapStateToProps, actions)(TracksScreen);

const MessageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Message = styled.Text`
  /* font-family: 'Circular'; */
  font-size: 16px;
  color: ${contrastColor};
  margin: 0 55px 0 55px;
  text-align: center;
`;

const styles = {
  header: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
    justifyContent: "center",
    paddingTop: getStatusBarHeight("safe"),
    alignItems: "flex-start",
    // paddingHorizontal: scale(15),
  } as ViewStyle,
  thumbStyle: {
    width: 4,
    borderWidth: 0,
  },
  flatlistContent: {
    marginTop: 20,
    paddingBottom: 20,
  },
};
