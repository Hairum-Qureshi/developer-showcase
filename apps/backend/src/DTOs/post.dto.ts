import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(150)
  @IsString()
  title!: string;

  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(1000)
  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  projectRepoLink?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  liveProjectLink?: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(5, { each: true })
  tags!: string[];
}
