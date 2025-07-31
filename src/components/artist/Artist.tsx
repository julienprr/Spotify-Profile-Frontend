import type { ArtistProps } from '@/types/artist';
import { useNavigate } from 'react-router-dom';

const Artist = ({ artist }: { artist: ArtistProps }) => {
  const navigate = useNavigate();

  return (
    <div className="group flex cursor-pointer items-center space-x-4" onClick={() => navigate(`/artist/${artist.id}`)}>
      <div key={artist.id} className="shrink-0">
        <div className="h-[50px] w-[50px] overflow-hidden rounded-full sm:h-[60px] sm:w-[60px]">
          <img src={artist.imageUrl} alt={artist.name} className="h-auto w-full object-cover" />
        </div>
      </div>
      <div className="flex flex-col items-start space-y-1">
        <p className="text-sm font-semibold group-hover:underline">{artist.name}</p>
        <span className="text-sm text-muted-foreground">{artist.followers} followers</span>
      </div>
    </div>
  );
};

export default Artist;
