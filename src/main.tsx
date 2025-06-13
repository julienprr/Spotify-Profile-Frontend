import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import Home from '@/pages/Home';
import Playlists from '@/pages/Playlists';
import TopArtists from '@/pages/TopArtists';
import TopTracks from '@/pages/TopTracks';
import NotFound from '@/pages/NotFound';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Callback from '@/pages/callback.tsx';
import { AuthProvider } from './contexts/AuthProvider';

 const router = createBrowserRouter([
   {
     path: '/',
     element: <App />,
     children: [
       {
         index: true,
         element: <Home />,
       },
       {
         path: 'top-artists',
         element: <TopArtists />,
       },
       {
         path: 'top-tracks',
         element: <TopTracks />,
       },
       {
         path: 'callback',
         element: <Callback />,
       },
       {
         path: 'playlists',
         element: <Playlists />,
       },
       // {
       //   path: 'playlist/:id',
       //   element: <PlaylistDetails />,
       // },
       {
         path: 'not-found',
         element: <NotFound />,
       },
       {
         path: '*',
         element: <Navigate to="/not-found" replace />,
       },
     ],
   },
 ]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
