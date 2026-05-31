import { useCurrentUser } from "../hooks/useCurrentUser";

export default function Feed() {
  const { data: currentUser } = useCurrentUser();
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="w-3/4 m-auto p-10 absolute top-10 right-0 left-0 text-slate-50">
        <textarea
          placeholder={`What have you been working on, ${currentUser?.username}?`}
          className="border border-sky-600 rounded-md p-4 w-full mt-10 text-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        ></textarea>
      </div>
    </div>
  );
}
