import { useAuth } from '@/contexts/AuthProvider';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    toast.error('Please login to Spotify');
    return <Navigate to="/" replace />;
  }

  return children;
};
