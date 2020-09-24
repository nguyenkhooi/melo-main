import { CIRCULAR } from "assets";
import { CoverArt, PlaybackControl } from "components";
import Icon from "components/Icon";
import OptionsMenu from "components/OptionsMenu";
import ProgressSlider from "components/ProgressSlider";
import { connector, dRedux } from "engines";
import React, { useEffect } from "react";
import { Dimensions, ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";
import styled, { withTheme } from "styled-components/native";
import {
  backgroundColor,
  bgTransColor,
  contrastColor,
  contrastTransColor
} from "themes";
import { DEVICE_WIDTH, dSCR } from "utils";

const PlayerWidth = Dimensions.get("window").width * 0.82;

interface dSCR_Player extends dSCR, dRedux {}
function PlayerScreen(props: dSCR_Player) {
  const {
    theme,
    navigation,
    //* redux state
    playback: { currentTrack },
    hideFooter,
  } = props;

  // const { navigation, currentTrack, theme } = props;
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", hideFooter);
    return unsubscribe;
  }, [navigation]);

  return (
    <ImageBackground
      source={{ uri: theme.current == "light" ? "" : currentTrack.artwork }}
      blurRadius={40}
      style={{ width: "100%", height: "100%" }}
    >
      <Gradient colors={[`${theme.bgTrans}0.35)`, `${theme.bgTrans}0.8)`]}>
        <Header>
          <StyledIcon {...icons.collapse} onPress={navigation.goBack} />
          <HeaderText>Now Playing</HeaderText>
          <OptionsMenu
            target={<StyledIcon {...icons.options} />}
            currentItem={currentTrack}
          />
        </Header>
        {/* <$_TracksCarousel {...props} /> */}
        <Wrapper>
          {/* <Carousel
            ref={(c) => {
              // this._carousel = c;
            }}
            data={currentList}
            renderItem={() => }
            sliderWidth={DEVICE_WIDTH}
            itemWidth={DEVICE_WIDTH * 0.8}
          /> */}
          <CoverArt src={currentTrack.artwork} />
          <TextWrapper>
            <Title numberOfLines={1}>{currentTrack.title || "unknown"}</Title>
            <Artist numberOfLines={1}>{currentTrack.artist}</Artist>
          </TextWrapper>
          <ProgressSlider />
          <PlaybackControl />
        </Wrapper>
      </Gradient>
    </ImageBackground>
  );
}

interface d$_TrackCarousel extends dSCR_Player {}
const $_TracksCarousel = (props: d$_TrackCarousel) => {
  const {
    media: { mediaFiles },
    playback: { currentList, currentTrack },
  } = props;
  return (
    <Wrapper>
      <Carousel
        ref={(c) => {
          // this._carousel = c;
        }}
        data={currentList}
        renderItem={() => <CoverArt src={currentTrack.artwork} />}
        sliderWidth={DEVICE_WIDTH}
        itemWidth={DEVICE_WIDTH * 0.8}
      />
      <TextWrapper>
        <Title numberOfLines={1}>{currentTrack.title || "unknown"}</Title>
        <Artist numberOfLines={1}>{currentTrack.artist}</Artist>
      </TextWrapper>
    </Wrapper>
  );
};

export default connector(withTheme(PlayerScreen));

const Gradient = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
  /* background-color: ${bgTransColor(0.15)}; */
`;

const Background = styled.ImageBackground`
  flex: 1;
  background-color: ${backgroundColor};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${PlayerWidth + 10}px;
  margin-top: 10px;
`;

const HeaderText = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 15px;
  color: ${contrastTransColor(0.75)};
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

const TextWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 18px;
  color: ${contrastColor};
  width: ${PlayerWidth}px;
  text-align: center;
`;

const Artist = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 15px;
  margin-top: 4px;
  color: ${contrastTransColor(0.75)};
  width: ${PlayerWidth}px;
  text-align: center;
`;

const StyledIcon = styled(Icon)`
  color: ${contrastTransColor(0.75)};
  padding: 5px;
`;

const icons = {
  collapse: {
    name: "chevron-down",
    type: "feather",
    size: 26,
  },
  options: {
    name: "more-horizontal",
    type: "feather",
    size: 26,
  },
};
