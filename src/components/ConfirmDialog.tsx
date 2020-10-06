import React from "react";
import Dialog from "react-native-dialog";
import { withTheme } from "styled-components/native";
import { evaLight } from "utils";

function ConfirmDialog(props) {
  const {
    title,
    description,
    buttonTitle,
    isVisible,
    onCancel,
    cancelButton,
  } = props;
  const { foreground } = props.theme;
  return (
    <Dialog.Container
      visible={isVisible}
      backdropColor="black"
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
    >
      <Dialog.Title style={{ color: evaLight["color-basic-800"] }}>
        {title}
      </Dialog.Title>
      <Dialog.Description style={{ color: evaLight["color-basic-800"] }}>
        {description}
      </Dialog.Description>
      {/* <DialogTitle numberOfLines={2}>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription> */}
      {cancelButton ? (
        <Dialog.Button
          label="Cancel"
          color={evaLight["color-basic-600"]} //* dim color
          onPress={onCancel}
        />
      ) : null}
      <Dialog.Button
        label={buttonTitle}
        color={foreground}
        onPress={props.onConfirm}
      />
    </Dialog.Container>
  );
}

export default withTheme(ConfirmDialog);
