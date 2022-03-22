import { Injectable } from '@nestjs/common';
import { PrismaService } from '../base/prisma.service';
import { Prisma, user as User } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly dbInstance = null;
  constructor(private readonly prisma: PrismaService) {
    this.dbInstance = this.prisma.user;
  }

  // findOne
  async user(userWhereUniqueInput: Prisma.userWhereUniqueInput): Promise<User | null> {
    return this.dbInstance.findUnique({ where: userWhereUniqueInput });
  }

  // findMany
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }): Promise<[User[], number]> {
    const { where } = params;
    return this.prisma.$transaction([this.dbInstance.findMany(params), this.dbInstance.count({ where })]);
  }

  // create
  async createUser(data: Prisma.userCreateInput): Promise<User> {
    return this.dbInstance.create({ data });
  }

  // updateOne
  async updateUser(params: { where: Prisma.userWhereUniqueInput; data: Prisma.userUpdateInput }): Promise<User> {
    const { where, data } = params;
    return this.dbInstance.update({ data, where });
  }

  // deleteOne
  async deleteUser(where: Prisma.userWhereUniqueInput): Promise<User> {
    return this.dbInstance.delete({ where });
  }
}
