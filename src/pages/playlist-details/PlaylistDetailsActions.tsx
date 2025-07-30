import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Heart, ListMusic, RefreshCw } from 'lucide-react';
import ActionsSkeleton from './PlaylistDetailsActionsSkeleton';

const Actions = ({
  setIsCopyDialogOpen,
  setIsClearDialogOpen,
  handleSortPlaylist,
  handleshufflePlaylist,
  handleToggleFavorite,
  handleToggleAutoSort,
  isFavorite,
  autoSort,
  isLoading
}: {
  setIsCopyDialogOpen: (open: boolean) => void;
  setIsClearDialogOpen: (open: boolean) => void;
  handleSortPlaylist: () => void;
  handleshufflePlaylist: () => void;
  handleToggleFavorite: () => void;
  handleToggleAutoSort: () => void;
  isFavorite: boolean;
  autoSort: boolean;
  isLoading: boolean
}) => {

  if (isLoading) {
    return <ActionsSkeleton/>
  }
  return (

    <div className="my-4 flex flex-row items-center gap-1">
      <Button
        onClick={handleToggleFavorite}
        variant="action"
        title={isFavorite ? 'Remove the playlist from favorite' : 'Add the playlist to favorite'}
      >
        {isFavorite ? (
          <>
            <Heart className="h-4 w-4 fill-primary text-primary" />
            Remove
          </>
        ) : (
          <>
            <Heart className="h-4 w-4 text-primary" />
            Add
          </>
        )}
      </Button>
      <Button
        onClick={handleToggleAutoSort}
        variant="action"
        title={autoSort ? 'Do not automatically sort the playlist' : 'Automatically sort the playlist'}
      >
        {autoSort ? (
          <>
            <RefreshCw className="h-4 w-4 text-blue-400" />
            Auto Sort
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 text-foreground" />
            Auto Sort
          </>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="action">
            <ListMusic className="h-4 w-4 text-foreground" />
            Manage
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-lg border border-muted bg-background px-2">
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuItem onClick={() => setIsCopyDialogOpen(true)}>Copy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsClearDialogOpen(true)}>Clear</DropdownMenuItem>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Reorder</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded-lg border border-muted bg-background px-2">
                  <DropdownMenuItem onClick={handleSortPlaylist}>Sort by release date</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleshufflePlaylist}>Shuffle playlist</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Actions;
