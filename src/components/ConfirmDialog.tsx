import React from "react";
import Dialog from "react-native-dialog";
import styled, { withTheme } from "styled-components/native";
import { foreground2Color, contrastColor } from "../themes/styles";
import { PRODUCT_SANS } from "assets";
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
  const { foreground, contrast, elevatedBG } = props.theme;
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

const DialogTitle = styled(Dialog.Title)`
  margin-left: 10px;
  color: ${evaLight["color-basic-800"]};
`;

const DialogDescription = styled(Dialog.Description)`
  padding: 10px;
  color: ${evaLight["color-basic-800"]};
`;
