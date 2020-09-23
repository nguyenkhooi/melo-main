import { SnapshotIn, types } from "mobx-state-tree";

/**
 * This, ideally, is what will appear in FRBS too!
 */
export const DOC_Track = types.model("Track Doc", {
  duration: types.maybeNull(types.union(types.string, types.number)),
  title: types.maybeNull(types.string),
  artist: types.maybeNull(types.string),
  album: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  genre: types.maybeNull(types.string),
  date: types.maybeNull(types.string),
  rating: types.maybeNull(types.union(types.boolean, types.number)),
  artwork: types.maybeNull(types.string),
  id: types.maybeNull(types.identifier),
  url: types.maybeNull(types.string),
  type: types.maybeNull(types.string),
  userAgent: types.maybeNull(types.string),
  pitchAlgorithm: types.maybeNull(types.string || types.number),
});

export type dTrack = SnapshotIn<typeof DOC_Track>;
export type enum_Track = keyof dTrack;
