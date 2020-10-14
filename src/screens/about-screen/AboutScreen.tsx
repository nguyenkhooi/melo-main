import { img, PRODUCT_SANS, PRODUCT_SANS_BOLD } from "assets";
import { sstyled } from "components";
import { repoUrl } from "constants/urls";
import { connector, dRedux } from "engines";
import React, { useEffect } from "react";
import { Linking, TouchableOpacity, Image, StatusBar } from "react-native";
import styled from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { contrastColor, contrastTransColor, foregroundColor } from "themes";
import { colors, dSCR } from "utils";
import { version } from "../../../package.json";

interface dSCR_About extends dSCR, dRedux {}
function AboutScreen(props: dSCR_About) {
  return (
    <CtnrGradient
      colors={["#0000a0", "#0000ff"]}
      start={{ x: 1.0, y: 0.25 }}
      end={{ x: 0.0, y: 1.0 }}
    >
      <StatusBar hidden={true} animated={true} />
      <Image
        source={img.meloWordmark}
        style={{ transform: [{ scale: 0.3 }] }}
      />
      <Heading>Melo</Heading>
      <DetailTrans>Version {version}</DetailTrans>
      <Heading>Developed by</Heading>
      <DetailTrans>Khoi Tran</DetailTrans>
      {/* <Detail>Source code available under MIT License at</Detail>
      <TouchableOpacity onPress={() => Linking.openURL(repoUrl)}>
        <Link>Github</Link>
      </TouchableOpacity> */}
    </CtnrGradient>
  );
}

export default connector(AboutScreen);

const CtnrGradient = sstyled(LinearGradient)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.elevatedBG,
});

//// const Wrapper = styled.View`
////   flex: 1;
////   justify-content: center;
////   align-items: center;
//// `;

const Heading = styled.Text`
  font-family: ${PRODUCT_SANS};
  font-size: 18px;
  margin-bottom: 8px;
  color: white;
`;

const DetailTrans = styled.Text`
  font-family: ${PRODUCT_SANS};
  font-size: 16px;
  margin-bottom: 40px;
  color: ${contrastTransColor(0.55)};
`;

const Link = styled.Text`
  font-family: ${PRODUCT_SANS_BOLD};
  font-size: 16px;
  margin-bottom: 40px;
  color: white;
`;

const Detail = styled.Text`
  font-family: ${PRODUCT_SANS};
  font-size: 16px;
  margin-bottom: 10px;
  color: white;
`;
