import App from '@/App';
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';
import ArtistDetails from '@/pages/ArtistDetails';
import Callback from '@/pages/callback';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';
import PlaylistDetails from '@/pages/playlist-details/PlaylistDetails';
import Playlists from '@/pages/Playlists';
import TopArtists from '@/pages/TopArtists';
import TopTracks from '@/pages/TopTracks';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  userProfile: any | null;
  setIsAuthenticated: (value: boolean) => void;
  setAccessToken: (token: string | null) => void;
  setUserProfile: (userProfile: any | null) => void;
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  userProfile: null,
  setIsAuthenticated: () => {},
  setAccessToken: () => {},
  setUserProfile: () => {},
  logout: () => {}
});

export const AuthProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  const logout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setUserProfile(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userProfile');
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const profile = localStorage.getItem('userProfile');

    if (token && profile) {
      setAccessToken(token);
      setUserProfile(JSON.parse(profile));
      setIsAuthenticated(true);
    }
  }, []);

  const router = useMemo(() => createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'top-artists',
          element: (
            <ProtectedRoute>
              <TopArtists />
            </ProtectedRoute>
          ),
        },
        {
          path: 'top-tracks',
          element: (
            <ProtectedRoute>
              <TopTracks />
            </ProtectedRoute>
          ),
        },
        {
          path: 'playlists',
          element: (
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          ),
        },
        {
          path: 'playlist/:id',
          element: (
            <ProtectedRoute>
              <PlaylistDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: 'artist/:id',
          element: (
            <ProtectedRoute>
              <ArtistDetails />
            </ProtectedRoute>
          ),
        },
        { path: 'callback', element: <Callback /> },
        { path: 'not-found', element: <NotFound /> },
        { path: '*', element: <Navigate to="/not-found" replace /> },
      ],
    },
  ]), [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, userProfile, setIsAuthenticated, setAccessToken, setUserProfile, logout }}
    >
      <RouterProvider router={router}/>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
