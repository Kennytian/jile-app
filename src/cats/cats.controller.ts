import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ParamsWithId } from '../utils/params-with-id';
import { CatsService } from './cats.service';
import { CatDto } from './dto/cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly service: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CatDto, @Res() res?: Response) {
    const result = await this.service.create(createCatDto);
    if (res) {
      return res.send(result);
    } else {
      return result;
    }
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: ParamsWithId, @Res() res: Response) {
    const result = await this.service.findOne(id);
    res.send(result ?? {});
  }

  @Put(':id')
  async update(
    @Param() { id }: ParamsWithId,
    @Body() dto: CatDto,
    @Res() res: Response,
  ) {
    const result = await this.service.update(id, dto);
    res.send(result ?? {});
  }

  @Delete(':id')
  async delete(@Param() { id }: ParamsWithId, @Res() res: Response) {
    const result = await this.service.delete(id);
    res.send(result ?? {});
  }
}
