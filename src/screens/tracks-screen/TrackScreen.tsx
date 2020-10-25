import { useScrollToTop } from "@react-navigation/native";
import { CIRCULAR } from "assets";
import {
  Buttoon,
  OptionsModal,
  PlayerFooter,
  RenderTrack,
  sstyled,

  TrackPlaya,
  Txt
} from "components";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import { scanMessage } from "constants";
import {
  getMedia,
  ReduxActions,
  ReduxStates,
  sethPlayback,
  setShuffle
} from "engines";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StatusBar, View, ViewStyle } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
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
  TrackProps
} from "utils";

// const QuickScrollList = FlatList;

const ScreenHeight = Dimensions.get("window").height;
const StatusBarHeight = StatusBar.currentHeight;
const FooterHeight = 60;
const BottomTabHeight = 49;
const ViewportHeight =
  ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight);
const itemHeight = 75;

const mapStates = (state: ReduxStates) => {
  const {
    media: { mediaLoaded, mediaFiles },
    playback: { shuffle },
  } = state;
  return { mediaLoaded, mediaFiles, shuffle };
};

const mapDispatch = {
  getMedia,
  setShuffle,
  sethPlayback,
} as ReduxActions;

function TracksScreen(props: dSCR_Tracks) {
  const {
    navigation,
    mediaLoaded,
    mediaFiles,
    //* redux actions
    getMedia,
    setShuffle,
    sethPlayback,
  } = props;

  const [modal, setModal] = useState({ visible: false, item: {} });
  const [_isFetched, shouldFetch] = React.useState(false);

  const [_queue, setQueue] = React.useState(mediaFiles);

  const [] = React.useState(
    new DataProvider((r1, r2) => {
      return r1 !== r2;
    })
  );

  const thisTrackPlaya = TrackPlaya.getInstance();

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", async () => {
      // await getMedia(); //* fetch media without showing indicator
      PlayerFooter.open();
    });
    return unsubscribe;
  }, [navigation]);

  function fetchMedia() {
    shouldFetch(true);
    getMedia("manual");
    setTimeout(() => {
      shouldFetch(false);
    }, 1000);
  }
  // React.useEffect(async function updateQueue() {
  //   const queue = await thisTrackPlaya.core.getQueue();
  //   const queueIDs = R.pluck("id")(queue);
  //   setQueue(queueIDs);
  // }, []);

  const refMediaList = React.useRef<FlatList<{}>>();
  useScrollToTop(refMediaList);

  // if (mediaLoaded) {
  if (1 == 1) {
    if (mediaFiles.length > 0) {
      // if (1 == 1) {
      return (
        <View style={{ flex: 1 }}>
          {/* <ScreenTitle title={"Your Melo"} /> */}
          {/* <Txt.P1 onPress={getQueue}>
            {JSON.stringify(mediaFiles.length) +
              " - " +
              JSON.stringify(_queue.length)}
          </Txt.P1> */}
          {/* <Txt.P1 onPress={fetchMedia}>{"Refresh"}</Txt.P1> */}
          <FlatList
            ref={refMediaList}
            keyExtractor={(item: TrackProps) => item.id}
            // data={indexedTracks}
            data={mediaFiles}
            refreshing={_isFetched}
            onRefresh={fetchMedia}
            renderItem={({ item }) => (
              // <Txt.H6
              //   onPress={() => setCurrentTrackID(item.id)}
              //   style={{
              //     fontWeight: item.id == currentTrack.id ? "bold" : "600",
              //   }}
              // >
              //   {JSON.stringify(item.id)}
              // </Txt.H6>
              <RenderTrack
                {...props}
                parent="track-scr"
                item={item}
                setOptions={setModal}
              />
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
              // onPress={() => Toasty.show("Hello mf", { type: "success" })}
              onPress={async (xong) => {
                await setShuffle(true, mediaFiles);
                setTimeout(() => {
                  xong();
                  sethPlayback({ type: "fwd" });
                }, 500);
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

export default connect(mapStates, mapDispatch)(withTheme(TracksScreen));

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

interface dStates extends ReturnType<typeof mapStates> {}
interface dDispatch extends Partial<typeof mapDispatch> {}

interface dSCR_Tracks extends dSCR, dStates, dDispatch {}
