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

  return { playlists: items, status, error, isLoading };
};
