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
  TrackProps,
} from "utils";
import { FlatList } from "react-native-gesture-handler";

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
          <Kitt.Button
            appearance="ghost"
            style={{ alignItems: "flex-start" }}
            size="small"
            onPress={async () => {
              await setShuffle(true, mediaFiles);
              await sethPlayback({ type: "fwd" });
            }}
          >
            {`Shuffle 'Em Alls: ${mediaFiles.length} - ${
              nowPlayingTracks.length
            }${shuffle ? "*" : ""}`}
          </Kitt.Button>
          {/* <Txt.P1>{R.pluck("title")(nowPlayingTracks)}</Txt.P1> */}
          <FlatList
            keyExtractor={(asset) => asset.id.toString()}
            data={indexedTracks}
            refreshing={_isFetched}
            onRefresh={fetchMedia}
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
            renderItem={({ item }: { item: TrackProps }) => (
              <RenderTrack
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
            // itemHeight={itemHeight}
            // viewportHeight={ViewportHeight}
            // rightOffset={10}
            // thumbStyle={styles.thumbStyle}
          />
          <OptionsModal
            selectedTrack={modal.item}
            isVisible={modal.visible}
            onPressCancel={() => setModal({ ...modal, visible: false })}
          />
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

  return <RenderActivityIndicator text={scanMessage} />;
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
