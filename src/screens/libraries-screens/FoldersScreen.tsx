import { PlayerFooter } from "components";
import ListItem from "components/ListItem";
import { connector, dRedux } from "engines";
import _ from "lodash";
import R from "ramda";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { dSCR, getBottomSpace, scale } from "utils";

interface dSCR_Folders extends dSCR, dRedux {}
function FoldersScreen(props: dSCR_Folders) {
  const {
    navigation,
    //* redux states
    media: { mediaFiles },
    getMedia,
    setSkipFolders,
  } = props;
  const [_folder, setFolders] = React.useState([]);
  React.useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () =>
      PlayerFooter.open()
    );
    return unsubscribe;
  }, [navigation]);

  React.useEffect(function getFolders() {
    let folders = _.groupBy(mediaFiles, "folder");
    let folderKeys = Object.keys(folders);

    console.log("folders: ", folderKeys);
  }, []);

  function onListItemPress(title, content) {
    PlayerFooter.close();
    navigation.navigate("content-scr", { title, content });
  }

  const renderFolders = React.memo(
    (props) => {
      // let data = R.groupWith((track1: Track, track2: TrackProps) => {
      //   track1.folder == track2.folder;
      // })(mediaFiles);
      let data = _.groupBy(mediaFiles, "folder");
      console.log("data:  ", Object.keys(data));
      let keys = Object.keys(data);
      return keys.map((key, index) => (
        <ListItem
          title={key}
          subtitle={`${data[key].length} tracks`}
          key={(key + index).toString()}
          onPress={() => onListItemPress(key, data[key])}
          onSelect={(name) => {
            const _folderToKeep = [..._folder, name];
            const _folderToSkip = R.filter(
              (name) => !_folderToKeep.includes(name),
              Object.keys(data)
            );
            setFolders(_folderToSkip);
          }}
          iconProps={folderIcon}
        />
      ));
    },

    (prevProps, nextProps) => prevProps != nextProps
  );

  return (
    <View style={{ flex: 1 }}>
      {/* <Buttoon
        progress={true}
        onPress={(xong) => {
          setTimeout(() => {
            // setSkipFolders(val);
            // getMedia();
          }, 1000);
        }}
        icon={{ name: "play" }}
      >
        {JSON.stringify(_folder)}
      </Buttoon> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: getBottomSpace() + scale(120) }}
      >
        {/* {renderFolders} */}
      </ScrollView>
    </View>
  );
}

export default connector(FoldersScreen);

const folderIcon = {
  name: "folder",
  type: "entypo",
  size: 24,
  style: {
    backgroundColor: "transparent",
  },
};
