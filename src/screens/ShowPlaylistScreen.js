import React, { useState, useEffect } from "react";
import { View, FlatList, Button } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import * as actions from "actions";
import RenderTrack from "../components/RenderTrack";
import OptionsModal from "../components/OptionsModal";
import { flatListItemLayout } from "../utils/FlatListLayout";
import { contrastColor } from "../themes/styles";
import { CIRCULAR } from "assets";

function ShowPlaylistScreen(props) {
  const [modal, setModal] = useState({ visible: false, item: {} });

  const { shuffle, currentList, setCurrentList } = props;
  useEffect(() => {
    let unsubscribe = props.navigation.addListener("focus", props.hideFooter);
    return unsubscribe;
  }, [props.navigation]);

  let listData = props.route.params.content;
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
          <RenderTrack item={item} setOptions={setModal} />
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

function mapStateToProps(state) {
  return {
    currentList: state.playback.currentList,
    isPlaying: state.player.isPlaying,
    loop: state.playback.loop,
    shuffle: state.playback.shuffle,
    nowPlaying: state.media.nowPlaying,
  };
}

export default connect(mapStateToProps, actions)(ShowPlaylistScreen);

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
