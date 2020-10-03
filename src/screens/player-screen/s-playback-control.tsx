import { IconPrimr } from "assets";
import { Icon } from "components";
import { connector, dRedux } from "engines";
import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { C, getRandomNumber, scale } from "utils";
// import Icon from "./Icon";

const WrapperWidth = Dimensions.get("window").width * 0.82;

interface dPlaybackControl extends dRedux {}
function S_PlaybackControl(props: dPlaybackControl) {
  const {
    media: { mediaFiles },
    playback: { currentTrack, loop, shuffle },
    player: { isPlaying },
    setCurrentTrack,
    setShuffle,
    setLoop,
    setPlayback,
  } = props;
  let currentTrackList = mediaFiles;
  function skipForward() {
    let nextTrack = shuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrack.index === currentTrackList.length - 1
      ? currentTrackList[0]
      : currentTrackList[currentTrack.index + 1];
    setCurrentTrack(nextTrack);
  }

  function skipBackward() {
    let nextTrack = shuffle
      ? currentTrackList[getRandomNumber(0, currentTrackList.length)]
      : currentTrack.index === 0
      ? currentTrackList[currentTrackList.length - 1]
      : currentTrackList[currentTrack.index - 1];
    setCurrentTrack(nextTrack);
  }
  // function skipForward() {
  //   let nextTrack = shuffle
  //     ? media[getRandomNumber(0, media.length)]
  //     : currentTrack.index === media.length - 1
  //     ? media[0]
  //     : media[currentTrack.index + 1];
  //   setCurrentTrack(nextTrack);
  // }

  // function skipBackward() {
  //   let nextTrack = shuffle
  //     ? media[getRandomNumber(0, media.length)]
  //     : currentTrack.index === 0
  //     ? media[media.length - 1]
  //     : media[currentTrack.index - 1];
  //   setCurrentTrack(nextTrack);
  // }

  function onShufflePress() {
    setShuffle(!shuffle);
  }

  function onLoopPress() {
    setLoop(!loop);
  }

  const PlaybackIcon = (name: string, props: PROPS_Accessory) => (
    <IconPrimr name={name} size={props.style.width} color={C.text01} />
  );

  return (
    <MainCTNR>
      <TouchableOpacity onPress={onShufflePress}>
        <IconCTNR>
          {shuffle ? (
            <TransIcon {...icons.shuffle} />
          ) : (
            <DisabledIcon {...icons.shuffle} />
          )}
        </IconCTNR>
      </TouchableOpacity>
      <StyledIcon {...icons.skipBackward} onPress={skipBackward} />
      <TouchableOpacity onPress={() => setPlayback(!isPlaying)}>
        <PlayCTNR>
          {isPlaying ? (
            <StyledIcon {...icons.pause} />
          ) : (
            <StyledIcon {...icons.play} />
          )}
        </PlayCTNR>
      </TouchableOpacity>
      <StyledIcon {...icons.skipForward} onPress={skipForward} />
      <TouchableOpacity onPress={onLoopPress}>
        <IconCTNR>
          {loop ? (
            <TransIcon {...icons.loopOne} />
          ) : (
            <TransIcon {...icons.loop} />
          )}
        </IconCTNR>
      </TouchableOpacity>
    </MainCTNR>
  );
}

export default connector(S_PlaybackControl);

const MainCTNR = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: WrapperWidth + 10,
    }}
  >
    {props.children}
  </View>
);

const PlayCTNR = (props) => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      borderColor: "white",
    }}
  >
    {props.children}
  </View>
);

const IconCTNR = (props) => (
  <View
    style={{
      height: scale(28),
      width: scale(28),
      borderRadius: scale(14),
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {props.children}
  </View>
);

// const MainCTNR = sstyled(View)({
//   flexDirection: "row",
//   justifyContent: "space-between",
//   alignItems: "center",
//   width: WrapperWidth + 10,
// });
// const PlayCTNR = sstyled(View)({
//   justifyContent: "center",
//   alignItems: "center",
//   borderRadius: 30,
//   borderColor: "white",
// });

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

// const IconCTNR = sstyled(View)({
//   height: scale(28),
//   width: scale(28),
//   borderRadius: scale(14),
//   justifyContent: "center",
//   alignItems: "center",
// });

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
    name: "random",
    type: "fa5",
    size: scale(20),
  },
};