import React from "react";
import { Dimensions, Text } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import * as actions from "actions";
import Icon from "./Icon";
import {
  contrastColor,
  foregroundColor,
  contrastTransColor,
} from "../themes/styles";
const placeholder = require("../../assets/placeholder.jpg");
import { CIRCULAR } from "assets";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RenderTrack = React.memo(
  (props) => {
    const { item, currentTrack, setCurrentTrack, setOptions } = props;

    function onTrackPress() {
      if (item.id !== currentTrack.id) setCurrentTrack(item);
    }

    const coverSrc = item.artwork ? { uri: item.artwork } : placeholder;
    return (
      <Touchable onPress={onTrackPress} activeOpacity={0.4}>
        <Thumbnail source={coverSrc} />
        <TextWrapper>
          <Title numberOfLines={1} current={item.id === currentTrack.id}>
            {item.title}
          </Title>
          <Artist numberOfLines={1}>{item.artist}</Artist>
          {/* <Text>{JSON.stringify(Object.keys(item))}</Text> */}
        </TextWrapper>
        <StyledIcon
          {...optionsIcon}
          onPress={() => setOptions({ visible: true, item })}
        />
      </Touchable>
    );
  },
  (prevProps, nextProps) =>
    !(
      nextProps.currentTrack.id === nextProps.item.id ||
      prevProps.currentTrack.id === prevProps.item.id ||
      prevProps.item !== nextProps.item
    )
);

function mapStateToProps(state) {
  return {
    currentTrack: state.playback.currentTrack,
  };
}

export default connect(mapStateToProps, actions)(RenderTrack);

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 65px;
  margin-top: 10px;
  padding-left: 15px;
`;

const Thumbnail = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 2px;
`;

const TextWrapper = styled.View`
  flex-direction: column;
  flex: 1;
  height: 52px;
  margin-left: 15px;
  justify-content: space-evenly;
`;

const Title = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 14px;
  width: ${SCREEN_WIDTH / 2}px;
  color: ${(props) =>
    props.current ? foregroundColor(props) : contrastColor(props)};
`;

const Artist = styled.Text`
  /* font-family: 'CircularLight'; */
  font-size: 14px;
  width: ${SCREEN_WIDTH / 2}px;
  color: ${contrastTransColor(0.75)};
`;

const StyledIcon = styled(Icon)`
  color: ${contrastTransColor(0.75)};
  padding: 10px;
`;

const optionsIcon = {
  name: "ellipsis-v",
  type: "fa5",
  size: 25,
};
