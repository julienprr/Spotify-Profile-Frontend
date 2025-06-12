import { Skeleton } from '../ui/skeleton';

const TrackSkeleton = () => {
  return (
    <div className="gap-x- grid grid-cols-3">
      {/* Images, track, artist */}
      <div className="flex flex-row items-center space-x-2">
        <Skeleton className="h-[60px] w-[60px] rounded-md" />
        <div className="mr-10 flex flex-col space-y-1">
          <Skeleton className="h-[25px] w-[125px] rounded-lg" />
          <div className="flex flex-row items-center space-x-1">
            <Skeleton className="h-[25px] w-[150px] rounded-lg" />
          </div>
        </div>
      </div>

      {/* Album */}
      <div className="col-span-2 mt-2 ml-24">
        <Skeleton className="h-[25px] w-[150px] rounded-lg" />
      </div>
    </div>

    // <Skeleton className="h-[80px] w-[80px] rounded-sm" />
    // <Skeleton className="h-[30px] w-[150px] rounded-lg" />
  );
};

export default TrackSkeleton;
