import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getUserPlaylists } from '@/api/play-manager.service';
import type { PlaylistProps } from '@/components/playlist/Playlist';


interface PlaylistsState {
  items: PlaylistProps[];
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
      .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<PlaylistProps[]>) => {
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
