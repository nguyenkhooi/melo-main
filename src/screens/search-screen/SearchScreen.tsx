import { CIRCULAR_BOLD } from "assets";
import { OptionsModal, RenderTrack, ScreenTitle } from "components";
import Icon from "components/Icon";
import SearchInput from "components/SearchInput";
import { connector, dRedux } from "engines";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import styled from "styled-components/native";
import {
  backgroundColor,
  contrastColor,
  contrastTransColor,
} from "themes/styles";
import { dSCR, getStatusBarHeight } from "utils";

interface dSCR_Search extends dSCR, dRedux {}
function SearchScreen(props: dSCR_Search) {
  const {
    navigation,
    //* redux state
    playback: { currentTrack },
    media: { mediaFiles },
    toggleFooter,
  } = props;

  const [searchInput, setInput] = useState("");
  const [isInputFocused, setInputFocus] = useState(false);
  const [modal, setModal] = useState({ visible: false, item: {} });
  const inputRef = useRef();

  useEffect(() => {
    let unsubscribe1 = navigation.addListener("focus", () =>
      toggleFooter("show")
    );
    let unsubscribe2 = navigation.addListener("blur", () => setInput(""));
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [navigation]);

  function listFilter() {
    if (searchInput) {
      return mediaFiles.filter((item) => {
        let itemData = ` ${item.title} ${item.artist}`.toUpperCase();
        let searchData = " " + searchInput.toUpperCase();
        return itemData.indexOf(searchData) > -1;
      });
    } else {
      return mediaFiles;
    }
  }

  function renderSearch() {
    const renderMargin =
      currentTrack.id !== "000" ? { marginBottom: 60 } : { flex: 1 };
    return (
      <FlatList
        data={listFilter()}
        renderItem={({ item }) => (
          <RenderTrack
            {...props}
            parent="search-scr"
            item={item}
            setOptions={setModal}
          />
        )}
        // ListHeaderComponent={() => (
        //   <SearchWrapper onPress={() => inputRef.current.focus()}>
        //     <SearchInput
        //       ref={inputRef}
        //       value={searchInput}
        //       setSearchInput={setInput}
        //       onFocus={() => setInputFocus(true)}
        //       onBlur={() => setInputFocus(false)}
        //     />
        //   </SearchWrapper>
        // )}
        keyExtractor={(asset) => asset.id.toString()}
        style={[styles.resultsWrapper, renderMargin]}
      />
    );
    // return isInputFocused || searchInput ? (
    //   <FlatList
    //     data={listFilter()}
    //     renderItem={({ item }) => (
    //       <RenderTrack parent="search-scr" item={item} setOptions={setModal} />
    //     )}
    //     keyExtractor={(asset) => asset.id.toString()}
    //     style={[styles.resultsWrapper, renderMargin]}
    //   />
    // ) : (
    //   // <TracksScreen {...props} />
    //   <PlaceholderWrapper>
    //     <SearchIcon {...styles.searchIcon} />
    //     <PlaceholderText>Type something into the search bar</PlaceholderText>
    //   </PlaceholderWrapper>
    // );
  }

  return (
    <Wrapper>
      <ScreenTitle title="Search" />
      <SearchWrapper onPress={() => inputRef.current.focus()}>
        <SearchInput
          ref={inputRef}
          value={searchInput}
          setSearchInput={setInput}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      </SearchWrapper>
      <View style={{ flex: 1 }}>
        {renderSearch()}
        <OptionsModal
          selectedTrack={modal.item}
          isVisible={modal.visible}
          onPressCancel={() => setModal({ ...modal, visible: false })}
        />
      </View>
    </Wrapper>
  );
}

export default connector(SearchScreen);

const Wrapper = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
  padding-top: ${getStatusBarHeight("safe")}px;
`;

// const TitleWrapper = styled.View`
//   align-items: center;
// `;

// const TitleWrapper = sstyled(View)({
//   alignItems: "flex-start",
//   paddingLeft: scale(15),
// });

const Title = styled.Text`
  font-family: ${CIRCULAR_BOLD};
  font-weight: bold;
  font-size: 26px;
  color: ${contrastColor};
`;

const SearchWrapper = styled.TouchableOpacity`
  margin-top: 24px;
  align-items: center;
`;

const PlaceholderWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.Text`
  font-family: ${CIRCULAR_BOLD};
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 100px;
  color: ${contrastColor};
`;

const SearchIcon = styled(Icon)`
  color: ${contrastTransColor(0.75)};
  margin-bottom: 20px;
`;

const styles = {
  resultsWrapper: {
    flex: 1,
    marginTop: 10,
  },
  searchIcon: {
    name: "search",
    type: "feather",
    size: 62,
  },
};
