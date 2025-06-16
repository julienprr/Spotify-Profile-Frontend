import type React from 'react';
import { Skeleton } from '../ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ArtistProps } from '@/types/artist';
import DefaultPlaylistCover from '@/assets/images/default_playlist_cover.jpg';
import { Button } from '../ui/button';

type ArtistAvatarProps = {
  artist: ArtistProps;
  isLoading: boolean;
  variant?: 'default' | 'grid';
};

const ArtistAvatar: React.FC<ArtistAvatarProps> = ({ artist, isLoading, variant = 'default' }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Skeleton
        className={cn(
          'rounded-full',
          variant === 'grid' && 'w-[200px] cursor-pointer hover:scale-105',
          variant === 'default' && 'w-[200px] sm:w-[300px]'
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 text-center transition-transform',
        variant === 'grid' && 'w-[200px] cursor-pointer hover:scale-105',
        variant === 'default' && 'w-[200px] sm:w-[300px]'
      )}
      onClick={() => variant === 'grid' && navigate(`/artist/${artist.id}`)}
    >
      <div
        className={cn(
          'mb-5 overflow-hidden rounded-full',
          variant === 'grid' ? 'h-[200px] w-[200px]' : 'w-[200px]h-[200px] sm:h-[300px] sm:w-[300px]'
        )}
      >
        <img
          src={artist.imageUrl ?? DefaultPlaylistCover}
          alt={artist.name}
          className="h-full w-full object-cover transition-transform duration-300"
        />
      </div>

      {variant === 'default' ? (
        <>
          <h2 className="text-4xl font-bold text-foreground">{artist.name}</h2>
        </>
      ) : (
        <div>
          <Button variant="link">{artist.name}</Button>
        </div>
      )}
    </div>
  );
};

export default ArtistAvatar;
