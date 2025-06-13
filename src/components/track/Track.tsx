import { useBreakpoint } from '@/hooks/useBreakpoint';

export type TrackProps = {
  id: string;
  name: string;
  artistName: string;
  albumName: string;
  isExplicit: boolean;
  imageUrl?: string;
  duration: number;
};

const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const ExplicitIcon = () => {
  return (
    <div className="flex h-4 w-4 items-center justify-center rounded bg-muted-foreground text-xs font-bold text-background">
      E
    </div>
  );
};

const Track = ({ track }: { track: TrackProps }) => {
  const breakpoint = useBreakpoint();

  return (
    <div className="grid items-center gap-4 sm:grid-cols-2">
      {/* Images, track, artist, album */}
      <div className="flex flex-row items-center space-x-2">
        <div key={track.id} className="shrink-0">
          <div className="w-12 overflow-hidden rounded-sm sm:w-[60px]">
            <img src={track.imageUrl} alt={track.name} className="h-auto w-full object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-start space-y-1">
          <div className="truncate text-sm font-bold text-foreground">{track.name}</div>
          <div className="flex flex-row items-center space-x-1">
            {track.isExplicit && <ExplicitIcon />}
            <span className="text-sm font-normal text-muted-foreground">{track.artistName}</span>
            <span className="text-sm font-normal text-muted-foreground">⸱ {track.albumName}</span>
          </div>
        </div>
      </div>

      {/* Duration */}
      {breakpoint !== 'mobile' && (
        <div className="col-span-1 flex flex-row items-center justify-end">
          <span className="text-sm font-normal text-foreground">{formatDuration(track.duration)}</span>
        </div>
      )}
    </div>
  );
};

export default Track;
