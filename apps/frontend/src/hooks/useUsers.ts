import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useUsers() {
  const { data: users } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/all-users`,
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
  return { users };
}
