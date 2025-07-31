import {
  clearUserPlaylist,
  copyUserPlaylist,
  shuffleUserPlaylist,
  sortPlaylistByReleaseDate,
  toggleAutoSort,
  toggleFavorite,
} from '@/store/slices/playlistsSlice';
import type { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export const usePlaylistActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.playlists);

  const isLoading = status === 'loading';

  const handleCopyPlaylist = async ({
    playlistSourceId,
    playlistDestinationId,
  }: {
    playlistSourceId: string;
    playlistDestinationId: string;
  }) => {
    try {
      await dispatch(copyUserPlaylist({ playlistSourceId, playlistDestinationId })).unwrap();
      toast.success('Playlist copied successfully');
    } catch (error: any) {
      toast.error(`Failed to copy playlist: ${error.message || error}`);
    }
  };

  const handleClearPlaylist = async (playlistId: string) => {
    try {
      await dispatch(clearUserPlaylist({ playlistId })).unwrap();
      toast.success('Playlist cleared successfully');
    } catch (error: any) {
      toast.error(`Failed to clear playlist: ${error.message || error}`);
    }
  };

  const handleShufflePlaylist = async (playlistId: string) => {
    try {
      await dispatch(shuffleUserPlaylist({ playlistId })).unwrap();
      toast.success('Playlist shuffled successfully');
    } catch (error: any) {
      toast.error(`Failed to shuffle playlist: ${error.message || error}`);
    }
  };

  const handleSortPlaylist = async (playlistId: string) => {
    try {
      await dispatch(sortPlaylistByReleaseDate({ playlistId })).unwrap();
    } catch (error: any) {
      toast.error(`Failed to sort playlist: ${error.message || error}`);
    }
  };

  const handleToggleFavorite = async (playlistId: string) => {
    try {
      await dispatch(toggleFavorite(playlistId)).unwrap();
    } catch (error: any) {
      toast.error(`Failed to toggle favorite: ${error.message || error}`);
    }
  };

  const handleToggleAutoSort = async (playlistId: string) => {
    try {
      await dispatch(toggleAutoSort(playlistId)).unwrap();
      toast.success('Auto-sort toggled successfully');
    } catch (error: any) {
      toast.error(`Failed to toggle auto-sort: ${error.message || error}`);
    }
  };
  return {
    playlists: items,
    status,
    error,
    isLoading,
    handleCopyPlaylist,
    handleClearPlaylist,
    handleShufflePlaylist,
    handleSortPlaylist,
    handleToggleFavorite,
    handleToggleAutoSort,
  };
};
