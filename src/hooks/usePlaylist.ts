import { useAuth } from '@/contexts/AuthProvider';
import { fetchPlaylistById } from '@/store/slices/playlistsSlice';
import type { AppDispatch, RootState } from '@/store/store';
import type { PlaylistDetails } from '@/types/playlist';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const usePlaylist = (
  id: string
): {
  playlist: PlaylistDetails | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();

  const playlist = useSelector((state: RootState) => state.playlists.selected[id]);
  const status = useSelector((state: RootState) => state.playlists.selectedStatus[id]);
  const error = useSelector((state: RootState) => state.playlists.selectedError[id]);

  useEffect(() => {
    if (isAuthenticated && id && !playlist && status !== 'loading') {
      dispatch(fetchPlaylistById(id));
    }
  }, [id, playlist, status, dispatch]);

  return { playlist, status, error };
};
