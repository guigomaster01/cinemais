import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from './schemas/media.schema';
import { CreateMediaDto } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
  ) {}

  async create(dto: CreateMediaDto): Promise<Media> {
    const newMedia = new this.mediaModel(dto);
    return newMedia.save();
  }

  async findAll(): Promise<Media[]> {
    return this.mediaModel.find().exec();
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.mediaModel.findById(id).exec();
    if (!media) throw new NotFoundException(`Mídia com id ${id} não encontrada`);
    return media;
  }
}