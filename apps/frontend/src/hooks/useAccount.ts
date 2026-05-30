import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import removeMd from "remove-markdown";

export default function useAccount() {
  const queryClient = useQueryClient();

  const updateBiographyMutation = useMutation({
    mutationFn: async (biography: string) => {
      if (!biography.trim().length) {
        alert("Biography cannot be empty");
        return;
      }

      if (removeMd(biography).length > 400) {
        alert("Biography cannot exceed 400 characters");
        return;
      }

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/update-biography`,
        { biography },
        { withCredentials: true },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error) => {
      console.error("Error during biography update:", error);
    },
  });

  return { updateBiographyMutation };
}
