import { useState } from "react";
import useAuthForm from "../hooks/useAuthForm";
import { Link } from "react-router-dom";
import GitHubAuthButton from "./GitHubAuthButton";

export default function SignUp({
  setShowSignUp,
  setShowSignIn,
}: {
  setShowSignUp: (value: boolean) => void;
  setShowSignIn: (value: boolean) => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignUp } = useAuthForm();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Create Account
        </h1>

        <p className="mt-3 text-gray-400 text-sm">
          Join Developer Showcase and share your work.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        <GitHubAuthButton />
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            placeholder="johndoe"
            className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email */}
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

        {/* Password */}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 active:scale-[0.99]"
          onClick={(e) =>
            handleSignUp(
              e as unknown as React.FormEvent<HTMLFormElement>,
              email,
              username,
              password,
            )
          }
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="#"
          className="font-medium text-blue-400 hover:text-blue-300"
          onClick={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
