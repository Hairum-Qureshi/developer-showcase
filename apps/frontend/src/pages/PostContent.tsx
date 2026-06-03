import { useParams } from "react-router-dom";

export default function PostContent() {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-slate-900 max-h-auto">
      <div className="p-20">
        <h1 className="font-bold text-white">Post ID: {postId}</h1>
      </div>
    </div>
  );
}
