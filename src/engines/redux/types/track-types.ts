import { TrackProps } from "utils";
export const DELETE_TRACK = "delete_track";
export const RENAME_TRACK = "rename_track";

export interface DeleteTrackAction {
  type: typeof DELETE_TRACK;
  payload: TrackProps;
}

export interface RenameTrackAction {
  type: typeof RENAME_TRACK;
  payload: TrackProps;
}

export type DeleteTrackDispatch = (d: DeleteTrackAction) => void;

export type TrackTypes = DeleteTrackAction | RenameTrackAction;
