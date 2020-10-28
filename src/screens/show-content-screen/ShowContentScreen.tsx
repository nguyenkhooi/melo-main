import { Buttoon, OptionsModal, TrackItem, TrackPlaya } from "components";
import { connector, dRedux, fn, playlistShuffle } from "engines";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import {
  dSCR,
  dTracks,
  flatListItemLayout,
  scale,
  spacing,
  TrackProps
} from "utils";

interface dSCR_ShowFolder extends dSCR, dRedux {
  route: { params: { content: TrackProps[] } };
}
function ShowFolderScreen(props: dSCR_ShowFolder) {
  const {
    navigation,
    route,
    media: { mediaFiles },
    playback: { shuffle },
    buildNowPlayingTracks,
  } = props;
  const [modal, setModal] = useState({ visible: false, item: {} });
  const [_queueIDs, setQueueIDs] = React.useState([]);
  const [_queue, setQueue] = React.useState<dTracks>([]);
  React.useEffect(function getQueueIDs() {
    const queueIDs = fn.js.vLookup(route.params.content, "id");
    setQueueIDs(queueIDs);
    setQueue(route.params.content);
  }, []);
  const thisTrackPlaya = TrackPlaya.getInstance();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(asset) => asset.id.toString()}
        renderItem={({ item }) => (
          <TrackItem
            {...props}
            parent="contents-scr"
            item={item}
            setOptions={setModal}
          />
        )}
        data={route.params.content}
        getItemLayout={flatListItemLayout}
      />
      <OptionsModal
        selectedTrack={modal.item}
        isVisible={modal.visible}
        onPressCancel={() => setModal({ ...modal, visible: false })}
      />
      <View
        style={{
          position: "absolute",
          bottom: scale(25),
          right: spacing[5],
        }}
      >
        <Buttoon.Fab
          icon={{ name: "play" }}
          onPress={(xong) => {
            const givenTracks = _queue;
            const targetedPlaylist = shuffle
              ? playlistShuffle(givenTracks, "normal")
              : givenTracks;

            buildNowPlayingTracks(targetedPlaylist, givenTracks);
            setTimeout(() => {
              xong();
              navigation.navigate("player-scr");
              thisTrackPlaya.play();
            }, 500);
          }}
        ></Buttoon.Fab>
      </View>
    </View>
  );
}

export default connector(ShowFolderScreen);
