import { actions } from "engines";
import React, { useEffect, useState } from "react";
import Dialog from "react-native-dialog";
import { connect } from "react-redux";
import styled, { withTheme } from "styled-components/native";
import { foregroundColor } from "themes";
import { evaLight, IS_ANDROID } from "utils";

function InputDialog(props) {
  const {
    isVisible,
    name,
    inputPlaceholder,
    saveButtonTitle,
    title,
    description,
    theme,
  } = props;
  const [input, setInput] = useState("");

  useEffect(() => {
    if (isVisible && name) setInput(name);
    return () => setInput("");
  }, [isVisible]);

  function onSave() {
    props.onPressSave(input.trim());
  }

  function onCancel() {
    props.onPressCancel();
  }

  const { contrast, foreground } = theme;

  return (
    <Dialog.Container
      visible={isVisible}
      backdropColor="black"
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      contentStyle={{ backgroundColor: evaLight["color-basic-300"] }}
    >
      <Dialog.Title
        style={{ color: evaLight["color-basic-800"], fontWeight: "600" }}
      >
        {title}
      </Dialog.Title>
      {description && (
        <Dialog.Description style={{ color: evaLight["color-basic-800"] }}>
          {description}
        </Dialog.Description>
      )}

      {/* <DialogTitle>{title}</DialogTitle>
      {description ? (
        <DialogDescription>{description}</DialogDescription>
      ) : null} */}
      <DialogInput
        placeholder={inputPlaceholder}
        placeholderTextColor={evaLight["color-basic-600"]}
        autoCorrect={false}
        onChangeText={(val) => setInput(val)}
        selectionColor={foreground}
        value={input}
        autoFocus
      />
      <Dialog.Button
        label="Cancel"
        color={evaLight["color-basic-600"]}
        onPress={onCancel}
      />
      <Dialog.Button
        label={saveButtonTitle}
        color={foreground}
        onPress={onSave}
      />
    </Dialog.Container>
  );
}

export default connect(null, actions)(withTheme(InputDialog));

const DialogInput = styled(Dialog.Input)`
  color: ${evaLight["color-basic-800"]};
  border-bottom-color: ${IS_ANDROID ? foregroundColor : "transparent"};
  border-bottom-width: 1px;
`;
