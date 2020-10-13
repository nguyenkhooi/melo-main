import { OptionsModal, RenderTrack, Buttoon } from "components";
import { connector, dRedux, fn } from "engines";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import {
  dSCR,
  dTracks,
  flatListItemLayout,
  scale,
  spacing,
  TrackProps,
} from "utils";

interface dSCR_ShowFolder extends dSCR, dRedux {
  route: { params: { content: TrackProps[] } };
}
function ShowFolderScreen(props: dSCR_ShowFolder) {
  const {
    navigation,
    route,
    media: { mediaFiles },
    setNowPlayingTracks,
  } = props;
  const [modal, setModal] = useState({ visible: false, item: {} });
  const [_queueIDs, setQueueIDs] = React.useState([]);
  const [_queue, setQueue] = React.useState<dTracks>([]);
  React.useEffect(function getQueueIDs() {
    const queueIDs = fn.js.vLookup(route.params.content, "id");
    setQueueIDs(queueIDs);
    setQueue(route.params.content);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(asset) => asset.id.toString()}
        renderItem={({ item }) => (
          <RenderTrack
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
            setNowPlayingTracks(_queueIDs, _queue, true);
            navigation.navigate("player-scr");
            setTimeout(() => {
              xong();
            }, 1000);
          }}
        ></Buttoon.Fab>
      </View>
    </View>
  );
}

export default connector(ShowFolderScreen);
