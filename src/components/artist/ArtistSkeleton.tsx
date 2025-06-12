import { Skeleton } from '../ui/skeleton';

const ArtistSkeleton = () => {
  return (
    <div className="flex flex-row items-center space-x-4">
      <Skeleton className="h-[80px] w-[80px] rounded-full" />
      <Skeleton className="h-[30px] w-[150px] rounded-lg" />
    </div>
  );
};

export default ArtistSkeleton;
