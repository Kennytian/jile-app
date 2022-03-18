import { Document, Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export abstract class BaseService<T extends Document, P> {
  protected constructor(private readonly baseModel: Model<T>) {}

  create(entity: P): Promise<T> {
    try {
      return this.baseModel.create(entity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  delete(id: string): Promise<T> {
    try {
      return this.baseModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll(): Promise<T[]> {
    try {
      return this.baseModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: string): Promise<T> {
    try {
      return this.baseModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: string, entity: P): Promise<T> {
    try {
      return this.baseModel.findByIdAndUpdate(id, entity).setOptions({ new: true }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
