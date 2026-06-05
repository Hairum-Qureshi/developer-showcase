import { useCurrentUser } from "../hooks/useCurrentUser";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function Feed() {
  const { data: currentUser } = useCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="w-3/4 m-auto p-10 absolute top-10 right-0 left-0 text-slate-50 mt-5">
        <div className="w-full border border-sky-900 mb-10 p-3 bg-slate-950 rounded-md justify-between flex items-center">
          {/* searchbar */}
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
        <div className="flex space-x-3">
          <div className="w-3/4">
            {currentUser && (
              <div className="flex flex-col">
                <div className="flex space-x-3">
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile Picture"
                    className="w-16 h-16 rounded-md border border-sky-950"
                  />
                  <div className="flex-1 border border-sky-950 rounded-md overflow-hidden bg-slate-950">
                    <textarea
                      placeholder={`What's on your mind, @${currentUser?.username}? Share your project ideas, ask for feedback, or find collaborators!`}
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
                          projects, please use the "Create Post" feature.
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
          </div>
          <div className="w-1/4 border border-sky-950 rounded-md">
            <h3 className="p-2 text-lg font-semibold text-center border-b border-sky-950 bg-slate-900">
              Popular Tags
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
