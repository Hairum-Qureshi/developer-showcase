import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostgresDbModule } from '../postgres-db.module';

@Module({
  imports: [PostgresDbModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
