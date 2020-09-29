import { useNavigation, useRoute } from "@react-navigation/native";
import { CIRCULAR } from "assets";
import { InputDialog } from "components";
import { connector, dRedux } from "engines";
import React, { useState } from "react";
import Modal from "react-native-modal";
import Share from "react-native-share";
import styled from "styled-components/native";
import { contrastColor, elevatedBGColor } from "themes";
import { DEVICE_HEIGHT, DEVICE_WIDTH, TrackProps } from "utils";
import ConfirmDialog from "../ConfirmDialog";
import ListItem from "../ListItem";
import RenderToast from "../RenderToast";


interface dCOMP_OptionsModal extends dRedux {
  selectedTrack: TrackProps;
  isVisible: boolean;
  onPressCancel(): void;
  playlistRemoveOption: any;
}
function OptionsModal(props: dCOMP_OptionsModal) {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [isRenameModalVisible, setRenameModal] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const {
    /** redux */
    removeFromPlaylist,
    renameTrack,
    deleteTrack,

    selectedTrack,
    isVisible,
    onPressCancel,
    playlistRemoveOption,
  } = props;

  function onAddToPlaylist() {
    onPressCancel();
    navigation.navigate("addToPlaylist-scr", { song: selectedTrack });
  }

  function onRemoveFromPlaylist() {
    onPressCancel();
    removeFromPlaylist(route.params.title, selectedTrack);
  }

  function onPressRename(newName) {
    if (newName !== selectedTrack.title) {
      let index = newName.split("").indexOf("/");
      if (index === -1) {
        renameTrack(selectedTrack, newName);
      } else {
        return RenderToast({
          title: "Error",
          message: 'Title should not contain "/"',
          type: "error",
        });
      }
    }
    setRenameModal(false);
    onPressCancel();
  }

  function onShare() {
    onPressCancel();
    Share.open({
      url: `file://${selectedTrack.url}`,
      type: "audio/mp3",
      failOnCancel: false,
    });
  }

  function onDeleteConfirm() {
    setDialogVisible(false);
    onPressCancel();
    deleteTrack(selectedTrack);
  }

  const modalTitle = `${selectedTrack.title}  •  ${selectedTrack.artist}`;
  const optionText = playlistRemoveOption
    ? "Remove from Playlist"
    : "Add to Playlist";
  const optionFunc = playlistRemoveOption
    ? onRemoveFromPlaylist
    : onAddToPlaylist;

  return (
    <StyledModal
      isVisible={isVisible}
      deviceHeight={DEVICE_HEIGHT}
      swipeDirection="down"
      onBackButtonPress={onPressCancel}
      onBackdropPress={onPressCancel}
      onSwipeComplete={onPressCancel}
      backdropColor="black"
      animationOutTiming={200}
      animationInTiming={200}
      hideModalContentWhileAnimating
    >
      <ModalContentWrapper>
        <TextWrapper>
          <ModalTitle numberOfLines={1}>{modalTitle}</ModalTitle>
        </TextWrapper>
        <ListItem
          title={optionText}
          iconProps={icons.playlist}
          onPress={optionFunc}
        />
        <ListItem title="Share" iconProps={icons.share} onPress={onShare} />
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
          title="Rename Track"
          name={selectedTrack.title}
          saveButtonTitle="Rename"
        />
        <ConfirmDialog
          title="Confirm Delete"
          buttonTitle="Delete"
          cancelButton
          description="Are you sure you want to delete this track?"
          onCancel={() => setDialogVisible(false)}
          onConfirm={onDeleteConfirm}
          isVisible={isDialogVisible}
        />
      </ModalContentWrapper>
    </StyledModal>
  );
}

export default connector(OptionsModal);

const StyledModal = styled(Modal)`
  justify-content: flex-end;
  align-items: center;
`;

const ModalContentWrapper = styled.View`
  height: 310px;
  width: ${DEVICE_WIDTH}px;
  background-color: ${elevatedBGColor};
  elevation: 5;
  justify-content: space-evenly;
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
  font-size: 14px;
  text-align: center;
  color: ${contrastColor};
`;

const icons = {
  playlist: {
    name: "list",
    type: "feather",
    size: 20,
  },
  share: {
    name: "share-2",
    type: "feather",
    size: 20,
  },
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
