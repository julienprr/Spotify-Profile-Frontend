import { cn } from '@/lib/utils';
import type { PlaylistProps } from '@/types/playlist';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import PlaylistCoverSkeleton from './PlaylistCoverSkeleton';

type PlaylistCoverProps = {
  playlist: PlaylistProps;
  isLoading: boolean;
  variant?: 'default' | 'grid';
};

const PlaylistCover: React.FC<PlaylistCoverProps> = ({ playlist, isLoading, variant = 'default' }) => {
  const navigate = useNavigate();

  if (isLoading) {
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
          'overflow-hidden rounded-md mb-5',
          variant === 'grid' ? 'h-[200px] w-[200px]' : 'w-[200px]h-[200px] sm:h-[300px] sm:w-[300px]'
        )}
      >
        <img
          src={playlist.imageUrl}
          alt={playlist.name}
          className="h-full w-full object-cover transition-transform duration-300"
        />
      </div>

      {variant === 'default' ? (
        <>
          <h2 className="text-lg text-foreground font-bold">{playlist.name}</h2>
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
