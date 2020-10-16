import { CIRCULAR } from "assets";
import { connector, dRedux } from "engines";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import { getBottomSpace } from "utils";
import { contrastColor, elevatedBGColor } from "../themes/styles";
import ConfirmDialog from "./ConfirmDialog";
import { InputDialog, Toasty } from "./Generals";
import ListItem from "./ListItem";
import RenderToast from "./RenderToast";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

interface dCOMP_PlaylistOptions extends dRedux {
  selectedPlaylist: any;
  isVisible: boolean;
  onPressCancel(): void;
  playlistRemoveOption: any;
}
function PlaylistOptions(props: dCOMP_PlaylistOptions) {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isRenameModalVisible, setRenameModal] = useState(false);

  const {
    playlists,
    renamePlaylist,
    deletePlaylist,
    selectedPlaylist,
    isVisible,
    onPressCancel,
  } = props;

  function onPressRename(newName) {
    let playlistName = newName.trim();
    if (playlistName === selectedPlaylist) return setRenameModal(false);
    if (playlistName) {
      let keys = Object.keys(playlists);
      let index = keys.indexOf(playlistName);
      if (index === -1) {
        renamePlaylist(selectedPlaylist, playlistName);
        setRenameModal(false);
        onPressCancel();
      } else
        Toasty.show("A playlist with the same name already exists", {
          type: "danger",
        });
    } else
      Toasty.show("Playlists cannot be untitled", {
        type: "danger",
      });
  }

  function onDeleteConfirm() {
    setDialogVisible(false);
    onPressCancel();
    deletePlaylist(selectedPlaylist);
  }

  return (
    <StyledModal
      isVisible={isVisible}
      swipeDirection="down"
      deviceHeight={SCREEN_HEIGHT}
      onBackButtonPress={onPressCancel}
      onBackdropPress={onPressCancel}
      onSwipeComplete={onPressCancel}
      backdropColor="black"
      animationOutTiming={100}
      animationInTiming={100}
      hideModalContentWhileAnimating
    >
      <ModalContentWrapper>
        <TextWrapper>
          <ModalTitle numberOfLines={1}>{selectedPlaylist}</ModalTitle>
        </TextWrapper>
        <ListItem
          title="Rename"
          iconProps={icons.rename}
          onPress={() => setRenameModal(true)}
        />
        <ListItem
          title="Delete"
          iconProps={icons.delete}
          onPress={() => setDialogVisible(true)}
        />
        <InputDialog
          isVisible={isRenameModalVisible}
          onPressSave={onPressRename}
          onPressCancel={() => setRenameModal(false)}
          inputPlaceholder="New title"
          title="Rename Playlist"
          name={selectedPlaylist}
          saveButtonTitle="Rename"
        />
        <ConfirmDialog
          title="Confirm Delete"
          buttonTitle="Delete"
          cancelButton
          description="Are you sure you want to delete this playlist?"
          onCancel={() => setDialogVisible(false)}
          onConfirm={onDeleteConfirm}
          isVisible={isDialogVisible}
        />
      </ModalContentWrapper>
    </StyledModal>
  );
}

export default connector(PlaylistOptions);

const StyledModal = styled(Modal)`
  justify-content: flex-end;
  align-items: center;
`;

const ModalContentWrapper = styled.View`
  height: 172px;
  width: ${SCREEN_WIDTH}px;
  background-color: ${elevatedBGColor};
  elevation: 5;
  justify-content: space-evenly;
  padding-bottom: ${getBottomSpace("safe")}px;
  margin-bottom: -20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const TextWrapper = styled.View`
  height: 35px;
  justify-content: center;
  margin: 12px 15px 0 15px;
`;

const ModalTitle = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 15px;
  text-align: center;
  color: ${contrastColor};
`;

const icons = {
  rename: {
    name: "edit",
    type: "feather",
    size: 20,
  },
  delete: {
    name: "trash-2",
    type: "feather",
    size: 20,
  },
};
