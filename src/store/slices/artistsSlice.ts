import { getUserTopArtists } from '@/api/play-manager.service';
import type { ArtistProps } from '@/types/artist';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ArtistsState {
  items: {
    short_term: ArtistProps[];
    medium_term: ArtistProps[];
    long_term: ArtistProps[];
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArtistsState = {
  items: {
    short_term: [],
    medium_term: [],
    long_term: [],
  },
  status: 'idle',
  error: null,
};

export const fetchTopArtists = createAsyncThunk('artists/fetchTopArtists', async () => {
  const response = await getUserTopArtists();
  return response;
});

const artistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    resetArtists(state) {
      (state.items = {
        short_term: [],
        medium_term: [],
        long_term: [],
      }),
        (state.status = 'idle');
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopArtists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopArtists.fulfilled, (state, action: PayloadAction<ArtistsState['items']>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTopArtists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch top artists';
      });
  },
});

export const { resetArtists } = artistsSlice.actions;

export default artistsSlice.reducer;
