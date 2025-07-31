import type { PlaylistProps, PlaylistSummary } from '@/types/playlist';
import Playlist from './Playlist';
import PlaylistSkeleton from './PlaylistSkeleton';

const PlaylistList = ({
  items,
  isLoading,
  handleToggleFavorite,
  handleToggleAutoSort,
}: {
  items: PlaylistProps[];
  isLoading: boolean;
  handleToggleFavorite: (id: string) => void;
  handleToggleAutoSort: (id: string) => void;
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
        <PlaylistSkeleton />
      </div>
    );
  }

  if (!isLoading && items.length > 0) {
    return (
      <>
        <div className="flex flex-col space-y-3">
          {items.map((item: PlaylistSummary) => {
            const playlist: PlaylistSummary = {
              id: item.id,
              name: item.name,
              totalTracks: item.totalTracks,
              ownerName: item.ownerName,
              isFavorite: item.isFavorite,
              autoSort: item.autoSort,
              imageUrl: item.imageUrl,
              spotifyUrl: item.spotifyUrl,
              description: item.description,
              public: item.public,
            };

            return (
              <Playlist
                key={playlist.id}
                playlist={playlist}
                handleToggleFavorite={handleToggleFavorite}
                handleToggleAutoSort={handleToggleAutoSort}
              />
            );
          })}
        </div>
      </>
    );
  }
};

export default PlaylistList;
