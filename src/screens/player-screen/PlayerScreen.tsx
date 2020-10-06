import { CIRCULAR, IconPrimr } from "assets";
import { sstyled } from "components";
import { connector, dRedux } from "engines";
import React, { useEffect } from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Modalize } from "react-native-modalize";
import Carousel from "react-native-snap-carousel";
import { withTheme } from "styled-components/native";
import { contrastColor, contrastTransColor } from "themes";
import { dSCR, spacing, TrackProps } from "utils";
import { S_CoversCarousel } from "./s-cover-carousel";
import S_PlaybackControl from "./s-playback-control";
import S_ProgressSlider from "./s-progress-slider";

const PlayerWidth = Dimensions.get("window").width * 0.82;

export interface dSCR_Player extends dSCR, dRedux {}
function PlayerScreen(props: dSCR_Player) {
  const {
    theme,
    navigation,
    //* redux state
    playback: { currentTrack },
  } = props;

  const refCarou = React.useRef<Carousel<TrackProps>>();
  return (
    <ImageBackground
      source={{ uri: theme.current == "light" ? null : currentTrack.artwork }}
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

        <S_CoversCarousel ref={refCarou} {...props} />

        {/* <$_CoverArt artwork={currentTrack.artwork} /> */}
      </CtnrGradient>
    </ImageBackground>
  );
}

const $_PlaybackControl = S_PlaybackControl;

const $_ProgressSlider = S_ProgressSlider;

export default connector(withTheme(PlayerScreen));

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

// const Wrapper = styled.View`
//   flex: 1;
//   justify-content: space-evenly;
//   align-items: center;
// `;

// const TextWrapper = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

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

// const Title = styled.Text`
//   font-family: ${CIRCULAR};
//   font-size: 18px;
//   color: ${contrastColor};
//   width: ${PlayerWidth}px;
//   text-align: center;
// `;

// const Artist = styled.Text`
//   font-family: ${CIRCULAR};
//   font-size: 15px;
//   margin-top: 4px;
//   color: ${contrastTransColor(0.75)};
//   width: ${PlayerWidth}px;
//   text-align: center;
// `;
