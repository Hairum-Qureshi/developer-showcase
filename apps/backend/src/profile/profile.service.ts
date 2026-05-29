import { HttpException, Inject, Injectable } from '@nestjs/common';
import DOMPurify from 'isomorphic-dompurify';

@Injectable()
export class ProfileService {
  constructor(@Inject('POSTGRES_POOL') private readonly sql: any) {}

  async updateBiography(userId: string, biography: string) {
    if (!biography.trim().length)
      throw new HttpException('Biography cannot be empty', 400);

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
}
