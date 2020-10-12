import { TrackPlaya } from "components";
import { connector, dRedux, fn, playlistShuffle } from "engines";
import _ from "lodash";
import R from "ramda";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { usePlaybackState } from "react-native-track-player/lib/hooks";
import { dSCR, dTracks, trackID, TrackProps } from "utils";
import Player from "./Player";
import playlistData from "./playlist.json";

interface dSCR_Tracks extends dSCR, dRedux {}
function TestScreen(props: dSCR_Tracks) {
  const {
    playback: { currentTrack },
    media: { nowPlayingIDs: nowPlayingTracks, mediaFiles },
  } = props;
  const playbackState = usePlaybackState();
  let thisTrackPlaya = TrackPlaya.getInstance();
  const [_currentTrack, setCurrentTrack] = React.useState<TrackProps>(null);
  const [_isShuffled, setShuffle] = React.useState(false);
  const [_indexedTracks, setIndexedTracks] = React.useState(mediaFiles);
  const [_npTracks, setNPTracks] = React.useState([]);
  const [_playaTracks, setPlayaTracks] = React.useState([]);

  // React.useEffect(function TrackPlayaListener() {
  //   const trackChangedListener = TrackPlaya.addTrackChangeListener(
  //     async () => await updateCurrentPlayingItem()
  //   );
  //   return trackChangedListener.remove();
  // });

  React.useEffect(function updateCurrentTrack() {
    setCurrentTrack(currentTrack);
  }, []);
  React.useEffect(
    function updateCurrentTrack() {
      setCurrentTrack(currentTrack);
    },
    [currentTrack]
  );
  //* here we do some error checking to ensure that we're updating as we expect
  // const updateCurrentPlayingItem = async () => {
  //   const playingItemId = await thisTrackPlaya.getCurrentTrackId();
  //   // no playing item and therefore listener is being trigged on a abnormal situation (e.g. logging out)
  //   if (playingItemId === null) {
  //     return null;
  //   }

  //   const playingItem = _tracks.find((item) => item.id === playingItemId);

  //   if (!playingItem) {
  //     throw new Error(
  //       "Changed track to an item that has not been added to the playlist"
  //     );
  //   }

  //   setCurrentTrack(playingItem);

  //   return playingItem;
  // };

  async function toggleShuffle() {
    const targetedTracks = await thisTrackPlaya.toggleShuffle(
      !_isShuffled,
      _indexedTracks,
      _currentTrack
    );

    setPlayaTracks(targetedTracks);
    setNPTracks(targetedTracks);
    setShuffle(!_isShuffled);
  }

  const _getQueue = async () => {
    const queue = await thisTrackPlaya.getQueue();
    // console.log(">>>>>", queue);
    setPlayaTracks(queue);
    setNPTracks(queue);
  };

  async function addToPlaylist(givenTracks: dTracks) {
    setNPTracks([..._npTracks, ...givenTracks]);
    return Promise.all(
      givenTracks.map((item) => thisTrackPlaya.appendToQueue(item))
    );
  }

  const addBeforePlaylist = (...givenTracks: TrackProps[]) => {
    setNPTracks([...givenTracks, ..._npTracks]);

    return Promise.all(
      givenTracks.map((item) => thisTrackPlaya.prependToQueue(item.data))
    );
  };

  const clearPlaylist = () => {
    // this.setState(initialState);
    return thisTrackPlaya.clear();
  };

  const togglePlayback = () => {
    return thisTrackPlaya.togglePlay();
  };

  const skipToNext = () => {
    return thisTrackPlaya.next();
  };

  const skipToPrevious = () => {
    return thisTrackPlaya.previous();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text
            style={styles.state}
            onPress={async () => {
              const targetedPlaylist = _isShuffled
                ? playlistShuffle(mediaFiles, "normal")
                : mediaFiles;
              thisTrackPlaya.setPlaylist(targetedPlaylist);
              setIndexedTracks(mediaFiles);
              setTimeout(() => {
                _getQueue();
                thisTrackPlaya.togglePlay();
              }, 500);
            }}
          >
            ▶ Play all
          </Text>
          <Text
            style={styles.state}
            onPress={async () => {
              const targetedPlaylist = _isShuffled
                ? playlistShuffle(mediaFiles, "normal")
                : playlistData;
              thisTrackPlaya.setPlaylist(targetedPlaylist);
              setIndexedTracks(playlistData);
              setTimeout(() => {
                _getQueue();
                thisTrackPlaya.togglePlay();
              }, 500);
            }}
          >
            ▶ Play custom
          </Text>
        </View>
        <Player
          currentTrack={_currentTrack}
          onNext={skipToNext}
          style={styles.player}
          onPrevious={skipToPrevious}
          onTogglePlayback={togglePlayback}
        />
        {/* <Text style={styles.state}>{JSON.stringify(_currentTrack)}</Text> */}
        <Text style={styles.state}>{getStateName(playbackState)}</Text>
        <Text
          style={styles.state}
          onPress={async () => {
            toggleShuffle();
            setTimeout(() => {
              _getQueue();
            }, 500);
          }}
        >
          {"🔀 Shuffle: " + _isShuffled}
        </Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View>
          <Text style={{ fontWeight: "bold" }}>
            Media Files {mediaFiles.length}
          </Text>
          {mediaFiles.map((track, index) => (
            <Text
              style={[
                styles.description,
                !!_currentTrack &&
                  !!_currentTrack.id &&
                  track.id === _currentTrack.id && { fontWeight: "bold" },
              ]}
            >
              {index} ➖ {track.id}
            </Text>
          ))}
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>
            Now Playing {_npTracks.length}
          </Text>
          {_npTracks.map((track) => (
            <Text
              style={[
                styles.description,
                !!_currentTrack &&
                  !!_currentTrack.id &&
                  track.id === _currentTrack.id && { fontWeight: "bold" },
              ]}
            >
              {track.id}
            </Text>
          ))}
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }} onPress={_getQueue}>
            Queue {_playaTracks.length}
          </Text>
          {_playaTracks.map((track) => (
            <Text
              style={[
                styles.description,
                !!_currentTrack &&
                  !!_currentTrack.id &&
                  track.id === _currentTrack.id && { fontWeight: "bold" },
              ]}
            >
              {track.id}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
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
    // width: "80%",
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
