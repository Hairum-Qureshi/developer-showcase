import { useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { GitHubCalendar } from "react-github-calendar";
import { FaPencilAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import Markdown from "react-markdown";
import useAccount from "../hooks/useAccount";
import removeMd from "remove-markdown";

export default function Profile() {
  const { data: currUserData } = useCurrentUser();
  const { profileData } = useAccount();
  const [editMode, setEditMode] = useState(false);
  const [biography, setBiography] = useState(profileData?.biography);
  const { updateBiographyMutation } = useAccount();

  // TODO - make it so that your GitHub username isn't hardcoded and it's dynamic
  // TODO - make it so that the textarea restricts you from going beyond 400 characters with markdown
  // TODO - make it so that when you hit the edit button, the textarea is populated with the current biography and not blank

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="w-3/4 m-auto p-10 absolute top-20 right-0 left-0 text-slate-50">
        <div className="flex">
          <div className="w-1/4">
            <img
              src={profileData?.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-md border border-sky-800 mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{profileData?.username}</h1>
            <p className="text-gray-400 mb-4">{profileData?.email}</p>
            <p className="text-gray-400 mb-4">
              Joined: {new Date(profileData?.createdAt).toLocaleDateString()}
            </p>
            <div>
              <h3>Social Medias:</h3>
              <ul className="list-disc list-inside text-gray-300">
                <li>
                  <a
                    href={profileData?.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={profileData?.twitter_x_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline"
                  >
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a
                    href={profileData?.linkedin_url}
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
              {currUserData?.user_id === profileData?.user_id && (
                <button
                  className="ml-auto hover:cursor-pointer"
                  title="Edit about me"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? (
                    <FaCheck
                      className="text-xl text-green-600 hover:text-green-400 active:text-green-50"
                      onClick={() => updateBiographyMutation.mutate(biography)}
                    />
                  ) : (
                    <FaPencilAlt className="text-slate-600 hover:text-slate-400 active:text-white" />
                  )}
                </button>
              )}
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
                  <div className="flex mt-2 text-sm text-slate-500 justify-between">
                    <p>{removeMd(biography).length}/400 Characters Remaining</p>
                    <p>This editor supports markdown</p>
                  </div>
                </div>
              ) : (
                <div className="mt-5 text-gray-300 font-mono text-sm prose prose-invert">
                  <Markdown>{profileData?.biography}</Markdown>
                </div>
              )}
            </div>
            <div className="my-10">
              <h3 className="text-xl font-bold font-mono mb-2">
                {profileData?.username}'s Latest GitHub Contributions
              </h3>
              <div className="border-t border-sky-800 mb-3" />
              <div className="mt-4">
                <GitHubCalendar username={profileData?.github_username} />
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
