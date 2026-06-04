import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostgresDbModule } from '../postgres-db.module';
import { UploadCareModule } from '../upload-care/upload-care.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PostgresDbModule, UploadCareModule, HttpModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
