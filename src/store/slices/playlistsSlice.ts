import { getUserPlaylists } from '@/api/play-manager/playlist.service';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface Playlist {
  id: string;
  name: string;
  tracksNumber: string;
  ownerName: string;
  imageUrl?: string;
  isFavorite: boolean;
}

interface PlaylistsState {
  items: Playlist[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlaylistsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async () => {
  const response = await getUserPlaylists();
  return response.data.playlists;
});

export const selectTopPlaylists = (state: RootState) => {
  const data = [...state.playlists.items];

  const sortedData = data.sort((a: Playlist, b: Playlist) => {
    return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
  });

  const slicedData = sortedData.slice(0, 5);

  return slicedData;
};

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    // Actions pour ajouter, copier ou modifier les playlists si nécessaire
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<Playlist[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch playlists';
      });
  },
});

export default playlistsSlice.reducer;
