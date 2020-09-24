import { PRODUCT_SANS_BOLD } from "assets";
import { PROPS_Icon } from "components";
import ListItem from "components/ListItem";
import { connector, dRedux } from "engines";
import React, { useEffect } from "react";
import { View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import styled from "styled-components/native";
import { contrastColor } from "themes";
import { dSCR } from "utils";

interface dSCR_TabArrangement extends dSCR, dRedux {}
function TabArrangementScreen(props: dSCR_TabArrangement) {
  const {
    navigation,
    //* redux states
    settings: { topTabs },
    setTopTabs,
    hideFooter,
  } = props;
  useEffect(() => {
    let unsubscribe = navigation.addListener("focus", hideFooter);
    return unsubscribe;
  }, [navigation]);

  function renderItem({ item, drag }) {
    return (
      <ListItem
        title={item.charAt(0).toUpperCase() + item.slice(1).replace("-scr", "")}
        iconProps={dragIcon}
        onLongPress={drag}
        delayLongPress={0}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Message numberOfLines={2}>
        Hold and drag the tabs to rearrange them
      </Message>
      <DraggableFlatList
        data={topTabs}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => setTopTabs(data)}
      />
    </View>
  );
}

export default connector(TabArrangementScreen);

const Message = styled.Text`
  font-family: ${PRODUCT_SANS_BOLD};
  font-size: 16px;
  margin: 20px;
  color: ${contrastColor};
  text-align: center;
`;

const dragIcon = {
  name: "drag",
  type: "material-community",
  size: 25,
} as PROPS_Icon;
