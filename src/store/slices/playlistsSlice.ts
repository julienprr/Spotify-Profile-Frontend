import {
  addAutoSortPlaylist,
  addFavoritePlaylist,
  clearPlaylist,
  copyPlaylist as copyPlaylistApi,
  getUserPlaylistById,
  getUserPlaylists,
  removeAutoSortPlaylist,
  removeFavoritePlaylist,
  shufflePlaylist,
  SortPlaylistByReleaseDate,
} from '@/api/play-manager.service';
import type { PlaylistDetails, PlaylistSummary } from '@/types/playlist';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PlaylistsState {
  items: PlaylistSummary[];
  selected: Record<string, PlaylistDetails>;
  selectedStatus: Record<string, 'idle' | 'loading' | 'succeeded' | 'failed'>;
  selectedError: Record<string, string | null>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlaylistsState = {
  items: [],
  selected: {},
  selectedStatus: {},
  selectedError: {},
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

export const toggleFavorite = createAsyncThunk(
  'playlists/favorite/toggle',
  async (playlistId: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as { playlists: PlaylistsState };
      const playlist = state.playlists.selected[playlistId];

      if (!playlist) {
        throw new Error('Playlist not found in state');
      }

      const wasFavorite = playlist.isFavorite;

      dispatch(toggleFavoriteOptimistic({ playlistId }));

      let updatedPlaylist;
      if (wasFavorite) {
        const response = await removeFavoritePlaylist({ playlistId });
        updatedPlaylist = response.playlist;
      } else {
        const response = await addFavoritePlaylist({ playlistId });
        updatedPlaylist = response.playlist;
      }

      return updatedPlaylist;
    } catch (error: any) {
      dispatch(toggleFavoriteRollback({ playlistId }));
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const toggleAutoSort = createAsyncThunk(
  'playlists/auto-sort/toggle',
  async (playlistId: string, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState() as { playlists: PlaylistsState };
      const playlist = state.playlists.selected[playlistId];

      if (!playlist) {
        throw new Error('Playlist not found in state');
      }

      const wasAutoSorted = playlist.autoSort;

      dispatch(toggleAutoSortOptimistic({ playlistId }));

      let updatedPlaylist;
      if (wasAutoSorted) {
        const response = await removeAutoSortPlaylist({ playlistId });
        updatedPlaylist = response.playlist;
      } else {
        const response = await addAutoSortPlaylist({ playlistId });
        updatedPlaylist = response.playlist;
      }

      return updatedPlaylist;
    } catch (error: any) {
      dispatch(toggleAutoSortRollback({ playlistId }));
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    toggleFavoriteOptimistic(state, action: PayloadAction<{ playlistId: string }>) {
      const { playlistId } = action.payload;

      const item = state.items.find((p) => p.id === playlistId);
      if (item) {
        item.isFavorite = !item.isFavorite;
      }

      if (state.selected[playlistId]) {
        state.selected[playlistId].isFavorite = !state.selected[playlistId].isFavorite;
      }
    },
    toggleFavoriteRollback(state, action: PayloadAction<{ playlistId: string }>) {
      const { playlistId } = action.payload;

      const item = state.items.find((p) => p.id === playlistId);
      if (item) {
        item.isFavorite = !item.isFavorite;
      }

      if (state.selected[playlistId]) {
        state.selected[playlistId].isFavorite = !state.selected[playlistId].isFavorite;
      }
    },
    toggleAutoSortOptimistic(state, action: PayloadAction<{ playlistId: string }>) {
      const { playlistId } = action.payload;

      const item = state.items.find((p) => p.id === playlistId);
      if (item) {
        item.autoSort = !item.autoSort;
      }

      if (state.selected[playlistId]) {
        state.selected[playlistId].autoSort = !state.selected[playlistId].autoSort;
      }
    },
    toggleAutoSortRollback(state, action: PayloadAction<{ playlistId: string }>) {
      const { playlistId } = action.payload;

      const item = state.items.find((p) => p.id === playlistId);
      if (item) {
        item.autoSort = !item.autoSort;
      }

      if (state.selected[playlistId]) {
        state.selected[playlistId].autoSort = !state.selected[playlistId].autoSort;
      }
    },
    resetPlaylists(state) {
      state.items = [];
      state.selected = {};
      state.status = 'idle';
      state.error = null;
    },
  },
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
      .addCase(fetchPlaylistById.pending, (state, action) => {
        const id = action.meta.arg;
        state.status = 'loading';
        state.selectedStatus[id] = 'loading';
        state.selectedError[id] = null;
      })
      .addCase(fetchPlaylistById.fulfilled, (state, action: PayloadAction<PlaylistDetails>) => {
        const playlist = action.payload;
        state.selected[playlist.id] = playlist;
        state.selectedStatus[playlist.id] = 'succeeded';
      })
      .addCase(fetchPlaylistById.rejected, (state, action) => {
        const id = action.meta.arg;
        state.status = 'failed';
        state.selectedStatus[id] = 'failed';
        state.selectedError[id] = action.error.message || 'Failed to fetch playlist by ID';
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const index = state.items.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.items[index].isFavorite = updated.isFavorite;
        }

        if (state.selected[updated.id]) {
          state.selected[updated.id].isFavorite = updated.isFavorite;
        }
      })
      .addCase(toggleAutoSort.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;

        const index = state.items.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.items[index].autoSort = updated.autoSort;
        }

        if (state.selected[updated.id]) {
          state.selected[updated.id].autoSort = updated.autoSort;
        }
      })
      .addCase(sortPlaylistByReleaseDate.fulfilled, (state, action: PayloadAction<PlaylistDetails>) => {
        const updated = action.payload;
        if (!updated) return;

        if (state.selected[updated.id]) {
          state.selected[updated.id] = updated;
        }
      })
      .addCase(shuffleUserPlaylist.fulfilled, (state, action: PayloadAction<PlaylistDetails>) => {
        const updated = action.payload;
        if (!updated) return;

        state.selected[updated.id] = updated;

        const index = state.items.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updated };
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

export const {
  toggleFavoriteOptimistic,
  toggleFavoriteRollback,
  toggleAutoSortOptimistic,
  toggleAutoSortRollback,
  resetPlaylists,
} = playlistsSlice.actions;

export default playlistsSlice.reducer;
