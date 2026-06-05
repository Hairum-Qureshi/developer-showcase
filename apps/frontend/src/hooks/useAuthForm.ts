import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useAuthForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: async ({
      email,
      username,
      password,
    }: {
      email: string;
      username: string;
      password: string;
    }) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-up`,
        {
          email: email.toLowerCase().trim(),
          username: username.toLowerCase().trim(),
          password: password.trim(),
        },
        {
          withCredentials: true,
        },
      );

      return data;
    },
    onError: (error) => {
      console.error("Error during sign-up:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate(`/profile/${data.user_id}`);
    },
  });

  const signInMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-in`,
        {
          email: email.toLowerCase().trim(),
          password: password.trim(),
        },
        {
          withCredentials: true,
        },
      );

      return data;
    },
    onError: (error) => {
      console.error("Error during sign-in:", error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate(`/profile/${data.user_id}`);
    },
  });

  const handleSignUp = (
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

    signUpMutation.mutate({
      email,
      username,
      password,
    });
  };

  const handleSignIn = (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string,
  ) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    signInMutation.mutate({
      email,
      password,
    });
  };

  const signOutMutation = useMutation({
    mutationFn: async () => {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/sign-out`,
        {},
        {
          withCredentials: true,
        },
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      navigate("/auth");
    },
    onError: (error) => {
      console.error("Error during sign-out:", error);
    },
  });

  return {
    handleSignUp,
    handleSignIn,
    signUpMutation,
    signInMutation,
    signOut: signOutMutation.mutate,
  };
}
