import { CIRCULAR } from "assets";
import { OptionsModal, ScreenTitle } from "components";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import RenderTrack from "components/RenderTrack";
import { scanMessage } from "constants";
import { connector, dRedux } from "engines";
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
import { setupPlayer } from "services";
import styled from "styled-components/native";
import { contrastColor, foregroundColor } from "themes/styles";
import { dSCR, flatListItemLayout, getStatusBarHeight, scale } from "utils";
// import OptionsModal from "components/OptionsModal";

const ScreenHeight = Dimensions.get("window").height;
const StatusBarHeight = StatusBar.currentHeight;
const FooterHeight = 60;
const BottomTabHeight = 49;
const ViewportHeight =
  ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight);
const itemHeight = 75;

interface dSCR_Tracks extends dSCR, dRedux {}
function TracksScreen(props: dSCR_Tracks) {
  const {
    navigation,
    //* redux state
    playback: { currentTrack, shuffle },
    media: { mediaFiles },
    //* redux actions
    setShuffle,
    showFooter,
    setCurrentList,
  } = props;

  const [scrollY] = useState(new Animated.Value(0));
  const [modal, setModal] = useState({ visible: false, item: {} });

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", showFooter);
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
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
  //   if (mediaFiles.length > 0) {
  if (1 == 1) {
    if (1 == 1) {
      return (
        <View
          style={{ paddingTop: getStatusBarHeight("safe"), ...renderMargin }}
        >
          <ScreenTitle title={"Your Melo"} />
          <TouchableOpacity
            onPress={async () => {
              setShuffle(true);
              await setCurrentList(mediaFiles, shuffle);
            }}
          >
            <ShuffleText style={{ padding: scale(15) }}>
              Shuffle 'Em All
            </ShuffleText>
          </TouchableOpacity>
          <QuickScrollList
            keyExtractor={(asset) => asset.id.toString()}
            data={mediaFiles}
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

export default connector(TracksScreen);

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
