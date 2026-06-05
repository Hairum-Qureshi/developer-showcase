export default function PostedTags() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto flex justify-center">
      <div className="rounded-md p-10 w-3/4 mt-20">
        <h1 className="text-3xl font-semibold text-slate-100">All Tags</h1>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Search tags..."
            className="w-full p-2 rounded-md bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {["react", "javascript", "webdev", "python"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700 hover:bg-slate-700 hover:text-white cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
