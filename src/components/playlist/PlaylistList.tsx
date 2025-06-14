import type { PlaylistProps } from './Playlist';
import Playlist from './Playlist';
import PlaylistSkeleton from './PlaylistSkeleton';

const PlaylistList = ({ items, isLoading }: { items: PlaylistProps[]; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6">
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
        <div className="flex flex-col space-y-4">
          {items.map((item: PlaylistProps) => {
            const playlist: PlaylistProps = {
                id: item.id,
                name: item.name,
                tracksNumber: item.tracksNumber,
                ownerName: item.ownerName,
                isFavorite: item.isFavorite,
                autoSort: item.autoSort,
                imageUrl: item.imageUrl
            };

            return <Playlist key={playlist.id} playlist={playlist} />;
          })}
        </div>
      </>
    );
  }
};

export default PlaylistList;
