import {
  clearUserPlaylist,
  copyUserPlaylist,
  shuffleUserPlaylist,
  sortPlaylistByReleaseDate,
  toggleFavorite,
} from '@/store/slices/playlistsSlice';
import type { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

export const usePlaylistActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.playlists);

  const isLoading = status === 'loading';

  const handleCopyPlaylist = ({
    playlistSourceId,
    playlistDestinationId,
  }: {
    playlistSourceId: string;
    playlistDestinationId: string;
  }) => {
    dispatch(copyUserPlaylist({ playlistSourceId, playlistDestinationId }));
  };

  const handleClearPlaylist = (playlistId: string) => {
    dispatch(clearUserPlaylist({ playlistId }));
  };

  const handleShufflePlaylist = (playlistId: string) => {
    dispatch(shuffleUserPlaylist({ playlistId }));
  };

  const handleSortPlaylist = (playlistId: string) => {
    dispatch(sortPlaylistByReleaseDate({ playlistId }));
  };

  const handleToggleFavorite = (playlistId: string) => {
    dispatch(toggleFavorite(playlistId));
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
  };
};
