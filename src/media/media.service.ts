import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from './schemas/media.schema';
import { CreateMediaDto } from './dto/create-media.dto';
import { isValidObjectId } from 'mongoose';

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

    async remove(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID de mídia inválido');
    }
    const deleted = await this.mediaModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Mídia com id ${id} não encontrada`);
    }
  }

    async replace(id: string, dto: CreateMediaDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('ID de mídia inválido');
    }

    const updated = await this.mediaModel
      .findOneAndUpdate({ _id: id }, dto, {
        new: true,
        runValidators: true,
        overwrite: true, 
      })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Mídia com id ${id} não encontrada`);
    }

    return updated;
  }
}