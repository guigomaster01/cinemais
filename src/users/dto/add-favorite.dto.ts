import { IsMongoId } from 'class-validator';

export class AddFavoriteDto {
  @IsMongoId()
  mediaId: string;
}
