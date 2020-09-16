import * as actions from "actions";
import { CIRCULAR } from "assets";
import { OptionsModal, ScreenTitle } from "components";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import RenderTrack from "components/RenderTrack";
import { scanMessage } from "constants";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import QuickScrollList from "react-native-quick-scroll";
import TrackPlayer from "react-native-track-player";
import { connect } from "react-redux";
import { setupPlayer } from "services";
import styled from "styled-components/native";
import { contrastColor, foregroundColor } from "themes/styles";
import { getRandomNumber, getStatusBarHeight, scale } from "utils";
// import OptionsModal from "components/OptionsModal";
import { flatListItemLayout } from "utils/FlatListLayout";

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
  const [_podcasts, setPodcast] = React.useState(null);
  useEffect(function getPodcastResult() {
    fetch(
      "https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0",
      {
        method: "GET",
        headers: {
          "X-ListenAPI-Key": "d7f9fea7ad1c47499a5130cf3ae447d4",
        },
      }
    )
      .then((result) => result.json())
      .then((json) => {
        console.log("RSULT>>>>>>>", json);
        setPodcast(json);
      })
      .catch((error) => console.warn(error));
    // .finally();
  }, []);

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

  // if (mediaLoaded) {
  //   if (media.length > 0) {
  if (1 == 1) {
    if (1 == 1) {
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
            // data={[
            //   {
            //     id: "1111",
            //     url:
            //       "https://drive.google.com/uc?export=download&id=1AjPwylDJgR8DOnmJWeRgZzjsohi-7ekj",
            //     title: "Longing",
            //     artist: "David Chavez",
            //     artwork:
            //       "https://cms-assets.tutsplus.com/uploads/users/114/posts/34296/image/Final-image.jpg",
            //     duration: 143,
            //   },
            //   {
            //     id: "2222",
            //     url:
            //       "https://drive.google.com/uc?export=download&id=1VM9_umeyzJn0v1pRzR1BSm9y3IhZ3c0E",
            //     title: "Soul Searching (Demo)",
            //     artist: "David Chavez",
            //     artwork:
            //       "https://images-na.ssl-images-amazon.com/images/I/717VbeZb0bL._AC_SL1500_.jpg",
            //     duration: 77,
            //   },
            //   {
            //     id: "3333",
            //     url:
            //       "https://drive.google.com/uc?export=download&id=1bmvPOy2IVbkUROgm0dqiZry_miiL4OqI",
            //     title: "Lullaby (Demo)",
            //     artist: "David Chavez",
            //     artwork:
            //       "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/59dd3a65996579.5b073c5b3628d.gif",
            //     duration: 71,
            //   },
            //   {
            //     id: "4444",
            //     url:
            //       "https://drive.google.com/uc?export=download&id=1V-c_WmanMA9i5BwfkmTs-605BQDsfyzC",
            //     title: "Rhythm City (Demo)",
            //     artist: "David Chavez",
            //     artwork:
            //       "https://www.digitalmusicnews.com/wp-content/uploads/2020/04/DaBaby-Blame-It-On-Baby.jpg",
            //     duration: 106,
            //   },
            // ]}
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
  // return (
  //   <ShuffleText style={{ paddingTop: scale(100) }}>
  //     {JSON.stringify(_podcasts)}
  //   </ShuffleText>
  // );
}

const ShuffleText = styled.Text`
  font-family: ${CIRCULAR};
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
  font-family: ${CIRCULAR};
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
