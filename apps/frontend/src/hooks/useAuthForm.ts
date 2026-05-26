import axios from "axios";

export default function useAuthForm() {
  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    username: string,
    password: string,
  ) => {
    e.preventDefault();

    if (!email || !username || !password) {
      alert("All fields are required.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (username.length < 6) {
      alert("Username must be at least 6 characters long.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`, {
        email: email.toLowerCase().trim(),
        username: username.toLowerCase().trim(),
        password: password.trim(),
      });
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  const handleSignIn = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`, {
        email: email.toLowerCase().trim(),
        password: password.trim(),
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return { handleSignUp, handleSignIn };
}
