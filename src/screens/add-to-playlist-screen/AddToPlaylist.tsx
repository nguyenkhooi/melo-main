import { CIRCULAR } from "assets";
import ListItem from "components/ListItem";
import RenderToast from "components/RenderToast";
import { connector, dRedux } from "engines";
import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { contrastColor } from "themes";
import { dSCR } from "utils";

interface dSCR_AddToPlaylist extends dSCR, dRedux {}
function AddToPlaylist(props: dSCR_AddToPlaylist) {
  const { navigation, route, playlists, toggleFooter, addToPlaylist } = props;
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () =>
      toggleFooter("hide")
    );
    return unsubscribe;
  }, [navigation]);

  function addSong(playlistTitle, song) {
    addToPlaylist(playlistTitle, song);
    RenderToast({
      title: "Great",
      message: "Track was added to playlist",
      type: "success",
    });
    navigation.goBack();
  }

  function onPlaylistPress(playlistName) {
    let { song } = route.params;
    let filtered = playlists[playlistName].filter(
      (file) => file.id === song.id
    );
    if (filtered.length > 0)
      RenderToast({
        title: "Hold up",
        message: "This track is already in this playlist",
        type: "info",
      });
    else addSong(playlistName, song);
  }

  const keys = Object.keys(playlists);
  if (keys.length === 0) {
    return (
      <EmptyWrapper>
        <EmptyText>{"You don't have any playlists yet"}</EmptyText>
      </EmptyWrapper>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {keys.map((key, index) => (
        <ListItem
          title={key}
          subtitle={`${playlists[key].length} tracks`}
          onPress={() => onPlaylistPress(key)}
          iconProps={playlistIcon}
          key={(key + index).toString()}
        />
      ))}
    </ScrollView>
  );
}

export default connector(AddToPlaylist);

const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: "center";
  margin-bottom: 80px;
`;

const EmptyText = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 16px;
  color: ${contrastColor};
`;

const playlistIcon = {
  name: "playlist-music-outline",
  type: "material-community",
  size: 28,
};
