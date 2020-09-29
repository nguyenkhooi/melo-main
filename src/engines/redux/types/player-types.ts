const set_playback = "set_playback";

export interface SetPlayerAction {
  type: typeof set_playback;
  payload: boolean;
}

export interface dPlayerState {
  isPlaying: boolean;
}

export type dPlayerAction = SetPlayerAction;
