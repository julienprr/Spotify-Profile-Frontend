import { useAuth } from '@/contexts/AuthProvider';
import ThemeToggle from '../components/ThemeToggle';
import { API_URL } from '@/config';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { useTopTracks } from '@/hooks/useTopTracks';
import TrackList from '@/components/track/TrackList';
import { useTopArtists } from '@/hooks/useTopArtists';
import ArtistList from '@/components/artist/ArtistList';

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, userProfile } = useAuth();
  const { tracks, isLoading: isLoadingTracks } = useTopTracks('short_term');
  const { artists, isLoading: isLoadingArtists } = useTopArtists('short_term');

  const handleLogin = () => {
    window.location.href = `${API_URL}/spotify-auth/login`;
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('tokenTimestamp');
    setIsAuthenticated(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-background p-4 text-foreground">
      <div className="mb-4 flex items-center justify-between">
        <ThemeToggle />
      </div>

      <div>
        {isAuthenticated ? (
          <div>
            <UserProfile
              username={userProfile.display_name}
              imageUrl={userProfile.images[0].url}
              followers={userProfile.followers.total}
              following={userProfile.following}
              playlists={176}
            />

            <Button onClick={handleLogout} variant="outlineRounded" className="tracking-wide uppercase" size={'xl'}>
              logout
            </Button>

            <div className="mt-20 lg:grid lg:grid-cols-2 gap-20 mx-10">
              <div className="mb-6">
                <div className="mb-8 flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">Top Artists</h1>
                  <Button variant="outlineRounded" className="tracking-wide uppercase" size={'xl'}>
                    See More
                  </Button>
                </div>
                <ArtistList items={artists} isLoading={isLoadingArtists} />
              </div>

              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">Top Tracks</h1>
                  <Button variant="outlineRounded" className="tracking-wide uppercase" size={'xl'}>
                    See More
                  </Button>
                </div>
                <TrackList items={tracks} isLoading={isLoadingTracks} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 text-center">
            <h1 className="text-3xl font-bold tracking-wide sm:text-4xl">Spotify Profile</h1>
            <Button onClick={handleLogin} variant="primary" className="uppercase" size={'xxl'}>
              log in to spotify
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
