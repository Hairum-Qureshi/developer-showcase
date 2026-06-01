import { FaGithub } from "react-icons/fa";

export default function GitHubAuthButton() {
  return (
    <button
      className="w-full rounded-xl bg-gray-700 py-3 text-white transition hover:bg-gray-600 active:scale-[0.99] flex items-center justify-center gap-2 hover:cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        window.location.assign(
          `https://www.github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&scope=user:email`,
        );
      }}
    >
      <FaGithub className="text-xl" />
      Login With GitHub
    </button>
  );
}
