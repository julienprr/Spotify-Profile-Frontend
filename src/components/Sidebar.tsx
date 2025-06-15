import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import spotifyLogo from '@/assets/images/spotify-logo.png'
import githubLogo from '@/assets/images/github-logo-white.png'

const links = [
  { label: 'Profile', path: '/' },
  { label: 'Top Artists', path: '/top-artists' },
  { label: 'Top Tracks', path: '/top-tracks' },
  { label: 'Playlists', path: '/playlists' },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const NavLinks = () => (
    <nav className="flex flex-col space-y-8 px-6">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => setOpen(false)}
          className={clsx(
            'text-lg transition-colors hover:text-primary text-foreground',
            location.pathname === link.path && 'font-bold text-primary'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile: Burger menu */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="bigicon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex h-full w-full flex-col items-center justify-center border-0 text-center text-primary pt-20"
          >
            <NavLinks />
            <div className="flex w-full justify-center">
              <Link to="/" className="mt-30 block w-20">
                <img src={githubLogo} alt="Spotify" className="w-full" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:bg-sidebar lg:px-6 lg:py-8 lg:text-foreground">
        <div className="flex flex-1 flex-col items-center justify-center">
          <NavLinks />
        </div>

        <div className="flex w-full justify-center">
          <a
            href="https://github.com/julienprr/spotify-profile-frontend"
            target="_blank"
            rel="noopener noreferrer"
            title="Go to repository"
            className="block w-20"
          >
            <img src={githubLogo} alt="GitHub" className="w-full" />
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
