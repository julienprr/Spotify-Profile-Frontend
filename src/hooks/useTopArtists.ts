
import { getUserTopArtists } from '@/api/play-manager.service';
import { useEffect, useState } from 'react';

export const useTopArtists = (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term') => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserTopArtists()
      .then((res) => setArtists(res[timeRange] || []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [timeRange]);

  return { artists, isLoading };
};
