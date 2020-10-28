import { useScrollToTop } from "@react-navigation/native";
import { CIRCULAR } from "assets";
import {
  Buttoon,
  OptionsModal,
  PlayerFooter,
  sstyled,
  TrackItem,
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
import { FlatList, View } from "react-native";
// import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { DataProvider } from "recyclerlistview";
import {
  dSCR,
  flatListItemLayout,
  getBottomSpace,
  scale,
  spacing,
  TrackProps
} from "utils";

const _mapStates = (state: ReduxStates) => {
  const {
    media: { mediaLoaded, mediaFiles },
    playback: { shuffle },
  } = state;
  return { mediaLoaded, mediaFiles, shuffle };
};

const _mapDispatch = {
  getMedia,
  setShuffle,
  sethPlayback,
} as ReduxActions;

/**
 * Section that shows list of music tracks
 *
 * ---
 * @version 0.10.28
 *  - *Renderfy*
 *  - *Clean Up*
 * @author nguyenkhooi
 */
export function S_Podcasts(p: dSCR_Tracks) {
  const RENDER = connect(
    _mapStates,
    _mapDispatch
  )((rx: dStates & dDispatch) => {
    const {
      navigation,
      mediaLoaded,
      mediaFiles,
      //* redux actions
      getMedia,
      setShuffle,
      sethPlayback,
    } = { ...rx, ...p };

    const [modal, setModal] = useState({ visible: false, item: {} });
    const [_isFetched, shouldFetch] = React.useState(false);
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

    const refMediaList = React.useRef<FlatList<TrackProps>>();
    useScrollToTop(refMediaList);

    // if (mediaLoaded) {
    if (1 == 1) {
      if (mediaFiles.length > 0) {
        // if (1 == 1) {
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              ref={refMediaList}
              keyExtractor={(item: TrackProps) => item.id}
              // horizontal={true}
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
                <TrackItem
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
          <TxtMessage numberOfLines={2}>
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
  });

  return <RENDER />;
}

const CtnrMessage = sstyled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});
const TxtMessage = sstyled(Txt.C1)((p) => ({
  fontFamily: CIRCULAR,
  color: p.C.text,
  textAlign: "center",
}));

const styles = {
  flatlistContent: {
    marginTop: 20,
    paddingBottom: getBottomSpace() + scale(120),
  },
};

interface dStates extends ReturnType<typeof _mapStates> {}
interface dDispatch extends Partial<typeof _mapDispatch> {}
interface dSCR_Tracks extends Partial<dSCR>, dStates, dDispatch {}
