import { useBreakpoint } from '@/hooks/useBreakpoint';

interface UserProfileProps {
  username: string;
  imageUrl: string;
  followers: number;
  following: number;
  playlists: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, imageUrl, followers, following, playlists }) => {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <div className="flex items-center space-x-4 pt-4">
        <img src={imageUrl} alt={`${username}'s profile`} className="profile-image" />

        <div className="flex flex-col items-start">
          <h1 className="text-xl font-bold tracking-wide">{username}</h1>
          <div className="mt-1s flex space-x-2 text-sm text-muted-foreground">
            <span>
              {followers} follower{followers !== 1 && 's'}
            </span>
            <span>&bull;</span>
            <span>{following} following</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mb-5 flex flex-col items-center text-center text-foreground sm:py-10 lg:py-16">
        <img src={imageUrl} alt={`${username}'s profile`} className="profile-image" />
        <h1 className="text-2xl font-bold tracking-wide sm:text-6xl">{username}</h1>

        <div className="mt-8 flex gap-5 sm:gap-10">
          <div className="flex flex-col items-center sm:gap-2">
            <span className="stat-value">{followers}</span>
            <span className="stat-label">FOLLOWERS</span>
          </div>
          <div className="flex flex-col items-center sm:gap-2">
            <span className="stat-value">{following}</span>
            <span className="stat-label">FOLLOWING</span>
          </div>
          <div className="flex flex-col items-center sm:gap-2">
            <span className="stat-value">{playlists}</span>
            <span className="stat-label">PLAYLISTS</span>
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfile;
