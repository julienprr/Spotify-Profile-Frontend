import { Skeleton } from '../ui/skeleton';

const TrackSkeleton = () => {
  return (
    <div className="flex flex-row items-center space-x-4">
      <Skeleton className="h-[50px] w-[50px] rounded-lg sm:h-[80px] sm:w-[80px]" />
      <div className="flex flex-col items-start space-y-1">
        <Skeleton className="h-[20px] w-[100px] rounded-lg " />
        <Skeleton className="h-[15px] w-[150px] rounded-lg " />
      </div>
    </div>
  );
};

export default TrackSkeleton;
