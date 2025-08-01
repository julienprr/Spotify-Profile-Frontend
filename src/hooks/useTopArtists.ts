import { useAuth } from '@/contexts/AuthProvider';
import { fetchTopArtists } from '@/store/slices/artistsSlice';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTopArtists = (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term') => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();

  const { items, status, error } = useSelector((state: RootState) => state.artists);
  const artists = items[timeRange] || [];

  useEffect(() => {
    if (isAuthenticated && status === 'idle') {
      dispatch(fetchTopArtists());
    }
  }, [status, dispatch]);

  const isLoading = status === 'loading';

  return { artists, status, error, isLoading };
};
