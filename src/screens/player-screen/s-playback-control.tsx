import { dIconPrimr, IconPrimr } from "assets";
import { sstyled } from "components";
import { connector, dRedux } from "engines";
import React from "react";
import { View } from "react-native";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { DEVICE_WIDTH, scale } from "utils";

interface dPlaybackControl extends dRedux {}
function S_PlaybackControl(props: dPlaybackControl) {
  const {
    media: { mediaFiles },
    playback: { currentTrack, loop, shuffle },
    player: { isPlaying },
    sethPlayback,
    setShuffle,
    setLoop,
    onNext,
    onBack,
  } = props;
  let currentTrackList = mediaFiles;

  return (
    <CtnrMain {...props}>
      <ActionIcon
        {...props}
        type="sub"
        name="shuffle"
        onPress={() => setShuffle(!shuffle)}
        color={
          shuffle ? foregroundColor(props) : contrastTransColor(0.35)(props)
        }
      />
      <ActionIcon
        {...props}
        type="main"
        name="backward"
        onPress={() => {
          onBack();
          sethPlayback({
            type: "bwd",
            currentTrack,
            currentTrackList,
            isShuffle: shuffle,
          });
        }}
      />
      <ActionIcon
        {...props}
        type="main"
        name={isPlaying ? "pause" : "play"}
        onPress={() =>
          sethPlayback({
            type: isPlaying ? "pause" : "play",
          })
        }
      />
      <ActionIcon
        {...props}
        type="main"
        name="forward"
        onPress={() => {
          onNext();
          sethPlayback({
            type: "fwd",
            currentTrack,
            currentTrackList,
            isShuffle: shuffle,
          });
        }}
      />
      <ActionIcon
        {...props}
        type="sub"
        name={loop ? "loop_one" : "loop"}
        onPress={() => setLoop(!loop)}
        color={foregroundColor(props)}
      />
    </CtnrMain>
  );
}

export default connector(S_PlaybackControl);

const CtnrMain = sstyled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: DEVICE_WIDTH * 0.82 + 10,
});

interface dActionIcon extends dIconPrimr {
  type: "main" | "sub";
}
const ActionIcon = (props: dActionIcon) => (
  <IconPrimr
    preset={"default"}
    size={props.type == "main" ? 20 : 18}
    color={contrastColor(props)}
    containerStyle={{
      height: scale(28),
      width: scale(28),
      borderRadius: scale(14),
      justifyContent: "center",
      alignItems: "center",
    }}
    {...props}
  />
);
