import { CIRCULAR } from "assets";
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

const TitleCTNR = (props) => (
  <View
    style={{
      alignItems: "flex-start",
      paddingLeft: scale(15),
    }}
  >
    {props.children}
  </View>
);

// const TitleCTNR = sstyled(View)({
//   alignItems: "flex-start",
//   paddingLeft: scale(15),
// });

const Title = styled.Text`
  font-family: ${CIRCULAR};
  font-weight: bold;
  font-size: 30px;
  color: ${contrastColor};
`;
