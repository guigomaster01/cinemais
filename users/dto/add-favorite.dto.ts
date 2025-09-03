import { IsUUID } from 'class-validator';

export class AddFavoriteDto {
  @IsUUID()
  mediaId: string;
}
