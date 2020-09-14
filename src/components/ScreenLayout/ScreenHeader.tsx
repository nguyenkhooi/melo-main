import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { contrastColor } from "themes/styles";
import { CIRCULAR } from "assets";

import { styledd } from "components";
import { scale } from "utils";

export function ScreenTitle(props) {
  const { title = "Search" } = props;
  return (
    <TitleWrapper>
      <Title>{title}</Title>
    </TitleWrapper>
  );
}

const TitleWrapper = styledd(View)({
  alignItems: "flex-start",
  paddingLeft: scale(15),
});

const Title = styled.Text`
  font-family: ${CIRCULAR};
  font-weight: bold;
  font-size: 26px;
  color: ${contrastColor};
`;
