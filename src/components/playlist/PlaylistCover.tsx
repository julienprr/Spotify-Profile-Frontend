import { cn } from '@/lib/utils';
import type { PlaylistProps } from '@/types/playlist';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import PlaylistCoverSkeleton from './PlaylistCoverSkeleton';
import DefaultPlaylistCover from '@/assets/images/default_playlist_cover.jpg';
import LikedSongsCover from "@/assets/images/liked-songs-cover.jpg"

type PlaylistCoverProps = {
  playlist?: PlaylistProps;
  isLoading: boolean;
  variant?: 'default' | 'grid';
};

const PlaylistCover: React.FC<PlaylistCoverProps> = ({ playlist, isLoading, variant = 'default' }) => {
  const navigate = useNavigate();

  if (isLoading || playlist == undefined) {
    return <PlaylistCoverSkeleton />;
  }

  const displayCover = () => {
    if (playlist.id == 'liked-songs') {
      return LikedSongsCover;

    }
    return playlist.imageUrl ?? DefaultPlaylistCover;
  };

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
          src={displayCover()}
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
        <div className="flex flex-col items-center text-center">
          <div className="relative flex w-full items-center justify-center">
            <Button variant="link" className="text-base font-medium">
              {playlist.name}
            </Button>

            {/* <div className="absolute top-1/2 -right-14 flex -translate-y-1/2 space-x-1">
              {playlist.isFavorite && <Dot className="h-10 w-10 fill-primary text-primary" />}
              {playlist.autoSort && <Dot className="h-10 w-10 fill-blue-400 text-blue-400" />}
            </div> */}
          </div>

          <p className="text-sm text-muted-foreground">{playlist.totalTracks} tracks</p>
        </div>
      )}
    </div>
  );
};

export default PlaylistCover;
