export default function UserCard({
  profilePicture,
  username,
  joinedDate,
}: {
  profilePicture?: string;
  username?: string;
  joinedDate?: string;
}) {
  return (
    <div className="bg-slate-900 p-3 rounded-sm">
      <div className="flex items-center space-x-3">
        <img
          src={
            profilePicture ||
            "https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg"
          }
          className="w-10 h-10 rounded-md"
        />
        <div className="flex-col">
          <h3>@{username}</h3>
          <p className="text-sm text-gray-400">Joined: {joinedDate} </p>
        </div>
      </div>
    </div>
  );
}
