import { HttpException, Inject, Injectable } from '@nestjs/common';
import DOMPurify from 'isomorphic-dompurify';
import { remark } from 'remark';
import strip from 'strip-markdown';

@Injectable()
export class ProfileService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  async updateBiography(userId: string, biography: string) {
    if (!biography.trim().length)
      throw new HttpException('Biography cannot be empty', 400);

    const strippedMarkdown = await remark().use(strip).process(biography);

    if (strippedMarkdown.toString().length > 400)
      throw new HttpException('Biography cannot exceed 400 characters', 400);

    const sanitizedBiography = DOMPurify.sanitize(biography, {
      FORCE_BODY: true,
    });

    await this.sql`
      UPDATE users
      SET biography = ${sanitizedBiography}
      WHERE user_id = ${userId}
    `;

    return { message: 'Biography updated successfully' };
  }

  async getProfile(userID: string) {
    const [{ exists: userExists }] = await this
      .sql`SELECT EXISTS(SELECT 1 FROM users WHERE user_id=${userID})`;

    if (!userExists) throw new HttpException('User not found', 404);

    const [userData] = await this
      .sql`SELECT * FROM users WHERE user_id = ${userID}`;

    delete userData.password_hash;
    userData.profilePicture = userData.github_oauth
      ? userData.avatar
      : `https://api.dicebear.com/9.x/identicon/svg?seed=${userData.profilePictureSeed}`;
    userData.createdAt = userData.created_at;
    userData.updatedAt = userData.updated_at;

    return userData;
  }
}
