import { configureStore } from '@reduxjs/toolkit';
import playlistsReducer from './slices/playlistsSlice';

export const store = configureStore({
  reducer: {
    playlists: playlistsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
