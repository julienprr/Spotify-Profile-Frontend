import DefaultPlaylistCover from '@/assets/images/default_playlist_cover.jpg';
import type { PlaylistProps } from '@/types/playlist';
import { Heart, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const Playlist = ({
  playlist,
  handleToggleFavorite,
  handleToggleAutoSort,
}: {
  playlist: PlaylistProps;
  handleToggleFavorite: (id: string) => void;
  handleToggleAutoSort: (id: string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-md hover:bg-muted">
      <div key={playlist.id} className="shrink-0">
        <div className="w-12 overflow-hidden">
          <img
            src={playlist.imageUrl ?? DefaultPlaylistCover}
            alt={playlist.name}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col items-start">
        <div
          onClick={() => navigate(`/playlist/${playlist.id}`)}
          className="max-w-50 truncate text-sm font-bold text-foreground"
        >
          {playlist.name}
        </div>
        <div className="flex flex-row items-center space-x-1">
          <span className="text-sm font-normal text-muted-foreground">{playlist.totalTracks} tracks</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          onClick={() => handleToggleFavorite(playlist.id)}
          variant="ghost"
          title={playlist.isFavorite ? 'Remove the playlist from favorite' : 'Add the playlist to favorite'}
        >
          {playlist.isFavorite ? (
            <Heart className="h-4 w-4 fill-primary text-primary" />
          ) : (
            <Heart className="h-4 w-4 text-primary" />
          )}
        </Button>
        <Button
          onClick={() => handleToggleAutoSort(playlist.id)}
          variant="ghost"
          title={playlist.autoSort ? 'Deactivate Auto Sort' : 'Activate Auto Sort'}
        >
          <RefreshCw className={`h-4 w-4 ${playlist.autoSort ? 'text-blue-400' : 'text-foreground'}`} />
        </Button>
      </div>
    </div>
  );
};

export default Playlist;
