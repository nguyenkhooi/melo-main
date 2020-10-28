import React from "react";
import { ScrollView } from "react-native";
import { S_Music } from "./s-musics";
import { S_Podcasts } from "./s-podcasts";

/**
 * Screen that shows music tracks + podcast tracks
 *
 * ---
 * @version 0.10.28
 *  - *Modularized*
 *  - *Renderfy*
 *  - *Clean Up*
 * @author nguyenkhooi
 */
export function TracksScreen(p) {
  return (
    <ScrollView style={{ flex: 1 }}>
      {/* <$_Podcasts {...p} /> */}
      {/* <$_Musics {...p} /> */}
    </ScrollView>
  );
}

const $_Podcasts = S_Podcasts;
const $_Musics = S_Music;
