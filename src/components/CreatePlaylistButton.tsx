import React from "react";
import { TouchableNativeFeedback, Dimensions, View } from "react-native";
import styled, { withTheme } from "styled-components/native";
import { elevatedBGColor, contrastColor, foregroundColor } from "themes";
import { DEVICE_WIDTH } from "utils";
import Icon from "./Icon";
import { sstyled } from "components";
// import { contrastColor, elevatedBGColor } from '../themes/styles';

function CreatePlaylistButton(props) {
  return (
    <TouchableNativeFeedback onPress={props.onPress}>
      <Wrapperss {...props}>
        <AddIcon {...addIcon} />
        <Text>Create new playlist</Text>
      </Wrapperss>
    </TouchableNativeFeedback>
  );
}

export default withTheme(CreatePlaylistButton);

const Wrapperss = sstyled(View)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: DEVICE_WIDTH - 40,
  borderColor: "#f1f1f1",
  alignSelf: "center",
  // backgroundColor: elevatedBGColor,
  elevation: 1,
  height: 50,
});

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 20px 20px 20px;
  height: 50px;
  width: ${DEVICE_WIDTH - 40}px;
  border-radius: 4px;
  background-color: ${elevatedBGColor};
  elevation: 4;
`;

const AddIcon = styled(Icon)`
  color: ${foregroundColor};
  margin-right: 28px;
  margin-top: 1px;
`;

const Text = styled.Text`
  /* font-family: 'CircularLight'; */
  font-size: 14px;
  margin-right: 25px;
  color: ${foregroundColor};
`;

const addIcon = {
  name: "plus",
  type: "fa5",
  size: 19,
};
