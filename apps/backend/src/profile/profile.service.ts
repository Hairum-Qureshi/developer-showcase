import { HttpException, Inject, Injectable } from '@nestjs/common';
import { sanitize } from '@markdown-design/markdown-it-sanitize';
import markdownit from 'markdown-it';

@Injectable()
export class ProfileService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  async updateBiography(userId: string, biography: string) {
    if (!biography.trim().length)
      throw new HttpException('Biography cannot be empty', 400);

    const markdown = markdownit({ html: true });
    markdown.use(sanitize);
    const sanitizedBiography = markdown.render(biography);

    await this.sql`
      UPDATE users
      SET biography = ${sanitizedBiography}
      WHERE user_id = ${userId}
    `;

    return { message: 'Biography updated successfully' };
  }
}
