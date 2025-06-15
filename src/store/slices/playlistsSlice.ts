import {
  addFavoritePlaylist,
  clearPlaylist,
  copyPlaylist as copyPlaylistApi,
  getUserPlaylistById,
  getUserPlaylists,
  removeFavoritePlaylist,
  shufflePlaylist,
  SortPlaylistByReleaseDate,
} from '@/api/play-manager.service';
import type { PlaylistDetails, PlaylistSummary } from '@/types/playlist';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PlaylistsState {
  items: PlaylistSummary[];
  selected: Record<string, PlaylistDetails>;
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
  return response.playlists;
});

export const fetchPlaylistById = createAsyncThunk('playlists/fetchById', async (id: string) => {
  const response = await getUserPlaylistById({ playlistId: id });
  return response.playlist;
});

export const copyUserPlaylist = createAsyncThunk(
  'playlists/copyPlaylist',
  async (
    { playlistSourceId, playlistDestinationId }: { playlistSourceId: string; playlistDestinationId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await copyPlaylistApi({ playlistSourceId, playlistDestinationId });
      return response.playlist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sortPlaylistByReleaseDate = createAsyncThunk(
  'playlists/sortByReleaseDate',
  async ({ playlistId }: { playlistId: string }, { rejectWithValue }) => {
    try {
      const response = await SortPlaylistByReleaseDate({ playlistId });
      return response.playlist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const shuffleUserPlaylist = createAsyncThunk(
  'playlists/shuffle',
  async ({ playlistId }: { playlistId: string }, { rejectWithValue }) => {
    try {
      const response = await shufflePlaylist({ playlistId });
      return response.playlist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearUserPlaylist = createAsyncThunk(
  'playlists/clear',
  async ({ playlistId }: { playlistId: string }, { rejectWithValue }) => {
    try {
      const response = await clearPlaylist({ playlistId });
      return response.playlist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addPlaylistToFavorite = createAsyncThunk(
  'playlists/favorite/add',
  async ({ playlistId }: { playlistId: string }, { rejectWithValue }) => {
    try {
      await addFavoritePlaylist({ playlistId });
      const response = await getUserPlaylistById({ playlistId });
      return response.playlist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removePlaylistFromFavorite = createAsyncThunk(
  'playlists/favorite/remove',
  async ({ playlistId }: { playlistId: string }, { rejectWithValue }) => {
    try {
      const response = await removeFavoritePlaylist({ playlistId });
      console.log(response);

      return response.playlist;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<PlaylistSummary[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch playlists';
      })
      .addCase(fetchPlaylistById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action: PayloadAction<PlaylistDetails>) => {
        state.selected[action.payload.id] = action.payload;
      })
      .addCase(fetchPlaylistById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch playlist by ID';
      })
      .addCase(addPlaylistToFavorite.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const index = state.items.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.items[index].isFavorite = true;
        }

        if (state.selected[updated.id]) {
          state.selected[updated.id].isFavorite = true;
        }
      })
      .addCase(removePlaylistFromFavorite.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const index = state.items.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.items[index].isFavorite = false;
        }

        if (state.selected[updated.id]) {
          state.selected[updated.id].isFavorite = false;
        }
      })
      .addCase(clearUserPlaylist.fulfilled, (state, action: PayloadAction<PlaylistDetails>) => {
        const updated = action.payload;
        if (!updated) return;

        if (state.selected[updated.id]) {
          state.selected[updated.id] = updated;
        }
      });
  },
});

export default playlistsSlice.reducer;
