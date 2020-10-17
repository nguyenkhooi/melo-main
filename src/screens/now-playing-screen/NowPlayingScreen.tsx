import { CIRCULAR, IconPrimr } from "assets";
import { OptionsModal, RenderTrack, sstyled } from "components";
import {
  connector,
  dRedux,
  SetCurrentTrackAction,
  SetNowPlayingTracksAction,
} from "engines";
import R from "ramda";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { withTheme } from "styled-components";
import { contrastTransColor } from "themes";
import { dSCR, spacing, TrackProps } from "utils";

interface dSCR_Tracks extends dSCR, dRedux {}
function NowPlayingScreen(props: dSCR_Tracks) {
  const {
    navigation,
    media: { nowPlayingTracks },
    playback: { currentTrack },
    // setCurrentList,
  } = props;
  const dispatch = useDispatch<Dispatch<SetNowPlayingTracksAction>>();
  const [_queue, setQueue] = React.useState<TrackProps[]>([]);
  React.useEffect(function fetchNowPlayingList() {
    /**
     * Now, we start manipulating tracks from %mediaFiles
     *
     * ---
     * - Slice %mediaFiles into `beforeCurrentTracks` and `afterCurrentTracks`
     * - Create a queue of `[...afterCurrentTracks, ...beforeCurrentTracks]`
     * to make `%nowPlayingTracks` "feels" like `%mediaFiles`,
     * tho this list starts with the `currentTrack` instead of `%mediaFiles[0]`
     * //- then remove `currentTrack` above out the list to avoid duplication
     */
    const currentPos = R.indexOf(
      currentTrack.id,
      R.pluck("id")(nowPlayingTracks)
    );
    let beforeCurrentTracks = R.slice(
      0,
      currentPos,
      nowPlayingTracks
    ) as TrackProps[];
    console.log("BC: ", beforeCurrentTracks.length);
    let afterCurrentTracks = R.slice(
      currentPos + 1,
      nowPlayingTracks.length,
      nowPlayingTracks
    ) as TrackProps[];
    console.log("AC: ", afterCurrentTracks.length);
    const queueTracks = [
      currentTrack,
      ...afterCurrentTracks,
      ...beforeCurrentTracks,
    ];
    // const _npTracks = R.reject((track) => track.id === "000", [
    //   currentTrack,
    //   ...queueTracks,
    // ]);
    setQueue(queueTracks);
  }, []);

  // React.useEffect(() => {
  //   let unsubscribe = navigation.addListener("focus", () =>
  //     {

  //       refList.current?.scrollToIndex({
  //       animated: true,
  //       index: currentTrack.index,
  //     })}
  //   );
  //   return unsubscribe;
  // }, [navigation]);

  // React.useEffect(
  //   function updateQueue() {
  //     dispatch(updateQueue(_queue));
  //   },
  //   [_queue]
  // );

  const [modal, setModal] = useState({ visible: false, item: {} });
  const refList = React.useRef<FlatList>();
  return (
    <View style={{ flex: 1 }}>
      <CtnrNowPlaying {...props}>
        <TxtSub {...props}>Coming up next • {_queue.length}</TxtSub>
        <IconPrimr
          preset={"safe"}
          name={"chevron_down"}
          size={20}
          color={contrastTransColor(0.75)(props)}
          onPress={() => navigation.goBack()}
        />
      </CtnrNowPlaying>

      <DraggableFlatList
        keyExtractor={(asset) => asset.id.toString()}
        data={_queue}
        onDragEnd={({ data }) => setQueue(data)}
        renderItem={({ item, drag }) => (
          <RenderTrack
            {...props}
            parent="now-playing-scr"
            item={item}
            onLongPress={drag}
            // setOptions={setModal}
          />
        )}
        // onScrollToIndexFailed={(info) => {
        //   const wait = new Promise((resolve) => setTimeout(resolve, 500));
        //   wait.then(() => {
        //     refList.current?.scrollToIndex({
        //       index: info.index,
        //       animated: true,
        //     });
        //   });
        // }}
      />

      <OptionsModal
        selectedTrack={modal.item}
        isVisible={modal.visible}
        onPressCancel={() => setModal({ ...modal, visible: false })}
      />
    </View>
  );
}

export default connector(withTheme(NowPlayingScreen));

const CtnrNowPlaying = sstyled(View)({
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: spacing[3],
});

const TxtSub = sstyled(Text)((p) => ({
  fontFamily: CIRCULAR,
  fontSize: 15,
  color: contrastTransColor(0.75)(p),
}));
