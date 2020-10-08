import { OptionsModal, RenderTrack } from "components";
import Buttoon from "components/Generals/Buttoon/Buttoon";
import { connector, dRedux, fn } from "engines";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { dSCR, flatListItemLayout, scale, spacing, TrackProps } from "utils";

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
  React.useEffect(function getQueueIDs() {
    const queueIDs = fn.js.vLookup(route.params.content, "id");
    setQueueIDs(queueIDs);
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
        <Buttoon
          style={{ padding: 30, borderRadius: 100 }}
          compact
          size="giant"
          progress={true}
          icon={{ name: "play" }}
          onPress={(xong) => {
            setNowPlayingTracks(_queueIDs, true);
            navigation.navigate("player-scr");
            setTimeout(() => {
              xong();
            }, 1000);
          }}
        ></Buttoon>
      </View>
    </View>
  );
}

export default connector(ShowFolderScreen);
