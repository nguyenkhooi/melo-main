import { useScrollToTop } from "@react-navigation/native";
import { CIRCULAR } from "assets";
import { OptionsModal, PlayerFooter, sstyled, Txt, Buttoon } from "components";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import { scanMessage } from "constants";
import { connector, dRedux, fn } from "engines";
import R from "ramda";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StatusBar, View, ViewStyle } from "react-native";
import { FlatList } from "react-native-gesture-handler";
// import { FlatList } from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";
import { DataProvider } from "recyclerlistview";
// import QuickScrollList from "react-native-quick-scroll";
import { withTheme } from "styled-components/native";
import { contrastColor } from "themes";
import {
  dSCR,
  flatListItemLayout,
  getBottomSpace,
  getStatusBarHeight,
  scale,
  spacing,
  TrackProps,
} from "utils";

// const QuickScrollList = FlatList;

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
    media: { mediaLoaded, mediaFiles, nowPlayingIDs, mediaIDs },
    //* redux actions
    getMedia,
    setShuffle,
    sethPlayback,
    // setCurrentList,
  } = props;
  const indexedTracks = R.sortBy(R.prop("index"))(mediaFiles);

  const [scrollY] = useState(new Animated.Value(0));
  const [modal, setModal] = useState({ visible: false, item: {} });
  const [_isFetched, shouldFetch] = React.useState(false);

  const [_queue, setQueue] = React.useState([]);
  const [_tracks, getTracks] = React.useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  );

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", async () => {
      // await getMedia(_); //* fetch media without showing indicator
      PlayerFooter.open();
    });
    return unsubscribe;
  }, [navigation]);

  function fetchMedia() {
    shouldFetch(true);
    getMedia();
    setTimeout(() => {
      shouldFetch(false);
    }, 1000);
  }
  React.useEffect(async function updateQueue() {
    const queue = await TrackPlayer.getQueue();
    const queueIDs = fn.js.vLookup(queue, "id");
    setQueue(queueIDs);
  }, []);

  async function getQueue() {
    const queue = await TrackPlayer.getQueue();
    const queueIDs = fn.js.vLookup(queue, "id");
    // setQueue(queueIDs);
    setQueue(queue);
  }

  const refMediaList = React.useRef<FlatList<{}>>();
  useScrollToTop(refMediaList);

  if (mediaLoaded) {
    if (mediaFiles.length > 0) {
      // if (1 == 1) {
      return (
        <View style={{ flex: 1 }}>
          {/* <ScreenTitle title={"Your Melo"} /> */}
          {/* <Txt.S1>{JSON.stringify(nowPlayingIDs)}</Txt.S1> */}
          <Txt.P1 onPress={getQueue}>
            {JSON.stringify(mediaFiles.length) +
              " - " +
              JSON.stringify(_queue.length)}
          </Txt.P1>
          {/* <Txt.P1 onPress={fetchMedia}>{"Refresh"}</Txt.P1> */}
          <FlatList
            ref={refMediaList}
            // keyExtractor={(asset) => asset.id.toString()}
            // data={indexedTracks}
            data={_queue}
            refreshing={_isFetched}
            onRefresh={fetchMedia}
            renderItem={({ item }: { item: TrackProps }) => (
              <Txt.H6
                ////onPress={() => setCurrentTrackID(item.id)}
                style={{
                  fontWeight: item.id == currentTrack.id ? "bold" : "600",
                }}
              >
                {JSON.stringify(item.id)}
              </Txt.H6>
              // <RenderTrack
              //   {...props}
              //   parent="track-scr"
              //   item={item}
              //   setOptions={setModal}
              // />
            )}
            getItemLayout={flatListItemLayout}
            scrollEventThrottle={16}
            maxToRenderPerBatch={30}
            contentContainerStyle={styles.flatlistContent}
            // initialScrollIndex={currentTrack.index || undefined}
            ListFooterComponentStyle={{
              width: "100%",
              height: getBottomSpace() + scale(500),
            }}
            itemHeight={itemHeight}
            viewportHeight={ViewportHeight}
            rightOffset={10}
            thumbStyle={styles.thumbStyle}
          />
          <OptionsModal
            selectedTrack={modal.item}
            isVisible={modal.visible}
            onPressCancel={() => setModal({ ...modal, visible: false })}
          />
          <View
            style={{
              position: "absolute",
              top: scale(25),
              // footerVisible && currentTrack.id != "000"
              //   ? scale(65)
              //   : scale(25),
              right: spacing[5],
            }}
          >
            <Buttoon.Fab
              icon={{ name: "shuffle" }}
              // onPress={fetchMedia}
              onPress={async (xong) => {
                await TrackPlayer.pause();
                await setShuffle(true);
                xong();
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <CtnrMessage>
        <TxtMessage {...props} numberOfLines={2}>
          {"Oops! Melo couldn't find any music on your device"}
        </TxtMessage>
      </CtnrMessage>
    );
  }

  return (
    <>
      {/* <Txt.H1 onPress={() => getMedia()}>Press here</Txt.H1> */}
      <RenderActivityIndicator text={scanMessage} />
    </>
  );
}

export default connector(withTheme(TracksScreen));

const CtnrMessage = sstyled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
const TxtMessage = sstyled(Txt.C1)((p) => ({
  fontFamily: CIRCULAR,
  color: contrastColor(p),
  textAlign: "center",
}));

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
    paddingBottom: getBottomSpace() + scale(120),
  },
};
