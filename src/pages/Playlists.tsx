import PlaylistCover from '@/components/playlist/PlaylistCover';
import PlaylistList from '@/components/playlist/PlaylistList';
import { ContextMenu, ContextMenuContent, ContextMenuItem } from '@/components/ui/context-menu';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { usePlaylistActions } from '@/hooks/usePlaylistActions';
import { usePlaylists } from '@/hooks/usePlaylists';
import type { PlaylistProps } from '@/types/playlist';
import { ContextMenuTrigger } from '@radix-ui/react-context-menu';

const Playlists = () => {
  const breakpoint = useBreakpoint();
  const { playlists, isLoading } = usePlaylists();

  const { handleToggleFavorite, handleToggleAutoSort } = usePlaylistActions();

  if (breakpoint === 'mobile') {
    return (
      <div className="flex-col">
        <div className="mt-10 mb-5 text-center">
          <h2 className="text-2xl font-bold">My Playlists</h2>
        </div>
        <PlaylistList items={playlists} isLoading={isLoading} handleToggleFavorite={handleToggleFavorite} handleToggleAutoSort={handleToggleAutoSort} />
      </div>
    );
  } else {
    return (
      <div className="flex-col px-4 pt-20">
        <h1 className="mb-20 text-6xl font-semibold">My Playlists</h1>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
          {playlists.map((item: PlaylistProps) => (
            <>
              <ContextMenu>
                <ContextMenuTrigger>
                  <PlaylistCover key={item.id} playlist={item} isLoading={isLoading} variant="grid" />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-48 rounded-lg border border-muted bg-background shadow-xl">
                  <ContextMenuItem onClick={() => handleToggleFavorite(item.id)}>
                    {item.isFavorite ? 'Remove from favorite' : 'Add to favorite'}
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handleToggleAutoSort(item.id)}>
                    {item.autoSort ? 'Deactivate Auto Sort' : 'Auto Sort Playlist'}
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <a href={item.spotifyUrl} target="_blank" rel="noopener noreferrer" title="See in Spotify">
                      Open in Spotify
                    </a>
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </>
          ))}
        </div>
      </div>
    );
  }
};
export default Playlists;
