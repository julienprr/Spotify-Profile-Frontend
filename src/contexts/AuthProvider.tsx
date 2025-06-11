import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  userProfile: any | null;
  setIsAuthenticated: (value: boolean) => void;
  setAccessToken: (token: string | null) => void;
  setUserProfile: (userProfile: any | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  accessToken: null,
  userProfile: null,
  setIsAuthenticated: () => {},
  setAccessToken: () => {},
  setUserProfile: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const profile = localStorage.getItem('userProfile');

    if (token && profile) {
      setAccessToken(token);
      setUserProfile(JSON.parse(profile));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, userProfile, setIsAuthenticated, setAccessToken, setUserProfile }}
    >
      {children}
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
