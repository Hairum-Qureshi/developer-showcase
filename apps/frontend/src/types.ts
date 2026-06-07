type PostType = {
  post_type: "showcase";
  post_id: string;
  thumbnail_url: string;
  title: string;
  description: string;
  github_link?: string;
  live_demo_link?: string;
  tags: string[];
  user_id: string;
  created_at: string;
};

type FeedPostType = Omit<PostType, "user_id" | "post_type"> & {
  post_type: "feed";
  user: {
    user_id: string;
    username: string;
    profile_picture_seed: string;
    avatar: string | null;
  };
  content: string;
};

type UserType = {
  user_id: string;
  username: string;
  avatar: string | null;
  profile_picture_seed: string;
  created_at: string;
};

export type { PostType, FeedPostType, UserType };
