import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylists } from '@/store/slices/playlistsSlice';
import type { AppDispatch, RootState } from '@/store/store';

export const usePlaylists = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.playlists);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPlaylists());
    }
  }, [status, dispatch]);

  const isLoading = status === 'loading';
  const isError = status === 'failed';

  const sortedPlaylists = [...items].sort((a, b) => {
    if (a.id === 'liked-songs') return -1;
    if (b.id === 'liked-songs') return 1;

    return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
  });

  return { playlists: sortedPlaylists, isLoading, isError, error };
};
