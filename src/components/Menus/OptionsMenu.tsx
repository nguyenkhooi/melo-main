import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { Kitt, Toasty } from "components";
import { connector, dRedux } from "engines";
import React from "react";
import { TouchableOpacity as Touchable } from "react-native";
import Share from "react-native-share";
import { TrackProps } from "utils";
import RenderToast from "../RenderToast";

interface dOptionsMenu extends dRedux {
  lyrics: { currentLyrics: any };
  target: React.Component;
  currentItem: TrackProps;
}
export const OptionsMenu = connector((props: dOptionsMenu) => {
  const {
    lyrics: { currentLyrics },
    target,
    currentItem,
  } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const navigation = useNavigation();

  function onAddToPlaylist() {
    setVisible(false);
    navigation.navigate("addToPlaylist-scr", { song: props.currentItem });
  }

  async function onSeeLyrics() {
    setVisible(false);
    let { isConnected } = await NetInfo.fetch();
    if (
      currentItem.title === currentLyrics.title &&
      currentItem.artist === currentLyrics.artist
    ) {
      navigation.navigate("lyrics-scr");
    } else if (isConnected) {
      props.resetLyrics();
      navigation.navigate("lyrics-scr");
    } else
      Toasty.show("No internet connection", {
        type: "danger",
      });
  }

  function onShare() {
    setVisible(false);
    Share.open({
      url: `file://${props.currentItem.url}`,
      type: "audio/mp3",
      failOnCancel: false,
    });
  }

  const renderToggleButton = () => (
    <Touchable onPress={() => setVisible(true)}>{target}</Touchable>
  );

  return (
    <Kitt.OverflowMenu
      appearance="noDivider"
      anchor={renderToggleButton}
      visible={visible}
      selectedIndex={selectedIndex}
      onSelect={onItemSelect}
      onBackdropPress={() => setVisible(false)}
    >
      <Kitt.MenuItem title="Add to playlist" onPress={onAddToPlaylist} />
      <Kitt.MenuItem title="See lyrics" onPress={onSeeLyrics} />
      <Kitt.MenuItem title="Share" onPress={onShare} />
    </Kitt.OverflowMenu>
  );
});
