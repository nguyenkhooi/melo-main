//@ts-check
import { img } from "assets";
import { sstyled } from "components";
import { connector, dRedux, getMedia } from "engines";
import React from "react";
import { Image, StatusBar, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { colors, dSCR, scale } from "utils";
import * as Animatable from "react-native-animatable";

interface dSCR_Splash extends dSCR, dRedux {}
function SplashScreen() {
  const dispatch = useDispatch();
  React.useEffect(function fetchMedia() {
    dispatch(getMedia());
  }, []);
  return (
    <CtnrGradient
      colors={["#0000a0", "#0000ff"]}
      start={{ x: 1.0, y: 0.25 }}
      end={{ x: 0.0, y: 1.0 }}
    >
      <StatusBar backgroundColor={"#0000a0"} animated />
      <Image
        source={img.meloLogo}
        resizeMode="center"
        style={{ width: scale(60), height: scale(60) }}
        // animation="fadeInUp"
        // duration={1000}
      ></Image>
      {/* <Image

      // width={150}
      // height={150}
      /> */}
      {/* <Text>Loading your music library...</Text> */}
    </CtnrGradient>
  );
}

export default connector(SplashScreen);

const CtnrGradient = sstyled(LinearGradient)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.elevatedBG,
});

// const Wrapper = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: ${colors.elevatedBG};
// `;
