import type { ArtistProps } from '@/types/artist';
import { useNavigate } from 'react-router-dom';

const Artist = ({ artist }: { artist: ArtistProps }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4">
      <div key={artist.id} className="shrink-0">
        <div
          className="h-[50px] w-[50px] overflow-hidden rounded-full sm:h-[80px] sm:w-[80px]"
          onClick={() => navigate(`/artist/${artist.id}`)}
        >
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover transition duration-100 ease-in-out hover:brightness-75 cursor-pointer"
          />
          </div>
      </div>
      <div className="flex flex-col items-start space-y-1">
        <span onClick={() => navigate(`/artist/${artist.id}`)} className="font-semibold text-foreground hover:underline cursor-pointer" >
          {artist.name}
        </span>
        <span className="text-sm font-normal text-muted-foreground">{artist.followers} followers</span>
      </div>
    </div>
  );
};

export default Artist;
