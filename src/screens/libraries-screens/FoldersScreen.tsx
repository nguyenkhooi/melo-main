import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import _ from "lodash";
import ListItem from "components/ListItem";
import { connector, dRedux } from "engines";
import { dSCR } from "utils";
import { PlayerFooter } from "components";

interface dSCR_Folders extends dSCR, dRedux {}
function FoldersScreen(props: dSCR_Folders) {
  const {
    navigation,
    //* redux states
    media: { mediaFiles },
    
  } = props;
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () =>
      PlayerFooter.open()
    );
    return unsubscribe;
  }, [navigation]);

  function onListItemPress(title, content) {
    navigation.navigate("content-scr", { title, content });
  }

  function renderFolders() {
    let data = _.groupBy(mediaFiles, "folder");
    let keys = Object.keys(data);
    return keys.map((key, index) => (
      <ListItem
        title={key}
        subtitle={`${data[key].length} tracks`}
        key={(key + index).toString()}
        onPress={() => onListItemPress(key, data[key])}
        iconProps={folderIcon}
      />
    ));
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderFolders()}
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
