import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import PlaylistCoverSkeleton from './PlaylistCoverSkeleton';
import type { PlaylistProps } from '@/types/playlist';

const PlaylistCover = ({ playlist, isLoading }: { playlist: PlaylistProps; isLoading: boolean }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <PlaylistCoverSkeleton />;
  }

  return (
    <div
      key={playlist.id}
      className="flex cursor-pointer flex-col items-center gap-5 text-center transition-transform hover:scale-105"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <div className="h-[200px] w-[200px] overflow-hidden rounded-md">
        <img
          src={playlist.imageUrl}
          alt={playlist.name}
          className="h-full w-full object-cover transition-transform duration-300"
        />
      </div>
      <div>
        <Button variant="link">{playlist.name}</Button>
        <p className="text-muted-foreground">{playlist.totalTracks} tracks</p>
      </div>
    </div>
  );
};

export default PlaylistCover;
