import type { ArtistProps } from "./Artist";

const ArtistAvatar = ({ artist }: { artist: ArtistProps }) => {
  return (
      <div key={artist.id} className="shrink-0">
        <div className="h-[150px] w-[150px] overflow-hidden rounded-full lg:h-[300px] lg:w-[300px]">
          <img src={artist.imageUrl} alt={artist.name} className="h-fit w-fit object-cover" />
        </div>
    </div>
  );
};

export default ArtistAvatar;
