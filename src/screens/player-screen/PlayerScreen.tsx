import { CIRCULAR, IconPrimr } from "assets";
import { sstyled } from "components";
import { ReduxStates } from "engines";
import React from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor } from "themes";
import { dSCR, spacing, TrackProps } from "utils";
import { S_CoversCarousel } from "./s-cover-carousel";
import { S_PlaybackControl } from "./s-playback-control";
import S_ProgressSlider from "./s-progress-slider";

const PlayerWidth = Dimensions.get("window").width * 0.82;
const mapStates = (state: ReduxStates) => {
  const {
    playback: { currentTrack },
  } = state;
  return { currentTrack };
};

/**
 * Player Screen (currently a rnav modal) of the appf
 *
 * ---
 *
 * @version 0.10.13 
 * - *"default" -> "renderfied"*
 * @author nguyenkhooi
 */
export function PlayerScreen(p: dSCR_Player) {
  const Render = connect(mapStates)(
    withTheme((rx: dState & dSCR) => {
      const { theme, currentTrack } = rx;
      const { navigation } = p;
      const props = { ...p, ...rx };
      const refCarou = React.useRef<Carousel<TrackProps>>();
      const backgroundSource =
        theme.current == "light" ? null : { uri: currentTrack.artwork };
      return (
        <ImageBackground
          source={backgroundSource}
          blurRadius={40}
          style={{ width: "100%", height: "100%" }}
        >
          <CtnrGradient
            {...props}
            colors={[`${theme.bgTrans}0.35)`, `${theme.bgTrans}0.8)`]}
          >
            <$_PlayerControl>
              <CtnrNowPlaying {...props}>
                <IconPrimr
                  preset={"safe"}
                  name={"playlist"}
                  size={20}
                  color={contrastTransColor(0.75)(props)}
                  onPress={() => navigation.navigate("now-playing-scr")}
                />
                <TxtSub {...props}>Now Playing</TxtSub>
                <IconPrimr
                  preset={"safe"}
                  name={"chevron_down"}
                  size={20}
                  color={contrastTransColor(0.75)(props)}
                  onPress={() => navigation.goBack()}
                />
              </CtnrNowPlaying>

              <CtnrTxt {...props}>
                <Title {...props} numberOfLines={1}>
                  {currentTrack.title || "unknown"}
                </Title>
                <Artist {...props} numberOfLines={1}>
                  {currentTrack.artist}
                </Artist>
              </CtnrTxt>
              <$_ProgressSlider {...props} />
              <$_PlaybackControl
                {...props}
                onNext={() => refCarou.current?.snapToNext()}
                onBack={() => refCarou.current?.snapToPrev()}
              />
            </$_PlayerControl>

            <$_CoversCarousel ref={refCarou} {...props} />

            {/* <$_CoverArt artwork={currentTrack.artwork} /> */}
          </CtnrGradient>
        </ImageBackground>
      );
    })
  );
  return <Render />;
}

const $_PlaybackControl = S_PlaybackControl;

const $_ProgressSlider = S_ProgressSlider;

const $_CoversCarousel = S_CoversCarousel;

// export default connect(mapStates)(withTheme(PlayerScreen));

const CtnrGradient = sstyled(LinearGradient)({
  flex: 1,
  justifyContent: "space-between",
  // justifyContent: "flex-end",
  alignItems: "center",
});

const CtnrNowPlaying = sstyled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: PlayerWidth + 10,
  marginVertical: spacing[1],
});

const TxtSub = sstyled(Text)((p) => ({
  fontFamily: CIRCULAR,
  fontSize: 15,
  color: contrastTransColor(0.75)(p),
}));

const $_PlayerControl = sstyled(View)({
  flex: 1,
  justifyContent: "space-evenly",
});

const CtnrTxt = sstyled(View)({
  justifyContent: "center",
  alignItems: "center",
});

const Title = sstyled(Text)((p) => ({
  fontFamily: CIRCULAR,
  fontSize: 18,
  color: contrastColor(p),
  width: PlayerWidth,
  textAlign: "center",
}));

const Artist = sstyled(Text)((p) => ({
  fontFamily: CIRCULAR,
  fontSize: 15,
  marginTop: 4,
  color: contrastTransColor(0.75)(p),
  width: PlayerWidth,
  textAlign: "center",
}));

interface dState extends ReturnType<typeof mapStates> {}
export interface dSCR_Player extends dSCR, dState {}
