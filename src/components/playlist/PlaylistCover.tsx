import { cn } from '@/lib/utils';
import type { PlaylistProps } from '@/types/playlist';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import PlaylistCoverSkeleton from './PlaylistCoverSkeleton';
import DefaultPlaylistCover from '@/assets/images/default_playlist_cover.jpg';

type PlaylistCoverProps = {
  playlist?: PlaylistProps;
  isLoading: boolean;
  variant?: 'default' | 'grid';
};

const PlaylistCover: React.FC<PlaylistCoverProps> = ({ playlist, isLoading, variant = 'default' }) => {
  const navigate = useNavigate();

  if (isLoading|| playlist == undefined) {
    return <PlaylistCoverSkeleton />;
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 text-center transition-transform',
        variant === 'grid' && 'w-[200px] cursor-pointer hover:scale-105',
        variant === 'default' && 'w-[200px] sm:w-[300px]'
      )}
      onClick={() => variant === 'grid' && navigate(`/playlist/${playlist.id}`)}
    >
      <div
        className={cn(
          'mb-5 overflow-hidden rounded-md',
          variant === 'grid' ? 'h-[200px] w-[200px]' : 'w-[200px]h-[200px] sm:h-[300px] sm:w-[300px]'
        )}
      >
        <img
          src={playlist.imageUrl ?? DefaultPlaylistCover}
          alt={playlist.name}
          className="h-full w-full object-cover transition-transform duration-300"
        />
      </div>

      {variant === 'default' ? (
        <>
          <h2 className="text-lg font-bold text-foreground">{playlist.name}</h2>
          <p className="text-sm text-foreground">By {playlist.ownerName}</p>
          <p className="text-muted-foreground">{playlist.totalTracks} tracks</p>
        </>
      ) : (
        <div>
          <Button variant="link">{playlist.name}</Button>
          <p className="text-muted-foreground">{playlist.totalTracks} tracks</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistCover;
