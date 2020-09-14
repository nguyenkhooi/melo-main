import React from "react";
import { StatusBar } from "react-native";
import styled from "styled-components/native";
import { colors, evaLight } from "utils";

function SplashScreen() {
  return (
    <Wrapper>
      <StatusBar backgroundColor={colors.foreground} animated />
      <Logo source={require("../../assets/logo.png")} />
    </Wrapper>
  );
}

export default SplashScreen;

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #5e17eb;
`;

const Logo = styled.Image`
  height: 150px;
  width: 150px;
`;
