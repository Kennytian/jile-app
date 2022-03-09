import { Controller } from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { PostDoc } from './schemas/post.schema';

@Controller('posts')
export class PostsController extends BaseController<PostDoc, PostDto> {
  constructor(protected readonly service: PostsService) {
    super(service);
  }
}
