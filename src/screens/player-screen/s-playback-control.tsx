import { dIconPrimr, IconPrimr } from "assets";
import { sstyled } from "components";
import { connector, dRedux } from "engines";
import React from "react";
import { View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { usePlaybackState } from "react-native-track-player/lib/hooks";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { DEVICE_WIDTH, scale } from "utils";

interface dPlaybackControl extends dRedux {}
function S_PlaybackControl(props: dPlaybackControl) {
  const {
    media: { nowPlayingIDs },
    playback: { loop, shuffle },
    sethPlayback,
    setShuffle,
    setLoop,
    onNext,
    onBack,
  } = props;

  const playbackState = usePlaybackState();

  return (
    <CtnrMain {...props}>
      <ActionIcon
        {...props}
        type="sub"
        name="shuffle"
        onPress={() => setShuffle(!shuffle, nowPlayingIDs)}
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
          sethPlayback({ type: "bwd" });
        }}
      />
      <ActionIcon
        {...props}
        type="main"
        name={playbackState === TrackPlayer.STATE_PLAYING ? "pause" : "play"}
        onPress={() =>
          sethPlayback({
            type:
              playbackState === TrackPlayer.STATE_PLAYING ? "pause" : "play",
          })
        }
      />
      <ActionIcon
        {...props}
        type="main"
        name="forward"
        onPress={() => {
          onNext();
          sethPlayback({ type: "fwd" });
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
const ActionIcon = (props: dActionIcon) => {
  const [_isDisabled, shouldDisabled] = React.useState(false);
  return (
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
      disabled={_isDisabled}
      {...props}
      onPress={async () => {
        shouldDisabled(true);
        await props.onPress();
        shouldDisabled(false);
      }}
    />
  );
};
