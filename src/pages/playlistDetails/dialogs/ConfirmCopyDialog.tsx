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
  isCopyDialogOpen: boolean;
  setIsCopyDialogOpen: (open: boolean) => void;
  handleCopyPlaylist: (playlistDestinationId: string) => void;
  playlist: PlaylistProps;
  playlists: PlaylistProps[];
}

const ConfirmCopyDialog = ({
  isCopyDialogOpen,
  setIsCopyDialogOpen,
  handleCopyPlaylist,
  playlist,
  playlists,
}: ConfirmCopyDialogProps) => {
  return (
    <Dialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copier la Playlist {playlist.name}</DialogTitle>
          <DialogDescription>Choisissez dans quelle playlist copier les titres.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            <Button  onClick={() => handleCopyPlaylist('liked-tracks')}>
              Titres likés
            </Button>

            <Button onClick={() => handleCopyPlaylist('new-playlist')}>
              Nouvelle playlist
            </Button>

            {playlists.map((p) => (
              <Button key={p.id} variant="default" onClick={() => handleCopyPlaylist(p.id)}>
                {p.name}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Annuler
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmCopyDialog;
