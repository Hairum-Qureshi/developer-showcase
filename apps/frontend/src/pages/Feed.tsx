import { Link } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { IoIosInformationCircleOutline } from "react-icons/io";
import UserCard from "../components/UserCard";
import useUsers from "../hooks/useUsers";
import type { UserType } from "../types";

export default function Feed() {
  const { data: currentUser } = useCurrentUser();
  const { users } = useUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="w-full lg:w-3/4 m-auto p-10 text-slate-50">
        <div className="w-full my-20 border border-sky-900 mb-10 p-3 bg-slate-950 rounded-md justify-between flex items-center">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full p-2 bg-transparent text-slate-50 focus:outline-none"
          />
          {/* filter dropdown */}
          <select className="ml-4 p-2 bg-slate-900 text-slate-50 border border-sky-900 rounded-md">
            <option value="">Filter by</option>
            <option value="most_recent">Most Recent</option>
            <option value="most_popular">Most Popular</option>
            <option value="project_ideas">Project Ideas</option>
            <option value="feedback">Feedback</option>
            <option value="collaborators">Looking for Collaborators</option>
          </select>
        </div>
        <div className="lg:flex space-x-3 lg:space-y-0 space-y-4">
          <div className="lg:w-3/4 w-full">
            {currentUser && (
              <div className="flex flex-col">
                <h3 className="font-mono text-white text-2xl font-semibold mb-5">
                  What're you programming today, @{currentUser?.username}?
                </h3>
                <div className="lg:flex md:flex space-x-3 lg:space-y-0 space-y-3">
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile Picture"
                    className="w-16 h-16 rounded-md border border-sky-950"
                  />
                  <div className="flex-1 border border-sky-950 rounded-md overflow-hidden bg-slate-950">
                    <textarea
                      placeholder={`Share your project ideas, ask for feedback, or find collaborators!`}
                      className="w-full h-28 p-3 bg-transparent text-slate-50 focus:outline-none resize-none"
                      data-gramm="false"
                      data-gramm_editor="false"
                      data-gramm_id="12345678"
                    />
                    <div className="flex items-center justify-between border-t border-sky-950 bg-slate-900 px-3 py-2">
                      <div className="flex items-start space-x-2 text-gray-500">
                        <IoIosInformationCircleOutline className="text-lg shrink-0 mt-0.5" />
                        <span className="text-sm">
                          This textbox is for sharing project ideas, feedback,
                          and finding collaborators. Please do not ask for help
                          with specific coding problems. For showing off your
                          projects, please use the{" "}
                          <Link
                            to="/new-post"
                            className="text-sky-600 hover:text-sky-400 underline"
                          >
                            New Post
                          </Link>{" "}
                          feature.
                        </span>
                      </div>
                      <button
                        type="button"
                        className="ml-4 shrink-0 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors hover:cursor-pointer"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className={`${!currentUser ? "" : "mt-3"} border border-sky-950 rounded-md p-3 w-full`}
            >
              Posts go here...
            </div>
          </div>
          <div className="w-full lg:w-1/4 border border-sky-950 rounded-md">
            <h3 className="p-2 text-lg font-semibold text-center border-b border-sky-950 bg-slate-900">
              Popular Tags
            </h3>
            <div className="p-3 flex flex-wrap gap-2">
              {["react", "javascript", "webdev", "python"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="border-t border-sky-950">
              <h3 className="p-2 text-lg font-semibold text-center border-b border-sky-950 bg-slate-900">
                Featured Users
              </h3>
              <div className="p-3 flex flex-col gap-3">
                {users?.length ? (
                  users.map((user: UserType) =>
                    currentUser ? (
                      <Link to={`/profile/${user.user_id}`}>
                        <UserCard
                          username={user.username}
                          profilePicture={
                            user.avatar
                              ? user.avatar
                              : `https://api.dicebear.com/9.x/identicon/svg?seed=${user.profile_picture_seed}`
                          }
                          joinedDate={"Joined Jan 2024"}
                        />
                      </Link>
                    ) : (
                      <UserCard
                        username={user.username}
                        profilePicture={
                          user.avatar
                            ? user.avatar
                            : `https://api.dicebear.com/9.x/identicon/svg?seed=${user.profile_picture_seed}`
                        }
                        joinedDate={"Joined Jan 2024"}
                      />
                    ),
                  )
                ) : (
                  <p className="text-gray-500 text-center">No users to show.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
