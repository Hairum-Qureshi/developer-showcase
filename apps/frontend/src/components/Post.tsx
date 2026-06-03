import { Link } from "react-router-dom";

export default function Post({
  postID,
  thumbnail,
  title,
  description,
  githubLink,
  liveDemoLink,
  tags,
}: {
  postID: string;
  thumbnail: string;
  title: string;
  description: string;
  githubLink: string;
  liveDemoLink: string;
  tags: string[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-sky-500/10 via-transparent to-purple-500/10 shadow-md">
      <div className="overflow-hidden">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-2">
          <button onClick={() => alert("Edit clicked")}>Edit</button>
          <button onClick={() => alert("Delete clicked")}>Delete</button>
        </div>
        <img
          src={thumbnail}
          alt={"Post Thumbnail"}
          className="h-56 w-full object-cover"
        />
      </div>
      <div className="p-5 space-y-3">
        <h2 className="text-lg font-semibold text-white tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        <div className="flex gap-3 pt-2">
          {githubLink && (
            <Link
              to={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
            >
              View GitHub
            </Link>
          )}
          {liveDemoLink && (
            <Link
              to={liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition"
            >
              Live Demo
            </Link>
          )}
          <Link
            to={`/post/${postID}`}
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition"
          >
            View Post
          </Link>
        </div>
        <div className="flex flex-wrap gap-2 pt-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm bg-slate-700 text-slate-300 px-2 py-1 rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
        <div className="absolute -inset-24 bg-gradient-to-r from-sky-500/10 via-transparent to-purple-500/10 blur-2xl" />
      </div>
    </div>
  );
}
