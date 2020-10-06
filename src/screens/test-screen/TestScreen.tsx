import { connector, dRedux, fn } from "engines";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { usePlaybackState } from "react-native-track-player/lib/hooks";
import { dSCR } from "utils";
import Player from "./Player";
import playlistData from "./playlist.json";

interface dSCR_Tracks extends dSCR, dRedux {}
function TestScreen(props: dSCR_Tracks) {
  const {
    media: { nowPlayingTracks, mediaFiles },
  } = props;
  const playbackState = usePlaybackState();
  const [_tracks, setTracks] = React.useState(mediaFiles);
  const [_isShuffled, setShuffle] = React.useState(false);
  const [_queue, setQueue] = React.useState([]);

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add([..._tracks]);

      await TrackPlayer.play();
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  async function skipToNext() {
    try {
      const positions = fn.js.vLookup(_tracks, "id"); //* [1111,2222,3333,4444]
      console.log("id pos: ", positions);
      const thisTrackID = await TrackPlayer.getCurrentTrack();
      const thisPos = positions.indexOf(thisTrackID);
      await TrackPlayer.skip(positions[thisPos + 1]);
    } catch (_) {}
  }

  async function skipToPrevious() {
    try {
      const positions = fn.js.vLookup(_tracks, "id"); //* [1111,2222,3333,4444]
      console.log("id pos: ", positions);
      const thisTrackID = await TrackPlayer.getCurrentTrack();
      const thisPos = positions.indexOf(thisTrackID);
      await TrackPlayer.skip(positions[thisPos - 1]);
    } catch (_) {}
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Player
          onNext={skipToNext}
          style={styles.player}
          onPrevious={skipToPrevious}
          onTogglePlayback={togglePlayback}
        />
        <Text style={styles.state}>{getStateName(playbackState)}</Text>
        <Text
          style={styles.state}
          onPress={async () => {
            const queue = await TrackPlayer.getQueue();
            setQueue(queue);
          }}
        >
          Queue: {JSON.stringify(_queue)} (should == [])
        </Text>
        <Text
          style={styles.state}
          onPress={() => {
            const newTracks = shuffle(_tracks);
            setTracks(newTracks);
            setShuffle(!_isShuffled);
          }}
        >
          {"Shuffle: " + _isShuffled}
        </Text>
      </View>
      {_tracks.map((track) => (
        <Text style={styles.description}>{track.title}</Text>
      ))}
    </ScrollView>
  );
}

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

TestScreen.navigationOptions = {
  title: "Playlist Example",
};

function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return "None";
    case TrackPlayer.STATE_PLAYING:
      return "Playing";
    case TrackPlayer.STATE_PAUSED:
      return "Paused";
    case TrackPlayer.STATE_STOPPED:
      return "Stopped";
    case TrackPlayer.STATE_BUFFERING:
      return "Buffering";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  description: {
    width: "80%",
    marginTop: 20,
    textAlign: "center",
  },
  player: {
    marginTop: 40,
  },
  state: {
    marginTop: 20,
  },
});

export default connector(TestScreen);
