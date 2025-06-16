import ArtistAvatar from '@/components/artist/ArtistAvatar';
import ArtistList from '@/components/artist/ArtistList';
import ThemeToggle from '@/components/ThemeToggle';
import TimeRangeSelector from '@/components/TimeRange';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useTopArtists } from '@/hooks/useTopArtists';
import type { ArtistProps } from '@/types/artist';
import { useState } from 'react';

const TopArtists = () => {
  const [timeRange, setTimeRange] = useState<'long_term' | 'medium_term' | 'short_term'>('long_term');
  const { artists, isLoading } = useTopArtists(timeRange);

  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
        <ThemeToggle />
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-bold">Top Artists</h2>

          <div className="mt-4 mb-10 flex justify-center">
            <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
          </div>
        </div>

        <ArtistList items={artists} isLoading={isLoading} />
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-background px-4 pt-20 text-foreground">
        <ThemeToggle />
        <div className="mb-20 flex justify-between">
          <h1 className="text-6xl font-semibold">Top Artists</h1>
          <TimeRangeSelector selected={timeRange} onChange={setTimeRange} />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
          {artists.map((item: ArtistProps) => (
            <ArtistAvatar key={item.id} artist={item} isLoading={isLoading} variant='grid'/>
          ))}
        </div>
      </div>
    );
  }
};
export default TopArtists;
