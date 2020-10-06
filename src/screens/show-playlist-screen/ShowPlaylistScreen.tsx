import { CIRCULAR } from "assets";
import { OptionsModal, RenderTrack } from "components";
import { connector, dRedux } from "engines";
import React, { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";
import styled from "styled-components/native";
import { contrastColor } from "themes";
import { dSCR, flatListItemLayout } from "utils";

interface dSCR_ShowPlaylist extends dSCR, dRedux {}
function ShowPlaylistScreen(props: dSCR_ShowPlaylist) {
  const {
    navigation,
    route,
    playback: { shuffle },
    setCurrentList,
    hideFooter,
  } = props;
  const [modal, setModal] = useState({ visible: false, item: {} });

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", hideFooter);
    return unsubscribe;
  }, [navigation]);

  let listData = route.params.content;
  return listData.length > 0 ? (
    <View style={{ flex: 1 }}>
      <Button
        onPress={() => {
          setCurrentList(listData, shuffle);
        }}
        title={"Play"}
      />
      <FlatList
        data={listData}
        keyExtractor={(asset) => asset.id.toString()}
        renderItem={({ item }) => (
          <RenderTrack
            {...props}
            parent="playlist-scr"
            item={item}
            setOptions={setModal}
          />
        )}
        getItemLayout={flatListItemLayout}
      />
      <OptionsModal
        selectedTrack={modal.item}
        isVisible={modal.visible}
        onPressCancel={() => setModal({ ...modal, visible: false })}
        playlistRemoveOption
      />
    </View>
  ) : (
    <EmptyWrapper>
      <EmptyText>Oops! This playlist is empty</EmptyText>
    </EmptyWrapper>
  );
}

export default connector(ShowPlaylistScreen);

const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
`;

const EmptyText = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 16px;
  color: ${contrastColor};
`;
