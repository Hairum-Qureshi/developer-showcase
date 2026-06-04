import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "./useCurrentUser";

export default function usePost() {
  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const { data: currUserData } = useCurrentUser();

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: async ({
      title,
      markdownDescription,
      tags,
      projectLink,
      liveLink,
      thumbnail,
      slideShowImages,
    }: {
      title: string;
      markdownDescription: string;
      tags: string;
      projectLink: string;
      liveLink: string;
      thumbnail: File;
      slideShowImages: File[];
    }) => {
      try {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", markdownDescription);
        formData.append("projectRepoLink", projectLink);
        formData.append("liveProjectLink", liveLink);

        tags
          .split(",")
          .map((t) => t.trim())
          .forEach((tag) => {
            formData.append("tags", tag);
          });

        formData.append("thumbnail", thumbnail);

        slideShowImages.forEach((file) => {
          formData.append("slideShowImages", file);
        });

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/new`,
          formData,
          {
            withCredentials: true,
          },
        );

        return response.data;
      } catch (error) {
        console.error(
          "Error creating post:",
          (error as AxiosError).response?.data,
        );
      }
    },
    onSuccess: (data) => {
      navigate(`/post/${data.postID}`);
    },
  });

  const { data: allPostsData } = useQuery({
    queryKey: ["posts", userId],
    queryFn: async () => {
      try {
        if (!userId) return;

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/all/${userId}`,
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

  const { data: postData } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      try {
        if (!postId) return;

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/${postId}`,
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

  const deletePostMutation = useMutation({
    mutationFn: async (postID: string) => {
      try {
        const confirmation = confirm(
          "Are you sure you want to delete this post? This action cannot be undone.",
        );

        if (!confirmation) return;

        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/${postID}`,
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error("Error deleting post:", (error as AxiosError).response);
      }
    },
    onSuccess: () => {
      const currUserID = currUserData?.user_id;

      queryClient.invalidateQueries({
        queryKey: ["posts", currUserID],
      });

      if (postId) navigate(`/profile/${currUserID}`);
    },
  });

  return { postMutation, allPostsData, postData, deletePostMutation };
}
