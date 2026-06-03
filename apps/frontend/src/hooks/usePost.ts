import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";

export default function usePost() {
  const { userId, postId } = useParams();

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

  return { postMutation, allPostsData, postData };
}
