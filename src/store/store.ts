import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './slices/playlistsSlice';
import tracksReducer from './slices/tracksSlice';
import artistsReducer from './slices/artistsSlice';


export const store = configureStore({
  reducer: {
    playlists: playlistsReducer,
    tracks: tracksReducer,
    artists: artistsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
