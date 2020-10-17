import { TrackPlaya } from "components";
import {
  connector,
  dRedux,
  playlistShuffle,
  setCurrentTrackk,
  setLoop,
  setShuffle,
} from "engines";
import _ from "lodash";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { usePlaybackState } from "react-native-track-player/lib/hooks";
import { dSCR, trackID, TrackProps } from "utils";
import Player from "./Player";
import playlistData from "./playlist.json";
import { useDispatch } from "react-redux";
import { img } from "assets";
import DraggableFlatList from "react-native-draggable-flatlist";

interface dSCR_Tracks extends dSCR, dRedux {}
function TestScreen(props: dSCR_Tracks) {
  const {
    playback: { currentTrack, shuffle, loop },
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
  const [_playaCurrent, setPlayaCurrent] = React.useState<trackID>(null);
  const [_isShuffled, shouldShuffle] = React.useState(false);
  const [_isLooped, shouldLoop] = React.useState(false);
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
  const _getTPCurrent = async () => {
    const current = await thisTrackPlaya.core.getCurrentTrack();
    setPlayaCurrent(current);
  };
  const _getTPQueue = async () => {
    const queue = await thisTrackPlaya.core.getQueue();
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

  async function toggleLoop() {
    if (USE_REDUX) {
      await dispatch(setLoop(!loop));
    } else {
      // const targetedTracks = await thisTrackPlaya.toggleShuffle(
      //   !_isShuffled,
      //   _indexedTracks,
      //   _currentTrack
      // );

      // setNPTracks(targetedTracks);
      shouldLoop(!_isLooped);
    }
  }

  const togglePlayback = () => {
    if (USE_REDUX) {
      return playbackState === TrackPlayer.STATE_PLAYING
        ? sethPlayback({ type: "pause" })
        : sethPlayback({ type: "play" });
      // sethPlayback({ type: "play" });
    } else
      return playbackState === TrackPlayer.STATE_PLAYING
        ? thisTrackPlaya.pause()
        : thisTrackPlaya.play();
  };

  const skipToNext = () => {
    if (USE_REDUX) {
      return sethPlayback({ type: "fwd" });
    } else {
      return thisTrackPlaya.next();
    }
  };

  const skipToPrevious = () => {
    if (USE_REDUX) {
      return sethPlayback({ type: "bwd" });
    } else {
      return thisTrackPlaya.previous();
    }
  };

  const playAllTracks = async () => {
    if (USE_REDUX) {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(mediaFiles, "normal")
        : mediaFiles;

      buildNowPlayingTracks(targetedPlaylist, mediaFiles);
    } else {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(mediaFiles, "normal")
        : mediaFiles;
      thisTrackPlaya.setPlaylist(targetedPlaylist);
      setNPTracks(targetedPlaylist);
      setIndexedTracks(mediaFiles);
    }
    setTimeout(() => {
      _getTPQueue();
      _getTPCurrent();
      thisTrackPlaya.play();
    }, 500);
  };

  const playCustomTracks = async (givenTracks: TrackProps[]) => {
    if (USE_REDUX) {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(givenTracks, "normal")
        : givenTracks;

      buildNowPlayingTracks(targetedPlaylist, givenTracks);
    } else {
      const targetedPlaylist = _isShuffled
        ? playlistShuffle(givenTracks, "normal")
        : givenTracks;
      thisTrackPlaya.setPlaylist(targetedPlaylist);
      setNPTracks(targetedPlaylist);
      setIndexedTracks(givenTracks);
    }
    setTimeout(() => {
      _getTPQueue();
      _getTPCurrent();
      thisTrackPlaya.play();
    }, 500);
  };

  const playSingleTrack = (targetedTrack: TrackProps) => {
    if (USE_REDUX) {
      dispatch(setCurrentTrackk(targetedTrack));
    } else {
      setCurrentTrack(targetedTrack);
      thisTrackPlaya.core.skip(targetedTrack.id);
    }
    setTimeout(() => {
      _getTPQueue();
      _getTPCurrent();
      thisTrackPlaya.play();
    }, 500);
  };

  const NP_TRACKS = USE_REDUX ? nowPlayingTracks : _npTracks;

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
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
              _getTPCurrent();
            }, 500);
          }}
        >
          {`🔀 Shuffle: ${USE_REDUX ? shuffle : _isShuffled}`}
        </Text>
        <Text
          style={styles.state}
          onPress={async () => {
            toggleLoop();
            setTimeout(() => {
              _getTPQueue();
              _getTPCurrent();
            }, 500);
          }}
        >
          {`➰ Loop: ${USE_REDUX ? loop : _isLooped}`}
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
          <DraggableFlatList
            data={NP_TRACKS}
            keyExtractor={(asset) => asset.id.toString()}
            onDragEnd={({ data }) => setNPTracks(data)}
            renderItem={({ item, drag }) => (
              <Text
                onPress={() => playSingleTrack(item)}
                onLongPress={drag}
                style={[
                  styles.description,
                  !!_currentTrack &&
                    !!_currentTrack.id &&
                    item.id === _currentTrack.id && { fontWeight: "bold" },
                ]}
              >
                {item.id}
              </Text>
            )}
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }} onPress={_getTPQueue}>
            Queue {_playaTracks.length}
          </Text>
          {_playaTracks.map((track) => (
            <Text
              style={[
                styles.description,
                !!_playaCurrent &&
                  !!_playaCurrent.id &&
                  track.id === _playaCurrent.id && { fontWeight: "bold" },
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
