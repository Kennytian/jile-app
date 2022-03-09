import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'cat', versionKey: false, timestamps: true })
export class CatDoc extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop([String])
  tags?: string[];
}

export const CatSchema = SchemaFactory.createForClass(CatDoc);
