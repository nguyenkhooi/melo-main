import { CIRCULAR } from "assets";
import {
  Kitt,
  OptionsModal,
  RenderTrack,
  ScreenTitle,
  sstyled,
  Txt,
} from "components";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import { scanMessage } from "constants";
import { connector, dRedux, sethPlayback } from "engines";
import R from "ramda";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, StatusBar, View, ViewStyle } from "react-native";
import QuickScrollList from "react-native-quick-scroll";
import styled, { withTheme } from "styled-components/native";
import { contrastColor } from "themes";
import TrackPlayer from "react-native-track-player";
import {
  dSCR,
  flatListItemLayout,
  getBottomSpace,
  getStatusBarHeight,
  scale,
  spacing,
  TrackProps,
} from "utils";
import { FlatList } from "react-native-gesture-handler";
import Buttoon from "components/Generals/Buttoon/Buttoon";

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
    footer: { footerVisible },
    playback: { currentTrack, shuffle },
    media: { mediaLoaded, mediaFiles, nowPlayingTracks },
    //* redux actions
    getMedia,
    setShuffle,
    showFooter,
    // setCurrentList,
  } = props;
  const indexedTracks = R.sortBy(R.prop("index"))(mediaFiles);

  const [scrollY] = useState(new Animated.Value(0));
  const [modal, setModal] = useState({ visible: false, item: {} });
  const [_isFetched, shouldFetch] = React.useState(false);

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () => {
      getMedia(); //* fetch media without showing indicator
      showFooter();
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

  if (mediaLoaded) {
    if (mediaFiles.length > 0) {
      // if (1 == 1) {
      // if (1 == 1) {
      return (
        <View style={{ paddingTop: getStatusBarHeight("safe"), flex: 1 }}>
          <ScreenTitle title={"Your Melo"} />

          {/* <Txt.P1>{R.pluck("title")(nowPlayingTracks)}</Txt.P1> */}
          <QuickScrollList
            keyExtractor={(asset) => asset.id.toString()}
            data={indexedTracks}
            refreshing={_isFetched}
            onRefresh={fetchMedia}
            renderItem={({ item }: { item: TrackProps }) => (
              <RenderTrack
                {...props}
                parent="track-scr"
                item={item}
                setOptions={setModal}
              />
            )}
            getItemLayout={flatListItemLayout}
            scrollEventThrottle={16}
            contentContainerStyle={styles.flatlistContent}
            initialScrollIndex={currentTrack.index || undefined}
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
              bottom:
                footerVisible && currentTrack.id != "000"
                  ? scale(65)
                  : scale(25),
              right: spacing[5],
            }}
          >
            <Buttoon
              style={{ padding: 30, borderRadius: 100 }}
              compact
              size="giant"
              progress={true}
              icon={{ name: "shuffle" }}
              onPress={async (xong) => {
                await TrackPlayer.pause();
                await setShuffle(true, mediaFiles);
                await sethPlayback({ type: "fwd" });
                xong();
              }}
            >
              {/* {`Shuffle 'Em Alls: ${mediaFiles.length} - ${
                nowPlayingTracks.length
              }${shuffle ? "*" : ""}`} */}
            </Buttoon>
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
