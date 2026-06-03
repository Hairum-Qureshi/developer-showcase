import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class PostDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(150)
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Transform(({ value }) => (value === '' ? undefined : value))
  projectRepoLink?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @Transform(({ value }) => (value === '' ? undefined : value))
  liveProjectLink?: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  tags!: string[];
}
