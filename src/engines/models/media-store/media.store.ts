// @ts-check

import { flow, getParent, types } from "mobx-state-tree";
import { getMedia } from "../../functions/media-functions";
import { DOC_Track } from "./track-doc/track.doc";

export function MediaStore() {
  return types
    .model("Media Store", {
      g_tracks: types.array(DOC_Track),
      g_isTracksLoaded: types.maybeNull(types.boolean),
    })
    .views((self) => ({
      get mediaFiles() {
        return getParent(self);
      },
    }))
    .actions((self) => ({
      g_fetchTracks: flow(function* () {
        console.log("fetching...");
        try {
          const r = yield getMedia(self.g_isTracksLoaded);
          const tracks = r.payload;
          self.g_tracks = tracks;
          console.log("teacks: ", tracks.length);
        } catch (error) {
          console.warn("err", error);
        }
        // console.log("tracks: ", tracks.length);
        // const __trackDoc = DOC_Track.create({ id: "____" });
        // for (var i = 0; i < tracks.length; i++) {
        //   self.g_tracks.put(tracks[i]);
        // }
      }),
    }));
}
