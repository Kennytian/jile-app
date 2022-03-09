import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'post', versionKey: false, timestamps: true })
export class PostDoc extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(PostDoc);
