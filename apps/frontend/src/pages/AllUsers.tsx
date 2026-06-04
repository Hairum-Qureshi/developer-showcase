import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import useUsers from "../hooks/useUsers";
import type { UserType } from "../types";

export default function AllUsers() {
  const { users } = useUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="m-auto w-2/3 py-25 text-slate-50">
        <h1 className="font-bold text-white text-3xl">All Users</h1>
        <div>
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 mt-5 mb-4 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2 my-4">
          {users?.map((user: UserType) => {
            return (
              <Link
                to={`/profile/${user.user_id}`}
                key={user.user_id}
                className="block"
              >
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
