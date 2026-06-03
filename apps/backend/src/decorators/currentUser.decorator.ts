import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../types';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: AuthRequest = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return null;

    const userPayload = {
      user_id: user.user_id,
      username: user.username,
      profilePicture: user.github_oauth
        ? user.avatar
        : `https://api.dicebear.com/9.x/identicon/svg?seed=${user.profile_picture_seed}`,
      email: user.email,
      biography: user.biography,
      twitter_x_url: user.twitter_x_url,
      linkedin_url: user.linkedin_url,
      github_url: user.github_url,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
    return userPayload;
  },
);
