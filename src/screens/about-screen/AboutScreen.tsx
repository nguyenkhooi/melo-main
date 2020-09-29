import { PRODUCT_SANS, PRODUCT_SANS_BOLD } from "assets";
import { repoUrl } from "constants/urls";
import { connector, dRedux } from "engines";
import React, { useEffect } from "react";
import { Linking, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { dSCR } from "utils";
import { version } from "../../../package.json";

interface dSCR_About extends dSCR, dRedux {}
function AboutScreen(props: dSCR_About) {
  const { navigation, hideFooter } = props;
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", hideFooter);
    return unsubscribe;
  }, [navigation]);

  return (
    <Wrapper>
      <Heading>Melo</Heading>
      <DetailTrans>Version {version}</DetailTrans>
      <Heading>Developed by</Heading>
      <DetailTrans>Khoi Tran</DetailTrans>
      <Detail>Source code available under MIT License at</Detail>
      <TouchableOpacity onPress={() => Linking.openURL(repoUrl)}>
        <Link>Github</Link>
      </TouchableOpacity>
    </Wrapper>
  );
}

export default connector(AboutScreen);

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