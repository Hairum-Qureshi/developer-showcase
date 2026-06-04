import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UploadClient } from '@uploadcare/upload-client';
import { PostDto } from '../DTOs/post.dto';
import SnowflakeId from 'snowflake-id';
import DOMPurify from 'isomorphic-dompurify';
import { remark } from 'remark';
import strip from 'strip-markdown';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
  constructor(
    @Inject('POSTGRES_POOL') private readonly sql: any,
    @Inject('UploadCare') private readonly uploadCare: UploadClient,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createPost(
    postData: PostDto,
    files: {
      thumbnail?: Express.Multer.File[];
      slideShowImages?: Express.Multer.File[];
    },
    user_id: string,
  ) {
    const { title, content, projectRepoLink, liveProjectLink, tags } = postData;

    const formattedTags = tags.map((tag: string) =>
      tag.trim().toLowerCase().replace(/\s+/g, '-'),
    );

    const sanitizedContent = DOMPurify.sanitize(content, {
      FORCE_BODY: true,
    });

    const strippedMarkdown = await remark()
      .use(strip)
      .process(sanitizedContent);

    if (
      strippedMarkdown.toString().length < 100 ||
      strippedMarkdown.toString().length > 1000
    )
      throw new HttpException(
        'Content must be between 100 and 1000 characters',
        400,
      );

    const snowflake = new SnowflakeId({
      mid: 42,
      offset: (2019 - 1970) * 31536000 * 1000,
    });

    const postID = snowflake.generate();

    let thumbnailURL: string | undefined = undefined;
    const slideShowURLs: string[] = [];

    const thumbnailFile = files.thumbnail?.[0];
    if (thumbnailFile) {
      await this.uploadCare
        .uploadFile(thumbnailFile.buffer, {
          fileName: `post-${postID}-thumbnail`,
        })
        .then((file) => {
          thumbnailURL = `https://ky3lm3s6xp.ucarecd.net/${file.uuid}/`;
        });
    }

    const slideShowFiles = files.slideShowImages || [];
    if (slideShowFiles.length) {
      for (const [index, file] of slideShowFiles.entries()) {
        await this.uploadCare
          .uploadFile(file.buffer, {
            fileName: `post-${postID}-slide-${index}`,
          })
          .then((uploadedFile) => {
            const fileURL = `https://ky3lm3s6xp.ucarecd.net/${uploadedFile.uuid}/`;
            slideShowURLs.push(fileURL);
          });
      }
    }

    await this
      .sql`INSERT INTO posts (post_id, user_id, title, content, project_repo_link, live_project_link, tags, thumbnail_url, slideshow_image_urls) VALUES (${postID}, ${user_id}, ${title}, ${sanitizedContent}, ${projectRepoLink}, ${liveProjectLink}, ${formattedTags}, ${thumbnailURL}, ${slideShowURLs})`;

    return { postID };
  }

  async getPostByID(postID: string) {
    const [{ exists: postExists }] = await this
      .sql`SELECT EXISTS(SELECT 1 FROM posts WHERE post_id=${postID})`;

    if (!postExists) throw new HttpException('Post not found', 404);

    const [post] = await this.sql`
      SELECT
        posts.post_id,
        posts.thumbnail_url,
        posts.title,
        posts.content,
        posts.slideshow_image_urls,
        posts.project_repo_link,
        posts.live_project_link,
        posts.tags,
        posts.created_at,

        json_build_object(
          'user_id', users.user_id,
          'username', users.username,
          'profile_picture_seed', users.profile_picture_seed,
          'avatar', users.avatar 
        ) AS user

        FROM posts
        JOIN users
          ON posts.user_id = users.user_id
        WHERE posts.post_id = ${postID};
      `;

    return post;
  }

  async getAllPostsByUserID(userID: string) {
    const posts = await this
      .sql`SELECT * FROM posts WHERE user_id = ${userID} ORDER BY created_at DESC`;
    return posts;
  }

  async deletePost(postID: string, userID: string) {
    const [{ exists: postExists }] = await this
      .sql`SELECT EXISTS(SELECT 1 FROM posts WHERE post_id=${postID} AND user_id=${userID})`;

    if (!postExists) throw new HttpException('Post not found', 404);

    const postImageURLs = await this
      .sql`SELECT thumbnail_url, slideshow_image_urls FROM posts WHERE post_id=${postID}`;

    const imageURLs = [
      postImageURLs[0].thumbnail_url,
      ...postImageURLs[0].slideshow_image_urls,
    ];

    await this
      .sql`DELETE FROM posts WHERE post_id=${postID} AND user_id=${userID}`;

    for (const url of imageURLs) {
      if (url) {
        const fileID = url.split('/')[3];
        if (fileID) {
          const response = await firstValueFrom(
            this.httpService.delete(
              `https://api.uploadcare.com/files/${fileID}/storage/`,
              {
                headers: {
                  Accept: 'application/vnd.uploadcare-v0.7+json',
                  Authorization: `Uploadcare.Simple ${this.configService.get<string>('UPLOADCARE_PUBLIC_KEY')}:${this.configService.get<string>('UPLOADCARE_SECRET_KEY')}`,
                },
              },
            ),
          );

          console.log('File deletion response:', response.data);
        }
      }
    }

    return { message: 'Post deleted successfully' };
  }
}
