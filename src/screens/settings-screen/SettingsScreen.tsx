import {
  InputDialog,
  PlayerFooter,
  PROPS_Icon,
  RenderToast,
  ScreenTitle,
} from "components";
import ConfirmDialog from "components/ConfirmDialog";
import ListItem from "components/ListItem";
import { settings } from "constants";
import { connector, dRedux } from "engines";
import React, { useEffect, useState } from "react";
import { Linking, ScrollView, Switch } from "react-native";
import Share from "react-native-share";
import { withTheme } from "styled-components/native";
import { clearCache, dSCR, getStatusBarHeight } from "utils";

// import ListItem from "../components/ListItem";
// import ConfirmDialog from "../components/ConfirmDialog";
// import { clearCache } from "../utils/FileSystem";
// import { settings } from "../constants";

interface dSCR_Settings extends dSCR, dRedux {}
function SettingsScreen(props: dSCR_Settings) {
  const {
    theme,
    setTheme,
    navigation,
    //* redux state
    settings: { foldersToSkip },
    getMedia,
    setSkipFolders,
    
  } = props;

  const [isInputVisible, setInputVisible] = useState(false);
  const [isDialogVisible, setDialogVisible] = useState(false);
  useEffect(() => {
    let unsubscribe = navigation.addListener(
      "focus",
      () => PlayerFooter.open()
      // toggleFooter("show")
    );
    return unsubscribe;
  }, [navigation]);

  async function onConfirmClear() {
    setDialogVisible(false);
    await clearCache();
    getMedia();
  }

  function onInputSave(val) {
    if (foldersToSkip !== val) {
      setSkipFolders(val);
      getMedia();
    }
    setInputVisible(false);
  }

  function onPressReport() {
    Linking.openURL(
      "mailto:drkhoi16@gmail.com?subject=Melo bug report&body=Device Manufacturer %26 Model: \n\nYour issue: %20"
    );
  }

  function onPressShare() {
    Share.open({
      message:
        "Hey! Check out Melo\nhttps://play.google.com/store/apps/details?id=com.Melo",
    });
  }

  const { current, elevatedBG, foreground, fgTrans } = theme;
  const darkModeThumbColor = current === "light" ? elevatedBG : foreground;
  const skippedFolders = foldersToSkip.join(", ");
  return (
    <ScrollView style={{ flex: 1, paddingTop: getStatusBarHeight("safe") }}>
      {/* <ScreenTitle title={"Settings"} /> */}
      <ListItem
        onPress={() => {
          RenderToast({
            title: "Setting theme...",
            type: "info",
            visibilityTime: 500,
          });
          setTimeout(() => {
            setTheme(current === "dark" ? "light" : "dark");
          }, 300);
        }}
        iconProps={icons.darkMode}
        title={settings.darkMode.title}
        subtitle={settings.darkMode.subtitle}
        rightElement={
          <Switch
            disabled={true}
            thumbColor={darkModeThumbColor}
            value={current === "dark"}
            trackColor={{ true: `${fgTrans}0.5)` }}
            onValueChange={(val) => setTheme(val ? "dark" : "light")}
          />
        }
      />

      <ListItem
        iconProps={icons.scan}
        title={settings.excludeFolders.title}
        onPress={() => setInputVisible(true)}
        subtitle={skippedFolders}
      />

      <ListItem
        iconProps={icons.delete}
        title={settings.clearCache.title}
        onPress={() => setDialogVisible(true)}
        subtitle={settings.clearCache.subtitle}
      />

      <ListItem
        iconProps={icons.rearrange}
        title={settings.changeOrder.title}
        onPress={() => {
          PlayerFooter.close();
          navigation.navigate("tab-order-scr");
        }}
        subtitle={settings.changeOrder.subtitle}
      />

      <ListItem
        iconProps={icons.bug}
        title={settings.reportABug.title}
        onPress={onPressReport}
        subtitle={settings.reportABug.subtitle}
      />

      <ListItem
        iconProps={icons.share}
        title={settings.share}
        onPress={onPressShare}
      />

      <ListItem
        iconProps={icons.about}
        title={settings.about.title}
        onPress={() => {
          PlayerFooter.close();
          navigation.navigate("about-scr");
        }}
        subtitle={settings.about.subtitle}
      />

      <SkipFoldersDialog
        isVisible={isInputVisible}
        onPressSave={onInputSave}
        onPressCancel={() => setInputVisible(false)}
        inputPlaceholder={settings.excludeFoldersDialog.placeholder}
        title={settings.excludeFoldersDialog.title}
        name={skippedFolders}
        saveButtonTitle="Save"
        description={settings.excludeFoldersDialog.description}
      />

      <ConfirmDialog
        isVisible={isDialogVisible}
        title={settings.clearCacheConfirm.title}
        buttonTitle="Clear"
        description={settings.clearCacheConfirm.subtitle}
        onCancel={() => setDialogVisible(false)}
        onConfirm={onConfirmClear}
        cancelButton
      />
    </ScrollView>
  );
}

const SkipFoldersDialog = InputDialog;
const ClearCacheDialog = ConfirmDialog;

export default connector(withTheme(SettingsScreen));

const icons = {
  darkMode: {
    name: "moon",
    type: "fa5",
    size: 26,
  } as PROPS_Icon,
  scan: {
    name: "folder-minus",
    type: "fa5",
    size: 26,
  } as PROPS_Icon,
  delete: {
    name: "trash",
    type: "fa5",
    size: 26,
  } as PROPS_Icon,
  musicFile: {
    name: "rocket",
    type: "simple-line-icon",
    size: 26,
  } as PROPS_Icon,
  rearrange: {
    name: "bars",
    type: "fa5",
    size: 26,
  } as PROPS_Icon,
  about: {
    name: "info-circle",
    type: "fa5",
    size: 26,
  } as PROPS_Icon,
  bug: {
    name: "bug",
    type: "fa5",
    size: 26,
  } as PROPS_Icon,
  share: {
    name: "share-alt",
    type: "fa5",
    size: 26,
  } as PROPS_Icon,
};
