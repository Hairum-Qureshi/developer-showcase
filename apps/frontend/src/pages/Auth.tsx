import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function Auth() {
  const [showSignUp, setShowSignUp] = useState(true);
  const [_, setShowSignIn] = useState(false);

  const [searchParams] = useSearchParams();
  const effectRan = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) return;

    if (!effectRan.current) {
      const fetchGitHubAccessToken = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/github/access-token?code=${code}`,
        );

        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/github/authenticate`,
          {},
          {
            headers: {
              Authorization: `Bearer ${response.data}`,
            },
            withCredentials: true,
          },
        );

        navigate(`/profile/${res.data.user_id}`);
      };

      fetchGitHubAccessToken();
      effectRan.current = true;
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {showSignUp ? (
          <SignUp setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />
        ) : (
          <SignIn setShowSignUp={setShowSignUp} setShowSignIn={setShowSignIn} />
        )}
      </div>
    </main>
  );
}
