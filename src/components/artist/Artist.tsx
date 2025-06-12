export type ArtistProps = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

const Artist = ({ artist }: { artist: ArtistProps }) => {
  return (
    <div className="flex flex-row items-center space-x-4">
      <div key={artist.id} className="shrink-0">
        <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
          <img src={artist.imageUrl} alt={artist.name} className="h-fit w-fit object-cover" />
        </div>
      </div>
      <span className="font-semibold text-foreground">{artist.name}</span>
    </div>
  );
};

export default Artist;
