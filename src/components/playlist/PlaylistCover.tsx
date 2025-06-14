import { useNavigate } from 'react-router-dom';
import type { PlaylistProps } from './Playlist';
import { Button } from '../ui/button';
import PlaylistCoverSkeleton from './PlaylistCoverSkeleton';

const PlaylistCover = ({ playlist, isLoading }: { playlist: PlaylistProps; isLoading: boolean }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <PlaylistCoverSkeleton />
      </>
    );
  } else {
    return (
      <div key={playlist.id} className="flex flex-col items-center gap-5 text-center">
        <div className="h-[300px] w-[300px]">
          <img src={playlist.imageUrl} alt={playlist.name} className="h-fit w-fit object-cover" />
        </div>
        <div>
          <Button variant={'link'} onClick={() => navigate('/playlist/:id')}>
            {playlist.name}
          </Button>
          <p className="text-muted-foreground">{playlist.tracksNumber} tracks</p>
        </div>
      </div>
    );
  }
};

export default PlaylistCover;
