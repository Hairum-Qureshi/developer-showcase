import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostgresDbModule } from '../postgres-db.module';
import { UploadCareModule } from '../upload-care/upload-care.module';

@Module({
  imports: [PostgresDbModule, UploadCareModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
