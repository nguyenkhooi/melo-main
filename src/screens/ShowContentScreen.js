import React, { useState, useEffect } from "react";
import { View, FlatList, Button, Text } from "react-native";
import { connect } from "react-redux";
import * as actions from "../actions";
import RenderTrack from "../components/RenderTrack";
import OptionsModal from "../components/OptionsModal";
import { flatListItemLayout } from "../utils/FlatListLayout";
import TrackPlayer from "react-native-track-player";

function ShowFolderScreen(props) {
  const [modal, setModal] = useState({ visible: false, item: {} });

  useEffect(() => {
    // console.log(">>>", props.route.params.content);
    let unsubscribe = props.navigation.addListener("focus", props.hideFooter);
    return unsubscribe;
  }, [props.navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Play"
        onPress={() => {
          props.setCurrentList(props.route.params.content, props.shuffle);
        }}
      />

      <FlatList
        keyExtractor={(asset) => asset.id.toString()}
        renderItem={({ item }) => (
          <RenderTrack item={item} setOptions={setModal} />
        )}
        data={props.route.params.content}
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

function mapStateToProps(state) {
  return {
    media: state.media.mediaFiles,
    currentTrack: state.playback.currentTrack,
    currentList: state.playback.currentList,
    isPlaying: state.player.isPlaying,
    loop: state.playback.loop,
    shuffle: state.playback.shuffle,
    nowPlaying: state.media.nowPlaying,
  };
}

export default connect(mapStateToProps, actions)(ShowFolderScreen);
