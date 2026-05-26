import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(true);
  const [_, setShowSignIn] = useState(false);

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
