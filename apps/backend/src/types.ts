type UserPayload = {
  user_id: string;
  email: string;
  username: string;
  biography: string;
  profilePictureSeed: string;
  twitter_x_url: string;
  linkedin_url: string;
  github_url: string;
  createdAt: string;
  updatedAt: string;
};

type AuthRequest = Request & {
  user?: UserPayload;
};

export type { UserPayload, AuthRequest };
