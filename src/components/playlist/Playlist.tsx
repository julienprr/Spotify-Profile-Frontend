export type PlaylistProps = {
  id: string;
  name: string;
  tracksNumber: string;
  ownerName: string;
  imageUrl: string;
  isFavorite: boolean;
  autoSort: boolean;
};

const Playlist = ({ playlist }: { playlist: PlaylistProps }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div key={playlist.id} className="shrink-0">
          <div className="w-12 overflow-hidden">
            <img src={playlist.imageUrl} alt={playlist.name} className="h-auto w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <div className="truncate text-sm font-bold text-foreground">{playlist.name}</div>
          <div className="flex flex-row items-center space-x-1">
            <span className="text-sm font-normal text-muted-foreground">{playlist.tracksNumber} tracks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
