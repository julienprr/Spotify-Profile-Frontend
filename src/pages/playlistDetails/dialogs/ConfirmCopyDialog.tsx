import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { PlaylistProps } from '@/types/playlist';

interface ConfirmCopyDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  handleCopyPlaylist: (playlistDestinationId: string) => void;
  playlist: PlaylistProps;
  playlists: PlaylistProps[];
}

const ConfirmCopyDialog = ({
  isOpen,
  setIsOpen,
  handleCopyPlaylist,
  playlist,
  playlists,
}: ConfirmCopyDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="rounded-lg border border-muted bg-background text-foreground shadow-xl sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copier la Playlist {playlist.name}</DialogTitle>
          <DialogDescription>Choisissez dans quelle playlist copier les titres.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="accent" onClick={() => handleCopyPlaylist('liked-tracks')}>
              Titres likés
            </Button>

            <Button variant="accent" onClick={() => handleCopyPlaylist('new-playlist')}>
              Nouvelle playlist
            </Button>

            {playlists.map((p) => (
              <Button key={p.id} variant="secondary" className="truncate" onClick={() => handleCopyPlaylist(p.id)}>
                {p.name}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Annuler</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmCopyDialog;
