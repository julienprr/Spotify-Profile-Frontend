import TimeRangeSelector from '@/components/TimeRange';
import TrackList from '@/components/track/TrackList';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useTopTracks } from '@/hooks/useTopTracks';
import { useState } from 'react';

const TopTracks = () => {
  const [timeRange, setTimeRange] = useState<'long_term' | 'medium_term' | 'short_term'>('long_term');
  const { tracks, isLoading } = useTopTracks(timeRange);
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <div className="flex-col">
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">Top Tracks</h2>

          <div className="mt-4 mb-10 flex justify-center">
            <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
          </div>
        </div>

        <TrackList items={tracks} isLoading={isLoading} />
      </div>
    );
  } else {
    return (
      <div className="flex-col px-4 pt-20">
        <div className="mb-20 flex justify-between">
          <h1 className="text-6xl font-semibold">Top Tracks</h1>
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>

        <TrackList items={tracks} isLoading={isLoading} />
      </div>
    );
  }
};
export default TopTracks;
