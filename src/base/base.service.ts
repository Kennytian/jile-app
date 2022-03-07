import { Document, Model } from 'mongoose';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { IBaseService } from './ibase.service';

@Injectable()
export class BaseService<T extends Document, P> implements IBaseService<T, P> {
  constructor(private readonly baseModel: Model<T>) {}

  create(dto: P): Promise<T> {
    try {
      return this.baseModel.create(dto);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  delete(id: string): Promise<T> {
    try {
      return this.baseModel.findByIdAndRemove({ _id: id }).exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findAll(): Promise<T[]> {
    try {
      return this.baseModel.find().exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  findOne(id: string): Promise<T> {
    try {
      return this.baseModel.findOne({ _id: id }).select('-__v').exec();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async update(dto: any): Promise<T> {
    try {
      const { id, ...rest } = dto;
      return this.baseModel.findByIdAndUpdate(id, rest);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
