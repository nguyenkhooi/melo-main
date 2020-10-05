import { IconPrimr, CIRCULAR } from "assets";
import { OptionsModal, RenderTrack, sstyled } from "components";
import { connector, dRedux } from "engines";
import React, { useState } from "react";
import { Animated, FlatList, Text, View } from "react-native";
import { withTheme } from "styled-components";
import { contrastTransColor } from "themes";
import { dSCR, spacing } from "utils";

interface dSCR_Tracks extends dSCR, dRedux {}
function NowPlayingScreen(props: dSCR_Tracks) {
  const {
    navigation,
    media: { nowPlayingTracks },
    playback: { currentTrack },
    // setCurrentList,
  } = props;
  React.useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () =>
      refList.current?.scrollToIndex({
        animated: true,
        index: currentTrack.index,
      })
    );
    return unsubscribe;
  }, [navigation]);

  const [modal, setModal] = useState({ visible: false, item: {} });
  const refList = React.useRef<FlatList>();
  return (
    <View style={{}}>
      <CtnrNowPlaying {...props}>
        <TxtSub
          {...props}
          onPress={() =>
            refList.current.scrollToIndex({
              animated: true,
              index: currentTrack.index,
            })
          }
        >
          Coming up next • {nowPlayingTracks.length}
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
        data={nowPlayingTracks}
        renderItem={({ item }) => (
          <RenderTrack item={item} setOptions={setModal} />
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
