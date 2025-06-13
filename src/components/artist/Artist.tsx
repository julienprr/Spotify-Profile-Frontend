export type ArtistProps = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  spotifyUrl: string;
  followers: number;
};

const Artist = ({ artist }: { artist: ArtistProps }) => {
  return (
    <div className="flex items-center space-x-4">
      <div key={artist.id} className="shrink-0">
        <div className="h-[50px] w-[50px] overflow-hidden rounded-full sm:h-[80px] sm:w-[80px]">
          <img src={artist.imageUrl} alt={artist.name} className="h-fit w-fit object-cover" />
        </div>
      </div>
      <div className="flex flex-col items-start space-y-1">
        <span className="font-semibold text-foreground">{artist.name}</span>
        <span className="text-sm font-normal text-muted-foreground">{artist.followers} followers</span>
      </div>
    </div>
  );
};

export default Artist;
