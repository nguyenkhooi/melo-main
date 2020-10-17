import { CIRCULAR } from "assets";
import { Buttoon, OptionsModal, RenderTrack, TrackPlaya } from "components";
import { connector, dRedux, playlistShuffle } from "engines";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import { contrastColor } from "themes";
import { dSCR, flatListItemLayout, scale, spacing, TrackProps } from "utils";

interface dSCR_ShowPlaylist extends dSCR, dRedux {}
function ShowPlaylistScreen(props: dSCR_ShowPlaylist) {
  const {
    navigation,
    route,
    playback: { shuffle },
    buildNowPlayingTracks,
  } = props;
  const [modal, setModal] = useState({ visible: false, item: {} });

  let givenTracks = route.params.content as TrackProps[];
  let thisTrackPlaya = TrackPlaya.getInstance();
  return givenTracks.length > 0 ? (
    <View style={{ flex: 1 }}>
      <FlatList
        data={givenTracks}
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
