export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="absolute w-full rounded-md ml-auto mr-auto left-0 right-0 top-1/2 lg:top-1/3 -translate-y-1/2 p-10 text-center">
        <div className="text-white space-y-6">
          <h1 className="font-bold text-6xl">Share Your Projects.</h1>
          <h1 className="font-semibold text-5xl">
            Find Your Next Inspiration.
          </h1>
          <p className="text-gray-400 text-lg w-1/2 text-center mx-auto">
            Developer Showcase is the community for showcasing and exploring
            developer projects, complete with GitHub integration. Start sharing
            today.
          </p>
        </div>
      </div>
    </div>
  );
}
