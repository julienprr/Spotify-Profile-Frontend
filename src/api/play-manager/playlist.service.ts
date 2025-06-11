import apiClient from "../apiClient";

export const getUserPlaylists = async () => {
  try {
    console.log('Fetching user playlists...');
    const res = await apiClient.get('/playlists');
    return res;
  } catch (error) {
    console.error('Error fetching playlists', error);
    throw error;
  }
};

export const getSingleUserPlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    console.log(`Fetching playlist with ID: ${playlistId}`);
    const res = await apiClient.get(`/playlists/${playlistId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching playlist', error);
    throw error;
  }
};

export const reorganizeUserPlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    console.log(`Reorganizing playlist with ID: ${playlistId}`);
    const res = await apiClient.post('/playlists/reorganize/', { playlistId });
    return res.data;
  } catch (error) {
    console.error('Error reorganizing playlist', error);
    throw error;
  }
};

export const cleanUserPlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    console.log(`Cleaning playlist with ID: ${playlistId}`);
    const res = await apiClient.delete(`/playlists/clean/${playlistId}`);
    return res.data;
  } catch (error) {
    console.error('Error cleaning playlist', error);
    throw error;
  }
};

export const copyUserPlaylist = async ({
  playlistSourceId,
  playlistDestinationId,
}: {
  playlistSourceId: string;
  playlistDestinationId: string;
}) => {
  try {
    console.log(`Copying playlist ${playlistSourceId} to ${playlistDestinationId}`);
    const res = await apiClient.post('/playlists/copy/', {
      playlistSourceId,
      playlistDestinationId,
    });
    return res.data;
  } catch (error) {
    console.error('Error copying playlist', error);
    throw error;
  }
};

// export const getUserTopItem = async ({ options }: { options: TopItemOptions }) => {
//   try {
//     console.log(`Fetching top items for ${options.type}`);
//     const params: { time_range?: string; limit?: number; offset?: number } = {};
//     if (options.time_range) params.time_range = options.time_range;
//     if (options.limit) params.limit = options.limit;
//     if (options.offset) params.offset = options.offset;

//     const res = await apiClient.get(`/playlists/top/${options.type}`, { params });
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching top items', error);
//     throw error;
//   }
// };

export const addFavoritePlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    console.log(`Adding playlist ${playlistId} to favorites`);
    const res = await apiClient.post('/playlists/favorites/', { playlistId });
    return res.data;
  } catch (error) {
    console.error('Error adding favorite playlist', error);
    throw error;
  }
};

export const removeFavoritePlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    console.log(`Removing playlist ${playlistId} from favorites`);
    const res = await apiClient.delete(`/playlists/favorites/${playlistId}`);
    return res.data;
  } catch (error) {
    console.error('Error removing favorite playlist', error);
    throw error;
  }
};

export const addAutoSortPlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    console.log(`Adding auto-sort to playlist ${playlistId}`);
    const res = await apiClient.post('/playlists/auto-sort/', { playlistId });
    return res.data;
  } catch (error) {
    console.error('Error adding auto-sort playlist', error);
    throw error;
  }
};

export const removeAutoSortPlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    console.log(`Removing auto-sort from playlist ${playlistId}`);
    const res = await apiClient.delete(`/playlists/auto-sort/${playlistId}`);
    return res.data;
  } catch (error) {
    console.error('Error removing auto-sort playlist', error);
    throw error;
  }
};
