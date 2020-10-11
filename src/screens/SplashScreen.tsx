//@ts-check
import { img } from "assets";
import { sstyled } from "components";
import { connector, dRedux, getMedia } from "engines";
import React from "react";
import { Image, StatusBar, View } from "react-native";
import { useDispatch } from "react-redux";
import { colors, dSCR } from "utils";

interface dSCR_Splash extends dSCR, dRedux {}
function SplashScreen() {
  const dispatch = useDispatch();
  React.useEffect(function fetchMedia() {
    dispatch(getMedia());
  }, []);
  return (
    <Ctnr>
      <StatusBar backgroundColor={colors.elevatedBG} animated />
      <Image
        source={img.meloLogo}
        resizeMode="center"
        style={{ width: 90, height: 90 }}
        // width={150}
        // height={150}
      />
      {/* <Text>Loading your music library...</Text> */}
    </Ctnr>
  );
}

export default connector(SplashScreen);

const Ctnr = sstyled(View)({
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
