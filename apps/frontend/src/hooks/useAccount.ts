import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
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
      queryClient.invalidateQueries({ queryKey: ["profileData", userId] });
    },
    onError: (error) => {
      console.error("Error during biography update:", error);
    },
  });

  const { userId } = useParams();
  const { data: profileData } = useQuery({
    queryKey: ["profileData", userId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/${userId}`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { updateBiographyMutation, profileData };
}
