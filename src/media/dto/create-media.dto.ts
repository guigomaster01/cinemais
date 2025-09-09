import { IsString, IsIn, IsInt, Min } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsIn(['movie', 'series'])
  type: 'movie' | 'series';

  @IsInt()
  @Min(1900)
  releaseYear: number;

  @IsString()
  genre: string;
}
