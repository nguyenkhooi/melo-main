import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import _ from "lodash";
import RenderCategory from "components/RenderCategory";
import { dSCR, flatListCardLayout, getBottomSpace, scale } from "utils";
import { connector, dRedux } from "engines";
import { PlayerFooter } from "components";

interface dSCR_Artists extends dSCR, dRedux {}
function ArtistsScreen(props: dSCR_Artists) {
  const {
    navigation,
    //* redux states
    media: { mediaFiles },
    playback: { currentTrack },
  } = props;
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () =>
      PlayerFooter.open()
    );
    return unsubscribe;
  }, [navigation]);

  function onArtistPress(title, content) {
    navigation.navigate("content-scr", { title, content });
  }

  function renderArtists({ item, index }) {
    if (item.empty) return <View style={styles.itemInvisible} />;
    let songsWithCover = item.data.filter((song) => song.artwork !== "cover");
    let cover =
      songsWithCover.length === 0 ? "cover" : songsWithCover[0].artwork;
    return (
      <RenderCategory
        title={item.title}
        image={cover}
        index={index}
        numOfTracks={item.data.length}
        onPress={() => {
          PlayerFooter.close();
          onArtistPress(item.title, item.data);
        }}
      />
    );
  }

  function mediaListParser() {
    let sectionsData = [];
    let data = _.groupBy(mediaFiles, "artist");
    let titles = Object.keys(data);
    titles.forEach((title) => {
      sectionsData.push({
        title,
        data: data[title],
      });
    });
    let unknownArtist = sectionsData.filter((item) => item.title === "null");
    unknownArtist = unknownArtist.map((item) => (item.title = "unknown"));
    let sortedData = _.sortBy(sectionsData, "title").filter(
      (item) => item.title !== "null"
    );
    return sortedData;
  }

  let bottomMargin = { flex: 1 };
  return (
    <View style={bottomMargin}>
      <FlatList
        data={mediaListParser()}
        renderItem={renderArtists}
        numColumns={2}
        getItemLayout={flatListCardLayout}
        keyExtractor={(asset) => asset.title.toString()}
        contentContainerStyle={{ paddingBottom: getBottomSpace() + scale(120) }}
      />
    </View>
  );
}

export default connector(ArtistsScreen);

const styles = {
  itemInvisible: {
    backgroundColor: "transparent",
  },
};
