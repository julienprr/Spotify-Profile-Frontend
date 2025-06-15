import { fetchTopTracks } from '@/store/slices/tracksSlice';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useTopTracks = (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term') => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error } = useSelector((state: RootState) => state.tracks);
  const tracks = items[timeRange] || [];

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopTracks());
    }
  }, [status, dispatch]);

  const isLoading = status === 'loading';

  return { tracks, status, error, isLoading };
};
