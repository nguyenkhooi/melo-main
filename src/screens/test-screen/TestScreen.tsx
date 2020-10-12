import { TrackPlaya } from "components";
import { connector, dRedux, fn, playlistShuffle } from "engines";
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

  async function shuffle(indexedTracks: dTracks = mediaFiles) {
    const _queue = await TrackPlaya.getInstance().getQueue();
    // let queueTracks = [..._queue];
    const currentPos = R.indexOf(currentTrack.id, R.pluck("id")(indexedTracks));
    const tracksWoCurrent = R.pluck("id")(
      R.reject((track) => track.id === currentTrack.id, indexedTracks)
    ) as trackID[];

    // const playedTracks = R.reject((track) => queueTracks.includes(track), mediaFiles);
    let targetedTracks: TrackProps[];
    const U_TURN_OFF_SHUFFLE = _isShuffled;
    const U_TURN_ON_SHUFFLE = !_isShuffled;

    if (U_TURN_OFF_SHUFFLE) {
      let beforeCurrentTracks = R.slice(
        0,
        currentPos,
        indexedTracks
      ) as TrackProps[];
      console.log("BC: ", beforeCurrentTracks.length);
      let afterCurrentTracks = R.slice(
        currentPos + 1,
        indexedTracks.length,
        indexedTracks
      ) as TrackProps[];
      console.log("AC: ", afterCurrentTracks.length);

      targetedTracks = [...afterCurrentTracks, ...beforeCurrentTracks];
    }

    if (U_TURN_ON_SHUFFLE) {
      const shuffledTracks = playlistShuffle([..._queue], "normal");
      const shuffledTrackswoCurrent = R.reject(
        (track) => track.id === currentTrack.id,
        shuffledTracks
      );

      targetedTracks = shuffledTrackswoCurrent;
    }

    /**
     *  Since `currentTrack` maybe NOT on top of the queue (since there're probably tracks before it).
     *  Hence, we remove all tracks except `currentTrack`, then add the `targetedTracks` after it.
     *  -> `currentTrack` back on top
     */
    await TrackPlayer.remove(tracksWoCurrent);
    await TrackPlayer.add(targetedTracks);
    setPlayaTracks(targetedTracks);
    setNPTracks(targetedTracks);
    setShuffle(!_isShuffled);

    // const targetedQueue  = _isShuffled ?
    // const targetedQueue = _isShuffled
    //   ? R.reject((track) => playedTracks.includes(track), mediaFiles)
    //   : [..._queue].sort(() => Math.random() - 0.5);

    // await TrackPlaya

    // const targetedTracks = _isShuffled
    //   ? mediaFiles
    //   : array.sort(() => Math.random() - 0.5);

    // const shuffledTracks = R.reject(
    //   (track) => track.id == _currentTrack.id,
    //   targetedTracks
    // );
    // addToPlaylist(array);

    // return targetedTracks;
  }

  async function addToPlaylist(givenTracks: dTracks) {
    setNPTracks([..._npTracks, ...givenTracks]);
    return Promise.all(
      givenTracks.map((item) => TrackPlaya.getInstance().appendToQueue(item))
    );
  }

  const addBeforePlaylist = (...givenTracks: TrackProps[]) => {
    setNPTracks([...givenTracks, ..._npTracks]);

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
      await TrackPlayer.add([..._npTracks]);

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
      const positions = fn.js.vLookup(_npTracks, "id"); //* [1111,2222,3333,4444]
      console.log("id pos: ", positions);
      const thisTrackID = await TrackPlayer.getCurrentTrack();
      const thisPos = positions.indexOf(thisTrackID);
      await TrackPlayer.skip(positions[thisPos + 1]);
    } catch (_) {}
  }

  async function skipToPreviousOG() {
    try {
      const positions = fn.js.vLookup(_npTracks, "id"); //* [1111,2222,3333,4444]
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
            const queue = await TrackPlaya.getInstance().getQueue();
            setPlayaTracks(queue);
            setNPTracks(queue);
          }}
        >
          Queue: {JSON.stringify(_playaTracks.length)} (should == [])
        </Text>
        <Text
          style={styles.state}
          onPress={() => {
            shuffle(_indexedTracks);
          }}
        >
          {"Shuffle: " + _isShuffled}
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
          <Text style={{ fontWeight: "bold" }}>
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
