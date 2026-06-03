import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostDto } from '../DTOs/post.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorators/currentUser.decorator';
import type { UserPayload } from '../types';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new')
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'slideShowImages', maxCount: 9 },
    ]),
  )
  uploadFile(
    @UploadedFiles()
    files: {
      thumbnail?: Express.Multer.File[];
      slideShowImages?: Express.Multer.File[];
    },
    @Body() postData: PostDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.postService.createPost(postData, files, user.user_id);
  }
}
