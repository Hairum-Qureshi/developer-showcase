import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Feed() {
  const { data: currentUser } = useCurrentUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="w-3/4 m-auto p-10 absolute top-10 right-0 left-0 text-slate-50 mt-5">
        {currentUser && (
          <div className="w-full border border-sky-900 mb-10 p-3 bg-slate-950 rounded-md justify-between flex items-center">
            <h3 className="text-lg text-gray-300">
              Hi,{" "}
              <span className="text-yellow-500">@{currentUser.username}</span>,
              do you have a project you'd like to show off?
            </h3>
            <button
              className="px-3 py-1 bg-sky-500 text-white rounded-md hover:bg-sky-600 hover:cursor-pointer"
              onClick={() => navigate("/new-post")}
            >
              Create Post
            </button>
          </div>
        )}
        <div className="w-full border border-sky-900 mb-10 p-3 bg-slate-950 rounded-md justify-between flex items-center"></div>
        <div className="flex space-x-3">
          <div className="w-3/4 border border-orange-500"></div>
          <div className="w-1/4 border border-white"></div>
        </div>
      </div>
    </div>
  );
}
