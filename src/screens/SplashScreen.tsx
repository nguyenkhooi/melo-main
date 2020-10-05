//@ts-check
import { img } from "assets";
import { connector, dRedux } from "engines";
import React from "react";
import { Image, StatusBar } from "react-native";
import styled from "styled-components/native";
import { C, colors, dSCR } from "utils";

interface dSCR_Splash extends dSCR, dRedux {}
function SplashScreen(props: dSCR_Splash) {
  const { getMedia } = props;
  const [_isMediaLoaded, shouldMediaLoaded] = React.useState(false);
  React.useEffect(function fetchMedia() {
    getMedia();
    // isMediaReady(true);
  }, []);
  return (
    <Wrapper>
      <StatusBar backgroundColor={C.surface} animated />
      <Image
        source={img.meloLogo}
        resizeMode="center"
        style={{ width: 90, height: 90 }}
        // width={150}
        // height={150}
      />
    </Wrapper>
  );
}

export default connector(SplashScreen);

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.elevatedBG};
`;

const Logo = styled.Image`
  height: 150px;
  width: 150px;
`;
