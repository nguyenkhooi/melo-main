import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { PRODUCT_SANS } from "assets";
import { actions } from "engines";
import React, { useRef } from "react";
import { TouchableWithoutFeedback as Touchable, View } from "react-native";
import Menu, { MenuItem } from "react-native-material-menu";
import Share from "react-native-share";
import { connect } from "react-redux";
import RenderToast from "./RenderToast";

function OptionsMenu(props) {
  const menuRef = useRef(null);
  const navigation = useNavigation();

  function onAddToPlaylist() {
    menuRef.current.hide();
    navigation.navigate("addToPlaylist-scr", { song: props.currentItem });
  }

  async function onSeeLyrics() {
    menuRef.current.hide();
    let { isConnected } = await NetInfo.fetch();
    let { currentItem, currentLyrics } = props;
    if (
      currentItem.title === currentLyrics.title &&
      currentItem.artist === currentLyrics.artist
    ) {
      navigation.navigate("lyrics-scr");
    } else if (isConnected) {
      props.resetLyrics();
      navigation.navigate("lyrics-scr");
    } else
      RenderToast({
        title: "Error",
        message: "No internet connection",
        type: "error",
      });
  }

  function onShare() {
    menuRef.current.hide();
    Share.open({
      url: `file://${props.currentItem.url}`,
      type: "audio/mp3",
      failOnCancel: false,
    });
  }

  const button = (
    <Touchable onPress={() => menuRef.current.show()}>{props.target}</Touchable>
  );
  return (
    <View>
      <Menu ref={menuRef} button={button}>
        <MenuItem onPress={onAddToPlaylist} textStyle={styles.menuItemText}>
          Add to playlist
        </MenuItem>
        <MenuItem onPress={onSeeLyrics} textStyle={styles.menuItemText}>
          See lyrics
        </MenuItem>
        <MenuItem onPress={onShare} textStyle={styles.menuItemText}>
          Share
        </MenuItem>
      </Menu>
    </View>
  );
}

function mapStateToProps(state) {
  return { currentLyrics: state.lyrics.currentLyrics };
}

export default connect(mapStateToProps, actions)(OptionsMenu);

const styles = {
  menuItemText: {
    fontFamily: PRODUCT_SANS,
    fontSize: 16,
    color: "black",
  },
};
