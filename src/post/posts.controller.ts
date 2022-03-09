import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ParamsWithId } from '../utils/params-with-id';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { PostDoc } from './schemas/post.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly service: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostDoc[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async getPost(@Param() { id }: ParamsWithId) {
    return this.service.findOne(id);
  }

  @Post()
  async createPost(@Body() post: PostDto) {
    return this.service.create(post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: ParamsWithId) {
    return this.service.delete(id);
  }

  @Put(':id')
  async updatePost(@Param() { id }: ParamsWithId, @Body() post: PostDto) {
    return this.service.update(id, post);
  }
}
