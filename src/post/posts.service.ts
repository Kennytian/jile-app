import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostDoc } from './schemas/post.schema';
import { BaseService } from '../base/base.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostsService extends BaseService<PostDoc, PostDto> {
  constructor(@InjectModel(PostDoc.name) private postModel: Model<PostDoc>) {
    super(postModel);
  }

  async findAll(): Promise<PostDoc[]> {
    return super.findAll();
  }

  async findOne(id: string): Promise<PostDoc> {
    return super.findOne(id);
  }

  async create(postData: PostDto): Promise<PostDoc> {
    return super.create(postData);
  }

  async update(id: string, postData: PostDto): Promise<PostDoc> {
    return super.update(id, postData);
  }

  async delete(id: string): Promise<PostDoc> {
    return super.delete(id);
  }
}
