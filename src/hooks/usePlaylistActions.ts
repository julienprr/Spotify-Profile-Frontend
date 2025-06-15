import {
  addPlaylistToFavorite,
  clearUserPlaylist,
  copyUserPlaylist,
  removePlaylistFromFavorite,
  shuffleUserPlaylist,
  sortPlaylistByReleaseDate,
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

  const handleAddFavoritePlaylist = (playlistId: string) => {
    dispatch(addPlaylistToFavorite({ playlistId }));
  };

   const handleRemoveFavoritePlaylist = (playlistId: string) => {
     dispatch(removePlaylistFromFavorite({ playlistId }));
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
    handleAddFavoritePlaylist,
    handleRemoveFavoritePlaylist
  };
};
