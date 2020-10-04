import { CIRCULAR } from "assets";
import { Kitt, RenderToast, ScreenTitle, Txt } from "components";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import { scanMessage } from "constants";
import { connector, dRedux, fn } from "engines";
import R from "ramda";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  ViewStyle
} from "react-native";
import TrackPlayer from "react-native-track-player";
import { setupPlayer } from "services";
import styled from "styled-components/native";
import { contrastColor } from "themes";
import { dSCR, getStatusBarHeight } from "utils";

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
    media: { mediaLoaded, mediaFiles, nowPlayingTracks },
    //* redux actions
    getMedia,
    setShuffle,
    showFooter,
    setNowPlayingTracks,
    // setCurrentList,
  } = props;
  const indexedTracks = R.sortBy(R.prop("index"))(mediaFiles);

  const [scrollY] = useState(new Animated.Value(0));
  const [_log, setLog] = useState("Get Result");
  const [_isFetched, shouldFetch] = React.useState(false);

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", showFooter);
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setupPlayer();
  }, []);
  const getResult = async () => {
    const tpS = await TrackPlayer.getState();
    const tpCT = await TrackPlayer.getCurrentTrack();
    const tpV = await TrackPlayer.getVolume();
    const tpQ = await TrackPlayer.getQueue();
    setLog(tpS + " - " + tpCT + " - " + tpV);
    // !!currentTrack.id &&
    //   currentTrack.id !== "000" &&
    //   TrackPlayer.add(currentTrack);
  };

  const renderMargin =
    !!currentTrack.id && currentTrack.id !== "000"
      ? { marginBottom: 60, flex: 1 }
      : { flex: 1 };

  if (mediaLoaded) {
    if (mediaFiles.length > 0) {
      // if (1 == 1) {
      //   if (1 == 1) {
      return (
        <ScrollView
          style={{ paddingTop: getStatusBarHeight("safe"), ...renderMargin }}
        >
          <ScreenTitle
            title={
              "Test" +
              ": " +
              mediaFiles.length +
              " - " +
              nowPlayingTracks.length
            }
          />
          <Kitt.Button
            appearance="ghost"
            style={{ alignSelf: "flex-start" }}
            size="small"
            onPress={async () => {
              setShuffle(true, nowPlayingTracks);
            }}
          >
            Shuffle 'Em All
          </Kitt.Button>
          <Kitt.Button
            onPress={async () => {
              RenderToast({ title: "running..." });
              await TrackPlayer.reset();
              await TrackPlayer.add(nowPlayingTracks)
                .then((r) => RenderToast({ title: "succesful" }))
                .catch((error) => {
                  console.warn("errrrrr: ", error.message);
                  RenderToast({ title: "Error" });
                });
            }}
          >
            Set TrackPlayer
          </Kitt.Button>
          <Kitt.Button
            onPress={async () => {
              RenderToast({ title: "resetting..." });
              await TrackPlayer.reset();
              RenderToast({ title: "succesful" });
            }}
          >
            Reset TrackPlayer
          </Kitt.Button>
          <Kitt.Button
            onPress={async () => {
              getResult();
            }}
          >
            {JSON.stringify(_log)}
          </Kitt.Button>
          <Kitt.Button
            onPress={async () => {
              await TrackPlayer.play();
            }}
          >
            {"▶️"}
          </Kitt.Button>
          <Kitt.Button
            onPress={async () => {
              await TrackPlayer.pause();
            }}
          >
            {"⏸️"}
          </Kitt.Button>
          <Kitt.Button
            onPress={async () => {
              await TrackPlayer.skipToNext().catch((error) =>
                RenderToast({ message: error.message })
              );
            }}
          >
            {"⏩"}
          </Kitt.Button>
          <Kitt.Button
            onPress={async () => {
              await TrackPlayer.skipToPrevious().catch((error) =>
                RenderToast({ message: error.message })
              );
            }}
          >
            {"◀️"}
          </Kitt.Button>
          <Txt>{JSON.stringify(fn.js.vLookup(nowPlayingTracks, "title"))}</Txt>
          {/* <Text>{R.pluck("title")(nowPlayingTracks)}</Text> */}
          {/* <QuickScrollList
            keyExtractor={(asset) => asset.id.toString()}
            data={indexedTracks}
            refreshing={_isFetched}
            onRefresh={fetchMedia}
            renderItem={({ item }) => (
              <RenderTrack
                parent="track-scr"
                item={item}
                setOptions={setModal}
              />
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
            // initialScrollIndex={currentTrack.index || undefined}
            itemHeight={itemHeight}
            viewportHeight={ViewportHeight}
            rightOffset={10}
            thumbStyle={styles.thumbStyle}
          />

          <OptionsModal
            selectedTrack={modal.item}
            isVisible={modal.visible}
            onPressCancel={() => setModal({ ...modal, visible: false })}
          /> */}
        </ScrollView>
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
