import { Skeleton } from '../ui/skeleton';

const PlaylistCoverSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[200px] w-[200px]" />
      <Skeleton className="h-[20px] w-[100px] rounded-lg" />
      <Skeleton className="h-[20px] w-[120px] rounded-lg" />
    </div>
  );
};

export default PlaylistCoverSkeleton;
