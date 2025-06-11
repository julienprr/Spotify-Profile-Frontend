import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import apiClient from '@/api/apiClient';
import { useAuth } from '@/contexts/AuthProvider';
import ErrorFeedback from '@/components/ErrorFeedback';

const Callback = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setAccessToken, setUserProfile } = useAuth();
  const [isErrored, setIsErrored] = useState(false);
  const [message, setMessage] = useState('');
  const hasHandled = useRef<boolean>(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (!code || hasHandled.current) return;

    hasHandled.current = true;

    apiClient
      .get(`/spotify-auth/authenticate?code=${code}`)
      .then((response) => {
        const { user, access_token } = response.data;

        // Stockage
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('userProfile', JSON.stringify(user));

        // Contexte
        setAccessToken(access_token);
        setUserProfile(user);
        setIsAuthenticated(true);

        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error('Error authenticating', error);
        setIsErrored(true);

        const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue.';
        setMessage(errorMessage);
      });
  }, [hasHandled]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isErrored ? (
        <ErrorFeedback message={message} />
      ) : (
        <p className="text-muted-foreground">Connexion à Spotify en cours...</p>
      )}
    </div>
  );
};

export default Callback;
