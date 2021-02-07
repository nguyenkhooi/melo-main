import { TrackPlaya } from "components";
import { connector, dRedux, playlistShuffle, setShuffle } from "engines";
import _ from "lodash";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { usePlaybackState } from "react-native-track-player/lib/hooks";
import { dSCR, TrackProps } from "utils";
import Player from "./Player";
import playlistData from "./playlist.json";
import { useDispatch } from "react-redux";
import { img } from "assets";

interface dSCR_Tracks extends dSCR, dRedux {}
function TestScreen(props: dSCR_Tracks) {
  const {
    playback: { currentTrack, shuffle },
    media: { nowPlayingTracks, mediaFiles, indexedTracks },
    sethPlayback,
    // setShuffle,
    buildNowPlayingTracks,
  } = props;
  const dispatch = useDispatch();
  const playbackState = usePlaybackState();
  let thisTrackPlaya = TrackPlaya.getInstance();
  const [USE_REDUX, shouldUseRedux] = React.useState(true);
  const [_currentTrack, setCurrentTrack] = React.useState<TrackProps>(null);
  const [_isShuffled, shouldShuffle] = React.useState(false);
  const [_indexedTracks, setIndexedTracks] = React.useState(mediaFiles);
  const [_npTracks, setNPTracks] = React.useState([]);
  const [_playaTracks, setPlayaTracks] = React.useState([]);

  React.useEffect(function updateCurrentTrack() {
    setCurrentTrack(currentTrack);
  }, []);
  React.useEffect(
    function updateCurrentTrack() {
      setCurrentTrack(currentTrack);
    },
    [currentTrack]
  );

  const _getTPQueue = async () => {
    const queue = await thisTrackPlaya.getQueue();
    // console.log(">>>>>", queue);
    setPlayaTracks(queue);
  };

  async function toggleShuffle() {
    if (USE_REDUX) {
      await dispatch(setShuffle(!shuffle, indexedTracks));
    } else {
      const targetedTracks = await thisTrackPlaya.toggleShuffle(
        !_isShuffled,
        _indexedTracks,
        _currentTrack
      );

      setNPTracks(targetedTracks);
      shouldShuffle(!_isShuffled);
    }
  }

  const togglePlayback = () => {
    if (USE_REDUX) {
      // sethPlayback({ type: "play" });
      return thisTrackPlaya.togglePlay();
    }
    return thisTrackPlaya.togglePlay();
  };

  const skipToNext = () => {
    if (USE_REDUX) {
      return sethPlayback({ type: "fwd" });
    }
    return thisTrackPlaya.next();
  };

  const skipToPrevious = () => {
    if (USE_REDUX) {
      sethPlayback({ type: "bwd" });
    }
    return thisTrackPlaya.previous();
  };

  const playAllTracks = async () => {
    if (USE_REDUX) {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(mediaFiles)
        : mediaFiles;

      buildNowPlayingTracks(targetedPlaylist, mediaFiles);

      setTimeout(() => {
        _getTPQueue();
        thisTrackPlaya.togglePlay();
      }, 500);
    } else {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(mediaFiles)
        : mediaFiles;
      thisTrackPlaya.setPlaylist(targetedPlaylist);
      setNPTracks(targetedPlaylist);
      setIndexedTracks(mediaFiles);
      setTimeout(() => {
        _getTPQueue();
        thisTrackPlaya.togglePlay();
      }, 500);
    }
  };

  const playCustomTracks = async (givenTracks: TrackProps[]) => {
    if (USE_REDUX) {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(givenTracks)
        : givenTracks;

      buildNowPlayingTracks(targetedPlaylist, givenTracks);
      setTimeout(() => {
        _getTPQueue();
        thisTrackPlaya.togglePlay();
      }, 500);
    } else {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(givenTracks)
        : givenTracks;
      thisTrackPlaya.setPlaylist(targetedPlaylist);
      setNPTracks(targetedPlaylist);
      setIndexedTracks(givenTracks);
      setTimeout(() => {
        _getTPQueue();
        thisTrackPlaya.togglePlay();
      }, 500);
    }
  };

  const playSingleTrack = (targetedTrack: TrackProps) => {
    setCurrentTrack(targetedTrack);
    thisTrackPlaya.skipToTrack(targetedTrack.id);
    setTimeout(() => {
      _getTPQueue();
      thisTrackPlaya.togglePlay();
    }, 500);
  };

  const NP_TRACKS = USE_REDUX ? nowPlayingTracks : _npTracks;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={img.appIcon}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        />
        <View>
          <Text style={styles.state} onPress={() => shouldUseRedux(!USE_REDUX)}>
            😃 Use Redux? {JSON.stringify(USE_REDUX)}
          </Text>
          <Text style={styles.state} onPress={playAllTracks}>
            ▶ Play all
          </Text>
          <Text
            style={styles.state}
            onPress={async () => {
              playCustomTracks(playlistData);
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
              _getTPQueue();
            }, 500);
          }}
        >
          {`🔀 Shuffle: ${USE_REDUX ? shuffle : _isShuffled}`}
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
            Now Playing {NP_TRACKS.length}
          </Text>
          {NP_TRACKS.map((track) => (
            <Text
              onPress={() => playSingleTrack(track)}
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
          <Text style={{ fontWeight: "bold" }} onPress={_getTPQueue}>
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
