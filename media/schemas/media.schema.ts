import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema()
export class Media {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: ['movie', 'series'] })
  type: 'movie' | 'series';

  @Prop({ required: true })
  releaseYear: number;

  @Prop({ required: true })
  genre: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);