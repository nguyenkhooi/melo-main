import React, { LegacyRef } from "react";
import Carousel from "react-native-snap-carousel";
import { TrackProps } from "utils";
import { dSCR_Player } from "./PlayerScreen";
import { IconPrimr, img } from "assets";
import { OptionsMenu } from "components";
import { Dimensions, Image, View } from "react-native";

const ImageSize = Dimensions.get("window").width * 0.82;

interface d$_CoversCarousel extends dSCR_Player {}

export const S_CoversCarousel = React.forwardRef((props: d$_CoversCarousel) => {
  const {
    theme,
    playback: { currentTrack },
  } = props;

  return (
    <View style={{ flex: 1 }}>
      <$_CoverArt {...props} artwork={currentTrack.artwork} />
    </View>
  );

  //* NOTE Attempt to use Carousel to display track covers, but is failing in update `shuffledTracks`
  // const [_displayedCovers, setDisplayedCovers] = React.useState([]);
  // React.useEffect(function setup() {
  //   let mainCovers = [
  //     mediaFiles[currentTrack.index - 1],
  //     mediaFiles[currentTrack.index],
  //     mediaFiles[currentTrack.index + 1],
  //   ];
  //   setDisplayedCovers(mainCovers);
  // }, []);

  // function getCurrentTrackPosition() {
  //   console.log("running...");
  //   const currentTrackPosition = R.findIndex(
  //     R.propEq("index", currentTrack.index)
  //   )(mediaFiles);
  //   return currentTrackPosition;
  //   //   console.log("currentTrackPosition: ", currentTrackPosition);
  //   //   ref.current?.snapToItem(currentTrackPosition, true);
  // }
  // return shuffle ? (
  //   <View style={{ flex: 1 }}>
  //     <$_CoverArt {...props} artwork={currentTrack.artwork} />
  //   </View>
  // ) : (
  //   <>
  //     {/* <Button
  //       onPress={() => {
  //         getCurrentTrackPosition();
  //       }}
  //       title="snap"
  //     /> */}
  //     <Carousel
  //       ref={ref}
  //       containerCustomStyle={{ flex: 1 }}
  //       data={mediaFiles}
  //       firstItem={getCurrentTrackPosition()}
  //       renderItem={({ item }: { item: TrackProps }) => (
  //         <$_CoverArt {...props} artwork={item.artwork} />
  //       )}
  //       sliderWidth={DEVICE_WIDTH}
  //       itemWidth={DEVICE_WIDTH * 0.8}
  //       onSnapToItem={(index) => {
  //         sethPlayback({
  //           type: index > currentTrack.index ? "fwd" : "bwd",
  //           currentTrack,
  //           mediaFiles,
  //           isShuffle: shuffle,
  //         });
  //       }}
  //     />
  //   </>
  // );
});

interface dArt extends d$_CoversCarousel {
  artwork: string;
}

/**
 * Cover Art inside PlayerScreen
 * @param props
 */
export const $_CoverArt = (props: dArt) => {
  const {
    theme,
    playback: { currentTrack },
  } = props;

  const imgSrc = props.artwork ? { uri: props.artwork } : img.placeholder;
  // return <Cover {...props} source={imgSrc} />;
  return (
    <View>
      <Image
        {...props}
        source={imgSrc}
        style={{
          width: ImageSize,
          height: ImageSize,
          borderRadius: 5,
          backgroundColor: theme.elevatedBG,
        }}
      />
      {/* <Text style={{ backgroundColor: "white" }}>{title}</Text> */}
      <View style={{ position: "absolute", top: 10, right: 10 }}>
        <OptionsMenu
          target={
            <IconPrimr
              preset={"safe"}
              name={"dots_vertical"}
              size={20}
              color={"white"}
            />
          }
          currentItem={currentTrack}
        />
      </View>
    </View>
  );
};
