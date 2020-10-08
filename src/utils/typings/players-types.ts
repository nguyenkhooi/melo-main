import { Track } from "react-native-track-player";

export interface TrackProps extends Track {}
export type dTracks = TrackProps[];
export type trackID = string;

export interface AlbumProps {
  album?: string;
  artist?: string;
  author?: string;
  cover?: string;
  id: string;
  name?: string;
  numberOfSongs?: number;
}

export interface ArtistProps {
  artist?: string;
  cover?: string;
  id: string;
  name: string;
}

export interface NavigationScreenProps {
  navigation?: any;
  route?: any;
}

export interface PlaylistProps {
  id: string;
  name: string;
  owner: string;
  songs?: TrackProps;
}
