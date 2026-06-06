import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useAuthForm from "../hooks/useAuthForm";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export default function Navbar() {
  const { data: currentUser } = useCurrentUser();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const { signOut } = useAuthForm();
  return (
    <div className="w-full p-4 text-slate-50 flex items-center justify-between bg-transparent absolute top-0 left-0 z-10">
      {currentUser ? (
        <Link to="/">
          <h1 className="text-2xl font-bold">Developer Showcase</h1>
        </Link>
      ) : (
        <Link to="/">
          <h1 className="text-2xl font-bold hidden lg:block">
            Developer Showcase
          </h1>
        </Link>
      )}
      {open ? (
        <IoCloseSharp
          className="lg:hidden text-white ml-auto text-3xl hover:cursor-pointer"
          onClick={() => setOpen(false)}
        />
      ) : (
        <GiHamburgerMenu
          className="lg:hidden text-white ml-auto text-2xl hover:cursor-pointer"
          onClick={() => setOpen(true)}
        />
      )}
      <ul className="mt-2 hidden lg:block">
        <li className="inline-block mr-4 hover:text-slate-400">
          <Link to="/feed">Feed</Link>
        </li>
        <li className="inline-block mr-4 hover:text-slate-400">
          <Link to="/tags">Tags</Link>
        </li>
        {!currentUser && (
          <li className="inline-block mr-4 hover:text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-700 px-3 py-1 rounded-md">
            <Link to="/auth">Create Account</Link>
          </li>
        )}
        {currentUser && (
          <>
            <li className="inline-block mr-4 hover:text-slate-400">
              <Link to="/new-post">New Post</Link>
            </li>
            <li className="inline-block mr-4 hover:text-slate-400">
              <Link to="/users">All Users</Link>
            </li>
            <li className="inline-block mr-4 hover:text-slate-400">
              <Link to={`/profile/${currentUser?.user_id}`}>Profile</Link>
            </li>
            <li
              className="inline-block mr-4 hover:text-slate-400 hover:cursor-pointer"
              onClick={() => signOut()}
            >
              Logout
            </li>
          </>
        )}
      </ul>
      {open && (
        <div className="absolute top-full left-0 w-full bg-slate-900 border-2 border-sky-950 p-4 lg:hidden">
          <li className="inline-block mr-4 hover:text-slate-400">
            <Link to="/feed">Feed</Link>
          </li>
          <li className="inline-block mr-4 hover:text-slate-400">
            <Link to="/tags">Tags</Link>
          </li>
          {!currentUser && (
            <li className="inline-block mr-4 hover:text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-700 px-3 py-1 rounded-md">
              <Link to="/auth">Create Account</Link>
            </li>
          )}
          {currentUser && (
            <>
              <li className="inline-block mr-4 hover:text-slate-400">
                <Link to="/new-post">New Post</Link>
              </li>
              <li className="inline-block mr-4 hover:text-slate-400">
                <Link to="/users">All Users</Link>
              </li>
              <li className="inline-block mr-4 hover:text-slate-400">
                <Link to={`/profile/${currentUser?.user_id}`}>Profile</Link>
              </li>
              <li
                className="inline-block mr-4 hover:text-slate-400 hover:cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </li>
            </>
          )}
        </div>
      )}
    </div>
  );
}
