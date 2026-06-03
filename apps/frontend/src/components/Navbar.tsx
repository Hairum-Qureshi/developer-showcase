import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useAuthForm from "../hooks/useAuthForm";

export default function Navbar() {
  const { data: currentUser } = useCurrentUser();
  const { signOut } = useAuthForm();
  return (
    <div className="w-full p-4 text-slate-50 flex items-center justify-between bg-transparent absolute top-0 left-0 z-10">
      {currentUser ? (
        <Link to="/feed">
          <h1 className="text-2xl font-bold">Developer Showcase</h1>
        </Link>
      ) : (
        <Link to="/">
          <h1 className="text-2xl font-bold">Developer Showcase</h1>
        </Link>
      )}
      <ul className="mt-2">
        <li className="inline-block mr-4 hover:text-slate-400">
          <Link to="/feed">Feed</Link>
        </li>
        <li className="inline-block mr-4 hover:text-slate-400">
          <Link to="/users">All Users</Link>
        </li>
        <li className="inline-block mr-4 hover:text-slate-400">
          <Link to="/new-post">New Post</Link>
        </li>
        <li className="inline-block mr-4 hover:text-slate-400">
          <Link to={`/profile/${currentUser?.user_id}`}>Profile</Link>
        </li>

        {currentUser && (
          <li
            className="inline-block mr-4 hover:text-slate-400 hover:cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </li>
        )}
      </ul>
    </div>
  );
}
