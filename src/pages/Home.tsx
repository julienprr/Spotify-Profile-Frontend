import { useAuth } from '@/contexts/AuthProvider';
import ThemeToggle from '../components/ThemeToggle';
import { API_URL } from '@/config';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, userProfile } = useAuth();

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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden p-4 flex flex-col justify-center items-center">
      <div className="flex items-center justify-between mb-4">
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

            <Button onClick={handleLogout} variant="outlineRounded" className="uppercase tracking-wide" size={'xl'}>
              logout
            </Button>
          </div>
        ) : (
          <div className="text-center space-y-8">
            <h1 className='text-4xl font-bold tracking-wide'>Spotify Profile</h1>
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
