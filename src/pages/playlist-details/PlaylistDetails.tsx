import Track from '@/components/track/Track';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { usePlaylist } from '@/hooks/usePlaylist';
import { usePlaylistActions } from '@/hooks/usePlaylistActions';
import type { RootState } from '@/store/store';
import type { PlaylistDetails } from '@/types/playlist';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PlaylistCover from '../../components/playlist/PlaylistCover';
import ConfirmClearDialog from './dialogs/ConfirmClearDialog';
import ConfirmCopyDialog from './dialogs/ConfirmCopyDialog';
import Actions from './PlaylistDetailsActions';

const PlaylistDetails = () => {
  const [isCopyDialogOpen, setIsCopyDialogOpen] = useState(false);
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const { id: selectedId } = useParams();

  const {
    handleCopyPlaylist,
    handleClearPlaylist,
    handleShufflePlaylist,
    handleSortPlaylist,
    handleToggleFavorite,
    handleToggleAutoSort,
  } = usePlaylistActions();

  const onCopyPlaylist = (destinationId: string) => {
    if (selectedId) {
      handleCopyPlaylist({ playlistSourceId: selectedId, playlistDestinationId: destinationId });
      setIsCopyDialogOpen(false);
    }
  };

  const breakpoint = useBreakpoint();
  const playlists = useSelector((state: RootState) => state.playlists.items);

  if (!selectedId) {
    return <div className="bg-background p-4 text-foreground">ID de playlist invalide.</div>;
  }

  usePlaylist(selectedId!);
  const playlist = useSelector((state: RootState) => state.playlists.selected[selectedId!]) as PlaylistDetails | undefined;
  const status = useSelector((state: RootState) => state.playlists.selectedStatus[selectedId]);
  const error = useSelector((state: RootState) => state.playlists.selectedError[selectedId]);

  if (status === 'failed') {
    return <div className="p-4 text-red-500">Erreur lors du chargement de la playlist : {error}</div>;
  }

  if (!playlist && status !== 'loading') {
    return null;
  }

  const isFavorite = playlist?.isFavorite ?? false;
  const autoSort = playlist?.autoSort ?? false;
  const tracks = Array.isArray(playlist?.tracks) ? playlist.tracks : new Array(10).fill(undefined);

  if (breakpoint === 'mobile') {
    return (
      <div className="flex flex-col items-center pt-16 text-foreground">
        <PlaylistCover playlist={playlist} isLoading={status === 'loading'} />
        <Actions
          setIsCopyDialogOpen={setIsCopyDialogOpen}
          setIsClearDialogOpen={setIsClearDialogOpen}
          handleSortPlaylist={() => handleSortPlaylist(selectedId)}
          handleshufflePlaylist={() => handleShufflePlaylist(selectedId)}
          handleToggleFavorite={() => handleToggleFavorite(selectedId)}
          handleToggleAutoSort={() => handleToggleAutoSort(selectedId)}
          isFavorite={isFavorite}
          autoSort={autoSort}
          isLoading={status === 'loading'}
        />
        <ConfirmClearDialog
          isOpen={isClearDialogOpen}
          setIsOpen={setIsClearDialogOpen}
          onConfirm={() => handleClearPlaylist(selectedId)}
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
            <Track key={track?.id || Math.random()} track={track} isLoading={status === 'loading'} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-row bg-background px-12 py-8 text-foreground">
      <div className="flex w-1/3 flex-col items-center gap-6">
        <PlaylistCover playlist={playlist} isLoading={status === 'loading'} />
        <Actions
          setIsCopyDialogOpen={setIsCopyDialogOpen}
          setIsClearDialogOpen={setIsClearDialogOpen}
          handleSortPlaylist={() => handleSortPlaylist(selectedId)}
          handleshufflePlaylist={() => handleShufflePlaylist(selectedId)}
          handleToggleFavorite={() => handleToggleFavorite(selectedId)}
          handleToggleAutoSort={() => handleToggleAutoSort(selectedId)}
          isFavorite={isFavorite}
          autoSort={autoSort}
          isLoading={status === 'loading'}
        />
        <ConfirmClearDialog
          isOpen={isClearDialogOpen}
          setIsOpen={setIsClearDialogOpen}
          onConfirm={() => handleClearPlaylist(selectedId)}
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
          <Track key={track?.id || Math.random()} track={track} isLoading={status === 'loading'} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetails;
