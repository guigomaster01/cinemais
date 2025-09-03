import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { Media } from '../common/entities/media.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class MediaService {
  private media: Media[] = [];

  create(dto: CreateMediaDto): Media {
    const newMedia: Media = { id: randomUUID(), ...dto };
    this.media.push(newMedia);
    return newMedia;
  }

  findAll(): Media[] {
    return this.media;
  }

  findOne(id: string): Media {
    const item = this.media.find((m) => m.id === id);
    if (!item) throw new NotFoundException(`Mídia com id ${id} não encontrada`);
    return item;
  }
}
