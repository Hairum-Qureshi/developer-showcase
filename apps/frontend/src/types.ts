type PostType = {
  post_id: string;
  thumbnail_url?: string;
  title: string;
  description: string;
  github_link?: string;
  live_demo_link?: string;
  tags?: string[];
  user_id: string;
  created_at: string;
};

type FeedPostType = Omit<PostType, "user_id"> & {
  user: {
    user_id: string;
    username: string;
    profile_picture_seed: string;
    avatar: string | null;
  };
  post_type: "feed" | "showcase";
};

type UserType = {
  user_id: string;
  username: string;
  avatar: string | null;
  profile_picture_seed: string;
  created_at: string;
};

export type { PostType, FeedPostType, UserType };
