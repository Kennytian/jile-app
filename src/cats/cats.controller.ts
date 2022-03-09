import { Controller } from '@nestjs/common';
import { CatsService } from './cats.service';
import { BaseController } from '../base/base.controller';
import { CatDto } from './dto/cat.dto';
import { CatDoc } from './schemas/cat.schema';

@Controller('cats')
export class CatsController extends BaseController<CatDoc, CatDto> {
  constructor(protected readonly service: CatsService) {
    super(service);
  }
}
