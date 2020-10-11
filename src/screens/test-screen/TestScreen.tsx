import { TrackPlaya } from "components";
import { connector, dRedux, fn } from "engines";
import R from "ramda";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TrackPlayer from "react-native-track-player";
import { usePlaybackState } from "react-native-track-player/lib/hooks";
import { dSCR, dTracks, TrackProps } from "utils";
import Player from "./Player";
import playlistData from "./playlist.json";

interface dSCR_Tracks extends dSCR, dRedux {}
function TestScreen(props: dSCR_Tracks) {
  const {
    playback: { currentTrack },
    media: { nowPlayingIDs: nowPlayingTracks, mediaFiles },
  } = props;
  const playbackState = usePlaybackState();
  const [_tracks, setTracks] = React.useState(mediaFiles);
  const [_currentTrack, setCurrentTrack] = React.useState<TrackProps>(null);
  const [_isShuffled, setShuffle] = React.useState(false);
  const [_queue, setQueue] = React.useState([]);

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
  //   const playingItemId = await TrackPlaya.getInstance().getCurrentTrackId();
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

  async function shuffle(array: dTracks) {
    const _queue = await TrackPlayer.getQueue();
    let queue = [..._queue];
    const playedTracks = R.reject((track) => queue.includes(track), mediaFiles);
    const targetedQueue = _isShuffled
      ? R.reject((track) => playedTracks.includes(track), mediaFiles)
      : queue.sort(() => Math.random() - 0.5);

    await TrackPlayer.removeUpcomingTracks();
    await TrackPlayer.add(targetedQueue);
    setTracks(targetedQueue);

    // const targetedTracks = _isShuffled
    //   ? mediaFiles
    //   : array.sort(() => Math.random() - 0.5);

    // const shuffledTracks = R.reject(
    //   (track) => track.id == _currentTrack.id,
    //   targetedTracks
    // );
    // addToPlaylist(array);

    setShuffle(!_isShuffled);

    // return targetedTracks;
  }

  async function addToPlaylist(givenTracks: dTracks) {
    setTracks([..._tracks, ...givenTracks]);
    return Promise.all(
      givenTracks.map((item) => TrackPlaya.getInstance().appendToQueue(item))
    );
  }

  const addBeforePlaylist = (...givenTracks: TrackProps[]) => {
    setTracks([...givenTracks, ..._tracks]);

    return Promise.all(
      givenTracks.map((item) =>
        TrackPlaya.getInstance().prependToQueue(item.data)
      )
    );
  };

  const clearPlaylist = () => {
    // this.setState(initialState);
    return TrackPlaya.getInstance().clear();
  };

  // this creates a playlist with the items
  // we access this directly to add items to the playlist
  const createPlaylistFrom = async ({
    items,
    startingAtId,
  }: {
    items: TrackProps[];
    startingAtId?: string;
    startingAtPosition?: number;
  }) => {
    const before: TrackProps[] = [];
    const after: TrackProps[] = [];

    // Split the items at the starting at item
    // so we can queue the tracks
    items.forEach((item) => {
      if (item.id === startingAtId || after.length > 0) {
        after.push(item);
      } else {
        before.push(item);
      }
    });

    await addToPlaylist(...after);
    await addBeforePlaylist(...before);
  };

  const togglePlayback = () => {
    return TrackPlaya.getInstance().togglePlay();
  };

  const skipToNext = () => {
    return TrackPlaya.getInstance().next();
  };

  const skipToPrevious = () => {
    return TrackPlaya.getInstance().previous();
  };
  async function togglePlaybackOG() {
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

  async function skipToNextOG() {
    try {
      const positions = fn.js.vLookup(_tracks, "id"); //* [1111,2222,3333,4444]
      console.log("id pos: ", positions);
      const thisTrackID = await TrackPlayer.getCurrentTrack();
      const thisPos = positions.indexOf(thisTrackID);
      await TrackPlayer.skip(positions[thisPos + 1]);
    } catch (_) {}
  }

  async function skipToPreviousOG() {
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
            const queue = await TrackPlayer.getQueue();
            setQueue(queue);
          }}
        >
          Queue: {JSON.stringify(_queue.length)} (should == [])
        </Text>
        <Text
          style={styles.state}
          onPress={() => {
            shuffle(_tracks);
          }}
        >
          {"Shuffle: " + _isShuffled}
        </Text>
      </View>
      {_tracks.map((track) => (
        <Text
          style={[
            styles.description,
            !!_currentTrack &&
              !!_currentTrack.id &&
              track.id === _currentTrack.id && { fontWeight: "bold" },
          ]}
        >
          {track.title}
        </Text>
      ))}
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
