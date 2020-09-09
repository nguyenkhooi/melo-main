import React, { useEffect } from "react";
import { TouchableOpacity, Linking } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import * as actions from "actions";
import { repoUrl } from "constants/urls";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { PRODUCT_SANS, PRODUCT_SANS_BOLD, PRODUCT_SANS_LIGHT } from "assets";

function AboutScreen(props) {
  useEffect(() => {
    let unsubscribe = props.navigation.addListener("focus", props.hideFooter);
    return unsubscribe;
  }, [props.navigation]);

  return (
    <Wrapper>
      <Heading>Sóng Nhạc</Heading>
      <DetailTrans>Version 3.1.4.20</DetailTrans>
      <Heading>Developed by</Heading>
      <DetailTrans>Khoi Tran</DetailTrans>
      <Detail>Source code available under MIT License at</Detail>
      <TouchableOpacity onPress={() => Linking.openURL(repoUrl)}>
        <Link>Github</Link>
      </TouchableOpacity>
    </Wrapper>
  );
}

export default connect(null, actions)(AboutScreen);

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.Text`
  font-family: ${PRODUCT_SANS};
  font-size: 18px;
  margin-bottom: 8px;
  color: ${contrastColor};
`;

const DetailTrans = styled.Text`
  font-family: ${PRODUCT_SANS};
  font-size: 16px;
  margin-bottom: 40px;
  color: ${contrastTransColor(0.75)};
`;

const Link = styled.Text`
  font-family: ${PRODUCT_SANS_BOLD};
  font-size: 16px;
  margin-bottom: 40px;
  color: ${foregroundColor};
`;

const Detail = styled.Text`
  font-family: ${PRODUCT_SANS};
  font-size: 16px;
  margin-bottom: 10px;
  color: ${contrastColor};
`;
