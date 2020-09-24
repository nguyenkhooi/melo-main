import { CIRCULAR } from "assets";
import RenderActivityIndicator from "components/RenderActivityIndicator";
import { connector, dRedux } from "engines";
import React, { useEffect } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { contrastColor, contrastTransColor } from "themes";
import { dSCR } from "utils";


const ScreenWidth = Dimensions.get("window").width;

interface dSCR_Lyrics extends dSCR, dRedux {}
function LyricsScreen(props: dSCR_Lyrics) {
  const {
    navigation,
    lyrics: { currentLyrics, error },
    playback: { currentTrack },
    fetchLyrics,
  } = props;
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", onFocus);
    return unsubscribe;
  }, [navigation]);

  function onFocus() {
    if (!currentLyrics) {
      const { title, artist } = currentTrack;
      fetchLyrics({ title, artist });
    }
  }

  function renderLyrics() {
    let { title, artist, lyrics } = currentLyrics;
    return lyrics ? (
      <ScrollView>
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
        <Lyrics>{lyrics}</Lyrics>
      </ScrollView>
    ) : (
      <RenderActivityIndicator text="fetching lyrics" />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {error ? (
        <ErrorWrapper>
          <ErrorText>{"Oops! No lyrics were found!"}</ErrorText>
        </ErrorWrapper>
      ) : (
        renderLyrics()
      )}
    </View>
  );
}

export default connector(LyricsScreen);

const Title = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 20px;
  width: ${ScreenWidth}px;
  margin-top: 22px;
  margin-bottom: 6px;
  text-align: center;
  color: ${contrastColor};
`;

const Artist = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 18px;
  width: ${ScreenWidth}px;
  margin-bottom: 28px;
  text-align: center;
  color: ${contrastTransColor(0.75)};
`;

const Lyrics = styled.Text`
  /* font-family: 'CircularLight'; */
  font-size: 17px;
  margin: 0 20px 50px 20px;
  line-height: 24px;
  color: ${contrastColor};
`;

const ErrorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 16px;
  color: ${contrastColor};
`;
