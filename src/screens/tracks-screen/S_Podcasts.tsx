import RenderActivityIndicator from "components/RenderActivityIndicator";
import { scanMessage } from "constants";
import { dRedux } from "engines";
import React, { useEffect } from "react";
import { Dimensions, StatusBar, ViewStyle } from "react-native";
import { dSCR, getStatusBarHeight } from "utils";

const ScreenHeight = Dimensions.get("window").height;
const StatusBarHeight = StatusBar.currentHeight;
const FooterHeight = 60;
const BottomTabHeight = 49;
const ViewportHeight =
  ScreenHeight - (StatusBarHeight + FooterHeight + BottomTabHeight);
const itemHeight = 75;

interface dSCR_Tracks extends dSCR, dRedux {}
function TracksScreen(props: dSCR_Tracks) {
  const { navigation } = props;

  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () =>
      PlayerFooter.open()
    );
    return unsubscribe;
  }, [navigation]);
  const [_podcast, setPodcast] = React.useState(null);
  useEffect(function getPodcastResult() {
    fetch(
      "https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0",
      {
        method: "GET",
        headers: {
          "X-ListenAPI-Key": "d7f9fea7ad1c47499a5130cf3ae447d4",
        },
      }
    )
      .then((result) => result.json())
      .then((json) => {
        // console.log("RSULT>>>>>>>", json);
        setPodcast(json);
      })
      .catch((error) => console.warn(error));
    // .finally();
  }, []);

  return <RenderActivityIndicator text={scanMessage} />;
  // return (
  //   <ShuffleText style={{ paddingTop: scale(100) }}>
  //     {JSON.stringify(_podcasts)}
  //   </ShuffleText>
  // );
}

const SS = (C) => {
  return {
    header: {
      backgroundColor: "transparent",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      overflow: "hidden",
      justifyContent: "center",
      paddingTop: getStatusBarHeight("safe"),
      alignItems: "flex-start",
      // paddingHorizontal: scale(15),
    } as ViewStyle,
    thumbStyle: {
      width: 4,
      borderWidth: 0,
    },
    flatlistContent: {
      marginTop: 20,
      paddingBottom: 20,
    },
  };
};
