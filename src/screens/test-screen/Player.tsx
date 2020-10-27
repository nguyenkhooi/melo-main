import { img } from "assets";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from "react-native";
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  useTrackPlayerProgress,
} from "react-native-track-player";

function ProgressBar() {
  const progress = useTrackPlayerProgress();

  return (
    <View style={styles.progress}>
      <View style={{ flex: progress.position, backgroundColor: "red" }} />
      <View
        style={{
          flex: progress.duration - progress.position,
          backgroundColor: "grey",
        }}
      />
    </View>
  );
}

function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default function Player(props) {
  const playbackState = usePlaybackState();
  const [trackTitle, setTrackTitle] = useState("");
  const [trackArtwork, setTrackArtwork] = useState();
  const [trackArtist, setTrackArtist] = useState("");
  // useTrackPlayerEvents(["playback-track-changed"], async (event) => {
  //   if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
  //     const track = await TrackPlayer.getTrack(event.nextTrack);
  //     const { title, artist, artwork, id } = track || {};
  //     setTrackTitle(title + " - " + id);
  //     setTrackArtist(artist);
  //     setTrackArtwork(artwork);
  //   }
  // });

  const { style, onNext, onPrevious, onTogglePlayback, currentTrack } = props;

  React.useEffect(
    function getCurrentTrack() {
      if (!!currentTrack) {
        const imageSource = currentTrack.artwork
          ? { uri: currentTrack.artwork }
          : img.placeholder;
        setTrackTitle(currentTrack.title + " - " + currentTrack.id);
        setTrackArtist(currentTrack.artist);
        setTrackArtwork(imageSource);
        // setTrackArtwork(img.placeholder);
      }
    },
    [currentTrack]
  );

  var middleButtonText = "Play";

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = "Pause";
  }

  return (
    <View style={[styles.card, style]}>
      <View style={{ flexDirection: "row", paddingVertical: 5 }}>
        <Image style={styles.cover} source={trackArtwork} />
        <View>
          <Text style={styles.title}>{trackTitle}</Text>
          <Text style={styles.artist}>{trackArtist}</Text>
        </View>
      </View>
      <ProgressBar />
      <View style={styles.controls}>
        <ControlButton title={"<<"} onPress={onPrevious} />
        <ControlButton title={middleButtonText} onPress={onTogglePlayback} />
        <ControlButton title={">>"} onPress={onNext} />
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

Player.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "gold",
  },
  cover: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    backgroundColor: "grey",
  },
  progress: {
    height: 1,
    width: "90%",
    marginTop: 10,
    flexDirection: "row",
  },
  title: {
    // marginTop: 10,
  },
  artist: {
    fontWeight: "bold",
  },
  controls: {
    marginVertical: 10,
    flexDirection: "row",
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: "center",
  },
});
