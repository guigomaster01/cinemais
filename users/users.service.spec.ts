import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../common/entities/user.entity';
import { MediaService } from '../media/media.service';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private readonly mediaService: MediaService) {}

  private getOrCreateUser(userId: string): User {
    let user = this.users.find((u) => u.id === userId);
    if (!user) {
      user = { id: userId, favorites: [] };
      this.users.push(user);
    }
    return user;
  }

  addFavorite(userId: string, mediaId: string): void {
    const media = this.mediaService.findOne(mediaId);
    if (!media) throw new NotFoundException('Mídia não encontrada');
    const user = this.getOrCreateUser(userId);
    if (!user.favorites.includes(mediaId)) {
      user.favorites.push(mediaId);
    }
  }

  listFavorites(userId: string) {
    const user = this.getOrCreateUser(userId);
    return user.favorites.map((id) => this.mediaService.findOne(id));
  }

  removeFavorite(userId: string, mediaId: string): void {
    const user = this.getOrCreateUser(userId);
    user.favorites = user.favorites.filter((id) => id !== mediaId);
  }
}
