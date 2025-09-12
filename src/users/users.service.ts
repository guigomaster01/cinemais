import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { MediaService } from '../media/media.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly mediaService: MediaService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  private async getOrCreateUser(userId: string): Promise<UserDocument> {
    let user = await this.userModel.findOne({ id: userId }).exec();
    if (!user) {
      user = new this.userModel({ id: userId, favorites: [] });
      await user.save();
    }
    return user;
  }

  async addFavorite(userId: string, mediaId: string): Promise<void> {
    await this.mediaService.findOne(mediaId); // valida se existe
    const user = await this.getOrCreateUser(userId);

    if (!user.favorites.includes(mediaId)) {
      user.favorites.push(mediaId);
      await user.save();
    }
  }

  async listFavorites(userId: string) {
    const user = await this.getOrCreateUser(userId);
    return Promise.all(user.favorites.map((id) => this.mediaService.findOne(id)));
  }

  async removeFavorite(userId: string, mediaId: string): Promise<void> {
    const user = await this.getOrCreateUser(userId);
    user.favorites = user.favorites.filter((id) => id !== mediaId);
    await user.save();
  }
}