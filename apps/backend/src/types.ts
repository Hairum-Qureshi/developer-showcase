type UserPayload = {
  user_id: string;
  email: string;
  username: string;
  profilePictureSeed: string;
  createdAt: string;
  updatedAt: string;
};

type AuthRequest = Request & {
  user?: UserPayload;
};

export type { UserPayload, AuthRequest };
