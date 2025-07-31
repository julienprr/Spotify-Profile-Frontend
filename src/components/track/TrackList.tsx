import defaultTrackCover from '@/assets/images/default_track_cover_small.jpg';
import type { TTrack } from './Track';
import Track from './Track';
import TrackSkeleton from './TrackSkeleton';

const TrackList = ({ items, isLoading }: { items: any; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6">
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
        <TrackSkeleton />
      </div>
    );
  }

  if (!isLoading && items.length > 0) {
    return (
      <>
        <div className="flex flex-col space-y-4 sm:space-y-6">
          {items.map((item: TTrack) => {
            const track = {
              id: item.id,
              name: item.name,
              artistName: item.artistName || 'undefined',
              albumName: item.albumName,
              isExplicit: item.isExplicit,
              imageUrl: item.imageUrl || defaultTrackCover,
              duration: item.duration,
            };

            return <Track key={track.id} track={track} isLoading={isLoading} />;
          })}
        </div>
      </>
    );
  }
};

export default TrackList;
