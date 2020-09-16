import { img } from "assets";
import React from "react";
import { Image, StatusBar } from "react-native";
import styled from "styled-components/native";
import { colors } from "utils";

function SplashScreen() {
  return (
    <Wrapper>
      <StatusBar backgroundColor={colors.elevatedBG} animated />
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

export default SplashScreen;

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
