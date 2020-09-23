// @ts-check

import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { DOC_Track } from "./track-doc/track.doc";
import { TracksActions } from "./actions/tracks.actions";
import { PlaybackActions } from "./actions/playback.actions";

export function MediaModel() {
  return types.model("Media Model", {
    /** Array of device's tracks */
    g_tracks: types.array(DOC_Track),

    /** Are tracks loaded? */
    g_areTracksLoaded: types.maybeNull(types.boolean),

    /** Current track playing */
    g_currentTrack: types.maybeNull(DOC_Track),
  });
}

export function MediaStore() {
  return types.compose(TracksActions(), PlaybackActions());
}

/**
 * The MediaStore instance.
 */
export interface dMediaStore extends Instance<typeof MediaStore> {}

/**
 * The data of a MediaStore.
 */
export type dMediaStoreSnapshot = SnapshotIn<typeof MediaStore>;
