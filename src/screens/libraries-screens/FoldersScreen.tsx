import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import _ from "lodash";
import { connector, dRedux } from "engines";
import { dSCR, getBottomSpace, scale } from "utils";
import { PlayerFooter, Buttoon } from "components";

interface dSCR_Folders extends dSCR, dRedux {}
function FoldersScreen(props: dSCR_Folders) {
  const { navigation } = props;
  const [] = React.useState([]);
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", () =>
      PlayerFooter.open()
    );
    return unsubscribe;
  }, [navigation]);

  // React.useEffect(function getFolders() {
  //   let folders = _.groupBy(mediaFiles, "folder");
  //   let folderKeys = Object.keys(folders);

  // }, []);

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
