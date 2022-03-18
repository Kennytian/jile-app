import { Response } from 'express';
import { Document } from 'mongoose';
import { BaseService } from './base.service';
import { Body, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ParamsWithId } from '../utils/params-with-id';

export abstract class BaseController<T extends Document, P> {
  protected constructor(protected readonly service: BaseService<T, P>) {}

  @Post()
  async create(@Body() dto: P, @Res() res?: Response) {
    const result = await this.service.create(dto);
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
  async update(@Param() { id }: ParamsWithId, @Body() dto: P, @Res() res: Response) {
    const result = await this.service.update(id, dto);
    res.send(result ?? {});
  }

  @Delete(':id')
  async delete(@Param() { id }: ParamsWithId, @Res() res: Response) {
    const result = await this.service.delete(id);
    res.send(result ?? {});
  }
}
