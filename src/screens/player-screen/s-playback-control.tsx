import { dIconPrimr, IconPrimr } from "assets";
import { sstyled } from "components";
import {
  connector,
  dRedux,
  ReduxActions,
  ReduxStates,
  sethPlayback,
  setShuffle,
  setLoop,
} from "engines";
import React from "react";
import { View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { usePlaybackState } from "react-native-track-player/lib/hooks";
import { connect } from "react-redux";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { DEVICE_WIDTH, scale } from "utils";
import { dSCR_Player } from "./PlayerScreen";

const mapStates = (state: ReduxStates) => {
  const {
    media: { nowPlayingTracks, indexedTracks },
    playback: { loop, shuffle },
  } = state;
  return { indexedTracks, loop, shuffle };
};

const mapDispatch = {
  sethPlayback,
  setShuffle,
  setLoop,
} as ReduxActions;

/**
 * Section Playback Control of `player-scr`
 *
 * ---
 *
 * @version 0.10.13 *("default" -> "renderfied")*
 * @author nguyenkhooi
 */
export function S_PlaybackControl(p: dPlaybackControl) {
  const Render = connect(
    mapStates,
    mapDispatch
  )((rx: dState & dActions) => {
    const {
      indexedTracks,
      loop,
      shuffle,
      sethPlayback,
      setShuffle,
      setLoop,
    } = rx;

    const { onNext, onBack } = p;
    const props = { ...p, ...rx };

    const playbackState = usePlaybackState();

    return (
      <CtnrMain {...props}>
        <ActionIcon
          {...props}
          type="sub"
          name="shuffle"
          onPress={() => setShuffle(!shuffle, indexedTracks)}
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
  });

  return <Render />;
}

// export default connect(mapStates, mapDispatch)(S_PlaybackControl);

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

interface dState extends ReturnType<typeof mapStates> {}
interface dActions extends Partial<typeof mapDispatch> {}
interface dPlaybackControl extends dSCR_Player, dState, dActions {
  onNext(): void;
  onBack(): void;
}
