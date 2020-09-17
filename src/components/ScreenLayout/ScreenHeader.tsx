import { CIRCULAR } from "assets";
import { styledd } from "components";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { contrastColor } from "themes/styles";
import { scale } from "utils";

export function ScreenTitle(props) {
  const { title = "Search" } = props;
  return (
    <TitleCTNR>
      <Title>{title}</Title>
    </TitleCTNR>
  );
}

const TitleCTNR = styledd(View)({
  alignItems: "flex-start",
  paddingLeft: scale(15),
});

const Title = styled.Text`
  font-family: ${CIRCULAR};
  font-weight: bold;
  font-size: 30px;
  color: ${contrastColor};
`;
