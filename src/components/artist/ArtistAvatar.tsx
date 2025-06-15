import type { ArtistProps } from "./Artist";

const ArtistAvatar = ({ artist }: { artist: ArtistProps }) => {
  return (
      <div key={artist.id} className="shrink-0">
        <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
          <img src={artist.imageUrl} alt={artist.name} className="h-fit w-fit object-cover" />
        </div>
    </div>
  );
};

export default ArtistAvatar;
