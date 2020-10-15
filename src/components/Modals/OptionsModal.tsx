import { useNavigation, useRoute } from "@react-navigation/native";
import { CIRCULAR, CIRCULAR_LIGHT, img } from "assets";
import { InputDialog, sstyled } from "components";
import { Txt } from "components/Generals";
import { connector, dRedux } from "engines";
import React, { useState } from "react";
import { Image, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import { Modalize } from "react-native-modalize";
import Share from "react-native-share";
import styled, { withTheme } from "styled-components/native";
import { foregroundColor } from "themes";
import {
  DEVICE_HEIGHT,
  getBottomSpace,
  scale,
  spacing,
  TrackProps,
} from "utils";
import ConfirmDialog from "../ConfirmDialog";
import RenderToast from "../RenderToast";

class SS_Options extends React.Component<dCOMP_OptionsModal> {
  ref$$ = React.createRef<Modalize>();
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }

  /**
   * Show the $$_Options
   */
  static open() {
    this._ref.open();
  }

  /**
   * Hide the $$_Options
   */
  static close() {
    this._ref.close();
  }

  open() {
    this.ref$$.current.open();
  }

  close() {
    this.ref$$.current.close();
  }

  render() {
    return (
      <Modalize
        ref={this.ref$$}
        snapPoint={getBottomSpace("safe") + scale(40) + scale(40)}
        modalHeight={getBottomSpace("safe") + scale(40) + scale(150)}
        modalStyle={{
          backgroundColor: "transparent",
          padding: spacing[3],
          elevation: 0,
        }}
        withOverlay={false}
        overlayStyle={{ backgroundColor: "transparent" }}
        alwaysOpen={getBottomSpace("safe") + scale(40) + scale(40)}
        // snapPoint={HEADER_HEIGHT}
        withHandle={false}
        // onPositionChange={(position) => {
        //   // console.log("position");
        //   if (position == "top") {
        //     this.jumpToPlayerScr();
        //   }
        // }}
        // onClosed={() => navigate("player-scr")}
      >
        <OptionsModal {...this.props} />
      </Modalize>
    );
  }
}

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
      {...props}
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
      <Image
        source={{ uri: selectedTrack.artwork }}
        style={{
          width: scale(150),
          height: scale(150),
          margin: spacing[3],
          borderRadius: scale(6),
        }}
      ></Image>
      <ModalContentWrapper
        {...props}
        colors={["transparent", foregroundColor(props)]}
        start={{ x: 1.0, y: 0.1 }}
        end={{ x: 1.0, y: 1.0 }}
      >
        <TxtTitle numberOfLines={1}>{modalTitle}</TxtTitle>

        <TxtOption onPress={optionFunc}>{optionText}</TxtOption>
        <TxtOption onPress={onShare}>Share</TxtOption>
        <TxtOption onPress={() => setRenameModal(true)}>Rename</TxtOption>
        <TxtOption onPress={() => setDialogVisible(true)}>Delete</TxtOption>
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
      <View
        style={{
          position: "absolute",
          bottom: spacing[2],
          right: spacing[2],
        }}
      >
        <Image
          source={img.meloLogo}
          style={{ width: scale(20), height: scale(20) }}
        />
      </View>
    </StyledModal>
  );
}

export default connector(withTheme(OptionsModal));

// const StyledModal = styled(Modal)`
//   justify-content: flex-end;
//   align-items: center;
// `;

const StyledModal = sstyled(Modal)((p) => ({
  justifyContent: "flex-end",
  alignItems: "center",
}));

const ModalContentWrapper = sstyled(LinearGradient)((p) => ({
  // backgroundColor: elevatedBGColor(p),
  paddingBottom: getBottomSpace("safe"),
  height: scale(310),
  width: "100%",
  elevation: 0,
  justifyContent: "space-evenly",
  borderRadius: scale(10),
  overflow: "hidden",
}));

const TxtOption = sstyled(Txt.S1)({
  padding: spacing[3],
  color: "white",
  fontFamily: CIRCULAR_LIGHT,
});

const TxtTitle = sstyled(Txt.S1)({
  // height: scale(35),
  justifyContent: "center",
  margin: spacing[2],
  padding: spacing[3],
  color: "white",
  fontFamily: CIRCULAR,
  textAlign: "center",
});

const TextWrapper = styled.View`
  height: 35px;
  justify-content: center;
  margin: 12px 15px 0 15px;
`;
