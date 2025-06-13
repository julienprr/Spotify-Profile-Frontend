import { getUserTopTracks } from '@/api/play-manager.service';
import type { TrackProps } from '@/components/track/Track';
import { useEffect, useState } from 'react';

export const useTopTracks = (timeRange: 'short_term' | 'medium_term' | 'long_term' = 'short_term') => {
  const [tracks, setTracks] = useState<TrackProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserTopTracks()
      .then((res) => setTracks(res[timeRange] || []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [timeRange]);

  return { tracks, isLoading };
};
