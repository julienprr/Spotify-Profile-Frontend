import { useAuth } from '@/contexts/AuthProvider';
import ThemeToggle from '../components/ThemeToggle';
import { API_URL } from '@/config';

const Home = () => {
  const { isAuthenticated, setIsAuthenticated, userProfile } = useAuth();

  const handleLogin = () => {
    window.location.href = `${API_URL}/spotify-auth/login`;
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfile');
    setIsAuthenticated(false);
  };

   return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">HOME</h1>
        <ThemeToggle />
      </div>

      <div>
        {isAuthenticated ? (
          <div>
            <p>hello {userProfile.display_name}</p>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Login with Spotify
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
