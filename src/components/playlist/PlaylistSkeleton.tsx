import { Skeleton } from '../ui/skeleton';

const PlaylistSkeleton = () => {
  return (
    <div className="flex flex-row items-center space-x-4">
      <Skeleton className="h-[50px] w-[50px]" />
      <div className="flex flex-col items-start space-y-1">
        <Skeleton className="h-[20px] w-[100px] rounded-lg sm:h-[30px] sm:w-[150px]" />
        <Skeleton className="h-[15px] w-[110px] rounded-lg sm:h-[30px] sm:w-[150px]" />
      </div>
    </div>
  );
}

export default PlaylistSkeleton
