import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { GitHubCalendar } from "react-github-calendar";
import { FaPencilAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export default function Profile() {
  const { data: currUserData } = useCurrentUser();
  const [editMode, setEditMode] = useState(false);
  const [biography, setBiography] = useState(currUserData?.biography || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="w-3/4 m-auto p-10 absolute top-10 right-0 left-0 text-slate-50">
        <div className="flex">
          <div className="w-1/4">
            <img
              src={currUserData?.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-md border border-sky-800 mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">
              {currUserData?.username}
            </h1>
            <p className="text-gray-400 mb-4">{currUserData?.email}</p>
            <p className="text-gray-400 mb-4">
              Joined: {new Date(currUserData?.createdAt).toLocaleDateString()}
            </p>
            <div>
              <h3>Social Medias:</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  <a
                    href={currUserData?.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={currUserData?.twitter_x_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline"
                  >
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a
                    href={currUserData?.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-3/4">
            <div className="flex w-full">
              <h2 className="text-xl mb-4 font-mono">about_me.md</h2>
              <button
                className="ml-auto hover:cursor-pointer"
                title="Edit about me"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? (
                  <FaCheck className="text-xl text-green-600 hover:text-green-400 active:text-green-50" />
                ) : (
                  <FaPencilAlt className="text-slate-600 hover:text-slate-400 active:text-white" />
                )}
              </button>
            </div>
            <div className="border-t border-sky-800">
              {editMode ? (
                <div className="pt-4 flex flex-col w-full">
                  <textarea
                    className="text-gray-300 font-mono text-sm w-full h-32 bg-black outline-none border border-sky-950 rounded-md p-2"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="Write something about yourself..."
                  />
                  <p className="text-sm mt-2 text-slate-600 ml-auto">
                    This editor supports markdown
                  </p>
                </div>
              ) : (
                <p className="mt-5 text-gray-300 font-mono text-sm">
                  {currUserData?.biography}
                </p>
              )}
            </div>
            <div className="my-10">
              <h3 className="text-xl font-bold font-mono mb-2">
                {currUserData?.username}'s Latest GitHub Contributions
              </h3>
              <div className="border-t border-sky-800 mb-3" />
              <div className="mt-4">
                <GitHubCalendar username="Hairum-Qureshi" />
              </div>
            </div>
            <div className="my-10">
              <h3 className="text-xl font-bold font-mono mb-2">
                Project Showcase
              </h3>
              <div className="border-t border-sky-800 mb-3" />
              <div className="mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
