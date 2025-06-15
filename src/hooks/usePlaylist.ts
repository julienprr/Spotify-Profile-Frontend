import { fetchPlaylistById } from '@/store/slices/playlistsSlice';
import type { AppDispatch, RootState } from '@/store/store';
import type { PlaylistDetails } from '@/types/playlist';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const usePlaylist = (id: string): PlaylistDetails | undefined => {
  const dispatch = useDispatch<AppDispatch>();

  const playlist = useSelector((state: RootState) => state.playlists.selected[id]);

  useEffect(() => {
    console.log("Playlist ID: ", id);

    if (!playlist) {
      dispatch(fetchPlaylistById(id));
    }
  }, [id, playlist, dispatch]);

  return playlist;
};
