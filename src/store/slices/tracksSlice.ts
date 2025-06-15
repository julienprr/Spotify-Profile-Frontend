import { getUserTopTracks } from '@/api/play-manager.service';
import type { TrackProps } from '@/components/track/Track';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface TracksState {
  items: {
    short_term: TrackProps[];
    medium_term: TrackProps[];
    long_term: TrackProps[];
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TracksState = {
  items: {
    short_term: [],
    medium_term: [],
    long_term: [],
  },
  status: 'idle',
  error: null,
};

export const fetchTopTracks = createAsyncThunk('tracks/fetchTopTracks', async () => {
  const response = await getUserTopTracks();
  return response;
});

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopTracks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTopTracks.fulfilled, (state, action: PayloadAction<TracksState['items']>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTopTracks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch top tracks';
      })
  },
});

export default tracksSlice.reducer;
