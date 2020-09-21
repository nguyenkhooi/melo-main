import * as actions from "actions";
import React from "react";
import { Dimensions, TouchableWithoutFeedback, View } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import {
  contrastColor,
  contrastTransColor,
  foregroundColor,
} from "../themes/styles";
import { getRandomNumber, scale } from "../utils";
import Icon from "./Icon";
import { sstyled } from "./StyledComponents";

const WrapperWidth = Dimensions.get("window").width * 0.82;

function PlaybackControl(props) {
  const { media, currentTrack, isPlaying, loop, shuffle, currentList } = props;

  function skipForward() {
    let nextTrack = shuffle
      ? currentList[getRandomNumber(0, currentList.length)]
      : currentTrack.index === currentList.length - 1
      ? currentList[0]
      : currentList[currentTrack.index + 1];
    props.setCurrentTrack(nextTrack);
  }

  function skipBackward() {
    let nextTrack = shuffle
      ? currentList[getRandomNumber(0, currentList.length)]
      : currentTrack.index === 0
      ? currentList[currentList.length - 1]
      : currentList[currentTrack.index - 1];
    props.setCurrentTrack(nextTrack);
  }
  // function skipForward() {
  //   let nextTrack = shuffle
  //     ? media[getRandomNumber(0, media.length)]
  //     : currentTrack.index === media.length - 1
  //     ? media[0]
  //     : media[currentTrack.index + 1];
  //   props.setCurrentTrack(nextTrack);
  // }

  // function skipBackward() {
  //   let nextTrack = shuffle
  //     ? media[getRandomNumber(0, media.length)]
  //     : currentTrack.index === 0
  //     ? media[media.length - 1]
  //     : media[currentTrack.index - 1];
  //   props.setCurrentTrack(nextTrack);
  // }

  function onShufflePress() {
    props.setShuffle(!shuffle);
  }

  function onLoopPress() {
    props.setLoop(!loop);
  }

  return (
    <MainCTNR>
      <TouchableWithoutFeedback onPress={onShufflePress}>
        <IconCTNR>
          {shuffle ? (
            <TransIcon {...icons.shuffle} />
          ) : (
            <DisabledIcon {...icons.shuffle} />
          )}
        </IconCTNR>
      </TouchableWithoutFeedback>
      <StyledIcon {...icons.skipBackward} onPress={skipBackward} />
      <TouchableWithoutFeedback onPress={() => props.setPlayback(!isPlaying)}>
        <PlayCTNR>
          {isPlaying ? (
            <StyledIcon {...icons.pause} />
          ) : (
            <StyledIcon {...icons.play} />
          )}
        </PlayCTNR>
      </TouchableWithoutFeedback>
      <StyledIcon {...icons.skipForward} onPress={skipForward} />
      <TouchableWithoutFeedback onPress={onLoopPress}>
        <IconCTNR>
          {loop ? (
            <TransIcon {...icons.loopOne} />
          ) : (
            <TransIcon {...icons.loop} />
          )}
        </IconCTNR>
      </TouchableWithoutFeedback>
    </MainCTNR>
  );
}

function mapStateToProps(state) {
  return {
    media: state.media.mediaFiles,
    currentList: state.playback.currentList,
    currentTrack: state.playback.currentTrack,
    isPlaying: state.player.isPlaying,
    loop: state.playback.loop,
    shuffle: state.playback.shuffle,
  };
}

export default connect(mapStateToProps, actions)(PlaybackControl);

const MainCTNR = sstyled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: WrapperWidth + 10,
});
const PlayCTNR = sstyled(View)({
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 30,
  borderColor: "white",
});

const StyledIcon = styled(Icon)`
  color: ${contrastColor};
  padding: 5px;
`;

const TransIcon = styled(Icon)`
  color: ${foregroundColor};
`;

const DisabledIcon = styled(Icon)`
  color: ${contrastTransColor(0.35)};
`;

const IconCTNR = sstyled(View)({
  height: scale(28),
  width: scale(28),
  borderRadius: scale(14),
  justifyContent: "center",
  alignItems: "center",
});

const icons = {
  play: {
    name: "play-arrow",
    type: "material",
    size: scale(32),
  },
  pause: {
    name: "pause",
    type: "material",
    size: scale(32),
  },
  skipForward: {
    name: "forward",
    type: "fa5",
    size: scale(20),
  },
  skipBackward: {
    name: "backward",
    type: "fa5",
    size: scale(20),
  },
  loop: {
    name: "repeat",
    type: "material",
    size: scale(22),
  },
  loopOne: {
    name: "repeat-one",
    type: "material",
    size: scale(22),
  },
  shuffle: {
    name: "shuffle",
    type: "material",
    size: scale(20),
  },
};
