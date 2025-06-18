import ArtistAvatar from '@/components/artist/ArtistAvatar';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ArtistDetails = () => {
  const { id } = useParams();

  const artist =
    useSelector((state: RootState) => {
      const { short_term, medium_term, long_term } = state.artists.items;
      return [...short_term, ...medium_term, ...long_term].find((a) => a.id === id);
    }) || null;

  const formatFollowersCount = (count: number): string => {
    return count.toLocaleString('en-US');
  };

  if (!artist) {
    return <div className="bg-background p-4 text-center text-foreground">Artiste introuvable.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background text-center text-foreground pb-25">
      <ArtistAvatar artist={artist} isLoading={false} />
      <div className="mt-8 flex gap-8">
        <div className="flex flex-col items-center sm:gap-2">
          <span className="stat-value"> {formatFollowersCount(artist.followers)}</span>
          <span className="stat-label">FOLLOWERS</span>
        </div>
        <div className="flex flex-col items-center sm:gap-2">
          <span className="stat-value uppercase">{artist.genres.length > 0 ? artist.genres[0] : 'N/A'}</span>{' '}
          <span className="stat-label">GENRE</span>
        </div>
        <div className="flex flex-col items-center sm:gap-2">
          <span className="stat-value">{artist.popularity}%</span>
          <span className="stat-label">POPULARITY</span>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
