import { Skeleton } from '../ui/skeleton';

const PlaylistCoverSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="h-[300px] w-[300px]" />
        <Skeleton className="h-[20px] w-[100px] rounded-lg" />
        <Skeleton className="h-[15px] w-[120px] rounded-lg" />
    </div>
  );
};

export default PlaylistCoverSkeleton;
