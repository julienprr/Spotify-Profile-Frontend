import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getUserPlaylistById, getUserPlaylists } from '@/api/play-manager.service';
import type { PlaylistDetails, PlaylistProps, PlaylistSummary } from '@/types/playlist';


interface PlaylistsState {
  items: PlaylistSummary[];
  selected: Record<string, PlaylistDetails>
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlaylistsState = {
  items: [],
  selected: {},
  status: 'idle',
  error: null,
};

export const fetchPlaylists = createAsyncThunk('playlists/fetchPlaylists', async () => {
  const response = await getUserPlaylists();
  return response.data.playlists;
});

export const fetchPlaylistById = createAsyncThunk('playlists/fetchById', async (id: string) => {
  const response = await getUserPlaylistById({ playlistId: id });
  console.log("PLAYLIST", response.data.playlist);

  return response.data.playlist;
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
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action: PayloadAction<PlaylistDetails>) => {
        state.selected[action.payload.id] = action.payload;
      })
  },
});

export default playlistsSlice.reducer;
