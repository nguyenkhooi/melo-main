import { img } from "assets";
import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { colors } from "utils";

function SplashScreen() {
  return (
    <Wrapper>
      <StatusBar backgroundColor={colors.background} animated />
      <Logo source={img.meloLogo} />
    </Wrapper>
  );
}

export default SplashScreen;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
`;

const Logo = styled.Image`
  height: 150px;
  width: 150px;
`;
