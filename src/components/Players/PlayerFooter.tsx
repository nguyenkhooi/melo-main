import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { DEVICE_WIDTH, dSCR, getBottomSpace, scale, spacing } from "utils";
import {
  CIRCULAR_BOLD,
  CIRCULAR_LIGHT,
  dIconPrimr,
  IconPrimr,
  img,
} from "assets";
import { connector, dRedux } from "engines";
import { navigate } from "navigation";

import { useTrackPlayerProgress } from "react-native-track-player/lib/hooks";
import styled, { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor, elevatedBGColor } from "themes";
import ProgressBar from "../ProgressBar";
import { sstyled, Txt } from "../Generals";

interface P {}

/**
 * One of the most animated-complex components of the whole project,
 *
 * SS_PlayerFooter<> is a footer with playback control. It has an ability to:
 * -  Show/hide based on specific screen, with fadeInUp/fadeOutDown animation
 * -  Play/Pause, Forward button
 *
 * !-  Swipe horizontally to skip/return track
 *
 * !-  Swipe vertically to open SS_PlayerScreen
 *
 * @version 0.10.8
 */
class SS_PlayerFooter extends React.Component<P> {
  ref$$ = React.createRef<Modalize>();
  static _ref = null;

  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }

  /**
   * Show the PlayerFooter
   */
  static open() {
    this._ref.open();
  }

  /**
   * Hide the PlayerFooter
   */
  static close() {
    this._ref.close();
  }

  open() {
    this.ref$$.current.open();
  }

  close() {
    this.ref$$.current.close();
  }

  jumpToPlayerScr() {
    this.ref$$.current.close();
    navigate("player-scr");
  }

  render() {
    return (
      <Modalize
        ref={this.ref$$}
        snapPoint={getBottomSpace("safe") + scale(40) + scale(40)}
        modalHeight={getBottomSpace("safe") + scale(40) + scale(150)}
        modalStyle={{
          backgroundColor: "transparent",
          padding: spacing[3],
          elevation: 0,
        }}
        withOverlay={false}
        overlayStyle={{ backgroundColor: "transparent" }}
        //   alwaysOpen={-DEVICE_HEIGHT + 200}
        // snapPoint={HEADER_HEIGHT}
        withHandle={false}
        onPositionChange={(position) => {
          if (position == "top") {
            this.jumpToPlayerScr();
          }
        }}
        // onClosed={() => navigate("player-scr")}
      >
        <$_PlayerFooter
          {...this.props}
          jumpToPlayerScr={() => this.jumpToPlayerScr()}
        />
      </Modalize>
    );
  }
}

interface dCOMP_PlayerFooter extends dSCR, dRedux {
  jumpToPlayerScr(): void;
}

const $_PlayerFooter = connector(
  withTheme((props: dCOMP_PlayerFooter) => {
    const {
      playback: { currentTrack },
      theme,
      jumpToPlayerScr,
    } = props;
    const { position, duration } = useTrackPlayerProgress(100);

    const progress = position / duration;
    const coverSrc = currentTrack.artwork
      ? { uri: currentTrack.artwork }
      : img.placeholder;

    return (
      /** NOTE replace with animation. See _toggleFooter() */
      // footerVisible &&
      currentTrack.id !== "000" && (
        <View {...props}>
          <CtnrFooterContent {...props}>
            <Thumbnail source={coverSrc} onPress={jumpToPlayerScr} />
            <CtnrTrackInfo>
              <Title {...props} numberOfLines={1}>
                {currentTrack.title || "unknown"}
              </Title>
              <Artist {...props} numberOfLines={1}>
                {currentTrack.artist || "unknown"}
              </Artist>
            </CtnrTrackInfo>
            <$_FooterActions {...props} />
          </CtnrFooterContent>
          <ProgressWrapper>
            <Progress
              // {...props}
              progress={isNaN(progress) ? 0 : +progress.toFixed(3)}
              color={theme.foreground}
            />
          </ProgressWrapper>
        </View>
      )
    );
  })
);

const $_FooterActions = (props: dRedux) => {
  const {
    player: { isPlaying },
    sethPlayback,
  } = props;
  return (
    <View
      style={{
        position: "absolute",
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {isPlaying ? (
        <ActionIcon
          {...props}
          name="pause"
          onPress={() => sethPlayback({ type: "pause" })}
        />
      ) : (
        <ActionIcon
          {...props}
          name="play"
          onPress={() => {
            sethPlayback({ type: "play" });
          }}
        />
      )}
      <ActionIcon
        {...props}
        name="forward"
        onPress={() => sethPlayback({ type: "fwd" })}
      />
      {/* <ActionIcon
      {...props}
      name="backward"
      
      onPress={() => sethPlayback({ type: "bwd" })}
    />
    <ActionIcon
      {...props}
      name="shuffle"
      color={shuffle ? "dodgerblue" : "grey"}
      
      onPress={() => setShuffle(!shuffle, nowPlayingTracks)}
    /> */}
    </View>
  );
};
interface dActionIcon extends dIconPrimr {}
const ActionIcon = (props: dActionIcon) => (
  <IconPrimr
    preset={"default"}
    size={scale(18)}
    color={contrastColor(props)}
    containerStyle={{ padding: spacing[3] }}
    {...props}
  />
);

const Thumbnail = (props) => {
  const { onPress, source } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={source}
        style={{
          height: 42,
          width: 42,
          borderRadius: 21,
          marginLeft: 15,
          backgroundColor: "#CCCCFF",
        }}
      />
    </TouchableOpacity>
  );
};

const CtnrFooterContent = sstyled(View)((p) => ({
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: spacing[2],
  borderRadius: scale(5),
  backgroundColor: elevatedBGColor(p),
}));

const CtnrTrackInfo = sstyled(View)({
  height: "75%",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-evenly",
  marginLeft: 15,
});

const Title = sstyled(Txt.P2)((p) => ({
  fontFamily: CIRCULAR_BOLD,
  color: contrastColor(p),
  width: DEVICE_WIDTH / 2,
}));
const Artist = sstyled(Txt.C1)((p) => ({
  fontFamily: CIRCULAR_LIGHT,
  color: contrastColor(p),
  width: DEVICE_WIDTH / 2,
  paddingTop: spacing[1],
}));

const ProgressWrapper = sstyled(View)({ position: "absolute", top: 0 });

const Progress = styled(ProgressBar)`
  height: 2px;
  width: ${DEVICE_WIDTH}px;
  background-color: ${contrastTransColor(0.1)};
`;

export default SS_PlayerFooter;
