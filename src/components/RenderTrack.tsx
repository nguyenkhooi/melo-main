import { CIRCULAR, img } from "assets";
import { connector, dRedux } from "engines";
import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { foregroundColor, contrastColor, contrastTransColor } from "themes";
import { TrackProps } from "utils";
import Icon from "./Icon";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface dTrackComp extends dRedux {
  item: TrackProps;
  setOptions({ visible: boolean, item: TrackProps }): void;
}
export const RenderTrack = connector(
  React.memo(
    (props: dTrackComp) => {
      const {
        item,
        playback: { currentTrack },
        media: { mediaFiles, nowPlayingTracks },
        setCurrentTrack,
        setNowPlayingTracks,
        setOptions,
      } = props;

      function onTrackPress() {
        if (item.id !== currentTrack.id) {
          /** If track is pressed, set `nowPlayingTracks == mediaFiles`
           * NOTE should think more about this
           */
          setNowPlayingTracks(mediaFiles);
          setCurrentTrack(item);
        }
      }

      const coverSrc = item.artwork ? { uri: item.artwork } : img.placeholder;
      return (
        <Touchable onPress={onTrackPress} activeOpacity={0.4}>
          <Thumbnail source={coverSrc} />
          <TextWrapper>
            <Title numberOfLines={1} current={item.id === currentTrack.id}>
              {item.title}
            </Title>
            <Artist numberOfLines={1}>{item.artist}</Artist>
            {/* <Text>{JSON.stringify(Object.keys(item))}</Text> */}
          </TextWrapper>
          <StyledIcon
            {...optionsIcon}
            onPress={() => setOptions({ visible: true, item })}
          />
        </Touchable>
      );
    },
    (prevProps, nextProps) =>
      !(
        nextProps.playback.currentTrack.id === nextProps.item.id ||
        prevProps.playback.currentTrack.id === prevProps.item.id ||
        prevProps.item !== nextProps.item
      )
  )
);

export default RenderTrack;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 65px;
  margin-top: 10px;
  padding-left: 15px;
`;

const Thumbnail = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 2px;
`;

const TextWrapper = styled.View`
  flex-direction: column;
  flex: 1;
  height: 52px;
  margin-left: 15px;
  justify-content: space-evenly;
`;

const Title = styled.Text`
  font-family: ${CIRCULAR};
  font-size: 14px;
  width: ${SCREEN_WIDTH / 2}px;
  color: ${(props) =>
    props.current ? foregroundColor(props) : contrastColor(props)};
`;

const Artist = styled.Text`
  /* font-family: 'CircularLight'; */
  font-size: 14px;
  width: ${SCREEN_WIDTH / 2}px;
  color: ${contrastTransColor(0.75)};
`;

const StyledIcon = styled(Icon)`
  color: ${contrastTransColor(0.75)};
  padding: 10px;
`;

const optionsIcon = {
  name: "ellipsis-v",
  type: "fa5",
  size: 20,
};
