import { fetchPlaylistById } from '@/store/slices/playlistsSlice';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const usePlaylist = (id: string): void => {
  const dispatch = useDispatch<AppDispatch>();
  const playlist = useSelector((state: RootState) => state.playlists.selected[id]);

  useEffect(() => {
    if (id && !playlist) {
      dispatch(fetchPlaylistById(id));
    }
  }, [id, playlist, dispatch]);
};
