interface UserProfileProps {
  username: string;
  imageUrl: string;
  followers: number;
  following: number;
  playlists: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, imageUrl, followers, following, playlists }) => {
  return (
    <div className="flex flex-col items-center text-center text-foreground py-10">
      <img src={imageUrl} alt={`${username}'s profile`} className="w-48 h-48 rounded-full object-cover mb-6" />
      <h1 className="text-6xl font-bold tracking-wide">{username}</h1>

      <div className="flex gap-10 mt-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary text-2xl font-bold">{followers}</span>
          <span className="text-lg text-muted-foreground tracking-wide ">FOLLOWERS</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary text-2xl font-bold">{following}</span>
          <span className="text-lg text-muted-foreground tracking-wide">FOLLOWING</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary text-2xl font-bold">{playlists}</span>
          <span className="text-lg text-muted-foreground tracking-wide">PLAYLISTS</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
