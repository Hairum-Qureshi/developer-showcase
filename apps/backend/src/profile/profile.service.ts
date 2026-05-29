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
    markdown.use(sanitize, {
      ALLOWED_TAGS: [
        'p',
        '#text',
        'br', // Text structure
        'strong',
        'em',
        'del',
        's', // Text emphasis
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6', // Headings
        'ul',
        'ol',
        'li', // Lists
        'a', // Links
        'img', // Images
        'blockquote',
        'pre',
        'code', // Blocks & Code
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td', // Tables
      ],
      ALLOWED_ATTRIBUTES: {
        a: ['href', 'title', 'target'], // Crucial for links
        img: ['src', 'alt', 'title', 'width', 'height'], // Crucial for images
      },
    });
    const sanitizedBiography = markdown.render(biography);

    await this.sql`
      UPDATE users
      SET biography = ${sanitizedBiography}
      WHERE user_id = ${userId}
    `;

    return { message: 'Biography updated successfully' };
  }
}
