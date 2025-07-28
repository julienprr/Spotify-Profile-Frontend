import Track from '@/components/track/Track';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { usePlaylistActions } from '@/hooks/usePlaylistActions';
import type { RootState } from '@/store/store';
import type { PlaylistDetails } from '@/types/playlist';
import { Heart, ListMusic, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { usePlaylist } from '@/hooks/usePlaylist';
import { useParams } from 'react-router-dom';
import PlaylistCover from '../../components/playlist/PlaylistCover';
import ConfirmClearDialog from './dialogs/ConfirmClearDialog';
import ConfirmCopyDialog from './dialogs/ConfirmCopyDialog';

const Actions = ({
  setIsCopyDialogOpen,
  setIsClearDialogOpen,
  handleSortPlaylist,
  handleshufflePlaylist,
  handleToggleFavorite,
  handleToggleAutoSort,
  isFavorite,
  autoSort,
}: {
  setIsCopyDialogOpen: (open: boolean) => void;
  setIsClearDialogOpen: (open: boolean) => void;
  handleSortPlaylist: () => void;
  handleshufflePlaylist: () => void;
  handleToggleFavorite: () => void;
  handleToggleAutoSort: () => void;
  isFavorite: boolean;
  autoSort: boolean;
}) => {
  return (
    <div className="my-4 flex flex-row items-center gap-1">
      <Button
        onClick={handleToggleFavorite}
        variant="action"
        title={isFavorite ? 'Remove the playlist from favorite' : 'Add the playlist to favorite'}
      >
        {isFavorite ? (
          <>
            <Heart className="h-4 w-4 fill-primary text-primary" />
            Remove
          </>
        ) : (
          <>
            <Heart className="h-4 w-4 text-primary" />
            Add
          </>
        )}
      </Button>
      <Button
        onClick={handleToggleAutoSort}
        variant="action"
        title={autoSort ? 'Do not automatically sort the playlist' : 'Automatically sort the playlist'}
      >
        {autoSort ? (
          <>
            <RefreshCw className="h-4 w-4 text-blue-400" />
            Auto Sort
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 text-foreground" />
            Auto Sort
          </>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="action">
            <ListMusic className="h-4 w-4 text-foreground" />
            Manage
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg border border-muted bg-background px-2">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuItem onClick={() => setIsCopyDialogOpen(true)}>Copy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsClearDialogOpen(true)}>Clear</DropdownMenuItem>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Reorder</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-lg border border-muted bg-background px-2">
                  <DropdownMenuItem onClick={handleSortPlaylist}>Sort by release date</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleshufflePlaylist}>Shuffle playlist</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const PlaylistDetails = () => {
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);

  const { id } = useParams();
  const {
    handleCopyPlaylist: copyPlaylist,
    handleClearPlaylist,
    handleShufflePlaylist,
    handleSortPlaylist,
    handleToggleFavorite,
    handleToggleAutoSort,
  } = usePlaylistActions();

  const onCopyPlaylist = (destinationId: string) => {
    if (id) {
      copyPlaylist({ playlistSourceId: id, playlistDestinationId: destinationId });
      setIsCopyDialogOpen(false);
    }
  };

  const breakpoint = useBreakpoint();
  const playlists = useSelector((state: RootState) => state.playlists.items);

  if (!id) {
    return <div className="bg-background p-4 text-foreground">ID de playlist invalide.</div>;
  }

  usePlaylist(id!);
  const playlist = useSelector((state: RootState) => state.playlists.selected[id!]) as PlaylistDetails | undefined;

  if (!playlist) {
    return <div className="bg-background p-4 text-foreground">Playlist introuvable.</div>;
  }

  const tracks = Array.isArray(playlist.tracks) ? playlist.tracks : [];
  const isFavorite = playlist.isFavorite;
  const autoSort = playlist.autoSort;

  if (breakpoint === 'mobile' && tracks.length > 0) {
    return (
      <div className="flex flex-col items-center pt-16 text-foreground">
        <PlaylistCover playlist={playlist} isLoading={false} />
        <Actions
          setIsCopyDialogOpen={setIsCopyDialogOpen}
          setIsClearDialogOpen={setIsClearDialogOpen}
          handleSortPlaylist={() => handleSortPlaylist(id)}
          handleshufflePlaylist={() => handleShufflePlaylist(id)}
          handleToggleFavorite={() => handleToggleFavorite(id)}
          handleToggleAutoSort={() => handleToggleAutoSort(id)}
          isFavorite={isFavorite}
          autoSort={autoSort}
        />
        <ConfirmClearDialog
          isOpen={isClearDialogOpen}
          setIsOpen={setIsClearDialogOpen}
          onConfirm={() => handleClearPlaylist(id)}
        />
        <ConfirmCopyDialog
          isOpen={isCopyDialogOpen}
          setIsOpen={setIsCopyDialogOpen}
          handleCopyPlaylist={onCopyPlaylist}
          playlist={playlist}
          playlists={playlists}
        />
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
        <Actions
          setIsCopyDialogOpen={setIsCopyDialogOpen}
          setIsClearDialogOpen={setIsClearDialogOpen}
          handleSortPlaylist={() => handleSortPlaylist(id)}
          handleshufflePlaylist={() => handleShufflePlaylist(id)}
          handleToggleFavorite={() => handleToggleFavorite(id)}
          handleToggleAutoSort={() => handleToggleAutoSort(id)}
          isFavorite={isFavorite}
          autoSort={autoSort}
        />
        <ConfirmClearDialog
          isOpen={isClearDialogOpen}
          setIsOpen={setIsClearDialogOpen}
          onConfirm={() => handleClearPlaylist(id)}
        />
        <ConfirmCopyDialog
          isOpen={isCopyDialogOpen}
          setIsOpen={setIsCopyDialogOpen}
          handleCopyPlaylist={onCopyPlaylist}
          playlist={playlist}
          playlists={playlists}
        />
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
