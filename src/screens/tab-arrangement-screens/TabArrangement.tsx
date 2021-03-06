import * as actions from "actions";
import { PRODUCT_SANS_BOLD } from "assets";
import { PROPS_Icon } from "components";
import ListItem from "components/ListItem";
import React, { useEffect } from "react";
import { View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { contrastColor } from "themes";

function TabArrangementScreen(props) {
  useEffect(() => {
    let unsubscribe = props.navigation.addListener("focus", props.hideFooter);
    return unsubscribe;
  }, [props.navigation]);

  function renderItem({ item, drag }) {
    return (
      <ListItem
        title={item.charAt(0).toUpperCase() + item.slice(1)}
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
        data={props.tobTabs}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        onDragEnd={({ data }) => props.setTopTabs(data)}
      />
    </View>
  );
}

function mapStateToProps(state) {
  return { tobTabs: state.settings.topTabs };
}

export default connect(mapStateToProps, actions)(TabArrangementScreen);

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
