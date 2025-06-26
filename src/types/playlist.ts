import type { TrackProps } from '@/components/track/Track';

export type PlaylistProps = {
  id: string;
  name: string;
  ownerName: string;
  description: string;
  totalTracks: string;
  imageUrl: string;
  spotifyUrl: string;
  public: boolean;
  isFavorite: boolean;
  autoSort: boolean;
  tracks?: any;
};

export type PlaylistSummary = Omit<PlaylistProps, 'tracks'>;

export type PlaylistDetails = PlaylistProps & { tracks: TrackProps[] };
