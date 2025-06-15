import Track from '@/components/track/Track';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { usePlaylist } from '@/hooks/usePlaylist';
import type { PlaylistDetails } from '@/types/playlist';
import { useParams } from 'react-router-dom';
import PlaylistCover from '../components/playlist/PlaylistCover';

const PlaylistDetails = () => {
  const { id } = useParams();
  const breakpoint = useBreakpoint();
  if (!id) {
    return <div className="bg-background p-4 text-foreground">ID de playlist invalide.</div>;
  }
  const playlist: PlaylistDetails | undefined = usePlaylist(id);

  const tracks = Array.isArray(playlist?.tracks) ? playlist.tracks : [];
  if (!playlist) {
    return <div className="bg-background p-4 text-foreground">Playlist introuvable.</div>;
  }

  if (breakpoint === 'mobile' && tracks.length > 0) {
    return (
      <div className="flex flex-col items-center p-4 text-foreground">
        <PlaylistCover playlist={playlist} isLoading={false} />
        <div className="my-4">
          <Button>Action</Button>
        </div>
        <div className="w-full space-y-4">
          {tracks.map((track: any) => (
            <Track key={track.id} track={track} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-row bg-background px-12 py-8 text-foreground">
      <div className="flex w-1/3 flex-col items-center gap-6">
        <PlaylistCover playlist={playlist} isLoading={false} />
        <Button>Action</Button>
      </div>
      <div className="w-2/3 space-y-4 px-8">
        {tracks.map((track: any) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;
