import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { BaseController } from '../base/base.controller';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { PostDoc } from './schemas/post.schema';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController extends BaseController<PostDoc, PostDto> {
  constructor(protected readonly service: PostsService) {
    super(service);
  }
}
