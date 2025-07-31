import { useAuth } from '@/contexts/AuthProvider';
import { LogInIcon } from 'lucide-react';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    toast.info(' Please login to Spotify', {
      icon: <LogInIcon/>
    });
    return <Navigate to="/" replace />;
  }

  return children;
};
