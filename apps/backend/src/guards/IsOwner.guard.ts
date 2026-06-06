import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userID = request.user.user_id;
    const postId = request.params.id;

    const post = await this
      .sql`SELECT user_id FROM posts WHERE post_id = ${postId} AND user_id = ${userID}`;

    if (!post) throw new NotFoundException('Post not found');

    if (post.user_id !== userID)
      throw new ForbiddenException('You do not own this post');

    return true;
  }
}
