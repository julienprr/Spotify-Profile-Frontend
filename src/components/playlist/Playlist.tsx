import type { PlaylistProps } from "@/types/playlist";
import DefaultPlaylistCover from '@/assets/images/default_playlist_cover.jpg';
import { useNavigate } from "react-router-dom";

const Playlist = ({ playlist }: { playlist: PlaylistProps }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row justify-between cursor-pointer"
      onClick={() => navigate(`/playlist/${playlist.id}`)}
    >
      <div className="flex flex-row items-center space-x-2">
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
          <div className="truncate text-sm font-bold text-foreground">{playlist.name}</div>
          <div className="flex flex-row items-center space-x-1">
            <span className="text-sm font-normal text-muted-foreground">{playlist.totalTracks} tracks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
