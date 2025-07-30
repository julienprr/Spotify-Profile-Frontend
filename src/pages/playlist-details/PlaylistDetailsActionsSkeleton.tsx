import { Skeleton } from '@/components/ui/skeleton';

const ActionsSkeleton = () => {
  return (
    <div className="my-4 flex flex-row items-center gap-2">
      <Skeleton className="h-[25px] w-[100px] rounded-lg" />
      <Skeleton className="h-[25px] w-[100px] rounded-lg" />
      <Skeleton className="h-[25px] w-[100px] rounded-lg" />
    </div>
  );
};

export default ActionsSkeleton;
