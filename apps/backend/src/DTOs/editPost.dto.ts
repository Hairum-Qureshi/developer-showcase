import { PartialType } from '@nestjs/mapped-types';
import { PostDto } from './post.dto';
import { IsOptional, IsString, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class EditPostDto extends PartialType(PostDto) {
  @IsOptional()
  @IsString()
  retainedThumbnail?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  retainedSlideShowImages?: string[];
}
