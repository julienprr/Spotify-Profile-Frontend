import ArtistSkeleton from './ArtistSkeleton';
import type { ArtistProps } from './Artist';
import Artist from './Artist';

const ArtistList = ({ items, isLoading }: { items: ArtistProps[]; isLoading: boolean }) => {

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 sm:space-y-10">
        <ArtistSkeleton />
        <ArtistSkeleton />
        <ArtistSkeleton />
        <ArtistSkeleton />
      </div>
    );
  }

  if (!isLoading && items.length > 0) {
    return (
      <>
        <div className="flex flex-col space-y-6 sm:space-y-10">
          {items.map((item: ArtistProps) => (
            <Artist key={item.id} artist={item} />
          ))}
        </div>
      </>
    );
  }
};
export default ArtistList;
