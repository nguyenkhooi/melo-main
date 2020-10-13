import { IconPrimr, CIRCULAR } from "assets";
import { OptionsModal, RenderTrack, sstyled } from "components";
import { connector, dRedux } from "engines";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
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

  const [_queue, setQueue] = React.useState<TrackProps[]>([]);
  React.useEffect(function fetchListfromIDs() {
    setQueue(nowPlayingTracks);
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

  const [modal, setModal] = useState({ visible: false, item: {} });
  const refList = React.useRef<FlatList>();
  return (
    <View style={{}}>
      <CtnrNowPlaying {...props}>
        <TxtSub
          {...props}
          onPress={() => {
            try {
              refList.current.scrollToIndex({
                animated: true,
                index: currentTrack.index,
              });
            } catch (error) {
              console.warn(error);
            }
          }}
        >
          Coming up next • {_queue.length}
        </TxtSub>
        <IconPrimr
          preset={"safe"}
          name={"chevron_down"}
          size={20}
          color={contrastTransColor(0.75)(props)}
          onPress={() => navigation.goBack()}
        />
      </CtnrNowPlaying>

      <FlatList
        ref={refList}
        keyExtractor={(asset) => asset.id.toString()}
        data={_queue}
        renderItem={({ item }) => (
          <RenderTrack
            {...props}
            parent="now-playing-scr"
            item={item}
            setOptions={setModal}
          />
        )}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            refList.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
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
