import PlaylistCover from '@/components/playlist/PlaylistCover';
import PlaylistList from '@/components/playlist/PlaylistList';
import ThemeToggle from '@/components/ThemeToggle';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { usePlaylists } from '@/hooks/usePlaylists';
import type { PlaylistProps } from '@/types/playlist';

const Playlists = () => {
  const breakpoint = useBreakpoint();
  const { playlists, isLoading } = usePlaylists();

  if (breakpoint === 'mobile') {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
        <div className="mt-10 mb-5 text-center">
          <h2 className="text-2xl font-bold">My Playlists</h2>
        </div>
        <PlaylistList items={playlists} isLoading={isLoading} />
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background px-4 pt-20 text-foreground">
        <ThemeToggle />
          <h1 className="text-6xl font-semibold mb-20">My Playlists</h1>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
            {playlists.map((item: PlaylistProps) => (
              <PlaylistCover key={item.id} playlist={item} isLoading={isLoading} variant='grid'/>
            ))}
          </div>
      </div>
    );
  }
};
export default Playlists;
