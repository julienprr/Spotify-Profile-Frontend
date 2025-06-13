import ThemeToggle from '@/components/ThemeToggle';
import TimeRangeSelector from '@/components/TimeRange';
import TrackList from '@/components/track/TrackList';
import { useTopTracks } from '@/hooks/useTopTracks';
import { useState } from 'react';

const TopTracks = () => {
  const [timeRange, setTimeRange] = useState<'long_term' | 'medium_term' | 'short_term'>('long_term');
  const { tracks, isLoading } = useTopTracks(timeRange);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background p-4 text-foreground">
      <ThemeToggle />
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold">Top Tracks</h2>

        <div className="mt-4 mb-10 flex justify-center">
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>
      </div>

      <TrackList items={tracks} isLoading={isLoading} />
    </div>
  );
};
export default TopTracks;
