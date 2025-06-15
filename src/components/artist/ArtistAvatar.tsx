import type React from 'react';
import type { ArtistProps } from './Artist';
import { Skeleton } from '../ui/skeleton';

type ArtistAvatarProps = {
  artist: ArtistProps;
  isLoading: boolean;
};
const ArtistAvatar: React.FC<ArtistAvatarProps> = ({ artist, isLoading }) => {
  if (isLoading) {
    return <Skeleton className="h-[200px] w-[200px] rounded-full" />;
  }

  return (
    <div key={artist.id} className="shrink-0">
      <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
        <img src={artist.imageUrl} alt={artist.name} className="h-fit w-fit object-cover" />
      </div>
    </div>
  );
};

export default ArtistAvatar;
