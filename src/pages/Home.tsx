import UserProfile from '@/components/UserProfile';
import ArtistList from '@/components/artist/ArtistList';
import TrackList from '@/components/track/TrackList';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/config';
import { useAuth } from '@/contexts/AuthProvider';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useTopArtists } from '@/hooks/useTopArtists';
import { useTopTracks } from '@/hooks/useTopTracks';
import { resetArtists } from '@/store/slices/artistsSlice';
import { resetPlaylists } from '@/store/slices/playlistsSlice';
import { resetTracks } from '@/store/slices/tracksSlice';
import type { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, userProfile, logout } = useAuth();
  const { artists, isLoading: isLoadingArtists } = useTopArtists('short_term');
  const { tracks, isLoading: isLoadingTracks } = useTopTracks('short_term');

  const breakpoint = useBreakpoint();
  const maxArtistItems = breakpoint === 'mobile' ? 5 : breakpoint === 'tablet' ? 8 : 12;
  const maxTrackItems = breakpoint === 'mobile' ? 5 : breakpoint === 'tablet' ? 8 : 17;

  const displayedArtists = artists?.slice(0, maxArtistItems);
  const displayedTracks = tracks?.slice(0, maxTrackItems);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = `${API_URL}/spotify-auth/login`;
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('tokenTimestamp');
    dispatch(resetPlaylists());
    dispatch(resetTracks());
    dispatch(resetArtists());
    logout();
  };

  return (
    <div className="flex flex-col p-4 text-center">
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

            <Button onClick={handleLogout} variant="outlineRounded" className="uppercase" size={'xl'}>
              logout
            </Button>

            <div className="mt-10 gap-20 sm:mx-10 sm:mt-20 lg:grid lg:grid-cols-2">
              <div className="mb-6">
                <div className="mb-4 flex justify-between">
                  <h2 className="text-lg font-bold sm:text-3xl sm:tracking-wide">Top Artists</h2>
                  <Button onClick={() => navigate('/top-artists')} variant="outlineRounded" size={'lg'}>
                    See More
                  </Button>
                </div>
                <ArtistList items={displayedArtists} isLoading={isLoadingArtists} />
              </div>

              <div className="mt-10 sm:mt-0">
                <div className="mb-4 flex justify-between">
                  <h2 className="text-lg font-bold sm:text-3xl sm:tracking-wide">Top Tracks</h2>
                  <Button onClick={() => navigate('/top-tracks')} variant="outlineRounded" size={'lg'}>
                    See More
                  </Button>
                </div>
                <TrackList items={displayedTracks} isLoading={isLoadingTracks} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start space-y-8 pt-[20vh] pb-[40vh] text-center">
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
