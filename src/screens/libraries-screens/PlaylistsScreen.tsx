import { IconPrimr } from "assets";
import { dAccessory, InputDialog, Kitt } from "components";
import Icon, { PROPS_Icon } from "components/Icon";
import ListItem from "components/ListItem";
import PlaylistOptions from "components/PlaylistOptions";
import RenderToast from "components/RenderToast";
import { connector, dRedux } from "engines";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components";
import { contrastTransColor } from "themes";
import { dSCR } from "utils";

interface dSCR_Playlists extends dSCR, dRedux {}
function PlaylistsScreen(props: dSCR_Playlists) {
  const {
    navigation,
    //* redux states
    media: { mediaFiles },
    playback: { currentTrack },
    playlists,
    showFooter,
    createPlaylist,
  } = props;
  const [isModalVisible, setModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState({
    visible: false,
    name: "",
  });

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", showFooter);
    return unsubscribe;
  }, [navigation]);

  function onPressSave(playlistName) {
    if (playlistName) {
      let keys = Object.keys(playlists);
      let index = keys.indexOf(playlistName);
      if (index === -1) {
        createPlaylist(playlistName);
        setModal(false);
      } else {
        RenderToast({
          title: "Hold up",
          message: "A playlist with the same name already exists",
          type: "info",
        });
      }
    } else
      RenderToast({
        title: "Try again",
        message: "Playlists cannot be untitled",
        type: "error",
      });
  }

  function onListItemPress(title, content) {
    navigation.navigate("playlist-scr", { title, content });
  }

  function onOptionsPress(name) {
    setOptionsModal({ visible: true, name });
  }

  let bottomMargin =
    currentTrack.id !== "000" ? { marginBottom: 160 } : { flex: 1 };
  let keys = Object.keys(playlists);
  return (
    <View style={[bottomMargin]}>
      <Kitt.Button
        appearance="ghost"
        size="small"
        onPress={() => setModal(true)}
        accessoryLeft={(props: dAccessory) => (
          <IconPrimr
            preset={`safe`}
            name={"plus"}
            size={props.style.width}
            color={props.style.tintColor}
          />
        )}
      >
        Create Playlist
      </Kitt.Button>
      <InputDialog
        isVisible={isModalVisible}
        onPressSave={onPressSave}
        onPressCancel={() => setModal(false)}
        inputPlaceholder="Give your playlist a name"
        saveButtonTitle="Create"
        title="Create playlist"
      />
      <PlaylistOptions
        selectedPlaylist={optionsModal.name}
        isVisible={optionsModal.visible}
        onPressCancel={() =>
          setOptionsModal({ ...optionsModal, visible: false })
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {keys.map((key, index) => (
          <ListItem
            title={key}
            subtitle={`${playlists[key].length} tracks`}
            key={String(key + index)}
            onPress={() => onListItemPress(key, playlists[key])}
            iconProps={playlistIcon}
            rightElement={
              <StyledIcon
                {...optionsIcon}
                onPress={() => onOptionsPress(key)}
              />
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default connector(PlaylistsScreen);

const StyledIcon = styled(Icon)`
  color: ${contrastTransColor(0.75)};
  padding-horizontal: 5px;
`;

const playlistIcon = {
  name: "star",
  type: "fa5",
  size: 26,
} as PROPS_Icon;

const optionsIcon = {
  name: "ellipsis-v",
  type: "fa5",
  size: 20,
};
