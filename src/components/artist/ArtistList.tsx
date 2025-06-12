import { Button } from '../ui/button';
import ArtistSkeleton from './ArtistSkeleton';
import { Skeleton } from '../ui/skeleton';
import type { ArtistProps } from './Artist';
import Artist from './Artist';

const ArtistList = ({ items, isLoading }: { items: any; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[50px] w-[250px] rounded-xl" />
        <div className="flex flex-col justify-start gap-2">
          <ArtistSkeleton />
          <ArtistSkeleton />
          <ArtistSkeleton />
          <ArtistSkeleton />
        </div>
      </div>
    );
  }

  if (!isLoading && items.length > 0) {
    return (
      <>
        <div className="flex flex-col space-y-10">
          {items.map((item: ArtistProps) => (
            <Artist key={item.id} artist={item} />
          ))}
          <div className="flex flex-col justify-start gap-2">
            <div className="pt-4 text-xs"></div>
          </div>
        </div>
      </>
    );
  }
};
export default ArtistList;
