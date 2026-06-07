import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { GoKebabHorizontal } from "react-icons/go";

export default function FeedPost({
  username,
  createdAt,
  content,
  profilePicture,
}: {
  username: string;
  createdAt: string;
  content: string;
  profilePicture: string;
}) {
  return (
    <div className="w-full border border-slate-700 rounded-md p-3 bg-slate-950">
      <div className="flex justify-between mb-3 w-full">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md bg-slate-700 mr-3 shrink-0">
            <img
              src={profilePicture}
              alt={`${username}'s profile`}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold leading-none mb-1">{username}</p>
            <p className="text-xs text-gray-500">{createdAt}</p>
          </div>
        </div>
        <div className="flex items-start pt-0.5 text-xl">
          <GoKebabHorizontal className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors" />
        </div>
      </div>
      <p className="text-gray-300 text-sm mb-2 wrap-break-word">{content}</p>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-1 text-gray-500 hover:text-red-500 cursor-pointer transition-colors">
          <FaRegHeart />
          <span className="text-sm">0</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 cursor-pointer transition-colors">
          <FaRegComment />
          <span className="text-sm">0</span>
        </div>
      </div>
    </div>
  );
}
