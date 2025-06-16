import ArtistAvatar from '@/components/artist/ArtistAvatar';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ArtistDetails = () => {
  const { id } = useParams();
  console.log(id);

  const artist =
    useSelector((state: RootState) => {
      const { short_term, medium_term, long_term } = state.artists.items;
      return [...short_term, ...medium_term, ...long_term].find((a) => a.id === id);
    }) || null;

  const formatFollowersCount = (count: number): string => {
    return count.toLocaleString('en-US'); // utilise les virgules comme séparateurs de milliers
  };

  if (!artist) {
    return <div className="p-4 text-center text-foreground">Artiste introuvable.</div>;
  }

  return (
    <div className="flex flex-col items-center p-20">
      <ArtistAvatar artist={artist} isLoading={false} />{' '}
      <div className="mb-5 flex flex-col items-center text-center text-foreground sm:py-10 lg:py-16">
        <div className="mt-8 flex gap-5 sm:gap-10">
          <div className="flex flex-col items-center sm:gap-2">
            <span className="stat-value"> {formatFollowersCount(artist.followers)}</span>
            <span className="stat-label">FOLLOWERS</span>
          </div>
          <div className="flex flex-col items-center sm:gap-2">
            <span className="stat-value">{artist.genres.length > 0 ? artist.genres[0] : 'N/A'}</span>{' '}
            <span className="stat-label">GENRE</span>
          </div>
          <div className="flex flex-col items-center sm:gap-2">
            <span className="stat-value">{artist.popularity}%</span>
            <span className="stat-label">POPULARITY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
