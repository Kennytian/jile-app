import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../base/base.service';
import { CatDto } from './dto/cat.dto';
import { CatDoc } from './schemas/cat.schema';

@Injectable()
export class CatsService extends BaseService<CatDoc, CatDto> {
  constructor(
    @InjectModel(CatDoc.name) private readonly catModel: Model<CatDoc>,
  ) {
    super(catModel);
  }

  create(createCatDto: CatDto): Promise<CatDoc> {
    return super.create(createCatDto);
  }

  findAll(): Promise<CatDoc[]> {
    return super.findAll();
  }

  findOne(id: string): Promise<CatDoc> {
    return super.findOne(id);
  }

  delete(id: string): Promise<CatDoc> {
    return super.delete(id);
  }

  update(id: string, entity: CatDto): Promise<CatDoc> {
    return super.update(id, entity);
  }
}
