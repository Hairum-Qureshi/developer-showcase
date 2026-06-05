import Markdown from "react-markdown";
import usePost from "../hooks/usePost";
import SimpleImageSlider from "react-simple-image-slider";
import { Link, useParams } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { MdOutlineSlideshow } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

export default function PostContent() {
  const { postData, deletePostMutation } = usePost();
  const { data: currUserData } = useCurrentUser();
  const { postId } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <img
          src={postData?.thumbnail_url}
          alt="Post Thumbnail"
          className="w-full h-72 md:h-96 object-cover rounded-2xl border border-slate-800 shadow-xl"
        />
        <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold tracking-tight break-words">
              {postData?.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {postData?.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <img
                src={postData?.user.avatar}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-slate-700"
              />
              <div>
                {currUserData ? (
                  <Link to={`/profile/${postData?.user.user_id}`}>
                    <p className="font-medium text-slate-200 hover:underline">
                      @{postData?.user.username}
                    </p>
                  </Link>
                ) : (
                  <p className="font-medium text-slate-200">
                    @{postData?.user.username}
                  </p>
                )}
                <p className="text-sm text-slate-400">
                  Posted on:{" "}
                  {new Date(postData?.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            {currUserData &&
              currUserData?.user_id === postData?.user.user_id.toString() && (
                <div className="flex gap-2">
                  <Link
                    to={`/post/${postId}/edit`}
                    className="px-4 py-0.5 bg-blue-800 hover:cursor-pointer hover:bg-blue-700 text-white rounded-md"
                  >
                    Edit
                  </Link>
                  <button
                    className="px-4 py-0.5 hover:cursor-pointer bg-red-600 hover:bg-red-500 text-white rounded-md"
                    onClick={() => deletePostMutation.mutate(postId as string)}
                  >
                    Delete
                  </button>
                </div>
              )}
          </div>
        </div>
        <section className="mt-10 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-lg prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 wrap-break-word">
          <Markdown>{postData?.content}</Markdown>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Project Screenshots</h2>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
            {postData?.slideshow_image_urls.length === 2 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {postData.slideshow_image_urls.map(
                  (url: string, index: number) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-64 object-cover rounded-xl border border-slate-700 hover:scale-[1.02] transition-transform"
                    />
                  ),
                )}
              </div>
            ) : postData?.slideshow_image_urls.length === 1 ? (
              <img
                src={postData.slideshow_image_urls[0]}
                alt="Screenshot"
                className="w-full h-80 object-cover rounded-xl border border-slate-700"
              />
            ) : (
              <div className="overflow-hidden rounded-xl flex items-center justify-center">
                {postData?.slideshow_image_urls.length ? (
                  <SimpleImageSlider
                    width={896}
                    height={504}
                    images={postData?.slideshow_image_urls || []}
                    showBullets={true}
                    showNavs={true}
                  />
                ) : (
                  <p className="text-slate-400">Loading...</p>
                )}
              </div>
            )}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Project Links</h2>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-6">
            {postData?.project_repo_link ? (
              <Link
                to={postData.project_repo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 font-medium transition-colors group relative py-1"
              >
                <FaGithub className="text-lg" />
                <span>GitHub Repository</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
              </Link>
            ) : (
              <p className="text-slate-500">No repository link provided.</p>
            )}
            {postData?.live_project_link ? (
              <Link
                to={postData.live_project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 font-medium transition-colors group relative py-1"
              >
                <MdOutlineSlideshow className="text-lg" />
                <span>Live Demo</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all group-hover:w-full"></span>
              </Link>
            ) : (
              <p className="text-slate-500">No live demo link provided.</p>
            )}
          </div>
        </section>
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-5">Comments</h2>
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <p className="text-slate-400">
              No comments yet. Start the discussion.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
