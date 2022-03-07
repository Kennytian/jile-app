import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../base/base.service';
import { Cat } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService extends BaseService<Cat, CreateCatDto> {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
    super(catModel);
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    return super.create(createCatDto);
  }

  findAll(): Promise<Cat[]> {
    return super.findAll();
  }

  async findOne(id: string): Promise<Cat> {
    return super.findOne(id);
  }

  async delete(id: string): Promise<Cat> {
    return super.delete(id);
  }

  async update(dto: CreateCatDto): Promise<Cat> {
    return super.update(dto);
  }
}
