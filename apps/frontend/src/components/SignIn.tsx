import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import GitHubAuthButton from "./GitHubAuthButton";

export default function SignIn({
  setShowSignUp,
  setShowSignIn,
}: {
  setShowSignUp: (value: boolean) => void;
  setShowSignIn: (value: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignIn } = useAuthForm();

  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-white">Sign In</h1>

      <p className="mt-3 text-gray-400 text-sm">
        Welcome back! Please enter your details.
      </p>

      <form className="space-y-5 mt-8">
        <GitHubAuthButton />
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  hover:cursor-pointer"
          onClick={(e) => handleSignIn(e, email, password)}
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-blue-500 hover:text-blue-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => {
              setShowSignUp(true);
              setShowSignIn(false);
            }}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
