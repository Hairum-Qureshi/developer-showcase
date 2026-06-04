import UserCard from "../components/UserCard";
import useUsers from "../hooks/useUsers";
import type { UserType } from "../types";

export default function AllUsers() {
  const { users } = useUsers();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="m-auto w-2/3 py-25 text-slate-50">
        <h1 className="font-bold text-white">All Users</h1>
        <div className="space-y-2 my-4">
          {users?.map((user: UserType) => {
            return (
              <UserCard
                key={user.user_id}
                profilePicture={
                  user.avatar
                    ? user.avatar
                    : `https://api.dicebear.com/9.x/identicon/svg?seed=${user.profile_picture_seed}`
                }
                username={user.username}
                joinedDate={user.created_at}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
