import { OptionsModal, RenderTrack } from "components";
import { connector, dRedux } from "engines";
import React, { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";
import { dSCR, flatListItemLayout } from "utils";

interface dSCR_ShowFolder extends dSCR, dRedux {}
function ShowFolderScreen(props: dSCR_ShowFolder) {
  const {
    navigation,
    route,
    playback: { shuffle },
    setCurrentList,
    hideFooter,
  } = props;
  const [modal, setModal] = useState({ visible: false, item: {} });

  useEffect(() => {
    // console.log(">>>", route.params.content);
    let unsubscribe = navigation.addListener("focus", hideFooter);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Play"
        onPress={() => {
          setCurrentList(route.params.content, shuffle);
        }}
      />

      <FlatList
        keyExtractor={(asset) => asset.id.toString()}
        renderItem={({ item }) => (
          <RenderTrack item={item} setOptions={setModal} />
        )}
        data={route.params.content}
        getItemLayout={flatListItemLayout}
      />
      <OptionsModal
        selectedTrack={modal.item}
        isVisible={modal.visible}
        onPressCancel={() => setModal({ ...modal, visible: false })}
      />
    </View>
  );
}

export default connector(ShowFolderScreen);
